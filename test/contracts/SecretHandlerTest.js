const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect, assert} = require("chai");
const { ethers } = require("hardhat");
const {keccak256, solidityPack, solidityKeccak256} = ethers.utils;
const { BigNumber } = ethers.BigNumber;
const crypto = require('crypto');
const { RevertReasons } = require("../util/revert-reasons.js");
const { prepareSplitSignature, getHashedSecret } = require("../util/utils.js");
const Secret = require("../../scripts/domain/Secret");

describe("SecretHandler", function () {
   // Suite-wide scope
   let secret, object, promoted, clone, dehydrated, rehydrated, key, secretStruct;
   let id, message, party1, party2, blockNumber;
   let secretHandler;
   let nextSecretId, salt, hashedSecret, secretBytes32, chainId;
   let domain, types, value;
   let signature, splitSignature, r, s, v;

  //before each test case in the suite
  beforeEach(async function () {
    // Get signers
    [owner, party1, party2, rando] = await ethers.getSigners();

    nextSecretId = "1";

    // Deploy contract
    const SecretHandler = await ethers.getContractFactory("SecretHandler");
    secretHandler = await SecretHandler.deploy();
  })

  describe("Deployment", function () {
    it("should set the right Id", async function () {
      expect(await secretHandler.connect(rando).nextSecretId()).to.equal(nextSecretId);
    });

  });

  describe("hashSecret()", function () {
    context("Revert", function () {
      it("should revert with the right error if salt is invalid", async function () {
        secretBytes32 = ethers.utils.formatBytes32String("this is the secret");
        salt = ethers.utils.hexZeroPad("0x", 32)
       
        await expect(secretHandler.connect(rando).hashSecret(secretBytes32, salt)).to.be.revertedWith(
          RevertReasons.INVALID_SALT
        );
      });

      it("should revert with the right error if plain secret invalid", async function () {
        secretBytes32 = ethers.utils.hexZeroPad("0x", 32)
        salt = ethers.utils.randomBytes(32);
       
        await expect(secretHandler.connect(rando).hashSecret(secretBytes32, salt)).to.be.revertedWith(
          RevertReasons.INVALID_SECRET
        );
      });


    });

    context("Generate valid hash", function () {
      it("should correctly generate a hash", async function () {
        secretBytes32 = ethers.utils.formatBytes32String("this is the secret");
        salt = ethers.utils.randomBytes(32);
        const saltHexValue = ethers.utils.hexlify(salt);
      
        hashedsecret = await secretHandler.connect(rando).hashSecret(secretBytes32, saltHexValue);
        expect(hashedsecret).to.not.equal(ethers.constants.HashZero);
      });
    });
  });

  describe("commitSecret() ", function () {
    beforeEach(async function () {
        secretBytes32 = ethers.utils.formatBytes32String("this is the secret");
        hashedSecret = await getHashedSecret(secretBytes32, secretHandler);
        id = await secretHandler.nextSecretId();

        //Set blockNumber to 0 now. The actual blocknumber will be retrieved from the event
        splitSignature = await prepareSplitSignature(
          id,
          hashedSecret,
          ethers.constants.Zero,
          party1,
          party2,
          secretHandler
        )

        // Create a valid secret object, then set fields in tests directly
        secret = new Secret(id.toString(),  hashedSecret, "0", party1.address, party2.address);
        expect(secret.isValid()).is.true;
      
        // Get secret as struct
        const secretStruct = secret.toStruct();

    })
    describe("Revert", function () {
      it("should revert with the right error if party2 address is invalid", async function () {
        await expect(
          secretHandler.connect(party1).commitSecret(
            hashedSecret, 
            ethers.constants.AddressZero, 
            splitSignature.r, 
            splitSignature.s, 
            splitSignature.v)
          ).to.be.revertedWith(
            RevertReasons.INVALID_ADDRESS
          );
      });

      it.only("should revert with the right error if secret message is invalid", async function () {
        secretBytes32 = ethers.utils.hexZeroPad("0x", 32)
        const invalidHashedSecret = await getHashedSecret(secretBytes32, secretHandler);
        
        await expect(
          secretHandler.connect(party1).commitSecret(
            invalidHashedSecret, 
            party2.address, 
            splitSignature.r, 
            splitSignature.s, 
            splitSignature.v)
          ).to.be.revertedWith(
            RevertReasons.INVALID_SECRET
          );
       
      });

      it("should revert with the right error if provided party2 did not sign the transaction", async function () {
       
      });

      it("should revert with the right error if msg.sender is not part of the signed Secret struct signed by party2", async function () {
       
      });
     
    });

    describe("Events", function () {
      it("should emit an event on commit", async function () {
        const tx = await secretHandler.connect(party1).commitSecret(hashedSecret, party2.address, splitSignature.r, splitSignature.s, splitSignature.v);

        // Set blockNumber
        secret.blockNumber = tx.blockNumber.toString();
        expect(secret.isValid()).is.true;

        // Get secret as struct
        const secretStruct = secret.toStruct();

        await expect(tx)
          .to.emit(secretHandler, "SecretCommitted")
          .withArgs(id , secretStruct, party1.address); 
    
      });
    });

    describe("State", function () {
      it("should change state correctly", async function () {
       
      });
    });
  });
  describe("revealSecret() ", function () {
    describe("Revert", function () {
      it("should revert with the right error if caller is not party to the secret", async function () {
      
      });


      it("should revert with the right error if reveal is not called at a later block", async function () {
        
      });

      it("should revert with the right error if provided party did not sign the transaction", async function () {
       
      });

     
    });

    describe("Events", function () {
      it("should emit an event on reveal", async function () {
       
      });
    });

    describe("State", function () {
      it("should change state correctly", async function () {
      
      });
    });
  });
  describe("pause() ", function () {
    describe("Revert", function () {
      it("should revert with the right error if caller is not party to the secret", async function () {
       
      });


      it("should revert with the right error if reveal is not called at a later block", async function () {
        
      });

      it("should revert with the right error if provided party did not sign the transaction", async function () {
       
      });

     
    });

    describe("Events", function () {
      it("should emit an event on reveal", async function () {
       
      });
    });

    describe("State", function () {
      it("should change state correctly", async function () {
      
      });
    });
  });
  describe("unpause() ", function () {
    describe("Revert", function () {
      it("should revert with the right error if caller is not party to the secret", async function () {
      
      });


      it("should revert with the right error if reveal is not called at a later block", async function () {
        
      });

      it("should revert with the right error if provided party did not sign the transaction", async function () {
       
      });

     
    });

    describe("Events", function () {
      it("should emit an event on reveal", async function () {
       
      });
    });

    describe("State", function () {
      it("should change state correctly", async function () {
      
      });
    });
  });
  describe("kill() ", function () {
    describe("Revert", function () {
      it("should revert with the right error if caller is not party to the secret", async function () {
       
      });


      it("should revert with the right error if reveal is not called at a later block", async function () {
        
      });

      it("should revert with the right error if provided party did not sign the transaction", async function () {
       
      });

     
    });

    describe("Events", function () {
      it("should emit an event on reveal", async function () {
       
      });
    });

    describe("State", function () {
      it("should change state correctly", async function () {
      
      });
    });
  });
  describe("revealSecret() ", function () {
    describe("Revert", function () {
      it("should revert with the right error if caller is not party to the secret", async function () {
       
      });


      it("should revert with the right error if reveal is not called at a later block", async function () {
        
      });

      it("should revert with the right error if provided party did not sign the transaction", async function () {
       
      });

     
    });

    describe("Events", function () {
      it("should emit an event on reveal", async function () {
        
      });
    });

    describe("State", function () {
      it("should change state correctly", async function () {
      
      });
    });
  });
});
