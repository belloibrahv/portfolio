import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE = "admin_session";
const LIFETIME_SECONDS = 60 * 60 * 24 * 7;
const MIN_PASSWORD_LENGTH = 16;

/** Names of the settings the admin still needs. Values are never exposed. */
export function missingSettings() {
  const missing: string[] = [];
  if ((process.env.ADMIN_PASSWORD ?? "").length < MIN_PASSWORD_LENGTH) missing.push(`ADMIN_PASSWORD (at least ${MIN_PASSWORD_LENGTH} characters)`);
  if (!process.env.GITHUB_TOKEN) missing.push("GITHUB_TOKEN");
  return missing;
}

const derive = (value: string) => scryptSync(value, "ibrahim-portfolio-admin", 32);
const sign = (expires: string, key: Buffer) => createHmac("sha256", key).update(expires).digest("base64url");

function safeEqual(a: Buffer, b: Buffer) {
  return a.length === b.length && timingSafeEqual(a, b);
}

export function passwordMatches(attempt: string) {
  const password = process.env.ADMIN_PASSWORD ?? "";
  return password.length >= MIN_PASSWORD_LENGTH && safeEqual(derive(attempt), derive(password));
}

export async function startSession() {
  const expires = String(Math.floor(Date.now() / 1000) + LIFETIME_SECONDS);
  const store = await cookies();
  store.set(COOKIE, `${expires}.${sign(expires, derive(process.env.ADMIN_PASSWORD ?? ""))}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: LIFETIME_SECONDS,
  });
}

export async function endSession() {
  (await cookies()).delete({ name: COOKIE, path: "/admin" });
}

export async function isSignedIn() {
  const password = process.env.ADMIN_PASSWORD ?? "";
  if (password.length < MIN_PASSWORD_LENGTH) return false;
  const [expires, signature] = ((await cookies()).get(COOKIE)?.value ?? "").split(".");
  if (!expires || !signature || Number(expires) * 1000 <= Date.now()) return false;
  return safeEqual(Buffer.from(signature), Buffer.from(sign(expires, derive(password))));
}
