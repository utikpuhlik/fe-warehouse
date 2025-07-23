"use client";

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function WaybillFilters() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentWaybillType = searchParams.get("waybill_type") ?? "all";
    const currentStatus = searchParams.get("is_pending") ?? "all";

    const updateParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "all") {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex gap-4">
            <Select
                value={currentWaybillType}
                onValueChange={(value) => updateParams("waybill_type", value)}
            >
                <SelectTrigger className="w-[150px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Все</SelectItem>
                    <SelectItem value="WAYBILL_IN">Приход</SelectItem>
                    <SelectItem value="WAYBILL_OUT">Расход</SelectItem>
                    <SelectItem value="WAYBILL_RETURN">Возврат</SelectItem>
                </SelectContent>
            </Select>

            <Select
                value={currentStatus}
                onValueChange={(value) => updateParams("is_pending", value)}
            >
                <SelectTrigger className="w-[150px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Все</SelectItem>
                    <SelectItem value="true">Черновик</SelectItem>
                    <SelectItem value="false">Проведена</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}
