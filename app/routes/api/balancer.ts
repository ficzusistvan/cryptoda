import express from 'express'
let router: express.Router = express.Router();
import Debug from 'debug'
const debug = Debug('portfolio')
import * as balancer from '../../tools/balancer'
import * as db from '../../db'

router.get('/', async function (req, res, next) {
  res.json(await balancer.computeBalances());
});

export = router;