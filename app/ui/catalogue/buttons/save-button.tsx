import { Button } from "@/components/ui/button";
import { Save } from 'lucide-react';

type SaveButtonProps = {
    onClick?: () => void;
    full?: boolean;
    disabled?: boolean;
};

export function SaveButton({ onClick, full = true, disabled = false }: SaveButtonProps) {
    return (
        <Button
            variant="outline"
            className="flex items-center gap-2 rounded-xl border border-input px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            onClick={onClick}
            disabled={disabled}
        >
            <Save className="h-5 w-5" />
            {full && <span>Сохранить</span>}
        </Button>
    );
}
