import {
  addressLocationSchema,
  type AddressLocation,
  type Coordinates,
} from '@korzinka/contracts';

const apiUrl = import.meta.env.VITE_API_URL ?? '/api';

async function requestLocation(path: string): Promise<AddressLocation> {
  const response = await fetch(`${apiUrl}${path}`);

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error(
        'Ключ не имеет доступа к API Геокодера. Подключите этот сервис в кабинете Яндекс Карт.',
      );
    }
    if (response.status === 503) {
      throw new Error(
        'Создайте ключ для API Геокодера и добавьте его в .env.local.',
      );
    }
    if (response.status === 404) {
      throw new Error('Не удалось найти такой адрес');
    }
    throw new Error('Не удалось определить адрес');
  }

  return addressLocationSchema.parse(await response.json());
}

export function findAddress(query: string) {
  const search = new URLSearchParams({ query });
  return requestLocation(`/geocode/forward?${search.toString()}`);
}

export function findAddressByCoordinates([longitude, latitude]: Coordinates) {
  const search = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
  });
  return requestLocation(`/geocode/reverse?${search.toString()}`);
}

export function getBrowserCoordinates(): Promise<Coordinates> {
  if (!navigator.geolocation) {
    return Promise.reject(
      new Error('Браузер не поддерживает определение местоположения'),
    );
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve([position.coords.longitude, position.coords.latitude]),
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          reject(new Error('Разрешите доступ к геопозиции в браузере'));
          return;
        }
        reject(new Error('Не удалось получить текущее местоположение'));
      },
      { enableHighAccuracy: true, maximumAge: 60_000, timeout: 10_000 },
    );
  });
}
