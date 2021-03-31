import { Celsius, AUTH_METHODS, ENVIRONMENT, CelsiusInstance } from 'celsius-sdk';

let celsius: CelsiusInstance;
let myApiKey: string;

export async function init(partnerKey: string, apiKey: string) {
  celsius = await Celsius({
    authMethod: AUTH_METHODS.API_KEY,
    environment: ENVIRONMENT.PRODUCTION,
    partnerKey: partnerKey
  });
  myApiKey = apiKey;
}

export async function getBalance() {
  const balanceSummary = await celsius.getBalanceSummary(myApiKey);
  const resp = (<any>Object).filter(balanceSummary.balance, (bal: any) => bal > 0);
  return resp;
}