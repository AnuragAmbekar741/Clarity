import { OAuth2Client } from "google-auth-library";
import { env } from "../../config/env.js";

async function exchangeCodeForTokens(code: string) {
  const GoogleClient = new OAuth2Client({
    clientId: env.GOOGLE_CLIENT_ID,
    client_secret: env.GOOGLE_CLIENT_SECRET,
  });
  const { tokens } = await GoogleClient.getToken({
    code: code,
  });

  if (!tokens.id_token) throw new Error("No id token");

  const ticket = await GoogleClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const googleId = payload?.sub;
  const name = payload?.name;
  const email = payload?.email;
  const picture = payload?.picture;

  return { tokens, googleId, name, email, picture };
}
