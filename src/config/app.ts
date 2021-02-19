import { registerAs } from '@nestjs/config';

import env from '@src/helpers/env';

export type AppConfig = {
  port: number;
  baseRedirectUrl: string;
  shortUrlExpiresIn: number;
};

export default registerAs(
  'app',
  (): AppConfig => ({
    port: env<number>('PORT', 3000, parseInt),
    baseRedirectUrl: env<string>('BASE_REDIRECT_URL', ''),
    shortUrlExpiresIn: env<number>('SHORT_URL_EXPIRES_IN', 3600, parseInt),
  }),
);
