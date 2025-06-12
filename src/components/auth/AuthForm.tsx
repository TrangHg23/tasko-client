import { Button, Typography, Box, Stack } from '@mui/material';
import { useState } from 'react';
import InputField from './InputField';
import { Link } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';

type AuthMode = 'login' | 'signup';

interface IFormData {
  name?: string;
  email: string;
  password: string;
}

const variants = {
  initial: { opacity: 0, scale: 0.98, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: -10 },
  transition: { duration: 0.25, ease: 'easeOut' }
};


const AuthForm = ({ mode }: { mode: AuthMode }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<IFormData>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: IFormData) => {
    console.log(`${mode} data`, data);
    reset();
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={variants.transition}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            mt: {xs: 1},
            mb: {xs: 2, sm: 3, md: 4},
            px: {xs: 2, sm: 0}
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {mode === 'signup' ? 'Create new account' : 'Welcome to Tasko'}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {mode === 'login' ? 'Organize and get things done.' : 'Start managing your tasks today.'}
          </Typography>
        </Box>

        <Box 
          component="form" 
          sx={{ 
            width: {xs: '100%', sm: '80%', md: '85%', lg: '400px'},
            px: { xs: 2,  sm: 3,  md: 0},
            mx: 'auto'
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={{xs: 1.5, md: 2}}>
            {mode === 'signup' && (
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <InputField
                    type="text"
                    label="Name"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={!!errors.name}
                    helperText={errors.name?.message || " "}
                  />
                )}
              />
            )}

            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Email is invalid",
                },
              }}
              render={({ field }) => (
                <InputField
                  type="email"
                  label="Email"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={!!errors.email}
                  helperText={errors.email?.message || " "}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" }
                  
              }}
              render={({ field }) => (
                <InputField
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  error={!!errors.password}
                  helperText={errors.password?.message || " "}
                  showPasswordToggle
                  onTogglePassword={() => setShowPassword(prev => !prev)}
                />
              )}
            />

            <Button type='submit' fullWidth variant="contained" sx={{ bgcolor: 'primary.main', mb: {xs: 1} }}>
              {mode === 'signup' ? 'Sign up' : 'Log in'}
            </Button>

            <Typography align="center" color="textSecondary">
              {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
              <Box
                component={Link}
                to={mode === 'signup' ? "/login" : "/signup"}
                sx={{ color: 'primary.main', fontWeight: 500 }}
              >
                {mode === 'signup' ? 'Log in' : 'Sign up'}
              </Box>
            </Typography>
          </Stack>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthForm;
