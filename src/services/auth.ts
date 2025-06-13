import type { RegisterRequest } from "@app-types/auth";
import { apiClient } from "@lib/axios";

export const authAPI = {
    register: async (data: RegisterRequest) => {
        const res = await apiClient.post("/auth/sign-up", data);
        return res.data;
    }

}