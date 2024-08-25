import { MongoClient, ServerApiVersion } from 'mongodb';

export class DatabaseConnection {
    private client: MongoClient;
    private uri: string;

    constructor(uri: string) {
        this.uri = uri;
        this.client = new MongoClient(this.uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
    }

    public async connect(): Promise<void> {
        try {
            // Connect the client to the server (optional starting in v4.7)
            await this.client.connect();
            // Send a ping to confirm a successful connection
            await this.client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }

    public async disconnect(): Promise<void> {
        try {
            await this.client.close();
            console.log('MongoDB connection closed.');
        } catch (error) {
            console.error('Error closing MongoDB connection:', error);
            throw error;
        }
    }
}