"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useTableNavigation() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const getParam = (key: string, fallback = "") =>
        searchParams.get(key) || fallback;

    const updateParam = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    const updateFilter = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    const updateSearch = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");
        if (value) {
            params.set("query", value);
        } else {
            params.delete("query");
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    const updatePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", newPage.toString());
        router.replace(`${pathname}?${params.toString()}`);
    };

    return {
        getParam,
        updateParam,
        updateFilter,
        updatePage,
        updateSearch,
        pathname,
        searchParams,
    };
}
