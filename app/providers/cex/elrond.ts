import axios from 'axios';
import Debug from 'debug';
const debug = Debug('elrond');
import { logger } from '../../logger'

export async function getBalance(address: string) {
  try {
    const resp = await axios.get(`https://api.elrond.com/address/${address}/balance`, { timeout: 3000 });
    const balance = resp.data.data.balance / 1000000000000000000;
    debug(`${address} balance: ${balance}`);
    return balance;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      logger.error(`[elrond] ${error.response.data}`);
      logger.error(`[elrond] ${error.response.status}`);
      logger.error(`[elrond] ${error.response.headers}`);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      logger.error(`[elrond] ${error.request}`);
    } else {
      // Something happened in setting up the request that triggered an Error
      logger.error(`[elrond] ${error.message}`);
    }
    logger.error(`[elrond] ${error.config}`);
    return 0;
  }
}