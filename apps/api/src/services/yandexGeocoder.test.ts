import { describe, expect, it } from 'vitest';

import { parseGeocoderResponse } from './yandexGeocoder';

describe('parseGeocoderResponse', () => {
  it('maps a Yandex response to the shared address contract', () => {
    const result = parseGeocoderResponse({
      response: {
        GeoObjectCollection: {
          featureMember: [
            {
              GeoObject: {
                metaDataProperty: {
                  GeocoderMetaData: {
                    Address: { formatted: 'Россия, Москва, Тверская улица, 1' },
                    text: 'Москва, Тверская улица, 1',
                  },
                },
                Point: { pos: '37.617635 55.755814' },
              },
            },
          ],
        },
      },
    });

    expect(result).toEqual({
      coordinates: [37.617635, 55.755814],
      formattedAddress: 'Россия, Москва, Тверская улица, 1',
    });
  });
});
