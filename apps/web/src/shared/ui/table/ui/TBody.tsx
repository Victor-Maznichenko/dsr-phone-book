import { Table } from '@mantine/core';
import { flexRender, Row, Table as TableType } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

interface TBodyProps<T> {
  table: TableType<T>;
  tableContainerNode: HTMLDivElement;
}

const isFirefox = navigator.userAgent.indexOf('Firefox') !== -1;

export const Tbody = <T,>({ table, tableContainerNode }: TBodyProps<T>) => {
  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: rows.length,
    estimateSize: () => 75,
    getScrollElement: () => tableContainerNode,
    measureElement: !isFirefox ? (element) => element?.getBoundingClientRect().height : undefined,
    overscan: 5,
  });

  return (
    <Table.Tbody display="grid" pos="relative" h={rowVirtualizer.getTotalSize()}>
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const row = rows[virtualRow.index] as Row<T>;
        return (
          <Table.Tr
            ref={(node) => rowVirtualizer.measureElement(node)}
            style={{
              width: '100%',
              display: 'flex',
              position: 'absolute',
              transform: `translateY(${virtualRow.start}px)`,
              transition: 'background-color 0.25s',
            }}
            key={row.id}
          >
            {row.getVisibleCells().map((cell) => (
              <Table.Td
                key={cell.id}
                style={{
                  display: 'flex',
                  overflow: 'hidden',
                  justifyContent: 'center',
                  width: cell.column.getSize(),
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Td>
            ))}
          </Table.Tr>
        );
      })}
    </Table.Tbody>
  );
};
