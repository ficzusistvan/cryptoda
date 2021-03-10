import axios from 'axios';
import config from '../config.json'

export async function getListings(start: number, limit: number, convert: string) {
  const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    {
      headers: {
        'X-CMC_PRO_API_KEY': config.CMC_PRO_API_KEY
      },
      params: {
        'start': start,
        'limit': limit,
        'convert': convert
      }
    }
  )
  return response.data;
}

export async function getInfo(symbol: string) {
  const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
    {
      headers: {
        'X-CMC_PRO_API_KEY': config.CMC_PRO_API_KEY
      },
      params: {
        'symbol': symbol
      }
    }
  )
  return response.data;
}

export async function getGlobalMetrics() {
  const response = await axios.get('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest',
    {
      headers: {
        'X-CMC_PRO_API_KEY': config.CMC_PRO_API_KEY
      }
    }
  )
  return response.data;
}