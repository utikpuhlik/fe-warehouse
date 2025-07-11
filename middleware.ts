import {type NextRequest, NextResponse} from "next/server";
import {BASE_URL} from "@/app/lib/config/config";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;
    const url = request.nextUrl;
    const path = url.pathname;

    const isPrivate = [
        "/",
        "/dashboard",
        "/catalogue",
        "/orders",
        "/users",
        "/waybills",
    ].some((prefix) =>
        path.startsWith(prefix)
    );


    /* --------- 1. Гость пытается попасть в приватную зону ---------- */
    if (isPrivate && !token) {
        const loginUrl = new URL("/login", request.url);
        // login?callbackUrl=/waybills
        loginUrl.searchParams.set("callbackUrl", path);
        return NextResponse.redirect(loginUrl);
    }

    /* --------- 2. Есть токен — проверяем у бекенда ---------- */
    if (token) {
        const me = await fetch(`${BASE_URL}/users/me`, {
            headers: {Authorization: `Bearer ${token}`},
            cache: "no-store",
        });

        if (me.ok) {
            const user = await me.json();
            // (опционально) прокинем данные дальше через заголовок
            const res = NextResponse.next();
            res.headers.set("x-user-id", user.id);
            return res;
        }

        /* ---------- 3. Токен недействителен — принудительный logout --------- */
        const res = NextResponse.redirect(new URL(`/login?callbackUrl=${path}`, request.url));
        res.cookies.delete("access_token");
        return res;
    }

    /* --------- 4. Публичные страницы без токена ---------- */
    return NextResponse.next();
}

/* Какие пути обрабатываем (можно оставить «/*», но так меньше вызовов) */
export const config = {
    matcher: [
        "/dashboard/:path*",
        "/catalogue/:path*",
        "/orders/:path*",
        "/waybills/:path*",
        "/users/:path*",
        "/",
    ],
};
