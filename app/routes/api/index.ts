import express from 'express'
let router: express.Router = express.Router();

import dcaRouter from './dca';
import portfolioRouter from "./portfolio";
import ratesRouter from "./rates";
import zaboRouter from './zabo';
import walletRouter from './wallets';

router.use("/dca", dcaRouter);
router.use("/portfolio", portfolioRouter);
router.use("/rates", ratesRouter);
router.use("/zabo", zaboRouter);
router.use("/wallet", walletRouter);

export = router;