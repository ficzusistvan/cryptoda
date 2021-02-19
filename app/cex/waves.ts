import axios from 'axios'
import Debug from 'debug'
const debug = Debug('waves');

export async function getBalance(address: string) {
  let balances: any = {};
  // Get account balances in all assets (excluding WAVES and NFTs) at a given address
  const acountBalanceResp = await axios.get(`https://nodes.wavesnodes.com/assets/balance/${address}`);
  if (acountBalanceResp.data) {
    // Get detailed information about a given asset.
    for (const balance of acountBalanceResp.data.balances) {
      const assetDetailsResp = await axios.get(`https://nodes.wavesnodes.com/assets/details/${balance.assetId}?full=false`);
      balances[assetDetailsResp.data.name] = balance.balance / Math.pow(10, assetDetailsResp.data.decimals);
    }
  }
  return balances;
}

const USDCLP_WAVES_ID = 'CrjhbC9gRezwvBZ1XwPQqRwx4BWzoyMHGFNUVdn22ep6';
const USDC_WAVES_ID = '6XtHjpXbs9RRJP2Sr9GUyVqzACcby9TkThHXnjVC5CDJ';

export async function getUSDCLPPrice() {
  const usdclpPriceResp = await axios.get(`https://wavescap.com/api/asset/${USDCLP_WAVES_ID}.json`);
  const usdcPriceResp = await axios.get(`https://wavescap.com/api/asset/${USDC_WAVES_ID}.json`);

  const usdclpPrice = usdclpPriceResp.data.data.lastPrice_waves / usdcPriceResp.data.data.lastPrice_waves;
  debug(`Calculated usdclpPrice: ${usdclpPrice}`);
  return usdclpPrice;
}