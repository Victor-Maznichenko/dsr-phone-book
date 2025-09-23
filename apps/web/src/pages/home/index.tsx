import { format, parseISO } from 'date-fns';
import { useEffect } from 'react';
import { format as formatPhone } from '@react-input/mask';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { AppShell, Avatar, Badge, Container, Flex, Title, Text, ActionIcon } from '@mantine/core';
import { IconExternalLink, IconPencil, IconTrash } from '@tabler/icons-react';
import { VirtualizedTable } from '@/shared/ui';
import { useProfileStore, useUsersStore } from '@/shared/store';
import { DEPARTMENTS, phoneMask } from '@/shared/lib';

const ActionsCell = () => {
  const { isAdmin } = useProfileStore();

  return (
    <Flex justify="flex-end">
      {isAdmin && (
        <>
          <ActionIcon variant="subtle" color="gray">
            <IconPencil size={16} stroke={1.5} />
          </ActionIcon>
          <ActionIcon variant="subtle" color="red">
            <IconTrash size={16} stroke={1.5} />
          </ActionIcon>
        </>
      )}
      <ActionIcon variant="subtle" color="blue">
        <IconExternalLink size={16} stroke={1.5} />
      </ActionIcon>
    </Flex>
  );
};

const departmentsColors: Record<string, string> = {
  [DEPARTMENTS.HR]: 'pink.5',
  [DEPARTMENTS.Sales]: 'yellow.4',
  [DEPARTMENTS.Support]: 'blue.5',
  [DEPARTMENTS.Marketing]: 'violet.8',
  [DEPARTMENTS.Development]: 'teal.5',
};

const columnHelper = createColumnHelper<UserResponse>();
const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    size: 65,
  }),
  columnHelper.accessor(({ firstName, lastName }) => `${firstName} ${lastName}`, {
    size: 230,
    header: 'Employee',
    cell: (props) => (
      <Flex align="center" gap="sm">
        <Avatar size={30} src={props.row.original.avatar} radius={30} />
        <Text truncate="end" fz="sm" fw={500}>
          {props.getValue()}
        </Text>
      </Flex>
    ),
  }),
  columnHelper.accessor('department', {
    size: 130,
    header: 'Department',
    cell: (props) => (
      <Badge color={departmentsColors[props.getValue() as string]} variant="light">
        {props.getValue() as string}
      </Badge>
    ),
  }),
  columnHelper.accessor('position', {
    size: 100,
    header: 'Position',
    cell: (props) => (
      <Badge color="gray.6" variant="light">
        {props.getValue() as string}
      </Badge>
    ),
  }),
  columnHelper.accessor('birthday', {
    size: 90,
    header: 'Birthday',
    cell: (props) => format(parseISO(props.getValue()), 'dd.MM.yyyy'),
  }),
  columnHelper.accessor('officePhone', {
    size: 145,
    header: 'Office Phone',
    cell: (props) => formatPhone(props.getValue(), phoneMask),
  }),
  columnHelper.accessor('email', {
    size: 240,
    header: 'Email',
    cell: (props) => (
      <Text truncate="end" fz="sm">
        {props.getValue()}
      </Text>
    ),
  }),
  columnHelper.display({
    size: 108,
    id: 'actions',
    cell: ActionsCell,
  }),
] as ColumnDef<UserResponse>[];

export const HomePage = () => {
  const { users, getUsers } = useUsersStore();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <AppShell.Main py={100} ta="center">
      <Container size="lg">
        <Title mb="xl">Phone book:</Title>
        <VirtualizedTable getMoreData={getUsers} minWidth={1108} data={users} columns={columns} />
      </Container>
    </AppShell.Main>
  );
};
