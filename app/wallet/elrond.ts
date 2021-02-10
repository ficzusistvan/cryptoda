import axios from 'axios';

export async function getBalance(address: string) {
  let balances: any = {};
  const resp = await axios.get(`https://api.elrond.com/address/${address}/balance`);
  balances['EGLD'] = resp.data.data.balance/1000000000000000000;
  return balances;
}