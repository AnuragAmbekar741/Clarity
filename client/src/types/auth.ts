export interface ApiResponse<T> {
  status: string;
  data: T;
}

export interface AuthResponse {
  user: User;
}

export interface User {
  email: string;
  name: string;
  avatar?: string;
}

export interface GoogleAuthState {
  loading: boolean;
  error: string | null;
  user: User | null;
}
