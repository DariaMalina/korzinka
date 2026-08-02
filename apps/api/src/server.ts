import cors from '@fastify/cors';
import {
  coordinatesSchema,
  productCategorySchema,
  productFixtures,
} from '@korzinka/contracts';
import { config } from 'dotenv';
import Fastify from 'fastify';

import {
  geocodeAddress,
  GeocoderAccessError,
  GeocoderConfigurationError,
  GeocoderNotFoundError,
  reverseGeocode,
} from './services/yandexGeocoder';

config({ path: new URL('../../../.env.local', import.meta.url), quiet: true });
config({ path: new URL('../../../.env', import.meta.url), quiet: true });

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: true,
});

app.get('/health', async () => ({ status: 'ok' }));

app.get<{
  Querystring: { query?: string };
}>('/api/geocode/forward', async (request, reply) => {
  const query = request.query.query?.trim();

  if (!query) return reply.code(400).send({ message: 'Query is required' });

  try {
    return await geocodeAddress(query);
  } catch (error) {
    if (error instanceof GeocoderAccessError) {
      return reply.code(403).send({ message: error.message });
    }
    if (error instanceof GeocoderConfigurationError) {
      return reply.code(503).send({ message: error.message });
    }
    if (error instanceof GeocoderNotFoundError) {
      return reply.code(404).send({ message: error.message });
    }
    request.log.error(error);
    return reply.code(502).send({ message: 'Geocoder is unavailable' });
  }
});

app.get<{
  Querystring: { latitude?: string; longitude?: string };
}>('/api/geocode/reverse', async (request, reply) => {
  const coordinates = coordinatesSchema.safeParse([
    Number(request.query.longitude),
    Number(request.query.latitude),
  ]);

  if (!coordinates.success) {
    return reply.code(400).send({ message: 'Valid coordinates are required' });
  }

  try {
    return await reverseGeocode(coordinates.data);
  } catch (error) {
    if (error instanceof GeocoderAccessError) {
      return reply.code(403).send({ message: error.message });
    }
    if (error instanceof GeocoderConfigurationError) {
      return reply.code(503).send({ message: error.message });
    }
    if (error instanceof GeocoderNotFoundError) {
      return reply.code(404).send({ message: error.message });
    }
    request.log.error(error);
    return reply.code(502).send({ message: 'Geocoder is unavailable' });
  }
});

app.get<{
  Querystring: { category?: string; q?: string };
}>('/api/products', async (request) => {
  const query = request.query.q?.trim().toLocaleLowerCase('ru') ?? '';
  const categoryResult = productCategorySchema.safeParse(
    request.query.category,
  );

  const items = productFixtures.filter((product) => {
    const matchesCategory = categoryResult.success
      ? product.category === categoryResult.data
      : true;
    const matchesQuery = query
      ? `${product.name} ${product.description}`
          .toLocaleLowerCase('ru')
          .includes(query)
      : true;

    return matchesCategory && matchesQuery;
  });

  return { items };
});

app.get<{
  Params: { productId: string };
}>('/api/products/:productId', async (request, reply) => {
  const product = productFixtures.find(
    ({ id }) => id === request.params.productId,
  );

  if (!product) {
    return reply.code(404).send({ message: 'Product not found' });
  }

  return product;
});

const port = Number(process.env.API_PORT ?? 3001);

await app.listen({ host: '0.0.0.0', port });
