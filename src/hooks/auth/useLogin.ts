import { queryClient } from "@lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { authAPI } from "src/services/auth";
import { setTokens } from "src/utils/token";

export const useLogin = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    return useMutation({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      enqueueSnackbar('Log in successfully!', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/');
    },
    onError: (error) => {
      console.log(error);
      enqueueSnackbar('Something went wrong when trying login', { variant: 'error' });
    },
  });
}