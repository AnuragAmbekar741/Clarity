import { DataSource } from "typeorm";
import { env } from "./env.js";

export default new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: ["src/entities/**/*.ts"], // Use .ts for migration generation
  migrations: ["src/migrations/**/*.ts"], // Use .ts for migration generation
  synchronize: false, // Always false when using migrations
});
