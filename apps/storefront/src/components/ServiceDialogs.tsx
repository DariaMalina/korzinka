import { Button, Dialog } from '@korzinka/ui';
import { type FormEvent, useState } from 'react';

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

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (value.trim()) onSave(value.trim());
  };

  return (
    <Dialog className="service-dialog" label="Адрес доставки" onClose={onClose} open={open}>
      <button
        aria-label="Закрыть"
        className="dialog-close"
        onClick={onClose}
        type="button"
      >
        ×
      </button>
      <span className="service-dialog__emoji" aria-hidden="true">
        📍
      </span>
      <span className="section-kicker">Куда доставить?</span>
      <h2>Адрес доставки</h2>
      <p>Сейчас проверим зону доставки и покажем подходящий каталог.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="address">Город, улица и дом</label>
        <input
          id="address"
          onChange={(event) => setValue(event.target.value)}
          placeholder="Например, Лесная, 7"
          value={value}
        />
        <Button type="submit">Сохранить адрес</Button>
      </form>
    </Dialog>
  );
}

type SupportDialogProps = {
  onClose: () => void;
  onSent: () => void;
  open: boolean;
};

export function SupportDialog({ onClose, onSent, open }: SupportDialogProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!message.trim()) return;
    setMessage('');
    onSent();
  };

  return (
    <Dialog className="service-dialog" label="Поддержка" onClose={onClose} open={open}>
      <button
        aria-label="Закрыть"
        className="dialog-close"
        onClick={onClose}
        type="button"
      >
        ×
      </button>
      <span className="service-dialog__emoji" aria-hidden="true">
        💬
      </span>
      <span className="section-kicker">Ответим быстро</span>
      <h2>Служба поддержки</h2>
      <p>Опишите вопрос. В рабочей версии обращение будет связано с заказом.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="support-message">Сообщение</label>
        <textarea
          id="support-message"
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Чем мы можем помочь?"
          rows={4}
          value={message}
        />
        <Button disabled={!message.trim()} type="submit">
          Отправить
        </Button>
      </form>
    </Dialog>
  );
}

export function HistoryDialog({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) {
  return (
    <Dialog className="service-dialog" label="История заказов" onClose={onClose} open={open}>
      <button
        aria-label="Закрыть"
        className="dialog-close"
        onClick={onClose}
        type="button"
      >
        ×
      </button>
      <span className="service-dialog__emoji" aria-hidden="true">
        📦
      </span>
      <span className="section-kicker">Ваши покупки</span>
      <h2>История заказов</h2>
      <div className="history-empty">
        <p>Завершённых заказов пока нет.</p>
        <Button onClick={onClose}>Собрать первый заказ</Button>
      </div>
    </Dialog>
  );
}

export function SuccessDialog({
  onClose,
  open,
  orderNumber,
}: {
  onClose: () => void;
  open: boolean;
  orderNumber: string;
}) {
  return (
    <Dialog className="success-dialog" label="Заказ оформлен" onClose={onClose} open={open}>
      <span aria-hidden="true" className="success-dialog__check">
        ✓
      </span>
      <h2>Заказ оформлен!</h2>
      <p>
        Номер <strong>{orderNumber}</strong>. Уже передали его на сборку.
      </p>
      <div className="order-tracking" aria-label="Статус заказа">
        <span className="is-done">Заказ принят</span>
        <span>Собираем</span>
        <span>В пути</span>
      </div>
      <Button onClick={onClose}>Понятно</Button>
    </Dialog>
  );
}
