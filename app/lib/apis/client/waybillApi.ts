import { WaybillPaginatedSchema } from "@/app/lib/schemas/waybillSchema";

/**
 * Fetches a paginated list of waybills from the API based on search parameters.
 * @param params - An object containing the query, page number, page size, waybill_type, and is_pending.
 * @returns A promise that resolves to the paginated waybill data.
 * @throws An error if the network response is not ok.
 */
export const fetchWaybills = async (params: {
  query: string;
  page: number;
  pageSize: number;
  waybill_type?: string;
  is_pending?: string;
}): Promise<WaybillPaginatedSchema> => {
  const { query, page, pageSize, waybill_type, is_pending } = params;

  // Safely construct URL search parameters
  const urlParams = new URLSearchParams({
    q: query,
    page: String(page),
    size: String(pageSize),
  });

  if (waybill_type) {
    urlParams.append("waybill_type", waybill_type);
  }
  if (is_pending !== undefined) {
    urlParams.append("is_pending", is_pending);
  }

  const res = await fetch(`/api/waybills/search?${urlParams.toString()}`, {
    cache: "no-store", // Ensure fresh data on every request
  });

  if (!res.ok) {
    // Provide a clear error message for easier debugging
    throw new Error("Failed to fetch waybills from the server.");
  }

  return await res.json();
};
