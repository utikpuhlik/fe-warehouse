"use client";

import clsx from "clsx";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";

type Direction = "next" | "prev";

type PaginationButtonProps = {
  direction: Direction;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  full?: boolean;
  className?: string;
};

export function PaginationButton({
  direction,
  onClick,
  disabled = false,
  loading = false,
  full = false,
  className,
}: PaginationButtonProps) {
  const isNext = direction === "next";

  return (
    <Button variant="outline" onClick={onClick} disabled={disabled || loading} className={clsx("gap-2", className)}>
      {loading ? (
        <Loader className="h-5 w-5 animate-spin" />
      ) : (
        <>
          {!isNext && <ChevronLeft className="h-5 w-5" />}
          {full && (isNext ? "Следующая" : "Назад")}
          {isNext && <ChevronRight className="h-5 w-5" />}
        </>
      )}
    </Button>
  );
}
