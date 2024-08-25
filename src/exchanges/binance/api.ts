import { Exchange } from '../models/exchange'
import * as ccxt from 'ccxt';


export class BinanceExchange extends Exchange {

    private client: ccxt.binance;

    constructor(apiKey: string, apiSecret:string) {

        super(apiKey, apiSecret);

        this.client = new ccxt.binance({
            apiKey : this.apiKey,
            apiSecret : this.apiSecret
        });

    }

   public async fetchTicker(symbol: string): Promise<void> {
        try {
            const ticker = await this.client.fetchTicker(symbol);
            console.log(ticker)
        } catch (error) {
            console.error(`Error fetching ticker for ${symbol}:`, error);
            throw new Error(`Could not fetch ticker for ${symbol}`);
        }
    }

}