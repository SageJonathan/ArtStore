"use server";
import { cookies } from "next/headers";

export async function displayHomeWithCookies(isGrid: boolean) {
  const cookieStore = cookies();

  (await cookieStore).set("displayMode", isGrid ? "grid" : "gallery", {
    maxAge: 60 * 60 * 24 * 7, // Cookie will expire in 1 week
    path: "/",
  });
}
