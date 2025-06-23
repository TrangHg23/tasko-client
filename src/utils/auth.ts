import { queryClient } from "@lib/queryClient";
import { clearTokens } from "./token";

export const handleAuthError = () => {
    clearTokens();
    queryClient.clear();
    window.location.href = '/auth/login';
};