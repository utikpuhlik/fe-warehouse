"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import * as React from "react";

import { commitWaybillAction } from "@/app/lib/actions/waybillAction";
import { showToastError } from "@/app/lib/errors/toastError";
import { ConfirmButton } from "@/app/ui/shared/buttons/confirm-button";
import { useToast } from "@/hooks/use-toast";

export function CommitWaybillButton({ waybill_id, disabled = false }: { waybill_id: string; disabled?: boolean }) {
  const t = useTranslations("CommitWaybillButton");
  const { toast } = useToast();

  const onConfirm = async () => {
    try {
      await commitWaybillAction(waybill_id);
      toast({
        title: t("waybill_success_title"),
        description: t("waybill_success_description"),
      });
    } catch (error) {
      showToastError(error);
    }
  };

  return (
    <ConfirmButton
      title={t("confirm_title")}
      description={t("confirm_description")}
      confirmText={t("waybill_save")}
      cancelText={t("cancel")}
      onConfirm={onConfirm}
      buttonProps={{
        type: "button",
        variant: "default",
        disabled,
      }}
      renderContent={isPending =>
        isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            <span className="sr-only">{t("committing")}</span>
          </>
        ) : (
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 className="size-4" />
            {t("waybill_save")}
          </span>
        )
      }
    />
  );
}
