import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required.',
        invalid_type_error: 'Email must be a string.',
      })
      .email('Invalid email format.'),
    password: z.string({
      required_error: 'Password is required.',
      invalid_type_error: 'Password must be a string.',
    }),
  }),
});

// const loginSchema = z.object({
//   body: z.object({
//     email: z
//       .string({
//         required_error: 'Email is required.',
//         invalid_type_error: 'Email must be a string.',
//       })
//       .email('Invalid email format.'),
//     password: z.string({
//       required_error: 'Password is required.',
//       invalid_type_error: 'Password must be a string.',
//     }),
//   }),
// });

export default userValidationSchema;
