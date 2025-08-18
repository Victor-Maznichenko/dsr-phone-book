import { useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { format as formatPhone } from '@react-input/mask';
import { IconPencil, IconTrash, IconExternalLink } from '@tabler/icons-react';
import { ActionIcon, Anchor, AppShell, Avatar, Badge, Container, Flex, Paper, Table, Text, Title } from '@mantine/core';
import { useUsersStore } from '@/store';
import { DEPARTMENTS, phoneMask } from '@/constants';

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
    <Table.Tr style={{ transition: 'background-color 0.25s' }} key={user.id}>
      <Table.Td maw={250}>
        <Flex align="center" gap="sm">
          <Avatar size={30} src={user.avatar} radius={30} />
          <Text truncate="end" fz="sm" fw={500}>
            {user.firstName} {user.lastName}
          </Text>
        </Flex>
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
        <Text fz="sm">{formatPhone('79204574579', phoneMask)}</Text>
      </Table.Td>
      <Table.Td maw={220}>
        <Anchor href={`mailto:${user.email}`}>
          <Text truncate="end" size="xs">
            {user.email}
          </Text>
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Flex justify="flex-end">
          <ActionIcon variant="subtle" color="gray">
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="blue">
            <IconExternalLink size={16} stroke={1.5} />
          </ActionIcon>
        </Flex>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <AppShell.Main py={100} ta="center">
      <Container size="lg">
        <Title mb="xl">Phone book:</Title>
        <Table.ScrollContainer minWidth={800}>
          <Paper bdrs={20} withBorder>
            <Table highlightOnHover horizontalSpacing="md" verticalSpacing="md">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Employee</Table.Th>
                  <Table.Th ta="center">Department</Table.Th>
                  <Table.Th ta="center">Position</Table.Th>
                  <Table.Th ta="center">Birthday</Table.Th>
                  <Table.Th ta="center">Office Phone</Table.Th>
                  <Table.Th ta="center">Email</Table.Th>
                  <Table.Th />
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Paper>
        </Table.ScrollContainer>
      </Container>
    </AppShell.Main>
  );
};
