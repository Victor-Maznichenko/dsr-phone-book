import { createBrowserRouter, RouterProvider } from 'react-router';
import { AppShell } from '@mantine/core';
import { HomePage, LoginPage, NotFoundPage, RegisterPage } from '@/pages';
import { ProtectedRoute } from './protected-route';
import { Footer, Header } from '@/shared/ui';
import { useAuth } from '@/shared/lib/hooks';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <HomePage /> },
          // { path: 'users', element: <UsersPage /> },
        ],
      },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'admin/login', element: <LoginPage isAdmin /> },
    ],
  },
]);

export const App = () => {
  useAuth();

  return (
    <AppShell>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </AppShell>
  );
};
