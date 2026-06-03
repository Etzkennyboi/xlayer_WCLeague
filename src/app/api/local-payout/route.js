import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execPromise = promisify(exec);

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        const body = await req.json();
        const { userAddress, payoutAmount } = body;

        if (!userAddress || !payoutAmount) {
            return NextResponse.json({ error: 'Missing user address or payout amount' }, { status: 400 });
        }

        console.log(`Processing local match payout of ${payoutAmount} OKB to ${userAddress}...`);
        
        // Ensure onchainos path is configurable or available in system PATH
        const onchainosPath = process.env.ONCHAINOS_PATH || 'onchainos';
        const command = `"${onchainosPath}" wallet send --readable-amount ${payoutAmount} --recipient ${userAddress} --chain xlayer --force`;

        let payoutTxHash = null;

        try {
            const { stdout } = await execPromise(command);
            console.log('CLI Output:', stdout);
            
            // Extract a txHash from stdout if possible
            const txMatch = stdout.match(/0x[a-fA-F0-9]{64}/);
            payoutTxHash = txMatch ? txMatch[0] : 'Transaction Sent';
        } catch (execError) {
            console.error('CLI Execution Error:', execError);
            return NextResponse.json({ error: 'Failed to process payout via treasury' }, { status: 500 });
        }

        return NextResponse.json({ 
            success: true, 
            payoutTxHash
        });

    } catch (error) {
        console.error('Local Payout error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
