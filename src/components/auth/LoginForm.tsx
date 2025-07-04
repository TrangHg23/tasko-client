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
          mt: { xs: 1, md: 3 },
          mb: { xs: 2, sm: 3, md: 4 },
          px: { xs: 2, sm: 0 },
        }}
      >
        <Typography variant="h1" fontWeight="bold" gutterBottom>
          Welcome to Tasko
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Organize and get things done.
        </Typography>
      </Box>

      <Box
        component="form"
        sx={{
          width: { xs: '100%', sm: '85%', md: '80%', lg: '400px' },
          px: { xs: 2, sm: 3 },
          mx: 'auto',
        }}
        onSubmit={handleSubmit(handleLogin)}
      >
        <Stack spacing={{ xs: 1, md: 2 }}>
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
            sx={{ bgcolor: 'primary.main', mb: { xs: 1 }, borderRadius: 20 }}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Logging in...' : 'Login'}
          </Button>

          <Typography align="center" color="textSecondary">
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
