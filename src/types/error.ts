import type { AxiosError } from "axios";

function isAxiosError<T = any, D = any>(error: any): error is AxiosError<T, D> {
  return (error?.isAxiosError === true);
}

export default isAxiosError;
