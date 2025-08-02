import {
  type OfferPostSchema,
  type OfferPutSchema,
  type OfferSchema,
  type OfferPaginatedSchema,
  zOfferSchema,
  zOfferPaginatedSchema,
} from "@/app/lib/schemas/offerSchema";
import { env } from "@/env";
import { handleApiError } from "@/app/lib/errors/handleApiError";
import { fetchAndParse } from "@/app/lib/apis/utils/fetchJson";
import { getAuthHeader } from "@/app/lib/apis/utils/getAuthHeader";
import { CountSchema, zCountSchema } from "@/app/lib/schemas/commonSchema";

const ENTITY = "offers";

export async function fetchOfferById(id: string): Promise<OfferSchema> {
  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${id}`;
  return fetchAndParse(url, zOfferSchema, false, ENTITY);
}

export async function fetchOffersByProductId(
  product_id: string,
): Promise<OfferPaginatedSchema> {
  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}?product_id=${product_id}`;
  return fetchAndParse(url, zOfferPaginatedSchema, false, ENTITY);
}

export async function fetchOffersCount(): Promise<CountSchema> {
  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/meta/count`;
  return fetchAndParse(url, zCountSchema, false, ENTITY);
}

export async function fetchFilteredOffersWS(
  search_term: string,
): Promise<OfferPaginatedSchema> {
  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/search/wildcard?search_term=${search_term}`;
  return fetchAndParse(url, zOfferPaginatedSchema, undefined, "offer");
}

export async function fetchFilteredOffersTS(
  search_term: string,
  size = 10,
  page = 1,
): Promise<OfferPaginatedSchema> {
  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/search/text_search?search_term=${search_term}&size=${size}&page=${page}`;
  return fetchAndParse(url, zOfferPaginatedSchema, undefined, "offer");
}

export async function postOffer(offer: OfferPostSchema): Promise<OfferSchema> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/${ENTITY}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(await getAuthHeader()),
    },
    body: JSON.stringify(offer),
  });

  const text = await res.text();
  if (!res.ok) {
    handleApiError(res, text, ENTITY);
  }

  return zOfferSchema.parse(JSON.parse(text));
}

export async function patchOffer(
  id: string,
  offer: OfferPutSchema,
): Promise<OfferSchema> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(await getAuthHeader()),
    },
    body: JSON.stringify(offer),
  });

  const text = await res.text();
  if (!res.ok) {
    handleApiError(res, text, ENTITY);
  }

  return zOfferSchema.parse(JSON.parse(text));
}

export async function delOffer(id: string): Promise<number> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(await getAuthHeader()),
    },
  });

  const text = await res.text();
  if (!res.ok) {
    handleApiError(res, text, ENTITY);
  }

  return res.status;
}
