import { Button, Container, Stack, Text, Title } from '@mantine/core';
import { PasswordInput, TextInput } from '@/shared/ui';
import { useLoginForm } from './lib/use-login-form';
import styles from './styles.module.scss';

export const LoginPage = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const accentColor = isAdmin ? 'red.6' : 'indigo.8';
  const { form, isLoading, handleSubmit } = useLoginForm({ isAdmin });

  return (
    <main className={styles.root}>
      <Container size="xs">
        <Title className={styles.title} c={accentColor}>
          Login here
        </Title>
        <Text className={styles.description}>
          Welcome back you’ve been missed!
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack className={styles.inputs}>
            <TextInput
              {...form.getInputProps('email')}
              error={form.errors.email}
              key={form.key('email')}
              placeholder="Email"
              autoComplete="email"
            />
            <PasswordInput
              {...form.getInputProps('password')}
              error={form.errors.password}
              key={form.key('password')}
              placeholder="Password"
              autoComplete="current-password"
            />
          <Button
            className={styles.button}
            loading={isLoading}
            color={accentColor}
            variant="filled"
            type="submit"
            size="xl"
          >
            Login
          </Button>
          </Stack>
        </form>
      </Container>
    </main>
  );
};
