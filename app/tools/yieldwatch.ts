import axios from 'axios';
import Debug from 'debug'
const debug = Debug('yieldwatch')
import * as i from '../interfaces'
import { getEurPerCurrencyRate } from './fiat'
import Big from 'big.js'
import { logger } from '../logger'
import { inspect } from 'util'

export async function getYieldWatch(address: string) {
  const balances: Array<i.iBalance> = [];
  try {
    const resp = await axios.get(`https://www.yieldwatch.net/api/all/${address}?platforms=pancake`, { timeout: 30000 });
    debug(resp.data.result);
    if (resp.data.status === '1' && resp.data.message === 'OK') {
      const myLPStaking = resp.data.result.PancakeSwap.LPStaking;
      const eurPerUsd: Big = getEurPerCurrencyRate('USD') || Big(1);
      let symbol: string = '';
      let balance: number = 0;
      for (const vault of myLPStaking.vaults) {
        symbol += `${vault.name},`;
        balance++;
      }
      symbol = symbol.substring(0, symbol.length - 1);
      balances.push({
        symbol: symbol,
        balance: Big(balance),
        usdPrice: Big(myLPStaking.totalUSDValues.total).div(balance),
        usdValue: Big(myLPStaking.totalUSDValues.total),
        eurPrice: Big(myLPStaking.totalUSDValues.total).div(balance).div(eurPerUsd),
        eurValue: Big(myLPStaking.totalUSDValues.total).div(eurPerUsd)
      });
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      logger.error(`[yieldwatch] ${error.response.data}`);
      logger.error(`[yieldwatch] ${error.response.status}`);
      logger.error(`[yieldwatch] ${error.response.headers}`);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      logger.error(`[yieldwatch] ${inspect(error.request)}`);
    } else {
      // Something happened in setting up the request that triggered an Error
      logger.error(`[yieldwatch] ${error.message}`);
    }
    logger.error(`[yieldwatch] ${error.config}`);
  }
  return balances;
}