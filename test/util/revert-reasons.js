/**
 * Reasons for SecretHandler transactions to revert
 */
exports.RevertReasons = {
  // Revert reasons
  INVALID_ADDRESS: "Invalid address",
  INVALID_SALT: "Invalid salt",
  INVALID_SECRET: "Invalid secret",
  SIGNER_AND_SIGNATURE_DO_NOT_MATCH: "Signer and signature do not match",
  CALLER_NOT_PARTY: "Caller is not party to the secret",
  INVALID_SECRET_ID: "Invalid secretId",
  SECRETS_DO_NOT_MATCH: "Revealed secret does not match committed secret",

  // Revert Reasons from imports
  ECDSA_INVALID_SIGNATURE: "ECDSA: invalid signature",
  NOT_OWNER: "Ownable: caller is not the owner",
  PAUSED: "Pausable: paused",
  NOT_PAUSED: "Pausable: not paused",
};
