import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { authAPI } from 'src/services/auth';

export const useForgotPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation({
    mutationFn: authAPI.forgotPassword,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, { variant: 'success' });
    },
    onError: (error) => {
      console.log(error);
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    },
  });
};
