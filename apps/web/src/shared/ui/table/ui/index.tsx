import { useEffect, useRef } from 'react';
import { Paper, Table } from '@mantine/core';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { THead } from './THead';
import { Tbody } from './TBody';
import styles from './styles.module.css';

interface VirtualizedTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  minWidth: number;
  getMoreData: () => void;
}

const tableStyles = {
  highlightOnHover: true,
  horizontalSpacing: 'sm',
  verticalSpacing: 'md',
};

  // TODO: Сделать контекскст внутри компонента и нормальные пропсы
export const VirtualizedTable = <T,>({ data, columns, getMoreData, minWidth = 800 }: VirtualizedTableProps<T>) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  });

  // Кривая реализация infinite scrolling
  // TODO: пофиксить
  useEffect(() => {
    const scrollHandler = () => {
      if (scrollRef?.current) {
        const { scrollHeight, scrollTop, clientHeight } = scrollRef.current;
        if (scrollHeight - scrollTop - clientHeight < 100) {
          getMoreData();
        }
      }
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <Table.ScrollContainer minWidth={minWidth}>
      <Paper className={styles.tableWrapper} ref={scrollRef} withBorder>
        <Table {...tableStyles} className={styles.table}>
          <THead table={table} />
          <Tbody table={table} scrollRef={scrollRef} />
        </Table>
      </Paper>
    </Table.ScrollContainer>
  );
};
