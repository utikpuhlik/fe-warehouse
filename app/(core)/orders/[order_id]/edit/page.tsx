import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import OrderOffersTable from "@/app/ui/orders/order-offers-table";
import type { Metadata } from "next";
import type { OrderSchema } from "@/app/lib/schemas/orderSchema";
import { fetchOrderById } from "@/app/lib/apis/orderApi";
import {
  ORDER_STATUS_LABELS,
  USER_TYPE_LABELS,
} from "@/app/lib/schemas/commonSchema";
import Breadcrumbs from "@/app/ui/shared/breadcrumbs";
import { DownloadOrderWord } from "@/app/ui/orders/download-order-word";
import { CreateOrderOfferForm } from "@/app/ui/orders/create-order-offer";

type Props = {
  params: Promise<{ order_id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { order_id } = await params;
  const order: OrderSchema = await fetchOrderById(order_id);
  if (!order) {
    return {
      title: "Заказ не найден | TCF",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: `Заказ - ${ORDER_STATUS_LABELS[order.status]} | TCF`,
  };
}

export default async function Page({ params }: Props) {
  const { order_id } = await params;
  const order: OrderSchema = await fetchOrderById(order_id);

  const fullName = `${order.user.first_name} ${order.user.last_name}`;
  return (
    <main>
      <div className="mb-4 flex items-center justify-between">
        <Breadcrumbs
          breadcrumbs={[
            {
              label: ORDER_STATUS_LABELS[order.status],
              href: `/orders?status=${order.status}`,
            },
            {
              label: USER_TYPE_LABELS[order.user.customer_type],
              href: "/orders",
            },
            {
              label: fullName,
              href: `/orders/${order_id}`,
              active: true,
            },
          ]}
        />
        <div className="flex space-x-2">
          <DownloadOrderWord orderId={order_id} />
        </div>
      </div>
      <div className="mt-6 mb-4">
        <CreateOrderOfferForm order={order} />
      </div>
      <Suspense fallback={<Skeleton className="h-32" />}>
        <OrderOffersTable order={order} />
      </Suspense>
    </main>
  );
}
