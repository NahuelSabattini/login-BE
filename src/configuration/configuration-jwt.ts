import { registerAs } from '@nestjs/config';

export const configurationJwt = registerAs('jwt', () => ({
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
}));

export enum MAPPED_JWT_VARIABLES {
  JWT_SECRET = 'jwt.JWT_SECRET',
}
