import express from 'express'
let router: express.Router = express.Router();
import { logger } from '../../logger'
import Debug from 'debug'
const debug = Debug('portfolio')
import * as portfolio from '../../tools/portfolio'
import * as db from '../../db'
import checkJwt from '../../authz/check-jwt'

router.get('/', checkJwt, async function (req, res, next) {
  const balances = await portfolio.getPortfolio('myliveuser');
  debug(`returning: ${JSON.stringify(balances)}`);
  res.json(balances);
});

router.get('/history', checkJwt, async function (req, res, next) {
  const history = await portfolio.getPortfolioHistory('myliveuser');
  debug(`returning: ${JSON.stringify(history)}`);
  res.json(history);
});

router.get('/investment', checkJwt, async function(req, res, next) {
  const investments = await db.getInvestments('myliveuser');
  res.json(investments);
});

router.post('/investment', checkJwt, async function(req, res, next) {
  await db.saveInvestment('myliveuser', req.body);
  res.json(true);
});

export = router;