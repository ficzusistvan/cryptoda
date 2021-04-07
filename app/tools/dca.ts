// GENERAL DEPENDENCIES
import Big from 'big.js'
import axios from 'axios'
import parser from 'cron-parser'

// BOT DEPENDENCIES
import { logger } from '../logger'
import config from '../config.json'
import * as db from '../db'
import * as binance from '../providers/cex/binance'

// CONSTANTS
const CMC_PRO_API_KEY = config.coin_market_cap.api_key;
const CMC_USE_NUMBER_OR_LIST = config.coin_market_cap.use_number_or_list;
const CMC_CRYPTO_COINS_NUMBER = config.coin_market_cap.crypto_coins_number;
const CMC_CRYPTO_COINS_LIST = config.coin_market_cap.crypto_coins_list;
const CMC_DEFAULT_LIMIT = 500;
const STRATEGY_MAX_PERCENT = 10;
const quoteBalance: Big = Big(100);

enum eCMCType {
  NUMBER = "number",
  LIST = "list"
}

enum eCMCcryptocurrencyType {
  COINS = "coins",
  ALL = "all"
}

let totalMarketCap: Big = Big(0);
let totalPercent: Big = Big(0);
let totalAdjustedPercent: Big = Big(0);
let coins: Array<any>;

async function getListings(limit: number, cryptocurrencyType: eCMCcryptocurrencyType) {
  const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    {
      headers: {
        'X-CMC_PRO_API_KEY': CMC_PRO_API_KEY
      },
      params: {
        'start': 1,
        'limit': limit,
        'convert': 'USD',
        'sort': 'market_cap',
        'sort_dir': 'desc',
        'cryptocurrency_type': cryptocurrencyType
      }
    }
  )
  return response.data;
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const isInList = (entry: any) => {
  return CMC_CRYPTO_COINS_LIST.includes(entry.symbol);
}

