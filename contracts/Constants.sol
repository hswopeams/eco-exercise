//SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity 0.8.17;

/**
 * @title SecretHandler
 * @author Heather Swope
 *
 * @notice Provides functionality allowing two parties to commit to a secret they agree on and to reveal that secret.
 */
contract Constants {
    // Revert Reasons
    string constant INVALID_ADDRESS = "Invalid address";
    string constant INVALID_SALT = "Invalid salt";
    string constant INVALID_SECRET = "Invalid secret";
    string constant INVALID_SECRET_ID = "Invalid secretId";
    string constant TRANSFER_FAILED = "Transfer failed";
    string constant INVALID_SIGNATURE = "Invalid signature";
    string constant SIGNER_AND_SIGNATURE_DO_NOT_MATCH = "Signer and signature do not match";
    string constant CALLER_NOT_PARTY = "Caller is not party to the secret";
    string constant SECRETS_DO_NOT_MATCH = "Revealed secret does not match committed secret";
    string constant REVEAL_TOO_SOON = "The secret can only be revealed in a block later than the secret commit block";
    string constant KILLED = "Killable: killed";
    string constant ALIVE = "Killable: alive";

   
}