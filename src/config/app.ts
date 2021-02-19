import { registerAs } from '@nestjs/config';

import env from '@src/helpers/env';

export type AppConfig = {
  baseRedirectUrl: string;
};

export default registerAs(
  'app',
  (): AppConfig => ({
    baseRedirectUrl: env<string>('BASE_REDIRECT_URL', ''),
  }),
);
