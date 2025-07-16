import {OrderSchema, zOrderSchema} from "@/app/lib/schemas/orderSchema";
import { env } from "@/env";
import {fetchWithAuthAndParse} from "@/app/lib/apis/utils/fetchJson";
import {CountSchema, zCountSchema} from "@/app/lib/schemas/commonSchema";
import type {OrderOfferSchema} from "@/app/lib/schemas/orderOfferSchema";
import {getAuthHeader} from "@/app/lib/apis/utils/getAuthHeader";

const ENTITY = "orders";

export async function fetchOrders(
    user_id?: string,
    order_status?: "NEW" | "IN_PROGRESS" | "SHIPPING" | "COMPLETED" | "CANCELLED",
): Promise<OrderSchema[]> {
    const params = new URLSearchParams();

    if (user_id) params.append("user_id", user_id);
    if (order_status) params.append("status", order_status);

    const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}?${params.toString()}`;
    return fetchWithAuthAndParse(url, zOrderSchema.array(), false, ENTITY);
}


export async function fetchOrderById(order_id: string): Promise<OrderSchema> {
    const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${order_id}`;
    return fetchWithAuthAndParse(url, zOrderSchema, false, ENTITY);
}

export async function fetchOrdersCount(): Promise<CountSchema> {
    const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/meta/count`;
    return fetchWithAuthAndParse(url, zCountSchema, false, ENTITY);
}

export async function fetchOrderOffers(order_id: string): Promise<OrderOfferSchema[]> {
    try {
        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${order_id}/offers`, {
            headers: await getAuthHeader(),
        });
        return res.json();
    } catch (error) {
        console.error("API Error:", error);
        throw new Error("Failed to fetch order-offers data.");
    }
}