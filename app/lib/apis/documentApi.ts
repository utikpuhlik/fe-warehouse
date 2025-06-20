
export async function fetchPriceList(price_type: string, ext: string): Promise<Response> {
    const url = `/api/proxy?type=${price_type}&ext=${ext}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Ошибка при получении прайс-листа");
    }
    return res;
}
