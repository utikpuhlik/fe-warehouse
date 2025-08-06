import {Button} from "@/components/ui/button";
import {X, Loader} from 'lucide-react';

type CancelButtonProps = {
    onClick?: () => void;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    size?: "default" | "sm" | "lg" | "icon";
    full?: boolean;
    disabled?: boolean;
    loading?: boolean
    className?: string;
};

export function CancelButton({
                                onClick,
                                variant = "outline",
                                size = "icon",
                                full = true,
                                disabled = false,
                                loading = false,
                                className,
                            }: CancelButtonProps) {
    return (
        <Button
            variant={variant}
            size={size}
            onClick={onClick}
            disabled={disabled}
            className={className}
        >
            {loading ? (
                <Loader className="h-4 w-4 animate-spin" />
            ) : (
                <>
                    <X className="h-4 w-4" />
                    {full && <span>Сохранить</span>}
                </>
            )}
        </Button>
    );
}