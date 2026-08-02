import { z } from 'zod';

export const productCategorySchema = z.enum([
  'ready-meals',
  'produce',
  'dairy-eggs',
  'meat-fish',
  'new-products',
  'deli',
  'bakery',
  'grocery',
  'cakes',
  'confectionery',
  'frozen',
  'water-drinks',
  'chilled-drinks',
  'tea-coffee',
  'snacks',
]);

export const productImagePositionSchema = z.enum([
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right',
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
  image: z.object({
    src: z.string().min(1),
    position: productImagePositionSchema,
  }),
});

export const productListResponseSchema = z.object({
  items: z.array(productSchema),
});

export type Product = z.infer<typeof productSchema>;
export type ProductCategory = z.infer<typeof productCategorySchema>;
export type ProductImagePosition = z.infer<typeof productImagePositionSchema>;
export type ProductListResponse = z.infer<typeof productListResponseSchema>;
