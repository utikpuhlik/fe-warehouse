"use client";

import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Loader } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { fetchFilteredOffersTS } from "@/app/lib/apis/client/offerApi";
import type { OfferSchema } from "@/app/lib/schemas/offerSchema";
import { TooltipInfo } from "@/app/ui/tooltip-info";

export function SelectOfferField() {
  const { setValue } = useFormContext();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [offers, setOffers] = useState<OfferSchema[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useDebouncedCallback(async (query: string) => {
    setLoading(true);
    try {
      const data = await fetchFilteredOffersTS(query, 10, 1);
      setOffers(data.items);
    } finally {
      setLoading(false);
    }
  }, 300);

  useEffect(() => {
    if (input.trim()) handleSearch(input.trim());
  }, [input, handleSearch]);

  const handleSelect = (offer: OfferSchema) => {
    setValue("offer_id", offer.id, { shouldValidate: true, shouldDirty: true });
    setValue("brand", offer.brand, { shouldDirty: true });
    setValue("manufacturer_number", offer.manufacturer_number);
    setValue("price_rub", offer.price_rub);
    setValue("quantity", offer.quantity);
    setInput(
      `${offer.product.name} | ${offer.brand} | ${offer.manufacturer_number} | ${offer.product.sub_category.name}`,
    );
    setOpen(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1">
        <Label htmlFor="offer-search">Предложение</Label>
        <TooltipInfo
          content={"Начните поиск, выберете позицию и нажмите кнопку Добавить"}
        />
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {input || (
              <span className="text-muted-foreground">Выбери предложение</span>
            )}
            <ChevronDown className="h-4 w-4 ml-2 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-[--radix-popover-trigger-width] p-0 rounded-xl shadow-xl"
        >
          <Command shouldFilter={false}>
            <CommandInput
              id="offer-search"
              value={input}
              onValueChange={setInput}
              onFocus={() => setOpen(true)}
              placeholder="Поиск по товару, бренду, номеру..."
            />
            <ScrollArea className="max-h-64">
              <CommandList>
                {loading ? (
                  <div className="flex justify-center items-center py-6">
                    <Loader className="animate-spin w-5 h-5 text-muted-foreground" />
                  </div>
                ) : offers.length === 0 ? (
                  <CommandEmpty>Ничего не найдено.</CommandEmpty>
                ) : (
                  <CommandGroup heading="Результаты">
                    {offers.map((offer: OfferSchema) => (
                      <CommandItem
                        key={offer.id}
                        value={offer.id}
                        onSelect={() => handleSelect(offer)}
                        className="px-3 py-2 cursor-pointer hover:bg-muted"
                      >
                        <div className="flex items-center gap-3">
                          <Image
                            src={offer.product.image_url ?? undefined}
                            alt={offer.product.name}
                            width={40}
                            height={40}
                            className="rounded-md border bg-white object-contain"
                          />
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">
                              {offer.product.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {offer.brand} | {offer.manufacturer_number} |{" "}
                              {offer.product.sub_category.name}
                            </span>
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
