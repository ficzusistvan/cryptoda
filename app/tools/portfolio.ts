// TODO: remove this START
import config from '../config.json'
const MY_ETH_ADDRESSES: Array<string> = config.eths;
const MY_ELROND_ADDRESSES: Array<string> = config.elronds;
const MY_WAVES_ADDRESSES: Array<string> = config.waves;
const USDCLP_PRICE = config.waves_exchange.usdclp_price;
// TODO: remove this END
import * as ethers from '../wallet/ethers'
import * as elrond from '../wallet/elrond'
import * as gecko from '../tools/coingecko'
import * as binance from '../cex/binance'
import * as celsius from '../cex/celsius'
import * as waves from '../cex/waves'
import Big from 'big.js'
import { logger } from '../logger'

const erc20TokenAddresses: Map<string, string> = new Map();
erc20TokenAddresses.set('USDC', '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48');
erc20TokenAddresses.set('aUSDC', '0xbcca60bb61934080951369a648fb03df4f96263c');
erc20TokenAddresses.set('BUSD', '0x4fabb145d64652a948d72533023f6e7a623c7c53');

interface iBalance {
  symbol: string, balance: Big, price: Big, value: Big
}

async function getWalletsPortfolio(userId: string) {
  const walletCoins: Array<string> = [];
  const walletBalances: Map<string, Array<iBalance>> = new Map();
  for (const address of MY_ETH_ADDRESSES) {
    const balances: Array<iBalance> = [];
    const ethBalance = await ethers.getBalance(address);
    if (Number(ethBalance) > 0) {
      let obj: iBalance = { symbol: 'ETH', balance: Big(ethBalance), price: Big(0), value: Big(0) };
      walletCoins.push('ETH');
      if (obj.balance.gt(0)) {
        balances.push(obj);
      }
    }
    for (const [key, value] of erc20TokenAddresses.entries()) {
      const tokenBalance = await ethers.getERC20TokenBalance(value, address);
      if (Number(tokenBalance) > 0) {
        let obj: iBalance = { symbol: key, balance: Big(tokenBalance), price: Big(0), value: Big(0) };
        walletCoins.push(key);
        if (obj.balance.gt(0)) {
          balances.push(obj);
        }
      }
    }
    walletBalances.set(address, balances);
  }
  return { walletBalances, walletCoins };
}

async function getElrondPortfolio(userId: string) {
  const elrondCoins: Array<string> = [];
  const elrondBalances: Map<string, Array<iBalance>> = new Map();
  for (const address of MY_ELROND_ADDRESSES) {
    const balances: Array<iBalance> = [];
    const egldBalance = await elrond.getBalance(address);
    if (Number(egldBalance) > 0) {
      let obj: iBalance = { symbol: 'EGLD', balance: Big(egldBalance), price: Big(0), value: Big(0) };
      elrondCoins.push('EGLD');
      if (obj.balance.gt(0)) {
        balances.push(obj);
      }
    }
    elrondBalances.set(address, balances);
  }
  return { elrondBalances, elrondCoins };
}

async function getCexesPortfolio(userId: string) {
  const cexCoins: Array<string> = [];
  const cexBalances: Map<string, Array<iBalance>> = new Map();
  
  const binanceBalance = await binance.getBalance();
  const binanceBalances: Array<iBalance> = [];
  for (const [key, value] of (Object as any).entries(binanceBalance)) {
    let obj: iBalance = { symbol: key, balance: Big(value), price: Big(0), value: Big(0) };
    cexCoins.push(key);
    binanceBalances.push(obj);
  }
  cexBalances.set('binance', binanceBalances);

  const celsiusBalance = await celsius.getBalance();
  const celsiusBalances: Array<iBalance> = [];
  for (const [key, value] of (Object as any).entries(celsiusBalance)) {
    let obj: iBalance = { symbol: (key as string).toUpperCase(), balance: Big(value), price: Big(0), value: Big(0) };
    cexCoins.push((key as string).toUpperCase());
    celsiusBalances.push(obj);
  }
  cexBalances.set('celsius', celsiusBalances);

  for (const address of MY_WAVES_ADDRESSES) {
    const wavesBalance = await waves.getBalance(address);
    const wavesBalances: Array<iBalance> = [];
    for (const [key, value] of (Object as any).entries(wavesBalance)) {
      let obj: iBalance = { symbol: key, balance: Big(value), price: Big(0), value: Big(0) };
      cexCoins.push(key);
      wavesBalances.push(obj);
    }
    cexBalances.set('waves', wavesBalances);
  }

  return { cexBalances, cexCoins };
}

export async function getUserPortfolio(userId: string) {

  const { walletBalances, walletCoins } = await getWalletsPortfolio(userId);
  console.log(`walletCoins: ${JSON.stringify(walletCoins)}`)
  const { elrondBalances, elrondCoins } = await getElrondPortfolio(userId);
  console.log(`elrondCoins: ${JSON.stringify(elrondCoins)}`)
  const { cexBalances, cexCoins } = await getCexesPortfolio(userId);
  console.log(`cexCoins: ${JSON.stringify(cexCoins)}`)

  const allBalances: Map<string, Array<iBalance>> = new Map([...walletBalances, ...elrondBalances, ...cexBalances]);
  let portfolioCoins: Array<string> = [...walletCoins, ...elrondCoins, ...cexCoins];
  console.log(`portfolioCoins: ${JSON.stringify(portfolioCoins)}`)
  portfolioCoins = portfolioCoins.filter((item, index) => {
    return portfolioCoins.indexOf(item) === index;
  });

  console.log(`portfolioCoins: ${JSON.stringify(portfolioCoins)}`)

  const geckoPrices = await gecko.getSimplePrice(portfolioCoins, ['usd', 'eur']);
  // TODO: UGLY HACK START
  const usdclpPrice = new Map();
  usdclpPrice.set('usd', USDCLP_PRICE);
  geckoPrices.set('USDCLP', usdclpPrice);
  // TODO: UGLY HACK END

  let totalInUsd: Big = Big(0);
  console.log('********************** BALANCES **********************');
  for (const [address, balances] of allBalances.entries()) {
    for (const balance of balances) {
      const currencyPrices = geckoPrices.get(balance.symbol);
      if (currencyPrices) {
        const price = currencyPrices.get('usd');
        if (price) {
          balance.price = price;
          balance.value = balance.balance.mul(balance.price);
          totalInUsd = totalInUsd.plus(balance.value);
        }
      }
    }
    logger.info(`${address} balances: ${JSON.stringify(balances)}`);
    logger.info(`Total in USD: ${totalInUsd.toString()}`);
  }
}