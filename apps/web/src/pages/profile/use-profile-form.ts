import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { pick } from 'es-toolkit/compat';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { credentialsFormSchema, personalFormSchema } from '@/shared/lib';
import { useProfileStore } from '@/shared/store';

export const useProfilePage = () => {
  const { profile, getProfile, isLoading } = useProfileStore();
  const personalFormValues = pick(profile, [
    'email',
    'firstName',
    'lastName',
    'officePhone',
    'department',
    'position',
    'officeAddress',
    'about',
  ]);

  const form = useForm({
    mode: 'controlled',
    initialValues: personalFormValues,
    validate: zod4Resolver(personalFormSchema.extend(credentialsFormSchema.shape)),
  });

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    form.setValues(personalFormValues);
  }, [isLoading]);

  return { form, profile, isLoading };
};
