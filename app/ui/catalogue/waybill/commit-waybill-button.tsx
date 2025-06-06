"use client";

import { useTransition } from "react";
import { SaveButton } from "@/app/ui/catalogue/buttons/save-button";
import { commitWaybillAction } from "@/app/lib/actions/waybillAction";
import { useToast } from "@/hooks/use-toast";
import { showToastError } from "@/app/lib/utils/toastError";

export function CommitWaybillButton({ waybill_id, disabled = false }: { waybill_id: string; disabled?: boolean }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleCommit = () => {
        startTransition(async () => {
            try {
                await commitWaybillAction(waybill_id);
                toast({
                    title: "Накладная сохранена",
                    description: "Изменения успешно зафиксированы",
                });
            } catch (error) {
                showToastError(error);
            }
        });
    };

    return <SaveButton onClick={handleCommit} disabled={disabled || isPending} />;
}
