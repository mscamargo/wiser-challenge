import { Test, TestingModule } from '@nestjs/testing';

import { ShortenerController } from '@modules/shortener/shortener.controller';
import { ShortenerService } from '@modules/shortener/shortener.service';

describe('ShortenerController', () => {
  let controller: ShortenerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortenerController],
      providers: [ShortenerService],
    }).compile();

    controller = module.get<ShortenerController>(ShortenerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
