import WebSocket, { RawData } from 'ws';
import { BinanceWebSocket } from './config/binanceWebSocket';
import { DataService } from './services/dataService';
import { TrendIndicator } from './services/indicators/trendIndicator';

const wss = new WebSocket.Server({ port: 3000 });
const dataService = DataService.getInstance();
const trendInd = new TrendIndicator();

let btcWebSocket: BinanceWebSocket | null = null;

function main() {
    console.log('\n');
    console.log('Trading Bot Server running.');
    console.log('Waiting Client to be connected.');

    wss.on('connection', (clientWs) => {
        console.log('\n');
        console.log('¡Client successfully connected to MainApp!');

        clientWs.on('message', (message: RawData) => {
            const data = JSON.parse(message.toString());

            switch (data.command) {
                case 'startws':
                    const { symbol, kline } = data;
                    if (btcWebSocket) {
                        console.log('\n');
                        console.log(`WebSocket for ${symbol} on ${kline} already running.`);
                        return;
                    }
                    btcWebSocket = new BinanceWebSocket(symbol, kline, dataService, trendInd, clientWs);
                    console.log('\n');
                    console.log(`Started WebSocket for ${symbol} with ${kline} interval`);
                    break;

                case 'stopws':
                    if (btcWebSocket) {
                        btcWebSocket.close();
                        btcWebSocket = null;
                        console.log('\n')
                        console.log('Stopped WebSocket');
                    }
                    break;

                default:
                    console.log('Unknown command');
                    break;
            }
        });

        clientWs.on('close', () => {
            console.log('\n');
            console.log('Client disconnected');
        });

        clientWs.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });
}

main();
// Keeps the process alive and listening for WebSocket connections
process.stdin.resume();