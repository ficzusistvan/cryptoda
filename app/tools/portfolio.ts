import * as ethers from '../wallet/ethers'
import * as elrond from '../wallet/elrond'
import * as gecko from '../tools/coingecko'
import * as binance from '../cex/binance'
import * as celsius from '../cex/celsius'
import * as waves from '../cex/waves'
import * as zabo from './my-zabo'
import Big from 'big.js'
import { logger } from '../logger'
import Debug from 'debug'
const debug = Debug('portfolio')
import * as db from '../db'

const erc20TokenAddresses: Map<string, string> = new Map();
erc20TokenAddresses.set('USDC', '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48');
erc20TokenAddresses.set('aUSDC', '0xbcca60bb61934080951369a648fb03df4f96263c');
erc20TokenAddresses.set('BUSD', '0x4fabb145d64652a948d72533023f6e7a623c7c53');

interface iBalance { symbol: string, balance: Big }

async function getEthereumBalances(address: string) {
  const coins: Array<string> = [];
  const balances: Array<iBalance> = [];
  const ethBalance = await ethers.getBalance(address);
  if (Number(ethBalance) > 0) {
    coins.push('ETH');
    if (Big(ethBalance).gt(0)) {
      balances.push({ symbol: 'ETH', balance: Big(ethBalance) });
    }
  }
  for (const [key, value] of erc20TokenAddresses.entries()) {
    const tokenBalance = await ethers.getERC20TokenBalance(value, address);
    if (Number(tokenBalance) > 0) {
      coins.push(key);
      if (Big(tokenBalance).gt(0)) {
        balances.push({ symbol: key, balance: Big(tokenBalance) });
      }
    }
  }
  return { balances, coins };
}

async function getElrondBalances(address: string) {
  const coins: Array<string> = [];
  const balances: Array<iBalance> = [];
  const egldBalance = await elrond.getBalance(address);
  if (Number(egldBalance) > 0) {
    coins.push('EGLD');
    if (Big(egldBalance).gt(0)) {
      balances.push({ symbol: 'EGLD', balance: Big(egldBalance) });
    }
  }
  return { balances, coins };
}

async function getWavesBalances(address: string) {
  const coins: Array<string> = [];
  const balances: Array<iBalance> = [];
  const wavesBalance = await waves.getBalance(address);
  for (const [key, value] of (Object as any).entries(wavesBalance)) {
    coins.push(key);
    balances.push({ symbol: key, balance: Big(value) });
  }
  return { balances, coins };
}

async function getBinanceBalances(apiKey: string, apiSecret: string) {
  const coins: Array<string> = [];
  const balances: Array<iBalance> = [];
  const binanceBalance = await binance.getBalance();
  for (const [key, value] of (Object as any).entries(binanceBalance)) {
    balances.push({ symbol: key, balance: Big(value) });
    coins.push(key);
  }
  return { balances, coins };
}

async function getCelsiusBalances(apiKey: string, apiSecret: string) {
  const coins: Array<string> = [];
  const balances: Array<iBalance> = [];
  const celsiusBalance = await celsius.getBalance();
  for (const [key, value] of (Object as any).entries(celsiusBalance)) {
    balances.push({ symbol: (key as string).toUpperCase(), balance: Big(value) });
    coins.push((key as string).toUpperCase());
  }
  return { balances, coins };
}

async function getZaboBalances(apiKey: string, apiSecret: string) {
  const zaboCoins: Array<string> = [];
  const zaboBalances: Map<string, Array<iBalance>> = new Map();

  /*const blockfiBalance = await zabo.getBlockFiBalance(userId);
  const blockfiBalances: Array<iBalance> = [];
  for (let [key, value] of (Object as any).entries(blockfiBalance)) {
    if (key === 'BTC' || key === 'btc') {
      value = value - config.blockfi.btc_amount_to_subtract;
    }
    let obj: iBalance = { symbol: key, balance: Big(value), price: Big(0), value: Big(0) };
    zaboCoins.push(key);
    blockfiBalances.push(obj);
  }
  zaboBalances.set('blockfi', blockfiBalances);
*/
  return { zaboBalances, zaboCoins };
}

