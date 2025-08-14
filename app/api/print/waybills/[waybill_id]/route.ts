import { env } from "@/env";

export async function GET(
  req: Request,
  { params }: { params: { waybill_id: string } },
) {
  const { waybill_id } = params;
  const format = new URL(req.url).searchParams.get("format") || "docx";

  const res = await fetch(
    `${env.NEXT_PUBLIC_API_DOCX3R}/print/waybills/${waybill_id}?format=${format}`,
  );

  if (!res.ok) {
    return new Response("Error while getting a waybill", { status: 500 });
  }

  const blob = await res.blob();
  const filename = `waybill_${waybill_id}.${format}`;
  const safeFilename = encodeURIComponent(filename);

  return new Response(blob, {
    headers: {
      "Content-Type":
        format === "xlsx"
          ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename*=UTF-8''${safeFilename}`,
    },
  });
}
