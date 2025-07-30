import { NextRequest, NextResponse } from "next/server";
import { WaybillPaginatedSchema } from "@/app/lib/schemas/waybillSchema";
import {fetchWaybills} from "@/app/lib/apis/waybillApi";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const search_term = searchParams.get("q") ?? "";
    const waybill_type = searchParams.get("waybill_type") ?? undefined;
    const is_pending_param = searchParams.get("is_pending");

    // Convert is_pending_param to boolean or undefined
    let is_pending: boolean | undefined = undefined;
    if (is_pending_param === "true") {
        is_pending = true;
    } else if (is_pending_param === "false") {
        is_pending = false;
    }

    const page = parseInt(searchParams.get("page") ?? "1");
    const pageSize = parseInt(searchParams.get("size") ?? "10");

    try {
        const waybills: WaybillPaginatedSchema = await fetchWaybills(
            waybill_type,
            is_pending,
            search_term,
            page,
            pageSize
        );
        return NextResponse.json(waybills);
    } catch (e) {
        console.error("Error fetching waybills:", e);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}