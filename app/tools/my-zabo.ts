import Zabo from 'zabo-sdk-js';
import Keyv from 'keyv';
import { logger } from '../logger'

let zabo: any;
let keyv: any;

export async function init(apiKey: string, secret: string, env: string) {
  keyv = new Keyv('sqlite://mydatabase.sqlite', { serialize: JSON.stringify, deserialize: JSON.parse });
  keyv.on('error', (err: any) => logger.error('Connection Error', err));
  try {
    zabo = await Zabo.init({
      apiKey: apiKey,
      secretKey: secret,
      env: env
    });
  } catch (error) {
    logger.error(error);
  }
}

export async function getZaboUser(userId: string) {
  return await keyv.get(userId);
}

export async function createZaboUser(userId: string, account: any) {
  let user = await zabo.users.create(account);
  // store the user
  await keyv.set(userId, user);
}

export async function getBlockFiBalance(userId: string) {
  let balances: any = {};
  // retrieve user
  const myZaboUserObject: any = await keyv.get(userId);
  let zaboBalances: any;
  try {
    zaboBalances = await zabo.users.getBalances({
      userId: myZaboUserObject.id,
      accountId: myZaboUserObject.accounts[0].id
    });
  } catch (err) {
    logger.error(err);
  }

  if (zaboBalances) {
    for (const balance of zaboBalances.data) {
      balances[balance.currency] = balance.balance;
    }
  }

  return balances;
}