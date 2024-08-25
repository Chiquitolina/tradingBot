import { SMA, EMA, MACD } from 'technicalindicators';

export class TrendIndicator {

    private smaPeriod = 50;
    private emaPeriod = 9;
    private macdInput: any;

    constructor() {}
    
    public getSmaPeriod() {
        return this.smaPeriod;
    }

    public getEmaPeriod() {
        return this.emaPeriod;
    }

    public calculateIndicators(closes:number[]) {
        console.log('\n')
        console.log("Calculating indicators with prices:", closes);

        const smaValues = SMA.calculate({ period: this.smaPeriod, values: closes});
        const emaValues = EMA.calculate({ period: this.emaPeriod, values: closes});
        const macdValues = MACD.calculate(this.macdInput);

        return { smaValues, emaValues, macdValues };
    }

    public combineIndicators(sma: number[], ema: number[], macd: any[]): string {
        const latestSMA = sma[sma.length - 1];
        const latestEMA = ema[ema.length - 1];
        const latestMACD = macd[macd.length - 1]?.MACD;

        console.log("Latest SMA:", latestSMA);
        console.log("Latest EMA:", latestEMA);
        console.log("Latest MACD:", latestMACD);

        if (latestSMA > latestEMA && latestMACD > 0) {
            return 'Tendencia Alcista';
        } else if (latestSMA < latestEMA && latestMACD < 0) {
            return 'Tendencia Bajista';
        } else {
            return 'Tendencia Lateral';
        }
    }
}