import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import theme from './theme/index.ts'
import { ThemeProvider, CssBaseline } from '@mui/material';
import AppRouter from './router.tsx';
import { AuthProvider } from '@contexts/AuthContext.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AppRouter/>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
