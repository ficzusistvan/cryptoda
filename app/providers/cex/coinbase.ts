import ccxt from 'ccxt'
import Debug from 'debug';
const debug = Debug('coinbase');

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

export async function getDesposits() {
  const deposits = await coinbase.fetchDeposits('EUR', undefined, undefined, {});
  debug(`coinbase deposits: ${JSON.stringify(deposits)}`);
  return deposits;
}