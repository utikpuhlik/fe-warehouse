import {
  ProductAnalyticalSchema,
  zProductAnalyticalSchema,
} from "@/app/lib/schemas/analyticalSchema";
import { env } from "@/env";
import { fetchAndParse } from "@/app/lib/apis/utils/fetchJson";

const ENTITY = "analytics";

export async function fetchBestSellingProducts(): Promise<
  ProductAnalyticalSchema[]
> {
  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/products/best-selling`;
  return fetchAndParse(url, zProductAnalyticalSchema.array(), true, ENTITY);
}
