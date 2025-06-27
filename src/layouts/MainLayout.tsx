import Sidebar from '@components/Sidebar';
import { Box } from '@mui/material';
import { Outlet } from 'react-router';

export default function MainLayout() {
  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      <Box flex={1} p={2} overflow="auto">
        <Outlet />
      </Box>
    </Box>
  );
}
