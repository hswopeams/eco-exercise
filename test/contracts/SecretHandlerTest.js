const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const crypto = require('crypto');
const { RevertReasons } = require("../../scripts/util/revert-reasons.js");

describe("SecretHandler", function () {
   // Suite-wide scope
   let secret, object, promoted, clone, dehydrated, rehydrated, key, value, struct;
   let id, message, party1, party2, blockNumber;
   let secretHandler;
   let nextSecretId, salt, plainSecret;

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
      expect(await secretHandler.nextSecretId()).to.equal(nextSecretId);
    });

  });

  describe("hashSecret()", function () {
    context("Revert", function () {
      it("should revert with the right error if salt is invalid", async function () {
        plainSecret = ethers.utils.formatBytes32String("this is the secret");
        salt = ethers.utils.hexZeroPad("0x", 32)
       
        await expect(secretHandler.hashSecret(plainSecret, salt)).to.be.revertedWith(
          RevertReasons.INVALID_SALT
        );
      });

      it("should revert with the right error if parties are invalid", async function () {
       
      });


      it("should revert with the right error if message invalid", async function () {
       
      });

      it("should revert with the right error if secretId is invalid", async function () {
    
      });
    });

    context("Generate hash correctly", function () {
      it("should correctly generate a hash", async function () {
       
      });
    });
  });
  describe("commitSecret() ", function () {
    describe("Revert", function () {
      it("should revert with the right error if party address is invalid", async function () {
      
      });


      it("should revert with the right error if message invalid", async function () {
       
      });

      it("should revert with the right error if provided party2 did not sign the transaction", async function () {
       
      });

      it("should revert with the right error if msg.sender is not part of the signed Secret struct signed by party2", async function () {
       
      });
     
    });

    describe("Events", function () {
      it("should emit an event on commit", async function () {
        /*
        const { lock, unlockTime, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(lock.withdraw())
          .to.emit(lock, "Withdrawal")
          .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
        */
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
