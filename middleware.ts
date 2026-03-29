export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/:path*", "/api/blogs/:path*", "/api/events/:path*", "/api/materials/:path*", "/api/team/:path*"],
};
