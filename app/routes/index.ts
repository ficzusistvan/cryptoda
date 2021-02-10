import path from 'path'
import express from 'express'
let router: express.Router = express.Router();

import apiRouter from './api'

// API routes
router.use("/api", apiRouter);

// If no API routes are hit, send the React app
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

export = router;