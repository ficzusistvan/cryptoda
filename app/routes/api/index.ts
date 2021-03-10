import express from 'express'
let router: express.Router = express.Router();

import balancerRouter from './balancer';
import portfolioRouter from "./portfolio";
import ratesRouter from "./rates";
import zaboRouter from './zabo';

router.use("/balancer", balancerRouter);
router.use("/portfolio", portfolioRouter);
router.use("/rates", ratesRouter);
router.use("/zabo", zaboRouter);

export = router;