import { ChainId, Token, WETH, Fetcher, Trade, Route, TokenAmount, TradeType } from '@uniswap/sdk'

export async function init () {

}

export async function getLatestBidAsk(tokenAddress: string) {
  const DAI = new Token(ChainId.MAINNET, tokenAddress, 18)

  // note that you may want/need to handle this async code differently,
  // for example if top-level await is not an option
  const pair = await Fetcher.fetchPairData(DAI, WETH[DAI.chainId])

  const route = new Route([pair], WETH[DAI.chainId])

  const trade = new Trade(route, new TokenAmount(WETH[DAI.chainId], '1000000000000000000'), TradeType.EXACT_INPUT)

  console.log('[Uniswap] executionPrice', trade.executionPrice.toSignificant(6))
  console.log('[Uniswap] nextMidPrice', trade.nextMidPrice.toSignificant(6))
}