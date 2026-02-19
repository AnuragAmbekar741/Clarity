import { Request, Response } from "express";
import { UnauthorizedError } from "../../utils/errors.js";
import { gmailAuthService } from "./gmail.auth.service.js";

export class GmailController {
  async getAuthUrl(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) throw new UnauthorizedError("User not authenticated");

    const url = await gmailAuthService.getAuthUrl(userId);

    return res.status(200).json({
      status: "success",
      data: { url },
    });
  }

  async callback(req: Request, res: Response) {
    const { code, state } = req.query;

    if (
      !code ||
      !state ||
      typeof code !== "string" ||
      typeof state !== "string"
    ) {
      const errorUrl = `${
        process.env.CLIENT_URL || "http://localhost:5173"
      }/gmail/error?reason=invalid_params`;
      return res.redirect(errorUrl);
    }

    try {
      const gmailAccount = await gmailAuthService.handleCallback(code, state);

      // Redirect to frontend success page with account info
      const successUrl = `${
        process.env.CLIENT_URL || "http://localhost:5173"
      }/gmail/success?email=${encodeURIComponent(
        gmailAccount.googleEmail
      )}&accountId=${gmailAccount.id}`;
      return res.redirect(successUrl);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      const errorUrl = `${
        process.env.CLIENT_URL || "http://localhost:5173"
      }/gmail/error?reason=${encodeURIComponent(errorMessage)}`;
      return res.redirect(errorUrl);
    }
  }

  async getAccounts(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) throw new UnauthorizedError("User not authenticated");

    const accounts = await gmailAuthService.getAccounts(userId);

    // Return safe fields only (don't expose tokens)
    const safeAccounts = accounts.map((account) => ({
      id: account.id,
      googleEmail: account.googleEmail,
      isDefault: account.isDefault,
      createdAt: account.createdAt,
      expiresAt: account.expiresAt,
    }));

    return res.status(200).json({
      status: "success",
      data: { accounts: safeAccounts },
    });
  }

  async revokeAccount(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) throw new UnauthorizedError("User not authenticated");

    const { id: accountId } = req.params;
    if (!accountId || typeof accountId !== "string") {
      throw new UnauthorizedError("Invalid account ID");
    }

    await gmailAuthService.revokeAccount(accountId, userId);

    return res.status(200).json({
      status: "success",
      message: "Gmail account revoked successfully",
    });
  }
}
