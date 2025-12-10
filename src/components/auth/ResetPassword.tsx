import { Typography, Button, Box, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import InputField from './InputField';
import { useState } from 'react';

type ResetPasswordProps = {
  newPassword: string;
  confirmPassword: string;
};
export default function ResetPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ResetPasswordProps>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmitData = (data: any) => {
    console.log(data);
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
          mt: 3,
          mb: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontSize: { xs: '1.5rem', sm: '1.625rem', md: '1.375rem' }, fontWeight: 600 }}
        >
          Password Reset
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
          Please enter new password for your Tasko account.
        </Typography>
      </Box>

      <Box
        component="form"
        sx={{
          width: { xs: '100%', sm: '85%', md: '80%', lg: '360px' },
          mx: 'auto',
        }}
        onSubmit={handleSubmit(handleSubmitData)}
      >
        <Stack spacing={1}>
          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            rules={{
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
            }}
            render={({ field }) => (
              <InputField
                type={showPassword ? 'text' : 'password'}
                label="Enter a new password"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message || ' '}
                showPasswordToggle
                onTogglePassword={() => setShowPassword((prev) => !prev)}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            rules={{
              required: 'Confirm Password is required',
              validate: (value) => value === watch('newPassword') || 'Passwords do not match',
            }}
            render={({ field }) => (
              <InputField
                type={showConfirmPassword ? 'text' : 'password'}
                label="Confirm your new password"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message || ' '}
                showPasswordToggle
                onTogglePassword={() => setShowConfirmPassword((prev) => !prev)}
              />
            )}
          />

          <Button
            variant="contained"
            type="submit"
            //   disabled={isPending}
            sx={{
              borderRadius: 20,
              height: { xs: 44, sm: 48, md: 36 },
              fontSize: { xs: '1rem', sm: '0.9375rem', md: '0.875rem' },
              // bgcolor: isPending ? '#bbdefb' : 'primary.main',
              color: '#fff',
              '&.Mui-disabled': {
                bgcolor: '#64b5f6',
                color: '#fff',
              },
              mt: 2,
            }}
          >
            Reset my password
          </Button>
        </Stack>
      </Box>
    </div>
  );
}
