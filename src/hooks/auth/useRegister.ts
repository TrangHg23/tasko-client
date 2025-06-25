import isAxiosError from "@app-types/error";
import { queryClient } from "@lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { authAPI } from "src/services/auth";
import { setTokens } from "src/utils/token";

export const useRegister = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: authAPI.register,
        onSuccess: async(_, variables) => {
          const res = await authAPI.login({ 
            email: variables.email,
            password: variables.password
          })
          setTokens(res.accessToken, res.refreshToken);
          queryClient.invalidateQueries({ queryKey: ['user']})
          enqueueSnackbar('Sign up successfully!', { variant: 'success' });
          navigate('/');
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response?.data?.status === 1004) {
                enqueueSnackbar(error.response?.data?.message, { variant: 'warning' });
            } else {
          enqueueSnackbar('Something went wrong, please try again', { variant: 'error' });
        }},
    });
    
}