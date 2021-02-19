import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class ShortenedUrlDto {
  @IsUrl()
  @ApiProperty()
  newUrl: string;
}
