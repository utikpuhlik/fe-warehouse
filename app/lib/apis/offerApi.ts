import {
    type OfferPostSchema,
    type OfferPutSchema,
    type OfferSchema,
    type OffersSchema,
    zOfferSchema,
    zOffersSchema,
} from "@/app/lib/schemas/offerSchema";
import { BASE_URL } from "@/app/lib/config/config";
import { handleApiError } from "@/app/lib/apis/utils/handleApiError";
import {fetchAndParse} from "@/app/lib/apis/utils/fetchJson";
import {getAuthHeader} from "@/app/lib/apis/utils/getAuthHeader";

const ENTITY = "offers";

export async function fetchOfferById(id: string): Promise<OfferSchema> {
    const url = `${BASE_URL}/${ENTITY}/${id}`;
    return fetchAndParse(url, zOfferSchema, undefined, "offer");
}

export async function fetchOffersByProductId(product_id: string): Promise<OffersSchema> {
    const url = `${BASE_URL}/${ENTITY}?product_id=${product_id}`;
    return fetchAndParse(url, zOffersSchema, undefined, "offer");
}

export async function fetchFilteredOffersWS(search_term: string): Promise<OffersSchema> {
    const url = `${BASE_URL}/${ENTITY}/search/wildcard?search_term=${search_term}`;
    return fetchAndParse(url, zOffersSchema, undefined, "offer");
}

export async function fetchFilteredOffersTS(
    search_term: string,
    size = 10,
    page = 1
): Promise<OffersSchema> {
    const url = `${BASE_URL}/${ENTITY}/search/text_search?search_term=${search_term}&size=${size}&page=${page}`;
    return fetchAndParse(url, zOffersSchema, undefined, "offer");
}

export async function postOffer(offer: OfferPostSchema): Promise<OfferSchema> {
    const res = await fetch(`${BASE_URL}/${ENTITY}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(await getAuthHeader()),
        },
        body: JSON.stringify(offer),
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
        handleApiError(res, text, { entity: "offer" });
    }

    return zOfferSchema.parse(JSON.parse(text));
}

export async function putOffer(id: string, offer: OfferPutSchema): Promise<OfferSchema> {
    const res = await fetch(`${BASE_URL}/${ENTITY}/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(await getAuthHeader()),
        },
        body: JSON.stringify(offer),
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
        handleApiError(res, text, { entity: "offer" });
    }

    return zOfferSchema.parse(JSON.parse(text));
}

export async function delOffer(id: string): Promise<number> {
    const res = await fetch(`${BASE_URL}/${ENTITY}/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(await getAuthHeader()),
        },
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
        handleApiError(res, text, { entity: "offer" });
    }

    return res.status;
}
