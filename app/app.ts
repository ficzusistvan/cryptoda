import express from 'express';
import bodyParser from 'body-parser';
import path from "path";
import routes from './routes'
import * as ethereum from './providers/dex/ethereum'
import * as bsc from './providers/dex/bsc'
import * as zabo from './tools/my-zabo';
import * as gecko from './tools/coingecko'
import * as fiat from './tools/fiat'
import config from './config.json'
import * as portfolio from './tools/portfolio'
import * as dca from './tools/dca'
import { logger } from './logger'
import helmet from 'helmet'

const ONE_MINUTE = 60 * 1000;
const INFURA_PROJECT_ID = config.infura.project_id;
const INFURA_PROJECT_SECRET = config.infura.project_secret;
const EXCHANGERATESAPI_ACCESS_KEY = config.exchangeratesapi.access_key;
const ZABO_SANDBOX_API_KEY = config.zabo.api_key.sandbox;
const ZABO_SANDBOX_SECRET_KEY = config.zabo.secret_key.sandbox;
const ZABO_LIVE_API_KEY = config.zabo.api_key.live;
const ZABO_LIVE_SECRET_KEY = config.zabo.secret_key.live;
const IS_UPDATE_FIAT_CURRENCY_RATES_TASK_ENABLED = config.tasks.updateFiatCurrencyRates.is_enabled;
const IS_UPDATE_CRYPTO_CURRENCY_PRICES_TASK_ENABLED = config.tasks.updateCryptoCurrencyPrices.is_enabled;
const IS_UPDATE_USER_WALLETS_TASK_ENABLED = config.tasks.updateUserWallets.is_enabled;
const IS_CREATE_USER_WALLETS_SNAPSHOT_TASK_ENABLED = config.tasks.createUserWalletsSnapshot.is_enabled;
const IS_RUN_DCA_TASK_ENABLED = config.tasks.runDCA.is_enabled;
const UPDATE_FIAT_CURRENCY_RATES_TASK_PERIOD = config.tasks.updateFiatCurrencyRates.period_in_mins;
const UPDATE_CRYPTO_CURRENCY_PRICES_TASK_PERIOD = config.tasks.updateCryptoCurrencyPrices.period_in_mins;
const UPDATE_USER_WALLETS_TASK_PERIOD = config.tasks.updateUserWallets.period_in_mins;
const CREATE_USER_WALLETS_SNAPSHOT_TASK_PERIOD = config.tasks.createUserWalletsSnapshot.period_in_mins;
const RUN_DCA_TASK_PERIOD = config.tasks.runDCA.period_in_mins;


// rest of the code remains same
const app = express();
const port = process.env.PORT || 5000;

// create application/json parser
const jsonParser = bodyParser.json()

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: [
      "'self'",
      "https://dev-9z71xtiv.eu.auth0.com"],
    connectSrc: [
      "'self'",
      "https://dev-9z71xtiv.eu.auth0.com"
    ]
  },
}));

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

let updateFiatCurrencyRatesTask = async() => {
  await fiat.cacheRates(EXCHANGERATESAPI_ACCESS_KEY);
  setTimeout(updateFiatCurrencyRatesTask, UPDATE_FIAT_CURRENCY_RATES_TASK_PERIOD * ONE_MINUTE);
}

let updateCryptoCurrencyPricesTask = async () => {
  await gecko.cacheSimplePrice(['usd', 'eur']);
  setTimeout(updateCryptoCurrencyPricesTask, UPDATE_CRYPTO_CURRENCY_PRICES_TASK_PERIOD * ONE_MINUTE);
}

let updateUserWalletsTask = () => {
  portfolio.updateUserWallets('myliveuser');
  setTimeout(updateUserWalletsTask, UPDATE_USER_WALLETS_TASK_PERIOD * ONE_MINUTE);
}

let createUserWalletsSnapshotTask = () => {
  portfolio.createUserWalletsSnapshot('myliveuser');
  setTimeout(createUserWalletsSnapshotTask, CREATE_USER_WALLETS_SNAPSHOT_TASK_PERIOD * ONE_MINUTE);
}

let runDCATask = () => {
  dca.runDCA('myliveuser');
  setTimeout(runDCATask, RUN_DCA_TASK_PERIOD * ONE_MINUTE);
}

let startCyclicTasks = () => {
  // save current crypto prices
  IS_UPDATE_FIAT_CURRENCY_RATES_TASK_ENABLED && updateFiatCurrencyRatesTask();
  // save current crypto prices
  IS_UPDATE_CRYPTO_CURRENCY_PRICES_TASK_ENABLED && updateCryptoCurrencyPricesTask();
  // update user wallets
  IS_UPDATE_USER_WALLETS_TASK_ENABLED && updateUserWalletsTask();
  // save user wallets snapshot
  IS_CREATE_USER_WALLETS_SNAPSHOT_TASK_ENABLED && createUserWalletsSnapshotTask();
  // run DCA
  IS_RUN_DCA_TASK_ENABLED && runDCATask();
}

(async () => {
  await init();
  await startCyclicTasks();
})();