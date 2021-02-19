import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShortenerController } from '@modules/shortener/shortener.controller';
import { ShortenerService } from '@modules/shortener/shortener.service';
import { Url } from '@modules/shortener/entities/url.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  controllers: [ShortenerController],
  providers: [ShortenerService],
})
export class ShortenerModule {}
