import { generateMeta } from "@/app/lib/utils";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import OrdersDataTable from "./data-table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {fetchOrders} from "@/app/lib/apis/orderApi";
import {OrderSchema} from "@/app/lib/schemas/orderSchema";

export async function generateMetadata() {
  return generateMeta({
    title: "Заказы",
    description:
      "A list of orders generated using the Tanstack Table.",
    canonical: "/orders"
  });
}

export default async function Page() {
  const orders: OrderSchema[] = await fetchOrders();

  return (
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight lg:text-2xl">Orders</h1>
        <Button asChild>
          <Link href="#">
            <CirclePlus /> Create Order
          </Link>
        </Button>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">All</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="processed">Processed</TabsTrigger>
          <TabsTrigger value="returned">Returned</TabsTrigger>
          <TabsTrigger value="canceled">Canceled</TabsTrigger>
        </TabsList>
        <OrdersDataTable data={orders} />
      </Tabs>
    </div>
  );
}
