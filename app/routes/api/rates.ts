import express from 'express'
let router: express.Router = express.Router();
import { getListings } from "../../cmc";

router.get('/', async (req, res) => {
  const pageIndex = req.query.pageIndex ? Number(req.query.pageIndex) : 0;
  const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 0;
  const start = pageIndex * pageSize + 1;
  const listings = await getListings(start, pageSize, 'USD');
  res.send(listings.data);
});

export = router;