import cron, { type ScheduledTask } from "node-cron";
import { LessThan, Not, IsNull } from "typeorm";
import { AppDataSource } from "../config/database.js";
import { GmailAccount } from "../entities/GmailAccount.entity.js";
import { gmailAuthService } from "../modules/gmail/gmail.auth.service.js";

// Refresh tokens that expire within this window
const REFRESH_BUFFER_MS = 10 * 60 * 1000; // 10 minutes

// How often to check for expiring tokens
const CRON_SCHEDULE = "*/5 * * * *"; // Every 5 minutes

class GmailTokenRefreshCron {
  private task: ScheduledTask | null = null;
  private gmailRepo = AppDataSource.getRepository(GmailAccount);

  start(): void {
    if (this.task) {
      console.warn("[GmailTokenRefreshCron] Already running, skipping start");
      return;
    }

    this.task = cron.schedule(
      CRON_SCHEDULE,
      async () => {
        await this.refreshExpiringTokens();
      },
      { noOverlap: true, name: "gmail-token-refresh" }
    );

    console.log("[GmailTokenRefreshCron] Started — running every 5 minutes");
  }

  stop(): void {
    if (this.task) {
      this.task.stop();
      this.task = null;
      console.log("[GmailTokenRefreshCron] Stopped");
    }
  }

  private async refreshExpiringTokens(): Promise<void> {
    const threshold = new Date(Date.now() + REFRESH_BUFFER_MS);
    const accounts = await this.gmailRepo.find({
      where: {
        expiresAt: LessThan(threshold),
        refreshToken: Not(IsNull()),
      },
    });
    for (const account of accounts) {
      try {
        await gmailAuthService.refreshAccessToken(account.id, account.userId);
      } catch (err) {
        console.log(err);
      }
    }
  }
}

export const gmailTokenRefreshCron = new GmailTokenRefreshCron();
