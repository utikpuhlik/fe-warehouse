import {OrderSchema, zOrderSchema} from "@/app/lib/schemas/orderSchema";
import {BASE_URL} from "@/app/lib/config/config";
import {fetchWithAuthAndParse} from "@/app/lib/apis/utils/fetchJson";
import {CountSchema, zCountSchema} from "@/app/lib/schemas/commonSchema";
import type {OrderOfferSchema} from "@/app/lib/schemas/orderOfferSchema";
import {getAuthHeader} from "@/app/lib/apis/utils/getAuthHeader";

const ENTITY = "orders";

export async function fetchOrders(): Promise<OrderSchema[]> {
    const url = `${BASE_URL}/${ENTITY}`;
    return fetchWithAuthAndParse(url, zOrderSchema.array(), false, ENTITY);
}


export async function fetchOrderById(order_id: string): Promise<OrderSchema> {
    const url = `${BASE_URL}/${ENTITY}/${order_id}`;
    return fetchWithAuthAndParse(url, zOrderSchema, false, ENTITY);
}

export async function fetchOrdersCount(): Promise<CountSchema> {
    const url = `${BASE_URL}/${ENTITY}/meta/count`;
    return fetchWithAuthAndParse(url, zCountSchema, false, ENTITY);
}

export async function fetchOrderOffers(order_id: string): Promise<OrderOfferSchema[]> {
    try {
        const res = await fetch(`${BASE_URL}/${ENTITY}/${order_id}/offers`, {
            headers: await getAuthHeader(),
        });
        return res.json();
    } catch (error) {
        console.error("API Error:", error);
        throw new Error("Failed to fetch order-offers data.");
    }
}