import { queryClient } from '@lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { authAPI } from 'src/services/auth';
import { handleApiError } from 'src/utils/handleApiError';
import { setTokens } from 'src/utils/token';

export const useRegister = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: authAPI.register,
    onSuccess: async (_, variables) => {
      const res = await authAPI.login({
        email: variables.email,
        password: variables.password,
      });
      setTokens(res.accessToken, res.refreshToken);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      enqueueSnackbar('Sign up successfully!', { variant: 'success' });
      navigate('/today');
    },
    onError: (error) => {
      handleApiError(error, [1004]);
    },
  });
};
