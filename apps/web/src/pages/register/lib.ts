import z from 'zod';
import { passwordSchema } from '@/shared/lib';

export interface StepContentType {
  handlePrev: () => void;
  handleNext: () => void;
  handleComplete: () => void;
}
export const credentialsFormSchema = z
  .object({
    email: z.email('This is not a valid email.'),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
