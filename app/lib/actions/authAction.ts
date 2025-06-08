"use server";

import {cookies} from "next/headers";
import {loginApi} from "@/app/lib/apis/authApi";
import {redirect} from "next/navigation";
import {fetchCurrentUser} from "@/app/lib/apis/userApi";
import {UserSchema} from "@/app/lib/schemas/userSchema";


export async function loginAction(_: unknown, formData: FormData): Promise<string> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const redirectTo = (formData.get("redirectTo") as string) || "/catalogue";

    const data = await loginApi(email, password);

    const cookieStore = await cookies();
    cookieStore.set("access_token", data.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
    });

    return redirectTo;
}

export async function logoutAction(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete("access_token");
    redirect("/")
}


export async function getCurrentUserAction(): Promise<UserSchema | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    if (!token) return null;

    try {
        return await fetchCurrentUser();
    } catch (error) {
        console.error("Failed to fetch current user:", error);
        return null;
    }
}