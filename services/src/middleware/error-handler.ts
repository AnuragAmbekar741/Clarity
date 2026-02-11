import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors.js";
import { env } from "../config/env.js";
import { QueryFailedError, EntityNotFoundError } from "typeorm";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Handle custom AppError instances
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Handle TypeORM QueryFailedError (e.g., unique constraint violations)
  if (err instanceof QueryFailedError) {
    // PostgreSQL unique violation error code
    if ((err as any).code === "23505") {
      return res.status(400).json({
        status: "error",
        message: "Duplicate entry. This record already exists.",
      });
    }

    // PostgreSQL foreign key violation
    if ((err as any).code === "23503") {
      return res.status(400).json({
        status: "error",
        message: "Cannot perform operation due to foreign key constraint.",
      });
    }

    // Generic database error
    const message =
      env.NODE_ENV === "production"
        ? "Database operation failed"
        : err.message;

    return res.status(500).json({
      status: "error",
      message,
    });
  }

  // Handle TypeORM EntityNotFoundError
  if (err instanceof EntityNotFoundError) {
    return res.status(404).json({
      status: "error",
      message: "Resource not found",
    });
  }

  // Generic error handler
  const message =
    env.NODE_ENV === "production"
      ? "Internal server error"
      : err.message;

  return res.status(500).json({
    status: "error",
    message,
  });
};
