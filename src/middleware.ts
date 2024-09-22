import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes that do not require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up",
  "/home"
]);

// Define public API routes that do not require authentication
const isPublicApiRoute = createRouteMatcher([
  "/api/videos",
])

// Middleware to handle authentication and route access
export default clerkMiddleware((auth, req) => {
  const { userId } = auth(); // Get the user ID from the authentication context
  const currentUrl = new URL(req.url); // Parse the current request URL
  const isAccessingDashboard = currentUrl.pathname === "/home"; // Check if the user is accessing the dashboard
  const isApiRequest = currentUrl.pathname.startsWith("/api"); // Check if the request is an API request

  // If the user is authenticated and accessing a public API route but not the dashboard, redirect to the dashboard
  if (userId && isPublicApiRoute(req) && !isAccessingDashboard) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // If the user is not authenticated
  if (!userId) {
    // If the request is not for a public route or public API route, redirect to the sign-in page
    if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    // If the request is an API request and not for a public API route, redirect to the sign-in page
    if (isApiRequest && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }
});

// Configuration for the middleware matcher
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