export const computeBalances = async () => {
  logger.info('######################## Raw data from coinmarketcap.com:');
  let listings: { data: Array<any> };
  if (CMC_USE_NUMBER_OR_LIST === eCMCType.NUMBER) {
    listings = await getListings(CMC_CRYPTO_COINS_NUMBER, eCMCcryptocurrencyType.COINS);
    coins = listings.data;
  } else if (CMC_USE_NUMBER_OR_LIST === eCMCType.LIST) {
    listings = await getListings(CMC_DEFAULT_LIMIT, eCMCcryptocurrencyType.ALL);
    coins = listings.data.filter(isInList);
  } else {
    logger.error(`Specify 'use_number_or_list' in config.json`);
    return;
  }
  coins.forEach(entry => {
    logger.info(`${entry.name} market cap[${formatter.format(entry.quote.USD.market_cap)}] cur price[${formatter.format(entry.quote.USD.price)}]`);
    totalMarketCap = totalMarketCap.plus(entry.quote.USD.market_cap);
  });
  logger.info(`Total market cap: ${formatter.format(totalMarketCap.toNumber())}`);

  logger.info(`######################## Calculated percents:`);
  const percents = coins.map(entry => {
    const percent: Big = Big(entry.quote.USD.market_cap).div(totalMarketCap).mul(100);
    logger.info(`${entry.name} percent[${percent.toFixed(2)}]`);
    totalPercent = totalPercent.plus(percent);
    return { name: entry.name, symbol: entry.symbol, curPrice: entry.quote.USD.price, percent: percent }
  });
  logger.info(`Total percent: ${totalPercent.toFixed(2)}`);

  logger.info(`######################## Adjusted percents:`);
  let remainingPercent: Big = Big(100);
  let remainingTotalPercent: Big = Big(100);
  const adjustedPercents = percents.map(entry => {
    let adjustedPercent: Big = Big(0);
    if (entry.percent.gt(STRATEGY_MAX_PERCENT)) {
      remainingPercent = remainingPercent.minus(STRATEGY_MAX_PERCENT);
      remainingTotalPercent = remainingTotalPercent.minus(entry.percent);
      logger.warn(`${entry.name} ${entry.percent.toFixed(2)} > ${STRATEGY_MAX_PERCENT}; Adjusting... remainingPercent[${remainingPercent.toFixed(2)}] remainingTotalPercent[${remainingTotalPercent.toFixed(2)}]`);
      adjustedPercent = Big(STRATEGY_MAX_PERCENT);
    } else {
      adjustedPercent = remainingPercent.div(remainingTotalPercent).mul(entry.percent);
      if (adjustedPercent.gt(STRATEGY_MAX_PERCENT)) {
        remainingPercent = remainingPercent.minus(STRATEGY_MAX_PERCENT);
        remainingTotalPercent = remainingTotalPercent.minus(entry.percent);
        logger.warn(`${entry.name} ${adjustedPercent.toFixed(2)} > ${STRATEGY_MAX_PERCENT}; Readjusting... remainingPercent[${remainingPercent.toFixed(2)}] remainingTotalPercent[${remainingTotalPercent.toFixed(2)}]`);
        adjustedPercent = Big(STRATEGY_MAX_PERCENT);
      }
    }
    logger.info(`${entry.name} percent[${adjustedPercent.toFixed(2)}]`);
    totalAdjustedPercent = totalAdjustedPercent.plus(adjustedPercent);
    return { name: entry.name, symbol: entry.symbol, curPrice: entry.curPrice, percent: adjustedPercent }
  });
  logger.info(`Total adjusted percent: ${totalAdjustedPercent.toFixed(2)}`);

  logger.info(`######################## BUYING:`);
  const buys: Array<any> = [];
  for (const entry of adjustedPercents) {
    const amountToSpend: Big = quoteBalance.mul(entry.percent).div(100);
    logger.info(`${entry.name} amount to spend[${formatter.format(amountToSpend.toNumber())}]`);
    let currentPrice: Big;
    const exchangeSymbol = entry.symbol + `USDT`;
    if (!entry.symbol.includes(`USDT`)) {
      currentPrice = Big(entry.curPrice);
    } else {
      currentPrice = Big(1);
    }
    const quantityToBuy = amountToSpend.div(currentPrice);
    logger.info(`Manually buy ${entry.name} quantity[${quantityToBuy}] price[${formatter.format(currentPrice.toNumber())}]`);
    buys.push({ name: entry.name, quantityToBuy: quantityToBuy, currentPrice: currentPrice.toNumber(), percent: entry.percent });
  }
  return buys;
}

const ONE_MINUTE = 60 * 1000;

export async function runDCA(userId: string) {
  logger.info(`runDCA ${userId} started...`);
  const { dcaConfig, entries } = await db.getDcaConfig(userId);
  if (dcaConfig.is_enabled === 0) {
    logger.info(`DCA disabled for user[${userId}]`);
  } else {
    logger.info(`Running DCA strategy[${dcaConfig.strategy_to_use}] for user[${userId}]`);
    const interval = parser.parseExpression(dcaConfig.buying_frequency);
    const diff = interval.next().getTime() - new Date().getTime();
    if (diff < ONE_MINUTE) {
      switch (dcaConfig.exchange_to_use) {
        case 'binance':
          for (const entry of entries) {
            const symbol = `${entry.currency.toUpperCase()}/${dcaConfig.currency_to_spend.toUpperCase()}`;
            const amount = dcaConfig.amount_to_spend * entry.percent / 100;
            binance.buyAsset(symbol, amount);
          }
          break;
        default:
          logger.warn(`Exchange[${dcaConfig.exchange_to_use}] NOT supported for DCA`);
      }
    } else {
      logger.debug(`Skipping DCA for user[${userId}]...`);
    }
  }
  logger.info(`runDCA ${userId} ended!`);
}