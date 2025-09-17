import { NextRequest } from "next/server";

import { env } from "@/env";

export async function GET(request: NextRequest, { params }: { params: Promise<{ order_id: string }> }) {
  const { order_id } = await params;

  const res = await fetch(`${env.NEXT_PUBLIC_API_DOCX3R}/print/orders/${order_id}`);

  if (!res.ok) {
    return new Response("Error while getting an order", { status: 500 });
  }

  const blob = await res.blob();
  const filename = `order_${order_id}.docx`;
  const safeFilename = encodeURIComponent(filename);

  return new Response(blob, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename*=UTF-8''${safeFilename}`,
    },
  });
}
