import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/errors.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const guard = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;
  if (!token) return next(new UnauthorizedError("Access token missing"));
  try {
    const decode = verifyAccessToken(token);
    req.user = { userId: decode.userId, email: decode.email };
    next();
  } catch {
    return next(new UnauthorizedError("Invalid or expired access token"));
  }
};
