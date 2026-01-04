
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const role = token?.role;

    // Admin Routes Protection (Super Admin & Admin Only)
    if (path.startsWith("/admin")) {
      if (role !== "admin" && role !== "IT") {
        return NextResponse.redirect(new URL("/alumni", req.url)); // Redirect unauthorized admin access to alumni dashboard
      }
    }

    // Alumni Routes Protection (All logged in users can access, but logic usually directs here)
    // Optionally restrict 'alumni' routes functionality based on role if needed, 
    // but usually higher roles can access lower role pages if they want, or we strictly separate.
    // Let's allow Admin/IT to access /alumni too (as they might want to see their own profile/dashboard as a user).
    // But if we want Strict separation:
    /*
    if (path.startsWith("/alumni") && role === "user") {
        // Unverified users might be restricted?
    }
    */
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/alumni/:path*"],
};
