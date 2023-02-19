const hre = require("hardhat");
const ethers = hre.ethers;
const keccak256 = ethers.utils.keccak256;
const toUtf8Bytes = ethers.utils.toUtf8Bytes;
const { expect } = require("chai");
const Secret = require("../../scripts/domain/Secret");

/**
 *  Test the Secret domain entity
 */
describe("Secret", function () {
  // Suite-wide scope
  let accounts, id, secret, object, promoted, clone, dehydrated, rehydrated, key, value, struct;
  let message, party1, party2, blockNumber;

  context("📋 Constructor", async function () {
    beforeEach(async function () {
      // Get a list of accounts
      accounts = await ethers.getSigners();
    
      // Required constructor params
      id = "1";
      message = keccak256(toUtf8Bytes("this is a secret"));
      party1 = accounts[1].address;
      party2 = accounts[2].address;
      blockNumber = "1000000";
    });

    it("Should allow creation of a valid, fully populated Secret instance", async function () {
      message = keccak256(toUtf8Bytes("this is a secret"));

      // Create a valid secret
      secret = new Secret(id, message, blockNumber, party1, party2);
      expect(secret.idIsValid()).is.true;
      expect(secret.messageIsValid()).is.true;
      expect(secret.blockNumberIsValid()).is.true;
      expect(secret.party1IsValid()).is.true;
      expect(secret.party2IsValid()).is.true;
      expect(secret.isValid()).is.true;
    });
  });

  context("📋 Field validations", async function () {
    beforeEach(async function () {
      // Get a list of accounts
      accounts = await ethers.getSigners();

      // Required constructor params
      id = "1";
      message = keccak256(toUtf8Bytes("this is a secret"));
      party1 = accounts[1].address;
      party2 = accounts[2].address;
      blockNumber = "1000000";

      // Create a valid secret, then set fields in tests directly
      secret = new Secret(id, message, blockNumber, party1, party2);
      expect(secret.isValid()).is.true;
    });

    it("Always present, message must be a valid bytes32", async function () {
      // Invalid field value
      secret.message = "zedzdeadbaby";
      expect(secret.messageIsValid()).is.false;
      expect(secret.isValid()).is.false;

      // Invalid field value
      secret.message = new Date();
      expect(secret.messageIsValid()).is.false;
      expect(secret.isValid()).is.false;

      // Invalid field value
      secret.message = 12;
      expect(secret.messageIsValid()).is.false;
      expect(secret.isValid()).is.false;

      // Valid field value
      secret.message = keccak256(toUtf8Bytes("0"));
      expect(secret.messageIsValid()).is.true;
      expect(secret.isValid()).is.true;

      // Valid field value
      secret.message = ethers.utils.id("0")
      expect(secret.messageIsValid()).is.true;
      expect(secret.isValid()).is.true;

      // Valid field value
      secret.message = ethers.utils.hexZeroPad(ethers.utils.formatBytes32String("0"), 32);
      expect(secret.messageIsValid()).is.true;
      expect(secret.isValid()).is.true;

       // Valid field value
       secret.message = keccak256(toUtf8Bytes("this is a secret"));
       expect(secret.messageIsValid()).is.true;
       expect(secret.isValid()).is.true;
    });

    it("Always present, blockNumber must be the string representation of a BigNumber", async function () {
      // Invalid field value
      secret.blockNumber = "zedzdeadbaby";
      expect(secret.blockNumberIsValid()).is.false;
      expect(secret.isValid()).is.false;

      // Invalid field value
      secret.blockNumber = new Date();
      expect(secret.blockNumberIsValid()).is.false;
      expect(secret.isValid()).is.false;

      // Invalid field value
      secret.blockNumber = 12;
      expect(secret.blockNumberIsValid()).is.false;
      expect(secret.isValid()).is.false;

      // Valid field value
      secret.blockNumber = "0";
      expect(secret.blockNumberIsValid()).is.true;
      expect(secret.isValid()).is.true;

      // Valid field value
      secret.blockNumber = "1000000";
      expect(secret.blockNumberIsValid()).is.true;
      expect(secret.isValid()).is.true;
    });

    it("Always present, party1 must be a string representation of an EIP-55 compliant address", async function () {
      // Invalid field value
      secret.party1 = "0xASFADF";
      expect(secret.party1IsValid()).is.false;
      expect(secret.isValid()).is.false;

      // Invalid field value
      secret.party1 = "zedzdeadbaby";
      expect(secret.party1IsValid()).is.false;
      expect(secret.isValid()).is.false;

      // Valid field value
      secret.party1 = accounts[0].address;
      expect(secret.party1IsValid()).is.true;
      expect(secret.isValid()).is.true;

      // Valid field value
      secret.party1 = "0xec2fd5bd6fc7b576dae82c0b9640969d8de501a2";
      expect(secret.party1IsValid()).is.true;
      expect(secret.isValid()).is.true;
    });

    it("Always present, party2 must be a string representation of an EIP-55 compliant address", async function () {
      // Invalid field value
      secret.party2 = "0xASFADF";
      expect(secret.party2IsValid()).is.false;
      expect(secret.isValid()).is.false;

      // Invalid field value
      secret.party2 = "zedzdeadbaby";
      expect(secret.party2IsValid()).is.false;
      expect(secret.isValid()).is.false;

      // Valid field value
      secret.party2 = accounts[0].address;
      expect(secret.party2IsValid()).is.true;
      expect(secret.isValid()).is.true;

      // Valid field value
      secret.party2 = "0xec2fd5bd6fc7b576dae82c0b9640969d8de501a2";
      expect(secret.party2IsValid()).is.true;
      expect(secret.isValid()).is.true;
    });

 
  });

  context("📋 Utility functions", async function () {
    beforeEach(async function () {
      // Get a list of accounts
      accounts = await ethers.getSigners();

      // Required constructor params
      id = "1";
      message = keccak256(toUtf8Bytes("this is a secret"));
      party1 = accounts[1].address;
      party2 = accounts[2].address;
      blockNumber = "1000000";

      // Create a valid secret, then set fields in tests directly
      secret = new Secret(id, message, blockNumber, party1, party2);
      expect(secret.isValid()).is.true;

      // Get plain object
      object = {
        id,
        message,
        blockNumber,
        party1,
        party2,
      };

      // Struct representation
      struct = [id, message, blockNumber, party1, party2];
    });

    context("👉 Static", async function () {
      it("Secret.fromObject() should return a Secret instance with the same values as the given plain object", async function () {
        // Promote to instance
        promoted = Secret.fromObject(object);

        // Is a Secret instance
        expect(promoted instanceof Secret).is.true;

        // Key values all match
        for ([key, value] of Object.entries(secret)) {
          expect(JSON.stringify(promoted[key]) === JSON.stringify(value)).is.true;
        }
      });

      it("Secret.fromStruct() should return a Secret instance from a struct representation", async function () {
        // Get an instance from the struct
        secret = Secret.fromStruct(struct);

        // Ensure it is valid
        expect(secret.isValid()).to.be.true;
      });
    });

    context("👉 Instance", async function () {
      it("instance.toString() should return a JSON string representation of the Secret instance", async function () {
        dehydrated = secret.toString();
        rehydrated = JSON.parse(dehydrated);

        for ([key, value] of Object.entries(secret)) {
          expect(JSON.stringify(rehydrated[key]) === JSON.stringify(value)).is.true;
        }
      });

      it("instance.toObject() should return a plain object representation of the Secret instance", async function () {
        // Get plain object
        object = secret.toObject();

        // Not a Secret instance
        expect(object instanceof Secret).is.false;

        // Key values all match
        for ([key, value] of Object.entries(secret)) {
          expect(JSON.stringify(object[key]) === JSON.stringify(value)).is.true;
        }
      });

      it("Secret.toStruct() should return a struct representation of the Secret instance", async function () {
        // Get struct from secret
        struct = secret.toStruct();

        // Marshal back to a secret instance
        secret = Secret.fromStruct(struct);

        // Ensure it marshals back to a valid secret
        expect(secret.isValid()).to.be.true;
      });

      it("instance.clone() should return another Secret instance with the same property values", async function () {
        // Get plain object
        clone = secret.clone();

        // Is a Secret instance
        expect(clone instanceof Secret).is.true;

        // Key values all match
        for ([key, value] of Object.entries(secret)) {
          expect(JSON.stringify(clone[key]) === JSON.stringify(value)).is.true;
        }
      });
    });
  });
});
