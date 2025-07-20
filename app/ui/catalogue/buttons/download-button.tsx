import { Button } from "@/components/ui/button";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Loader } from "lucide-react";

type DownloadButtonProps = {
  onClick?: () => void;
  full?: boolean;
  disabled?: boolean;
  loading?: boolean;
};

export function DownloadButton({
  onClick,
  full = true,
  disabled = false,
  loading = false,
}: DownloadButtonProps) {
  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 rounded-xl border border-input px-3 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? (
        <Loader className="h-5 w-5 animate-spin" />
      ) : (
        <ArrowDownTrayIcon className="h-5 w-5" />
      )}
      {full && <span>{loading ? "Загрузка..." : "Скачать"}</span>}
    </Button>
  );
}
