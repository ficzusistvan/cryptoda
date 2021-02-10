// GENERAL DEPENDENCIES
import Big from 'big.js'

// BINANCE
import * as restApi from './rest-api'
import * as i from './interfaces'

// CONSTANTS
const ONE_HUNDRED = Big(100);

let checkServerTime = async function () {
  return await restApi.checkServerTime();
}

let getExchangeInfo = async function (symbol: string) {
  const resp = await restApi.getExchangeInfo();
  const info = resp.symbols.filter((obj: any) => {
    return obj.symbol === symbol;
  });
  const filter = info[0].filters.filter((obj: any) => {
    return obj.filterType === "LOT_SIZE";
  })
  return filter[0];
}

let getBalanceAndFees = async function (baseAsset: string, quoteAsset: string): Promise<i.iMyBalancesAndFees> {
  const accountInfo: i.IBinanceAccountInformation = await restApi.getAccountInformation();
  return {
    baseBalance: (() => {
      const found = accountInfo.balances.find(balance => balance.asset === baseAsset);
      const value = (found ? found.free : 0);
      return Big(value);
    })(),
    quoteBalance: (() => {
      const found = accountInfo.balances.find(balance => balance.asset === quoteAsset);
      const value = (found ? found.free : 0);
      return Big(value);
    })(),
    // Make sure fees are in percent!!!
    makerFee: Big(accountInfo.makerCommission).div(ONE_HUNDRED),
    takerFee: Big(accountInfo.takerCommission).div(ONE_HUNDRED)
  };
}

let makeNewOrder = async function (symbol: string, side: string, type: string, quantity: number) {
  return await restApi.newOrder(symbol, side, type, quantity);
}

let getLastTrade = async function (symbol: string) {
  const resp: any = await restApi.getAccountTradeList(symbol);
  const descending = resp.sort((a: any, b: any) => {
    return b.time - a.time;
  });
  return descending[0];
}

let getOrder = async function (symbol: string, orderId: number) {
  const resp: any = await restApi.getAllOrders(symbol);
  const res = resp.find((order: any) => order.orderId === orderId);
  return res;
}

let getCurrentPrice = async function (symbol: string) {
  const resp: any = await restApi.getSymbolOrderBookTicker(symbol);
  return Big(resp.bidPrice).plus(resp.askPrice).div(2);
}

export {
  checkServerTime,
  getExchangeInfo,
  getBalanceAndFees,
  makeNewOrder,
  getLastTrade,
  getOrder,
  getCurrentPrice
}