import cors from '@fastify/cors';
import { productFixtures, productCategorySchema } from '@korzinka/contracts';
import Fastify from 'fastify';

const app = Fastify({ logger: true });

await app.register(cors, {
  origin: true,
});

app.get('/health', async () => ({ status: 'ok' }));

app.get<{
  Querystring: { category?: string; q?: string };
}>('/api/products', async (request) => {
  const query = request.query.q?.trim().toLocaleLowerCase('ru') ?? '';
  const categoryResult = productCategorySchema.safeParse(request.query.category);

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
