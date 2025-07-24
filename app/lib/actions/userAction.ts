"use server";

import { revalidatePath } from "next/cache";
import {patchUser} from "@/app/lib/apis/userApi";
import type {UserPaginatedSchema, UserSchema} from "@/app/lib/schemas/userSchema";
import { fetchFilteredUsersWS } from "@/app/lib/apis/userApi"
import { zUserPaginatedSchema } from "@/app/lib/schemas/userSchema"

export async function updateUserAction(
    user: UserSchema
) {
    await patchUser(user.id, user);
    revalidatePath("/mailing");
}


export async function searchUsersAction(search: string): Promise<UserPaginatedSchema> {
    const users: UserPaginatedSchema = await fetchFilteredUsersWS(search)
    console.log(users)
    return zUserPaginatedSchema.parse(users)
}