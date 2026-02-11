import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors.js";
import { env } from "../config/env.js";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  const message =
    env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message;

  return res.status(500).json({
    status: "error",
    message,
  });
};
