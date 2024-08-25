import { Exchange, Ticker } from "ccxt";
import { MarketType, OrderSide, OrderType } from "ccxt/js/src/base/Exchange";

export abstract class Order {

    protected price: number;
    protected amount: number;
    protected exchange: Exchange;
    protected side: OrderSide;
    protected orderType: OrderType;
    protected marketType: MarketType;
    protected ticker: Ticker;

    constructor(price: number, 
                amount: number, 
                exchange: Exchange, 
                side: OrderSide, 
                orderType: OrderType, 
                marketType: MarketType, 
                ticker: Ticker) {
        this.price = price; /*precio*/
        this.amount = amount; /*cantidad*/
        this.exchange = exchange; /* exchange */
        this.side = side; /* buy or sell */
        this.orderType = orderType; /* ordertype */
        this.marketType = marketType; /* spot futures etc */
        this.ticker = ticker;
    }

    abstract placeOrder(): Promise<void>;

    abstract cancelOrder(): Promise<void>;

    protected getSymbol(): string {
        return this.ticker.symbol;
    }

}