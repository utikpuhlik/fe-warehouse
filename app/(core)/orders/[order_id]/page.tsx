import Link from "next/link";
import Image from "next/image";
import {
    ChevronLeft,
    CreditCard,
    EditIcon,
} from "lucide-react";
import {formatCurrency, formatDateToLocal} from "@/app/lib/utils";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {Separator} from "@/components/ui/separator";
import {notFound} from "next/navigation";
import {OrderSchema} from "@/app/lib/schemas/orderSchema";
import {fetchOrderById} from "@/app/lib/apis/orderApi";
import {EditOrderButton} from "@/app/ui/orders/edit-order-button";
import type {Metadata} from "next";
import {getDictionary} from "@/app/lib/i18n";
import {OrderProgressTracker} from "@/app/ui/orders/order-progress-tracker";
import {PrintButton} from "@/app/ui/shared/buttons/print-button";

const currentLang = "ru";
const dict = getDictionary(currentLang);

type Props = {
    params: Promise<{ order_id: string }>
};

export async function generateMetadata(
    {params}: Props
): Promise<Metadata> {
    const {order_id} = await params;
    const order: OrderSchema = await fetchOrderById(order_id);

    return {
        title: `${order.id} | TCF`
    };
}
export default async function Page({params}: Props) {
    const {order_id} = await params;
    const order: OrderSchema = await fetchOrderById(order_id);
    if (!order) {
        notFound()
    }

    return (
        <div className="mx-auto max-w-screen-lg space-y-4 lg:mt-10">
            <div className="flex items-center justify-between">
                <Button asChild variant="outline">
                    <Link href="/orders">
                        <ChevronLeft/>
                    </Link>
                </Button>
                <div className="flex gap-2">
                    <PrintButton orderId={order_id}/>
                    <EditOrderButton orderId={order_id}/>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-display text-2xl">{dict.order} {order.id}</CardTitle>
                        <p className="text-muted-foreground text-sm">{dict.createdAt} {formatDateToLocal(
                            order.created_at,
                            "ru-RU",
                            true
                        )}</p>
                    </CardHeader>
                    <CardContent>
                        <Separator className="mb-4"/>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="font-semibold mb-1">{dict.customerInfo}</h3>
                                <Link href={`/users/${order.user_id}`} className="hover:underline">
                                    {order.user.first_name} {order.user.last_name}
                                </Link>
                                <p>{order.user.email}</p>
                                <p className="text-muted-foreground text-sm">{order.address.city}, {order.address.street}</p>
                            </div>
                            <div className="bg-muted flex items-center justify-between space-y-2 rounded-md border p-4">
                                <div className="space-y-1">
                                    <h3 className="font-semibold">{dict.paymentMethod}</h3>
                                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                                        <CreditCard className="size-4"/> Visa ending in **** 1234
                                    </div>
                                </div>
                                <Button variant="outline">
                                    <EditIcon/>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{dict.orderSummary}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <span>{dict.subTotal}</span>
                            <span>{formatCurrency(order.total_sum)}</span>
                        </div>
                        {/*TODO: add shipping cost*/}
                        {/*<div className="flex justify-between">*/}
                        {/*  <span>Shipping</span>*/}
                        {/*  <span>{10}</span>*/}
                        {/*</div>*/}
                        <Separator/>
                        <div className="flex justify-between font-semibold">
                            <span>{dict.total}</span>
                            <span>{formatCurrency(order.total_sum)}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <OrderProgressTracker status={order.status} updatedAt={order.updated_at}/>

            <Card>
                <CardHeader>
                    <CardTitle>{dict.orderItems}</CardTitle>
                </CardHeader>
                <CardContent>
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
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order.order_offers.map((order_offer, index) => (
                                <TableRow key={order_offer.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{order_offer.offer.address_id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <Image
                                                src={order_offer.offer.product.image_url}
                                                width={60}
                                                height={60}
                                                alt=""
                                                unoptimized
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            href={`/catalogue/${order_offer.offer.product.sub_category.category.slug}`}>
                                            {order_offer.offer.product.sub_category.category.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            href={`/catalogue/${order_offer.offer.product.sub_category.category.slug}/${order_offer.offer.product.sub_category.slug}`}
                                        >
                                            {order_offer.offer.product.sub_category.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/catalogue/${order_offer.offer.product.sub_category.category.slug}/${order_offer.offer.product.sub_category.slug}/${order_offer.offer.product.id}`}>
                                            {order_offer.offer.product.name}
                                        </Link>
                                        </TableCell>
                                    <TableCell>{order_offer.brand}</TableCell>
                                    <TableCell>{order_offer.manufacturer_number}</TableCell>
                                    <TableCell>{order_offer.quantity}</TableCell>
                                    <TableCell>{formatCurrency(order_offer.price_rub)}</TableCell>
                                    <TableCell>{formatCurrency(order_offer.price_rub * order_offer.quantity)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
