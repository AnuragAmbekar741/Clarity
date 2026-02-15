import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler.js";
import { AuthController } from "../modules/auth/auth.controller.js";
const router = Router();

const auth = new AuthController();

router.post("/google/callback", asyncHandler((req, res) => auth.googleCallback(req, res)));

export default router;
