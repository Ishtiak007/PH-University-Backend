import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
};
