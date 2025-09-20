import { AppShellHeader, Container, Flex } from '@mantine/core';
import { ThemeSwitcher, IconLogo } from '@/shared/ui';

export const Header = () => (
  <AppShellHeader py="xs">
    <Container>
      <Flex justify="space-between" align="center">
        <IconLogo />
        <ThemeSwitcher />
      </Flex>
    </Container>
  </AppShellHeader>
);
