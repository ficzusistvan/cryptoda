import Zabo from 'zabo-sdk-js';
import { logger } from '../logger'
import * as db from '../db'

let zabo: any;

export async function init(apiKey: string, secret: string, env: string) {
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

export function getZaboUser(userId: string) {
  return db.getZaboUser(userId);
}

export async function createZaboUser(userId: string, account: any) {
  let user = await zabo.users.create(account);
  // store the user
  db.setZaboUser(userId, user);
}

export async function getBlockFiBalance(userId: string) {
  let balances: any = {};
  // retrieve user
  const myZaboUserObject: any = db.getZaboUser(userId);
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