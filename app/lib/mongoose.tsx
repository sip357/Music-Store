import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
const options = {};

let clientPromise: Promise<typeof mongoose>;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so the MongoClient is not
  // recreated every time a change is made to the code, which would otherwise
  // cause a memory leak.
  if (!global._mongooseClientPromise) {
    global._mongooseClientPromise = mongoose.connect(uri, options).then(m => m);
  }
  clientPromise = global._mongooseClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  clientPromise = mongoose.connect(uri, options).then(m => m);
}

export default clientPromise;

