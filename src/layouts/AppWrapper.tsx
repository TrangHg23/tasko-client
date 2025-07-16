import { SnackbarProvider } from 'notistack';
import { useTheme, useMediaQuery } from '@mui/material';
import AppRouter from '@routes/AppRouter';

export default function AppWrapper() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SnackbarProvider
      dense
      maxSnack={3}
      autoHideDuration={3000}
      preventDuplicate
      anchorOrigin={{
        vertical: isMobile ? 'bottom' : 'top',
        horizontal: isMobile ? 'center' : 'right',
      }}
    >
      <AppRouter />
    </SnackbarProvider>
  );
}
