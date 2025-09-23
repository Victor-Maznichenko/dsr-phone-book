import { Table } from '@mantine/core';
import { flexRender, HeaderGroup, Table as TableType } from '@tanstack/react-table';
import styles from './styles.module.css';

const renderHeaderCells = <T,>(headerGroup: HeaderGroup<T>) =>
  headerGroup.headers.map((header) => (
    <Table.Th className={styles.tableCell} w={header.getSize()} key={header.id}>
      {flexRender(header.column.columnDef.header, header.getContext())}
    </Table.Th>
  ));

const renderHeaderRow = <T,>(table: TableType<T>) =>
  table.getHeaderGroups().map((headerGroup) => (
    <Table.Tr className={styles.tableHeadRow} key={headerGroup.id}>
      {renderHeaderCells(headerGroup)}
    </Table.Tr>
  ));

export const THead = <T,>({ table }: { table: TableType<T> }) => (
  <Table.Thead className={styles.tableHead}>{renderHeaderRow(table)}</Table.Thead>
);
