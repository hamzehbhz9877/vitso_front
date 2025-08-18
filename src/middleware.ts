import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/panel", "/profile"];
const loginRoute = "/auth/login";

export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    const userCookie = req.cookies.get("user")?.value;
    const isLoggedIn = !!userCookie;

    // اگر کاربر لاگین نکرده و مسیر محافظت شده است
    if (!isLoggedIn && protectedRoutes.some(path => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL(loginRoute, req.url));
    }

    // اگر کاربر لاگین کرده و می‌خواهد به صفحه لاگین برود
    if (isLoggedIn && pathname.startsWith(loginRoute)) {
        const referer = req.headers.get("referer") || "/"; // مسیر قبلی یا خانه
        return NextResponse.redirect(new URL(referer, req.url));
    }

    return NextResponse.next();
}
