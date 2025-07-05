import { useAuth } from '@hooks/auth/useAuth';
import { ArrowDropDown } from '@mui/icons-material';
import { Avatar, Box, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { getAccessToken, getRefreshToken } from 'src/utils/token';

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user, logoutMutation } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (accessToken && refreshToken) {
      try {
        await logoutMutation.mutateAsync({ accessToken, refreshToken });
        enqueueSnackbar('Logout successfully!', { variant: 'success' });
      } catch (e) {
        console.error(e);
      }
    }
    navigate('/auth/login');
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ px: 2, py: 2, display: 'flex' }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar sx={{ width: 28, height: 28, bgcolor: 'purple', textTransform: 'capitalize' }}>
          {user?.name.charAt(0)}
        </Avatar>
        <Typography sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
          {user?.name}
        </Typography>
      </Stack>

      <IconButton onClick={handleClick}>
        <ArrowDropDown />
      </IconButton>

      <Menu id="user-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose} sx={{ '&:hover': { color: 'secondary.main' } }}>
          My account
        </MenuItem>
        <MenuItem onClick={handleLogout} sx={{ '&:hover': { color: 'secondary.main' } }}>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenu;