async function updateWalletBalancesInDb(walletId: number, coins: Array<string>, balances: Array<iBalance>) {
  const prices: Map<string, Map<string, Big>> = await gecko.getSimplePrice(coins, ['usd', 'eur']);
  const lastUpdated = Date.now();
  for (const balance of balances) {
    let symbolPrices = prices.get(balance.symbol);
    // TODO: UGLY HACK START
    if (balance.symbol === 'USDCLP') {
      symbolPrices = new Map();
      symbolPrices.set('usd', Big(await waves.getUSDCLPPriceInUsd()));
      symbolPrices.set('eur', Big(await waves.getUSDCLPPriceInEur()));
    }
    // TODO: UGLY HACK END
    if (symbolPrices) {
      const usdPrice = symbolPrices.get('usd');
      let usdValue = Big(0);
      if (usdPrice) {
        usdValue = balance.balance.mul(usdPrice);
      }
      const eurPrice = symbolPrices.get('eur');
      let eurValue = Big(0);
      if (eurPrice) {
        eurValue = balance.balance.mul(eurPrice);
      }
      db.insertOrUpdateWalletBalances(walletId, balance.symbol, balance.balance, lastUpdated, usdPrice, usdValue, eurPrice, eurValue);
    }
  }
  db.deleteOldWalletBalances(walletId, lastUpdated);
}

export async function updateUserWallets(userId: string) {
  logger.info(`updateUserWallets ${userId} started...`);
  const userWallets = db.getWallets(userId);
  for (const wallet of userWallets) {
    let res: { coins: Array<string>, balances: Array<iBalance> };
    switch (wallet.type) {
      case 'Binance':
        res = await getBinanceBalances(wallet.api_key, wallet.secret_key);
        debug(`binanceCoins: ${JSON.stringify(res.coins)}`)
        debug(`binanceBalances: ${JSON.stringify(res.balances)}`)
        await updateWalletBalancesInDb(wallet.id, res.coins, res.balances);
        break;
      case 'Celsius':
        res = await getCelsiusBalances(wallet.api_key, wallet.secret_key);
        debug(`celsiusCoins: ${JSON.stringify(res.coins)}`)
        debug(`celsiusBalances: ${JSON.stringify(res.balances)}`)
        await updateWalletBalancesInDb(wallet.id, res.coins, res.balances);
        break;
      case 'Ethereum':
        res = await getEthereumBalances(wallet.address);
        debug(`ethereumCoins: ${JSON.stringify(res.coins)}`)
        debug(`ethereumBalances: ${JSON.stringify(res.balances)}`)
        await updateWalletBalancesInDb(wallet.id, res.coins, res.balances);
        break;
      case 'Elrond':
        res = await getElrondBalances(wallet.address);
        debug(`elrondCoins: ${JSON.stringify(res.coins)}`)
        debug(`elrondBalances: ${JSON.stringify(res.balances)}`)
        await updateWalletBalancesInDb(wallet.id, res.coins, res.balances);
        break;
      case 'Waves':
        res = await getWavesBalances(wallet.address);
        debug(`wavesCoins: ${JSON.stringify(res.coins)}`)
        debug(`wavesBalances: ${JSON.stringify(res.balances)}`)
        await updateWalletBalancesInDb(wallet.id, res.coins, res.balances);
        break;
    }
  }
  logger.info(`updateUserWallets ${userId} ended!`);
}

export function createUserWalletsSnapshot(userId: string) {
  logger.info(`createUserWalletsSnapshot ${userId} started...`);
  const walletsBalances = db.getWalletsBalances(userId);
  const timestamp = Date.now();
  for (const walletBalances of walletsBalances) {
    db.saveWalletBalancesSnapshot(walletBalances, timestamp);
  }
  logger.info(`createUserWalletsSnapshot ${userId} ended!`);
}

export function getPortfolio(userId: string) {
  return db.getPortfolio(userId);
}

export function getPortfolioHistory(userId: string) {
  return db.getPortfolioHistory(userId);
}