import express from 'express'
let router: express.Router = express.Router();
import Debug from 'debug'
const debug = Debug('portfolio')
import * as dca from '../../tools/dca'
import * as db from '../../db'

router.get('/', async function (req, res, next) {
  res.json(await dca.computeBalances());
});

export = router;