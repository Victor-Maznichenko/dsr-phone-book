import ReactDOM from 'react-dom/client';
import { createTheme, MantineProvider } from '@mantine/core';
import { App } from './app';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@/shared/styles/globals.scss';

const theme = createTheme({
  cursorType: 'pointer',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider defaultColorScheme="dark" theme={theme}>
    <App />
  </MantineProvider>,
);
