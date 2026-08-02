import type { Product } from '@korzinka/contracts';

import { formatMoney } from './formatMoney';

export type ProductCardProps = {
  onAdd: () => void;
  onDecrement: () => void;
  onIncrement: () => void;
  onOpen: () => void;
  product: Product;
  quantity: number;
};

export function ProductCard({
  onAdd,
  onDecrement,
  onIncrement,
  onOpen,
  product,
  quantity,
}: ProductCardProps) {
  return (
    <article className="ui-product-card">
      <button
        aria-label={`Подробнее: ${product.name}`}
        className={`ui-product-card__image ui-product-card__image--${product.accent}`}
        onClick={onOpen}
        type="button"
      >
        {product.badge ? (
          <span className="ui-product-card__badge">{product.badge}</span>
        ) : null}
        <span aria-hidden="true" className="ui-product-card__emoji">
          {product.emoji}
        </span>
      </button>
      <div className="ui-product-card__content">
        <div className="ui-product-card__price">
          <strong>{formatMoney(product.priceKopecks)}</strong>
          {product.oldPriceKopecks ? (
            <del>{formatMoney(product.oldPriceKopecks)}</del>
          ) : null}
        </div>
        <button className="ui-product-card__name" onClick={onOpen} type="button">
          {product.name}
        </button>
        <span className="ui-product-card__unit">{product.unit}</span>
        {quantity === 0 ? (
          <button className="ui-product-card__add" onClick={onAdd} type="button">
            <span>В корзинку</span>
            <span aria-hidden="true">+</span>
          </button>
        ) : (
          <div
            aria-label={`Количество товара ${product.name}`}
            className="ui-product-card__quantity"
            role="group"
          >
            <button
              aria-label={`Убрать один ${product.name}`}
              onClick={onDecrement}
              type="button"
            >
              −
            </button>
            <strong>{quantity}</strong>
            <button
              aria-label={`Добавить ещё ${product.name}`}
              onClick={onIncrement}
              type="button"
            >
              +
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
