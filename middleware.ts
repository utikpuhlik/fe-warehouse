import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;
    const url = request.nextUrl;
    const path = url.pathname;

    const isLoggedIn = !!token;

    const isAdminRoute = [
        "/dashboard",
        "/catalogue",
        "/profile",
        "/orders",
        "/mailing",
        "/waybills",
        "/price",
    ].some((prefix) =>
        path.startsWith(prefix)
    );


    if (isAdminRoute && !isLoggedIn) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (path === "/" && isLoggedIn) {
        return NextResponse.redirect(new URL("/catalogue", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/catalogue/:path*",
        "/mailing/:path*",
        "/price/:path*",
        "/waybills/:path*",
        "/profile/:path*",
        "/orders/:path*"
    ],
};
