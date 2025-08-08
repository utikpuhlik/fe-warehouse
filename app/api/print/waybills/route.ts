import { env } from "@/env";

export async function GET(req: Request) {
    const waybillId = new URL(req.url).searchParams.get("waybill_id");
    if (!waybillId) return new Response("Missing waybill_id", { status: 400 });

    const res = await fetch(`${env.NEXT_PUBLIC_API_DOCX3R}/print/waybills/${waybillId}`);
    if (!res.ok) return new Response("Ошибка при получении накладной", { status: 500 });

    const blob = await res.blob();
    const filename = `waybill_${waybillId}.docx`;
    const safeFilename = encodeURIComponent(filename);

    return new Response(blob, {
        headers: {
            "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "Content-Disposition": `attachment; filename*=UTF-8''${safeFilename}`,
        },
    });
}