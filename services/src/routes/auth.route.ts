import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler.js";
import { AuthController } from "../modules/auth/auth.controller.js";
import { guard } from "../middleware/auth.js";
const router = Router();

const auth = new AuthController();

router.post(
  "/google/callback",
  asyncHandler((req, res) => auth.googleCallback(req, res))
);
router.post(
  "/refresh-token",
  asyncHandler((req, res) => auth.refreshAccessToken(req, res))
);
router.get(
  "/me",
  guard,
  asyncHandler((req, res) => auth.me(req, res))
);
router.post(
  "/logout",
  asyncHandler((req, res) => auth.logout(req, res))
);

export default router;
