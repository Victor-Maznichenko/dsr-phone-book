import { useEffect, useRef } from 'react';
import { Paper, Table } from '@mantine/core';
import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { UserRow } from './user-row';
import { useUsersStore } from '@/shared/store';
import { useIntersectionObserver } from '@/shared/lib';
import styles from './styles.module.css';

export const VirtualizedTable = () => {
  const { users, getUsers } = useUsersStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  // TODO: Я не уверен что правильно и лаконично заюзал дженерики в этом месте.
  const { ref: bottomRef } = useIntersectionObserver<HTMLDivElement>({
    callback: ({ isIntersecting }) => (isIntersecting ? getUsers() : undefined),
  });

  useEffect(() => {
    getUsers();
  }, []);

  const rowVirtualizer = useWindowVirtualizer({
    count: users.length,
    estimateSize: () => 70,
    scrollMargin: scrollRef.current?.offsetTop ?? 0,
    overscan: 15,
  });

  return (
    <Paper
      className={styles.tableWrapper}
      style={{ height: `${rowVirtualizer.getTotalSize() + 40}px` }}
      ref={scrollRef}
      withBorder
    >
      <Table className={styles.table}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={65}>ID</Table.Th>
            <Table.Th w={230}>Employee</Table.Th>
            <Table.Th w={130}>Department</Table.Th>
            <Table.Th w={100}>Position</Table.Th>
            <Table.Th w={90}>Birthday</Table.Th>
            <Table.Th w={145}>Office Phone</Table.Th>
            <Table.Th w={240}>Email</Table.Th>
            <Table.Th w={108} />
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rowVirtualizer.getVirtualItems().map((item) => (
            <UserRow
              key={item.key}
              data-index={item.index}
              data={users[item.index]}
              style={{
                height: `${item.size}px`,
                transform: `translateY(${item.start - rowVirtualizer.options.scrollMargin + 40}px)`,
              }}
            />
          ))}
        </Table.Tbody>
      </Table>
      <div className={styles.bottom} ref={bottomRef} />
    </Paper>
  );
};
