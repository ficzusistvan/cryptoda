import { ethers, utils, Contract } from "ethers";

let provider: ethers.providers.BaseProvider;

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