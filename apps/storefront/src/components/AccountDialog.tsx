import { Dialog } from '@korzinka/ui';

type AccountDialogProps = {
  address: string;
  onAddress: () => void;
  onClose: () => void;
  onHistory: () => void;
  onLogout: () => void;
  onSupport: () => void;
  open: boolean;
  orderCount: number;
};

type AccountIconProps = {
  name: 'address' | 'orders' | 'support';
};

function AccountIcon({ name }: AccountIconProps) {
  if (name === 'orders') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M5 7.5 12 4l7 3.5v9L12 20l-7-3.5Z" />
        <path d="m5 7.5 7 3.5 7-3.5M12 11v9" />
      </svg>
    );
  }

  if (name === 'address') {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M18 10c0 4.5-6 10-6 10S6 14.5 6 10a6 6 0 1 1 12 0Z" />
        <circle cx="12" cy="10" r="2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 17.5 3.5 21l4.2-1.6c1.3.7 2.7 1.1 4.3 1.1 5 0 9-3.7 9-8.3S17 4 12 4s-9 3.7-9 8.2c0 2 .7 3.8 2 5.3Z" />
      <path d="M8 12h.1m3.9 0h.1m3.9 0h.1" />
    </svg>
  );
}

export function AccountDialog({
  address,
  onAddress,
  onClose,
  onHistory,
  onLogout,
  onSupport,
  open,
  orderCount,
}: AccountDialogProps) {
  return (
    <Dialog
      className="account-dialog"
      label="Личный кабинет"
      onClose={onClose}
      open={open}
    >
      <button
        aria-label="Закрыть личный кабинет"
        className="dialog-close"
        onClick={onClose}
        type="button"
      >
        ×
      </button>

      <header className="account-dialog__header">
        <span aria-hidden="true" className="account-dialog__avatar">
          Д
        </span>
        <div>
          <span className="section-kicker">Личный кабинет</span>
          <h2>Дарья</h2>
          <p>Профиль покупателя</p>
        </div>
      </header>

      <div className="account-dialog__content">
        <button className="account-menu-card" onClick={onHistory} type="button">
          <span className="account-menu-card__icon">
            <AccountIcon name="orders" />
          </span>
          <span>
            <strong>История заказов</strong>
            <small>
              {orderCount > 0 ? `Заказов: ${orderCount}` : 'Заказов пока нет'}
            </small>
          </span>
          <span aria-hidden="true" className="account-menu-card__arrow">
            →
          </span>
        </button>

        <button className="account-menu-card" onClick={onAddress} type="button">
          <span className="account-menu-card__icon">
            <AccountIcon name="address" />
          </span>
          <span>
            <strong>Адреса доставки</strong>
            <small>{address}</small>
          </span>
          <span aria-hidden="true" className="account-menu-card__arrow">
            →
          </span>
        </button>

        <button className="account-menu-card" onClick={onSupport} type="button">
          <span className="account-menu-card__icon">
            <AccountIcon name="support" />
          </span>
          <span>
            <strong>Служба поддержки</strong>
            <small>Поможем с заказом или доставкой</small>
          </span>
          <span aria-hidden="true" className="account-menu-card__arrow">
            →
          </span>
        </button>

        <button
          className="account-dialog__logout"
          onClick={onLogout}
          type="button"
        >
          Выйти из аккаунта
        </button>
      </div>
    </Dialog>
  );
}
