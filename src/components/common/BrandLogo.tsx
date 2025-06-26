import { Box, Typography } from '@mui/material';
import logo from '/logo.webp';

function BrandLogo() {
  return (
    <Box
      component="a"
      href="/"
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2,
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <Box component="img" src={logo} alt="Website Logo" sx={{ width: 30, mr: 1, mb: 1 }} />
      <Typography variant="h5" fontWeight="bold">
        Tasko
      </Typography>
    </Box>
  );
}

export default BrandLogo;
