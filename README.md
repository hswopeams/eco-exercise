# Secret Handler

## Description
This project provides functionality allowing two parties to commit to a secret they agree on. The parties must agree out-of-band on a secret message,
such as "our secret" or a number. The secret must be stored on-chain in such a way that its value cannot be observed on-chain. For this reason, the
secret must be encrypted. One of the parties must first call the hashSecret function to encrypt the message, along with a salt of random bytes. The salt is added to the 
secret message so that a pair that agrees on the same secret will not produce a hashed secret that collides with the hash of a secret if another pair
chooses the same secret. The SecretHandler contract address is added to the hash to make the hashed secret unique across multiple instances of the SecretHandler contract.

Either party can call the commitSecret function, but the caller is assumed to be party1 in the signed struct. The party that is calling the commitSecret function
has implicity agreed to the secret. The caller's address must also be in the signed Secret struct hash. If not, the signature verification will fail.
The transaction must be signed by party2.
Since the structured data being signed includes both parties' addresses, only 1 signature is required. This saves the approximately 8,300 gas it would cost 
to verify a second signature.
Either party can reveal the secret in a later block. After being successfully revealed, the secret is deleted.

This project uses EIP-712 structred data signatures. This way of signing offers advantages over EIP-191 signing. The data will be presented to users by wallets
like MetaMask in a more structured format that is easier to understand than a long hexadecimal string. It also provides a domain separator as part of the signature so that
the signature can only be validated by the dApp/smart contract for which it was intended. It also makes it possible to include the agreeing parties' addresses
in the signed message.

## Setup and Scripts
The SecretHandler project has been set up using Node 18.14. If you are using nvm, you can use the `nvm use` command to install and/or set the correct node version, which is
specified in the .nvmrc file.

Run
```
npm install

```
Copy .env.example to .env and provide values for environment variables.

There are a number of npm scripts included for those who are not familiar with hardhat commands.

To compile/build contracts
```
npm run build

```

To clean, run
```
npm run clean

```
To run all unit tests and see the gas report. For this to work properly, specify a value for the GAS_REPORTER_COINMARKETCAP_API_KEY property.
```
npm run test

```
To check code coverage
```
npm run coverage

```
To check contract size
```
npm run size
```

To check and fix contract linting 
```
npm run check:contracts
npm run tidy:contracts

```

To check and fix JavaScrpt test and script linting 
```
npm run check:scripts
npm run tidy:scripts
```

## Contract Deployment and Verification
A simple script for deploying and verifying the SecretHandler contract has been provided, along with npm scripts for deploying to the hardhat, localhost, and
Polygon Numbai networks.

### Hardhat

To deploy to the built-in hardhat chain without running tests
```
npm run deploy:hardhat
```
### Localhost
To deploy to a separate hardhat node, first run the following command
```
npx hardhat node
```
In a separate terminal run the commmand below. It is recommended to change the value of CONFIRMATIONS in the .env file to `1` when deploying to localhost.
```
npm run deploy:localhost
```

### Polygon Mumbai
To deploy and verify the Secrethandler contract on Polygon Mumbain, run the following command. Set the following .env properties first.
* DEPLOYER_MUMBAI_TXNODE - Must contain an RPC node URL. A valid one has been provided in .env.example.
* DEPLOYER_MUMBAI_KEY - must contain the private key of the address you wish to use to deploy the contract
* CONFIRMATIONS - It is recommended to set this value to `6` or more when deploying to Polygon.

```
npm run deploy:mumbai
```

The SecretHandler contract has been deployed and verified on Polygon Mumbai
<https://mumbai.polygonscan.com/address/0x1d7f77de3c3f9222e14d779dd4e585203bc7dbd0#code>
