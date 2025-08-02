"use server"

import {
    postOrder,
    patchOrder
} from "@/app/lib/apis/orderApi";
import {revalidatePath} from "next/cache";
import {OrderPutSchema, OrderWithOffersPostSchema} from "@/app/lib/schemas/orderSchema";

export async function createOrderAction(order: OrderWithOffersPostSchema): Promise<void> {
    await postOrder(order)
    revalidatePath("/orders");
}

export async function updateOrderAction(order_id: string, order: OrderPutSchema): Promise<void> {
    await patchOrder(order_id, order)
    revalidatePath(`/orders/${order_id}`);
    revalidatePath("/orders");
}
