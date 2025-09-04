import { generateMeta } from "@/app/lib/utils/utils";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import OrdersDataTable from "./data-table";
import { fetchOrders } from "@/app/lib/apis/orderApi";
import {
  OrderPaginatedSchema,
  OrderSchema,
} from "@/app/lib/schemas/orderSchema";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("PageTitles");
  const tDesc = await getTranslations("PageDescriptions");
  return generateMeta({
    title: t("orders"),
    description: tDesc("orders"),
    canonical: "/orders",
  });
}

export default async function Page() {
  const t = await getTranslations("OrdersPage");
  const a = await getTranslations("Actions");
  const data: OrderPaginatedSchema = await fetchOrders();
  const orders: OrderSchema[] = data.items;

  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{t("orders")}</h1>
        <Button asChild>
          <Link href="#">
            <CirclePlus /> {a("create")}
          </Link>
        </Button>
      </div>
      <OrdersDataTable data={orders} />
    </>
  );
}
