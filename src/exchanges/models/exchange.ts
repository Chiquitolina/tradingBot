export abstract class Exchange {
    protected apiKey: string;
    protected apiSecret: string;

    constructor(apiKey: string, 
                apiSecret:string) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret
    }
}