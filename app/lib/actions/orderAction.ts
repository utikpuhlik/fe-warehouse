"use server";

import { revalidatePath } from "next/cache";

import {
  convertOrder,
  delOrder,
  delOrderOffer,
  patchOrder,
  patchOrderOffer,
  postOrder,
  postOrderOffer,
} from "@/app/lib/apis/orderApi";
import { OrderOfferPostSchema, OrderOfferPutSchema } from "@/app/lib/schemas/orderOfferSchema";
import { OrderPutSchema, OrderWithOffersPostSchema } from "@/app/lib/schemas/orderSchema";

export async function createOrderAction(order: OrderWithOffersPostSchema): Promise<void> {
  await postOrder(order);
  revalidatePath("/orders");
}

export async function convertOrderToWaybillAction(order_id: string): Promise<void> {
  await convertOrder(order_id);
  revalidatePath("/waybills");
}

export async function updateOrderAction(order_id: string, order: OrderPutSchema): Promise<void> {
  await patchOrder(order_id, order);
  revalidatePath(`/orders/${order_id}`);
  revalidatePath("/orders");
}

export async function deleteOrderAction(order_id: string): Promise<void> {
  await delOrder(order_id);
  revalidatePath(`/orders/${order_id}`);
  revalidatePath("/orders");
}

export async function createOrderOfferAction(order: OrderOfferPostSchema, order_id: string): Promise<void> {
  await postOrderOffer(order, order_id);
  revalidatePath(`/orders/${order_id}`);
  revalidatePath(`/orders/${order_id}/edit`);
}

export async function deleteOrderOfferAction(order_offer_id: string, order_id: string): Promise<void> {
  await delOrderOffer(order_offer_id);
  revalidatePath(`/orders/${order_id}`);
  revalidatePath(`/orders/${order_id}/edit`);
}

export async function updateOrderOfferAction(
  order_offer_id: string,
  order_id: string,
  order_offer: OrderOfferPutSchema,
): Promise<void> {
  await patchOrderOffer(order_offer_id, order_offer);
  revalidatePath(`/orders/${order_id}`);
  revalidatePath(`/orders/${order_id}/edit`);
}
