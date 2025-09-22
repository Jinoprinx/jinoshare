import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

const uri = process.env.MONGODB_URI;

if (!uri) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  } else {
    // During build time, we don't need the connection
    console.warn("MONGODB_URI not found - this is expected during build time");
  }
}
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (uri) {
  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, {});
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, {});
    clientPromise = client.connect();
  }
} else {
  // Create a mock promise for build time
  clientPromise = Promise.reject(new Error("MongoDB connection not available during build"));
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
