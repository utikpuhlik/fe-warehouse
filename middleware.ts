import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;
    const url = request.nextUrl;

    const isLoggedIn = !!token;
    const path = url.pathname;

    const isAdminRoute = path.startsWith("/dashboard") || path.startsWith("/catalogue");

    if (isAdminRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (path === "/" && isLoggedIn) {
        return NextResponse.redirect(new URL("/catalogue", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/dashboard/:path*",
        "/catalogue/:path*",
        "/mailing/:path*"
    ],
};
