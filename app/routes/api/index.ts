import express from 'express'
let router: express.Router = express.Router();

import ratesRouter from "./rates";
import portfolioRouter from "./portfolio";
import zaboRouter from './zabo';

router.use("/rates", ratesRouter);
router.use("/portfolio", portfolioRouter);
router.use("/zabo", zaboRouter);

export = router;