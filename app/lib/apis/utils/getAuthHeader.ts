// Function for Token extraction @/app/lib/apis/utils/getAuthHeader.ts
import {cookies} from "next/headers";

export async function getAuthHeader(): Promise<HeadersInit> {
    const token = (await cookies()).get("access_token")?.value;
    if (!token) throw new Error("No access token");
    return { Authorization: `Bearer ${token}` };
}