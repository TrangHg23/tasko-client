import { Button, Typography, Box, Stack } from '@mui/material';
import InputField from './InputField';
import { Link } from 'react-router';
import { Controller, useForm} from 'react-hook-form';
import { useState } from 'react';
import type { RegisterRequest } from '@app-types/auth';
import { useAuth } from '@hooks/auth/useAuth';


function RegisterForm () {
    const { control, handleSubmit, formState: { errors }, reset } = useForm<RegisterRequest>();
    const [showPassword, setShowPassword] = useState(false);
    
    const { registerMutation } = useAuth();

    const handleRegister = async (data : RegisterRequest) => {
        await registerMutation.mutateAsync(data)
        reset();
    }

    return (
        <Box>
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
                <Typography variant="h4" fontWeight="bold" gutterBottom>Create new account</Typography>
                <Typography variant="body1" color="textSecondary">
                    Start managing your tasks today.
                </Typography>
            </Box>

            <Box 
                component="form" 
                sx={{ 
                    width: {xs: '100%', sm: '80%', md: '85%', lg: '400px'},
                    px: { xs: 2,  sm: 3,  md: 0},
                    mx: 'auto'
                }}
                onSubmit={handleSubmit(handleRegister)}
            >
            <Stack spacing={{xs: 1, md: 2}}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                        <InputField
                            type="text"
                            label="Name"
                            autoComplete="new-name"
                            value={field.value ?? ""}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            error={!!errors.name}
                            helperText={errors.name?.message || " "}
                        />
                    )}
                />
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
                            autoComplete="new-email"
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
                        autoComplete="new-password"
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

                <Button 
                    type='submit' fullWidth variant="contained" sx={{ bgcolor: 'primary.main', mb: {xs: 1} }} 
                    disabled={registerMutation.isPending}
                >
                    {registerMutation.isPending ? 'Signing up...' : 'Sign up'}
                </Button>

                <Typography align="center" color="textSecondary">
                    {`Already have an account? `}
                <Box
                    component={Link}
                    to="/auth/login"
                    sx={{ color: 'primary.main', fontWeight: 500 }}
                >
                    Log in
                </Box>
                </Typography>
            </Stack>
            </Box>
        </Box>
    ) 

};

export default RegisterForm;
