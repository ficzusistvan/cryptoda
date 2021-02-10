import ccxt from 'ccxt'

let binance: ccxt.Exchange;

export async function init(apiKey: string, secret: string) {
  return new Promise((resolve, reject) => {
    binance = new ccxt.binance({
      apiKey: apiKey,
      secret: secret,
      options: {
        adjustForTimeDifference: true,
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