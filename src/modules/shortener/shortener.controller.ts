import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, Redirect } from '@nestjs/common';

import { ShortenUrlDto } from '@modules/shortener/dto/shorten-url.dto';
import { ShortenedUrlDto } from '@modules/shortener/dto/shortened-url.dto';
import { ShortenerService } from '@modules/shortener/shortener.service';

@Controller()
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post('encurtador')
  @ApiOperation({ summary: 'Shorten a URL' })
  @ApiBody({ type: ShortenUrlDto })
  @ApiCreatedResponse({ type: ShortenedUrlDto })
  shortenUrl(@Body() shortenUrlDto: ShortenUrlDto) {
    return this.shortenerService.shortenUrl(shortenUrlDto);
  }

  @Get(':shortId')
  @Redirect()
  @ApiOperation({ summary: 'Redirect to URL' })
  @ApiNotFoundResponse({
    description: 'If the shortId is expired or not exists',
  })
  @ApiResponse({
    status: 302,
    description: 'Redirect to URL of the shortId provided',
  })
  redirect(@Param('shortId') shortId: string) {
    return this.shortenerService.getRedirectUrl(shortId);
  }
}
