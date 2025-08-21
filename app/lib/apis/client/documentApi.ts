export async function printPriceList(
): Promise<Response> {
  const res = await fetch(`/api/print/prices`);

  if (!res.ok) {
    throw new Error("Ошибка при получении прайс-листа");
  }
  return res;
}

export async function printWaybill(
  waybill_id: string,
  format: "docx" | "xlsx",
): Promise<Response> {
  const url = `/api/print/waybills/${waybill_id}?format=${format}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Ошибка при получении накладной");
  }
  return res;
}

export async function printOrder(order_id: string): Promise<Response> {
  const url = `/api/print/orders/${order_id}`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Ошибка при получении заказа");
  }
  return res;
}
