import { ethers } from 'ethers';
import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const originalFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
    if (options && options.referrer === "client") {
        delete options.referrer;
    }
    return originalFetch(url, options);
};

const COOLDOWN_FILE = path.join(process.cwd(), 'data', 'cooldowns.json');
const COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 hours

const RPC_URL = 'https://rpc.xlayer.tech'; // MAINNET RPC
const USDT_ADDRESS = process.env.USDT_CONTRACT_ADDRESS || '0x1E4a5963aBFD975d8c9021ce480b42188849D41d'; // Common Mainnet USDT

const ERC20_ABI = [
    "function transfer(address to, uint amount) returns (bool)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address account) view returns (uint256)"
];

async function getCooldowns() {
    try {
        const data = await fs.readFile(COOLDOWN_FILE, 'utf8');
        return JSON.parse(data);
    } catch {
        return {}; // File doesn't exist or invalid
    }
}

async function saveCooldowns(cooldowns) {
    try {
        await fs.mkdir(path.dirname(COOLDOWN_FILE), { recursive: true });
        await fs.writeFile(COOLDOWN_FILE, JSON.stringify(cooldowns, null, 2));
    } catch (error) {
        console.error('Error saving cooldowns:', error);
    }
}

export async function POST(req) {
    try {
        const body = await req.json();
        const { userAddress, action } = body;

        if (!userAddress) {
            return NextResponse.json({ error: 'Missing user address' }, { status: 400 });
        }

        const lowerAddress = userAddress.toLowerCase();
        const cooldowns = await getCooldowns();
        const lastPlayTime = cooldowns[lowerAddress] || 0;
        const now = Date.now();

        if (now - lastPlayTime < COOLDOWN_MS) {
            const timeLeft = Math.ceil((COOLDOWN_MS - (now - lastPlayTime)) / 1000);
            return NextResponse.json({ 
                error: 'Cooldown active', 
                cooldownActive: true, 
                timeLeftSeconds: timeLeft 
            }, { status: 403 });
        }

        if (action === 'check') {
            return NextResponse.json({ success: true, message: 'Ready to play' });
        }

        // Using OKX Agentic Wallet CLI (Option 2)
        const exec = require('child_process').exec;
        const util = require('util');
        const execPromise = util.promisify(exec);

        // Record cooldown IMMEDIATELY to prevent double-clicks
        cooldowns[lowerAddress] = now;
        await saveCooldowns(cooldowns);

        console.log(`Sending 1 USDT to ${userAddress} using Agentic Wallet CLI on Mainnet...`);
        
        // Ensure onchainos path is configurable or available in system PATH
        const onchainosPath = process.env.ONCHAINOS_PATH || 'C:\\Users\\User\\.local\\bin\\onchainos.exe';
        const command = `"${onchainosPath}" wallet send --readable-amount 1 --recipient ${userAddress} --chain xlayer --contract-token ${USDT_ADDRESS} --force`;

        try {
            const { stdout, stderr } = await execPromise(command);
            console.log('CLI Output:', stdout);
            
            // Extract a txHash from stdout if possible, or just return success
            const txMatch = stdout.match(/0x[a-fA-F0-9]{64}/);
            const txHash = txMatch ? txMatch[0] : 'Transaction Sent';

            return NextResponse.json({ 
                success: true, 
                txHash: txHash
            });
        } catch (execError) {
            console.error('CLI Execution Error:', execError);
            throw new Error('Agentic Wallet CLI failed to send transaction');
        }

    } catch (error) {
        console.error('Payout error:', error);
        return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
    }
}
