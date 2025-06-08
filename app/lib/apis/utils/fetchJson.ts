import type { ZodType } from "zod";
import { handleApiError } from "@/app/lib/apis/utils/handleApiError";

export async function fetchAndParse<T>(
    url: string,
    schema: ZodType<T>,
    init?: RequestInit,
    entity?: string
): Promise<T> {
    const res = await fetch(url, init);
    const text = await res.text().catch(() => "");

    if (!res.ok) {
        handleApiError(res, text, { entity });
    }

    let json: unknown;
    try {
        json = JSON.parse(text);
    } catch {
        throw new Error("Invalid JSON response");
    }

    return schema.parse(json);
}
