import { env } from "@/env";

export async function GET() {
  const res = await fetch(`${env.NEXT_PUBLIC_API_DOCX3R}/print/prices`);

  if (!res.ok) {
    return new Response("Error while getting an price list", { status: 500 });
  }

  const blob = await res.blob();
  const filename = `priceList.xlsx`;
  const safeFilename = encodeURIComponent(filename);

  return new Response(blob, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename*=UTF-8''${safeFilename}`,
    },
  });
}
