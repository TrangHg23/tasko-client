import { CircularProgress, Box, Typography, Stack } from '@mui/material';

const LoadingSpinner = () => (
  <Box 
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'background.paper' 
    }}
  >
    <Stack alignItems="center" spacing={3}>
      <CircularProgress 
        size={60} 
        thickness={5}
        sx={{ 
          color: (theme) => theme.palette.primary.main, 
        }} 
      />
      <Typography 
        variant="h6" 
        color="text.secondary" 
      >
        Loading...
      </Typography>
    </Stack>
  </Box>
);

export default LoadingSpinner;
