import {
  productListResponseSchema,
  type ProductCategory,
} from '@korzinka/contracts';

const apiUrl = import.meta.env.VITE_API_URL ?? '/api';

export type ProductFilters = {
  category: ProductCategory | 'all';
  query: string;
};

export async function fetchProducts(
  filters: ProductFilters,
  signal?: AbortSignal,
) {
  const search = new URLSearchParams();

  if (filters.category !== 'all') search.set('category', filters.category);
  if (filters.query.trim()) search.set('q', filters.query.trim());

  const response = await fetch(`${apiUrl}/products?${search.toString()}`, {
    signal,
  });

  if (!response.ok) throw new Error('Не удалось загрузить продукты');

  return productListResponseSchema.parse(await response.json()).items;
}
