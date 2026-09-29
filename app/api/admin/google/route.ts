import { NextResponse } from 'next/server';
import { database } from '@/lib/supabase';
import { sameOrigin } from '@/lib/request';

export async function POST(request: Request) {
  if (!sameOrigin(request)) return new NextResponse('Invalid origin', { status: 403 });
  const origin = new URL(request.url).origin;
  const fail = () => NextResponse.redirect(new URL('/admin/login?auth_error=google', origin), 303);
  try {
    const db = await database();
    if (!db) return fail();
    const { data, error } = await db.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
        skipBrowserRedirect: true,
        queryParams: { prompt: 'select_account' },
      },
    });
    if (error || !data.url) return fail();
    return NextResponse.redirect(data.url, 303);
  } catch { return fail(); }
}
