// lib/mongodb.ts
import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGO_URI;
const DB_NAME = process.env.MONGO_DB_NAME; // change this to your actual database name

let client: MongoClient;
let db: Db;

export async function connectDB() {
    if (db) return db;
    if (!uri) {
        throw new Error("MONGO_URI environment variable is not defined");
    }
    client = new MongoClient(uri);
    await client.connect();

    db = client.db(DB_NAME); // change this to your actual database name
    return db;
}