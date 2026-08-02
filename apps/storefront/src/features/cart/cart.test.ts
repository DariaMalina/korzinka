import { productFixtures } from '@korzinka/contracts';
import { describe, expect, it } from 'vitest';

import {
  changeCartQuantity,
  DELIVERY_PRICE,
  FREE_DELIVERY_THRESHOLD,
  getCartSummary,
} from './cart';

describe('cart model', () => {
  it('adds and removes products without negative quantities', () => {
    const added = changeCartQuantity({}, 'pink-tomatoes', 1);
    const removed = changeCartQuantity(added, 'pink-tomatoes', -2);

    expect(added).toEqual({ 'pink-tomatoes': 1 });
    expect(removed).toEqual({});
  });

  it('calculates delivery and total', () => {
    const result = getCartSummary({ 'pink-tomatoes': 1 }, productFixtures);

    expect(result.deliveryKopecks).toBe(DELIVERY_PRICE);
    expect(result.totalKopecks).toBe(27_900 + DELIVERY_PRICE);
  });

  it('makes delivery free after the threshold', () => {
    const result = getCartSummary({ 'garden-strawberry': 3 }, productFixtures);

    expect(result.subtotalKopecks).toBeGreaterThan(FREE_DELIVERY_THRESHOLD);
    expect(result.deliveryKopecks).toBe(0);
  });
});
