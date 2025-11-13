import { Link } from 'react-router';
import { AppShellHeader, Avatar, Container, Group } from '@mantine/core';
import { ThemeSwitcher, IconLogo } from '@/shared/ui';
import { ROUTES } from '../../shared/lib';
import { useProfileStore } from '@/shared/store';
import styles from './styles.module.scss';

export const Header = () => {
  const { profile } = useProfileStore();

  return (
    <AppShellHeader className={styles.root}>
      <Container size="lg">
        <div className={styles.inner}>
          <Link to={ROUTES.ROOT}>
            <IconLogo />
          </Link>
          <Group>
            <ThemeSwitcher />
            <Link to={ROUTES.PROFILE}>
              <Avatar src={profile?.avatar} />
            </Link>
          </Group>
        </div>
      </Container>
    </AppShellHeader>
  );
};
