import { NextRequest, NextResponse } from "next/server";
import { zOffersSchema } from "@/app/lib/schemas/offerSchema";

import { env } from "@/env";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const search_term = searchParams.get("search_term") ?? "";
    const size = searchParams.get("size") ?? "10";
    const page = searchParams.get("page") ?? "1";

    const url = `${env.NEXT_PUBLIC_API_URL}/offers/search/text_search?search_term=${encodeURIComponent(search_term)}&size=${size}&page=${page}`;

    try {
        const res = await fetch(url, {
            headers: {
                Accept: "application/json",
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            return NextResponse.json({ error: errorText }, { status: res.status });
        }

        const data = await res.json();
        const parsed = zOffersSchema.parse(data);
        return NextResponse.json(parsed);
    } catch (e) {
        console.error("Error fetching offers:", e);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
