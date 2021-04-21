import express from 'express'
let router: express.Router = express.Router();
import { logger } from '../../logger'
import Debug from 'debug'
const debug = Debug('portfolio')
import * as portfolio from '../../tools/portfolio'
import * as db from '../../db'
import checkJwt from '../../authz/check-jwt'

router.get('/:user_id', checkJwt, async function (req, res, next) {
  const balances = await portfolio.getPortfolio(req.params.user_id);
  debug(`returning: ${JSON.stringify(balances)}`);
  res.json(balances);
});

router.get('/history/:user_id', checkJwt, async function (req, res, next) {
  const history = await portfolio.getPortfolioHistory(req.params.user_id);
  debug(`returning: ${JSON.stringify(history)}`);
  res.json(history);
});

router.get('/investment/:user_id', checkJwt, async function(req, res, next) {
  const investments = await db.getInvestments(req.params.user_id);
  res.json(investments);
});

router.post('/investment/:user_id', checkJwt, async function(req, res, next) {
  await db.saveInvestment(req.params.user_id, req.body);
  res.json(true);
});

export = router;