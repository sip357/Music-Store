import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

async function main() {
	const client = new MongoClient(uri);
    await client.connect();
}