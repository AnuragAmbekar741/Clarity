import { Router } from "express";
import healthRoutes from "./health.routes.js";
import authRoutes from "./auth.route.js";
import gmailRoutes from "./gmail.route.js";
const router = Router();

router.use("/health", healthRoutes);
router.use("/auth", authRoutes);
router.use("/gmail", gmailRoutes);
export default router;
