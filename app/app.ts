import express from 'express';
import bodyParser from 'body-parser';
import path from "path";
import routes from './routes'
import * as ethers from './wallet/ethers'
import * as binance from './cex/binance';
import * as celsius from './cex/celsius';
import * as coinbase from './cex/coinbase';
import * as zabo from './tools/my-zabo';
import * as gecko from './tools/coingecko'
import config from './config.json'
import * as portfolio from './tools/portfolio'
import { logger } from './logger'

const ONE_MINUTE = 60 * 1000;
const INFURA_PROJECT_ID = config.infura.project_id;
const INFURA_PROJECT_SECRET = config.infura.project_secret;
const BINANCE_API_KEY = config.cex.binance.api_key;
const BINANCE_SECRET_KEY = config.cex.binance.secret_key;
const CELSIUS_PARTNER_KEY = config.cex.celsius.partner_key;
const CELSIUS_API_KEY = config.cex.celsius.api_key;
const COINBASE_API_KEY = config.cex.coinbase.api_key;
const COINBASE_SECRET_KEY = config.cex.coinbase.secret_key;
const ZABO_SANDBOX_API_KEY = config.zabo.sandbox.api_key;
const ZABO_SANDBOX_SECRET_KEY = config.zabo.sandbox.secret_key;
const ZABO_LIVE_API_KEY = config.zabo.live.api_key;
const ZABO_LIVE_SECRET_KEY = config.zabo.live.secret_key;

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
  await binance.init(BINANCE_API_KEY, BINANCE_SECRET_KEY);
  logger.info(`Binance init`);
  await celsius.init(CELSIUS_PARTNER_KEY, CELSIUS_API_KEY);
  logger.info(`Celsius init`);
  await coinbase.init(COINBASE_API_KEY, COINBASE_SECRET_KEY);
  logger.info(`Coinbase init`);

  await ethers.init(INFURA_PROJECT_ID, INFURA_PROJECT_SECRET);
  logger.info(`Ethers init`);

  //await zabo.init(ZABO_SANDBOX_API_KEY, ZABO_SANDBOX_SECRET_KEY, 'sandbox');
  await zabo.init(ZABO_LIVE_API_KEY, ZABO_LIVE_SECRET_KEY, 'live');
  logger.info(`Zabo init`);

  await gecko.init();
  logger.info(`Coingecko init`);
}

app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at https://localhost:${port}`);
});

let updatePricesTask = () => {
  setTimeout(updatePricesTask, 1 * ONE_MINUTE); // every minute
}

let updatePortfolioTask = () => {
  portfolio.saveUserPortfolio('myliveuser');
  setTimeout(updatePortfolioTask, 60 * ONE_MINUTE); // every hour
}

let startCyclicTasks = () => {
  // save current crypto prices
  updatePricesTask();
  // save current portfolio
  updatePortfolioTask();
}

(async () => {
  await init();
  await startCyclicTasks();
})();

//TODO: integrate crypto hodler!!!