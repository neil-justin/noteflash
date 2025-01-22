import { z } from 'zod';

const NewUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export { NewUserSchema };
