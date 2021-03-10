// GENERAL DEPENDENCIES
import Big from 'big.js'
import axios from 'axios'
import winston from 'winston'

// BOT DEPENDENCIES
import * as exchange from './exchange'
import * as i from './interfaces'
import config from '../config.json'

// CONSTANTS
const CMC_PRO_API_KEY = config.coin_market_cap.api_key;
const CMC_USE_NUMBER_OR_LIST = config.coin_market_cap.use_number_or_list;
const CMC_CRYPTO_COINS_NUMBER = config.coin_market_cap.crypto_coins_number;
const CMC_CRYPTO_COINS_LIST = config.coin_market_cap.crypto_coins_list;
const CMC_DEFAULT_LIMIT = 500;
const QUOTE_ASSET = config.exchange.quote_asset;
const STRATEGY_MAX_PERCENT = config.strategy.max_percent;
const STRATEGY_QUOTE_ASSET_AMOUNT = config.strategy.quote_asset_amount;
const STRATEGY_EXECUTE_BUY_ORDER = config.strategy.execute_buy_oders;

const ORDER_TYPE_LMIT = 'LIMIT'; // Limit order sets the maximum or minimum price at which you are willing to buy or sell.
const ORDER_TYPE_MARKET = 'MARKET'; // Market orders are transactions meant to execute as quickly as possible at the present or market price.
const ORDER_TYPE_STOP_LOSS = 'STOP_LOSS';
const ORDER_TYPE_STOP_LOSS_LIMIT = 'STOP_LOSS_LIMIT';
const ORDER_TYPE_TAKE_PROFIT = 'TAKE_PROFIT';
const ORDER_TYPE_TAKE_PROFIT_LIMIT = 'TAKE_PROFIT_LIMIT';
const ORDER_TYPE_LIMIT_MAKER = 'LIMIT_MAKER';
const ORDER_STATUS_NEW = 'NEW';
const ORDER_STATUS_PARTIALLY_FILLED = 'PARTIALLY_FILLED';
const ORDER_STATUS_FILLED = 'FILLED';
const ORDER_STATUS_CANCELED = 'CANCELED';
const ORDER_STATUS_PENDING_CANCEL = 'PENDING_CANCEL'; // (currently unused)
const ORDER_STATUS_REJECTED = 'REJECTED';
const ORDER_STATUS_EXPIRED = 'EXPIRED';
const SIDE_BUY = 'BUY';
const SIDE_SELL = 'SELL';
const TIME_IN_FORCE_GTC = 'GTC'; // (Good-Til-Canceled) orders are effective until they are executed or canceled.
const TIME_IN_FORCE_IOC = 'IOC'; // (Immediate or Cancel) orders fills all or part of an order immediately and cancels the remaining part of the order.
const TIME_IN_FORCE_FOK = 'FOK'; // (Fill or Kill) orders fills all in its entirety, otherwise, the entire order will be cancelled.

// VARIABLES
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

let totalMarketCap: Big = Big(0);
let totalPercent: Big = Big(0);
let totalAdjustedPercent: Big = Big(0);
let coins: Array<any>;

async function getListings(limit: number, cryptocurrencyType: i.eCMCcryptocurrencyType) {
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

(async () => {
  logger.info('######################## Raw data from coinmarketcap.com:');
  let listings: { data: Array<any> };
  if (CMC_USE_NUMBER_OR_LIST === i.eCMCType.NUMBER) {
    listings = await getListings(CMC_CRYPTO_COINS_NUMBER, i.eCMCcryptocurrencyType.COINS);
    coins = listings.data;
  } else if (CMC_USE_NUMBER_OR_LIST === i.eCMCType.LIST) {
    listings = await getListings(CMC_DEFAULT_LIMIT, i.eCMCcryptocurrencyType.ALL);
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
    return { name: entry.name, symbol: entry.symbol, percent: percent }
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
    return { name: entry.name, symbol: entry.symbol, percent: adjustedPercent }
  });
  logger.info(`Total adjusted percent: ${totalAdjustedPercent.toFixed(2)}`);

  logger.info(`######################## Balances and fees:`);
  const balancesAndFees = await exchange.getBalanceAndFees(QUOTE_ASSET);
  logger.info(`Balances and fees: ${JSON.stringify(balancesAndFees)}`);
  if (balancesAndFees.quoteBalance.lt(STRATEGY_QUOTE_ASSET_AMOUNT)) {
    logger.error(`Not enough quote asset balance [${formatter.format(balancesAndFees.quoteBalance.toNumber())}]; expected [${STRATEGY_QUOTE_ASSET_AMOUNT}]`);
    return;
  }

  logger.info(`######################## BUYING:`);
  for (const entry of adjustedPercents) {
    const amountToSpend: Big = balancesAndFees.quoteBalance.mul(entry.percent).div(100);
    logger.info(`${entry.name} amount to spend[${formatter.format(amountToSpend.toNumber())}]`);
    const withoutFee: Big = amountToSpend.mul(Big(100).minus(balancesAndFees.takerFee)).div(100);
    logger.info(`${entry.name} withoutFee[${formatter.format(withoutFee.toNumber())}]`);
    let currentPrice: Big;
    const exchangeSymbol = entry.symbol + `USDT`;
    if (!entry.symbol.includes(`USDT`)) {
      currentPrice = await exchange.getCurrentAskPrice(exchangeSymbol);
    } else {
      currentPrice = Big(1);
    }
    const quantityToBuy = withoutFee.div(currentPrice);
    if (STRATEGY_EXECUTE_BUY_ORDER) {
      if (!entry.symbol.includes(`USDT`)) {
        logger.info(`Buying ${entry.name} quantity[${quantityToBuy}] price[${formatter.format(currentPrice.toNumber())}]`);
        await exchange.makeNewOrder(exchangeSymbol, SIDE_BUY, ORDER_TYPE_MARKET, quantityToBuy.toNumber());
      } else {
        logger.info(`Manually buy ${entry.name} quantity[${quantityToBuy}] price[${formatter.format(currentPrice.toNumber())}]`);
      }
    } else {
      logger.info(`Manually buy ${entry.name} quantity[${quantityToBuy}] price[${formatter.format(currentPrice.toNumber())}]`);
    }
  }
})();
