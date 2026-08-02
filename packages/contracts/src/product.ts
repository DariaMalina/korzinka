import { z } from 'zod';

export const productCategorySchema = z.enum([
  'vegetables',
  'fruits',
  'dairy',
  'bakery',
  'drinks',
]);

export const productAccentSchema = z.enum([
  'tomato',
  'avocado',
  'banana',
  'milk',
  'pastry',
  'berry',
  'bread',
  'orange',
  'juice',
  'cucumber',
  'kombucha',
  'yogurt',
]);

export const productSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: productCategorySchema,
  categoryLabel: z.string().min(1),
  description: z.string().min(1),
  priceKopecks: z.number().int().nonnegative(),
  oldPriceKopecks: z.number().int().positive().nullable(),
  unit: z.string().min(1),
  badge: z.string().min(1).nullable(),
  emoji: z.string().min(1),
  accent: productAccentSchema,
});

export const productListResponseSchema = z.object({
  items: z.array(productSchema),
});

export type Product = z.infer<typeof productSchema>;
export type ProductCategory = z.infer<typeof productCategorySchema>;
export type ProductListResponse = z.infer<typeof productListResponseSchema>;
