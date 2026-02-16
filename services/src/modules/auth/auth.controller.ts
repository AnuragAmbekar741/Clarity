import { Request, Response, CookieOptions } from "express";
import ms from "ms";
import { ValidationError } from "../../utils/errors.js";
import { AuthService } from "./auth.service.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import { env } from "../../config/env.js";

const isProduction = env.NODE_ENV === "production";

const cookieDefaults: CookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "strict" : "lax",
};

export class AuthController {
  private authService = new AuthService();

  async googleCallback(req: Request, res: Response) {
    const { idToken } = req.body;
    if (!idToken) throw new ValidationError("idToken required");
    const result = await this.authService.googleCallback(idToken);
    const { name, email, avatar } = result.user;
    const tokenPayload = {
      email: email,
      id: result.user.id,
    };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);
    res.cookie("access_token", accessToken, {
      ...cookieDefaults,
      maxAge: ms((env.JWT_ACCESS_EXPIRES_IN || "15m") as ms.StringValue),
    });
    res.cookie("refresh_token", refreshToken, {
      ...cookieDefaults,
      maxAge: ms((env.JWT_REFRESH_EXPIRES_IN || "7d") as ms.StringValue),
    });
    return res.status(200).json({
      status: "success",
      data: { user: { name, email, avatar } },
    });
  }
}
