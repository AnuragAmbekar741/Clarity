import "dotenv/config";

export const env = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",

  // Database configuration
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: parseInt(process.env.DB_PORT || "5432"),
  DB_USERNAME: process.env.DB_USERNAME || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "postgres",
  DB_NAME: process.env.DB_NAME || "clarity_db",

  // Google OAuth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  GOOGLE_REDIRECT_URI:
    process.env.GOOGLE_REDIRECT_URI ||
    "http://localhost:8000/api/auth/google/callback",

  // Gmail OAuth (separate callback from sign-in)
  GMAIL_REDIRECT_URI:
    process.env.GMAIL_REDIRECT_URI ||
    "http://localhost:8000/api/gmail/callback",

  // JWT ACCESS and REFRESH
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "",
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "1m",

  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
};
