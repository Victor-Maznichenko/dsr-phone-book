import { Title, Text, Stack, Button } from '@mantine/core';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { useForm } from '@mantine/form';
import { PasswordInput, TextInput } from '@/shared/ui';
import { credentialsFormSchema, StepContentType } from '../lib';
import { useRegisterStore } from '@/shared/store';

export const MainStepContent = ({ handleNext }: Pick<StepContentType, 'handleNext'>) => {
  const {
    registerFields: { email, password, confirmPassword },
    setCredentials,
  } = useRegisterStore();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email,
      password,
      confirmPassword,
    },
    validate: zod4Resolver(credentialsFormSchema),
  });

  const handleSubmit = (formData: UserCredentials) => {
    setCredentials(formData);
    handleNext();
  };

  return (
    <>
      <Title c="indigo.8" mb={6}>
        Create Account
      </Title>
      <Text fw={500} mb={50}>
        Create an account so you can explore all the existing jobs
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack ta="left" gap="xl" mb={50}>
          <TextInput
            placeholder="Email"
            key={form.key('email')}
            {...form.getInputProps('email')}
            error={form.errors.email}
          />
          <PasswordInput
            autoComplete="new-password"
            placeholder="Password"
            key={form.key('password')}
            {...form.getInputProps('password')}
            error={form.errors.password}
          />
          <PasswordInput
            autoComplete="new-password"
            placeholder="Confirm Password"
            key={form.key('confirmPassword')}
            {...form.getInputProps('confirmPassword')}
            error={form.errors.confirmPassword}
          />
        </Stack>
        <Button type="submit" fullWidth variant="filled" color="indigo" size="xl" radius="lg">
          Next
        </Button>
      </form>
    </>
  );
};
