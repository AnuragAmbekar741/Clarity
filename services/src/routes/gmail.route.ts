import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler.js";
import { GmailController } from "../modules/gmail/gmail.controller.js";
import { guard } from "../middleware/auth.js";

const router = Router();
const gmailController = new GmailController();

/**
 * GET /api/gmail/auth-url
 * Get the Google OAuth URL for authorizing Gmail access
 * Protected: requires authentication
 */
router.get(
  "/auth-url",
  guard,
  asyncHandler((req, res) => gmailController.getAuthUrl(req, res))
);

/**
 * GET /api/gmail/callback
 * OAuth callback endpoint - Google redirects here after user authorizes
 * Public: no authentication required (state parameter provides security)
 */
router.get(
  "/callback",
  asyncHandler((req, res) => gmailController.callback(req, res))
);

/**
 * GET /api/gmail/accounts
 * Get all Gmail accounts connected by the authenticated user
 * Protected: requires authentication
 */
router.get(
  "/accounts",
  guard,
  asyncHandler((req, res) => gmailController.getAccounts(req, res))
);

/**
 * DELETE /api/gmail/accounts/:id
 * Revoke a Gmail account and disconnect it
 * Protected: requires authentication
 */
router.delete(
  "/accounts/:id",
  guard,
  asyncHandler((req, res) => gmailController.revokeAccount(req, res))
);

export default router;
