"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  commitWaybill,
  delWaybill,
  delWaybillOffer,
  patchWaybill,
  patchWaybillOffer,
  postWaybill,
  postWaybillOffer,
} from "@/app/lib/apis/waybillApi";
import { WaybillOfferPostSchema, WaybillOfferPutSchema } from "@/app/lib/schemas/waybillOfferSchema";
import { WaybillPutSchema, WaybillWithOffersPostSchema } from "@/app/lib/schemas/waybillSchema";

export async function createWaybillAction(waybill: WaybillWithOffersPostSchema): Promise<void> {
  await postWaybill(waybill);
  revalidatePath("/waybills");
}

export async function updateWaybillAction(waybill_id: string, waybill: WaybillPutSchema): Promise<void> {
  await patchWaybill(waybill_id, waybill);
  revalidatePath(`/waybills/${waybill_id}`);
  revalidatePath("/waybills");
}

export async function commitWaybillAction(waybill_id: string): Promise<void> {
  await commitWaybill(waybill_id);
  revalidatePath("/waybills");
}

export async function createWaybillOfferAction(waybill: WaybillOfferPostSchema, waybill_id: string): Promise<void> {
  await postWaybillOffer(waybill, waybill_id);
  revalidatePath(`/waybills/${waybill_id}`);
}

export async function deleteWaybillAction(waybill_id: string): Promise<void> {
  await delWaybill(waybill_id);
  revalidatePath("/waybills");
  redirect("/waybills");
}

export async function deleteWaybillOfferAction(waybill_offer_id: string, waybill_id: string): Promise<void> {
  await delWaybillOffer(waybill_offer_id);
  revalidatePath(`/waybills/${waybill_id}`);
}

export async function updateWaybillOfferAction(
  waybill_offer_id: string,
  waybill_id: string,
  waybill_offer: WaybillOfferPutSchema,
): Promise<void> {
  await patchWaybillOffer(waybill_offer_id, waybill_offer);
  revalidatePath(`/waybills/${waybill_id}`);
}
