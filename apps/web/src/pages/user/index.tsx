import { useEffect } from 'react';
import { useParams } from 'react-router';
import { AppShell, Avatar, Container, Group, Paper, SimpleGrid, Text } from '@mantine/core';
import { useUserStore } from '@/shared/store';
import { LabelValue } from '@/shared/ui';
import styles from './styles.module.scss';

export const UserPage = () => {
  const { id } = useParams();
  const { user, isLoading, getUserById } = useUserStore();

  useEffect(() => {
    getUserById(id ?? '');
  }, []);

  if (isLoading) {
    return 'Loading...';
  }

  return (
    <AppShell.Main className={styles.root}>
      <Container size="lg">
        <Group className={styles.inner}>
          <Paper className={styles.preview}>
            <Text fz="h2" fw={500}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Avatar w={300} h={300} src={user?.avatar} radius="md" />
          </Paper>
          <Paper className={styles.formPaper}>
            <div className={styles.formHeader}>
              <Text fz="h2" fw={500}>
                Bio & other details
              </Text>
            </div>

            <SimpleGrid cols={2} component="form">
              <LabelValue label="First Name" value={user?.firstName} />
              <LabelValue label="Last Name" value={user?.lastName} />
              <LabelValue label="Email" value={user?.email} />
              <LabelValue label="Office Address" value={user?.officeAddress} />
              <LabelValue label="Department" value={user?.department} />
              <LabelValue label="Position" value={user?.position} />
              <LabelValue label="Office phone" value={user?.officePhone} />
              <LabelValue label="About" value={user?.about} />
            </SimpleGrid>
          </Paper>
        </Group>
      </Container>
    </AppShell.Main>
  );
};
