import {
    type UserSchema, zUserSchema,
    zUsers, UserPaginatedSchema,
    zUserPaginatedSchema,
} from "@/app/lib/schemas/userSchema";
import { env } from "@/env";
import {getAuthHeader} from "@/app/lib/apis/utils/getAuthHeader";
import {handleApiError} from "@/app/lib/errors/handleApiError";
import {CountSchema, zCountSchema} from "@/app/lib/schemas/commonSchema";
import {fetchWithAuthAndParse} from "@/app/lib/apis/utils/fetchJson";

const ENTITY = "users"

export async function fetchUsers(
    role: string | null = null,
): Promise<UserSchema[]> {
    const url = role ? `${env.NEXT_PUBLIC_API_URL}/${ENTITY}?role=${role}` : `${env.NEXT_PUBLIC_API_URL}/${ENTITY}`;

    const res = await fetch(url, {
        headers: await getAuthHeader(),
        cache: "no-store"
    });
    if (!res.ok) throw new Error(`Network error ${res.status}`);

    const json = await res.json();

    return zUsers.parse(json);
}

export async function fetchUserById(
    user_id: string
): Promise<UserSchema> {
    const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${user_id}`
    return fetchWithAuthAndParse(url, zUserSchema, false, ENTITY)
}

export async function fetchUserByClerkId(
    clerk_id: string
): Promise<UserSchema> {
    const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/clerk/${clerk_id}`
    return fetchWithAuthAndParse(url, zUserSchema, false, ENTITY)
}

export async function fetchUsersCount(): Promise<CountSchema> {
    const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/meta/count`;
    return fetchWithAuthAndParse(url, zCountSchema, false, ENTITY);
}

export async function fetchCurrentUser(): Promise<UserSchema | null> {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/${ENTITY}/me`, {
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
    return zUserSchema.parse(json);
}

export async function fetchFilteredUsersWS(
    search_term: string,
): Promise<UserPaginatedSchema> {
    const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/search/wildcard?search_term=${search_term}`;

    const res = await fetch(url, {
        headers: await getAuthHeader(),
        cache: "no-store"
    });
    if (!res.ok) throw new Error(`Network error ${res.status}`);

    const json = await res.json();

    return zUserPaginatedSchema.parse(json);
}


export async function patchUser(id: string, user: UserSchema): Promise<UserSchema> {
    const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(await getAuthHeader()),
        },
        body: JSON.stringify(user),
    });

    const text = await res.text();
    if (!res.ok) {
        handleApiError(res, text, ENTITY);
    }

    return zUserSchema.parse(JSON.parse(text));
}