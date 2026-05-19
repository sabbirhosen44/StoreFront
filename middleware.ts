import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("access_token")?.value;
    const userRole = request.cookies.get("user_role")?.value;
    const { pathname } = request.nextUrl;

    const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
    const isProtectedRoute = pathname.startsWith("/checkout") || pathname.startsWith("/profile");
    const isAdminRoute = pathname.startsWith("/admin");

    if (isAdminRoute) {
        if (!token || userRole !== "admin") {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    if (isProtectedRoute && !token) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (isAuthPage && token) {
        if (userRole === "admin") {
            return NextResponse.redirect(new URL("/admin", request.url));
        }
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/checkout/:path*", "/profile/:path*", "/admin/:path*", "/login", "/register"],
};