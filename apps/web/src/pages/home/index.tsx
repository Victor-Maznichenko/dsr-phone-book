import { format, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { format as formatPhone } from '@react-input/mask';
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { AppShell, Badge, Container, Paper, Table, Title } from '@mantine/core';
import { useUsersStore } from '@/store';
import { DEPARTMENTS, phoneMask } from '@/constants';
import { Tbody } from './TBody';
import { THead } from './THead';

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
];

export const HomePage = () => {
  const [tableContainerNode, setTableContainerNode] = useState<Nullable<HTMLDivElement>>(null);
  const { users, getUsers } = useUsersStore();
  // const { isAdmin } = useProfileStore();

  const table = useReactTable({
    columns,
    data: users,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <AppShell.Main py={100} ta="center">
      <Container size="lg">
        <Title mb="xl">Phone book:</Title>
        <Paper bdrs={20} withBorder>
          <Table.ScrollContainer minWidth={800} ref={setTableContainerNode}>
            <Table highlightOnHover horizontalSpacing="md" verticalSpacing="md">
              <THead table={table} />
              {tableContainerNode && <Tbody table={table} tableContainerNode={tableContainerNode} />}
            </Table>
          </Table.ScrollContainer>
        </Paper>
      </Container>
    </AppShell.Main>
  );
};
