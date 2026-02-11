import express from "express";
import helmet from "helmet";
import cors from "cors";
import { env } from "./config/env.js";
import router from "./routes/index.js";
import { errorHandler } from "./middleware/error-handler.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(express.json());

// All routes go through the central router with /api prefix
app.use("/api", router);

// Error handler MUST be registered after all routes
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
