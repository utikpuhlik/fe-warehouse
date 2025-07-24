import { NextRequest, NextResponse } from "next/server"
import { searchUsersAction } from "@/app/lib/actions/userAction"

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const search = searchParams.get("q") ?? ""
    try {
        const users = await searchUsersAction(search)
        return NextResponse.json(users)
    } catch (e) {
        console.error("Error fetching offers:", e);
        return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
}
