import { auth } from './auth';

export default auth((req) => {
  // req.auth
  console.log('middleware request url: ', req.url);
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|login).+)'],
};
