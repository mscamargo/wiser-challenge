import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class ShortenUrlDto {
  @IsUrl()
  @ApiProperty()
  url: string;
}
