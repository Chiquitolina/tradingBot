import { error } from "console";
import { RawData } from "ws";
import { ImpulseIndicator } from "./indicators/impulseIndicator";
import { TrendIndicator } from "./indicators/trendIndicator";
import { VolatilityIndicator } from "./indicators/volatilyIndicator";

// dataService.ts
export class DataService {
    private static instance: DataService;
    private closes: number[] = [];
    private highs: number[] = [];
    private lows: number[] = [];

    private dataContainer: RawData[] = []; // Inicializa como arreglo vacío

    private impulseIndicaor: ImpulseIndicator;
    private trendIndicator: TrendIndicator;

    private constructor() {

    this.impulseIndicaor = new ImpulseIndicator()   ;
    this.trendIndicator = new TrendIndicator();

    }

    public static getInstance(): DataService {
        if (!DataService.instance) {
            DataService.instance = new DataService();
        }
        return DataService.instance;
    }

    public async fetchDataFromAPI(symbol: string, kline: string) {

        const baseUrl : string = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${kline}`;
        try {
            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    }

    public addClose(closePrice: number): void {
        this.closes.push(closePrice);
    }

    public addData(data: RawData): void {
        this.dataContainer.push(data);
    }

    public addHigh(data: number): void {
        this.highs.push(data);
    }

    public addLow(data: number): void {
        this.lows.push(data);
    }

    public getData(): RawData[] {
        return this.dataContainer;
    }

    public getCloses(): number[] {
        return this.closes;
    } 

    public getHighs(): number[] {
        return this.highs;
    }

    public getLows(): number[] {
        return this.lows;
    }

    public getHighestPeriod() {
 
    }
}
