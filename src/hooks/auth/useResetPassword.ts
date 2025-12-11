import { queryClient } from '@lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { authAPI } from 'src/services/auth';
import { setTokens } from 'src/utils/token';

export const useResetPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authAPI.resetPassword,
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      enqueueSnackbar('Reset password successfully!', { variant: 'success' });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      navigate('/today');
    },
    onError: () => {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    },
  });
};
