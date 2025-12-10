import { registerAs } from '@nestjs/config';

export const configurationMongo = registerAs('mongo', () => ({
  MONGO_URL: process.env.MONGO_URL || '',
}));
