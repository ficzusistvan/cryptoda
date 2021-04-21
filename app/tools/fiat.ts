import axios from 'axios'
import Big from 'big.js'
import Debug from 'debug'
const debug = Debug('fiat')
import { logger } from '../logger'

const URL: string = "http://api.exchangeratesapi.io/latest?symbols=USD,EUR,RON&access_key=";

let lastUpdated: string;
let base: string;
let rates: Map<string, Big> = new Map();

export async function cacheRates(accessKey: string) {
  logger.info(`cacheRates started...`);
  const resp = await axios.get(URL + accessKey);
  debug(resp.data);
  if (resp.data.success === true) {
    lastUpdated = resp.data.date;
    base = resp.data.base;
    for (const [key, value] of Object.entries(resp.data.rates)) {
      rates.set(key, Big(value as string));
    }
  }
  logger.info(`cacheRates ended!`);
}

export function getEurPerCurrencyRate(currency: string) {
  return rates.get(currency);
}