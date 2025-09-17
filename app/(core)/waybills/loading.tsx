import { WaybillCardSkeleton } from "@/app/ui/skeletons/WaybillCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-[200px] rounded-md" />
        <Skeleton className="h-10 w-[160px] rounded-md" />
        <Skeleton className="h-10 w-[160px] rounded-md" />
      </div>

      <div className="grid gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <WaybillCardSkeleton key={i} />
        ))}
      </div>

      <div className="mt-5 flex w-full justify-center">
        <Skeleton className="h-8 w-[100px] rounded-md" />
      </div>
    </div>
  );
}
