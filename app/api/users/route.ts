import { NextRequest, NextResponse } from "next/server";

import { fetchUsers } from "@/app/lib/apis/userApi";
import type { UserPaginatedSchema } from "@/app/lib/schemas/userSchema";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("q") ?? "";
  try {
    const users: UserPaginatedSchema = await fetchUsers(search);
    return NextResponse.json(users);
  } catch (e) {
    console.error("Error fetching users:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
