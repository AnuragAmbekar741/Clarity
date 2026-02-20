import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor - proactively refresh token before expiry
apiClient.interceptors.request.use(async (config) => {
  const expiresAt = localStorage.getItem("token_expires_at");

  // Skip refresh endpoint to avoid infinite loop
  if (config.url?.includes("/api/auth/refresh-token")) {
    return config;
  }

  // Check if token expires within 60 seconds
  if (expiresAt) {
    const expiresAtTime = parseInt(expiresAt, 10);
    const now = Date.now();
    const timeUntilExpiry = expiresAtTime - now;

    console.log(
      "[Axios RequestInterceptor] Token expires in",
      Math.round(timeUntilExpiry / 1000),
      "seconds"
    );

    // If token expires within 60 seconds, refresh it first
    if (timeUntilExpiry < 60000 && timeUntilExpiry > 0) {
      console.log(
        "[Axios RequestInterceptor] Token expiring soon, refreshing proactively..."
      );
      try {
        const response = await apiClient.post("/api/auth/refresh-token");
        const newExpiresAt = response.data.expiresAt;
        localStorage.setItem("token_expires_at", newExpiresAt.toString());
      } catch (error) {
        console.log(
          "[Axios RequestInterceptor] Token refresh failed, clearing auth and redirecting"
        );
        localStorage.removeItem("token_expires_at");
        window.location.href = "/auth";
        return Promise.reject(error);
      }
    } else if (timeUntilExpiry <= 0) {
      // Token already expired
      localStorage.removeItem("token_expires_at");
      window.location.href = "/auth";
      return Promise.reject(new Error("Token expired"));
    }
  }

  return config;
});

// Response interceptor - try token refresh on 401 as fallback
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    console.log("[Axios ResponseInterceptor] Error caught:", {
      status: error.response?.status,
      url: originalRequest?.url,
      retry: originalRequest?._retry,
    });

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/api/auth/")
    ) {
      console.log(
        "[Axios ResponseInterceptor] 401 detected, attempting token refresh..."
      );
      originalRequest._retry = true;

      try {
        const response = await apiClient.post("/api/auth/refresh-token");
        const newExpiresAt = response.data.expiresAt;
        localStorage.setItem("token_expires_at", newExpiresAt.toString());
        return apiClient(originalRequest);
      } catch {
        console.log(
          "[Axios ResponseInterceptor] Token refresh failed, redirecting to /auth"
        );
        localStorage.removeItem("token_expires_at");
        window.location.href = "/auth";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
