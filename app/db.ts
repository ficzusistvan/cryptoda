const db = require('better-sqlite3')('cryptoda.db', {});

function savePortfolio(userId: string, balances: Map<string, any /*Array<iBalance>*/>) {
  const stmt = db.prepare(`INSERT INTO portfolio VALUES (:id, :user_id, :portfolio, :timestamp)`);
  stmt.run({
    id: null,
    user_id: userId, 
    portfolio: JSON.stringify(Array.from(balances)), 
    timestamp: Date.now()
  });
}

function getPortfolio(userId: string) {
  const stmt = db.prepare(`SELECT portfolio FROM portfolio WHERE user_id = :user_id ORDER BY timestamp DESC LIMIT 1`);
  const res = stmt.get({
    user_id: userId
  });
  return JSON.parse(res.portfolio);
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

export {
  savePortfolio,
  getPortfolio,
  getZaboUser,
  setZaboUser,
  saveInvestment,
  getInvestments
}