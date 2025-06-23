import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "src/utils/token";
import { authAPI } from "src/services/auth";
import type { User } from "@app-types/auth";
import isAxiosError from "@app-types/error";

export const useUser = () => {
    const token = getAccessToken();
    return useQuery<User>({
        queryKey: ['user'],
        queryFn: authAPI.fetchUser,
        enabled: !!token,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: true,
        retry: (failureCount, error) => {
        if (isAxiosError(error) && error.response?.status === 401) {
            return false;
        }
        return failureCount < 3;
        },
    });
}
