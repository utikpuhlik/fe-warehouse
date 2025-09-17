"use client";

import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";

import { updateOrderAction } from "@/app/lib/actions/orderAction";
import { zOrderStatusEnum, type OrderStatusEnum } from "@/app/lib/schemas/commonSchema";
import type { OrderSchema } from "@/app/lib/schemas/orderSchema";
import { OrderBadge } from "@/app/ui/orders/order-badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface OrderStatusSelectProps {
  order: OrderSchema;
}

export function OrderStatusSelect({ order }: OrderStatusSelectProps) {
  const [selected, setSelected] = useState<OrderStatusEnum>(order.status);
  const [isPending, startTransition] = useTransition();
  const t = useTranslations("Toast");

  const handleChange = (value: string) => {
    const casted = value as OrderStatusEnum;
    setSelected(casted);

    startTransition(async () => {
      try {
        await updateOrderAction(order.id, { ...order, status: casted });
        toast({
          title: t("success"),
          description: `${t("order_updated")} ${order.id}`,
        });
      } catch (error) {
        console.error("Error updating order status:", error);
        toast({
          title: t("error"),
          description: t("order_status_update_error"),
          variant: "destructive",
        });
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" disabled={isPending}>
          <OrderBadge orderStatus={selected} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {zOrderStatusEnum.options.map((status: OrderStatusEnum) => (
            <DropdownMenuItem key={status} onSelect={() => handleChange(status)} className="flex items-center gap-2">
              <OrderBadge orderStatus={status} />
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
