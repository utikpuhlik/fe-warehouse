import {
    type OfferPostSchema,
    type OfferPutSchema,
    type OfferSchema,
    type OffersSchema,
    zOfferSchema,
    zOffersSchema,
} from "@/app/lib/schemas/offerSchema";
import { BASE_URL } from "@/app/lib/config/config";
import { handleApiError } from "@/app/lib/errors/handleApiError";
import {fetchAndParse} from "@/app/lib/apis/utils/fetchJson";
import {getAuthHeader} from "@/app/lib/apis/utils/getAuthHeader";

const ENTITY = "offers";

export async function fetchOfferById(id: string): Promise<OfferSchema> {
    const url = `${BASE_URL}/${ENTITY}/${id}`;
    return fetchAndParse(url, zOfferSchema, false, ENTITY);
}

export async function fetchOffersByProductId(product_id: string): Promise<OffersSchema> {
    const url = `${BASE_URL}/${ENTITY}?product_id=${product_id}`;
    return fetchAndParse(url, zOffersSchema, false, ENTITY);
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
        handleApiError(res, text, ENTITY);
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
        handleApiError(res, text, ENTITY);
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
        handleApiError(res, text, ENTITY);
    }

    return res.status;
}
