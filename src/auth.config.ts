import type { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextResponse } from 'next/server';

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: ({ request, auth }) => {
      if (!auth) {
        const redirectTo = request.url;

        return NextResponse.redirect(
          `${process.env.APP_HOST}/login?redirect_to=${redirectTo}`,
        );
      }

      return true;
    },
    jwt: ({ token, user, account, profile, isNewUser, trigger }) => {
      console.log('[jwt callback]');
      console.log('[jwt token] ', token);
      console.log('[jwt account] ', account);
      console.log('[jwt user] ', user);
      console.log('[jwt profile] ', profile);
      console.log('[jwt isNewUser] ', isNewUser);
      console.log('[jwt trigger] ', trigger);
      if (user) {
        token.user = user;
      }
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    session: ({ session }) => {
      console.log('[session callback]');
      console.log('[sessoin session] ', session);
      return session;
    },
  },
  debug: true,
} satisfies NextAuthConfig;
