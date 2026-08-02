import { productCategorySchema, productFixtures } from '@korzinka/contracts';
import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.get('*/api/products', async ({ request }) => {
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
  http.get('*/api/geocode/forward', ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query')?.trim();

    if (!query) {
      return HttpResponse.json(
        { message: 'Query is required' },
        { status: 400 },
      );
    }

    return HttpResponse.json({
      coordinates: [37.617635, 55.755814],
      formattedAddress: query,
    });
  }),
  http.get('*/api/geocode/reverse', ({ request }) => {
    const url = new URL(request.url);
    const longitude = Number(url.searchParams.get('longitude'));
    const latitude = Number(url.searchParams.get('latitude'));

    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
      return HttpResponse.json(
        { message: 'Valid coordinates are required' },
        { status: 400 },
      );
    }

    return HttpResponse.json({
      coordinates: [longitude, latitude],
      formattedAddress: `Точка на карте: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
    });
  }),
];
