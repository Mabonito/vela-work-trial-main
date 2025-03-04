import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(request) {
        const { pathname, searchParams } = request.nextUrl;

        if (pathname === "/") {
            return NextResponse.redirect(new URL("/calls", request.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized({ token }) {
                if (token) return true;
            },

        },
    },
    {
        pages: {
            signIn: "/login",
            error: "/login",
        },
    }
);

export const config = {
    matcher: [
        "/((?!login|favicon.ico|api|logo.svg|white_light-blue-02.png|vela.png|customer-support-image.png).*)",
    ],
};
