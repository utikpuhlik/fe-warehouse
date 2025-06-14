"use client";

import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandItem, CommandList, CommandEmpty } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { OfferSchema } from "@/app/lib/schemas/offerSchema";
import { fetchFilteredOffersTS } from "@/app/lib/apis/offerApi";

export function OfferSearchDropdown() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState("");
    const [offers, setOffers] = useState<OfferSchema[]>([]);

    const handleSearch = useDebouncedCallback(async (query: string) => {
        if (!query) {
            setOffers([]);
            return;
        }
        const data = await fetchFilteredOffersTS(query, 10, 1);
        setOffers(data.items ?? []);
    }, 300);

    useEffect(() => {
        handleSearch(input);
    }, [input, handleSearch]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Input
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                        if (!open) setOpen(true);
                    }}
                    placeholder="Поиск по номеру или бренду..."
                    className="w-full md:w-96"
                />
            </PopoverTrigger>

            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                    <CommandList>
                        <ScrollArea className="max-h-64">
                            {offers.length > 0 ? (
                                offers.map((offer) => (
                                    <CommandItem
                                        key={offer.id}
                                        value={offer.manufacturer_number}
                                        onSelect={() => {
                                            console.log("Выбран оффер:", offer);
                                            setInput(offer.manufacturer_number);
                                            setOpen(false);
                                        }}
                                    >
                                        <div>
                                            <p className="text-sm font-medium">{offer.brand}</p>
                                            <p className="text-xs text-muted-foreground">{offer.manufacturer_number}</p>
                                        </div>
                                    </CommandItem>
                                ))
                            ) : (
                                <CommandEmpty>Ничего не найдено</CommandEmpty>
                            )}
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
