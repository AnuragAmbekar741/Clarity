import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/errors.js";
import { verifyAccessToken } from "../utils/jwt.js";

export const guard = (req: Request, res: Response, next: NextFunction) => {
  console.log('[AuthGuard] Checking access token for:', req.method, req.path);
  const token = req.cookies.access_token;
  if (!token) {
    console.log('[AuthGuard] Access token missing');
    return next(new UnauthorizedError("Access token missing"));
  }
  try {
    const decode = verifyAccessToken(token);
    req.user = { userId: decode.userId, email: decode.email };
    console.log('[AuthGuard] Access token valid for user:', decode.userId);
    next();
  } catch (error) {
    console.log('[AuthGuard] Access token verification failed:', error instanceof Error ? error.message : 'Unknown error');
    return next(new UnauthorizedError("Invalid or expired access token"));
  }
};
