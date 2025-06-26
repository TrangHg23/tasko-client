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
        p: 2,
      }}
    >
      <Box sx={{ position: 'fixed', inset: 0, zIndex: -1, display: 'flex' }}>
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
        sx={{ maxWidth: 1000, width: '100%', display: 'flex', borderRadius: 5, overflow: 'hidden' }}
      >
        <Box
          sx={{
            flex: { md: 1, lg: 1.5 },
            position: 'relative',
            backgroundImage: `url(${authImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: { xs: 'none', md: 'block' },
            clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)',
            m: 1,
            borderRadius: 5,
            overflow: 'hidden',
          }}
        >
          <AuthSwitchButtons />
        </Box>

        <Box
          sx={{
            height: { xs: 'auto', md: '75vh' },
            minHeight: { xs: 400, md: 500 },
            flex: 1,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <BrandLogo />
          <Outlet />
        </Box>
      </Paper>
    </Box>
  );
};

export default AuthLayout;
