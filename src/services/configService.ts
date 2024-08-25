import { exchangeSelected } from "../models/exchangeSelected"

export class ConfigService {

    private exchangeSelected: exchangeSelected;
    private static instance: ConfigService;

    constructor() {
        this.exchangeSelected = { name: '', publicKey: '', privateKey: '' };
    }

    public static getInstance(): ConfigService {
        if (!ConfigService.instance) {
            ConfigService.instance = new ConfigService();
        }
        return ConfigService.instance;
    }

    public setExchangeSelected(name:string, publicKey:string, secretKey:string): void {
        this.exchangeSelected.name = name;
        this.exchangeSelected.privateKey = secretKey;
        this.exchangeSelected.publicKey = publicKey;
    }

    public getExchangeSelected(): exchangeSelected {
        return this.exchangeSelected;
    }

}