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
  try {
    const resp = await axios.get(URL + accessKey, { timeout: 3000 });
    debug(resp.data);
    if (resp.data.success === true) {
      lastUpdated = resp.data.date;
      base = resp.data.base;
      for (const [key, value] of Object.entries(resp.data.rates)) {
        rates.set(key, Big(value as string));
      }
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      logger.error(error.response.data);
      logger.error(error.response.status);
      logger.error(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      logger.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      logger.error('Error', error.message);
    }
    logger.error(error.config);
  }
  logger.info(`cacheRates ended!`);
}

export function getEurPerCurrencyRate(currency: string) {
  return rates.get(currency);
}