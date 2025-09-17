"use client";

import { deleteWaybillOfferAction } from "@/app/lib/actions/waybillAction";
import type { WaybillOfferSchema } from "@/app/lib/schemas/waybillOfferSchema";
import { DeleteEntityButton } from "@/app/ui/shared/buttons/delete-entity-button";

export function DeleteWaybillOfferProxy(waybill_offer: WaybillOfferSchema) {
  const deleteFn = async () => {
    await deleteWaybillOfferAction(waybill_offer.id, waybill_offer.waybill_id);
  };

  return <DeleteEntityButton entityName="позицию" entityId={waybill_offer.id} deleteAction={deleteFn} />;
}
