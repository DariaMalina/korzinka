import {
  addressLocationSchema,
  type AddressLocation,
  type Coordinates,
} from '@korzinka/contracts';
import { z } from 'zod';

const geocoderResponseSchema = z.object({
  response: z.object({
    GeoObjectCollection: z.object({
      featureMember: z.array(
        z.object({
          GeoObject: z.object({
            metaDataProperty: z.object({
              GeocoderMetaData: z.object({
                Address: z
                  .object({
                    formatted: z.string().optional(),
                  })
                  .optional(),
                text: z.string().optional(),
              }),
            }),
            Point: z.object({
              pos: z.string(),
            }),
          }),
        }),
      ),
    }),
  }),
});

export class GeocoderConfigurationError extends Error {}
export class GeocoderAccessError extends Error {}
export class GeocoderNotFoundError extends Error {}

export function parseGeocoderResponse(payload: unknown): AddressLocation {
  const parsed = geocoderResponseSchema.parse(payload);
  const firstResult = parsed.response.GeoObjectCollection.featureMember[0];

  if (!firstResult) {
    throw new GeocoderNotFoundError('Адрес не найден');
  }

  const geoObject = firstResult.GeoObject;
  const [longitude, latitude] = geoObject.Point.pos
    .split(' ')
    .map((coordinate) => Number(coordinate));
  const formattedAddress =
    geoObject.metaDataProperty.GeocoderMetaData.Address?.formatted ??
    geoObject.metaDataProperty.GeocoderMetaData.text;

  return addressLocationSchema.parse({
    coordinates: [longitude, latitude],
    formattedAddress,
  });
}

async function requestGeocoder(query: string): Promise<AddressLocation> {
  const apiKey = process.env.YANDEX_GEOCODER_API_KEY;

  if (!apiKey) {
    throw new GeocoderConfigurationError(
      'YANDEX_GEOCODER_API_KEY is not configured',
    );
  }

  const url = new URL('https://geocode-maps.yandex.ru/v1/');
  url.search = new URLSearchParams({
    apikey: apiKey,
    format: 'json',
    geocode: query,
    lang: 'ru_RU',
    results: '1',
  }).toString();

  const response = await fetch(url, {
    headers: { accept: 'application/json' },
    signal: AbortSignal.timeout(7_000),
  });

  if (response.status === 401 || response.status === 403) {
    throw new GeocoderAccessError(
      'The API key does not have access to Yandex Geocoder',
    );
  }

  if (!response.ok) {
    throw new Error(`Yandex Geocoder responded with ${response.status}`);
  }

  return parseGeocoderResponse(await response.json());
}

export function geocodeAddress(address: string) {
  return requestGeocoder(address);
}

export function reverseGeocode([longitude, latitude]: Coordinates) {
  return requestGeocoder(`${longitude},${latitude}`);
}
