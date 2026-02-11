import { Router } from "express";
import healthRoutes from "./health.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/user", userRouter);

export default router;
