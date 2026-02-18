import "reflect-metadata";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import router from "./routes/index.js";
import { errorHandler } from "./middleware/error-handler.js";
import { initializeDatabase, closeDatabase } from "./config/database.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use(cookieParser());

// All routes go through the central router with /api prefix
app.use("/api", router);

// Error handler MUST be registered after all routes
app.use(errorHandler);

// Initialize database and start server
const startServer = async () => {
  try {
    // Initialize database connection
    await initializeDatabase();

    // Start Express server
    app.listen(env.PORT, () => {
      console.log(`Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Graceful shutdown handlers
process.on("SIGTERM", async () => {
  console.log("SIGTERM signal received: closing HTTP server");
  await closeDatabase();
  process.exit(0);
});

process.on("SIGINT", async () => {
  console.log("SIGINT signal received: closing HTTP server");
  await closeDatabase();
  process.exit(0);
});

startServer();
