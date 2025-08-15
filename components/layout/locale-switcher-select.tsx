"use client";

import clsx from "clsx";
import { useTransition } from "react";
import { Check, Languages } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";

type LocaleOption = { value: Locale; label: string };

type Props = {
  defaultValue: string;
  items: LocaleOption[];
  label: string;
};

export default function LocaleSwitcherButton({
  defaultValue,
  items,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition();

  const handleSelect = (value: Locale) => {
    if (value === defaultValue) return;
    startTransition(() => setUserLocale(value));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={label}
          className={clsx(isPending && "pointer-events-none opacity-60")}
        >
          <Languages className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-36">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onSelect={() => handleSelect(item.value)}
            disabled={isPending}
            className="flex items-center gap-2"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center">
              {item.value === defaultValue ? (
                <Check className="h-4 w-4" />
              ) : null}
            </span>
            <span>{item.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
