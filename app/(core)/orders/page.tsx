import {generateMeta} from "@/app/lib/utils";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {CirclePlus} from "lucide-react";
import OrdersDataTable from "./data-table";
import {fetchOrders} from "@/app/lib/apis/orderApi";
import {OrderPaginatedSchema, OrderSchema} from "@/app/lib/schemas/orderSchema";

export async function generateMetadata() {
    return generateMeta({
        title: "Заказы",
        description:
            "A list of orders generated using the Tanstack Table.",
        canonical: "/orders"
    });
}

export default async function Page() {
    const data: OrderPaginatedSchema = await fetchOrders();
    const orders: OrderSchema[] = data.items;

    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <h1 className="text-2xl font-bold tracking-tight">Заказы</h1>
                <Button asChild>
                    <Link href="#">
                        <CirclePlus/> Create Order
                    </Link>
                </Button>
            </div>
            <OrdersDataTable data={orders}/>
        </>
    );
}
