import { Controller } from '@nestjs/common';

import { ShortenerService } from '@modules/shortener/shortener.service';

@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}
}
