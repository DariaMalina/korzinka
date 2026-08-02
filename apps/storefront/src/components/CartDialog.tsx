import type { Product } from '@korzinka/contracts';
import { Button, Dialog, formatMoney } from '@korzinka/ui';

import {
  FREE_DELIVERY_THRESHOLD,
  type getCartSummary,
} from '../features/cart/cart';

type CartSummary = ReturnType<typeof getCartSummary>;
type ReplacementPreference = 'call' | 'remove' | 'similar';

type CartDialogProps = {
  onChangeQuantity: (productId: string, delta: number) => void;
  onCheckout: () => void;
  onClose: () => void;
  onContinueShopping: () => void;
  onReplacementChange: (preference: ReplacementPreference) => void;
  open: boolean;
  replacement: ReplacementPreference;
  summary: CartSummary;
};

const replacementOptions: Array<{
  description: string;
  label: string;
  value: ReplacementPreference;
}> = [
  {
    description: 'Подберём товар той же категории и цены',
    label: 'Заменить на похожий',
    value: 'similar',
  },
  {
    description: 'Уточним замену во время сборки',
    label: 'Позвонить мне',
    value: 'call',
  },
  {
    description: 'Вернём стоимость отсутствующего товара',
    label: 'Убрать из заказа',
    value: 'remove',
  },
];

function CartLine({
  onChangeQuantity,
  product,
  quantity,
}: {
  onChangeQuantity: (productId: string, delta: number) => void;
  product: Product;
  quantity: number;
}) {
  return (
    <li className="cart-line">
      <span
        aria-hidden="true"
        className={`cart-line__visual ui-product-card__image--${product.accent}`}
      >
        {product.emoji}
      </span>
      <div className="cart-line__info">
        <strong>{product.name}</strong>
        <span>{product.unit}</span>
        <b>{formatMoney(product.priceKopecks * quantity)}</b>
      </div>
      <div aria-label={`Количество ${product.name}`} className="cart-line__quantity">
        <button
          aria-label={`Убрать один ${product.name}`}
          onClick={() => onChangeQuantity(product.id, -1)}
          type="button"
        >
          −
        </button>
        <strong>{quantity}</strong>
        <button
          aria-label={`Добавить ещё ${product.name}`}
          onClick={() => onChangeQuantity(product.id, 1)}
          type="button"
        >
          +
        </button>
      </div>
    </li>
  );
}

export function CartDialog({
  onChangeQuantity,
  onCheckout,
  onClose,
  onContinueShopping,
  onReplacementChange,
  open,
  replacement,
  summary,
}: CartDialogProps) {
  const amountToFreeDelivery = Math.max(
    0,
    FREE_DELIVERY_THRESHOLD - summary.subtotalKopecks,
  );
  const progress = Math.min(
    100,
    (summary.subtotalKopecks / FREE_DELIVERY_THRESHOLD) * 100,
  );

  return (
    <Dialog className="cart-dialog" label="Корзина" onClose={onClose} open={open}>
      <div className="cart-dialog__header">
        <div>
          <span className="section-kicker">Ваш заказ</span>
          <h2>Корзинка</h2>
        </div>
        <button
          aria-label="Закрыть корзину"
          className="dialog-close dialog-close--static"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
      </div>

      {summary.lines.length === 0 ? (
        <div className="empty-cart">
          <span aria-hidden="true">🧺</span>
          <h3>Пока пусто</h3>
          <p>Добавьте продукты — они появятся здесь.</p>
          <Button onClick={onContinueShopping}>Перейти в каталог</Button>
        </div>
      ) : (
        <>
          <div className="delivery-progress">
            <div>
              <span aria-hidden="true">🚲</span>
              <p>
                {amountToFreeDelivery > 0 ? (
                  <>
                    Ещё <strong>{formatMoney(amountToFreeDelivery)}</strong> до
                    бесплатной доставки
                  </>
                ) : (
                  <strong>Доставка будет бесплатной</strong>
                )}
              </p>
            </div>
            <span className="delivery-progress__track">
              <span style={{ width: `${progress}%` }} />
            </span>
          </div>

          <ul className="cart-lines">
            {summary.lines.map((line) => (
              <CartLine
                key={line.product.id}
                onChangeQuantity={onChangeQuantity}
                {...line}
              />
            ))}
          </ul>

          <fieldset className="replacement-settings">
            <legend>Если товара не окажется</legend>
            {replacementOptions.map((option) => (
              <label key={option.value}>
                <input
                  checked={replacement === option.value}
                  name="replacement"
                  onChange={() => onReplacementChange(option.value)}
                  type="radio"
                />
                <span>
                  <strong>{option.label}</strong>
                  <small>{option.description}</small>
                </span>
              </label>
            ))}
          </fieldset>

          <div className="cart-summary">
            <p>
              <span>Товары</span>
              <strong>{formatMoney(summary.subtotalKopecks)}</strong>
            </p>
            <p>
              <span>Доставка</span>
              <strong>
                {summary.deliveryKopecks > 0
                  ? formatMoney(summary.deliveryKopecks)
                  : 'Бесплатно'}
              </strong>
            </p>
            <p className="cart-summary__total">
              <span>Итого</span>
              <strong>{formatMoney(summary.totalKopecks)}</strong>
            </p>
            <Button onClick={onCheckout} size="lg">
              Оформить заказ
            </Button>
            <small>Это демо: оплата не списывается</small>
          </div>
        </>
      )}
    </Dialog>
  );
}

export type { ReplacementPreference };
