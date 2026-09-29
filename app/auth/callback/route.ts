import { NextResponse } from 'next/server';
import { database } from '@/lib/supabase';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const go = (path: string) => {
    const response = NextResponse.redirect(new URL(path, url.origin), 303);
    response.headers.set('Cache-Control', 'private, no-store');
    return response;
  };
  try {
    const db = await database();
    const code = url.searchParams.get('code');
    if (!db || !code || url.searchParams.has('error')) return go('/admin/login?auth_error=google');
    const { error } = await db.auth.exchangeCodeForSession(code);
    if (error) return go('/admin/login?auth_error=google');
    const { data: { user }, error: userError } = await db.auth.getUser();
    if (userError || !user) {
      await db.auth.signOut();
      return go('/admin/login?auth_error=google');
    }
    // Google proves identity, not admin authorization. Never auto-create an owner.
    const { data: member, error: membershipError } = await db.from('owners')
      .select('user_id').eq('user_id', user.id).maybeSingle();
    if (membershipError || !member) {
      await db.auth.signOut();
      return go('/admin/login?auth_error=owner');
    }
    return go('/admin');
  } catch { return go('/admin/login?auth_error=google'); }
}
