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
  access_token: string;
  id_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
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
  accessToken: string; // Your JWT
  refreshToken?: string; // Google's refresh token
  user: GoogleUserData;
}
