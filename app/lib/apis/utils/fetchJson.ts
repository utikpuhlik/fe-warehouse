import type { ZodType } from "zod";
import { handleApiError } from "@/app/lib/errors/handleApiError";
import {getAuthHeader} from "@/app/lib/apis/utils/getAuthHeader";

export async function fetchAndParse<T>(
    url: string,
    schema: ZodType<T>,
    cache = false,
    entity?: string
): Promise<T> {
    const res = await fetch(url, {
        headers: {
            Accept: "application/json",
        },
        cache: cache ? "default" : "no-store",
        next: cache ? { revalidate: 60 } : { revalidate: 0 },
    });

    const text = await res.text().catch(() => "");

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
    entity?: string
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

    const text = await res.text().catch(() => "");

    if (!res.ok) {
        handleApiError(res, text, entity);
    }

    let json: unknown;
    try {
        json = JSON.parse(text);
    } catch {
        throw new Error("Invalid JSON response");
    }

    // console.log(json)
    return schema.parse(json);
}
