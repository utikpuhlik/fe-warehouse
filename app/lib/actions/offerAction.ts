"use server";

import {
  type OfferPostSchema,
  type OfferPutSchema,
  zOfferPostSchema,
  zOfferPutSchema,
} from "@/app/lib/schemas/offerSchema";
import { postOffer, delOffer, putOffer } from "@/app/lib/apis/offerApi";
import { revalidatePath } from "next/cache";

export async function createOfferAction(
  offer: OfferPostSchema,
  category_slug: string,
  sub_category_slug: string,
  product_id: string,
): Promise<void> {
  const valid = zOfferPostSchema.parse(offer)
  if (!valid) {
    throw new Error("Zod server validation failed")
  }
  await postOffer(offer);
  revalidatePath(
    `/catalogue/${category_slug}/${sub_category_slug}/${product_id}`,
  );
}

export async function updateOfferAction(
  offer_id: string,
  offer: OfferPutSchema,
  category_slug: string,
  sub_category_slug: string,
  product_id: string,
): Promise<void> {
  const valid = zOfferPutSchema.parse(offer)
  if (!valid) {
    throw new Error("Zod server validation failed")
  }
  await putOffer(offer_id, offer);
  revalidatePath(
    `/catalogue/${category_slug}/${sub_category_slug}/${product_id}`,
  );
}

export async function deleteOfferAction(
  offer_id: string,
  category_slug: string,
  sub_category_slug: string,
  product_id: string
): Promise<void> {
  await delOffer(offer_id);
  revalidatePath(`/catalogue/${category_slug}/${sub_category_slug}/${product_id}`);
}
