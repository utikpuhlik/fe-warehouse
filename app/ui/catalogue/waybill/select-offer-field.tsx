"use client";

import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { OfferSchema } from "@/app/lib/schemas/offerSchema";
import { fetchFilteredOffersTS } from "@/app/lib/apis/offerApi";
import { useFormContext } from "react-hook-form";

export function SelectOfferField() {
    const { setValue } = useFormContext(); // useFormContext from parent form
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [offers, setOffers] = useState<OfferSchema[]>([]);

    const handleSearch = useDebouncedCallback(async (query: string) => {
        const data = await fetchFilteredOffersTS(query, 10, 1);
        setOffers(data.items);
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
        setInput(`${offer.product_name} | ${offer.brand}`);
        setOpen(false);
    };

    return (
        <div>
            <label htmlFor="offer-search" className="text-sm font-medium">Предложение</label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                        {input || "Выбери предложение"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    align="start"
                    className="w-[--radix-popover-trigger-width] max-w-full rounded-xl border p-0 shadow-lg"
                >
                    <Command shouldFilter={false}>
                        <CommandInput
                            id="offer-search"
                            value={input}
                            onValueChange={setInput}
                            onFocus={() => setOpen(true)}
                            placeholder="Поиск предложения.."
                        />

                        <CommandList>
                            <CommandEmpty>Ничего не найдено.</CommandEmpty>
                            <CommandGroup heading="Результаты">
                                <ScrollArea className="h-64">
                                    {offers.map((offer) => (
                                        <CommandItem
                                            key={offer.id}
                                            value={offer.id}
                                            onSelect={() => handleSelect(offer)}
                                            className="cursor-pointer px-4 py-2 text-sm hover:bg-muted"
                                        >
                                            <div className="flex flex-col">
                                                <span className="font-medium">{offer.product_name} | {offer.brand}</span>
                                                <span className="text-muted-foreground text-xs">{offer.manufacturer_number}</span>
                                            </div>
                                        </CommandItem>
                                    ))}
                                </ScrollArea>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
