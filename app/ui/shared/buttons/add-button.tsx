import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";

type AddButtonProps = {
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

export function AddButton({
  onClick,
  variant = "default",
  type = "button",
  disabled = false,
  loading = false,
  text,
  className,
}: AddButtonProps) {
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
          {<span>{text ?? t("add")}</span>}
        </>
      )}
    </Button>
  );
}
