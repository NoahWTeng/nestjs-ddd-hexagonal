import { registerAs } from '@nestjs/config';
import { config } from 'dotenv';

config();
export const mongodbConfig = registerAs('mongodb', () => ({
  uri: process.env.MONGO_URI || 'mongodb://localhost/test',
}));
