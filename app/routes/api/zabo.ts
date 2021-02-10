import express from 'express'
let router: express.Router = express.Router();
import * as zabo from '../../tools/my-zabo';

router.get('/zabo-user-exists', async function (req, res, next) {
  const userId: string = req.query.userId?.toString() || '';
  const zaboUser = await zabo.getZaboUser(userId);
  res.json(zaboUser);
});

router.post('/create-zabo-user', async function (req, res, next) {
  const user = await zabo.createZaboUser(req.body.userId, req.body.account);
  res.json(user);
});

router.get('/balance', async function (req, res, next) {
  const userId: string = req.query.userId?.toString() || '';
  const zaboBalance: any = await zabo.getBalance(userId);
  res.json(zaboBalance);
});

export = router;