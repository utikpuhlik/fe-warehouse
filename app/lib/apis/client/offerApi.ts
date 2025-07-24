import {OfferPaginatedSchema, zOfferPaginatedSchema} from "@/app/lib/schemas/offerSchema";

export async function fetchFilteredOffersTS(
    search_term: string,
    size = 10,
    page = 1
): Promise<OfferPaginatedSchema> {
    const url = `/api/offers/search?search_term=${encodeURIComponent(search_term)}&size=${size}&page=${page}`;
    const res = await fetch(url);

    const text = await res.text().catch(() => "");
    if (!res.ok) {
        throw new Error(`Failed to fetch offers: ${text}`);
    }

    return zOfferPaginatedSchema.parse(JSON.parse(text));
}