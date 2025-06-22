import type { LoginRequest, LogoutRequest, RegisterRequest, User } from "@app-types/auth";
import apiClient from "@lib/axios";

export const authAPI = {
    register: async (data: RegisterRequest) => {
        const res = await apiClient.post("/auth/sign-up", data);
        return res.data;
    },

    login: async(data: LoginRequest) => {
        const res = await apiClient.post("/auth/log-in", data);
        return res.data;
    },

    logout: async(data: LogoutRequest) => {
        await apiClient.post("/auth/log-out", data);
    },
    fetchUser: async () : Promise<User> => {
        const res = await apiClient.get("/auth/me")
        return res.data;
    }

}