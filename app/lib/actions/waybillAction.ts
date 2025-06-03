"use server"

import {postWaybill, delWaybill, delWaybillOffer} from "@/app/lib/apis/waybillApi";
import {revalidatePath} from "next/cache";
import type {WaybillPostSchema} from "@/app/lib/schemas/waybillSchema";

export async function createWaybillAction(waybill: WaybillPostSchema): Promise<void> {
    await postWaybill(waybill)
    revalidatePath("/waybills");
}

export async function deleteWaybillAction(waybill_id: string): Promise<void> {
    await delWaybill(waybill_id)
    revalidatePath("/waybills");
}

export async function deleteWaybillOfferAction(waybill_offer_id: string, waybill_id: string): Promise<void> {
    await delWaybillOffer(waybill_offer_id)
    revalidatePath(`/waybills/${waybill_id}`);
}
