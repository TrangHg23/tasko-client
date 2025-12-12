import { enqueueSnackbar } from 'notistack';

export const handleApiError = (error: any, allowedCodes: number[] = []) => {
  const data = error.response?.data;
  const message =
    data?.status && allowedCodes.length > 0 && allowedCodes.includes(data.status)
      ? data.message
      : 'Something went wrong!';
  enqueueSnackbar(message, { variant: 'error' });
};
