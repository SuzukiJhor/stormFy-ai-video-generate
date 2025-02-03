import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  const protectedRequest = isProtectedRoute(request);
  const publicRequest = isPublicRoute(request);

  if (!publicRequest) await auth.protect();
  // if (protectedRequest) await auth.protect();
});

export const config = {
  matcher: [
    // Pular arquivos internos do Next.js e arquivos estáticos
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Sempre executar para rotas de API
    '/api/(.*)',
  ],
};
