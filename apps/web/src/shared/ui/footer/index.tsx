import { Anchor, AppShellFooter, Text } from '@mantine/core';

export const Footer = () => (
  <AppShellFooter ta="center">
    <Text>
      Develop by{' '}
      <Anchor
        href="https://victor-maznichenko.netlify.app/"
        rel="noopener noreferrer"
        target="_blank"
        c="teal.5"
      >
        Victor Maznichenko
      </Anchor>
    </Text>
  </AppShellFooter>
);
