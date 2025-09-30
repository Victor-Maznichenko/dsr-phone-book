import { Link } from 'react-router';
import { AppShellHeader, Avatar, Container, Flex, Group } from '@mantine/core';
import { ThemeSwitcher, IconLogo } from '@/shared/ui';
import { ROUTES } from '../../shared/lib';
import { useProfileStore } from '@/shared/store';

export const Header = () => {
  const { profile } = useProfileStore();

  return (
    <AppShellHeader py="xs">
      <Container size="lg">
        <Flex justify="space-between" align="center">
          <Link to={ROUTES.ROOT}>
            <IconLogo />
          </Link>
          <Group>
            <ThemeSwitcher />
            <Link to={ROUTES.PROFILE}>
              <Avatar src={profile?.avatar} />
            </Link>
          </Group>
        </Flex>
      </Container>
    </AppShellHeader>
  );
};
