"use client";

import {useEffect, useState} from "react";
import {useDebouncedCallback} from "use-debounce";
import {useFormContext} from "react-hook-form";
import Image from "next/image";
import {ChevronDown} from "lucide-react";

import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";

import {fetchFilteredOffersTS} from "@/app/lib/apis/client/offerApi";
import type {OfferSchema} from "@/app/lib/schemas/offerSchema";
import {imageUrlPlaceholder} from "@/app/lib/config/config";

export function SelectOfferField() {
    const {setValue} = useFormContext();
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
        setValue("offer_id", offer.id, {shouldValidate: true, shouldDirty: true});
        setValue("brand", offer.brand, {shouldDirty: true});
        setValue("manufacturer_number", offer.manufacturer_number);
        setValue("price_rub", offer.price_rub);
        setValue("quantity", offer.quantity);
        setInput(`${offer.product_name} | ${offer.brand}`);
        setOpen(false);
    };

    return (
        <div className="space-y-2">
            <Label htmlFor="offer-search">Предложение</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                    >
                        {input || <span className="text-muted-foreground">Выбери предложение</span>}
                        <ChevronDown className="h-4 w-4 ml-2 shrink-0 opacity-50"/>
                    </Button>
                </PopoverTrigger>

                <PopoverContent align="start" className="w-[--radix-popover-trigger-width] p-0 rounded-xl shadow-xl">
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
                                <CommandEmpty>Ничего не найдено.</CommandEmpty>
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
                                                    src={offer.image_url ?? imageUrlPlaceholder}
                                                    alt={offer.product_name}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-md border bg-white object-contain"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-sm">{offer.product_name}</span>
                                                    <span className="text-xs text-muted-foreground">
        {offer.brand} | {offer.manufacturer_number}
      </span>
                                                </div>
                                            </div>
                                        </CommandItem>

                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </ScrollArea>

                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
