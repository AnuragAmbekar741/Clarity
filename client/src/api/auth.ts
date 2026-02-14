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
    // TODO: Add logout endpoint to backend if needed
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  getCurrentUser: async () => {
    // TODO: Add endpoint to fetch current user from backend
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};
