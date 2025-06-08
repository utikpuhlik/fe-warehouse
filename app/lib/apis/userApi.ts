import {
    type UserSchema,
    zUsers,
} from "@/app/lib/schemas/userSchema";
import {BASE_URL} from "@/app/lib/config/config";

const ENTITY = "users"

export async function fetchUsers(
    role: string | null = null,
): Promise<UserSchema[]> {
    const url = role ? `${BASE_URL}/${ENTITY}?role=${role}` : `${BASE_URL}/${ENTITY}`;

    const res = await fetch(url, {next: {revalidate: 60}});
    if (!res.ok) throw new Error(`Network error ${res.status}`);

    const json = await res.json();

    return zUsers.parse(json);
}

