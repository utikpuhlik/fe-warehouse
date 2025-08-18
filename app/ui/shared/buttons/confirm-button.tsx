"use client";

import * as React from "react";
import {useTransition} from "react";
import {Button, type ButtonProps} from "@/components/ui/button";
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
import {Loader2} from "lucide-react";

export type ConfirmButtonProps = {
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => Promise<void> | void;
    onAfterSuccess?: () => void;
    buttonProps?: ButtonProps;
    renderContent?: (isPending: boolean) => React.ReactNode;
    loadingAriaLabel?: string;
};

export function ConfirmButton(
    {
        title,
        description,
        confirmText = "Confirm",
        cancelText = "Cancel",
        onConfirm,
        onAfterSuccess,
        buttonProps,
        renderContent,
        loadingAriaLabel = "Loading",
    }: ConfirmButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleConfirm = () => {
        startTransition(async () => {
            await onConfirm();
            onAfterSuccess?.();
        });
    };

    const DefaultTriggerContent = (
        <>
            {isPending ? (
                <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true"/>
                    <span className="sr-only">{loadingAriaLabel}</span>
                </>
            ) : (
                confirmText
            )}
        </>
    );

    const DefaultDialogActionContent = (
        <>
            {isPending ? (
                <>
                    <Loader2 className="size-4 animate-spin" aria-hidden="true"/>
                    <span className="sr-only">{loadingAriaLabel}</span>
                </>
            ) : (
                confirmText
            )}
        </>
    );

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button {...buttonProps} disabled={buttonProps?.disabled || isPending}>
                    {renderContent ? renderContent(isPending) : DefaultTriggerContent}
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    {description ? (
                        <AlertDialogDescription>{description}</AlertDialogDescription>
                    ) : null}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>{cancelText}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} disabled={isPending}>
                        {DefaultDialogActionContent}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
