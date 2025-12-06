import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;

export default async function dbConnect() {
  if (!MONGODB_URI)
    throw new Error("Please define the MONGODB_URI environment variable");

  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.error("DB CONNECTION ERROR:", error);
  }
  console.debug("DB CONNECTION SUCCESSFUL");
  return mongoose;
}
