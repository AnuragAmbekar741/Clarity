import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler.js";
const router = Router();

router.post(
  "/auth/google/callback",
  asyncHandler(authController.googleCallback)
);

export default router;
