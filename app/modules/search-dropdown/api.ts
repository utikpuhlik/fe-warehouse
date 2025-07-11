import { OffersSchema, zOffersSchema } from "@/app/lib/schemas/offerSchema";
import { BASE_URL } from "@/app/lib/config/config";

export async function fetchFilteredOffersTS(
  search_term: string,
  size = 10,
  page = 1,
): Promise<OffersSchema> {
  const url = `${BASE_URL}/offers/search/text_search?search_term=${search_term}&size=${size}&page=${page}`;
  const res = await fetch(url);
  const text = await res.text().catch(() => "");
  return zOffersSchema.parse(JSON.parse(text));
}
