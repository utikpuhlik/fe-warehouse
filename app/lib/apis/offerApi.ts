import {BASE_URL} from "@/app/lib/config/config";
import type {OfferSchema, OffersSchema} from "@/app/lib/schemas/offerSchema";


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