import { User } from "../entities/User.entity.js";

interface GoogleTokenPayload {
  sub: string; // googleId
  email: string;
  name: string;
  picture?: string;
  email_verified: boolean;
  iat: number;
  exp: number;
  aud: string;
}

// 2. Google's Token Response
interface GoogleTokenResponse {
  id_token: string;
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

// 3. Your App's User Data (extracted from Google)
interface GoogleUserData {
  googleId: string;
  email: string;
  name: string;
  avatar?: string;
}

// 4. Final Response to Frontend
interface AuthResponse {
  user: User;
}

export {
  GoogleTokenPayload,
  GoogleTokenResponse,
  GoogleUserData,
  AuthResponse,
};
