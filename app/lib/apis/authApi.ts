import {BASE_URL} from "@/app/lib/config/config";
import type {AuthSchema} from "@/app/lib/schemas/authSchema";

export async function loginApi(email: string, password: string): Promise<AuthSchema> {
    const body = new URLSearchParams();
    body.append("username", email);
    body.append("password", password);
    body.append("grant_type", "password");

    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        body,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });

    if (!res.ok) throw new Error("Invalid credentials");
    return await res.json();
}
