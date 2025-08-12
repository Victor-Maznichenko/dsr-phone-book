import z from 'zod';

export const schema = z.object({
  email: z.email('This is not a valid email.'),
  password: z
    .string()
    .min(8, 'The password must contain at least 8 characters.')
    .max(15, 'The password must not be longer than 15 characters.')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[@$!%*?&#]/, 'Password must contain at least one special character'),
});
