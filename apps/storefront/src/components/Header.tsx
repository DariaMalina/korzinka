import type { Product } from '@korzinka/contracts';
import { formatMoney, ProductImage, SearchField } from '@korzinka/ui';
import { useState, type FocusEvent } from 'react';

import { BrandLogo } from './BrandLogo';

type HeaderProps = {
  address: string;
  cartItemCount: number;
  onAddress: () => void;
  onAccount: () => void;
  onCart: () => void;
  onOpenProduct: (product: Product) => void;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
  query: string;
  suggestions: Product[];
};

export function Header({
  address,
  cartItemCount,
  onAddress,
  onAccount,
  onCart,
  onOpenProduct,
  onSearchChange,
  onSearchSubmit,
  query,
  suggestions,
}: HeaderProps) {
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const hasQuery = query.trim().length > 1;

  const handleBlur = (event: FocusEvent<HTMLFormElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setSuggestionsOpen(false);
    }
  };

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <a aria-label="Корзинка — на главную" className="logo" href="#top">
          <BrandLogo />
        </a>

        <form
          className="header-search"
          onBlur={handleBlur}
          onFocus={() => {
            if (hasQuery) setSuggestionsOpen(true);
          }}
          onSubmit={(event) => {
            event.preventDefault();
            setSuggestionsOpen(false);
            onSearchSubmit();
          }}
          role="search"
        >
          <SearchField
            label="Поиск товаров"
            onChange={(event) => {
              onSearchChange(event.target.value);
              setSuggestionsOpen(true);
            }}
            onClear={() => {
              onSearchChange('');
              setSuggestionsOpen(false);
            }}
            placeholder="Найти продукты"
            value={query}
          />

          {suggestionsOpen && hasQuery ? (
            <div className="search-suggestions">
              {suggestions.length > 0 ? (
                <>
                  <ul aria-label="Подсказки поиска">
                    {suggestions.map((product) => (
                      <li key={product.id}>
                        <button
                          onClick={() => {
                            setSuggestionsOpen(false);
                            onOpenProduct(product);
                          }}
                          type="button"
                        >
                          <ProductImage
                            className="search-suggestions__visual"
                            product={product}
                          />
                          <span className="search-suggestions__copy">
                            <strong>{product.name}</strong>
                            <small>{product.unit}</small>
                          </span>
                          <b>{formatMoney(product.priceKopecks)}</b>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button className="search-suggestions__all" type="submit">
                    Показать все результаты
                    <span aria-hidden="true">→</span>
                  </button>
                </>
              ) : (
                <p className="search-suggestions__empty">
                  По запросу «{query.trim()}» ничего не нашли
                </p>
              )}
            </div>
          ) : null}
        </form>

        <div className="site-header__actions">
          <button className="address-button" onClick={onAddress} type="button">
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="m20.4 3.6-7.7 17.1a.8.8 0 0 1-1.5-.1l-2.3-7.2-7.2-2.3a.8.8 0 0 1-.1-1.5l17.1-7.7a1.3 1.3 0 0 1 1.7 1.7Z" />
            </svg>
            <span>{address}</span>
          </button>
          <button
            aria-label={
              cartItemCount > 0
                ? `Корзина, товаров: ${cartItemCount}`
                : 'Корзина'
            }
            className="cart-button"
            onClick={onCart}
            type="button"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M3.5 5h2l1.7 9.1a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.6L20 8H6.1" />
              <circle cx="9.5" cy="19" r="1.2" />
              <circle cx="17" cy="19" r="1.2" />
            </svg>
            {cartItemCount > 0 ? (
              <span className="cart-button__count">{cartItemCount}</span>
            ) : null}
          </button>
          <button
            aria-label="Личный кабинет"
            className="account-button"
            onClick={onAccount}
            type="button"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M12 12a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5Z" />
              <path d="M4.5 20.5c.65-4.1 3.15-6.15 7.5-6.15s6.85 2.05 7.5 6.15" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
