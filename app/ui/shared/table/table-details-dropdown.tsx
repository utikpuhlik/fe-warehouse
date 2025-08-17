import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { useTranslations } from "next-intl";
import { ConvertOrderToWaybill } from "@/app/ui/orders/convert-order-to-waybill";

type TableDetailsDropdownProps = {
  href_edit: string;
};

type TableDetailsOrderDropdownProps = {
  order_id: string;
};

export function TableDetailsDropdown({ href_edit }: TableDetailsDropdownProps) {
  const t = useTranslations("TableDetailsDropdown");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="sr-only">{t("accessibility")}</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href={href_edit}>{t("edit")}</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function TableDetailsOrderDropdown({
  order_id,
}: TableDetailsOrderDropdownProps) {
  const t = useTranslations("TableDetailsOrderDropdown");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="sr-only">{t("accessibility")}</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href={`/orders/${order_id}`}>{t("details")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/orders/${order_id}/edit`}>{t("edit")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/orders/${order_id}/print`}>{t("print")}</Link>
        </DropdownMenuItem>
        <ConvertOrderToWaybill orderId={order_id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
