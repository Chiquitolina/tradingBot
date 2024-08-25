import * as readline from 'readline';
import WebSocket from 'ws';
import { Command, getUsageMessages, USAGE_MESSAGES } from './config/constants';
import { CommandHandler } from './services/commandHandler';
import { DataService } from './services/dataService';
import { TrendIndicator } from './services/indicators/trendIndicator';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ws = new WebSocket('ws://localhost:3000');
const dataService = DataService.getInstance();
const trendIndicator = new TrendIndicator();
const commandHandler = new CommandHandler(ws, dataService, trendIndicator);

function prompt() {

console.log('\n');
console.log('Trading Bot Client running.')

ws.on('open', () => {
    console.log('¡Successfully connected to App Trading Bot Server!');
    handleCommand();
});

ws.on('message', (data) => {
    dataService.addClose(JSON.parse(String(data)).closePrice)
    dataService.addHigh(JSON.parse(String(data)).highPrice)
    dataService.addLow(JSON.parse(String(data)).lowPrice)
});

function handleCommand() {
    console.log('\n');
    rl.question('Enter command: ', (command) => {
        commandHandler.handleCommand(command);
        handleCommand();  // Espera el siguiente comando
    });
}

}

prompt();