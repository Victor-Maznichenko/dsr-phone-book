import { AppShellHeader, Container, Flex } from '@mantine/core';
import { ThemeSwitcher } from './ui/theme-switcher';
import { IconLogo } from './ui';

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
