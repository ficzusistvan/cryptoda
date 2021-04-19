import * as ethereum from '../providers/dex/ethereum'
import * as bsc from '../providers/dex/bsc'
import * as elrond from '../providers/cex/elrond'
import * as gecko from '../tools/coingecko'
import * as binance from '../providers/cex/binance'
import * as celsius from '../providers/cex/celsius'
import * as coinbase from '../providers/cex/coinbase';
import * as waves from '../providers/cex/waves'
import * as zabo from './my-zabo'
import Big from 'big.js'
import { logger } from '../logger'
import Debug from 'debug'
const debug = Debug('portfolio')
import * as db from '../db'
import { getYieldWatch } from './yieldwatch'
import * as i from '../interfaces'

const erc20TokenAddresses: Map<string, string> = new Map();
erc20TokenAddresses.set('USDC', '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48');
erc20TokenAddresses.set('aUSDC', '0xbcca60bb61934080951369a648fb03df4f96263c');
erc20TokenAddresses.set('BUSD', '0x4fabb145d64652a948d72533023f6e7a623c7c53');

const bep20TokenAddresses: Map<string, string> = new Map();
bep20TokenAddresses.set('Cake', '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82');
bep20TokenAddresses.set('Cake-LP', '0xa527a61703d82139f8a06bc30097cc9caa2df5a6');
bep20TokenAddresses.set('SafeMoon', '0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3');

async function getEthereumBalances(address: string) {
  const balances: Array<i.iBalance> = [];
  const ethBalance = await ethereum.getBalance(address);
  if (Number(ethBalance) > 0) {
    if (Big(ethBalance).gt(0)) {
      balances.push({ symbol: 'ETH', balance: Big(ethBalance) });
    }
  }
  for (const [key, value] of erc20TokenAddresses.entries()) {
    const tokenBalance = await ethereum.getERC20TokenBalance(value, address);
    if (Number(tokenBalance) > 0) {
      if (Big(tokenBalance).gt(0)) {
        balances.push({ symbol: key, balance: Big(tokenBalance) });
      }
    }
  }
  return balances;
}

async function getBscBalances(address: string) {
  const balances: Array<i.iBalance> = [];
  const bscBalance = await bsc.getBalance(address);
  if (Number(bscBalance) > 0) {
    if (Big(bscBalance).gt(0)) {
      balances.push({ symbol: 'BNB', balance: Big(bscBalance) });
    }
  }
  for (const [key, value] of bep20TokenAddresses.entries()) {
    const tokenBalance = await bsc.getBEP20TokenBalance(value, address);
    if (Number(tokenBalance) > 0) {
      if (Big(tokenBalance).gt(0)) {
        balances.push({ symbol: key, balance: Big(tokenBalance) });
      }
    }
  }
  return balances;
}

async function getElrondBalances(address: string) {
  const balances: Array<i.iBalance> = [];
  const egldBalance = await elrond.getBalance(address);
  if (Number(egldBalance) > 0) {
    if (Big(egldBalance).gt(0)) {
      balances.push({ symbol: 'EGLD', balance: Big(egldBalance) });
    }
  }
  return balances;
}

async function getWavesBalances(address: string) {
  const balances: Array<i.iBalance> = [];
  const wavesBalance = await waves.getBalance(address);
  for (const [key, value] of (Object as any).entries(wavesBalance)) {
    balances.push({ symbol: key, balance: Big(value) });
  }
  return balances;
}

async function getBinanceBalances(apiKey: string, apiSecret: string) {
  const balances: Array<i.iBalance> = [];
  await binance.init(apiKey, apiSecret);
  const binanceBalance = await binance.getBalance();
  for (const [key, value] of (Object as any).entries(binanceBalance)) {
    balances.push({ symbol: key, balance: Big(value) });
  }
  return balances;
}

async function getCelsiusBalances(apiKey: string, partnerKey: string) {
  const balances: Array<i.iBalance> = [];
  await celsius.init(partnerKey, apiKey);
  const celsiusBalance = await celsius.getBalance();
  for (const [key, value] of (Object as any).entries(celsiusBalance)) {
    balances.push({ symbol: (key as string).toUpperCase(), balance: Big(value) });
  }
  return balances;
}

