import express from 'express'
let router: express.Router = express.Router();
import * as ethers from '../../wallet/ethers'
import * as elrond from '../../wallet/elrond'
import * as binance from '../../cex/binance'
import * as celsius from '../../cex/celsius'
import * as coinbase from '../../cex/coinbase'
import * as waves from '../../cex/waves'

const erc20TokenAddresses: Map<string, string> = new Map();
erc20TokenAddresses.set('USDC', '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48');
erc20TokenAddresses.set('aUSDC', '0xbcca60bb61934080951369a648fb03df4f96263c');
erc20TokenAddresses.set('BUSD', '0x4fabb145d64652a948d72533023f6e7a623c7c53');

// TODO: remove this
import config from '../../config.json'
const MY_ADDRESSES_ETH: Array<string> = config.eths;

router.get('/wallets', async function (req, res, next) {
  const balances: any = {};
  for (const address of MY_ADDRESSES_ETH) {
    let obj: any = {};
    const ethBalance = await ethers.getBalance(address);
    if (Number(ethBalance) > 0) {
      obj['ETH'] = ethBalance;
    }
    for (const [key, value] of erc20TokenAddresses.entries()) {
      const tokenBalance = await ethers.getERC20TokenBalance(value, address);
      if (Number(tokenBalance) > 0) {
        obj[key] = tokenBalance;
      }
    }
    if (Object.entries(obj).length > 0) {
      balances[address] = obj;
    }
  }
  res.json(balances);
});

router.get('/cexes', async function (req, res, next) {
  const balances: any = {};
  const binanceBalance = await binance.getBalance();
  if (Object.entries(binanceBalance).length > 0) {
    balances['binance'] = binanceBalance;
  }
  const celsiusBalance = await celsius.getBalance();
  if (Object.entries(celsiusBalance).length > 0) {
    balances['celsius'] = celsiusBalance;
  }
  const coinbaseBalance = await coinbase.getBalance();
  if (Object.entries(coinbaseBalance).length > 0) {
    balances['coinbase'] = coinbaseBalance;
  }
  res.json(balances);
});

router.get('/elrond', async function (req, res, next) {
  const balance = await elrond.getBalance('erd1a6hxl420v2pfgn6qd4r7e2nwcnrh2ee70pre7h2heg7myk7hk6gq373hlg');
  res.json(balance);
});

router.get('/waves', async function (req, res, next) {
  const balance = await waves.getBalance('3PEwLmEVznhCui6nUym4NnixW6LZj2VdPex');
  res.json(balance);
});

export = router;