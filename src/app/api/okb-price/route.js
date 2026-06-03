import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function GET() {
    try {
        // Resolve the path to the Agentic Wallet CLI (or fall back to system PATH)
        const onchainosPath = process.env.ONCHAINOS_PATH || 'onchainos';
        
        // Fetch Wrapped OKB price on X Layer Mainnet
        const command = `"${onchainosPath}" market price --address 0xe538905cf8410324e03a5a23c1c177a474d59b2b --chain xlayer`;
        
        try {
            const { stdout } = await execAsync(command);
            const resData = JSON.parse(stdout);
            
            if (resData && resData.ok && resData.data && resData.data[0]) {
                const price = parseFloat(resData.data[0].price);
                if (!isNaN(price) && price > 0) {
                    return NextResponse.json({ success: true, price });
                }
            }
            throw new Error("Invalid price structure returned from CLI");
        } catch (cliError) {
            console.error("CLI Execution failed, falling back to default.", cliError);
            // Fallback for development/testing if CLI is unavailable
            return NextResponse.json({ success: true, price: 45.00, fallback: true });
        }

    } catch (error) {
        console.error("Error fetching OKB price:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
