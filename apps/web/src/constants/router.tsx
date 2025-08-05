import { createBrowserRouter } from 'react-router';
import { HomePage, Login, NotFoundPage, RegisterPage } from '@/pages';

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'login', element: <Login /> },
    ],
  },
]);
