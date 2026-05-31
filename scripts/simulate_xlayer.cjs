const fs = require('fs');
const ethers = require('ethers');

// ABI and Bytecode from Hardhat compilation
const artifactPath = './artifacts/contracts/PredictionMarket.sol/PredictionMarket.json';
const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

async function main() {
    const PRIVATE_KEY = "74c676ce02b2b57d32d385f5efd63f99d79d006ef9e0e5e98721b5bdf12421c3";
    const provider = new ethers.providers.JsonRpcProvider("https://testrpc.xlayer.tech");
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    console.log("Starting simulation on X Layer Testnet...");
    console.log("Wallet address:", wallet.address);
    
    let balance = await provider.getBalance(wallet.address);
    console.log("Initial Balance:", ethers.utils.formatEther(balance), "OKB");

    // 1. Deploy the Contract
    console.log("\nDeploying PredictionMarket.sol...");
    const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
    // deployer acts as the Oracle Node as well
    const marketContract = await factory.deploy(wallet.address);
    console.log("Waiting for deployment transaction...");
    await marketContract.deployTransaction.wait();
    console.log("Contract deployed to:", marketContract.address);

    // 2. Create 5 Matches
    console.log("\nCreating 5 Markets...");
    const fixtureIds = ["SIM-M1", "SIM-M2", "SIM-M3", "SIM-M4", "SIM-M5"];
    
    for (let id of fixtureIds) {
        const tx = await marketContract.createMarket(id);
        await tx.wait();
        console.log(`  Market created: ${id}`);
    }

    // 3. Place Bets
    // The user requested: 3 matches have 0.002 OKB bet, rest of the budget to opposing pools.
    // We will do: 
    // - SIM-M1, SIM-M2, SIM-M3: Place a 0.002 OKB bet on HOME_WIN. (Total = 0.006 OKB)
    // The contract doesn't allow a user to bet multiple times on the same match.
    console.log("\nPlacing bets of 0.002 OKB on 3 matches...");
    const betAmount = ethers.utils.parseEther("0.002");

    for (let i = 0; i < 3; i++) {
        const id = fixtureIds[i];
        const tx = await marketContract.placeBet(id, 1, { value: betAmount, gasLimit: 500000 });
        await tx.wait();
        console.log(`  Placed 0.002 OKB bet on HOME_WIN for ${id}`);
    }

    // 4. Resolve Markets
    console.log("\nResolving all markets as HOME_WIN (1) to ensure victory...");
    for (let id of fixtureIds) {
        const tx = await marketContract.resolveMarket(id, 1);
        await tx.wait();
        console.log(`  Resolved ${id} as HOME_WIN`);
    }

    // 5. Claim Winnings
    console.log("\nClaiming winnings for the 3 bet matches...");
    for (let i = 0; i < 3; i++) {
        const id = fixtureIds[i];
        try {
            const tx = await marketContract.claimWinnings(id, { gasLimit: 500000 });
            await tx.wait();
            console.log(`  Claimed winnings for ${id}`);
        } catch (e) {
            console.log(`  Failed to claim for ${id}: ${e.message}`);
        }
    }

    balance = await provider.getBalance(wallet.address);
    console.log("\nSimulation Complete.");
    console.log("Final Account balance:", ethers.utils.formatEther(balance), "OKB");
}

main().catch((error) => {
    console.error("Simulation failed:", error);
    process.exitCode = 1;
});
