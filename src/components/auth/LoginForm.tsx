import { Button, Typography, Box, Stack } from '@mui/material';
import InputField from './InputField';
import { Link } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import type { LoginRequest } from '@app-types/auth';
import { useAuth } from '@hooks/auth/useAuth';

function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginRequest>();
  const [showPassword, setShowPassword] = useState(false);
  const { loginMutation } = useAuth();

  const handleLogin = async (data: LoginRequest) => {
    await loginMutation.mutateAsync(data);
    reset();
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
          mt: 1,
          mb: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontSize: { xs: '1.5rem', sm: '1.625rem', md: '1.375rem' }, fontWeight: 600 }}
        >
          Welcome to Tasko
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '0.9375rem' },
            lineHeight: 1.45,
            color: 'text.secondary',
          }}
        >
          Organize and get things done.
        </Typography>
      </Box>

      <Box
        component="form"
        sx={{
          width: { xs: '100%', sm: '85%', md: '80%', lg: '360px' },
          mx: 'auto',
        }}
        onSubmit={handleSubmit(handleLogin)}
      >
        <Stack spacing={1}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: 'Email is invalid',
              },
            }}
            render={({ field }) => (
              <InputField
                type="email"
                label="Email"
                autoComplete="email"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!errors.email}
                helperText={errors.email?.message || ' '}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
            }}
            render={({ field }) => (
              <InputField
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                label="Password"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!errors.password}
                helperText={errors.password?.message || ' '}
                showPasswordToggle
                onTogglePassword={() => setShowPassword((prev) => !prev)}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              bgcolor: 'primary.main',
              mb: { xs: 1 },
              borderRadius: 20,
              height: { xs: 44, sm: 48, md: 36 },
              fontSize: { xs: '1rem', sm: '0.9375rem', md: '0.875rem' },
              fontWeight: 600,
              mt: 2,
            }}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </Button>

          <Typography align="center" color="textSecondary" sx={{ mt: { xs: 1, md: 2 } }}>
            {`Don't have an account? `}
            <Box component={Link} to="/auth/signup" sx={{ color: 'primary.main', fontWeight: 500 }}>
              Sign up
            </Box>
          </Typography>
        </Stack>
      </Box>
    </div>
  );
}

export default LoginForm;
