import axios from 'axios';
import Debug from 'debug'
const debug = Debug('yieldwatch')
import * as i from '../interfaces'
import { getEurPerCurrencyRate } from './fiat'
import Big from 'big.js'

export async function getYieldWatch(address: string) {
  const balances: Array<i.iBalance> = [];
  const resp = await axios.get(`https://www.yieldwatch.net/api/all/${address}?platforms=pancake`);
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
      eurPrice: Big(myLPStaking.totalUSDValues.total).div(eurPerUsd),
      eurValue: Big(myLPStaking.totalUSDValues.total).div(balance)
    });
  }
  return balances;
}