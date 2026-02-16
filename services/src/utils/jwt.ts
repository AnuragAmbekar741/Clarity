import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import { env } from "../config/env.js";

type TokenUser = {
  id: string;
  email: string;
};

export function generateAccessToken(user: TokenUser): string {
  if (!env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET is not defined");
  }
  const payload = { userId: user.id, email: user.email };
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {
    expiresIn: (env.JWT_ACCESS_EXPIRES_IN || "15m") as StringValue,
  });
}

export function generateRefreshToken(user: TokenUser): string {
  if (!env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not defined");
  }
  const payload = { userId: user.id };
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
    expiresIn: (env.JWT_REFRESH_EXPIRES_IN || "7d") as StringValue,
  });
}
