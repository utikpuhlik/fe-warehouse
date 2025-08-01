import {Button} from "@/components/ui/button";
import {Loader, Save} from 'lucide-react';

type SaveButtonProps = {
    onClick?: () => void;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    full?: boolean;
    disabled?: boolean;
    loading?: boolean
    className?: string;
};

export function SaveButton({
    onClick,
    variant = "outline",
    full = true,
    disabled = false,
    loading = false,
    className,
    }: SaveButtonProps) {
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
                    <Save className="h-5 w-5" />
                    {full && <span>Сохранить</span>}
                </>
            )}
        </Button>
    );
}