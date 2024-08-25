import WebSocket from 'ws';
import { Command, getUsageMessages, USAGE_MESSAGES } from '../config/constants';
import { DataService } from './dataService';
import { TrendIndicator } from './indicators/trendIndicator';

export class CommandHandler {


    private ws: WebSocket;
    private dataService: DataService;
    private trendIndicator: TrendIndicator;

    constructor(ws: WebSocket, dataService: DataService, trendIndicator: TrendIndicator) {
        this.ws = ws;
        this.dataService = dataService;
        this.trendIndicator = trendIndicator;
    }

    handleCommand(command: string): void {
        const trimmedCommand = command.trim();
        const parts = trimmedCommand.split(' ');

        const baseCommand = parts[0];
        const symbol = parts[1];
        const kline = parts[2];

        switch (baseCommand) {
            case '/startws':
                this.startWebSocket(symbol, kline);
                break;

            case '/stopws':
                this.stopWebSocket();
                break;

            case '/fetchfromapi':


            case '/activatetrend':
                this.activateTrend();
                break;

            case '/seecloses':
                this.seeCloses();
                break;

            case '/commands':
                this.showCommands();
                break;

            default:
                console.log("Unknown command. See /commands.");
                break;
        }
    }

    private startWebSocket(symbol: string, kline: string): void {
        if (symbol && kline) {
            this.ws.send(JSON.stringify({ command: 'startws', symbol, kline }));
        } else {
            console.log('\n')
            console.log(USAGE_MESSAGES[Command.STARTWS]);
        }
    }

    private stopWebSocket(): void {
        if (this.ws) {
            this.ws.send(JSON.stringify({ command: 'stopws' }));
        } else {
            console.log('No hay ningún WebSocket abierto.');
        }
    }

    private checkData() {
        
    }

    private fetchFromApi() {

    }

    private activateTrend(): void {
        if (this.dataService.getCloses().length < 26) {
            console.log('\n')
            console.log('Recopiled data:', this.dataService.getCloses().length);
            console.log('Invalid data length to execute this command.');
        } else {
            const { smaValues, emaValues, macdValues } = this.trendIndicator.calculateIndicators(this.dataService.getCloses());
            const trend = this.trendIndicator.combineIndicators(smaValues, emaValues, macdValues);
            console.log('\n');
            console.log('Indicador de tendencia:', trend);
        }
    }

    private seeCloses(): void {
        console.log('\n');
        console.log('closes:', this.dataService.getCloses());
    }

    private showCommands(): void {
        console.log('\n');
        console.log("Available commands:");
        getUsageMessages();
    }
}
