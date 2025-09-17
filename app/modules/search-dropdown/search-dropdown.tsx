"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useDebounce } from "use-debounce";

import { OfferPaginatedSchema, OfferSchema } from "@/app/lib/schemas/offerSchema";
import { fetchFilteredOffersTS } from "@/app/modules/search-dropdown/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useClickOutside } from "@/hooks/useClickOutside";

export function SearchDropdown() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSearchSubmit = () => {
    if (searchTerm.length >= 2) {
      setOpen(false);
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  useClickOutside(wrapperRef, () => setOpen(false));

  const { data, isLoading } = useQuery({
    queryKey: ["offers", debouncedSearchTerm],
    queryFn: (): Promise<OfferPaginatedSchema> => fetchFilteredOffersTS(debouncedSearchTerm, 5, 1),
    enabled: debouncedSearchTerm.length >= 2,
  });

  const offers: OfferSchema[] = data?.items ?? [];

  return (
    <div ref={wrapperRef} className="relative w-full max-w-lg">
      <Input
        placeholder="Поиск..."
        value={searchTerm}
        onChange={e => {
          const value = e.target.value;
          setSearchTerm(value);
          setOpen(value.length >= 2);
        }}
        onKeyDown={e => {
          if (e.key === "Enter") {
            handleSearchSubmit();
          }
        }}
      />

      {open && offers.length > 0 && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full">
          {offers.map((offer: OfferSchema) => (
            <Card key={offer.id} className="cursor-pointer hover:bg-gray-50">
              <Link
                href={`/catalogue/${offer.product.sub_category.category.slug}/${offer.product.sub_category.slug}/${offer.product_id}`}
                className="flex w-full items-center gap-3 px-3 py-2 hover:bg-muted"
              >
                <CardContent className="flex items-center gap-3 p-2">
                  <div className="relative h-12 w-12 overflow-hidden rounded">
                    <Image
                      src={offer.product.image_url || "/placeholder.jpg"}
                      alt={offer.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">{offer.product.name}</div>
                    <div className="text-muted-foreground">
                      {offer.brand} | {offer.manufacturer_number} | {offer.product.sub_category.name}
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
          <Button variant="outline" className="w-full" onClick={handleSearchSubmit}>
            Все результаты
          </Button>
        </div>
      )}

      {open && !isLoading && offers.length === 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-white p-3 text-sm text-muted-foreground shadow-md">
          Ничего не найдено
        </div>
      )}
    </div>
  );
}
