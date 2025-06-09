"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {loginAction} from "@/app/lib/actions/authAction";
import {
    AtSymbolIcon,
    ExclamationCircleIcon,
    KeyIcon,
} from "@heroicons/react/24/outline";
import {ArrowRightIcon} from "@heroicons/react/20/solid";
import {lusitana} from "@/app/ui/fonts";

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

    // ⛔️ Don't show form while redirecting
    if (errorMessage?.startsWith("/")) {
        return null;
    }

    return (
        <form action={formAction} className="space-y-4 max-w-sm w-full">
            <h1 className={`${lusitana.className} mb-3 text-3xl`}>
                TCF Admin Panel
            </h1>
            <h2 className={`${lusitana.className} mb-3 text-2xl`}>
                Please log in to continue.
            </h2>
            <input type="hidden" name="redirectTo" value={callbackUrl} />
            <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                    <AtSymbolIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="pl-10"
                        required
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                    <KeyIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Введите пароль"
                        className="pl-10"
                        required
                    />
                </div>
            </div>

            <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Вход..." : "Войти"}
                <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </Button>

            {errorMessage && !errorMessage.startsWith("/") && (
                <div className="flex items-center space-x-1 text-red-500">
                    <ExclamationCircleIcon className="h-5 w-5" />
                    <p className="text-sm">{errorMessage}</p>
                </div>
            )}
        </form>
    );
}
