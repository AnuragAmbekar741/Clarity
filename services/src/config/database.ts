import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./env.js";
import { User } from "../entities/User.entity.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  ssl: env.DB_HOST !== "localhost" ? { rejectUnauthorized: false } : false,

  // Entities - explicitly loaded
  entities: [User],

  // Migrations - TypeORM will load all migration files from this directory
  migrations: ["dist/migrations/*.js"],

  // Subscribers for entity lifecycle events
  subscribers: ["dist/subscribers/*.js"],

  // Development settings
  synchronize: env.NODE_ENV === "development", // Auto-sync schema (NEVER use in production)
  logging: env.NODE_ENV === "development", // Log SQL queries in development

  // Connection pool settings
  extra: {
    max: 10, // Maximum number of connections in pool
    idleTimeoutMillis: 30000, // Close idle connections after 30s
  },
});

// Initialize the database connection
export const initializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established successfully");
  } catch (error) {
    console.error("Error during database initialization:", error);
    throw error;
  }
};

// Graceful shutdown
export const closeDatabase = async (): Promise<void> => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
    console.log("Database connection closed");
  }
};
