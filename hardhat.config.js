const dotEnvConfig = require("dotenv");
dotEnvConfig.config();
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-contract-sizer");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  gasReporter: {
    currency: "USD",
    enabled: true,
    gasPrice: 300,
    coinmarketcap: process.env.GAS_REPORTER_COINMARKETCAP_API_KEY,
    showTimeSpent: true,
    showMethodSig: false,
  },
};
