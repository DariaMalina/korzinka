import type * as YandexMaps from '@yandex/ymaps3-types';

type YandexMapsApi = typeof YandexMaps;

let loaderPromise: Promise<YandexMapsApi> | null = null;

function getLoadedApi() {
  return (globalThis as { ymaps3?: YandexMapsApi }).ymaps3;
}

export function loadYandexMaps(apiKey: string): Promise<YandexMapsApi> {
  const loadedApi = getLoadedApi();

  if (loadedApi) {
    return loadedApi.ready.then(() => loadedApi);
  }

  if (loaderPromise) return loaderPromise;

  loaderPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const search = new URLSearchParams({ apikey: apiKey, lang: 'ru_RU' });

    script.async = true;
    script.src = `https://api-maps.yandex.ru/v3/?${search.toString()}`;
    script.dataset.yandexMapsLoader = 'true';
    script.addEventListener('load', () => {
      const api = getLoadedApi();
      if (!api) {
        reject(new Error('Яндекс Карты загрузились без API'));
        return;
      }
      void api.ready.then(() => resolve(api)).catch(reject);
    });
    script.addEventListener('error', () => {
      loaderPromise = null;
      reject(new Error('Не удалось загрузить Яндекс Карты'));
    });
    document.head.append(script);
  });

  return loaderPromise;
}
