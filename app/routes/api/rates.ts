import express from 'express'
let router: express.Router = express.Router();
import { getListings } from "../../tools/cmc";
import * as gecko from '../../tools/coingecko'

router.get('/', async (req, res) => {
  const pageIndex = req.query.pageIndex ? Number(req.query.pageIndex) : 0;
  const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 0;
  const start = pageIndex * pageSize + 1;
  const listings = await getListings(start, pageSize, 'USD');
  res.send(listings.data);
});

router.get('/coingecko', async (req, res) => {
  const portfolioCoins = (req.query.portfolioCoins ? req.query.portfolioCoins.toString() : '').split(',');
  const coinsList = await gecko.getCoinsList();
  const filteredCoins = coinsList.filter((coin: any) => {
    return portfolioCoins.includes(coin.symbol.toUpperCase())
  });
  const coinIds = filteredCoins.map((coin: any) => {
    return coin.id;
  });
  const prices = await gecko.getSimplePrice(coinIds);
  return prices;
});

export = router;