
import { MongoClient, MongoClientOptions, ServerApiVersion } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.*');
}

const uri = process.env.MONGODB_URI as string; 
const options:MongoClientOptions = {
  maxPoolSize: 10,
  minPoolSize: 4,
  connectTimeoutMS: 5000,
  socketTimeoutMS: 3000,
  serverSelectionTimeoutMS: 10000,
  maxIdleTimeMS: 10000,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

class Singleton {
  private static _instance: Singleton;
  private client: MongoClient;
  private clientPromise: Promise<MongoClient>;

  private constructor() {
    this.client = new MongoClient(uri, options);
    this.clientPromise = this.client.connect();

    if (process.env.NODE_ENV === 'development') {
      // In development mode, use a global variable to preserve the value
      // across module reloads caused by HMR (Hot Module Replacement).
      global._mongoClientPromise = this.clientPromise;
    }
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new Singleton();
    }
    return this._instance.clientPromise;
  }
}

const clientPromise = Singleton.instance;

// Export a module-scoped MongoClient promise.
// By doing this in a separate module, 
// the client can be shared across functions.
export default clientPromise;