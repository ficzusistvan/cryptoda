import express from 'express'
let router: express.Router = express.Router();
import { logger } from '../../logger'
import Debug from 'debug'
const debug = Debug('portfolio')
import * as portfolio from '../../tools/portfolio'
import * as db from '../../db'
import checkJwt from '../../authz/check-jwt'

router.get('/user/:userId', checkJwt, async function (req, res, next) {
  const userWallets = await db.getWallets(req.params.userId);
  debug(`get('/user/:userId') returning: ${JSON.stringify(userWallets)}`);
  res.json(userWallets);
});

router.get('/supported', checkJwt, async function (req, res, next) {
  const supported = ['address, celsius, binance, coinbase'];
  debug(`get('/supported') returning: ${JSON.stringify(supported)}`);
  res.json(supported);
});

export = router;