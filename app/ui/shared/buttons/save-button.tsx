import { Button } from "@/components/ui/button";
import { Loader, Save } from "lucide-react";
import { useTranslations } from "next-intl";

type SaveButtonProps = {
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  type?: "button" | "submit" | "reset";
  full?: boolean;
  disabled?: boolean;
  loading?: boolean;
  text?: string;
  className?: string;
};

export function SaveButton({
  onClick,
  variant = "outline",
  type = "button",
  full = true,
  disabled = false,
  loading = false,
  text,
  className,
}: SaveButtonProps) {
  const t = useTranslations("Actions");
  return (
    <Button
      variant={variant}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {loading ? (
        <Loader className="h-5 w-5 animate-spin" />
      ) : (
        <>
          <Save className="h-5 w-5" />
          {full && <span>{text ?? t("save")}</span>}
        </>
      )}
    </Button>
  );
}
