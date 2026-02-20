export interface ApiResponse<T> {
  status: string;
  data: T;
}

export interface AuthResponse {
  user: User;
  expiresAt?: number;
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

export interface GmailAccount {
  id: string;
  googleEmail: string;
  isDefault: boolean;
  createdAt: string;
  expiresAt: string;
}
