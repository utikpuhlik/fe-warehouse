import {Card} from "@/components/ui/card";
import type { WaybillSchema } from "@/app/lib/schemas/waybillSchema";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {BadgeCheckIcon, FilePen} from "lucide-react";

export function WaybillCard(waybill: WaybillSchema) {
    const isIncome = waybill.waybill_type === "WAYBILL_IN";

    return (
        <Card className="p-4 hover:bg-muted transition">
            <Link href={`/waybills/${waybill.id}`} className="block space-y-2">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="font-semibold">{waybill.counterparty_name}</div>
                        <div className="text-sm text-muted-foreground">Автор: {waybill.author}</div>
                        <div className="text-sm text-muted-foreground">
                            Создана: {new Date(waybill.created_at).toLocaleDateString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                        </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                        <Badge variant={isIncome ? "default" : "destructive"}>
                            {isIncome ? "Приход" : "Расход"}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1 text-muted-foreground">
                            {waybill.is_pending ? <FilePen className="w-5 h-6"/> : <BadgeCheckIcon />}
                            {waybill.is_pending ? "Черновик" : "Проведена"}
                        </Badge>
                    </div>
                </div>
            </Link>
        </Card>
    );
}
