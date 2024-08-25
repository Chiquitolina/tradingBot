import { Exchange, MarketType, OrderSide, OrderType, Ticker } from "ccxt";
import { Order } from "./order";

export class limitOrder extends Order {

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
        this.exchange.createOrder(this.getSymbol(), 'limit', this.side, this.amount, this.price)
    }

    async cancelOrder(): Promise<void> {
        // Lógica para cancelar una orden limitada
    }

}