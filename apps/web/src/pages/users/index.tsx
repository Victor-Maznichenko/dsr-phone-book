import { ActionIcon, Anchor, Avatar, Badge, Group, Table, Text } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useUsersStore } from '@/store';
import { DEPARTMENTS } from '@/constants';

const jobColors: Record<string, string> = {
  [DEPARTMENTS.HR]: 'pink',
  [DEPARTMENTS.Sales]: 'yellow',
  [DEPARTMENTS.Support]: 'blue',
  [DEPARTMENTS.Marketing]: 'purpule',
  [DEPARTMENTS.Development]: 'green',
};

export const UsersPage = () => {
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
        <Badge color={jobColors[user.department]} variant="light">
          {item.job}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Anchor component="button" size="sm">
          {user.email}
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Text fz="sm">{user.officePhone}</Text>
      </Table.Td>
      <Table.Td>
        <Group gap={0} justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Employee</Table.Th>
            <Table.Th>Job title</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};
