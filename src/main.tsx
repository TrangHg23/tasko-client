import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import theme from './theme/index.ts'
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider } from '@contexts/AuthContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from '@routes/AppRouter.tsx';
import {SnackbarProvider} from 'notistack';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={3000}
            preventDuplicate
          >
            <AppRouter/>
          </SnackbarProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
