import { apiClient } from "@/services/global.client";
import type { ApiResponse, AuthResponse } from "@/types/auth";

export const authService = {
  googleLogin: async (idToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/api/auth/google/callback",
      { idToken }
    );
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/api/auth/logout");
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    const response = await apiClient.get<ApiResponse<AuthResponse>>("/api/auth/me");
    return response.data.data;
  },

  refreshToken: async (): Promise<void> => {
    await apiClient.post("/api/auth/refresh-token");
  },
};
