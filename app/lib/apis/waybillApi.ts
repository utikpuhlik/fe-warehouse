import { fetchWithAuthAndParse } from "@/app/lib/apis/utils/fetchJson";
import { getAuthHeader } from "@/app/lib/apis/utils/getAuthHeader";
import { handleApiError } from "@/app/lib/errors/handleApiError";
import { CountSchema, zCountSchema } from "@/app/lib/schemas/commonSchema";
import {
  WaybillOfferPutSchema,
  zWaybillOfferSchema,
  type WaybillOfferPostSchema,
  type WaybillOfferSchema,
} from "@/app/lib/schemas/waybillOfferSchema";
import {
  WaybillPutSchema,
  WaybillWithOffersPostSchema,
  zWaybillPaginatedSchema,
  zWaybillSchema,
  type WaybillPaginatedSchema,
  type WaybillPostSchema,
  type WaybillSchema,
} from "@/app/lib/schemas/waybillSchema";
import { env } from "@/env";

const ENTITY = "waybills";

export async function fetchWaybills(
  waybill_type: string | undefined,
  is_pending: boolean | undefined,
  search_term: string | undefined = "",
  page: number,
  size = 10,
): Promise<WaybillPaginatedSchema> {
  const params = new URLSearchParams({
    search_term,
    size: size.toString(),
    page: page.toString(),
  });

  if (waybill_type) params.set("waybill_type", waybill_type);
  if (is_pending) params.set("is_pending", String(is_pending));

  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}?${params.toString()}`;
  return fetchWithAuthAndParse(url, zWaybillPaginatedSchema, false, ENTITY);
}

export async function fetchWaybillById(waybill_id: string): Promise<WaybillSchema> {
  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${waybill_id}`;
  return fetchWithAuthAndParse(url, zWaybillSchema, false, ENTITY);
}

export async function fetchWaybillsCount(): Promise<CountSchema> {
  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/meta/count`;
  return fetchWithAuthAndParse(url, zCountSchema, false, ENTITY);
}

export async function fetchWaybillOffers(waybill_id: string): Promise<WaybillOfferSchema[]> {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${waybill_id}/offers`, {
      headers: await getAuthHeader(),
    });
    return res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch waybill-offers data.");
  }
}

export async function postWaybill(waybill: WaybillWithOffersPostSchema | WaybillPostSchema): Promise<WaybillSchema> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/${ENTITY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(await getAuthHeader()),
    },
    body: JSON.stringify(waybill),
  });

  const text = await res.text();
  if (!res.ok) {
    handleApiError(res, text, ENTITY);
  }

  const json = JSON.parse(text);
  return zWaybillSchema.parse(json);
}

export async function patchWaybill(waybill_id: string, waybill: WaybillPutSchema): Promise<WaybillSchema> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${waybill_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(await getAuthHeader()),
    },
    body: JSON.stringify(waybill),
  });

  const text = await res.text();
  if (!res.ok) {
    handleApiError(res, text, ENTITY);
  }

  const json = JSON.parse(text);
  return zWaybillSchema.parse(json);
}

export async function delWaybill(id: string): Promise<number> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${id}`, {
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

export async function commitWaybill(waybill_id: string): Promise<WaybillSchema> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${waybill_id}/commit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(await getAuthHeader()),
    },
  });

  const text = await res.text();
  if (!res.ok) {
    handleApiError(res, text, ENTITY);
  }

  const json = JSON.parse(text);
  return zWaybillSchema.parse(json);
}

export async function postWaybillOffer(
  waybill: WaybillOfferPostSchema,
  waybill_id: string,
): Promise<WaybillOfferSchema> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${waybill_id}/offers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(await getAuthHeader()),
    },
    body: JSON.stringify(waybill),
  });

  const text = await res.text();
  if (!res.ok) {
    handleApiError(res, text, ENTITY);
  }

  const json = JSON.parse(text);
  return zWaybillOfferSchema.parse(json);
}

export async function patchWaybillOffer(
  waybill_offer_id: string,
  waybill_offer: WaybillOfferPutSchema,
): Promise<WaybillOfferSchema> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/waybill-offers/${waybill_offer_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...(await getAuthHeader()),
    },
    body: JSON.stringify(waybill_offer),
  });

  const text = await res.text();
  if (!res.ok) {
    handleApiError(res, text, ENTITY);
  }

  const json = JSON.parse(text);
  return zWaybillOfferSchema.parse(json);
}

export async function delWaybillOffer(waybill_offer_id: string): Promise<number> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/waybill-offers/${waybill_offer_id}`, {
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
