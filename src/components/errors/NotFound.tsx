import { useNavigate } from 'react-router';
import { Box, Button, Container, Typography, Paper, Stack, useTheme } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import BrandLogo from '@components/common/BrandLogo';

function NotFound() {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleGoHome = () => navigate('/today');

  return (
    <>
      {/* Background*/}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background: 'linear-gradient(to right, #E3F2FD, #1976D2)',
        }}
      />

      <Container
        maxWidth="sm"
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            textAlign: 'center',
            borderLeft: `4px solid ${theme.palette.warning.main}`,
            width: '100%',
          }}
        >
          {/* Logo & App name */}
          <BrandLogo />

          <Stack spacing={3} alignItems="center">
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: '50%',
                bgcolor: theme.palette.warning.light,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4" color="warning.contrastText">
                404
              </Typography>
            </Box>

            <Typography variant="h5" component="h2">
              Page Not Found
            </Typography>

            <Typography variant="body1" color="text.secondary">
              The page you're looking for doesn't exist or has been moved.
            </Typography>

            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={handleGoHome}
              sx={{
                mt: 1,
                px: 3,
                bgcolor: theme.palette.warning.main,
                '&:hover': {
                  bgcolor: theme.palette.warning.dark,
                },
              }}
            >
              Go to Homepage
            </Button>
          </Stack>
        </Paper>
      </Container>
    </>
  );
}

export default NotFound;
