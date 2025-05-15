import {
    type UserSchema,
    zUsers,
} from "@/app/lib/schemas/userSchema";
import {BASE_URL} from "@/app/lib/config/config";


export async function fetchUsers(
    role: string | null = null,
): Promise<UserSchema[]> {
    const url = role ? `${BASE_URL}/users?role=${role}` : `${BASE_URL}/users`;

    // ? Fetch Caching in NextJS for 60 sec:
    const res = await fetch(url, {next: {revalidate: 60}});
    if (!res.ok) throw new Error(`Network error ${res.status}`);

    const json = await res.json();

    // 🔒 Runtime validation
    return zUsers.parse(json);
}

