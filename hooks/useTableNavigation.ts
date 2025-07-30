// @/hooks/useTableNavigation.ts
import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { fetchWaybills } from "@/app/lib/apis/client/waybillApi"; // Ensure this path is correct

/**
 * Custom hook to fetch waybills with integrated search, pagination, and filters.
 * It uses TanStack Query to handle data fetching, caching, and state management.
 *
 * @param query - The search term.
 * @param pagination - The pagination state from TanStack Table (pageIndex, pageSize).
 * @param waybill_type - Optional: filter by waybill type (e.g., "WAYBILL_IN").
 * @param is_pending - Optional: filter by pending status ("true" or "false").
 * @returns The result of the useQuery hook, including data, isLoading, and isError states.
 */
export const useWaybills = (query: string, pagination: PaginationState, waybill_type?: string, is_pending?: string) => {
    return useQuery({
        // The query key uniquely identifies this query.
        // It includes all dependencies so the query refetches when they change.
        queryKey: ["waybills", query, pagination, waybill_type, is_pending],

        // The query function to be executed.
        queryFn: () => fetchWaybills({
            query,
            page: pagination.pageIndex + 1, // API is 1-based, table is 0-based
            pageSize: pagination.pageSize,
            waybill_type,
            is_pending,
        }),

        // keepPreviousData: true, // Uncomment if you want this behavior
    });
};