const BASE_URL: string = "https://api-tcf.eucalytics.uk"

export async function fetchPriceList(price_type: string, ext: string): Promise<Response> {
    const url = `${BASE_URL}/price/${price_type}?ext=${ext}`;
    console.log(url)
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Ошибка при получении прайс-листа");
    }
    return res
}