import { apiClient } from "@/services/global.client";
import type { AuthResponse } from "@/types/auth";

export const authService = {
  googleLogin: async (idToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/api/auth/google/callback",
      { idToken }
    );
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/api/auth/logout");
  },

  getCurrentUser: async () => {
    const response = await apiClient.get("/api/auth/me");
    return response.data;
  },
};
