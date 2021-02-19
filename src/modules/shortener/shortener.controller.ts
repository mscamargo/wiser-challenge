import { Body, Controller, Post } from '@nestjs/common';

import { ShortenUrlDto } from '@modules/shortener/dto/shorten-url.dto';
import { ShortenerService } from '@modules/shortener/shortener.service';

@Controller()
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post('encurtador')
  shortenUrl(@Body() shortenUrlDto: ShortenUrlDto) {
    return this.shortenerService.shortenUrl(shortenUrlDto);
  }
}
