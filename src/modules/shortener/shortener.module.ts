import { Module } from '@nestjs/common';

import { ShortenerController } from '@modules/shortener/shortener.controller';
import { ShortenerService } from '@modules/shortener/shortener.service';

@Module({
  controllers: [ShortenerController],
  providers: [ShortenerService],
})
export class ShortenerModule {}
