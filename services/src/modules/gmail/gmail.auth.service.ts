import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../config/database.js";
import { env } from "../../config/env.js";
import { GmailAccount } from "../../entities/GmailAccount.entity.js";
import {
  UnauthorizedError,
  ValidationError,
  DatabaseError,
} from "../../utils/errors.js";

const GMAIL_SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

export class GmailAuthService {
  private oauth2Client: OAuth2Client;
  private gmailRepo = AppDataSource.getRepository(GmailAccount);

  constructor() {
    this.oauth2Client = new OAuth2Client({
      client_id: env.GOOGLE_CLIENT_ID,
      client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uris: [env.GMAIL_REDIRECT_URI],
    });
  }

  async getAuthUrl(userId: string): Promise<string> {
    if (!userId) {
      throw new ValidationError("userId required");
    }

    // Create a JWT state token that contains userId for verification during callback
    const stateToken = jwt.sign({ userId }, env.JWT_ACCESS_SECRET || "secret", {
      expiresIn: "10m", // State token valid for 10 minutes
    });

    const url = this.oauth2Client.generateAuthUrl({
      access_type: "offline", // Request refresh token
      scope: GMAIL_SCOPES,
      state: stateToken,
    });

    return url;
  }

  async handleCallback(code: string, state: string): Promise<GmailAccount> {
    if (!code || !state) {
      throw new ValidationError("code and state parameters required");
    }

    // Verify and decode the state token to get userId
    let userId: string;
    try {
      const decoded = jwt.verify(state, env.JWT_ACCESS_SECRET || "secret") as {
        userId: string;
      };
      userId = decoded.userId;
    } catch {
      throw new UnauthorizedError("Invalid or expired state parameter");
    }

    try {
      // Exchange authorization code for tokens
      const { tokens } = await this.oauth2Client.getToken(code);
      if (!tokens.access_token) {
        throw new ValidationError("Failed to obtain access token");
      }

      // Set credentials to fetch user info
      this.oauth2Client.setCredentials(tokens);

      // Fetch Gmail user profile to get email and account ID
      const gmail = google.gmail({ version: "v1", auth: this.oauth2Client });
      const profile = await gmail.users.getProfile({ userId: "me" });

      const googleEmail = profile.data.emailAddress;
      // Use email as unique account identifier since Gmail API doesn't provide a distinct ID
      const googleAccountId = googleEmail || "unknown";

      if (!googleEmail || !googleAccountId) {
        throw new ValidationError("Failed to fetch Gmail user info");
      }

      // Calculate token expiration time
      const expiresAt = tokens.expiry_date
        ? new Date(tokens.expiry_date)
        : new Date(Date.now() + 3600 * 1000); // 1 hour fallback

      // Check if account already exists for this user
      const existingAccount = await this.gmailRepo.findOneBy({
        userId,
        googleEmail,
      });

      if (existingAccount) {
        // Update existing account with new tokens
        existingAccount.accessToken = tokens.access_token;
        existingAccount.refreshToken =
          tokens.refresh_token || existingAccount.refreshToken;
        existingAccount.expiresAt = expiresAt;
        existingAccount.scope = GMAIL_SCOPES.join(" ");
        return await this.gmailRepo.save(existingAccount);
      }

      // Create new Gmail account record
      const gmailAccount = this.gmailRepo.create({
        userId,
        googleEmail,
        googleAccountId,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || "",
        expiresAt,
        scope: GMAIL_SCOPES.join(" "),
        isDefault: false, // User can set as default later
      });

      return await this.gmailRepo.save(gmailAccount);
    } catch (error) {
      if (
        error instanceof UnauthorizedError ||
        error instanceof ValidationError
      ) {
        throw error;
      }
      throw new DatabaseError(
        `Failed to handle Gmail callback: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  /**
   * Refreshes an expired access token using the refresh token
   */
  async refreshAccessToken(accountId: string, userId: string): Promise<string> {
    if (!accountId || !userId) {
      throw new ValidationError("accountId and userId required");
    }

    try {
      // Find the account
      const account = await this.gmailRepo.findOneBy({ id: accountId, userId });
      if (!account) {
        throw new UnauthorizedError("Gmail account not found or access denied");
      }

      if (!account.refreshToken) {
        throw new ValidationError(
          "Refresh token not available for this account"
        );
      }

      // Set refresh token and refresh the access token
      this.oauth2Client.setCredentials({
        refresh_token: account.refreshToken,
      });

      const { credentials } = await this.oauth2Client.refreshAccessToken();
      if (!credentials.access_token) {
        throw new ValidationError("Failed to refresh access token");
      }

      // Update the account with new token and expiration
      account.accessToken = credentials.access_token;
      account.expiresAt = credentials.expiry_date
        ? new Date(credentials.expiry_date)
        : new Date(Date.now() + 3600 * 1000);

      await this.gmailRepo.save(account);

      return credentials.access_token;
    } catch (error) {
      if (
        error instanceof UnauthorizedError ||
        error instanceof ValidationError
      ) {
        throw error;
      }
      throw new DatabaseError(
        `Failed to refresh token: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async revokeAccount(accountId: string, userId: string): Promise<void> {
    if (!accountId || !userId) {
      throw new ValidationError("accountId and userId required");
    }

    try {
      // Find the account to revoke
      const account = await this.gmailRepo.findOneBy({ id: accountId, userId });
      if (!account) {
        throw new UnauthorizedError("Gmail account not found or access denied");
      }

      // Revoke the access token on Google's side
      try {
        this.oauth2Client.setCredentials({
          access_token: account.accessToken,
        });
        await this.oauth2Client.revokeCredentials();
      } catch (error) {
        // Log but don't fail - token might already be revoked
        console.warn("Failed to revoke token with Google:", error);
      }

      // Remove the account from database
      await this.gmailRepo.remove(account);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw error;
      }
      throw new DatabaseError(
        `Failed to revoke Gmail account: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async getAccounts(userId: string): Promise<GmailAccount[]> {
    if (!userId) {
      throw new ValidationError("userId required");
    }

    try {
      const accounts = await this.gmailRepo.findBy({ userId });
      return accounts;
    } catch (error) {
      throw new DatabaseError(
        `Failed to fetch Gmail accounts: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }
}

export const gmailAuthService = new GmailAuthService();
