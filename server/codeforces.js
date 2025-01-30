const axios = require("axios");
const crypto = require("crypto");
require('dotenv').config(); // Load environment variables from .env file

const apiEndpoint = "https://codeforces.com/api";
const apiKey = process.env.API_KEY;
const apiSecret = process.env.SECRET_KEY;

// Generate the current time in Unix format
const getCurrentTime = () => Math.floor(Date.now() / 1000);

// Generate a random value for the apiSig parameter
const generateRandomValue = () => "123456";

// Generate the API signature
const generateApiSignature = (rand, paramString) => {
  const hashString = `${rand}${paramString}#${apiSecret}`;
  return crypto.createHash("sha512").update(hashString).digest("hex");
};

// Make an API request
const makeApiRequest = (method, params) => {
  const currentTime = getCurrentTime();
  const rand = generateRandomValue();
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  const paramString = `/${method}?${sortedParams}`;
  const apiSig = generateApiSignature(rand, paramString);
  const requestURL = `${apiEndpoint}${paramString}&apiSig=${rand}${apiSig}`;
  console.log(requestURL);

  return axios.get(requestURL);
};

module.exports = {
  makeApiRequest,
};
