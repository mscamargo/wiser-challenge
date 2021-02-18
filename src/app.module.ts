import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { dbConfig } from '@src/config';
import { validate } from '@src/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [dbConfig], validate }),

    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('db'),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
