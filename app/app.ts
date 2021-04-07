import express from 'express';
import bodyParser from 'body-parser';
import path from "path";
import routes from './routes'
import * as ethereum from './providers/dex/ethereum'
import * as bsc from './providers/dex/bsc'
import * as zabo from './tools/my-zabo';
import * as gecko from './tools/coingecko'
import config from './config.json'
import * as portfolio from './tools/portfolio'
import * as dca from './tools/dca'
import { logger } from './logger'

const ONE_MINUTE = 60 * 1000;
const INFURA_PROJECT_ID = config.infura.project_id;
const INFURA_PROJECT_SECRET = config.infura.project_secret;
const ZABO_SANDBOX_API_KEY = config.zabo.api_key.sandbox;
const ZABO_SANDBOX_SECRET_KEY = config.zabo.secret_key.sandbox;
const ZABO_LIVE_API_KEY = config.zabo.api_key.live;
const ZABO_LIVE_SECRET_KEY = config.zabo.secret_key.live;
const IS_updatePricesTask_ENABLED = true;
const IS_updateUserWalletsTask_ENABLED = true;
const IS_createUserWalletsSnapshotTask_ENABLED = true;
const IS_runDCATask_ENABLED = false;


// rest of the code remains same
const app = express();
const port = process.env.PORT || 5000;

// create application/json parser
const jsonParser = bodyParser.json()

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(jsonParser);
app.use(routes);

(<any>Object).filter = (obj: any, predicate: any) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res: any, key: any) => (res[key] = obj[key], res), {});

let init = async () => {
  await ethereum.init(INFURA_PROJECT_ID, INFURA_PROJECT_SECRET);
  logger.info(`Ethereum init`);

  await bsc.init(INFURA_PROJECT_ID, INFURA_PROJECT_SECRET);
  logger.info(`BSC init`);

  //await zabo.init(ZABO_SANDBOX_API_KEY, ZABO_SANDBOX_SECRET_KEY, 'sandbox');
  await zabo.init(ZABO_LIVE_API_KEY, ZABO_LIVE_SECRET_KEY, 'live');
  logger.info(`Zabo init`);

  await gecko.init();
  logger.info(`Coingecko init`);
  await gecko.cacheSimplePrice(['usd', 'eur']);
  logger.info(`Prices cached...`);
}

app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at https://localhost:${port}`);
});

let updatePricesTask = async () => {
  await gecko.cacheSimplePrice(['usd', 'eur']);
  setTimeout(updatePricesTask, 1 * ONE_MINUTE); // every minute
}

let updateUserWalletsTask = () => {
  portfolio.updateUserWallets('myliveuser');
  setTimeout(updateUserWalletsTask, 60 * ONE_MINUTE); // every hour
}

let createUserWalletsSnapshotTask = () => {
  portfolio.createUserWalletsSnapshot('myliveuser');
  setTimeout(createUserWalletsSnapshotTask, 60 * ONE_MINUTE); // every hour
}

let runDCATask = () => {
  dca.runDCA('myliveuser');
  setTimeout(runDCATask, 1 * ONE_MINUTE); // every minute
}

let startCyclicTasks = () => {
  // save current crypto prices
  IS_updatePricesTask_ENABLED && updatePricesTask();
  // update user wallets
  IS_updateUserWalletsTask_ENABLED && updateUserWalletsTask();
  // save user wallets snapshot
  IS_createUserWalletsSnapshotTask_ENABLED && createUserWalletsSnapshotTask();
  // run DCA
  IS_runDCATask_ENABLED && runDCATask();
}

(async () => {
  await init();
  await startCyclicTasks();
})();