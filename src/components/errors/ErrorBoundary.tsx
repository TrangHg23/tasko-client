import { useNavigate, useRouteError } from 'react-router';
import {
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import BrandLogo from '@components/common/BrandLogo';

const ErrorBoundary = () => {
  const error = useRouteError() as Error | undefined;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  const handleRefresh = () => {
    navigate(0);
  };

  return (
    <>
      {/* Background */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background: 'linear-gradient(to right, #E3F2FD, #1976D2)',
        }}
      />

      {/* Main UI */}
      <Container
        maxWidth="sm"
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, md: 4 },
            borderRadius: 2,
            textAlign: 'center',
            borderLeft: `4px solid ${theme.palette.error.main}`,
          }}
        >
          <BrandLogo />

          <Stack spacing={1} alignItems="center">
            <WarningIcon color="error" sx={{ fontSize: 56 }} />

            <Typography variant="h5" component="h1" color="error">
              Oops! Something went wrong
            </Typography>

            <Box
              sx={{
                p: 3,
                backgroundColor: theme.palette.grey[100],
                borderRadius: 1,
                textAlign: 'left',
                fontFamily: 'monospace',
                maxHeight: '200px',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
              }}
            >
              <Typography variant="subtitle1">
                {error?.message || 'An unexpected error occurred.'}
              </Typography>
              {error?.stack && (
                <Typography variant="caption" component="pre">
                  {error.stack}
                </Typography>
              )}
            </Box>

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                variant="contained"
                onClick={handleRefresh}
                color="error"
                size={isMobile ? 'large' : 'medium'}
                fullWidth
              >
                Refresh Page
              </Button>
              <Button
                variant="outlined"
                href="/today"
                color="error"
                size={isMobile ? 'large' : 'medium'}
                fullWidth
              >
                Go to Home
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default ErrorBoundary;
