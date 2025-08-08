
export async function printPriceList(price_type: string, ext: string): Promise<Response> {
    const url = `/api/documents/pricing/?type=${price_type}&ext=${ext}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Ошибка при получении прайс-листа");
    }
    return res;
}


export async function printWaybill(waybill_id: string): Promise<Response> {
    const url = `/api/print/waybills/?waybill_id=${waybill_id}`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Ошибка при получении накладной");
    }
    return res;
}
