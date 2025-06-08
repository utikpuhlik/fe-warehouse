// Function for Token extraction @/app/lib/apis/utils/getAuthHeader.ts
import {cookies} from "next/headers";

export async function getAuthHeader(): Promise<HeadersInit> {
    const token = (await cookies()).get("access_token")?.value;
    return token
        ? {Authorization: `Bearer ${token}`}
        : {};
}