import {
  ProductAnalyticalSchema,
  zProductAnalyticalSchema,
} from "@/app/lib/schemas/analyticalSchema";
import { env } from "@/env";
import { fetchWithAuthAndParse } from "@/app/lib/apis/utils/fetchJson";

const ENTITY = "analytics";

export async function fetchBestSellingProducts(): Promise<
  ProductAnalyticalSchema[]
> {
  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/products/best-selling`;
  return fetchWithAuthAndParse(
    url,
    zProductAnalyticalSchema.array(),
    true,
    ENTITY,
  );
}
