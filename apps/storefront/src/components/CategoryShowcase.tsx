import type { ProductCategory } from '@korzinka/contracts';
import type { CSSProperties } from 'react';

import { catalogCategories } from '../features/catalog/categories';

const showcaseCategories = catalogCategories.filter(
  (category): category is { id: ProductCategory; label: string } =>
    category.id !== 'all',
);

const categoryTones = [
  '#f5d7b8',
  '#cfe8b4',
  '#cfe3f2',
  '#f4c9c7',
  '#f7dfa3',
  '#e7c9bc',
  '#f3d2a7',
  '#f2dfb7',
  '#e5cae9',
  '#f3c5cf',
  '#d9e7f5',
  '#cce5ed',
  '#d5ece3',
  '#ead5c2',
  '#efe0b5',
];

type CategoryShowcaseProps = {
  activeCategory: ProductCategory | 'all';
  onSelect: (category: ProductCategory | 'all') => void;
};

export function CategoryShowcase({
  activeCategory,
  onSelect,
}: CategoryShowcaseProps) {
  return (
    <section aria-labelledby="showcase-title" className="category-showcase">
      <h1 id="showcase-title">Очень вкусные продукты</h1>
      <div className="category-showcase__grid">
        {showcaseCategories.map((category, index) => (
          <button
            aria-pressed={activeCategory === category.id}
            className={activeCategory === category.id ? 'is-active' : ''}
            key={category.id}
            onClick={() => onSelect(category.id)}
            style={
              {
                '--category-tone': categoryTones[index],
                '--category-photo': `url('/catalog/categories/${category.id}.png')`,
              } as CSSProperties
            }
            type="button"
          >
            <span aria-hidden="true" className="category-showcase__visual">
              <span className="category-showcase__photo" />
            </span>
            <span className="category-showcase__label">{category.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
