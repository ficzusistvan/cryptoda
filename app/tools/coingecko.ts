import axios from 'axios'
import Big from 'big.js'
import Debug from 'debug'
const debug = Debug('coingecko')
import { logger } from '../logger'

const URL: string = "https://api.coingecko.com/api/v3/";
interface iCoinsListEntry {
  id: string,
  symbol: string,
  name: string
}
let coinsList: Array<iCoinsListEntry>;
let prices: Map<string, Map<string, Big>> = new Map();

export async function init() {
  coinsList = await getCoinsList();
}

function replacer(key: any, value: any) {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
} // Used for debugging

async function getCoinsList() {
  try {
    const resp = await axios.get(URL + `coins/list`, { timeout: 3000 });
    return resp.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      logger.error(`[coingecko] ${error.response.data}`);
      logger.error(`[coingecko] ${error.response.status}`);
      logger.error(`[coingecko] ${error.response.headers}`);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      logger.error(`[coingecko] ${error.request}`);
    } else {
      // Something happened in setting up the request that triggered an Error
      logger.error(`[coingecko] ${error.message}`);
    }
    logger.error(`[coingecko] ${error.config}`);
  }
}

export async function cacheSimplePrice(vs_currencies: Array<string>) {
  logger.info(`cacheSimplePrice ${vs_currencies} started...`);
  const coinIds: Array<string> = coinsList.map((coin: iCoinsListEntry) => {
    return coin.id;
  });
  const coinIdsChunks: Array<Array<string>> = coinIds.reduce((resultArray: Array<Array<string>>, item: string, index: number) => {
    const chunkIndex: number = Math.floor(index / 500);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }
    resultArray[chunkIndex].push(item)
    return resultArray;
  }, []);
  let requests = [];
  for (const coinIdsChunk of coinIdsChunks) {
    const request = axios.get(URL + `simple/price?ids=${coinIdsChunk.join(',')}&vs_currencies=${vs_currencies.join(',')}`);
    requests.push(request);
  }
  Promise.all(requests).then((responses) => {
    debug(`Responses length ${responses.length}`);
    for (const response of responses) {
      for (const [coinId, simplePrices] of (Object as any).entries(response.data)) {
        const coinsListEntry = coinsList.find((entry: iCoinsListEntry) => {
          return entry.id === coinId;
        })
        if (coinsListEntry) {
          let currencyPrices = new Map();
          for (const [currency, price] of (Object as any).entries(simplePrices)) {
            currencyPrices.set(currency, Big(price));
          }
          prices.set(coinsListEntry.symbol, currencyPrices);
        }
      }
    }
    debug(`Prices ${JSON.stringify(prices, replacer)}`);
  }).catch((error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      logger.error(`[coingecko] ${error.response.data}`);
      logger.error(`[coingecko] ${error.response.status}`);
      logger.error(`[coingecko] ${error.response.headers}`);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      logger.error(`[coingecko] ${error.request}`);
    } else {
      // Something happened in setting up the request that triggered an Error
      logger.error(`[coingecko] ${error.message}`);
    }
    logger.error(`[coingecko] ${error.config}`);
  });
  logger.info(`cacheSimplePrice ${vs_currencies} ended!`);
}

export async function getSimplePrice(symbols: Array<string>, vs_currencies: Array<string>) {
  const lowerCaseSymbols: Array<string> = symbols.map((symbol: string) => {
    return symbol.toLowerCase();
  })
  const filteredCoinsList: Array<iCoinsListEntry> = coinsList.filter((coin: iCoinsListEntry) => {
    return lowerCaseSymbols.includes(coin.symbol);
  });
  debug(`filteredCoinsList: ${JSON.stringify(filteredCoinsList)}`);

  const coinIds: Array<string> = filteredCoinsList.map((coin: iCoinsListEntry) => {
    return coin.id;
  })

  let prices: Map<string, Map<string, Big>> = new Map();
  try {
    const respSimplePrice = await axios.get(URL + `simple/price?ids=${coinIds.join(',')}&vs_currencies=${vs_currencies.join(',')}`, { timeout: 3000 });
    debug(`respSimplePrice: ${JSON.stringify(respSimplePrice.data)}`);

    for (const [coinId, simplePrices] of (Object as any).entries(respSimplePrice.data)) {
      const coinsListEntry = filteredCoinsList.find((entry: iCoinsListEntry) => {
        return entry.id === coinId;
      })
      if (coinsListEntry) {
        const symbol = symbols.find((symbol: string) => {
          return symbol.toLowerCase() === coinsListEntry.symbol;
        });
        if (symbol) {
          let currencyPrices = new Map();
          for (const [currency, price] of (Object as any).entries(simplePrices)) {
            currencyPrices.set(currency, Big(price));
          }
          prices.set(symbol, currencyPrices);
        }
      }
    }
    debug(`Coingecko prices: ${JSON.stringify(Array.from(prices))}`)
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      logger.error(`[coingecko] ${error.response.data}`);
      logger.error(`[coingecko] ${error.response.status}`);
      logger.error(`[coingecko] ${error.response.headers}`);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      logger.error(`[coingecko] ${error.request}`);
    } else {
      // Something happened in setting up the request that triggered an Error
      logger.error(`[coingecko] ${error.message}`);
    }
    logger.error(`[coingecko] ${error.config}`);
  }
  return prices;
}

export async function getCachedPrices() {
  return prices;
}