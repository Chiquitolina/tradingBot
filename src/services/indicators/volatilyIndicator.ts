import { BollingerBands, ATR } from 'technicalindicators';

export class VolatilityIndicator {
    private bollingerPeriod: number;
    private bollingerStdDev: number;
    private atrPeriod: number;

    constructor() {
        this.bollingerPeriod = 20;
        this.bollingerStdDev = 2;
        this.atrPeriod = 14;
    }

    public getBollingerPeriod() {
        return this.bollingerPeriod;
    }

    public getAtrPeriod() {
        return this.atrPeriod;
    }

    // Función para calcular Bollinger Bands
    private calculateBollingerBands(closes:number[]) {

        const bollingerBands = BollingerBands.calculate({
            period: this.bollingerPeriod,
            values: closes,
            stdDev: this.bollingerStdDev,
        });

        return bollingerBands[bollingerBands.length - 1]; // Retorna el último conjunto de bandas
    }

    // Función para calcular ATR (Average True Range)
    private calculateATR(closes:number[], highs:number[], lows:number[]): number {


        const atrValues = ATR.calculate({
            close: closes,
            high: highs,
            low: lows,
            period: this.atrPeriod,
        });

        return atrValues[atrValues.length - 1]; // Retorna el último valor del ATR
    }

    // Función para analizar la volatilidad
    public analyzeVolatility(closes:number[], highs:number[], lows:number[]): string {
        const bollingerBands = this.calculateBollingerBands(closes);
        const atrLastValue = this.calculateATR(closes, highs, lows);

        const upperBand = bollingerBands.upper;
        const lowerBand = bollingerBands.lower;
        const closePrice = closes.slice(-1)[0]; // Último precio de cierre

        let volatility = 'moderada'; // Valor por defecto

        // Clasificación de volatilidad basada en Bollinger Bands y ATR
        if (closePrice >= upperBand) {
            volatility = 'alta';
        } else if (closePrice <= lowerBand) {
            volatility = 'baja';
        } else if (atrLastValue > 0.01) { // Este umbral depende del activo que estés observando
            volatility = 'alta';
        }

        return volatility;
    }
}