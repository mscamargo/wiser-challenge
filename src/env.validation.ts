import {
  IsBooleanString,
  IsEnum,
  IsNumberString,
  IsString,
  validateSync,
} from 'class-validator';
import { plainToClass } from 'class-transformer';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

enum DBDriver {
  PG = 'postgres',
  MYSQL = 'mysql',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumberString()
  PORT: number;

  @IsEnum(DBDriver)
  DB_DRIVER: string;

  @IsString()
  DB_HOST: string;

  @IsNumberString()
  DB_PORT: number;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASS: string;

  @IsString()
  DB_NAME: string;

  @IsBooleanString()
  DB_SYNC: boolean;
}

export function validate(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const configInstance = plainToClass(EnvironmentVariables, config);
  const errors = validateSync(configInstance, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const message = [
      ...errors,
      'Please check your environment variables, or your .env file',
    ]
      .map((error) => error.toString())
      .join('\n');

    throw new Error(message);
  }

  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  return validatedConfig;
}
