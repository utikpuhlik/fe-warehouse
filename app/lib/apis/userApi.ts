import { fetchWithAuthAndParse } from "@/app/lib/apis/utils/fetchJson";
import { getAuthHeader } from "@/app/lib/apis/utils/getAuthHeader";
import { handleApiError } from "@/app/lib/errors/handleApiError";
import { CountSchema, CustomerTypeEnum, RoleEnum, zCountSchema } from "@/app/lib/schemas/commonSchema";
import { UserPaginatedSchema, zUserPaginatedSchema, zUserSchema, type UserSchema } from "@/app/lib/schemas/userSchema";
import { env } from "@/env";

const ENTITY = "users";

export async function fetchUsers(
  search_term?: string,
  customer_type?: CustomerTypeEnum,
  role?: RoleEnum,
): Promise<UserPaginatedSchema> {
  const params = new URLSearchParams();

  if (role) params.append("role", role);
  if (customer_type) params.append("customer_type", customer_type);
  if (search_term) params.append("search_term", search_term);

  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}?${params.toString()}`;

  const res = await fetch(url, {
    headers: await getAuthHeader(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Network error ${res.status}`);

  const json = await res.json();

  return zUserPaginatedSchema.parse(json);
}

export async function fetchUserById(user_id: string): Promise<UserSchema> {
  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/${user_id}`;
  return fetchWithAuthAndParse(url, zUserSchema, false, ENTITY);
}

export async function fetchUserByClerkId(clerk_id: string): Promise<UserSchema> {
  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/clerk/${clerk_id}`;
  return fetchWithAuthAndParse(url, zUserSchema, false, ENTITY);
}

export async function fetchUsersCount(): Promise<CountSchema> {
  const url = `${env.NEXT_PUBLIC_API_URL}/${ENTITY}/meta/count`;
  return fetchWithAuthAndParse(url, zCountSchema, false, ENTITY);
}

export async function patchUser(id: string, user: UserSchema): Promise<UserSchema> {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Accept": "application/json",
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
