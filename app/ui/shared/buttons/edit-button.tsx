import {Button} from "@/components/ui/button";
import {Loader, Pencil} from 'lucide-react';

type EditButtonProps = {
    onClick?: () => void;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon";
    full?: boolean;
    disabled?: boolean;
    loading?: boolean
    className?: string;
};

export function EditButton(
    {
        onClick,
        variant = "outline",
        size = "icon",
        full = false,
        disabled = false,
        loading = false,
        className,
    }: EditButtonProps) {
    return (
        <Button
            variant={variant}
            size={size}
            onClick={onClick}
            disabled={disabled}
            className={className}
        >
            {loading ? (
                <Loader className="h-4 w-4 animate-spin"/>
            ) : (
                <>
                    <Pencil className="h-4 w-4 text-muted-foreground"/>
                    {full && <span>Редактировать</span>}
                </>
            )}
        </Button>
    );
}