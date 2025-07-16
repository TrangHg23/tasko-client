import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@lib/queryClient.ts';
import AppWrapper from '@layouts/AppWrapper';
import theme from './theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppWrapper />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
