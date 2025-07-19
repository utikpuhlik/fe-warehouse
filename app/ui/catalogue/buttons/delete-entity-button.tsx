"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { showToastError } from "@/app/lib/errors/toastError";
import { TrashIcon } from "@heroicons/react/24/outline";
import {isRedirectError} from "next/dist/client/components/redirect-error";

type Props = {
    entityName: string;
    entityId: string;
    deleteAction: (id: string) => Promise<void>;
    onDeleted?: () => void;
    className?: string;
    disabled?: boolean;
};

export function DeleteEntityButton({
                                       entityName,
                                       entityId,
                                       deleteAction,
                                       onDeleted,
                                       className,
                                       disabled,
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
                if (isRedirectError(error)) return;
                showToastError(error);
            }
        });
    };

    return (
        <Button
            type="button"
            variant="destructive"
            size="icon"
            disabled={isPending || disabled}
            onClick={handleDelete}
            className={className}
        >
            <TrashIcon/>
        </Button>
    );
}
