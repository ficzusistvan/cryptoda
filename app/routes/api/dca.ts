import express from 'express'
let router: express.Router = express.Router();
import Debug from 'debug'
const debug = Debug('portfolio')
import * as dca from '../../tools/dca'

router.get('/config', async function (req, res, next) {
  res.json(await dca.getConfig('myliveuser'));
});

export = router;