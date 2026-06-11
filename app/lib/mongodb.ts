// lib/mongodb.ts
import mongoose from "mongoose";

declare global {
    var mongoose: {
        conn: any;
        promise: Promise<any> | null;
    };
}

const MONGO_URI = process.env.MONGO_URI || "";

if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
}

let cached = global.mongoose;

if (!cached) {
    global.mongoose = { conn: null, promise: null };
    cached = global.mongoose;
}

export async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose
            .connect(MONGO_URI, opts)
            .then((mongoose) => {
                return mongoose;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}