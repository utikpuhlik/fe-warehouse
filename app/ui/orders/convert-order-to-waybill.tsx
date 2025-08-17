"use client";

import * as React from "react";
import { useTransition } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, FileDiff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { convertOrderToWaybillAction } from "@/app/lib/actions/orderAction";
import { useTranslations } from "next-intl";

type ConvertOrderItemProps = {
  orderId: string;
};

export function ConvertOrderToWaybill({ orderId }: ConvertOrderItemProps) {
  const t = useTranslations("ConvertOrderToWaybill");
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleConvert = () => {
    startTransition(async () => {
      try {
        await convertOrderToWaybillAction(orderId);
        toast({
          title: t("convert_success_title"),
          description: t("convert_success_desc"),
        });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : t("unknown_error");
        toast({
          title: t("convert_error_title"),
          description: message,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          disabled={isPending}
          onSelect={(e) => e.preventDefault()} // prevent Menu from closing early on Enter
        >
          {isPending ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="size-4 animate-spin" />
              {t("converting")}
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <FileDiff className="size-4" />
              {t("convert")}
            </span>
          )}
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("confirm_convert_title")}</AlertDialogTitle>
          <AlertDialogDescription>
            {t("confirm_convert_desc")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConvert} disabled={isPending}>
            {isPending ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                {t("converting")}
              </span>
            ) : (
              t("confirm")
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
