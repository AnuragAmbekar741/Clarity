import { Request, Response, CookieOptions } from "express";
import ms from "ms";
import { UnauthorizedError, ValidationError } from "../../utils/errors.js";
import { AuthService } from "./auth.service.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.js";
import { env } from "../../config/env.js";
import { userService } from "../user/user.service.js";

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

    const accessTokenMaxAge = ms(env.JWT_ACCESS_EXPIRES_IN as ms.StringValue);
    const refreshTokenMaxAge = ms(env.JWT_REFRESH_EXPIRES_IN as ms.StringValue);

    res.cookie("access_token", accessToken, {
      ...cookieDefaults,
      maxAge: accessTokenMaxAge,
    });
    res.cookie("refresh_token", refreshToken, {
      ...cookieDefaults,
      maxAge: refreshTokenMaxAge,
    });

    return res.status(200).json({
      status: "success",
      data: {
        user: { name, email, avatar },
        expiresAt: Date.now() + accessTokenMaxAge,
      },
    });
  }

  async refreshAccessToken(req: Request, res: Response) {
    console.log(
      "[RefreshToken] Refresh token endpoint called at",
      new Date().toISOString()
    );
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      console.log("[RefreshToken] ERROR: Refresh token missing from cookies");
      throw new UnauthorizedError("Refresh token missing");
    }
    const decode = verifyRefreshToken(refreshToken);
    console.log("[RefreshToken] Token verified for user:", decode.userId);
    const tokenPayload = {
      email: decode.email,
      id: decode.userId,
    };
    const accessToken = generateAccessToken(tokenPayload);

    const accessTokenMaxAge = ms(
      (env.JWT_ACCESS_EXPIRES_IN || "1m") as ms.StringValue
    );

    res.cookie("access_token", accessToken, {
      ...cookieDefaults,
      maxAge: accessTokenMaxAge,
    });
    return res.status(200).json({
      status: "success",
      expiresAt: Date.now() + accessTokenMaxAge,
    });
  }

  async me(req: Request, res: Response) {
    const user = await userService.findById(req.user!.userId);
    if (!user) throw new UnauthorizedError("User not found");
    return res.status(200).json({
      status: "success",
      data: {
        user: { name: user.name, email: user.email, avatar: user.avatar },
      },
    });
  }

  async logout(_req: Request, res: Response) {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return res.status(200).json({ status: "success" });
  }
}
