import { registerAs } from '@nestjs/config';

import env from '@src/helpers/env';

export type AppConfig = {
  baseRedirectUrl: string;
  shortUrlExpiresIn: number;
};

export default registerAs(
  'app',
  (): AppConfig => ({
    baseRedirectUrl: env<string>('BASE_REDIRECT_URL', ''),
    shortUrlExpiresIn: env<number>('SHORT_URL_EXPIRES_IN', 3600, parseInt),
  }),
);
