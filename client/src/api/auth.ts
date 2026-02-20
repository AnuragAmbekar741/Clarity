import { apiClient } from "@/services/global.client";
import type { ApiResponse, AuthResponse } from "@/types/auth";

export const authService = {
  googleLogin: async (idToken: string): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
      "/api/auth/google/callback",
      { idToken }
    );
    const data = response.data.data;
    if (data.expiresAt) {
      localStorage.setItem("token_expires_at", data.expiresAt.toString());
    }
    return data;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem("token_expires_at");
    await apiClient.post("/api/auth/logout");
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    const response = await apiClient.get<ApiResponse<AuthResponse>>(
      "/api/auth/me"
    );
    return response.data.data;
  },

  refreshToken: async (): Promise<void> => {
    const response = await apiClient.post<{
      status: string;
      expiresAt?: number;
    }>("/api/auth/refresh-token");
    // Update stored expiration time
    if (response.data.expiresAt) {
      localStorage.setItem(
        "token_expires_at",
        response.data.expiresAt.toString()
      );
    }
  },
};
