// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const network = hre.network.name;
const tipMultiplier = hre.ethers.BigNumber.from(process.env.TIP_MULTIPLIER);
const tipSuggestion = "1500000000"; // ethers.js always returns this constant, it does not vary per block
const maxPriorityFeePerGas = hre.ethers.BigNumber.from(tipSuggestion).mul(tipMultiplier);
const confirmations = network == "hardhat" ? 1 : process.env.CONFIRMATIONS;
const { getFees } = require("./util/utils");

async function deployContracts() {
  const SecretHandler = await hre.ethers.getContractFactory("SecretHandler");
  const secretHandler = await SecretHandler.deploy(await getFees(maxPriorityFeePerGas));
  await secretHandler.deployTransaction.wait(confirmations);
  
  console.log(
    `SecretHandler deployed to ${secretHandler.address}`
  );

  return secretHandler;
}

async function verifyContracts(contract) {
  //verify SecretHandler
  try {
    await hre.run('verify:verify', {
      address: contract.address,
    });
  } catch (error) {
    logError('SecretHandler', error.message);
  }
}

function logError(contractName, msg) {
  console.log(
    `\x1b[31mError while trying to verify contract: ${contractName}!`
  );
  console.log(`Error message: ${msg}`);
  resetConsoleColor();
}

function resetConsoleColor() {
  console.log('\x1b[0m');
}

async function main() {
  const secrethandler = await deployContracts();
  await verifyContracts(secrethandler);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
