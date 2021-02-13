import express from 'express'
let router: express.Router = express.Router();
import { logger } from '../../logger'
import Keyv from 'keyv'
import Debug from 'debug'
const debug = Debug('portfolio')

let keyv = new Keyv('sqlite://mydatabase.sqlite', { serialize: JSON.stringify, deserialize: JSON.parse, namespace: 'portfolio' });
keyv.on('error', (err: any) => logger.error('Connection Error', err));

router.get('/', async function (req, res, next) {
  const balances = await keyv.get('myliveuser');
  debug(`returning: ${JSON.stringify(balances)}`);
  res.json(balances);
});

export = router;