import axios from 'axios';
import config from '../config.json'
import { logger } from '../logger'

export async function getListings(start: number, limit: number, convert: string) {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      {
        headers: {
          'X-CMC_PRO_API_KEY': config.coin_market_cap.api_key
        },
        params: {
          'start': start,
          'limit': limit,
          'convert': convert
        },
        timeout: 3000
      }
    )
    return response.data;
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
}

export async function getInfo(symbol: string) {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
      {
        headers: {
          'X-CMC_PRO_API_KEY': config.coin_market_cap.api_key
        },
        params: {
          'symbol': symbol
        },
        timeout: 3000
      }
    )
    return response.data;
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
}

export async function getGlobalMetrics() {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest',
      {
        headers: {
          'X-CMC_PRO_API_KEY': config.coin_market_cap.api_key
        },
        timeout: 3000
      }
    )
    return response.data;
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
}