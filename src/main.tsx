import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import theme from './theme/index.ts'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@lib/queryClient.ts';
import { SnackbarProvider } from 'notistack';
import AppRouter from '@routes/AppRouter.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <SnackbarProvider
            dense
            maxSnack={3}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={3000}
            preventDuplicate 
          >
            <AppRouter/>
          </SnackbarProvider>
        </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
