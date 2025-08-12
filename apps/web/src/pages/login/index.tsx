import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router';
import { zod4Resolver } from 'mantine-form-zod-resolver';
import { AppShell, Button, Container, Stack, Text, Title } from '@mantine/core';
import { PasswordInput, TextInput } from '@/components';
import { useLoginStore } from '@/store';
import { schema } from './lib';

export const LoginPage = ({ isAdmin }: { isAdmin?: boolean }) => {
  const navigate = useNavigate();
  const primaryColor = isAdmin ? 'red.6' : 'indigo.8';
  const { isLoading, submitLogin } = useLoginStore();
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: zod4Resolver(schema),
  });

  const handleSubmit = async (formData: UserCredentials) => {
    await submitLogin(formData, isAdmin);
    navigate('/');
  };

  return (
    <AppShell.Main py={100} ta="center">
      <Container maw={550}>
        <Title c={primaryColor} mb={6}>
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
          <Button
            type="submit"
            fullWidth
            variant="filled"
            color={primaryColor}
            size="xl"
            radius="lg"
            loading={isLoading}
          >
            Next
          </Button>
        </form>
      </Container>
    </AppShell.Main>
  );
};
