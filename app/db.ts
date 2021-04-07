import Big from 'big.js'
import Debug from 'debug'
const debug = Debug('db')
const db = require('better-sqlite3')('cryptoda.db', {});

function getWallets(userId: string) {
  const stmt = db.prepare('SELECT * FROM wallet WHERE user_id = :user_id');
  return stmt.all({ user_id: userId });
}

function insertOrUpdateWalletBalances(walletId: number, symbol: string, balance: Big, lastUpdated: number, usdPrice?: Big, usdValue?: Big, eurPrice?: Big, eurValue?: Big) {
  debug(`Updating wallet[${walletId}], ${symbol}: ${balance}, USD[${usdPrice}, ${usdValue}], EUR[${eurPrice}, ${eurValue}]`)
  const params = {
    symbol: symbol,
    balance: balance.toNumber(),
    priceInUsd: usdPrice?.toNumber(),
    valueInUsd: usdValue?.toNumber(),
    priceInEur: eurPrice?.toNumber(),
    valueInEur: eurValue?.toNumber(),
    walletId: walletId,
    lastUpdated: lastUpdated
  };
  const stmtUpdate = db.prepare(`UPDATE wallet_balance SET balance = :balance, price_in_USD = :priceInUsd, value_in_USD = :valueInUsd, price_in_EUR = :priceInEur, value_in_EUR = :valueInEur, last_updated = :lastUpdated WHERE wallet_id = :walletId AND symbol = :symbol`);
  const infoUpdate = stmtUpdate.run(params);
  debug(`Updated ${infoUpdate.changes} rows for walletId[${walletId}] symbol[${symbol}]`)
  if (infoUpdate.changes === 0) {
    const stmtInsert = db.prepare(`INSERT INTO wallet_balance (balance, price_in_USD, value_in_USD, price_in_EUR, value_in_EUR, last_updated, wallet_id, symbol) VALUES (:balance, :priceInUsd, :valueInUsd, :priceInEur, :valueInEur, :lastUpdated, :walletId, :symbol)`);
    const infoInsert = stmtInsert.run(params);
    debug(`Inserted ${infoInsert.changes} rows for walletId[${walletId}] symbol[${symbol}]`)
  }
}

function deleteOldWalletBalances(walletId: number, lastUpdated: number) {
  const stmtDelete = db.prepare(`DELETE FROM wallet_balance WHERE wallet_id = :walletId AND last_updated <> :lastUpdated`);
  const infoDelete = stmtDelete.run({
    walletId: walletId,
    lastUpdated: lastUpdated
  });
  debug(`Deleted ${infoDelete.changes} rows for walletId[${walletId}] lastUpdated[${lastUpdated}]`)
}

function getWalletsBalances(userId: string) {
  const stmt = db.prepare('SELECT wallet_balance.* FROM wallet_balance LEFT JOIN wallet ON wallet_balance.wallet_id = wallet.id WHERE wallet.user_id = :user_id');
  return stmt.all({ user_id: userId });
}

function saveWalletBalancesSnapshot(walletBalances: any, timestamp: number) {
  const params = {
    symbol: walletBalances.symbol,
    balance: walletBalances.balance,
    priceInUsd: walletBalances.price_in_USD,
    valueInUsd: walletBalances.value_in_USD,
    priceInEur: walletBalances.price_in_EUR,
    valueInEur: walletBalances.value_in_EUR,
    walletId: walletBalances.wallet_id,
    timestamp: timestamp
  };
  const stmtInsert = db.prepare(`INSERT INTO wallet_balance_snapshot (balance, price_in_USD, value_in_USD, price_in_EUR, value_in_EUR, timestamp, wallet_id, symbol) VALUES (:balance, :priceInUsd, :valueInUsd, :priceInEur, :valueInEur, :timestamp, :walletId, :symbol)`);
  const infoInsert = stmtInsert.run(params);
  debug(`Inserted ${infoInsert.changes} rows...`)
}

function getPortfolio(userId: string) {
  const stmtLatest = db.prepare('SELECT MAX(wallet_balance_snapshot.timestamp) as latest FROM wallet_balance_snapshot LEFT JOIN wallet ON wallet_balance_snapshot.wallet_id = wallet.id WHERE wallet.user_id = :user_id');
  const result = stmtLatest.get({ user_id: userId });
  const stmt = db.prepare('SELECT wallet_balance_snapshot.*, wallet.type FROM wallet_balance_snapshot LEFT JOIN wallet ON wallet_balance_snapshot.wallet_id = wallet.id WHERE wallet.user_id = :user_id AND timestamp = :timestamp');
  return stmt.all({ user_id: userId, timestamp: result.latest });
}

function getPortfolioHistory(userId: string) {
  const stmt = db.prepare('SELECT SUM(wallet_balance_snapshot.value_in_EUR) as portfolio_in_EUR, SUM(wallet_balance_snapshot.value_in_USD) as portfolio_in_USD, timestamp FROM wallet_balance_snapshot LEFT JOIN wallet ON wallet_balance_snapshot.wallet_id = wallet.id WHERE wallet.user_id = :user_id GROUP BY wallet_balance_snapshot.timestamp')
  return stmt.all({ user_id: userId });
}

function getZaboUser(userId: string) {

}

function setZaboUser(userId: string, user: any) {

}

function saveInvestment(userId: string, investment: any) {
  console.log(`Saving ${JSON.stringify(investment)}`);
  const stmt = db.prepare(`INSERT INTO investments VALUES (:id, :user_id, :amount, :currency, :to, :timestamp)`);
  stmt.run({
    id: null,
    user_id: userId,
    amount: investment.amount,
    currency: investment.currency,
    to: investment.to,
    timestamp: investment.timestamp
  });
}

function getInvestments(userId: string) {
  const stmt = db.prepare(`SELECT * FROM investments WHERE user_id = :user_id ORDER BY timestamp DESC`);
  const res = stmt.all({
    user_id: userId
  });
  return res;
}

function getDcaConfig(userId: string) {
  let stmt = db.prepare(`SELECT dca.*, dca_strategy.id as dca_strategy_id, dca_strategy.strategy_to_use FROM dca LEFT JOIN dca_strategy ON dca.user_id = dca_strategy.user_id WHERE dca.user_id = :user_id`);
  const dcaConfig = stmt.get({ user_id: userId });
  stmt = db.prepare(`SELECT * FROM dca_strategy_entries WHERE dca_strategy_id = :id`);
  const entries = stmt.all({ id: dcaConfig.dca_strategy_id });
  return { dcaConfig, entries };
}

export {
  getWallets,
  insertOrUpdateWalletBalances,
  deleteOldWalletBalances,
  getWalletsBalances,
  saveWalletBalancesSnapshot,
  getPortfolio,
  getPortfolioHistory,
  getZaboUser,
  setZaboUser,
  saveInvestment,
  getInvestments,
  getDcaConfig
}