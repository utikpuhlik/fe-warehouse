import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MiniPagination() {
  return (
    <div className="p-6">
      <Pagination>
        <PaginationContent className="gap-1">
          <PaginationItem>
            <PaginationLink
              href="#"
              size="icon"
              aria-label="Go to previous page"
              className="border-border h-8 w-8 border"
            >
              <ChevronLeft className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <span className="flex h-8 items-center px-2 text-sm">2 / 8</span>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              size="icon"
              aria-label="Go to next page"
              className="border-border h-8 w-8 border"
            >
              <ChevronRight className="h-4 w-4" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
