import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router';

interface ForgotPasswordRequest {
  email: string;
}

export default function ForgotPassword() {
  const { control, handleSubmit, watch, reset } = useForm<ForgotPasswordRequest>();

  const isValid = !!watch('email')?.trim();
  const isDisabled = !isValid;

  const handleSubmitEmail = (data: ForgotPasswordRequest) => {
    console.log(data);
    reset({ email: '' });
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          mt: 5,
          mb: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontSize: { xs: '1.5rem', sm: '1.625rem', md: '1.375rem' }, fontWeight: 600 }}
        >
          Forgot your password?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '0.9375rem' },
            lineHeight: 1.45,
            color: 'text.secondary',
            mx: 'auto',
          }}
        >
          To reset your password, please enter the email address of your Tasko account.
        </Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(handleSubmitEmail)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="e.g.username@gmail.com"
              {...field}
            />
          )}
        />

        <Button
          variant="contained"
          type="submit"
          disabled={isDisabled}
          sx={{
            borderRadius: 20,
            height: { xs: 44, sm: 48, md: 36 },
            fontSize: { xs: '1rem', sm: '0.9375rem', md: '0.875rem' },
            bgcolor: isDisabled ? '#bbdefb' : 'primary.main',
            color: '#fff',
            '&.Mui-disabled': {
              bgcolor: '#64b5f6',
              color: '#fff',
            },
            mt: 4,
          }}
        >
          Reset my password
        </Button>

        <Typography align="center" color="textSecondary" sx={{ mt: { xs: 1, md: 2 } }}>
          <Box component={Link} to="/auth/signup" sx={{ color: 'primary.main', fontWeight: 500 }}>
            Back to Login
          </Box>
        </Typography>
      </Box>
    </div>
  );
}
