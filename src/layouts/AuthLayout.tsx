import { Box, Paper } from '@mui/material';
import AuthSwitchButtons from '@components/auth/AuthSwitchButtons';
import { Outlet } from 'react-router';
import authImg from '@assets/auth.webp';
import BrandLogo from '@components/common/BrandLogo';

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
      }}
    >
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          display: 'flex',
          bgcolor: 'background.paper',
        }}
      >
        <Box
          sx={(theme) => ({
            flex: 1,
            background: 'linear-gradient(to right, #E3F2FD, #1976D2)',
            clipPath: 'polygon(0 0, 65% 0, 60% 100%, 0 100%)',
            [theme.breakpoints.down('md')]: {
              clipPath: 'none',
            },
          })}
        />
      </Box>
      <Paper
        elevation={3}
        sx={{
          bgcolor: 'background.default',
          maxWidth: 800,
          width: '100%',
          display: 'flex',
          borderRadius: 5,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            flex: { xs: 0, md: 1.5 },
            position: 'relative',
            backgroundImage: `url(${authImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: { xs: 'none', md: 'block' },
            clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)',
            m: { xs: 0, md: 1 },
            borderRadius: 5,
            overflow: 'hidden',
          }}
        >
          <AuthSwitchButtons />
        </Box>

        <Box
          sx={{
            width: '100%',
            mt: 1,
            p: 2,
            mr: 1,
            borderRadius: 2,
            textAlign: 'center',
            height: { xs: 'auto', md: '67.5vh' },
            minHeight: { xs: 360, md: 460 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box mt={{ xs: 1, md: 2 }}>
            <BrandLogo />
          </Box>

          <Outlet />
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthLayout;
