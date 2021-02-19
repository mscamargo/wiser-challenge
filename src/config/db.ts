import { registerAs } from '@nestjs/config';

import env from '@src/helpers/env';

const parseEnvToBool = (value: string) => value === 'true' || !!+value;

export default registerAs('db', () => ({
  type: env<string>('DB_DRIVER', 'pg'),
  host: env<string>('DB_HOST', 'localhost'),
  port: env<number>('DB_PORT', 5432, parseInt),
  username: env<string>('DB_USER', 'root'),
  password: env<string>('DB_PASS', 'root'),
  database: env<string>('DB_NAME', 'nest'),
  entities: [],
  synchronize: env<boolean>('DB_SYNC', false, parseEnvToBool),
  autoLoadEntities: true,
  ssl: env<boolean>('DB_USE_SSL', false, parseEnvToBool),
}));
