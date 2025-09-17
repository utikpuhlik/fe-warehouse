"use client";

import { Loader2, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import * as React from "react";

import { showToastError } from "@/app/lib/errors/toastError";
import { ConfirmButton } from "@/app/ui/shared/buttons/confirm-button";
import { toast } from "@/hooks/use-toast";

type Props = {
  entityName: string;
  entityId: string;
  deleteAction: (id: string) => Promise<void>;
  onDeleted?: () => void;
  className?: string;
  disabled?: boolean;
};

export function DeleteEntityButton({ entityName, entityId, deleteAction, onDeleted, className, disabled }: Props) {
  const t = useTranslations("DeleteButton");
  const onConfirm = async () => {
    try {
      await deleteAction(entityId);
      toast({
        title: t("deleted"),
        description: `${entityName[0].toUpperCase() + entityName.slice(1)} ${t("delete_success")}`,
      });
      onDeleted?.();
    } catch (error) {
      if (isRedirectError(error)) return;
      showToastError(error);
    }
  };

  return (
    <ConfirmButton
      title={`${t("delete")} ${entityName}?`}
      description={t("one_way_action_alert")}
      confirmText={t("delete")}
      cancelText={t("cancel")}
      onConfirm={onConfirm}
      buttonProps={{
        type: "button",
        variant: "destructive",
        size: "icon",
        className,
        disabled,
      }}
      // content trigger-button: spinner with pending
      renderContent={isPending =>
        isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            <span className="sr-only">{t("deleting")}</span>
          </>
        ) : (
          <Trash2 className="size-4" />
        )
      }
    />
  );
}
