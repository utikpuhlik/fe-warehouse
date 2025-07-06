"use client";

import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { OfferSchema, OffersSchema } from "@/app/lib/schemas/offerSchema";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { fetchFilteredOffersTS } from "@/app/modules/search-dropdown/api";
import { useClickOutside } from "@/hooks/useClickOutside";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
    queryFn: (): Promise<OffersSchema> =>
      fetchFilteredOffersTS(debouncedSearchTerm, 5, 1),
    enabled: debouncedSearchTerm.length >= 2,
  });

  const offers: OfferSchema[] = data?.items ?? [];

  return (
    <div ref={wrapperRef} className="relative w-full max-w-lg">
      <Input
        placeholder="Поиск..."
        value={searchTerm}
        onChange={(e) => {
          const value = e.target.value;
          setSearchTerm(value);
          setOpen(value.length >= 2);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchSubmit();
          }
        }}
      />

      {open && offers.length > 0 && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full">
          {offers.map((offer: OfferSchema) => (
            <Card key={offer.id} className="hover:bg-gray-50 cursor-pointer">
              <Link
                href={`/catalogue/${offer.category_slug}/${offer.sub_category_slug}/${offer.product_id}`}
                className="px-3 py-2 flex items-center gap-3 w-full hover:bg-muted"
              >
                <CardContent className="flex items-center gap-3 p-2">
                  <div className="relative w-12 h-12 rounded overflow-hidden">
                    <Image
                      src={offer.image_url || "/placeholder.jpg"}
                      alt={offer.product_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-sm">
                    <div className="font-medium">{offer.product_name}</div>
                    <div className="text-muted-foreground">{offer.brand}</div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
          <Button
            variant="outline"
            className="w-full"
            onClick={handleSearchSubmit}
          >
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
