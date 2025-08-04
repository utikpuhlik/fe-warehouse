"use server";

import { revalidatePath } from "next/cache";
import {patchUser} from "@/app/lib/apis/userApi";
import type {UserSchema} from "@/app/lib/schemas/userSchema";


export async function updateUserAction(
    user_id: string,
    user: UserSchema
): Promise<void> {
    await patchUser(user_id, user);
    revalidatePath("/users");
    revalidatePath(`/users/${user_id}`);
}