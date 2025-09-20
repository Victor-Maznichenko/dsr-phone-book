import { Table } from '@mantine/core';
import { flexRender, Table as TableType } from '@tanstack/react-table';

export const THead = <T,>({ table }: { table: TableType<T> }) => (
  <Table.Thead>
    <Table.Tr>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id} style={{ display: 'flex', width: '100%' }}>
          {headerGroup.headers.map((header) => (
            <Table.Th w={header.getSize()} ta="center" key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </Table.Th>
          ))}
        </tr>
      ))}
      <Table.Th />
    </Table.Tr>
  </Table.Thead>
);
