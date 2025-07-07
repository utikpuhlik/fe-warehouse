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
            onClick={onClick}
            disabled={disabled}
        >
            <Save className="h-5 w-5" />
            {full && <span>Сохранить</span>}
        </Button>
    );
}
