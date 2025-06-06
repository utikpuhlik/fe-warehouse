import {
    type WaybillPaginatedSchema,
    type WaybillPostSchema,
    type WaybillSchema,
    zWaybillSchema
} from "@/app/lib/schemas/waybillSchema";
import {BASE_URL} from "@/app/lib/config/config";
import { UnknownApiError,} from "@/app/lib/errors/apiErrors";
import {type WaybillOfferPostSchema, type WaybillOfferSchema, zWaybillOfferSchema} from "@/app/lib/schemas/waybillOfferSchema";
export async function fetchWaybills(
    waybill_type: string | undefined,
    is_pending: string | undefined,
    user_id: string,
    search_term: string,
    page: number,
    size = 10
): Promise<WaybillPaginatedSchema> {
    try {
        const params = new URLSearchParams({
            user_id,
            search_term,
            size: size.toString(),
            page: page.toString(),
        });

        if (waybill_type) {
            params.set("waybill_type", waybill_type);
        }

        if (is_pending) {
            params.set("is_pending", is_pending);
        }

        const res = await fetch(`${BASE_URL}/waybills?${params.toString()}`);
        return res.json();
    }
    catch (error) {
        console.error("API Error:", error);
        throw new Error("Failed to fetch waybill data.");
    }
}

export async function fetchWaybillById(waybill_id: string): Promise<WaybillSchema> {
    try {
        const res = await fetch(`${BASE_URL}/waybills/${waybill_id}`)
        return res.json()
    }
    catch (error) {
        console.error("API Error:", error);
        throw new Error("Failed to fetch waybill data.");
    }
}

export async function fetchWaybillOffers(waybill_id: string): Promise<WaybillOfferSchema[]> {
    try {
        const res = await fetch(`${BASE_URL}/waybills/${waybill_id}/offers`)
        return res.json()
    }
    catch (error) {
        console.error("API Error:", error);
        throw new Error("Failed to fetch waybill-offers data.");
    }
}

export async function postWaybill(
    waybill: WaybillPostSchema,
): Promise<WaybillSchema> {
    const res = await fetch(`${BASE_URL}/waybill`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(waybill),
    });

    if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        throw new UnknownApiError(res.status, errorText);
    }

    const json = await res.json();
    return zWaybillSchema.parse(json);
}

export async function commitWaybill(
    waybill_id: string
): Promise<WaybillSchema> {
    const res = await fetch(`${BASE_URL}/waybill/${waybill_id}/commit`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        throw new UnknownApiError(res.status, errorText);
    }

    const json = await res.json();
    return zWaybillSchema.parse(json);
}


export async function postWaybillOffer(
    waybill: WaybillOfferPostSchema,
    waybill_id: string
): Promise<WaybillOfferSchema> {
    const res = await fetch(`${BASE_URL}/waybill/${waybill_id}/offers`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(waybill),
    });

    if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        throw new UnknownApiError(res.status, errorText);
    }

    const json = await res.json();
    return zWaybillOfferSchema.parse(json);
}

export async function delWaybill(id: string): Promise<number> {
    const res = await fetch(`${BASE_URL}/waybill/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to delete waybill: ${res.status}`);
    }

    return res.status;
}

export async function delWaybillOffer(waybill_offer_id: string): Promise<number> {
    const res = await fetch(`${BASE_URL}/waybill-offers/${waybill_offer_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to delete waybill offer: ${res.status}`);
    }

    return res.status;
}