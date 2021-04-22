import ccxt from 'ccxt'
import { logger } from '../../logger';

let binance: ccxt.Exchange;

export async function init(apiKey: string, secret: string) {
  return new Promise((resolve, reject) => {
    binance = new ccxt.binance({
      apiKey: apiKey,
      secret: secret,
      options: {
        adjustForTimeDifference: true,
        createMarketBuyOrderRequiresPrice: false, // switch off
      }
    });
    resolve(true);
  });
}

export async function getBalance() {
  const balance = await binance.fetchBalance();
  const resp = (<any>Object).filter(balance.total, (bal: any) => bal > 0);
  return resp;
}

export async function getDesposits() {
  // TODO: binance API doesn't support fiat deposit/withdrawal history!
  const deposits = await binance.fetchDeposits('EUR', undefined, undefined, {});
  console.log(`binance deposits: ${JSON.stringify(deposits)}`);
  return deposits;
}

export async function buyAsset(symbol: string, amount: number) {
  logger.info(`Buying [${amount}] of [${symbol}] on binance...`);
  try {
    const order = await binance.createMarketOrder(symbol, "buy", amount);
    logger.info(`Order: ${JSON.stringify(order)}`);
  } catch (e) {
    logger.error(`${e}`);
  }
  // See: https://github.com/ccxt/ccxt/wiki/Manual#market-buys
}