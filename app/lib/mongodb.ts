// lib/mongodb.ts
import { MongoClient, Db } from "mongodb";

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB_NAME;
    if (!uri) {
        throw new Error("MONGO_URI environment variable is not defined");
    }
    if (!DB_NAME) {
        throw new Error("MONGO_DB_NAME environment variable is not defined");
    }
let client: MongoClient;
let clientPromise: Promise<MongoClient>;
let db: Db;

if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri);
    globalThis._mongoClientPromise = client.connect();
}

clientPromise = globalThis._mongoClientPromise;

export async function connectDB() {
    const client = await clientPromise;
    db = client.db(DB_NAME);
    return db;
}