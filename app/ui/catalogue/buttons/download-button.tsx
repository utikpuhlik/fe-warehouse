import { Button } from "@/components/ui/button";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

type DownloadButtonProps = {
    onClick?: () => void;
    full?: boolean;
};

export function DownloadButton({ onClick, full = true }: DownloadButtonProps) {
    return (
        <Button
            variant="outline"
            className="flex items-center gap-2 rounded-xl border border-input px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            onClick={onClick}
        >
            <ArrowDownTrayIcon className="h-5 w-5" />
            {full && <span>Скачать</span>}
        </Button>
    );
}
