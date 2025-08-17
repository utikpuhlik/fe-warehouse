import {
  OrderPaginatedSchema,
  OrderPostSchema,
  OrderPutSchema,
  OrderSchema,
  OrderWithOffersPostSchema,
  zOrderPaginatedSchema,
  zOrderSchema,
} from "@/app/lib/schemas/orderSchema";
import { env } from "@/env";
import { fetchWithAuthAndParse } from "@/app/lib/apis/utils/fetchJson";
import { CountSchema, zCountSchema } from "@/app/lib/schemas/commonSchema";
import { getAuthHeader } from "@/app/lib/apis/utils/getAuthHeader";
import { OrderStatusEnum } from "@/app/lib/schemas/commonSchema";
import { handleApiError } from "@/app/lib/errors/handleApiError";
import {
  OrderOfferPostSchema,
  OrderOfferPutSchema,
  OrderOfferSchema,
  zOrderOfferSchema,
} from "@/app/lib/schemas/orderOfferSchema";
import { WaybillSchema, zWaybillSchema } from "@/app/lib/schemas/waybillSchema";

const ENTITY = "orders";

export async function fetchOrders(
  user_id?: string,
  order_status?: OrderStatusEnum,
): Promise<OrderPaginatedSchema> {
  const params = new URLSearchParams();

  if (user_id) params.append("user_id", user_id);
  if (order_status) params.append("status", order_status);

  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}?${params.toString()}`;
  return fetchWithAuthAndParse(url, zOrderPaginatedSchema, false, ENTITY);
}

export async function fetchOrderById(order_id: string): Promise<OrderSchema> {
  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${order_id}`;
  return fetchWithAuthAndParse(url, zOrderSchema, false, ENTITY);
}

export async function fetchOrdersCount(): Promise<CountSchema> {
  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/meta/count`;
  return fetchWithAuthAndParse(url, zCountSchema, false, ENTITY);
}

export async function fetchOrderOffers(
  order_id: string,
): Promise<OrderOfferSchema[]> {
  try {
    const res = await fetch(
      `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${order_id}/offers`,
      {
        headers: await getAuthHeader(),
      },
    );
    return res.json();
  } catch (error) {
    console.error("API Error:", error);
    throw new Error("Failed to fetch order-offers data.");
  }
}

export async function postOrder(
  order: OrderWithOffersPostSchema | OrderPostSchema,
): Promise<OrderSchema> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/${ENTITY}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(await getAuthHeader()),
    },
    body: JSON.stringify(order),
  });

  const text = await res.text();
  if (!res.ok) {
    handleApiError(res, text, ENTITY);
  }

  return zOrderSchema.parse(JSON.parse(text));
}

export async function convertOrder(
  order_id: string,
  author_id: string,
): Promise<WaybillSchema> {
  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${order_id}/convert`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(await getAuthHeader()),
      },
    },
  );
  const text = await res.text();
  if (!res.ok) {
    handleApiError(res, text, ENTITY);
  }

  return zWaybillSchema.parse(JSON.parse(text));
}

export async function patchOrder(
  order_id: string,
  order: OrderPutSchema,
): Promise<OrderSchema> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${order_id}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(await getAuthHeader()),
    },
    body: JSON.stringify(order),
  });

  const text = await res.text();
  if (!res.ok) {
    handleApiError(res, text, ENTITY);
  }

  return zOrderSchema.parse(JSON.parse(text));
}

export async function delOrder(order_id: string): Promise<number> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${order_id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      ...(await getAuthHeader()),
    },
  });

  const text = await res.text();
  if (!res.ok) {
    handleApiError(res, text, ENTITY);
  }

  return res.status;
}

export async function postOrderOffer(
  order: OrderOfferPostSchema,
  order_id: string,
): Promise<OrderOfferSchema> {
  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${order_id}/offers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(await getAuthHeader()),
      },
      body: JSON.stringify(order),
    },
  );

  const text = await res.text();
  if (!res.ok) {
    handleApiError(res, text, ENTITY);
  }

  const json = JSON.parse(text);
  return zOrderOfferSchema.parse(json);
}

export async function patchOrderOffer(
  order_offer_id: string,
  order_offer: OrderOfferPutSchema,
): Promise<OrderOfferSchema> {
  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/order-offers/${order_offer_id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(await getAuthHeader()),
      },
      body: JSON.stringify(order_offer),
    },
  );

  const text = await res.text();
  if (!res.ok) {
    handleApiError(res, text, ENTITY);
  }

  const json = JSON.parse(text);
  return zOrderOfferSchema.parse(json);
}

export async function delOrderOffer(order_offer_id: string): Promise<number> {
  const res = await fetch(
    `${env.NEXT_PUBLIC_API_URL}/order-offers/${order_offer_id}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        ...(await getAuthHeader()),
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to delete order offer: ${res.status}`);
  }

  return res.status;
}
