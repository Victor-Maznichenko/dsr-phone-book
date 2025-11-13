import { Container, Title } from '@mantine/core';
import { VirtualizedTable } from './virtualized-table';
import styles from './styles.module.scss';

export const HomePage = () => (
  <main className={styles.root}>
    <Container size="lg">
      <Title mb="xl">Phone book:</Title>
      <VirtualizedTable />
    </Container>
  </main>
);
