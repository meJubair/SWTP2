import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY

export { PORT, FIREBASE_API_KEY };
