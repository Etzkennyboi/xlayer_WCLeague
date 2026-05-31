import { NextResponse } from 'next/server';
import { ethers } from 'ethers';
import { CONFIG, ABIS } from '../../../web3/config.js'; 

export async function POST(request) {
    try {
        const { userAddress, badgeType, matchInfo } = await request.json();

        // Securely use a backend-only private key
        const pk = process.env.MINTER_PRIVATE_KEY || process.env.ORACLE_PRIVATE_KEY;
        
        if (!pk) {
            // No key provided, returning a mock success for demo purposes
            return NextResponse.json({ success: true, mock: true, message: "No backend MINTER_PRIVATE_KEY set." }, { status: 200 });
        }

        const provider = new ethers.providers.JsonRpcProvider(CONFIG.XLAYER_RPC);
        const signer = new ethers.Wallet(pk, provider);
        
        const contract = new ethers.Contract(CONFIG.WORLD_CUP_NFT_ADDRESS, ABIS.WorldCupNFT, signer);
        const tokenURI = "ipfs://QmMockMetadataURI"; // Future: Generate dynamic IPFS CID here
        
        console.log(`Backend Minting NFT for ${userAddress}...`);
        const tx = await contract.mintBadge(userAddress, tokenURI, badgeType, matchInfo, {
            gasLimit: 300000
        });
        
        await tx.wait();
        
        return NextResponse.json({ success: true, txHash: tx.hash }, { status: 200 });

    } catch (error) {
        console.error("Backend Minting Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
