import axios from 'axios'
import Big from 'big.js'
import { currencycom, ice3x } from 'ccxt';

const URL: string = "https://api.coingecko.com/api/v3/";
interface iCoinsListEntry {
  id: string,
  symbol: string,
  name: string
}
let coinsList: Array<iCoinsListEntry>;

export async function init() {
  coinsList = await getCoinsList();
}

async function getCoinsList() {
  const resp = await axios.get(URL + `coins/list`);
  return resp.data;
}

export async function getSimplePrice(symbols: Array<string>, vs_currencies: Array<string>) {
  const lowerCaseSymbols: Array<string> = symbols.map((symbol: string) => {
    return symbol.toLowerCase();
  })
  const filteredCoinsList: Array<iCoinsListEntry> = coinsList.filter((coin: iCoinsListEntry) => {
    return lowerCaseSymbols.includes(coin.symbol);
  });
  console.log(`filteredCoinsList: ${JSON.stringify(filteredCoinsList)}`);

  const coinIds: Array<string> = filteredCoinsList.map((coin: iCoinsListEntry) => {
    return coin.id;
  })
  console.log(`coinIds: ${JSON.stringify(coinIds)}`);

  const respSimplePrice = await axios.get(URL + `simple/price?ids=${coinIds.join(',')}&vs_currencies=${vs_currencies.join(',')}`);
  console.log(`respSimplePrice: ${JSON.stringify(respSimplePrice.data)}`);

  let prices: Map<string, Map<string, Big>> = new Map();
  for (const [coinId, simplePrices] of (Object as any).entries(respSimplePrice.data)) {
    console.log(`Handling ${coinId}................`);
    const coinsListEntry = filteredCoinsList.find((entry: iCoinsListEntry) => {
      return entry.id === coinId;
    })
    console.log(`Handling price for: ${JSON.stringify(coinsListEntry)}`)
    if (coinsListEntry) {
      const symbol = symbols.find((symbol: string) => {
        return symbol.toLowerCase() === coinsListEntry.symbol;
      });
      console.log(`Handling symbol: ${symbol}`)
      if (symbol) {
        let currencyPrices = new Map();
        for (const [currency, price] of (Object as any).entries(simplePrices)) {
          currencyPrices.set(currency, Big(price));
          console.log(`For ${symbol} currency ${currency.toString()} price ${price}`)
        }
        prices.set(symbol, currencyPrices);
      }
    }
  }
  console.log(`Coingecko prices: ${JSON.stringify(Array.from(prices))}`)
  return prices;
}