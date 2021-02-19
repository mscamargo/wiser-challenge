import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { appConfig, dbConfig } from '@src/config';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { ShortenerModule } from '@modules/shortener/shortener.module';
import { validate } from '@src/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig],
      validate,
    }),

    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('db'),
      inject: [ConfigService],
    }),

    ShortenerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
