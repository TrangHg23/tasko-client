import { useLogin } from "./useLogin";
import { useLogout } from "./useLogout";
import { useRegister } from "./useRegister";
import { useUser } from "./useUser";

export const useAuth = () => {
  const { data: user, isLoading, isError } = useUser();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !isError,
    loginMutation,
    registerMutation,
    logoutMutation,
  };
};

