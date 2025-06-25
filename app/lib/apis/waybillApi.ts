import {
    type WaybillPaginatedSchema,
    type WaybillPostSchema,
    type WaybillSchema, zWaybillPaginatedSchema,
    zWaybillSchema
} from "@/app/lib/schemas/waybillSchema";
import {BASE_URL} from "@/app/lib/config/config";
import {type WaybillOfferPostSchema, type WaybillOfferSchema, zWaybillOfferSchema} from "@/app/lib/schemas/waybillOfferSchema";
import { getAuthHeader } from "@/app/lib/apis/utils/getAuthHeader"
import {handleApiError} from "@/app/lib/errors/handleApiError";
import {fetchWithAuthAndParse} from "@/app/lib/apis/utils/fetchJson";
import {CountSchema, zCountSchema} from "@/app/lib/schemas/commonSchema";

const ENTITY = "waybills";

export async function fetchWaybills(
    waybill_type: string | undefined,
    is_pending: string | undefined,
    search_term: string,
    page: number,
    size = 10
): Promise<WaybillPaginatedSchema> {
    const params = new URLSearchParams({
        search_term,
        size: size.toString(),
        page: page.toString(),
    });

    if (waybill_type) params.set("waybill_type", waybill_type);
    if (is_pending) params.set("is_pending", is_pending);

    const url = `${BASE_URL}/${ENTITY}?${params.toString()}`;
    return fetchWithAuthAndParse(url, zWaybillPaginatedSchema, false, ENTITY);
}

export async function fetchWaybillById(waybill_id: string): Promise<WaybillSchema> {
    const url = `${BASE_URL}/${ENTITY}/${waybill_id}`;
    return fetchWithAuthAndParse(url, zWaybillSchema, false, ENTITY);
}

export async function fetchWaybillsCount(): Promise<CountSchema> {
    const url = `${BASE_URL}/${ENTITY}/meta/count`;
    return fetchWithAuthAndParse(url, zCountSchema, false, ENTITY);
}

export async function fetchWaybillOffers(waybill_id: string): Promise<WaybillOfferSchema[]> {
    try {
        const res = await fetch(`${BASE_URL}/${ENTITY}/${waybill_id}/offers`, {
            headers: await getAuthHeader(),
        });
        return res.json();
    } catch (error) {
        console.error("API Error:", error);
        throw new Error("Failed to fetch waybill-offers data.");
    }
}

export async function postWaybill(waybill: WaybillPostSchema): Promise<WaybillSchema> {
    const res = await fetch(`${BASE_URL}/${ENTITY}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(await getAuthHeader()),
        },
        body: JSON.stringify(waybill),
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
        handleApiError(res, text, ENTITY);
    }

    const json = JSON.parse(text);
    return zWaybillSchema.parse(json);
}

export async function commitWaybill(waybill_id: string): Promise<WaybillSchema> {
    const res = await fetch(`${BASE_URL}/${ENTITY}/${waybill_id}/commit`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(await getAuthHeader()),
        },
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
        handleApiError(res, text, ENTITY);
    }

    const json = JSON.parse(text);
    return zWaybillSchema.parse(json);
}


export async function postWaybillOffer(
    waybill: WaybillOfferPostSchema,
    waybill_id: string
): Promise<WaybillOfferSchema> {
    const res = await fetch(`${BASE_URL}/${ENTITY}/${waybill_id}/offers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...(await getAuthHeader()),
        },
        body: JSON.stringify(waybill),
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
        handleApiError(res, text, ENTITY);
    }

    const json = JSON.parse(text)
    return zWaybillOfferSchema.parse(json);
}

export async function delWaybill(id: string): Promise<number> {
    const res = await fetch(`${BASE_URL}/${ENTITY}/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            ...(await getAuthHeader()),
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
            Accept: "application/json",
            ...(await getAuthHeader()),
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to delete waybill offer: ${res.status}`);
    }

    return res.status;
}