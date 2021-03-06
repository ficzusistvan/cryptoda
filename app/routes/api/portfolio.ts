import express from 'express'
let router: express.Router = express.Router();
import { logger } from '../../logger'
import Debug from 'debug'
const debug = Debug('portfolio')
import * as portfolio from '../../tools/portfolio'
import * as db from '../../db'

router.get('/', async function (req, res, next) {
  const balances = await db.getPortfolio('myliveuser');
  debug(`returning: ${JSON.stringify(balances)}`);
  res.json(balances);
});

router.post('/', async function (req, res, next) {
  await portfolio.saveUserPortfolio('myliveuser');
  res.json(true);
});

router.get('/investment', async function(req, res, next) {
  const investments = await db.getInvestments('myliveuser');
  res.json(investments);
});

router.post('/investment', async function(req, res, next) {
  await db.saveInvestment('myliveuser', req.body);
  res.json(true);
});

export = router;