import { z } from 'zod';

export const coordinatesSchema = z.tuple([
  z.number().min(-180).max(180),
  z.number().min(-90).max(90),
]);

export const addressLocationSchema = z.object({
  coordinates: coordinatesSchema,
  formattedAddress: z.string().min(1),
});

export type AddressLocation = z.infer<typeof addressLocationSchema>;
export type Coordinates = z.infer<typeof coordinatesSchema>;
