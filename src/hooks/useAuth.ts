import { AuthContext } from "@contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "src/services/auth";

export const useAuth = () =>  {
    const context = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    if(!context) throw new Error('useAuth must be used within an AuthProvider')
        
    const registerMutation = useMutation({
        mutationFn: authAPI.register,
        onSuccess: () => {
            enqueueSnackbar('Sign up successfully!', {variant: 'success'});
            navigate('/auth/login')
        },
         onError: () => {
            enqueueSnackbar('Something went wrong, please try again', {variant: 'error'});
        }
    });

    const loginMutation = useMutation({
        mutationFn: authAPI.login,
        onSuccess: (data) => {
            enqueueSnackbar('Log in successfully!', {variant: 'success'});
            context.login(data.accessToken);
            navigate('/');
        },
        onError: (error) => {
            console.log(error)
            enqueueSnackbar('Something went wrong when trying login', {variant: 'error'});
        }
    })

    return {
        ...context,
        registerMutation,
        loginMutation
    };

}