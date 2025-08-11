import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";
import Image from "next/image";
import {fetchWaybillOffers} from "@/app/lib/apis/waybillApi";
import type {WaybillOfferSchema} from "@/app/lib/schemas/waybillOfferSchema";
import type {WaybillSchema} from "@/app/lib/schemas/waybillSchema";
import {DeleteWaybillOfferProxy} from "@/app/ui/waybill/delete-waybill-offer";
import Link from "next/link";
import {WaybillBadge} from "@/app/ui/waybill/waybill-badge";
import {CustomerBadge} from "@/app/ui/users/customer-badge";
import {formatCurrency} from "@/app/lib/utils";
import {WaybillOfferQuantityEditor} from "@/app/ui/waybill/quantity-editor";
import {getDictionary} from "@/app/lib/i18n";

const currentLang = "ru";
const dict = getDictionary(currentLang);
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
                    <CardTitle className="flex items-center justify-between">
                        Состав накладной
                        <div className="flex items-center space-x-2">
                            <WaybillBadge waybillType={waybill.waybill_type}/>
                            <CustomerBadge customerType={waybill.customer.customer_type}/>
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
                    Состав накладной
                    <div className="flex items-center space-x-2">
                        <WaybillBadge waybillType={waybill.waybill_type}/>
                        <CustomerBadge customerType={waybill.customer.customer_type}/>
                    </div>
                </CardTitle>
            </CardHeader>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>{dict.table.number}</TableHead>
                        <TableHead>{dict.table.address_code}</TableHead>
                        <TableHead>{dict.table.photo}</TableHead>
                        <TableHead>{dict.table.system}</TableHead>
                        <TableHead>{dict.table.subsystem}</TableHead>
                        <TableHead>{dict.table.product_name}</TableHead>
                        <TableHead>{dict.table.manufacturer}</TableHead>
                        <TableHead>{dict.table.manufacturer_number}</TableHead>
                        <TableHead>{dict.table.quantity}</TableHead>
                        <TableHead>{dict.table.price}</TableHead>
                        <TableHead>{dict.table.total}</TableHead>
                        {waybill.is_pending && <TableHead/>}
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
                                <WaybillOfferQuantityEditor waybillOffer={wo}/>
                            </TableCell>
                            <TableCell>{formatCurrency(wo.price_rub)}</TableCell>
                            <TableCell>{formatCurrency(wo.price_rub * wo.quantity)}</TableCell>
                            {waybill.is_pending &&  (
                                <TableCell>
                                    <DeleteWaybillOfferProxy {...wo} />
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="font-semibold bg-muted/40">
                        <TableCell colSpan={9}/>
                        <TableCell className="text-right">Σ</TableCell>
                        <TableCell>{formatCurrency(totalSumRub)}</TableCell>
                        {waybill.is_pending && <TableCell/>}
                    </TableRow>
                </TableFooter>
            </Table>
        </Card>
    );
}
