import type { Product, ProductCategory } from '@korzinka/contracts';
import { Button, ProductCard } from '@korzinka/ui';

import { catalogCategories } from '../features/catalog/categories';
import { useProducts } from '../features/catalog/useProducts';

type CatalogProps = {
  category: ProductCategory | 'all';
  cart: Record<string, number>;
  onCategoryChange: (category: ProductCategory | 'all') => void;
  onChangeQuantity: (productId: string, delta: number) => void;
  onOpenProduct: (product: Product) => void;
  onQueryChange: (query: string) => void;
  query: string;
};

export function Catalog({
  category,
  cart,
  onCategoryChange,
  onChangeQuantity,
  onOpenProduct,
  onQueryChange,
  query,
}: CatalogProps) {
  const { error, isLoading, products, reload } = useProducts(category, query);

  return (
    <section className="catalog shell" id="catalog">
      <div className="catalog__heading">
        <div>
          <span className="section-kicker">
            {query.trim() ? 'Результаты поиска' : 'Всё нужное рядом'}
          </span>
          <h2>
            {query.trim()
              ? `По запросу «${query.trim()}»`
              : 'Что положим в корзинку?'}
          </h2>
        </div>
      </div>

      <div aria-label="Категории товаров" className="category-list" role="list">
        {catalogCategories.map((item) => (
          <button
            aria-pressed={category === item.id}
            className={category === item.id ? 'is-active' : ''}
            key={item.id}
            onClick={() => onCategoryChange(item.id)}
            role="listitem"
            type="button"
          >
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
              onQueryChange('');
              onCategoryChange('all');
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
