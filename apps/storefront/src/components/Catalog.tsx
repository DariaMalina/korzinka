import type { Product, ProductCategory } from '@korzinka/contracts';
import { Button, ProductCard, SearchField } from '@korzinka/ui';
import { useState } from 'react';

import { useProducts } from '../features/catalog/useProducts';

const categories: Array<{
  icon: string;
  id: ProductCategory | 'all';
  label: string;
}> = [
  { icon: '✦', id: 'all', label: 'Все' },
  { icon: '🥬', id: 'vegetables', label: 'Овощи' },
  { icon: '🍊', id: 'fruits', label: 'Фрукты' },
  { icon: '🥛', id: 'dairy', label: 'Молочное' },
  { icon: '🥐', id: 'bakery', label: 'Выпечка' },
  { icon: '🧃', id: 'drinks', label: 'Напитки' },
];

type CatalogProps = {
  cart: Record<string, number>;
  onChangeQuantity: (productId: string, delta: number) => void;
  onOpenProduct: (product: Product) => void;
};

export function Catalog({
  cart,
  onChangeQuantity,
  onOpenProduct,
}: CatalogProps) {
  const [category, setCategory] = useState<ProductCategory | 'all'>('all');
  const [query, setQuery] = useState('');
  const { error, isLoading, products, reload } = useProducts(category, query);

  return (
    <section className="catalog shell" id="catalog">
      <div className="catalog__heading">
        <div>
          <span className="section-kicker">Всё нужное рядом</span>
          <h2>Что положим в корзинку?</h2>
        </div>
        <SearchField
          label="Поиск по каталогу"
          onChange={(event) => setQuery(event.target.value)}
          onClear={() => setQuery('')}
          placeholder="Найти любимое"
          value={query}
        />
      </div>

      <div aria-label="Категории товаров" className="category-list" role="list">
        {categories.map((item) => (
          <button
            aria-pressed={category === item.id}
            className={category === item.id ? 'is-active' : ''}
            key={item.id}
            onClick={() => setCategory(item.id)}
            role="listitem"
            type="button"
          >
            <span aria-hidden="true">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div aria-live="polite" className="catalog-state" role="status">
          <span className="catalog-loader" />
          Загружаем свежее…
        </div>
      ) : null}

      {!isLoading && error ? (
        <div className="catalog-state" role="alert">
          <span aria-hidden="true">🙈</span>
          <h3>Каталог не загрузился</h3>
          <p>{error}</p>
          <Button onClick={reload}>Попробовать ещё раз</Button>
        </div>
      ) : null}

      {!isLoading && !error && products.length === 0 ? (
        <div className="catalog-state">
          <span aria-hidden="true">🧺</span>
          <h3>Ничего не нашлось</h3>
          <p>Проверьте запрос или выберите другую категорию.</p>
          <Button
            onClick={() => {
              setQuery('');
              setCategory('all');
            }}
            variant="secondary"
          >
            Сбросить фильтры
          </Button>
        </div>
      ) : null}

      {!isLoading && !error && products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              onAdd={() => onChangeQuantity(product.id, 1)}
              onDecrement={() => onChangeQuantity(product.id, -1)}
              onIncrement={() => onChangeQuantity(product.id, 1)}
              onOpen={() => onOpenProduct(product)}
              product={product}
              quantity={cart[product.id] ?? 0}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}
