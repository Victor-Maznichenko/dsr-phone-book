import { ActionIcon, Anchor, AppShell, Avatar, Badge, Container, Group, Table, Text, Title } from '@mantine/core';
import { IconPencil, IconTrash, IconExternalLink } from '@tabler/icons-react';
import { useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { useUsersStore } from '@/store';
import { DEPARTMENTS } from '@/constants';

const departmentsColors: Record<string, string> = {
  [DEPARTMENTS.HR]: 'pink.5',
  [DEPARTMENTS.Sales]: 'yellow.4',
  [DEPARTMENTS.Support]: 'blue.5',
  [DEPARTMENTS.Marketing]: 'violet.8',
  [DEPARTMENTS.Development]: 'teal.5',
};

export const HomePage = () => {
  const { users, getUsers } = useUsersStore();

  useEffect(() => {
    getUsers();
  }, []);

  const rows = users.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Group gap="sm">
          <Avatar size={30} src={user.avatar} radius={30} />
          <Text fz="sm" fw={500}>
            {user.firstName} {user.lastName}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge color={departmentsColors[user.department]} variant="light">
          {user.department}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge color="gray.6" variant="light">
          {user.position}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{format(parseISO(user.birthday), 'dd.MM.yyyy')}</Text>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{user.officePhone}</Text>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" size="sm">
          {user.email}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="blue">
            <IconExternalLink size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <AppShell.Main py={100} ta="center">
      <Container>
        <Title mb="xl">Phone book:</Title>
        <Table.ScrollContainer minWidth={800}>
          <Table verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Employee</Table.Th>
                <Table.Th ta="center">Department</Table.Th>
                <Table.Th ta="center">Position</Table.Th>
                <Table.Th ta="center">Birthday</Table.Th>
                <Table.Th ta="center">Phone</Table.Th>
                <Table.Th ta="center">Email</Table.Th>
                <Table.Th />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Container>
    </AppShell.Main>
  );
};
