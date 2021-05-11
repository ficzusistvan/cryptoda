import { ethers, utils, Contract } from "ethers";

let provider: ethers.providers.BaseProvider;
const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
const ADDRESS_ETH_USD = "0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e";

export async function init(projectId: string, projectSecret: string) {
  provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.ninicoin.io');
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

export async function getBEP20TokenBalance(tokenAddress: string, address: string) {
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