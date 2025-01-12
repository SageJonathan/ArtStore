"use server";
import { cookies } from "next/headers";

export async function displayHomeWithCookies(isGrid?: boolean): Promise<string> {
  const cookieStore = cookies();

  if (isGrid !== undefined) {
    (await cookieStore).set("displayMode", isGrid ? "grid" : "gallery", {
      maxAge: 60 * 60 * 24 * 7, // Cookie will expire in 1 week
      path: "/",
    });
  }
  const displayMode = (await cookieStore).get("displayMode")?.value || "gallery";

  return displayMode;
}

