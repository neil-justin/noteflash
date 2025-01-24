import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI as string;
const SECRET = process.env.SECRET as string;
const MY_GMAIL = process.env.MY_GMAIL as string;
const APP_PASSWORD = process.env.APP_PASSWORD as string;
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY as string;
const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN as string;
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID as string;
const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET as string;
const FIREBASE_MESSAGING_SENDER_ID = process.env
  .FIREBASE_MESSAGING_SENDER_ID as string;
const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID as string;

export {
  PORT,
  MONGODB_URI,
  SECRET,
  MY_GMAIL,
  APP_PASSWORD,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
};
