import Big from 'big.js'

export interface iBalance { symbol: string, balance: Big, usdPrice?: Big, usdValue?: Big, eurPrice?: Big, eurValue?: Big }