async function getCoinbaseBalances(apiKey: string, secretKey: string) {
  const balances: Array<i.iBalance> = [];
  await coinbase.init(apiKey, secretKey);
  const coinbaseBalance = await coinbase.getBalance();
  for (const [key, value] of (Object as any).entries(coinbaseBalance)) {
    balances.push({ symbol: (key as string).toUpperCase(), balance: Big(value) });
  }
  return balances;
}

async function getZaboBalances(apiKey: string, apiSecret: string) {
  const zaboBalances: Map<string, Array<i.iBalance>> = new Map();

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
  return zaboBalances;
}

function replacer(key: any, value: any) {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
} // Used for debugging

// TODO: handle usdValue and eurValue from balances
async function updateWalletBalancesInDb(walletId: number, balances: Array<i.iBalance>, lastUpdated: number) {
  const prices: Map<string, Map<string, Big>> = await gecko.getCachedPrices();
  for (const balance of balances) {
    logger.info(`updateWalletBalancesInDb for [${walletId}] balance[${JSON.stringify(balance)}]`);
    if (balance.usdPrice && balance.eurPrice && balance.usdValue && balance.eurValue) {
      db.insertOrUpdateWalletBalances(walletId, balance.symbol, balance.balance, lastUpdated, balance.usdPrice, balance.usdValue, balance.eurPrice, balance.eurValue);
    } else {
      let symbolPrices = prices.get(balance.symbol.toLowerCase());
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
  }
  db.deleteOldWalletBalances(walletId, lastUpdated);
}

export async function updateUserWallets(userId: string) {
  logger.info(`updateUserWallets ${userId} started...`);
  const userWallets = db.getWallets(userId);
  const now = Date.now();
  for (const wallet of userWallets) {
    let balances: Array<i.iBalance>;
    switch (wallet.type) {
      case 'Binance':
        balances = await getBinanceBalances(wallet.api_key, wallet.secret_key);
        debug(`binanceBalances: ${JSON.stringify(balances)}`)
        await updateWalletBalancesInDb(wallet.id, balances, now);
        break;
      case 'Celsius':
        balances = await getCelsiusBalances(wallet.api_key, wallet.secret_key);
        debug(`celsiusBalances: ${JSON.stringify(balances)}`)
        await updateWalletBalancesInDb(wallet.id, balances, now);
        break;
      case 'Coinbase':
        balances = await getCoinbaseBalances(wallet.api_key, wallet.secret_key);
        debug(`coinbaseBalances: ${JSON.stringify(balances)}`)
        await updateWalletBalancesInDb(wallet.id, balances, now);
        break;
      case 'Ethereum':
        balances = await getEthereumBalances(wallet.address);
        debug(`ethereumBalances: ${JSON.stringify(balances)}`)
        await updateWalletBalancesInDb(wallet.id, balances, now);
        break;
      case 'BSC':
        balances = await getBscBalances(wallet.address);
        debug(`BSCBalances: ${JSON.stringify(balances)}`)
        if (wallet.is_farming === 1) {
          const farmingBalances = await getYieldWatch(wallet.address);
          logger.info(`Adding farming balances to [${wallet.address}]...`);
          balances = balances.concat(farmingBalances);
        }
        await updateWalletBalancesInDb(wallet.id, balances, now);
        break;
      case 'Elrond':
        balances = await getElrondBalances(wallet.address);
        debug(`elrondBalances: ${JSON.stringify(balances)}`)
        await updateWalletBalancesInDb(wallet.id, balances, now);
        break;
      case 'Waves':
        balances = await getWavesBalances(wallet.address);
        debug(`wavesBalances: ${JSON.stringify(balances)}`)
        await updateWalletBalancesInDb(wallet.id, balances, now);
        break;
    }
  }
  logger.info(`updateUserWallets ${userId} ended!`);
}

export function createUserWalletsSnapshot(userId: string) {
  logger.info(`createUserWalletsSnapshot ${userId} started...`);
  const walletsBalances = db.getWalletsBalances(userId);
  debug(`walletsBalances: ${JSON.stringify(walletsBalances)}`);
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