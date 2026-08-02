import type { Product } from '@korzinka/contracts';
import type { CSSProperties } from 'react';

export type ProductImageProps = {
  className?: string;
  product: Product;
};

export function ProductImage({ className = '', product }: ProductImageProps) {
  return (
    <span
      aria-hidden="true"
      className={`ui-product-image ui-product-image--${product.image.position} ${className}`}
      style={
        {
          '--product-atlas': `url('${product.image.src}')`,
        } as CSSProperties
      }
    />
  );
}
