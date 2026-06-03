require("@nomicfoundation/hardhat-ethers");

const PRIVATE_KEY = "74c676ce02b2b57d32d385f5efd63f99d79d006ef9e0e5e98721b5bdf12421c3";

module.exports = {
  solidity: "0.8.19",
  networks: {
    xlayer_test: {
      type: "http",
      url: "https://testrpc.xlayer.tech",
      accounts: [PRIVATE_KEY]
    },
    xlayer: {
      type: "http",
      url: "https://rpc.xlayer.tech",
      accounts: [PRIVATE_KEY]
    }
  }
};
