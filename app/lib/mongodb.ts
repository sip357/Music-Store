import mongoose from "mongoose";
const uri = process.env.MONGO_URI;
if (!uri) {
    throw new Error('MONGO_URI is not defined in the environment variables');
}

export async function connectDB() {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    await mongoose.connect(uri as string);
}