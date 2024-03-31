import { z } from 'zod';

export const PackageValidationSchema = z.object({
  body: z.object({
    packageName: z.string({
      required_error: 'Package name is required.',
      invalid_type_error: 'Package name must be a string.',
    }),
    packageDetails: z.array(z.string(), {
      required_error: 'Package details are required.',
      invalid_type_error: 'Package details must be an array of strings.',
    }),
    price: z
      .number({
        required_error: 'Price is required.',
        invalid_type_error: 'Price must be a number.',
      })
      .nonnegative('Price must not be negative.'),
    discount: z
      .number({
        required_error: 'Discount is required.',
        invalid_type_error: 'Discount must be a number.',
      })
      .nonnegative('Discount must not be negative.')
      .optional(),
  }),
});
