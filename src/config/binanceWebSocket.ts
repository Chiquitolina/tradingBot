import WebSocket, { ErrorEvent, RawData } from 'ws';
import { DataService } from '../services/dataService';
import { TrendIndicator } from '../services/indicators/trendIndicator';

export class BinanceWebSocket {
    private ws: WebSocket;
    private lastProcessedTimestamp: number | null = null;
    private dataService = DataService.getInstance();
    private clientWs: WebSocket | null = null; // Añadido para referencia del cliente

    constructor(symbol: string, kline: string, dataService: DataService, trendInd: TrendIndicator, clientWs: WebSocket) {
        this.dataService = dataService;
        this.clientWs = clientWs; // Guardar la referencia del cliente
        const wsUrl = `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_${kline}`;
        this.ws = new WebSocket(wsUrl);

        this.ws.on('open', () => {
            console.log(`Connected to Binance WebSocket for ${symbol} on ${kline} Kline.`);
        });

        this.ws.on('message', (data: RawData) => {
            const tickerData = JSON.parse(data.toString());
            const kline = tickerData.k;
            const currentTimestamp = kline.t; // Timestamp del inicio de la vela

            if (this.lastProcessedTimestamp === null || currentTimestamp > this.lastProcessedTimestamp) {
                this.lastProcessedTimestamp = currentTimestamp;

                const closePrice = Number(kline.c); // Precio de cierre de la vela
                const highPrice = Number(kline.h)
                const lowPrice = Number(kline.l)

                this.dataService.addData(data);
                this.dataService.addClose(closePrice);
                this.dataService.addHigh(highPrice);
                this.dataService.addLow(lowPrice);

                console.log('\n');
                console.log('¡New candlestick!');
                console.log(`Price for ${symbol} at ${new Date(currentTimestamp).toISOString()}:`, closePrice);

                // Enviar datos al cliente solo cuando llega un nuevo mensaje
                if (this.clientWs && this.clientWs.readyState === WebSocket.OPEN) {
                    this.clientWs.send(JSON.stringify({
                        type: 'update',
                        closePrice,
                        highPrice,
                        lowPrice,
                        timestamp: currentTimestamp
                    }));
                }
            }
        });

        this.ws.on('close', () => {
            console.log(`WebSocket connection closed for ${symbol}`);
        });

        this.ws.on('error', (error: ErrorEvent) => {
            console.error(`WebSocket error for ${symbol}:`, error);
        });
    }

    public close(): void {
        this.ws.close();
    }
}