import axios from 'axios'
import Debug from 'debug'
const debug = Debug('waves');
import { logger } from '../../logger'

export async function getBalance(address: string) {
  let balances: any = {};
  // Get account balances in all assets (excluding WAVES and NFTs) at a given address
  try {
    const acountBalanceResp = await axios.get(`https://nodes.wavesnodes.com/assets/balance/${address}`, { timeout: 3000 });
    if (acountBalanceResp.data) {
      // Get detailed information about a given asset.
      for (const balance of acountBalanceResp.data.balances) {
        try {
          const assetDetailsResp = await axios.get(`https://nodes.wavesnodes.com/assets/details/${balance.assetId}?full=false`, { timeout: 3000 });
          balances[assetDetailsResp.data.name] = balance.balance / Math.pow(10, assetDetailsResp.data.decimals);
        } catch (error) {
          console.log(JSON.stringify(error))
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            logger.error(`[waves] ${error.response.data}`);
            logger.error(`[waves] ${error.response.status}`);
            logger.error(`[waves] ${error.response.headers}`);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            logger.error(`[waves] ${error.request}`);
          } else {
            // Something happened in setting up the request that triggered an Error
            logger.error(`[waves] ${error.message}`);
          }
          logger.error(`[waves] ${error.config}`);
        }
      }
    }
  } catch (error) {
    console.log(JSON.stringify(error))
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      logger.error(`[waves] ${error.response.data}`);
      logger.error(`[waves] ${error.response.status}`);
      logger.error(`[waves] ${error.response.headers}`);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      logger.error(`[waves] ${error.request}`);
    } else {
      // Something happened in setting up the request that triggered an Error
      logger.error(`[waves] ${error.message}`);
    }
    logger.error(`[waves] ${error.config}`);
  }
  return balances;
}

const USDCLP_WAVES_ID = 'CrjhbC9gRezwvBZ1XwPQqRwx4BWzoyMHGFNUVdn22ep6';
const USDC_WAVES_ID = '6XtHjpXbs9RRJP2Sr9GUyVqzACcby9TkThHXnjVC5CDJ';

export async function getUSDCLPPriceInUsd() {
  try {
    const usdclpPriceResp = await axios.get(`https://wavescap.com/api/asset/${USDCLP_WAVES_ID}.json`, { timeout: 3000 });
    const usdcPriceResp = await axios.get(`https://wavescap.com/api/asset/${USDC_WAVES_ID}.json`, { timeout: 3000 });

    const usdclpPrice = usdclpPriceResp.data.data.lastPrice_waves / usdcPriceResp.data.data.lastPrice_waves;
    debug(`Calculated usdclpPrice: ${usdclpPrice}`);
    return usdclpPrice;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      logger.error(`[waves] ${error.response.data}`);
      logger.error(`[waves] ${error.response.status}`);
      logger.error(`[waves] ${error.response.headers}`);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      logger.error(`[waves] ${error.request}`);
    } else {
      // Something happened in setting up the request that triggered an Error
      logger.error(`[waves] ${error.message}`);
    }
    logger.error(`[waves] ${error.config}`);
    return 0;
  }
}

export async function getUSDCLPPriceInEur() {
  try {
    const usdclpPriceResp = await axios.get(`https://wavescap.com/api/asset/${USDCLP_WAVES_ID}.json`, { timeout: 3000 });
    const usdcPriceResp = await axios.get(`https://wavescap.com/api/asset/${USDC_WAVES_ID}.json`, { timeout: 3000 });

    // TODO: fix this!
    const usdclpPrice = usdclpPriceResp.data.data.lastPrice_waves / usdcPriceResp.data.data.lastPrice_waves * 0.85;
    debug(`Calculated usdclpPrice: ${usdclpPrice}`);
    return usdclpPrice;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      logger.error(`[waves] ${error.response.data}`);
      logger.error(`[waves] ${error.response.status}`);
      logger.error(`[waves] ${error.response.headers}`);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      logger.error(`[waves] ${error.request}`);
    } else {
      // Something happened in setting up the request that triggered an Error
      logger.error(`[waves] ${error.message}`);
    }
    logger.error(`[waves] ${error.config}`);
    return 0;
  }
}