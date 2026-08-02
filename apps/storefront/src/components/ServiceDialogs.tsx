import { Button, Dialog, formatMoney } from '@korzinka/ui';
import { type FormEvent, useEffect, useState } from 'react';

type SupportDialogProps = {
  onClose: () => void;
  onSent: () => void;
  open: boolean;
};

export function SupportDialog({ onClose, onSent, open }: SupportDialogProps) {
  const [attachment, setAttachment] = useState<File | null>(null);
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const emailError =
    emailTouched && !emailIsValid
      ? email.trim()
        ? 'Проверьте формат почты — например, name@example.ru'
        : 'Укажите почту для ответа'
      : null;
  const canSubmit = emailIsValid && message.trim().length > 0;

  useEffect(
    () => () => {
      if (attachmentUrl) URL.revokeObjectURL(attachmentUrl);
    },
    [attachmentUrl],
  );

  const clearAttachment = () => {
    setAttachment(null);
    setAttachmentUrl(null);
    setPreviewOpen(false);
  };

  const handleClose = () => {
    setPreviewOpen(false);
    onClose();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setEmailTouched(true);
    if (!canSubmit) return;
    clearAttachment();
    setEmail('');
    setEmailTouched(false);
    setFileError(null);
    setMessage('');
    onSent();
  };

  return (
    <Dialog
      className="service-dialog"
      label="Поддержка"
      onClose={handleClose}
      open={open}
    >
      <button
        aria-label="Закрыть"
        className="dialog-close"
        onClick={handleClose}
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
        <label htmlFor="support-email">Почта для ответа</label>
        <input
          aria-describedby="support-email-error"
          aria-invalid={emailError ? 'true' : 'false'}
          autoComplete="email"
          className={emailError ? 'is-invalid' : undefined}
          id="support-email"
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => setEmailTouched(true)}
          placeholder="name@example.ru"
          required
          type="email"
          value={email}
        />
        <small
          className={`support-field-message${emailError ? ' is-error' : ''}`}
          id="support-email-error"
          role={emailError ? 'alert' : undefined}
        >
          {emailError ?? 'На эту почту придёт ответ службы поддержки'}
        </small>
        <label htmlFor="support-message">Сообщение</label>
        <textarea
          id="support-message"
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Чем мы можем помочь?"
          rows={4}
          value={message}
        />
        <div className="support-attachment">
          <label className="support-attachment__button" htmlFor="support-photo">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
            {attachment ? 'Заменить фото' : 'Приложить фото'}
          </label>
          <input
            accept="image/jpeg,image/png,image/webp"
            id="support-photo"
            onChange={(event) => {
              const file = event.target.files?.[0];
              event.target.value = '';
              if (!file) return;

              if (!file.type.startsWith('image/')) {
                setFileError('Можно приложить только изображение.');
                return;
              }

              if (file.size > 10 * 1024 * 1024) {
                setFileError('Размер изображения не должен превышать 10 МБ.');
                return;
              }

              setAttachment(file);
              setAttachmentUrl(URL.createObjectURL(file));
              setFileError(null);
            }}
            type="file"
          />
          {attachment ? (
            <span className="support-attachment__file">
              <button
                aria-label={`Просмотреть вложение ${attachment.name}`}
                className="support-attachment__thumbnail"
                onClick={() => setPreviewOpen(true)}
                type="button"
              >
                {attachmentUrl ? <img alt="" src={attachmentUrl} /> : null}
              </button>
              <span className="support-attachment__name">
                <strong>{attachment.name}</strong>
                <small>Нажмите на фото для просмотра</small>
              </span>
              <button
                aria-label={`Удалить вложение ${attachment.name}`}
                className="support-attachment__remove"
                onClick={clearAttachment}
                type="button"
              >
                ×
              </button>
            </span>
          ) : null}
          {fileError ? (
            <small className="support-attachment__error" role="alert">
              {fileError}
            </small>
          ) : null}
        </div>
        <Button disabled={!canSubmit} type="submit">
          Отправить
        </Button>
      </form>
      {previewOpen && attachmentUrl ? (
        <div
          aria-label={`Просмотр вложения ${attachment?.name ?? ''}`}
          aria-modal="true"
          className="support-photo-preview"
          role="dialog"
        >
          <button
            aria-label="Закрыть просмотр фото"
            className="support-photo-preview__backdrop"
            onClick={() => setPreviewOpen(false)}
            type="button"
          />
          <div className="support-photo-preview__content">
            <button
              aria-label="Закрыть просмотр фото"
              className="support-photo-preview__close"
              onClick={() => setPreviewOpen(false)}
              type="button"
            >
              ×
            </button>
            <img alt={attachment?.name ?? 'Вложение'} src={attachmentUrl} />
          </div>
        </div>
      ) : null}
    </Dialog>
  );
}

export function HistoryDialog({
  onClose,
  onRepeat,
  open,
  orders,
}: {
  onClose: () => void;
  onRepeat: (order: OrderHistoryItem) => void;
  open: boolean;
  orders: OrderHistoryItem[];
}) {
  return (
    <Dialog
      className="service-dialog"
      label="История заказов"
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
      <span className="service-dialog__emoji" aria-hidden="true">
        📦
      </span>
      <span className="section-kicker">Ваши покупки</span>
      <h2>История заказов</h2>
      {orders.length === 0 ? (
        <div className="history-empty">
          <p>Завершённых заказов пока нет.</p>
          <Button onClick={onClose}>Собрать первый заказ</Button>
        </div>
      ) : (
        <ul className="order-history">
          {orders.map((order) => (
            <li key={order.number}>
              <div className="order-history__heading">
                <span>
                  <strong>{order.number}</strong>
                  <small>
                    {new Intl.DateTimeFormat('ru-RU', {
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      month: 'long',
                    }).format(new Date(order.createdAt))}
                  </small>
                </span>
                <b>{formatMoney(order.totalKopecks)}</b>
              </div>
              <p>
                {order.itemCount} товаров · <span>Заказ оформлен</span>
              </p>
              <Button onClick={() => onRepeat(order)} variant="secondary">
                Повторить заказ
              </Button>
            </li>
          ))}
        </ul>
      )}
    </Dialog>
  );
}

export type OrderHistoryItem = {
  cart: Record<string, number>;
  createdAt: string;
  itemCount: number;
  number: string;
  totalKopecks: number;
};

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
    <Dialog
      className="success-dialog"
      label="Заказ оформлен"
      onClose={onClose}
      open={open}
    >
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
