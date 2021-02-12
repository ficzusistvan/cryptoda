import express from 'express'
let router: express.Router = express.Router();

router.get('/', async function (req, res, next) {
  res.json();
});

export = router;