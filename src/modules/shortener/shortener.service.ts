import { ConfigService, ConfigType } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import {
  generateAlphanumericId,
  generateRandomInt,
} from '@src/helpers/generate';
import { AppConfig } from '@src/config/app';
import { ShortenUrlDto } from '@modules/shortener/dto/shorten-url.dto';
import { ShortenedUrlDto } from '@modules/shortener/dto/shortened-url.dto';
import { Url } from '@modules/shortener/entities/url.entity';

@Injectable()
export class ShortenerService {
  constructor(
    @InjectRepository(Url)
    private urlsRepository: Repository<Url>,
    private configService: ConfigService,
  ) {}

  async shortenUrl({ url }: ShortenUrlDto): Promise<ShortenedUrlDto> {
    const idSize = generateRandomInt(5, 10);
    const shortId = generateAlphanumericId(idSize);

    await this.urlsRepository.insert({
      url,
      shortId,
    });

    const { baseRedirectUrl } = this.configService.get<AppConfig>('app');

    const newUrl = `${baseRedirectUrl}/${shortId}`;

    return {
      newUrl,
    };
  }
}
