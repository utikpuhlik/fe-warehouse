"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {loginAction} from "@/app/lib/actions/authAction";

export function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/catalogue";
    const router = useRouter();

    const [errorMessage, formAction, isPending] = useActionState(loginAction, undefined);

    useEffect(() => {
        if (errorMessage?.startsWith("/")) {
            router.push(errorMessage);
        }
    }, [errorMessage, router]);

    return (
        <form action={formAction} className="space-y-4 max-w-sm w-full">
            <input type="hidden" name="redirectTo" value={callbackUrl} />

            <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
            </div>

            <div>
                <Label htmlFor="password">Пароль</Label>
                <Input id="password" name="password" type="password" required />
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Вход..." : "Войти"}
            </Button>

            {errorMessage && !errorMessage.startsWith("/") && (
                <p className="text-sm text-red-500">{errorMessage}</p>
            )}
        </form>
    );
}
