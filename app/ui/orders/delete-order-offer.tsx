"use client";


import { deleteOrderOfferAction } from "@/app/lib/actions/orderAction";
import { DeleteEntityButton } from "@/app/ui/shared/buttons/delete-entity-button";
import type {OrderOfferSchema} from "@/app/lib/schemas/orderOfferSchema";


export function DeleteOrderOfferProxy(order_offer: OrderOfferSchema) {
    const deleteFn = async () => {
        await deleteOrderOfferAction(order_offer.id, order_offer.order_id);
    };

    return (
        <DeleteEntityButton
            entityName="позицию"
            entityId={order_offer.id}
            deleteAction={deleteFn}
        />
    );
}
