import { Solo, Networks, ApiMarketName } from '@dydxprotocol/solo';
import Web3 from 'web3';

let solo: Solo;

export async function init () {
  // --- Initialize with Web3 provider ---
  solo = new Solo(
    Web3.givenProvider,
    Networks.MAINNET
  );
}

export async function getLatestBidAsk () {
  const { bids, asks } = await solo.api.getOrderbookV2({
    market: ApiMarketName.WETH_DAI,
  });
  console.log('[dydx] bids', bids[0], 'asks', asks[0]);
}