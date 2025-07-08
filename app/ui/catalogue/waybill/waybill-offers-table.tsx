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
import { DeleteWaybillOfferProxy } from "@/app/ui/catalogue/waybill/delete-waybill-offer";
import Link from "next/link";

export default async function WaybillOffersTable(waybill: WaybillSchema) {
  const offers: WaybillOfferSchema[] = await fetchWaybillOffers(waybill.id);

  const totalSumRub = offers.reduce(
    (acc: number, o: WaybillOfferSchema) => acc + o.price_rub * o.quantity,
    0,
  );

  if (!offers.length) {
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
          {offers.map((o: WaybillOfferSchema, index) => (
            <TableRow key={o.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{o.address_id}</TableCell>
              <TableCell>
                <Link
                  href={`/catalogue/${o.category_slug}/${o.sub_category_slug}/${o.product_id}`}
                  className="px-3 py-2 flex items-center gap-3 w-full hover:bg-muted"
                >
                  <Image
                    src={o.image_url}
                    alt={o.product_name}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/catalogue/${o.category_slug}`}>
                  {o.category_name}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/catalogue/${o.category_slug}/${o.sub_category_slug}`}
                >
                  {o.sub_category_name}
                </Link>
              </TableCell>
              <TableCell>{o.product_name}</TableCell>
              <TableCell>{o.brand}</TableCell>
              <TableCell>{o.manufacturer_number}</TableCell>
              <TableCell>{o.quantity}</TableCell>
              <TableCell>{o.price_rub.toFixed(2)} ₽</TableCell>
              <TableCell>{(o.price_rub * o.quantity).toFixed(2)} ₽</TableCell>
              {waybill.is_pending && (
                <TableCell>
                  <DeleteWaybillOfferProxy {...o} />
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
