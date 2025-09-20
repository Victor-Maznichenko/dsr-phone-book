import { Paper, Table } from '@mantine/core';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { THead } from './THead';
import { Tbody } from './TBody';

interface VirtualizedTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
}

export const VirtualizedTable = <T,>({ data, columns }: VirtualizedTableProps<T>) => {
  const [tableContainerNode, setTableContainerNode] = useState<Nullable<HTMLDivElement>>(null);

  const table = useReactTable({
    data,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Paper bdrs={20} withBorder>
      <Table.ScrollContainer minWidth={800} ref={setTableContainerNode}>
        <Table highlightOnHover horizontalSpacing="md" verticalSpacing="md">
          <THead table={table} />
          {tableContainerNode && <Tbody table={table} tableContainerNode={tableContainerNode} />}
        </Table>
      </Table.ScrollContainer>
    </Paper>
  );
};
