import { queryClient } from "@lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { authAPI } from "src/services/auth";
import { clearTokens } from "src/utils/token";

export const useLogout = () => {
    return useMutation({
    mutationFn: authAPI.logout,
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ['user'] });
      queryClient.setQueryData(['user'], undefined);
    },
    onSuccess: () => {
      clearTokens();
      queryClient.removeQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error(error);
      queryClient.removeQueries({ queryKey: ['user'] });
      enqueueSnackbar('Logout failed. Please try again!', { variant: 'error' });
    },
  });
}