import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks:{
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/lT-sQvudfaksoHzgvym5FCFX6RIEOBj8",
        blockNumber: 14390000
      }
      },
    goerli:{
      url:process.env.GOERLI_RPC,
        //@ts-ignore
        accounts:[process.env.PRIVATE_KEY, process.env.PRIVATE_KEY1],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN
  },
  gas:18000,
};

export default config;
// 0x3F573CbBFF95e14f26E7fa553Db963996d40B65c Multi Sig Address
// 0xa82F721d20693B709ae7Cb792477545b4653Be2F Child Contract
