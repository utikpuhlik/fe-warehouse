"use client";

import { BriefcaseBusinessIcon, ClockIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { OrderSchema } from "@/app/lib/schemas/orderSchema";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils/utils";
import { OrderBadge } from "@/app/ui/orders/order-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LatestActivity({ orders }: { orders: OrderSchema[] }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Недавние заказы</CardTitle>
          <Link href="/orders" className="text-sm text-muted-foreground hover:text-primary hover:underline">
            Все заказы
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <ol className="relative border-s">
          {orders.map(order => (
            <li
              key={order.id}
              className="group mb-10 ms-6 space-y-2 rounded-md p-2 transition-colors hover:bg-muted/40"
            >
              <Link href={`/orders/${order.id}`} className="block space-y-2">
                <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full border bg-muted">
                  <BriefcaseBusinessIcon className="size-3 text-primary" />
                </span>
                <h3 className="flex items-center gap-2 font-semibold">
                  Заказ от {formatDateToLocal(order.created_at, "ru-RU", true)}
                  <OrderBadge orderStatus={order.status} />
                </h3>
                <time className="flex items-center gap-1.5 text-sm leading-none text-muted-foreground">
                  <ClockIcon className="size-3" />
                  {formatDateToLocal(order.created_at)}
                </time>
                <p className="text-sm text-muted-foreground">
                  Покупатель: {order.user.first_name} ({order.user.email})
                </p>
                <p className="text-sm text-muted-foreground">Сумма: {`${formatCurrency(order.total_sum)}`}</p>
                <p className="text-sm text-muted-foreground">Позиций: {order.order_offers.length}</p>
              </Link>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}
