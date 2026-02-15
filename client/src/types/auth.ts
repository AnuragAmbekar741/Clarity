export interface AuthResponse {
  user: {
    googleId: string;
    email: string;
    name: string;
    avatar?: string;
  };
}

export interface User {
  googleId: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface GoogleAuthState {
  loading: boolean;
  error: string | null;
  user: User | null;
}
