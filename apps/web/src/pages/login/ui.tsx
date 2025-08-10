import z from 'zod';
import { useForm } from '@mantine/form';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { AppShell, Button, Container, Stack, Text, Title } from '@mantine/core';
import { PasswordInput, TextInput } from '@/components';

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

export const Login = () => {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: zod4Resolver(schema),
  });

  const handleSubmit = (formData: unknown) => console.log(formData);

  return (
    <AppShell.Main py={100} ta="center">
      <Container maw={550}>
        <Title c="indigo.8" mb={6}>
          Login here
        </Title>
        <Text size="lg" display="inline-block" mb={50}>
          Welcome back you’ve been missed!
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
      </Container>
    </AppShell.Main>
  );
};
