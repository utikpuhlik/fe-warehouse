import { Download, FileSpreadsheet, FileText, Loader } from "lucide-react";
import type { ComponentType } from "react";

import { Button } from "@/components/ui/button";

type DownloadButtonProps = {
  onClick?: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  format: "default" | "docx" | "xlsx";
  full?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

const FORMAT_MAP: Record<string, { Icon: ComponentType<{ className?: string }>; label: string }> = {
  xlsx: { Icon: FileSpreadsheet, label: "Excel" },
  docx: { Icon: FileText, label: "Word" },
  default: { Icon: Download, label: "Download" },
};

export function DownloadButton({
  onClick,
  variant = "outline",
  format,
  full = true,
  disabled = false,
  loading = false,
  className,
}: DownloadButtonProps) {
  const { Icon, label } = FORMAT_MAP[format];

  return (
    <Button
      variant={variant}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={full ? undefined : label}
    >
      {loading ? <Loader className="h-5 w-5 animate-spin" /> : <Icon className="h-5 w-5" />}
      {full && <span>{label}</span>}
    </Button>
  );
}
