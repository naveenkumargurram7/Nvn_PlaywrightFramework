import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const config = {
  username: process.env.USERNAME || '',
  password: process.env.PASSWORD || '',
  baseUrl: process.env.BASE_URL || 'https://ctcorphyd.com/SureshIT/login.php',
};

export default config;
