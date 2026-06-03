import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { ethers } from 'ethers';
import { exec } from 'child_process';
import util from 'util';
const execAsync = util.promisify(exec);
import { CONFIG, ABIS } from '../../../web3/config.js';

export const dynamic = 'force-dynamic';

// Background runner to create missing markets sequentially to avoid nonce conflicts
async function initializeMarketsBackground(missingIds) {
    const iface = new ethers.utils.Interface(ABIS.PredictionMarket);
    const chainId = "1952"; // testrpc.xlayer.tech requires 1952 for internal EIP-155 signing

    try {
        for (const id of missingIds) {
            try {
                const hexData = iface.encodeFunctionData("createMarket", [id]);
                const command = `onchainos wallet contract-call --to ${CONFIG.PREDICTION_MARKET_ADDRESS} --chain ${chainId} --input-data ${hexData} --force`;
                
                console.log(`[BACKGROUND ORACLE] Initializing market on-chain: ${id}...`);
                const { stdout, stderr } = await execAsync(command);
                if (stderr && stderr.trim() !== '') {
                    console.log(`[BACKGROUND ORACLE] Warning for ${id}:`, stderr);
                }
                console.log(`[BACKGROUND ORACLE] Success for ${id}.`);
                
                // Wait 15 seconds between transactions to let the node process the nonce and AA bundler
                await new Promise(resolve => setTimeout(resolve, 15000));
            } catch (e) {
                console.error(`[BACKGROUND ORACLE] Failed to create market for ${id}:`, e.message);
            }
        }
    } catch (e) {
        console.error(`[BACKGROUND ORACLE] Background task error:`, e.message);
    }
}

export async function GET() {
    const filePath = path.join(process.cwd(), 'data', 'prediction_fixtures.json');
    
    try {
        // Read seeded fixtures
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const fixtures = JSON.parse(fileContent);

        const iface = new ethers.utils.Interface(ABIS.PredictionMarket);

        const updatedFixtures = [];
        const missingIds = [];

        for (const fixture of fixtures) {
            let onChainData = {
                initialized: false,
                isResolved: false,
                outcome: 0,
                pools: { home: "0", draw: "0", away: "0" }
            };

            try {
                // Query contract for market info using direct JSON-RPC to avoid Ethers Next.js fetch bugs
                const data = iface.encodeFunctionData("getMarket", [fixture.id]);
                const response = await fetch(CONFIG.XLAYER_RPC, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        jsonrpc: "2.0",
                        id: 1,
                        method: "eth_call",
                        params: [{
                            to: CONFIG.PREDICTION_MARKET_ADDRESS,
                            data: data
                        }, "latest"]
                    }),
                    cache: 'no-store'
                });
                const rpcResult = await response.json();
                
                if (rpcResult.error) {
                    throw new Error(rpcResult.error.message);
                }

                if (rpcResult.result && rpcResult.result !== "0x") {
                    const decoded = iface.decodeFunctionResult("getMarket", rpcResult.result);
                    
                    // If fixtureId matches, it has been initialized on-chain
                    if (decoded.fixtureId && decoded.fixtureId !== "") {
                        onChainData.initialized = true;
                        onChainData.outcome = decoded.outcome;
                        onChainData.isResolved = decoded.isResolved;
                        onChainData.pools = {
                            home: ethers.utils.formatEther(decoded.totalHomePool),
                            draw: ethers.utils.formatEther(decoded.totalDrawPool),
                            away: ethers.utils.formatEther(decoded.totalAwayPool)
                        };
                    } else {
                        missingIds.push(fixture.id);
                    }
                } else {
                    missingIds.push(fixture.id);
                }
            } catch (contractErr) {
                console.warn(`Could not read contract info for ${fixture.id}:`, contractErr.message);
            }

            // Combine local JSON metadata with on-chain state
            updatedFixtures.push({
                ...fixture,
                onChain: onChainData
            });
        }

        // Trigger sequential background initialization if any markets are missing
        if (missingIds.length > 0) {
            console.log(`Found ${missingIds.length} missing on-chain markets. Triggering background deployment...`);
            // Run asynchronously in background without waiting
            initializeMarketsBackground(missingIds).catch(err => {
                console.error("Background market creation queue error:", err);
            });
        }

        return NextResponse.json(updatedFixtures);
    } catch (error) {
        console.error("Error reading fixtures:", error);
        return NextResponse.json({ error: "Failed to read fixtures" }, { status: 500 });
    }
}
