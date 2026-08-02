import { productCategorySchema, productFixtures } from '@korzinka/contracts';
import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/products', async ({ request }) => {
    await delay(180);

    const url = new URL(request.url);
    const query = (url.searchParams.get('q') ?? '')
      .trim()
      .toLocaleLowerCase('ru');
    const category = productCategorySchema.safeParse(
      url.searchParams.get('category'),
    );

    const items = productFixtures.filter((product) => {
      const matchesCategory = category.success
        ? product.category === category.data
        : true;
      const matchesQuery = query
        ? `${product.name} ${product.description}`
            .toLocaleLowerCase('ru')
            .includes(query)
        : true;

      return matchesCategory && matchesQuery;
    });

    return HttpResponse.json({ items });
  }),
];
