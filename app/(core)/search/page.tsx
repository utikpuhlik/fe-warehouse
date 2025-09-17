"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { ArrowDown10, ArrowDownAZ, ArrowDownWideNarrow, ArrowUp10, ArrowUpAZ, ArrowUpWideNarrow } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { OfferSchema } from "@/app/lib/schemas/offerSchema";
import { fetchFilteredOffersTS } from "@/app/modules/search-dropdown/api";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get("query") || "";
  const sort = searchParams.get("sort") || "name_asc";
  const size = 30;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["search", query, sort],
    queryFn: ({ pageParam = 1 }) => fetchFilteredOffersTS(query, size, pageParam),
    getNextPageParam: (lastPage, pages) => {
      const currentPage = pages.length;
      const totalPages = Math.ceil((lastPage?.total ?? 0) / size);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: query.length >= 2,
    initialPageParam: 1,
  });

  const offers = data?.pages.flatMap(page => page.items) ?? [];
  const total = data?.pages?.[0]?.total ?? 0;

  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sort", value);
    router.push(`/search?${newParams.toString()}`);
  };

  return (
    <div className="container py-6">
      <h1 className="mb-4 text-2xl font-semibold">Результаты поиска: {`${query}`}</h1>

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{total} товаров найдено</p>

        <div className="flex items-center gap-2">
          <Label className="text-sm">Сортировка (не работает):</Label>
          <Select value={sort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name_asc">
                <div className="flex items-center gap-2">
                  <ArrowDownAZ size={15} />
                  <span>Название</span>
                </div>
              </SelectItem>
              <SelectItem value="name_desc">
                <div className="flex items-center gap-2">
                  <ArrowUpAZ size={15} />
                  <span>Название</span>
                </div>
              </SelectItem>
              <SelectItem value="price_asc">
                <div className="flex items-center gap-2">
                  <ArrowDownWideNarrow size={15} />
                  <span>Цена</span>
                </div>
              </SelectItem>
              <SelectItem value="price_desc">
                <div className="flex items-center gap-2">
                  <ArrowUpWideNarrow size={15} />
                  <span>Цена</span>
                </div>
              </SelectItem>
              <SelectItem value="quantity_asc">
                <div className="flex items-center gap-2">
                  <ArrowDown10 size={15} />
                  <span>Остаток</span>
                </div>
              </SelectItem>
              <SelectItem value="quantity_desc">
                <div className="flex items-center gap-2">
                  <ArrowUp10 size={15} />
                  <span>Остаток</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {offers.map((offer: OfferSchema) => (
          <Link
            key={offer.id}
            href={`/catalogue/${offer.product.sub_category.category.slug}/${offer.product.sub_category.slug}/${offer.product_id}`}
            className="block"
          >
            <Card>
              <CardContent className="flex gap-4 p-4">
                <div className="relative h-16 w-16">
                  <Image
                    src={offer.product.image_url || "/placeholder.jpg"}
                    alt={offer.product.name}
                    fill
                    className="rounded object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{offer.product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {offer.brand} | {offer.manufacturer_number} | {offer.product.sub_category.name}
                  </p>
                  <p className="mt-1 text-sm">{offer.price_rub} ₽</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div ref={ref} className="flex h-20 items-center justify-center">
        {isFetchingNextPage && <p className="text-sm text-muted-foreground">Загрузка...</p>}
      </div>
    </div>
  );
}

function SearchFallback() {
  return (
    <div className="container py-6">
      <div className="animate-pulse">
        <div className="mb-4 h-8 w-64 rounded bg-gray-200"></div>
        <div className="mb-4 h-4 w-32 rounded bg-gray-200"></div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="flex gap-4">
                <div className="h-16 w-16 rounded bg-gray-200"></div>
                <div className="flex-1">
                  <div className="mb-2 h-4 rounded bg-gray-200"></div>
                  <div className="mb-2 h-3 w-20 rounded bg-gray-200"></div>
                  <div className="h-3 w-16 rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchContent />
    </Suspense>
  );
}
