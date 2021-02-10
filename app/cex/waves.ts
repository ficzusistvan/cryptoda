import axios from 'axios'

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