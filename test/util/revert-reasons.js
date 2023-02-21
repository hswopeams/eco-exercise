/**
 * Reasons for SecretHandler transactions to revert
 */
exports.RevertReasons = {

  // Revert reasons
  INVALID_ADDRESS: "Invalid address",
  INVALID_SALT: "Invalid salt",
  INVALID_SECRET: "Invalid secret",
  SIGNER_AND_SIGNATURE_DO_NOT_MATCH: "Signer and signature do not match",

  // Revert Reasons from imports
  ECDSA_INVALID_SIGNATURE: "ECDSA: invalid signature"
};
