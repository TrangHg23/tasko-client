import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingSpinner = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 300,
      width: '100%',
    }}
  >
    <CircularProgress thickness={5} />
    <Typography mt={2} variant="subtitle1" color="text.secondary">
      Loading...
    </Typography>
  </Box>
);

export default LoadingSpinner;
