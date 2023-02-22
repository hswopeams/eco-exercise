const { bigNumberIsValid, addressIsValid, bytes32IsValid } = require("../util/validations.js");

/**
 * Domain Entity: Secret
 *
 */
class Secret {
  /*
    struct Secret {
      uint256 id;
      bytes32 message;
      uint256 blockNumber;
      address party1;
      address party2;
    }
  */

  constructor(id, message, blockNumber, party1, party2) {
    this.id = id;
    this.message = message;
    this.blockNumber = blockNumber;
    this.party1 = party1;
    this.party2 = party2;
  }

  /**
   * Get a new Secret instance from a pojo representation
   * @param o
   * @returns {Secret}
   */
  static fromObject(o) {
    const { id, message, blockNumber, party1, party2 } = o;
    return new Secret(id, message, blockNumber, party1, party2);
  }

  /**
   * Get a new Secret instance from a returned struct representation
   * @param struct
   * @returns {*}
   */
  static fromStruct(struct) {
    let id, message, blockNumber, party1, party2;

    // destructure struct
    [id, message, blockNumber, party1, party2] = struct;

    return Secret.fromObject({
      id: id.toString(),
      message: message.toString(),
      blockNumber: blockNumber.toString(),
      party1,
      party2,
    });
  }

  /**
   * Get a database representation of this Secret instance
   * @returns {object}
   */
  toObject() {
    return JSON.parse(this.toString());
  }

  /**
   * Get a string representation of this Secret instance
   * @returns {string}
   */
  toString() {
    return JSON.stringify(this);
  }

  /**
   * Get a struct representation of this Secret instance
   * @returns {string}
   */
  toStruct() {
    return [this.id, this.message, this.blockNumber, this.party1, this.party2];
  }

  /**
   * Clone this Secret
   * @returns {Secret}
   */
  clone() {
    return Secret.fromObject(this.toObject());
  }

  /**
   * Is this Secret instance's id field valid?
   * Must be a string representation of a big number
   * @returns {boolean}
   */
  idIsValid() {
    return bigNumberIsValid(this.id);
  }

  /**
   * Is this Secret instance's message field valid?
   * Must be a BytesLike
   * @returns {boolean}
   */
  messageIsValid() {
    return bytes32IsValid(this.message);
  }

  /**
   * Is this Secret instance's blockNumber field valid?
   * Must be a string representation of a big number
   * @returns {boolean}
   */
  blockNumberIsValid() {
    const { blockNumber } = this;
    return bigNumberIsValid(blockNumber);
  }

  /**
   * Is this Secret instance's party1 field valid?
   * Must be a eip55 compliant Ethereum address
   * @returns {boolean}
   */
  party1IsValid() {
    return addressIsValid(this.party1);
  }

  /**
   * Is this Secret instance's party2 field valid?
   * Must be a eip55 compliant Ethereum address
   * @returns {boolean}
   */
  party2IsValid() {
    return addressIsValid(this.party2);
  }
  /**
   * Is this Secret instance valid?
   * @returns {boolean}
   */
  isValid() {
    return (
      this.idIsValid() &&
      this.messageIsValid() &&
      this.blockNumberIsValid() &&
      this.party1IsValid() &&
      this.party2IsValid()
    );
  }
}

// Export
module.exports = Secret;
