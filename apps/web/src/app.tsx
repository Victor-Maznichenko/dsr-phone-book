import { RouterProvider } from 'react-router';
import { AppShell } from '@mantine/core';
import { router } from './constants/router';

export const App = () => (
  <AppShell>
    <RouterProvider router={router} />
  </AppShell>
);
