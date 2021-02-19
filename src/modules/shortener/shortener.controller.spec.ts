import { Test, TestingModule } from '@nestjs/testing';

import { ShortenerController } from '@modules/shortener/shortener.controller';
import { ShortenerService } from '@modules/shortener/shortener.service';

describe('ShortenerController', () => {
  let shortenerController: ShortenerController;
  const shortenerServiceMock = {
    shortenUrl: jest.fn(() => ({ newUrl: 'shortUrl' })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortenerController],
      providers: [
        { provide: ShortenerService, useValue: shortenerServiceMock },
      ],
    }).compile();

    shortenerController = module.get<ShortenerController>(ShortenerController);
  });

  describe('shortenUrl', () => {
    it('should return a short url', () => {
      const shortenUrlDto = { url: 'urlToShorten' };
      const result = shortenerController.shortenUrl(shortenUrlDto);

      expect(result).toEqual({ newUrl: 'shortUrl' });
      expect(shortenerServiceMock.shortenUrl).toBeCalledWith(shortenUrlDto);
    });
  });
});
