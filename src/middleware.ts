export { auth as middleware } from '~/lib/auth'

//optionally don't invoke middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
