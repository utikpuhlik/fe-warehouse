import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

import { fetchWaybillOffers } from "@/app/lib/apis/waybillApi";
import type { WaybillOfferSchema } from "@/app/lib/schemas/waybillOfferSchema";
import type { WaybillSchema } from "@/app/lib/schemas/waybillSchema";
import { formatCurrency } from "@/app/lib/utils/utils";
import { CustomerBadge } from "@/app/ui/users/customer-badge";
import { DeleteWaybillOfferProxy } from "@/app/ui/waybill/delete-waybill-offer";
import { WaybillOfferQuantityEditor } from "@/app/ui/waybill/quantity-editor";
import { WaybillBadge } from "@/app/ui/waybill/waybill-badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type WaybillOffersTableProps = {
  waybill: WaybillSchema;
  is_disabled: boolean;
};
export default async function WaybillOffersTable({ waybill, is_disabled }: WaybillOffersTableProps) {
  const table = await getTranslations("OrderAndWaybillTable");
  const t = await getTranslations("WaybillsPage");
  const waybill_offers: WaybillOfferSchema[] = await fetchWaybillOffers(waybill.id);

  const totalSumRub = waybill_offers.reduce(
    (acc: number, wo: WaybillOfferSchema) => acc + wo.price_rub * wo.quantity,
    0,
  );

  if (!waybill_offers.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {t("waybill_items")}
            <div className="flex items-center space-x-2">
              <WaybillBadge waybillType={waybill.waybill_type} />
              <CustomerBadge customerType={waybill.customer.customer_type} />
            </div>
          </CardTitle>
        </CardHeader>
        <div className="p-4 text-muted-foreground">Позиции не добавлены</div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {t("waybill_items")}
          <div className="flex items-center space-x-2">
            <WaybillBadge waybillType={waybill.waybill_type} />
            <CustomerBadge customerType={waybill.customer.customer_type} />
          </div>
        </CardTitle>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{table("number")}</TableHead>
            <TableHead>{table("address_code")}</TableHead>
            <TableHead>{table("photo")}</TableHead>
            <TableHead>{table("system")}</TableHead>
            <TableHead>{table("subsystem")}</TableHead>
            <TableHead>{table("product_name")}</TableHead>
            <TableHead>{table("manufacturer")}</TableHead>
            <TableHead>{table("manufacturer_number")}</TableHead>
            <TableHead>{table("quantity")}</TableHead>
            <TableHead>{table("price")}</TableHead>
            <TableHead>{table("total")}</TableHead>
            {!is_disabled && <TableHead />}
          </TableRow>
        </TableHeader>
        <TableBody>
          {waybill_offers.map((wo: WaybillOfferSchema, index) => (
            <TableRow key={wo.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{wo.offer.address_id}</TableCell>
              <TableCell>
                <Image
                  src={wo.offer.product.image_url}
                  alt={wo.offer.product.name}
                  width={40}
                  height={40}
                  className="rounded"
                />
              </TableCell>
              <TableCell>
                <Link href={`/catalogue/${wo.offer.product.sub_category.category.slug}`}>
                  {wo.offer.product.sub_category.category.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/catalogue/${wo.offer.product.sub_category.category.slug}/${wo.offer.product.sub_category.slug}`}
                >
                  {wo.offer.product.sub_category.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/catalogue/${wo.offer.product.sub_category.category.slug}/${wo.offer.product.sub_category.slug}/${wo.offer.product_id}`}
                >
                  {wo.offer.product.name}
                </Link>
              </TableCell>
              <TableCell>{wo.brand}</TableCell>
              <TableCell>{wo.manufacturer_number}</TableCell>
              <TableCell>
                <WaybillOfferQuantityEditor waybillOffer={wo} is_disabled={is_disabled} />
              </TableCell>
              <TableCell>{formatCurrency(wo.price_rub)}</TableCell>
              <TableCell>{formatCurrency(wo.price_rub * wo.quantity)}</TableCell>
              {!is_disabled && (
                <TableCell>
                  <DeleteWaybillOfferProxy {...wo} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-muted/40 font-semibold">
            <TableCell colSpan={9} />
            <TableCell className="text-right">Σ</TableCell>
            <TableCell>{formatCurrency(totalSumRub)}</TableCell>
            {!is_disabled && <TableCell />}
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  );
}
