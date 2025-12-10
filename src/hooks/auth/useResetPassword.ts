import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { authAPI } from 'src/services/auth';

export const useResetPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authAPI.resetPassword,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: 'success' });
      navigate('/today');
    },
    onError: () => {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    },
  });
};
