import { ethers, utils, Contract } from "ethers";
import Big from 'big.js';
const BigNumber = require('bignumber.js');

let provider: ethers.providers.BaseProvider;
const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
const ADDRESS_ETH_USD = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";

const onesplitAddress = "0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E"; // 1plit contract address on Main net

const fromToken = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'; // ETHEREUM
const fromTokenDecimals = 18;

const toToken = '0x6b175474e89094c44da98b954eedeac495271d0f'; // DAI Token
const toTokenDecimals = 18;

const amountToExchange = 1;

const oneSplitDexes = [
  "Uniswap",
  "Kyber",
  "Bancor",
  "Oasis",
  "CurveCompound",
  "CurveUsdt",
  "CurveY",
  "Binance",
  "Synthetix",
  "UniswapCompound",
  "UniswapChai",
  "UniswapAave"
]

export async function init(projectId: string, projectSecret: string) {
  provider = new ethers.providers.InfuraProvider(`homestead`, {
    projectId: projectId,
    projectSecret: projectSecret
  });
}

export async function getBalance(address: string) {
  const balance = await provider.getBalance(address);
  const inEth = ethers.utils.formatEther(balance)
  return inEth.toString();
}

const contractAbiFragment = `[
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
        {
            "name": "",
            "type": "uint8"
        }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]`;

export async function getERC20TokenBalance(tokenAddress: string, address: string) {
  const contract = new Contract(tokenAddress, contractAbiFragment, provider);
  const balance = await contract.balanceOf(address);
  const decimals = await contract.decimals();
  return utils.formatUnits(balance, decimals).toString();
}

export async function getPrice() {
  const priceFeed = new Contract(ADDRESS_ETH_USD, aggregatorV3InterfaceABI, provider);
  const roundData = await priceFeed.latestRoundData();
  const decimals = await priceFeed.decimals();
  return utils.formatUnits(roundData.answer, decimals).toString();
}

export async function getExpectedReturn1inch() {
}