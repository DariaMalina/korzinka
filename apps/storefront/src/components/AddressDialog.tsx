import type { Coordinates } from '@korzinka/contracts';
import { Button, Dialog } from '@korzinka/ui';
import { type FormEvent, useState } from 'react';

import {
  findAddress,
  findAddressByCoordinates,
  getBrowserCoordinates,
} from '../features/address/api';
import { YandexMap } from '../features/address/YandexMap';

const MOSCOW_CENTER: Coordinates = [37.617635, 55.755814];

function formatMapPoint([longitude, latitude]: Coordinates) {
  return `Точка на карте: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
}

type AddressDialogProps = {
  address: string;
  onClose: () => void;
  onSave: (address: string) => void;
  open: boolean;
};

export function AddressDialog({
  address,
  onClose,
  onSave,
  open,
}: AddressDialogProps) {
  const [value, setValue] = useState(address);
  const [coordinates, setCoordinates] = useState<Coordinates>(MOSCOW_CENTER);
  const [isLocating, setIsLocating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapsApiKey = import.meta.env.VITE_YANDEX_MAPS_API_KEY?.trim() ?? '';

  const applyCoordinates = async (nextCoordinates: Coordinates) => {
    setCoordinates(nextCoordinates);
    setError(null);

    try {
      const location = await findAddressByCoordinates(nextCoordinates);
      setValue(location.formattedAddress);
      setCoordinates(location.coordinates);
    } catch (reason) {
      setValue(formatMapPoint(nextCoordinates));
      setError(
        reason instanceof Error
          ? `${reason.message} Координаты можно сохранить без расшифровки адреса.`
          : 'Не удалось определить адрес. Координаты можно сохранить.',
      );
    }
  };

  const handleLocate = async () => {
    setIsLocating(true);
    setError(null);

    try {
      await applyCoordinates(await getBrowserCoordinates());
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : 'Не удалось определить местоположение',
      );
    } finally {
      setIsLocating(false);
    }
  };

  const handleSearch = async () => {
    if (!value.trim()) return;
    setIsSearching(true);
    setError(null);

    try {
      const location = await findAddress(value.trim());
      setValue(location.formattedAddress);
      setCoordinates(location.coordinates);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Адрес не найден');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (value.trim()) onSave(value.trim());
  };

  return (
    <Dialog
      className="address-dialog"
      label="Адрес доставки"
      onClose={onClose}
      open={open}
    >
      <button
        aria-label="Закрыть"
        className="dialog-close"
        onClick={onClose}
        type="button"
      >
        ×
      </button>
      <div className="address-dialog__form">
        <span className="service-dialog__emoji" aria-hidden="true">
          📍
        </span>
        <span className="section-kicker">Куда доставить?</span>
        <h2>Адрес доставки</h2>
        <p>Найдите адрес, определите геопозицию или выберите точку на карте.</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="address">Город, улица и дом</label>
          <div className="address-search-row">
            <input
              id="address"
              onChange={(event) => setValue(event.target.value)}
              placeholder="Например, Москва, Лесная, 7"
              value={value}
            />
            <Button
              aria-label="Найти адрес на карте"
              disabled={!value.trim()}
              isLoading={isSearching}
              onClick={() => void handleSearch()}
              type="button"
              variant="secondary"
            >
              Найти
            </Button>
          </div>
          <Button
            className="location-button"
            isLoading={isLocating}
            onClick={() => void handleLocate()}
            type="button"
            variant="ghost"
          >
            <span aria-hidden="true">⌖</span> Определить моё местоположение
          </Button>
          {error ? (
            <p className="address-dialog__error" role="alert">
              {error}
            </p>
          ) : null}
          <Button disabled={!value.trim()} size="lg" type="submit">
            Сохранить адрес
          </Button>
        </form>
      </div>
      <div className="address-dialog__map-column">
        {mapsApiKey && open ? (
          <YandexMap
            apiKey={mapsApiKey}
            coordinates={coordinates}
            onPick={(nextCoordinates) => void applyCoordinates(nextCoordinates)}
          />
        ) : (
          <div className="address-map address-map--empty">
            <span aria-hidden="true">🗺️</span>
            <strong>Карта готова к подключению</strong>
            <p>
              Добавьте <code>VITE_YANDEX_MAPS_API_KEY</code> в{' '}
              <code>.env.local</code>.
            </p>
          </div>
        )}
      </div>
    </Dialog>
  );
}
