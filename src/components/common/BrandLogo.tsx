import { Link as RouterLink } from 'react-router';
import { Box, Typography } from '@mui/material';
import logo from '/logo.webp';

function BrandLogo() {
  return (
    <Box
      component={RouterLink}
      to="/today"
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <Box component="img" src={logo} alt="logo" sx={{ width: 28, mr: 1, mb: 1 }} />
      <Typography variant="h6" fontWeight="bold">
        Tasko
      </Typography>
    </Box>
  );
}

export default BrandLogo;
