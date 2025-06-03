import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { fetchWaybillOffers } from "@/app/lib/apis/waybillApi";
import type { WaybillOfferSchema } from "@/app/lib/schemas/waybillOfferSchema";
import type {WaybillSchema} from "@/app/lib/schemas/waybillSchema";
import {DeleteWaybillOfferProxy} from "@/app/ui/catalogue/waybill/delete-waybill-offer";

export default async function WaybillOffersTable(waybill: WaybillSchema) {
    const offers: WaybillOfferSchema[] = await fetchWaybillOffers(waybill.id);
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
                        <TableHead>Фото</TableHead>
                        <TableHead>Название</TableHead>
                        <TableHead>Бренд</TableHead>
                        <TableHead>Артикул</TableHead>
                        <TableHead>Цена</TableHead>
                        <TableHead>Кол-во</TableHead>
                        <TableHead>Сумма</TableHead>
                        {waybill.is_pending && <TableHead />}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {offers.map((o) => (
                        <TableRow key={o.id}>
                            <TableCell>
                                <Image
                                    src={o.image_url}
                                    alt={o.product_name}
                                    width={40}
                                    height={40}
                                    className="rounded"
                                />
                            </TableCell>
                            <TableCell>{o.product_name}</TableCell>
                            <TableCell>{o.brand}</TableCell>
                            <TableCell>{o.manufacturer_number}</TableCell>
                            <TableCell>{o.price_rub.toFixed(2)} ₽</TableCell>
                            <TableCell>{o.quantity}</TableCell>
                            <TableCell>{(o.price_rub * o.quantity).toFixed(2)} ₽</TableCell>
                            {waybill.is_pending && (
                                <TableCell>
                                    <DeleteWaybillOfferProxy {...o} />
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
