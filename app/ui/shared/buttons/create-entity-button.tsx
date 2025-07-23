import {CirclePlus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Loader} from 'lucide-react';

type CreateButtonProps = {
    onClick?: () => void;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    full?: boolean;
    disabled?: boolean;
    loading?: boolean
    className?: string;
};

export function CreateButton(
    {
        onClick,
        variant = "default",
        disabled = false,
        loading = false,
        className,
    }: CreateButtonProps) {
    return (
        <Button
            variant={variant}
            onClick={onClick}
            disabled={disabled}
            className={className}
        >
            {loading ? (
                <Loader className="h-5 w-5 animate-spin" />
            ) : (
                <>
                    <CirclePlus />
                    {<span>Создать</span>}
                </>
            )}
        </Button>
    );
}