import { describe, expect, it } from 'vitest';

import { productFixtures } from './fixtures';
import { productListResponseSchema } from './product';

describe('product contract', () => {
  it('validates the deterministic catalog fixtures', () => {
    const result = productListResponseSchema.safeParse({
      items: productFixtures,
    });

    expect(result.success).toBe(true);
    expect(productFixtures).toHaveLength(64);
  });
});
