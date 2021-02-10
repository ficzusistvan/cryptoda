import ccxt from 'ccxt'

let coinbase: ccxt.Exchange;

export function init(apiKey: string, secret: string) {
  return new Promise((resolve, reject) => {
    coinbase = new ccxt.coinbase({
      apiKey: apiKey,
      secret: secret,
      timeout: 30000
    });
    resolve(true);
  });
}

export async function getBalance() {
  const balance = await coinbase.fetchBalance();
  const resp = (<any>Object).filter(balance.total, (bal: any) => bal > 0);
  return resp;
}