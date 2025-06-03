import {BASE_URL} from "@/app/lib/config/config";
import type {OfferPostSchema, OfferPutSchema, OfferSchema, OffersSchema} from "@/app/lib/schemas/offerSchema";
import { zOfferSchema } from "@/app/lib/schemas/offerSchema";
import { ConflictError, UnknownApiError, UnsupportedMediaTypeError } from "@/app/lib/errors/apiErrors";


export async function fetchOfferById(id: string): Promise<OfferSchema> {
    try {
        const res = await fetch(`${BASE_URL}/offer/${id}`);
        return res.json();
    } catch (error) {
        console.error("API Error:", error);
        throw new Error("Failed to offer data.");
    }
}

export async function fetchOffersByProductId(product_id: string): Promise<OffersSchema> {
    try {
        const res = await fetch(`${BASE_URL}/offers?product_id=${product_id}`);
        return res.json();
    } catch (error) {
        console.error("API Error:", error);
        throw new Error("Failed to offer data.");
    }
}

export async function postOffer(
    offer: OfferPostSchema,
): Promise<OfferSchema> {
    const res = await fetch(`${BASE_URL}/offer`, {
        method: "POST",
        headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        body: JSON.stringify(offer),
    });

    if (!res.ok) {
        const errorText = await res.text().catch(() => "");

        if (res.status === 409) {
            throw new ConflictError("Предложение с таким именем уже существует.");
        }

        if (res.status === 415) {
            throw new UnsupportedMediaTypeError("Недопустимый формат файла.");
        }

        throw new UnknownApiError(res.status, errorText);
    }

    const json = await res.json();
    return zOfferSchema.parse(json);
}

export async function putOffer(
    id: string,
    offer: OfferPutSchema,
): Promise<number> {
    const res = await fetch(`${BASE_URL}/offer/${id}`, {
        method: "PUT",
        headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        body: JSON.stringify(offer),
    });

    if (!res.ok) {
        throw new Error(`Failed to update offer: ${res.status}`);
    }

    return res.status;
}

export async function delOffer(id: string): Promise<number> {
    const res = await fetch(`${BASE_URL}/offer/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to delete offer: ${res.status}`);
    }

    return res.status;
}