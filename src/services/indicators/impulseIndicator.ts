import { RSI, Stochastic, ADX } from 'technicalindicators';

export class ImpulseIndicator {
    private rsiPeriod: number;
    private stochasticPeriod: any;
    private adxPeriod: number;

    constructor() {
        this.rsiPeriod = 14;
        this.stochasticPeriod = {
            period: 14,
            signalPeriod: 3
        };
        this.adxPeriod = 14;
    }

    public getRsiPeriod() {
        return this.rsiPeriod;
    }

    public getStochasticPeriod() {
        return this.stochasticPeriod;
    }

    public getAdxPeriod() {
        return this.adxPeriod;
    }

    // Función para calcular RSI
    private calculateRSI(closes:number[]): number {
        const rsiValues = RSI.calculate({
            values: closes,
            period: this.rsiPeriod,
        });

        return rsiValues[rsiValues.length - 1]; // Retorna el último valor del RSI
    }

    // Función para calcular Stochastic Oscillator
    private calculateStochastic(closes: number[], highs:number[], lows:number[]): number {


        const stochasticValues = Stochastic.calculate({
            high: highs,
            low: lows,
            close: closes,
            period: this.stochasticPeriod.period,
            signalPeriod: this.stochasticPeriod.signalPeriod,
        });

        return stochasticValues[stochasticValues.length - 1].k; // Retorna el último valor de %K
    }

    // Función para calcular ADX (Average Directional Index)
    private calculateADX(closes:number[], highs:number[], lows:number[]): number {

        const adxValues = ADX.calculate({
            close: closes,
            high: highs,
            low: lows,
            period: this.adxPeriod,
        });

        return adxValues[adxValues.length - 1].adx; // Retorna el último valor del ADX
    }

    // Función para calcular el impulso cualitativo
    public calculateImpulse(highs:number[], closes:number[], lows:number[]): string {
        const rsiLastValue = this.calculateRSI(closes);
        const stochasticLastValue = this.calculateStochastic(closes, highs, lows);
        const adxLastValue = this.calculateADX(closes, highs, lows);

        // Clasificación cualitativa del impulso basada en ADX y otros indicadores
        let impulse = 'medio'; // Valor por defecto

        // Condiciones de impulso basado en ADX
        if (adxLastValue > 25) {
            if (rsiLastValue > 70 && stochasticLastValue > 80) {
                impulse = 'fuerte';
            } else if (rsiLastValue < 30 && stochasticLastValue < 20) {
                impulse = 'débil';
            }
        } else {
            impulse = 'tendencia débil';
        }

        return impulse;
    }
}