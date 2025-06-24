import {BASE_URL} from "@/app/lib/config/config";
const ENTITY = "documents";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const priceType = searchParams.get("type") ?? "retail";
    const ext = searchParams.get("ext") ?? "csv";

    const url = `${BASE_URL}/${ENTITY}/price/${priceType}?ext=${ext}`;

    const response = await fetch(url);

    if (!response.ok) {
        return new Response("Ошибка при получении файла", { status: 500 });
    }

    const blob = await response.blob();

    // Получаем имя из оригинального Content-Disposition
    const disposition = response.headers.get("Content-Disposition");
    const filename = disposition?.match(/filename="?([^"]+)"?/)?.[1] ?? `price.${ext}`;

    return new Response(blob, {
        headers: {
            "Content-Type": ext === "xlsx"
                ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                : "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="${filename}"`,
        },
    });
}
