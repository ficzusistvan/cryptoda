// TODO: remove this
import config from '../config.json'
const MY_ADDRESSES_ETH: Array<string> = config.eths;
import * as ethers from '../wallet/ethers'
import * as gecko from '../tools/coingecko'
import Big from 'big.js'

const erc20TokenAddresses: Map<string, string> = new Map();
erc20TokenAddresses.set('USDC', '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48');
erc20TokenAddresses.set('aUSDC', '0xbcca60bb61934080951369a648fb03df4f96263c');
erc20TokenAddresses.set('BUSD', '0x4fabb145d64652a948d72533023f6e7a623c7c53');

interface iBalance {
  symbol: string, balance: Big, price: Big, value: Big
}

export async function getUserPortfolio(userId: string) {
  const portfolioCoins: Array<string> = [];
  const balances: Array<iBalance> = [];
  for (const address of MY_ADDRESSES_ETH) {
    const ethBalance = await ethers.getBalance(address);
    if (Number(ethBalance) > 0) {
      let obj: iBalance = { symbol: 'ETH', balance: Big(ethBalance), price: Big(0), value: Big(0) };
      portfolioCoins.push('ETH');
      if (obj.balance.gt(0)) {
        balances.push(obj);
      }
    }
    for (const [key, value] of erc20TokenAddresses.entries()) {
      const tokenBalance = await ethers.getERC20TokenBalance(value, address);
      if (Number(tokenBalance) > 0) {
        let obj: iBalance = { symbol: key, balance: Big(tokenBalance), price: Big(0), value: Big(0) };
        portfolioCoins.push(key);
        if (obj.balance.gt(0)) {
          balances.push(obj);
        }
      }
    }
  }

  const geckoPrices = await gecko.getSimplePrice(portfolioCoins, ['usd', 'eur']);

  console.log('********************************************');
  for (const balance of balances) {
    const currencyPrices = geckoPrices.get(balance.symbol);
    if (currencyPrices) {
      const price = currencyPrices.get('usd');
      if (price) {
        balance.price = price;
        console.log(`${balance.symbol} price: ${balance.price.toString()}`);
        console.log(`${balance.symbol} balance: ${balance.balance.toString()}`);
        balance.value = balance.balance.mul(balance.price);
      }
    }
  }

  console.log(JSON.stringify(balances));
}