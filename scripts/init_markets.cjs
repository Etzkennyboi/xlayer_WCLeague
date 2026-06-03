const fs = require('fs');
const path = require('path');
const ethers = require('ethers');

// ABI and Address
const artifactPath = path.join(__dirname, '../artifacts/contracts/PredictionMarket.sol/PredictionMarket.json');
const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
const contractAddress = '0x25b82B010f5FC38417d1d70f62B0f7b37cB3eCc5';

async function main() {
    require('dotenv').config();
    const PRIVATE_KEY = process.env.NEXT_PUBLIC_MINTER_PK || "74c676ce02b2b57d32d385f5efd63f99d79d006ef9e0e5e98721b5bdf12421c3";
    const provider = new ethers.providers.StaticJsonRpcProvider("https://testrpc.xlayer.tech", { name: 'xlayer_test', chainId: 1952 });
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

    console.log("Using deployer address:", wallet.address);
    const contract = new ethers.Contract(contractAddress, artifact.abi, wallet);

    const fixturesPath = path.join(__dirname, '../data/prediction_fixtures.json');
    const fixtures = JSON.parse(fs.readFileSync(fixturesPath, 'utf8'));

    for (const fixture of fixtures) {
        console.log(`Checking market for ${fixture.id}...`);
        const market = await contract.getMarket(fixture.id);
        if (market.fixtureId === "") {
            console.log(`Creating market for ${fixture.id}...`);
            try {
                const tx = await contract.createMarket(fixture.id);
                console.log(`Tx sent: ${tx.hash}`);
                await tx.wait();
                console.log(`Market ${fixture.id} created successfully!`);
            } catch (e) {
                console.error(`Error creating market ${fixture.id}:`, e);
            }
        } else {
            console.log(`Market ${fixture.id} already exists.`);
        }
    }
}

main().catch(console.error);
