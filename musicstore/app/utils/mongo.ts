const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;
if (!uri) {
    throw new Error('MONGO_URI is not defined in the environment variables');
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});