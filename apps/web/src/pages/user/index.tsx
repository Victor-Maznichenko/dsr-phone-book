import { useEffect } from 'react';
import { useParams } from 'react-router';
import { AppShell, Avatar, Container, Flex, Group, Paper, SimpleGrid, Text } from '@mantine/core';
import { useUserStore } from '@/shared/store';
import { LabelValue } from '@/shared/ui';

export const UserPage = () => {
  const { id } = useParams();
  const { user, isLoading, getUserById } = useUserStore();

  useEffect(() => {
    getUserById(id ?? '');
  }, []);

  if (isLoading) {
    return 'Loading...';
  }

  console.log(user?.avatar);

  return (
    <AppShell.Main py={100}>
      <Container size="lg">
        <Group align="flex-start" wrap="nowrap">
          <Paper
            maw="calc(18.75rem * var(--mantine-scale) + var(--mantine-spacing-md) * 2)"
            radius="md"
            ta="center"
            withBorder
            p="md"
          >
            <Text fz="h2" fw={500}>
              {user?.firstName} {user?.lastName}
            </Text>
            <Avatar w={300} h={300} src={user?.avatar} radius="md" />
          </Paper>
          <Paper flex="1 0 auto" radius="md" withBorder p="md" style={{ alignSelf: 'stretch' }}>
            <Flex mb="xl" align="center" justify="space-between">
              <Text fz="h2" fw={500}>
                Bio & other details
              </Text>
            </Flex>

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
