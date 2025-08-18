import { createBrowserRouter, RouterProvider } from 'react-router';
import { AppShell } from '@mantine/core';
import { HomePage, LoginPage, NotFoundPage, RegisterPage } from './pages';
import { Footer, Header, ProtectedRoute } from './components';
import { useAuth } from './hooks';

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
