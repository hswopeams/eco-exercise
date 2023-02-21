const dotEnvConfig = require("dotenv");
dotEnvConfig.config();
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-contract-sizer");
require("@nomiclabs/hardhat-etherscan");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      //accounts: process.env.DEPLOYER_HARDHAT_MNEMONIC
    },
    mumbai: {
      url: process.env.DEPLOYER_MUMBAI_TXNODE,
      accounts: [process.env.DEPLOYER_MUMBAI_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.DEPLOYER_POLYGONSCAN_API_KEY
    },
  },
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
