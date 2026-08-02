import type { Product } from '@korzinka/contracts';

export type Cart = Record<string, number>;

export const FREE_DELIVERY_THRESHOLD = 90_000;
export const DELIVERY_PRICE = 9_900;

export function changeCartQuantity(
  cart: Cart,
  productId: string,
  delta: number,
): Cart {
  const nextQuantity = Math.max(0, (cart[productId] ?? 0) + delta);
  const nextCart = { ...cart };

  if (nextQuantity === 0) delete nextCart[productId];
  else nextCart[productId] = nextQuantity;

  return nextCart;
}

export function getCartSummary(cart: Cart, products: Product[]) {
  const lines = products.flatMap((product) => {
    const quantity = cart[product.id] ?? 0;
    return quantity > 0 ? [{ product, quantity }] : [];
  });
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotalKopecks = lines.reduce(
    (sum, line) => sum + line.product.priceKopecks * line.quantity,
    0,
  );
  const deliveryKopecks =
    subtotalKopecks === 0 || subtotalKopecks >= FREE_DELIVERY_THRESHOLD
      ? 0
      : DELIVERY_PRICE;

  return {
    deliveryKopecks,
    itemCount,
    lines,
    subtotalKopecks,
    totalKopecks: subtotalKopecks + deliveryKopecks,
  };
}
