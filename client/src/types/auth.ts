export interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface GoogleAuthState {
  loading: boolean;
  error: string | null;
  user: User | null;
}
