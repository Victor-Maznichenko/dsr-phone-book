import { RefObject } from 'react';
import { Table } from '@mantine/core';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { flexRender, Row, Table as TableType } from '@tanstack/react-table';
import styles from './styles.module.css';

interface TBodyProps<T> {
  table: TableType<T>;
  scrollRef: RefObject<HTMLDivElement | null>;
}

const renderBodyCells = <T,>(row: Row<T>) =>
  row.getVisibleCells().map((cell) => (
    <Table.Td className={styles.tableCell} w={cell.column.getSize()} key={cell.id}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </Table.Td>
  ));

export const Tbody = <T,>({ table, scrollRef }: TBodyProps<T>) => {
  const { rows } = table.getRowModel();

  const rowVirtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => 75,
    scrollMargin: scrollRef.current?.offsetTop ?? 0,
    overscan: 15,
  });

  return (
    <Table.Tbody className={styles.tableBody} h={rowVirtualizer.getTotalSize()}>
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const row = rows[virtualRow.index] as Row<T>;

        return (
          <Table.Tr
            data-index={virtualRow.index}
            className={styles.tableBodyRow}
            style={{ transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)` }}
            key={row.id}
          >
            {renderBodyCells(row)}
          </Table.Tr>
        );
      })}
    </Table.Tbody>
  );
};
