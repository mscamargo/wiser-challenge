import { IsUrl } from 'class-validator';

export class ShortenedUrlDto {
  @IsUrl()
  newUrl: string;
}
