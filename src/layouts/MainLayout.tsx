import Sidebar from '@components/Sidebar';
import { Menu } from '@mui/icons-material';
import { Backdrop, Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';

const drawerWidth = 280;

export default function MainLayout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = useState(() => !isMobile);

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  return (
    <Box display="flex" height="100dvh" position="relative" overflow="hidden">
      <IconButton
        onClick={() => setOpen(!open)}
        sx={{
          position: 'fixed',
          top: 16,
          left: open ? `calc(${drawerWidth}px - 40px)` : 16,
          zIndex: 1300,
          transition: 'left 0.3s',
        }}
      >
        <Menu />
      </IconButton>

      {isMobile && open && (
        <Backdrop
          open
          onClick={() => setOpen(false)}
          sx={{
            zIndex: 1100, // dưới nút menu (1300), dưới sidebar (1200)
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
      )}
      <Box
        sx={{
          position: 'fixed',
          pr: 2,
          top: 0,
          left: 0,
          height: '100dvh',
          width: drawerWidth,
          bgcolor: 'background.paper',
          zIndex: 1200,
          transition: 'transform 0.3s',
          transform: open ? 'translateX(0)' : `translateX(-${drawerWidth}px)`,
        }}
      >
        <Sidebar handleClose={() => setOpen(false)} isMobile={isMobile} />
      </Box>

      <Box
        component="main"
        sx={{
          ml: 1,
          width: !isMobile && open ? `calc(100vw - ${drawerWidth}px)` : '100dvw',
          height: '100dvh',
          transition: 'transform 0.3s',
          transform: !isMobile && open ? `translateX(${drawerWidth}px)` : 'translateX(0)',
          display: 'flex',
          justifyContent: 'center',
          pt: 3,
          px: 2,
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 800, mt: 6 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
