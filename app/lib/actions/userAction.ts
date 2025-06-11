"use server";

import { revalidatePath } from "next/cache";
import {patchUser} from "@/app/lib/apis/userApi";
import type {UserSchema} from "@/app/lib/schemas/userSchema";

export async function updateUserAction(
    user: UserSchema
) {
    await patchUser(user.id, user);
    revalidatePath("/mailing");
}