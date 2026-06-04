import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { ethers } from 'ethers';
import { execSync } from 'child_process';
import { CONFIG, ABIS } from '../../../../web3/config.js';

export async function POST(request) {
    const filePath = path.join(process.cwd(), 'data', 'prediction_fixtures.json');

    try {
        const { fixtureId, result } = await request.json();

        if (!fixtureId || !result) {
            return NextResponse.json({ error: "Missing fixtureId or result" }, { status: 400 });
        }

        // Map selection string to contract enum value
        // MatchOutcome enum: { UNRESOLVED, HOME_WIN, AWAY_WIN, DRAW }
        let outcomeInt = 0;
        if (result === 'home') outcomeInt = 1;
        else if (result === 'away') outcomeInt = 2;
        else if (result === 'draw') outcomeInt = 3;

        if (outcomeInt === 0) {
            return NextResponse.json({ error: "Invalid result value" }, { status: 400 });
        }

        console.log(`Resolving ${fixtureId} on-chain as ${result} (${outcomeInt})...`);

        // 1. Update local database file
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const fixtures = JSON.parse(fileContent);
        
        const fixtureIndex = fixtures.findIndex(f => f.id === fixtureId);
        if (fixtureIndex === -1) {
            return NextResponse.json({ error: "Fixture not found in database" }, { status: 404 });
        }

        fixtures[fixtureIndex].status = 'resolved';
        fixtures[fixtureIndex].result = result;
        fs.writeFileSync(filePath, JSON.stringify(fixtures, null, 2), 'utf8');

        // 2. Broadcast resolveMarket transaction on-chain via onchainos
        const iface = new ethers.utils.Interface(ABIS.PredictionMarket);
        const hexData = iface.encodeFunctionData("resolveMarket", [fixtureId, outcomeInt]);
        const chainId = "196"; // X Layer Mainnet requires 196 for internal EIP-155 signing
        const command = `onchainos wallet contract-call --to ${CONFIG.PREDICTION_MARKET_ADDRESS} --chain ${chainId} --input-data ${hexData} --force`;

        let txOutput = "";
        try {
            console.log(`Executing contract call command: ${command}`);
            const buffer = execSync(command);
            txOutput = buffer.toString();
            console.log("onchainos output:", txOutput);
        } catch (execErr) {
            console.error("CLI contract-call execution failed:", execErr.message);
            return NextResponse.json({ 
                success: false, 
                error: `On-chain execution failed: ${execErr.message}` 
            }, { status: 500 });
        }

        return NextResponse.json({ 
            success: true, 
            message: `Successfully resolved market ${fixtureId} as ${result} on-chain.`,
            cliOutput: txOutput 
        }, { status: 200 });

    } catch (err) {
        console.error("Failed in /api/fixtures/resolve:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
