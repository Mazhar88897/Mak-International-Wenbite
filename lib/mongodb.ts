import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
   console.log("cannot connet") 
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

let cached = (global as any).mongoose || { conn: null, promise: null };

async function dbConnect() {
  console.log("connecting")  
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export const getGridFSBucket = () => {
  const db = mongoose.connection.db;
  return new GridFSBucket(db, {
    bucketName: 'images',
  });
};

export default dbConnect;
