export { default } from "next-auth/middleware";

export const config = {
  // O matcher define quais rotas serão protegidas pelo middleware
  matcher: ["/usuario"],
};