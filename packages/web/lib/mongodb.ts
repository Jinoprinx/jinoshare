import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | undefined;

function getClientPromise(): Promise<MongoClient> {
  if (clientPromise) {
    return clientPromise;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }

  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri, {});
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    // In production mode, it's best to not use a global variable.
    const client = new MongoClient(uri, {});
    clientPromise = client.connect();
  }

  return clientPromise;
}

// Export a function that returns the client promise instead of the promise itself
export default getClientPromise;
