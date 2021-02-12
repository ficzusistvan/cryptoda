import axios from 'axios';
import Debug from 'debug';

const debug = new Debug('elrond');

export async function getBalance(address: string) {
  try {
    const resp = await axios.get(`https://api.elrond.com/address/${address}/balance`);
    const balance = resp.data.data.balance/1000000000000000000;
    debug(`${address} balance: ${balance}`);
    return balance;
  } catch (err) {
    console.log(err);
    return 0;
  }
}