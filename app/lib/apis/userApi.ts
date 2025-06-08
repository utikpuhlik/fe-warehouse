import {
    type UserSchema, zUser,
    zUsers,
} from "@/app/lib/schemas/userSchema";
import {BASE_URL} from "@/app/lib/config/config";
import {getAuthHeader} from "@/app/lib/apis/utils/getAuthHeader";

const ENTITY = "users"

export async function fetchUsers(
    role: string | null = null,
): Promise<UserSchema[]> {
    const url = role ? `${BASE_URL}/${ENTITY}?role=${role}` : `${BASE_URL}/${ENTITY}`;

    const res = await fetch(url, {
        headers: await getAuthHeader(),
        cache: "no-store"
    });
    if (!res.ok) throw new Error(`Network error ${res.status}`);

    const json = await res.json();

    return zUsers.parse(json);
}

export async function fetchCurrentUser(): Promise<UserSchema | null> {
    const res = await fetch(`${BASE_URL}/${ENTITY}/me`, {
        headers: await getAuthHeader(),
        cache: "no-store",
    });

    if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
            return null;
        }
        throw new Error(`Network error ${res.status}`);
    }

    const json = await res.json();
    return zUser.parse(json);
}
