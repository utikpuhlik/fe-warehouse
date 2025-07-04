import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function WaybillCardSkeleton() {
    return (
        <Card className="p-4 space-y-2">
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-48" />
                </div>
                <div className="flex flex-col items-end gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                </div>
            </div>
        </Card>
    );
}
