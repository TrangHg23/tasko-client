import { Box, Button, Stack } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';

const AuthSwitchButtons = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const buttons = [
    { label: 'Sign Up', path: '/auth/signup' },
    { label: 'Join Us', path: '/auth/login' },
  ];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'right', p: 3 }}>
      <Stack direction="row" spacing={2}>
        {buttons.map(({ label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Button
              key={path}
              variant={isActive ? 'contained' : 'outlined'}
              onClick={() => navigate(path)}
              sx={{
                color: isActive ? '#fff' : '#000',
                borderColor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: '#fff',
                },
                fontWeight: 500,
                mx: 1,
              }}
            >
              {label}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
};

export default AuthSwitchButtons;
