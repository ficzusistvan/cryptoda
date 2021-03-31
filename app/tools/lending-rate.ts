import cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import cheerioTableparser from 'cheerio-tableparser'

const URL = `https://defirate.com/lend`;

export async function getRates() {
  const browser: any = await puppeteer.launch();
  const page: any = await browser.newPage();
  await page.goto(URL);
  const html: any = await page.content();
  let $ = cheerio.load(html);
  cheerioTableparser($);
  const ratesTable: any = ($("#main-table table") as any).parsetable();
  let symbolsColumn: Array<string> = ratesTable[0];
  let symbols: Array<string> = [];
  for (let i = 0; i < ratesTable[0].length; i++) {
    let symbol: string = $('<div>' + symbolsColumn[i] + '</div>').find('.name').text().replace(/\s/g, "");
    symbols.push(symbol);
  }
  let rates: Map<string, Map<string, number>> = new Map();
  for (let i = 1; i < ratesTable.length; i++) {
    let exchangeRates: Map<string, number> = new Map();
    let exchange: string = $('<div>' + ratesTable[i][0] + '</div>').find('.name').text().replace(/\s/g, "");
    for (let j = 1; j < ratesTable[i].length; j++) {
      let rateStr: string = ratesTable[i][j].replace(/\s/g, "");
      let rate: number = parseFloat(rateStr);
      rate = isNaN(rate) ? 0 : rate;
      exchangeRates.set(symbols[j], rate);
    }
    rates.set(exchange, exchangeRates);
  }
  return rates;
}