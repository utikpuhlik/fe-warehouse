import { NextRequest, NextResponse } from "next/server";

import { env } from "@/env";

export async function handler(
  request: NextRequest,
  { params }: { params: { path: string[] } },
) {
  const path = params.path.join("/");
  const url = new URL(`/api/${path}`, env.NEXT_PUBLIC_API_URL);

  request.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  const rheaders = new Headers(request.headers);
  rheaders.delete("host");

  try {
    const response = await fetch(url.toString(), {
      method: request.method,
      headers: rheaders,
      body: request.body,
      duplex: "half",
    } as RequestInit);

    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("content-length");
    responseHeaders.delete("transfer-encoding");

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Proxy error:", error);

    return new NextResponse(
      JSON.stringify({
        error: "Failed to proxy request",
        details: String(error),
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
