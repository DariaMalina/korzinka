import type { Product } from '@korzinka/contracts';
import { Button, Dialog, formatMoney, ProductImage } from '@korzinka/ui';

type ProductDialogProps = {
  onChangeQuantity: (productId: string, delta: number) => void;
  onClose: () => void;
  product: Product | null;
  quantity: number;
};

export function ProductDialog({
  onChangeQuantity,
  onClose,
  product,
  quantity,
}: ProductDialogProps) {
  return (
    <Dialog
      className="product-dialog"
      label={product ? product.name : 'Карточка товара'}
      onClose={onClose}
      open={Boolean(product)}
    >
      {product ? (
        <div className="product-dialog__layout">
          <button
            aria-label="Закрыть карточку товара"
            className="dialog-close"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
          <div className="product-dialog__visual">
            {product.badge ? (
              <span className="product-dialog__badge">{product.badge}</span>
            ) : null}
            <ProductImage product={product} />
          </div>
          <div className="product-dialog__content">
            <span className="section-kicker">{product.categoryLabel}</span>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <span className="product-dialog__unit">
              Упаковка: {product.unit}
            </span>
            <div className="product-dialog__price">
              <strong>{formatMoney(product.priceKopecks)}</strong>
              {product.oldPriceKopecks ? (
                <del>{formatMoney(product.oldPriceKopecks)}</del>
              ) : null}
            </div>
            {quantity === 0 ? (
              <Button onClick={() => onChangeQuantity(product.id, 1)} size="lg">
                Добавить в корзинку
              </Button>
            ) : (
              <div aria-label="Количество товара" className="dialog-quantity">
                <button
                  aria-label="Уменьшить количество"
                  onClick={() => onChangeQuantity(product.id, -1)}
                  type="button"
                >
                  −
                </button>
                <strong>{quantity}</strong>
                <button
                  aria-label="Увеличить количество"
                  onClick={() => onChangeQuantity(product.id, 1)}
                  type="button"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </Dialog>
  );
}
