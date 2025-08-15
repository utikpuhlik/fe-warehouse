import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";

type CreateButtonProps = {
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
  className?: string;
};

export function CreateButton({
  onClick,
  variant = "default",
  type = "button",
  disabled = false,
  loading = false,
  className,
}: CreateButtonProps) {
  const t = useTranslations("Actions");
  return (
    <Button
      variant={variant}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={className}
    >
      {loading ? (
        <Loader className="h-5 w-5 animate-spin" />
      ) : (
        <>
          <CirclePlus />
          {<span>{t("create")}</span>}
        </>
      )}
    </Button>
  );
}
