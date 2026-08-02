import type { ProductCategory } from '@korzinka/contracts';

import { catalogCategories } from '../features/catalog/categories';

type CatalogSidebarProps = {
  activeCategory: ProductCategory | 'all';
  onSelect: (category: ProductCategory | 'all') => void;
};

export function CatalogSidebar({
  activeCategory,
  onSelect,
}: CatalogSidebarProps) {
  return (
    <aside className="catalog-sidebar">
      <nav aria-label="Каталог товаров">
        <h2>Каталог</h2>
        <ul>
          {catalogCategories.map((category) => (
            <li key={category.id}>
              <button
                aria-current={
                  activeCategory === category.id ? 'page' : undefined
                }
                className={
                  activeCategory === category.id ? 'is-active' : undefined
                }
                onClick={() => onSelect(category.id)}
                type="button"
              >
                {category.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
