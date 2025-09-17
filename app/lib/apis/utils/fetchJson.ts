import type { ZodType } from "zod";

import { getAuthHeader } from "@/app/lib/apis/utils/getAuthHeader";
import { handleApiError } from "@/app/lib/errors/handleApiError";

export async function fetchAndParse<T>(url: string, schema: ZodType<T>, cache = false, entity?: string): Promise<T> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    cache: cache ? "default" : "no-store",
    next: cache ? { revalidate: 60 } : { revalidate: 0 },
  });

  const text = await res.text();

  if (!res.ok) {
    handleApiError(res, text, entity);
  }

  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON response");
  }

  return schema.parse(json);
}

export async function fetchWithAuthAndParse<T>(
  url: string,
  schema: ZodType<T>,
  cache = false,
  entity?: string,
): Promise<T> {
  const headers: HeadersInit = {
    Accept: "application/json",
    ...(await getAuthHeader()),
  };

  const res = await fetch(url, {
    headers,
    cache: "no-store",
    next: cache ? { revalidate: 60 } : { revalidate: 0 },
  });

  const text = await res.text();
  if (!res.ok) {
    handleApiError(res, text, entity);
  }

  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON response");
  }
  return schema.parse(json);
}
