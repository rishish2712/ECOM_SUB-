import mongoose from 'mongoose'
import dotenv from "dotenv";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (global as any).mongoose || { conn: null, promise: null }

export const connectToDatabase = async (
  MONGODB_URI = process.env.MONGODB_URI
) => {
  if (cached.conn) return cached.conn

  if (!MONGODB_URI) throw new Error('MONGODB_URI is missing')

  cached.promise = cached.promise || mongoose.connect(MONGODB_URI)

  cached.conn = await cached.promise

  return cached.conn
}

dotenv.config();

const MONGODB_URI = "mongodb+srv://ujeshadmin:J.NpX9m53.qkMmw@cluster0.bdtpf.mongodb.net/ujeshdata?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing");
}
