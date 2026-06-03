import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import { ethers } from 'ethers';
import fs from 'fs/promises';

const execPromise = promisify(exec);

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        const body = await req.json();
        const { userAddress, betAmount, txHash, score, won } = body;

        if (!userAddress || !betAmount) {
            return NextResponse.json({ error: 'Missing user address or bet amount' }, { status: 400 });
        }

        let payoutTxHash = null;

        if (won) {
            if (!txHash) {
                return NextResponse.json({ error: 'Missing transaction hash for win verification' }, { status: 400 });
            }

            // 1. Replay Protection (Check if txHash was already claimed)
            const CLAIMED_FILE = path.join(process.cwd(), 'data', 'claimed_payouts.json');
            let claimedHashes = {};
            try {
                const fileData = await fs.readFile(CLAIMED_FILE, 'utf8');
                claimedHashes = JSON.parse(fileData);
            } catch (err) {
                // File does not exist yet
            }

            const cleanHash = txHash.toLowerCase();
            if (claimedHashes[cleanHash]) {
                return NextResponse.json({ error: 'This transaction has already been claimed for a payout' }, { status: 400 });
            }

            // 2. On-chain Verification
            const provider = new ethers.providers.JsonRpcProvider('https://rpc.xlayer.tech');
            let tx = null;
            try {
                tx = await provider.getTransaction(txHash);
            } catch (err) {
                console.error("Failed to query transaction details from RPC:", err);
            }

            if (!tx) {
                return NextResponse.json({ error: 'Transaction hash could not be found on-chain' }, { status: 400 });
            }

            // Verify transaction recipient is our Treasury Address
            const treasuryAddress = '0x491d07ede06eebf25a3a0ff3ce3b78ca78af4aac';
            if (!tx.to || tx.to.toLowerCase() !== treasuryAddress.toLowerCase()) {
                return NextResponse.json({ error: 'Invalid transaction: recipient is not the treasury' }, { status: 400 });
            }

            // Verify transaction sender is the userAddress
            if (!tx.from || tx.from.toLowerCase() !== userAddress.toLowerCase()) {
                return NextResponse.json({ error: 'Invalid transaction: sender address mismatch' }, { status: 400 });
            }

            // Verify transaction value is sufficient (matches betAmount in Wei)
            // Format to 6 decimals to prevent floating point parse errors
            const expectedWei = ethers.utils.parseEther(Number(betAmount).toFixed(6));
            if (tx.value.lt(expectedWei)) {
                return NextResponse.json({ 
                    error: `Invalid transaction: value is lower than the required bet amount of ${betAmount} OKB` 
                }, { status: 400 });
            }

            // Wait for 1 confirmation to make sure it's mined successfully
            const receipt = await tx.wait(1);
            if (!receipt || !receipt.status) {
                return NextResponse.json({ error: 'Invalid transaction: tx reverted or failed' }, { status: 400 });
            }

            // 3. Mark transaction as claimed
            claimedHashes[cleanHash] = {
                userAddress: userAddress.toLowerCase(),
                betAmount: betAmount,
                claimedAt: new Date().toISOString()
            };
            try {
                await fs.mkdir(path.dirname(CLAIMED_FILE), { recursive: true });
                await fs.writeFile(CLAIMED_FILE, JSON.stringify(claimedHashes, null, 2));
            } catch (err) {
                console.error("Failed to write to claimed payouts database:", err);
            }

            // 4. Execute Payout via Agentic Wallet CLI
            const payoutAmount = (parseFloat(betAmount) * 2).toFixed(4); // 2x payout
            console.log(`User won PK Shooter! Sending ${payoutAmount} OKB to ${userAddress} using Agentic Wallet CLI...`);
            
            // Ensure onchainos path is configurable or available in system PATH
            const onchainosPath = process.env.ONCHAINOS_PATH || 'onchainos';
            const command = `"${onchainosPath}" wallet send --readable-amount ${payoutAmount} --recipient ${userAddress} --chain xlayer --force`;

            try {
                const { stdout } = await execPromise(command);
                console.log('CLI Output:', stdout);
                
                // Extract a txHash from stdout if possible
                const txMatch = stdout.match(/0x[a-fA-F0-9]{64}/);
                payoutTxHash = txMatch ? txMatch[0] : 'Transaction Sent';
            } catch (execError) {
                console.error('CLI Execution Error:', execError);
                // Return success on the game but note the payout failed
                return NextResponse.json({ 
                    success: true, 
                    score, 
                    won, 
                    payoutError: 'Failed to process payout via treasury CLI' 
                });
            }
        }

        return NextResponse.json({ 
            success: true, 
            score,
            won,
            payoutTxHash
        });

    } catch (error) {
        console.error('PK Play error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
