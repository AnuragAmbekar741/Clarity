import { OAuth2Client } from "google-auth-library";
import { env } from "../../config/env.js";
import {
  GoogleTokenPayload,
  GoogleUserData,
  AuthResponse,
} from "../../types/google.js";
import { userService } from "../user/user.service.js";

export class AuthService {
  private GOOGLE_CLIENT: OAuth2Client;

  constructor() {
    this.GOOGLE_CLIENT = new OAuth2Client({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
    });
  }

  private async verifyAndExtractUser(idToken: string): Promise<GoogleUserData> {
    const ticket = await this.GOOGLE_CLIENT.verifyIdToken({
      idToken: idToken,
      audience: env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload() as GoogleTokenPayload;

    const { sub: googleId, email, name, picture } = payload;

    return {
      googleId,
      email,
      name,
      avatar: picture,
    };
  }

  async googleCallback(idToken: string): Promise<AuthResponse> {
    const userData = await this.verifyAndExtractUser(idToken);
    const user = await userService.findOrCreateUser(userData);
    return {
      user,
    };
  }
}
