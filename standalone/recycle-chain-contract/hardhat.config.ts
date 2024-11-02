import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
require('dotenv').config()

// const fs = require("fs");

// const defaultNetwork = "testnet";

// const getMnemonic = () => {
//   try {
//     return fs.readFileSync("./mnemonic.secret").toString().trim();
//   } catch (e) {
//     // @ts-ignore
//     if (defaultNetwork !== "localhost") {
//       console.log("☢️ WARNING: No mnemonic file created for a deploy account.");
//     }
//   }
//   return "";
// };

const POLYGON_MAINNET_RPC_URL =
  process.env.POLYGON_MAINNET_RPC_URL ||
  `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
const POLYGON_AMOY_RPC_URL =
  process.env.POLYGON_AMOY_RPC_URL ||
  `https://polygon-amoy.infura.io/v3/${process.env.INFURA_KEY}`;
const POLYGONSCAN_API_KEY =
  process.env.POLYGONSCAN_API_KEY || "polygonscan API key";

const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  solidity: {
    version: "0.8.24",
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    polygon: {
      url: POLYGON_MAINNET_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      // accounts: {
      // mnemonic: getMnemonic(),
      // },
      saveDeployments: true,
      chainId: 137,
    },
    polygon_amoy: {
      url: POLYGON_AMOY_RPC_URL,
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      // accounts: {
      //   mnemonic: getMnemonic(),
      // },
      saveDeployments: true,
      chainId: 80002,
    },
  },
  etherscan: {
    // needed for contract verification
    // npx hardhat verify --network <NETWORK> <CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMETERS>
    apiKey: {
      testnet: "0",
      polygon_amoy: POLYGONSCAN_API_KEY,
    },
    customChains: [
      {
        network: "goerli",
        chainId: 5,
        urls: {
          apiURL: "https://api-goerli.etherscan.io/api",
          browserURL: "https://goerli.etherscan.io",
        },
      },
      {
        network: "polygon_amoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://amoy.polygonscan.com",
        },
      },
    ],
  },
};
