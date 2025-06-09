import {BASE_URL} from "@/app/lib/config/config";
const ENTITY = "pricing";
export async function fetchPriceList(price_type: string, ext: string): Promise<Response> {
    const url = `${BASE_URL}/${ENTITY}/${price_type}?ext=${ext}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Ошибка при получении прайс-листа");
    }
    return res
}