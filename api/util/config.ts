import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI as string;
const SECRET = process.env.SECRET as string;
const MY_GMAIL = process.env.MY_GMAIL as string;
const APP_PASSWORD = process.env.APP_PASSWORD as string;

export { PORT, MONGODB_URI, SECRET, MY_GMAIL, APP_PASSWORD };
