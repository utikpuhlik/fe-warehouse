"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { showToastError } from "@/app/lib/utils/toastError";
import { TrashIcon } from "@heroicons/react/24/outline";

type Props = {
    entityName: string;
    entityId: string;
    deleteAction: (id: string) => Promise<void>;
    onDeleted?: () => void;
};

export function DeleteEntityButton({
                                       entityName,
                                       entityId,
                                       deleteAction,
                                       onDeleted,
                                   }: Props) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        const confirmed = confirm(`Вы уверены, что хотите удалить ${entityName}?\nЭто действие является безвозвратным!`);
        if (!confirmed) return;

        startTransition(async () => {
            try {
                await deleteAction(entityId);
                toast({
                    title: "Удалено",
                    description: `${entityName[0].toUpperCase() + entityName.slice(1)} успешно удален(а).`,
                });
                onDeleted?.();
            } catch (error) {
                showToastError(error);
            }
        });
    };

    return (
        <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
        >
            <TrashIcon/>
        </Button>
    );
}
