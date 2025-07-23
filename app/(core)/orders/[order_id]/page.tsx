import Link from "next/link";
import Image from "next/image";
import {
    CheckCircle,
    CheckCircle2,
    ChevronLeft,
    CreditCard,
    EditIcon,
    Package,
    Printer,
    Truck
} from "lucide-react";
import {formatDateToLocal} from "@/app/lib/utils";

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
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {Progress} from "@/components/ui/progress";
import {notFound} from "next/navigation";
import {OrderSchema} from "@/app/lib/schemas/orderSchema";
import {fetchOrderById} from "@/app/lib/apis/orderApi";
import {EditOrderButton} from "@/app/ui/shared/buttons/edit-order-button";
import type {Metadata} from "next";

type Props = {
    params: Promise<{ order_id: string }>
};
type OrderStatus = "NEW" | "IN_PROGRESS" | "SHIPPING" | "COMPLETED" | "CANCELLED";

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

    const statusSteps: Record<OrderStatus, string> = {
        NEW: "Processing",
        IN_PROGRESS: "Shipped",
        SHIPPING: "Out for Delivery",
        COMPLETED: "Delivered",
        CANCELLED: "Cancelled"
    };

    const currentStep = statusSteps[order.status];
    const currentStepIndex = Object.keys(statusSteps).indexOf(order.status);

    return (
        <div className="mx-auto max-w-screen-lg space-y-4 lg:mt-10">
            <div className="flex items-center justify-between">
                <Button asChild variant="outline">
                    <Link href="/orders">
                        <ChevronLeft/>
                    </Link>
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Printer/>
                        Print
                    </Button>
                    <EditOrderButton orderId={order_id}/>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-display text-2xl">Order {order.id}</CardTitle>
                        <p className="text-muted-foreground text-sm">Placed on {formatDateToLocal(
                            order.created_at,
                            "ru-RU",
                            true
                        )}</p>
                    </CardHeader>
                    <CardContent>
                        <Separator className="mb-4"/>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="font-semibold mb-1">Customer Information</h3>
                                <Link href={`/users/${order.user_id}`} className="hover:underline">
                                    {order.user.first_name} {order.user.last_name}
                                </Link>
                                <p>{order.user.email}</p>
                                <p className="text-muted-foreground text-sm">{order.address.city}, {order.address.street}</p>
                            </div>
                            <div className="bg-muted flex items-center justify-between space-y-2 rounded-md border p-4">
                                <div className="space-y-1">
                                    <h3 className="font-semibold">Payment Method</h3>
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
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${order.total_sum.toFixed(2)}</span>
                        </div>
                        {/*TODO: add shipping cost*/}
                        {/*<div className="flex justify-between">*/}
                        {/*  <span>Shipping</span>*/}
                        {/*  <span>${order.address.shipping_cost.toFixed(2)}</span>*/}
                        {/*</div>*/}
                        <Separator/>
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${order.total_sum.toFixed(2)}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center">Delivery Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative space-y-6 pt-1">
                        <div className="mb-2 flex items-center justify-between">
                            {Object.keys(statusSteps).map((step, index) => (
                                <div key={index} className="text-center">
                                    <div
                                        className={`mx-auto flex size-12 items-center justify-center rounded-full text-lg ${index <= currentStepIndex ? "bg-green-600 text-white dark:bg-green-900" : "bg-muted border"} `}>
                                        {index < currentStepIndex ? (
                                            <CheckCircle className="size-5"/>
                                        ) : (
                                            {
                                                NEW: <Package className="size-5"/>,
                                                IN_PROGRESS: <Truck className="size-5"/>,
                                                SHIPPING: <Truck className="size-5"/>,
                                                COMPLETED: <CheckCircle2 className="size-5"/>,
                                                CANCELLED: <CheckCircle2 className="size-5"/>
                                            }[step as OrderStatus]
                                        )}
                                    </div>
                                    <div className="mt-2 text-xs">{statusSteps[step as OrderStatus]}</div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-6">
                            <Progress
                                className="w-full"
                                value={(currentStepIndex / (Object.keys(statusSteps).length - 1)) * 100}
                                color="bg-green-200 dark:bg-green-800"
                            />
                            <div className="text-muted-foreground text-sm">
                                <Badge variant="info" className="me-1">
                                    {currentStep}
                                </Badge>{" "}
                                on December 23, 2024
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
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
                                                src={order_offer.offer.product.image_url ?? undefined}
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
                                    <TableCell>{order_offer.offer.product.name}</TableCell>
                                    <TableCell>{order_offer.brand}</TableCell>
                                    <TableCell>{order_offer.manufacturer_number}</TableCell>
                                    <TableCell>{order_offer.quantity}</TableCell>
                                    <TableCell>{order_offer.price_rub.toFixed(2)} ₽</TableCell>
                                    <TableCell>{(order_offer.price_rub * order_offer.quantity).toFixed(2)} ₽</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
