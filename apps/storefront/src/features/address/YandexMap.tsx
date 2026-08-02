import type { Coordinates } from '@korzinka/contracts';
import type { YMap, YMapMarker } from '@yandex/ymaps3-types';
import { useEffect, useRef, useState } from 'react';

import { loadYandexMaps } from './yandexMapsLoader';

type YandexMapProps = {
  apiKey: string;
  coordinates: Coordinates;
  onPick: (coordinates: Coordinates) => void;
};

export function YandexMap({ apiKey, coordinates, onPick }: YandexMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<YMap | null>(null);
  const markerRef = useRef<YMapMarker | null>(null);
  const onPickRef = useRef(onPick);
  const initialCoordinatesRef = useRef(coordinates);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    onPickRef.current = onPick;
  }, [onPick]);

  useEffect(() => {
    let isActive = true;
    let map: YMap | null = null;
    let frameId = 0;

    frameId = window.requestAnimationFrame(() => {
      void loadYandexMaps(apiKey)
        .then((maps) => {
          if (!isActive || !containerRef.current) return;

          const markerElement = document.createElement('div');
          markerElement.className = 'address-map__marker';
          markerElement.setAttribute('aria-label', 'Выбранный адрес');

          map = new maps.YMap(containerRef.current, {
            behaviors: ['drag', 'scrollZoom', 'pinchZoom', 'dblClick'],
            location: { center: initialCoordinatesRef.current, zoom: 16 },
          });
          const marker = new maps.YMapMarker(
            {
              coordinates: initialCoordinatesRef.current,
              draggable: true,
              mapFollowsOnDrag: true,
              onDragEnd: (nextCoordinates) =>
                onPickRef.current(nextCoordinates as Coordinates),
            },
            markerElement,
          );
          const listener = new maps.YMapListener({
            onClick: (_object, event) =>
              onPickRef.current(event.coordinates as Coordinates),
          });

          map
            .addChild(new maps.YMapDefaultSchemeLayer({}))
            .addChild(new maps.YMapDefaultFeaturesLayer({ zIndex: 1800 }))
            .addChild(listener)
            .addChild(marker);

          mapRef.current = map;
          markerRef.current = marker;
          setError(null);
        })
        .catch((reason: unknown) => {
          setError(
            reason instanceof Error ? reason.message : 'Карта недоступна',
          );
        });
    });

    return () => {
      isActive = false;
      window.cancelAnimationFrame(frameId);
      map?.destroy();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, [apiKey]);

  useEffect(() => {
    markerRef.current?.update({ coordinates });
    mapRef.current?.update({
      location: {
        center: coordinates,
        duration: 350,
        easing: 'ease-in-out',
        zoom: 16,
      },
    });
  }, [coordinates]);

  return (
    <div className="address-map">
      <div
        aria-label="Карта выбора адреса"
        className="address-map__canvas"
        ref={containerRef}
      />
      {error ? (
        <div className="address-map__error" role="alert">
          {error}
        </div>
      ) : null}
      <span className="address-map__hint">
        Нажмите на карту или перетащите метку
      </span>
    </div>
  );
}
