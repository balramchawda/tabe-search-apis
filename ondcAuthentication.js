const axios = require("axios");
const _ = require("lodash");
const Users = require("./models/user");
const {
  signMessage,
  createSigningString,
  verifyMessage,
  split_auth_header,
} = require("./util");
require("dotenv").config();

async function createAuthorizationHeader(message, providerId) {
  const { signing_string, expires, created } = await createSigningString(
    message
  );
  const signature = await signMessage(
    signing_string,
    "ZQaGH+yxhjHZ6ZeWti2voeI96nPkEZlEZElOm5m9rFK4pH7o72/c5h4v3d3VcHWwiZN69G2Bo3QL3XZEWRd0og=="
  );
  let unique_key_id = providerId;
  if (process.env.SERVER === "PRODUCTION") {
    if (providerId !== "4469eb76-7c60-4c7b-8580-161078b48f3e") {
      let ondcUniqueId = await Users.findOne({ _id: providerId }).select(
        "ondcUniqueKeyId"
      );
      if (ondcUniqueId?.ondcUniqueKeyId) {
        unique_key_id = ondcUniqueId?.ondcUniqueKeyId;
      } else {
        return false;
      }
    }
  } else {
    unique_key_id = "4469eb76-7c60-4c7b-8580-161078b48f3e";
  }
  unique_key_id = "4469eb76-7c60-4c7b-8580-161078b48f3e";
  const subscriber_id = `ondc.kiko.live/ondc-buyer`;
  return `Signature keyId="${subscriber_id}|${unique_key_id}|ed25519",algorithm="ed25519",created="${created}",expires="${expires}",headers="(created) (expires) digest",signature="${signature}"`;
}

async function verifyHeader(headerParts, body, public_key) {
  try {
    const { signing_string } = await createSigningString(
      body,
      headerParts["created"],
      headerParts["expires"]
    );
    const verified = await verifyMessage(
      headerParts["signature"],
      signing_string,
      public_key
    );
    return verified;
  } catch (error) {
    return false;
  }
}

const isSignatureValid = async (header, body) => {
  try {
    const headerParts = split_auth_header(header);
    const keyIdSplit = headerParts["keyId"].split("|");
    const subscriber_id = keyIdSplit[0];
    const keyId = keyIdSplit[1];
    const public_key = await lookupRegistry(subscriber_id, keyId);
    const isValid = await verifyHeader(headerParts, body, public_key);
    return isValid;
  } catch (e) {
    return false;
  }
};

const lookupRegistry = async (subscriber_id, unique_key_id) => {
  try {
    const reqBody = {
      subscriber_id: subscriber_id,
      ukId: unique_key_id,
    };
    const response = await axios.post(
      `https://preprod.registry.ondc.org/ondc/lookup`,
      reqBody
    );
    if (!response.data) {
      return false;
    }
    const public_key = await getProviderPublicKey(response.data, unique_key_id);
    if (!public_key) {
      return false;
    }
    return public_key;
  } catch (e) {
    return false;
  }
};

const getProviderPublicKey = async (providers, keyId) => {
  try {
    const provider = _.find(providers, ["ukId", keyId]);
    return provider?.signing_public_key || false;
  } catch (e) {
    return false;
  }
};

async function generateKeyPair(reqBody, providerId) {
  const header = await createAuthorizationHeader(
    JSON.stringify(reqBody),
    providerId
  );
  const verify = await isSignatureValid(header, JSON.stringify(reqBody));
  return header;
}

module.exports = {
  createAuthorizationHeader,
  isSignatureValid,
  generateKeyPair,
};
