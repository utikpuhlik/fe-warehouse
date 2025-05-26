import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const path = nextUrl.pathname

            const isOnDashboard = path.startsWith('/dashboard')
            const isOnCatalogue = path.startsWith('/catalogue')
            const isOnMailing = path.startsWith('/mailing')
            const isRoot = path === '/'

            if (isOnDashboard || isOnCatalogue || isOnMailing) {
                return isLoggedIn // Only allow if logged in
            }

            if (isRoot && isLoggedIn) {
                // Only redirect from root
                return Response.redirect(new URL('/catalogue', nextUrl))
            }

            return true // Allow access to mailing, etc.
        },
    },
    providers: [], // You can configure this later
} satisfies NextAuthConfig