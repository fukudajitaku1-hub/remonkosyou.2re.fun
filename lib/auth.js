import crypto from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
}

function timingSafeEqualString(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function getSessionToken() {
  const secret = requiredEnv("ADMIN_SESSION_SECRET");
  return crypto.createHmac("sha256", secret).update("admin-session").digest("hex");
}

export function verifyPassword(password) {
  const expected = requiredEnv("ADMIN_PASSWORD");
  return typeof password === "string" && timingSafeEqualString(password, expected);
}

export function createSession() {
  cookies().set(COOKIE_NAME, getSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function destroySession() {
  cookies().delete(COOKIE_NAME);
}

export function isAuthenticated() {
  const value = cookies().get(COOKIE_NAME)?.value;
  if (!value) return false;
  return timingSafeEqualString(value, getSessionToken());
}
