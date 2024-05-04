import { URL } from 'url';

import { type NextRequest, NextResponse } from 'next/server';

import { signIn } from '@/auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const redirectTo = searchParams.get('redirect_to') || undefined;

  await signIn('google', {
    redirectTo,
    redirect: !!redirectTo,
  });

  return NextResponse.redirect(
    redirectTo || `${process.env.APP_HOST}/dashboard`,
  );
}
