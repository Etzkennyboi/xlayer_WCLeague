const { ethers } = require('ethers');

const rpcUrl = 'https://testrpc.xlayer.tech';
const contractAddress = '0x25b82B010f5FC38417d1d70f62B0f7b37cB3eCc5';

const abi = [
    "function getMarket(string _fixtureId) external view returns (string fixtureId, uint8 outcome, bool isResolved, uint256 totalHomePool, uint256 totalDrawPool, uint256 totalAwayPool)",
];

async function main() {
    console.log('Connecting to provider...');
    const provider = new ethers.providers.StaticJsonRpcProvider({
        url: rpcUrl,
        timeout: 10000
    }, {
        chainId: 195,
        name: 'xlayer-testnet'
    });
    
    console.log('Provider created. Fetching network...');
    try {
        const network = await provider.getNetwork();
        console.log('Network:', network);
        
        console.log('Connecting to contract...');
        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        console.log('Fetching market wc-2026-m2...');
        const market = await contract.getMarket('wc-2026-m2');
        console.log('Market wc-2026-m2:', market);
    } catch (e) {
        console.error('Error:', e);
    }
}

main();
