const hre = require("hardhat");
const ethers = hre.ethers;

async function getBaseFee() {
  if (hre.network.name == "hardhat" || hre.network.name == "localhost") {
    // getBlock("pending") doesn't work with hardhat. This is the value one gets by calling getBlock("0")
    return "1000000000";
  }
  const { baseFeePerGas } = await ethers.provider.getBlock("pending");
  return baseFeePerGas;
}

async function getMaxFeePerGas(maxPriorityFeePerGas) {
  return maxPriorityFeePerGas.add(await getBaseFee());
}

async function getFees() {
  // maxPriorityFeePerGas TODO add back as an argument when ethers.js supports 1559 on polygon
  const { gasPrice } = await ethers.provider.getFeeData();
  const newGasPrice = gasPrice.mul(ethers.BigNumber.from("2"));
  //  return { maxPriorityFeePerGas, maxFeePerGas: await getMaxFeePerGas(maxPriorityFeePerGas) }; // TODO use when ethers.js supports 1559 on polygon
  return { gasPrice: newGasPrice };
}

exports.getBaseFee = getBaseFee;
exports.getMaxFeePerGas = getMaxFeePerGas;
exports.getFees = getFees;