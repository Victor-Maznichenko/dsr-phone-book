import { AppShell, Container, Title } from '@mantine/core';
import { VirtualizedTable } from './virtualized-table';

export const HomePage = () => (
  <AppShell.Main py={100} ta="center">
    <Container size="lg">
      <Title mb="xl">Phone book:</Title>
      <VirtualizedTable />
    </Container>
  </AppShell.Main>
);
