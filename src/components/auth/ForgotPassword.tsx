import type { ForgotPasswordRequest } from '@app-types/auth';
import { useForgotPassword } from '@hooks/auth/useForgotPassword';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router';

export default function ForgotPassword() {
  const { control, handleSubmit, reset } = useForm<ForgotPasswordRequest>();
  const { isPending, mutateAsync } = useForgotPassword();

  const handleSubmitEmail = async (data: ForgotPasswordRequest) => {
    console.log(data);
    await mutateAsync(data);
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
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="e.g. username@gmail.com"
              error={!!error}
              helperText={error?.message ?? ' '}
              {...field}
            />
          )}
        />

        <Button
          variant="contained"
          type="submit"
          disabled={isPending}
          sx={{
            borderRadius: 20,
            height: { xs: 44, sm: 48, md: 36 },
            fontSize: { xs: '1rem', sm: '0.9375rem', md: '0.875rem' },
            bgcolor: isPending ? '#bbdefb' : 'primary.main',
            color: '#fff',
            '&.Mui-disabled': {
              bgcolor: '#64b5f6',
              color: '#fff',
            },
            mt: 2.5,
          }}
        >
          Reset my password
        </Button>

        <Typography align="center" color="textSecondary" sx={{ mt: { xs: 1, md: 2 } }}>
          <Box component={Link} to="/auth/login" sx={{ color: 'primary.main', fontWeight: 500 }}>
            Back to Login
          </Box>
        </Typography>
      </Box>
    </div>
  );
}
