import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { ShortenerController } from '@modules/shortener/shortener.controller';
import { ShortenerService } from '@modules/shortener/shortener.service';

describe('ShortenerController', () => {
  let shortenerController: ShortenerController;
  const shortenerServiceMock = {
    shortenUrl: jest.fn(() => ({ newUrl: 'shortUrl' })),
    getRedirectUrl: jest.fn(),
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

  describe('redirect', () => {
    it('should return the redirect url', () => {
      shortenerServiceMock.getRedirectUrl.mockReturnValue({
        url: 'urlToRedirect',
      });

      const result = shortenerController.redirect('shortId');

      expect(result).toEqual({ url: 'urlToRedirect' });
      expect(shortenerServiceMock.getRedirectUrl).toBeCalledWith('shortId');
    });

    it('should throw a not found exception', async () => {
      shortenerServiceMock.getRedirectUrl.mockRejectedValue(
        new NotFoundException(),
      );

      const result = shortenerController.redirect('shortId');

      await expect(result).rejects.toThrowError(NotFoundException);
      expect(shortenerServiceMock.getRedirectUrl).toBeCalledWith('shortId');
    });
  });
});
