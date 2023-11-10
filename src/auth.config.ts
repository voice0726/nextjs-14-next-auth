import { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextResponse } from 'next/server';

export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
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
    jwt: ({ token, user, account }) => {
      if (user) {
        token.user = user;
      }
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    session: ({ session }) => {
      return session;
    },
  },
  debug: true,
} satisfies NextAuthConfig;
