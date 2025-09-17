import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Props = {
  height: number;
  width: number;
};

export default function SkeletonTableBasic({ width, height }: Props) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border shadow-sm">
      <Table className="w-full min-w-[1024px]">
        <TableHeader>
          <TableRow>
            {Array.from({ length: width }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-4 w-[120px]" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, rowIdx) => (
            <TableRow key={rowIdx}>
              {Array.from({ length: height }).map((_, colIdx) => (
                <TableCell key={colIdx}>
                  <Skeleton className="h-5 w-[120px]" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
