import { productFixtures, type Product } from '@korzinka/contracts';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Header } from './Header';

const milkProduct = productFixtures.find(({ id }) => id === 'farm-milk')!;

afterEach(cleanup);

function SearchHarness({
  onOpenProduct,
  onSearchSubmit,
}: {
  onOpenProduct: (product: Product) => void;
  onSearchSubmit: () => void;
}) {
  const [query, setQuery] = useState('');
  const suggestions = query ? [milkProduct] : [];

  return (
    <Header
      address="Выбрать адрес"
      cartItemCount={0}
      onAccount={vi.fn()}
      onAddress={vi.fn()}
      onCart={vi.fn()}
      onOpenProduct={onOpenProduct}
      onSearchChange={setQuery}
      onSearchSubmit={onSearchSubmit}
      query={query}
      suggestions={suggestions}
    />
  );
}

describe('Header', () => {
  it('shows product suggestions and opens a selected product', async () => {
    const user = userEvent.setup();
    const onOpenProduct = vi.fn<(product: Product) => void>();

    render(
      <SearchHarness onOpenProduct={onOpenProduct} onSearchSubmit={vi.fn()} />,
    );

    await user.type(screen.getByRole('searchbox'), 'молоко');
    await user.click(screen.getByRole('button', { name: /Молоко фермерское/ }));

    expect(onOpenProduct).toHaveBeenCalledWith(milkProduct);
  });

  it('submits search from the keyboard', async () => {
    const user = userEvent.setup();
    const onSearchSubmit = vi.fn<() => void>();

    render(
      <SearchHarness onOpenProduct={vi.fn()} onSearchSubmit={onSearchSubmit} />,
    );

    await user.type(screen.getByRole('searchbox'), 'хлеб{Enter}');

    expect(onSearchSubmit).toHaveBeenCalledOnce();
  });
});
