"use client";

import * as React from "react";
import Link from "next/link";
import { BriefcaseBusinessIcon, ClockIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderSchema } from "@/app/lib/schemas/orderSchema";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils/utils";
import { OrderBadge } from "@/app/ui/orders/order-badge";

export function LatestActivity({ orders }: { orders: OrderSchema[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Недавние заказы</CardTitle>
          <Link
            href="/orders"
            className="text-muted-foreground hover:text-primary text-sm hover:underline"
          >
            Все заказы
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <ol className="relative border-s">
          {orders.map((order) => (
            <li
              key={order.id}
              className="ms-6 mb-10 space-y-2 hover:bg-muted/40 p-2 rounded-md transition-colors group"
            >
              <Link href={`/orders/${order.id}`} className="block space-y-2">
                <span className="bg-muted absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full border">
                  <BriefcaseBusinessIcon className="text-primary size-3" />
                </span>
                <h3 className="flex items-center font-semibold gap-2">
                  Заказ от {formatDateToLocal(order.created_at, "ru-RU", true)}
                  <OrderBadge orderStatus={order.status} />
                </h3>
                <time className="text-muted-foreground flex items-center gap-1.5 text-sm leading-none">
                  <ClockIcon className="size-3" />
                  {formatDateToLocal(order.created_at)}
                </time>
                <p className="text-muted-foreground text-sm">
                  Покупатель: {order.user.first_name} ({order.user.email})
                </p>
                <p className="text-muted-foreground text-sm">
                  Сумма: {`${formatCurrency(order.total_sum)}`}
                </p>
                <p className="text-muted-foreground text-sm">
                  Позиций: {order.order_offers.length}
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
