import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { fetchWaybillOffers } from "@/app/lib/apis/waybillApi";
import type { WaybillOfferSchema } from "@/app/lib/schemas/waybillOfferSchema";
import type { WaybillSchema } from "@/app/lib/schemas/waybillSchema";
import { DeleteWaybillOfferProxy } from "@/app/ui/waybill/delete-waybill-offer";
import Link from "next/link";

export default async function WaybillOffersTable(waybill: WaybillSchema) {
  const waybill_offers: WaybillOfferSchema[] = await fetchWaybillOffers(waybill.id);

  const totalSumRub = waybill_offers.reduce(
    (acc: number, wo: WaybillOfferSchema) => acc + wo.price_rub * wo.quantity,
    0,
  );

  if (!waybill_offers.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Состав накладной</CardTitle>
        </CardHeader>
        <div className="p-4 text-muted-foreground">Позиции не добавлены</div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Состав накладной</CardTitle>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead>Адресный код</TableHead>
            <TableHead>Фото</TableHead>
            <TableHead>Система</TableHead>
            <TableHead>Подсистема</TableHead>
            <TableHead>Наименование</TableHead>
            <TableHead>Бренд</TableHead>
            <TableHead>Артикул</TableHead>
            <TableHead>Кол-во</TableHead>
            <TableHead>Цена</TableHead>
            <TableHead>Сумма</TableHead>
            {waybill.is_pending && <TableHead />}
          </TableRow>
        </TableHeader>
        <TableBody>
          {waybill_offers.map((wo: WaybillOfferSchema, index) => (
            <TableRow key={wo.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{wo.offer.address_id}</TableCell>
              <TableCell>
                <Link
                  href={`/catalogue/${wo.offer.product.sub_category.category.slug}/${wo.offer.product.sub_category.slug}/${wo.offer.product_id}`}
                  className="px-3 py-2 flex items-center gap-3 w-full hover:bg-muted"
                >
                  <Image
                    src={wo.offer.product.image_url}
                    alt={wo.offer.product.name}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                </Link>
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
              <TableCell>{wo.offer.product.name}</TableCell>
              <TableCell>{wo.brand}</TableCell>
              <TableCell>{wo.manufacturer_number}</TableCell>
              <TableCell>{wo.quantity}</TableCell>
              <TableCell>{wo.price_rub.toFixed(2)} ₽</TableCell>
              <TableCell>{(wo.price_rub * wo.quantity).toFixed(2)} ₽</TableCell>
              {waybill.is_pending && (
                <TableCell>
                  <DeleteWaybillOfferProxy {...wo} />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="font-semibold bg-muted/40">
            <TableCell colSpan={9} />
            <TableCell className="text-right">Σ</TableCell>
            <TableCell>{totalSumRub.toFixed(2)} ₽</TableCell>
            {waybill.is_pending && <TableCell />}
          </TableRow>
        </TableFooter>
      </Table>
    </Card>
  );
}
