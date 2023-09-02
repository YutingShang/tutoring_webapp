import mongoose from "mongoose"

let isConnected = false;

export default async function databaseConnect() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGODB_URL as string);
    isConnected = true;
  }
}