import { Exchange, MarketType, OrderSide, OrderType, Ticker } from "ccxt";
import { Order } from "./order";

export class marketOrder extends Order {

    constructor(price:number, 
                amount:number, 
                exchange: Exchange, 
                side: OrderSide, 
                orderType: OrderType, 
                marketType: MarketType, 
                ticker: Ticker) {
        super(price, amount, exchange, side, orderType, marketType, ticker)
    }

    async placeOrder(): Promise<void> {
        this.exchange.createOrder(this.getSymbol(), 'market', this.side, this.amount, this.price)
    }

    async cancelOrder(): Promise<void> {
        
    }

}