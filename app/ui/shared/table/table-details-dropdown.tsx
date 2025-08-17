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

type TableDetailsDropdownProps = {
  href_edit: string;
};

type TableDetailsOrderDropdownProps = {
  href_edit: string;
  href_details: string;
  href_print: string;
  href_convert: string;
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
  href_edit,
  href_details,
  href_convert,
  href_print,
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
          <Link href={href_details}>{t("details")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={href_edit}>{t("edit")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={href_print}>{t("print")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={href_convert}>{t("convert")}</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
