import hre from "hardhat";

async function main() {
  const oracleAddress = "0x491d07ede06eebf25a3a0ff3ce3b78ca78af4aac";
  console.log("Deploying PredictionMarket with oracleNode:", oracleAddress);
  
  const PredictionMarket = await hre.ethers.getContractFactory("PredictionMarket");
  const contract = await PredictionMarket.deploy(oracleAddress);
  
  if (contract.deployed) {
    await contract.deployed();
  } else {
    await contract.waitForDeployment();
  }

  const address = contract.address || await contract.getAddress();
  console.log("PredictionMarket deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
