const fs = require('fs');
const ethers = require('ethers');

// ABI and Bytecode from Hardhat compilation
const artifactPath = './artifacts/contracts/PredictionMarket.sol/PredictionMarket.json';
const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

async function main() {
    const PRIVATE_KEY = "74c676ce02b2b57d32d385f5efd63f99d79d006ef9e0e5e98721b5bdf12421c3";
    // Connect to X Layer Testnet
    const provider = new ethers.providers.JsonRpcProvider("https://testrpc.xlayer.tech");
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    const oracleAddress = "0x491d07ede06eebf25a3a0ff3ce3b78ca78af4aac";
    console.log("Deployer address:", wallet.address);
    console.log("Oracle address:", oracleAddress);
    
    const balance = await provider.getBalance(wallet.address);
    console.log("Deployer balance:", ethers.utils.formatEther(balance), "OKB");

    console.log("\nDeploying PredictionMarket.sol...");
    const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
    const contract = await factory.deploy(oracleAddress);
    
    console.log("Waiting for deployment transaction...");
    await contract.deployTransaction.wait();
    console.log("Contract successfully deployed to:", contract.address);
}

main().catch((error) => {
    console.error("Deployment failed:", error);
    process.exitCode = 1;
});
