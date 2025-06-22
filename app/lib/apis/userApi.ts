import {
    type UserSchema, zUser,
    zUsers,
} from "@/app/lib/schemas/userSchema";
import {BASE_URL} from "@/app/lib/config/config";
import {getAuthHeader} from "@/app/lib/apis/utils/getAuthHeader";
import {handleApiError} from "@/app/lib/errors/handleApiError";

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


export async function patchUser(id: string, user: UserSchema): Promise<UserSchema> {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(await getAuthHeader()),
        },
        body: JSON.stringify(user),
    });

    const text = await res.text().catch(() => "");
    if (!res.ok) {
        handleApiError(res, text, ENTITY);
    }

    return zUser.parse(JSON.parse(text));
}