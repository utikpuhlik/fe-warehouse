import { Check, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";

type CheckButtonProps = {
  onClick?: () => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  full?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

export function CheckButton({
  onClick,
  variant = "outline",
  size = "icon",
  full = true,
  disabled = false,
  loading = false,
  className,
}: CheckButtonProps) {
  return (
    <Button variant={variant} size={size} onClick={onClick} disabled={disabled} className={className}>
      {loading ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <Check className="h-4 w-4" />
          {full && <span>Сохранить</span>}
        </>
      )}
    </Button>
  );
}
