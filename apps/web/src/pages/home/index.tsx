import { format, parseISO } from 'date-fns';
import { useEffect } from 'react';
import { format as formatPhone } from '@react-input/mask';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { AppShell, Badge, Container, Title } from '@mantine/core';
import { VirtualizedTable } from '@/shared/ui';
import { useUsersStore } from '@/shared/store';
import { DEPARTMENTS, phoneMask } from '@/shared/lib';

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
    size: 60,
    header: 'ID',
  }),
  columnHelper.accessor(({ firstName, lastName }) => `${firstName} ${lastName}`, {
    size: 250,
    header: 'Employee',
  }),
  columnHelper.accessor('department', {
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
  }),
  columnHelper.accessor('birthday', {
    size: 100,
    header: 'Position',
    cell: (props) => format(parseISO(props.getValue()), 'dd.MM.yyyy'),
  }),
  columnHelper.accessor('officePhone', {
    size: 160,
    header: 'Office Phone',
    cell: (props) => formatPhone(props.getValue(), phoneMask),
  }),
  columnHelper.accessor('email', { header: 'Email' }),
] as ColumnDef<UserResponse>[];

export const HomePage = () => {
  const { users, getUsers } = useUsersStore();
  // const { isAdmin } = useProfileStore();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <AppShell.Main py={100} ta="center">
      <Container size="lg">
        <Title mb="xl">Phone book:</Title>
        <VirtualizedTable data={users} columns={columns} />
      </Container>
    </AppShell.Main>
  );
};
