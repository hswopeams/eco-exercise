const hre = require("hardhat");
const ethers = hre.ethers;

async function getHashedSecret(secretMessage, secretHandler) {
    const salt = ethers.utils.randomBytes(32);
    const saltHexValue = ethers.utils.hexlify(salt);
    const hashedSecret = await secretHandler.connect(rando).hashSecret(secretMessage, saltHexValue);
    return hashedSecret;
}

async function prepareSplitSignature(
    id,
    hashedSecret,
    blockNumber,
    party1,
    party2,
    verifyingContract
) {
    const chainId = (await ethers.provider.getNetwork()).chainId;

    domain = {
      name: 'SecretHandler',
      version: '1',
      chainId: chainId,
      verifyingContract: verifyingContract.address
    };

    types = {
      Secret: [
        { name: 'id', type: 'uint256' },
        { name: 'message', type: 'bytes32' },
        { name: 'blockNumber', type: 'uint256' },
        { name: 'party1', type: 'address' },
        { name: 'party2', type: 'address' }
      ]
    };
    value = {
        id: id,
        message: hashedSecret,
        blockNumber: blockNumber,
        party1: party1.address,
        party2: party2.address
    }

    signature = await party2._signTypedData(domain, types, value);
    splitSignature = ethers.utils.splitSignature(signature);

    return splitSignature;
}

exports.prepareSplitSignature = prepareSplitSignature;
exports.getHashedSecret = getHashedSecret;



