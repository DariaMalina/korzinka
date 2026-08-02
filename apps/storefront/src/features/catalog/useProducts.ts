import type { Product, ProductCategory } from '@korzinka/contracts';
import { useEffect, useState } from 'react';

import { fetchProducts } from './api';

export function useProducts(category: ProductCategory | 'all', query: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      setIsLoading(true);
      setError(null);

      void fetchProducts({ category, query }, controller.signal)
        .then(setProducts)
        .catch((reason: unknown) => {
          if (reason instanceof DOMException && reason.name === 'AbortError')
            return;
          setError(
            reason instanceof Error ? reason.message : 'Произошла ошибка',
          );
        })
        .finally(() => setIsLoading(false));
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [category, query, reloadKey]);

  return {
    error,
    isLoading,
    products,
    reload: () => setReloadKey((key) => key + 1),
  };
}
