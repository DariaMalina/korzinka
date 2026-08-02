import { useState } from 'react';
import { productFixtures } from '@korzinka/contracts';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProductCard } from './ProductCard';

const product = productFixtures[0]!;

function ProductCardExample() {
  const [quantity, setQuantity] = useState(0);

  return (
    <div style={{ width: 300 }}>
      <ProductCard
        onAdd={() => setQuantity(1)}
        onDecrement={() => setQuantity((value) => Math.max(0, value - 1))}
        onIncrement={() => setQuantity((value) => value + 1)}
        onOpen={() => undefined}
        product={product}
        quantity={quantity}
      />
    </div>
  );
}

const meta = {
  title: 'Commerce/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  args: {
    onAdd: () => undefined,
    onDecrement: () => undefined,
    onIncrement: () => undefined,
    onOpen: () => undefined,
    product,
    quantity: 0,
  },
  render: ProductCardExample,
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
