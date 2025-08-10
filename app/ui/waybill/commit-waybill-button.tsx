"use client";

import { useTransition } from "react";
import { SaveButton } from "@/app/ui/shared/buttons/save-button";
import { commitWaybillAction } from "@/app/lib/actions/waybillAction";
import { useToast } from "@/hooks/use-toast";
import { showToastError } from "@/app/lib/errors/toastError";

export function CommitWaybillButton({ waybill_id, disabled = false }: { waybill_id: string; disabled?: boolean }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleCommit = () => {
        const confirmed = confirm(`Вы уверены, что хотите провести накладную?\nРедактирование больше не будет возможно!`);
        if (!confirmed) return;
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

    return <SaveButton onClick={handleCommit} disabled={disabled || isPending} text="Сохранить накладную"/>;
}
