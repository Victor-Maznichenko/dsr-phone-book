import z from 'zod';
import { differenceInYears } from 'date-fns';
import { unmaskPhone } from '@/shared/lib';

export interface StepContentType {
  handlePrev: () => void;
  handleNext: () => void;
  handleComplete: () => void;
}

export const credentialsFormSchema = z
  .object({
    email: z.email('This is not a valid email.'),
    password: z
      .string()
      .min(8, 'The password must contain at least 8 characters.')
      .max(15, 'The password must not be longer than 15 characters.')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[@$!%*?&#]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const phoneSchema = z.string().refine((val) => /^7\d{10}$/.test(unmaskPhone(val)), {
  message: 'Phone must start with +7 and contain 11 digits total',
});
export const personalFormSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: 'FirstName is required' })
    .min(2, 'The first name must be longer than 2 characters.')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .nonempty({ message: 'LastName is required' })
    .min(2, 'The last name must be longer than 2 characters.')
    .max(50, 'Last name must be less than 50 characters'),
  birthday: z
    .string()
    .nonempty({ message: 'Birthday is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Неверный формат, используйте YYYY-MM-DD')
    .refine((val) => differenceInYears(new Date(), new Date(val)) >= 18, {
      message: 'You must be at least 18 years old',
    }),
  officePhone: phoneSchema,
  personalPhones: z
    .array(z.union([phoneSchema, z.literal('')]))
    .min(1, 'At least one personal phone is required')
    .superRefine((phones, ctx) => {
      // 1-й обязателен и валиден
      if (!phoneSchema.safeParse(phones[0]).success) {
        ctx.addIssue({
          code: 'custom',
          message: 'First phone is required and must be valid',
          path: [0],
        });
      }

      // Уникальность среди непустых
      const seen = new Set<string>();
      phones.forEach((p, i) => {
        if (p === '') return;
        if (seen.has(p)) {
          ctx.addIssue({
            code: 'custom',
            message: 'Personal phone numbers must be unique',
            path: [i],
          });
        } else {
          seen.add(p);
        }
      });
    }),
  department: z.string().nonempty({ message: 'Department is required' }),
  position: z.string().nonempty({ message: 'Position is required' }),
  about: z.string().max(500, 'About section must be less than 500 characters').optional(),
  photo: z.url('Photo must be a valid URL').optional(),
});
