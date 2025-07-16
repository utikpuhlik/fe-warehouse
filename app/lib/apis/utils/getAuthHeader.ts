import { auth } from "@clerk/nextjs/server";

export async function getAuthHeader(): Promise<HeadersInit> {
  const { getToken } = await auth(); // pulls token from request context
  const token = await getToken(); // short-lived JWT

  if (!token) {
    throw new Error("Missing auth token");
  }

  return { Authorization: `Bearer ${token}` };
}
