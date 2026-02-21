export interface User {
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthResponse {
  user: User;
  expiresAt?: number;
}

export interface GoogleAuthState {
  loading: boolean;
  error: string | null;
  user: User | null;
}
