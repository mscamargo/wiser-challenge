jest.mock('date-fns', () => ({ addSeconds: jest.fn() }));

import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { addSeconds } from 'date-fns';
import { getRepositoryToken } from '@nestjs/typeorm';

import * as generateHelper from '@src/helpers/generate';
import { ShortenerService } from '@modules/shortener/shortener.service';
import { Url } from '@modules/shortener/entities/url.entity';

describe('ShortenerService', () => {
  let shortenerService: ShortenerService;

  const urlRepositoryMock = {
    insert: jest.fn(),
  };

  const baseRedirectUrl = 'http://shortener.io';
  const shortUrlExpiresIn = 3600;

  const configServiceMock = {
    get: jest.fn(() => ({
      baseRedirectUrl,
      shortUrlExpiresIn,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortenerService,
        { provide: getRepositoryToken(Url), useValue: urlRepositoryMock },
        { provide: ConfigService, useValue: configServiceMock },
      ],
    }).compile();

    shortenerService = module.get<ShortenerService>(ShortenerService);
  });

  describe('shortenUrl', () => {
    it('should generate a new short url', async () => {
      const expiresAt = new Date();
      (addSeconds as jest.Mock).mockReturnValue(expiresAt);

      const generateRandomIntSpy = jest
        .spyOn(generateHelper, 'generateRandomInt')
        .mockReturnValue(5);

      const shortId = 'abcd';
      const generateAlphanumericIdSpy = jest
        .spyOn(generateHelper, 'generateAlphanumericId')
        .mockReturnValue(shortId);

      const url = 'https://wisereducacao.com';

      const result = await shortenerService.shortenUrl({
        url,
      });

      const expected = {
        newUrl: `${baseRedirectUrl}/${shortId}`,
      };

      expect(result).toMatchObject(expected);
      expect(generateRandomIntSpy).toBeCalledWith(5, 10);
      expect(generateAlphanumericIdSpy).toBeCalledWith(5);
      expect(urlRepositoryMock.insert).toBeCalledWith({
        url,
        shortId,
        expiresAt,
      });
      expect(configServiceMock.get).toBeCalledWith('app');
      expect(addSeconds).toBeCalled();
    });
  });
});
