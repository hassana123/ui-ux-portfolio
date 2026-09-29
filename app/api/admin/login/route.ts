import { NextResponse } from 'next/server';
import { database } from '@/lib/supabase';
import { sameOrigin } from '@/lib/request';
import { loginError } from '@/lib/login-errors';
export async function POST(req: Request) {
  const reply=(message:string,status:number)=>NextResponse.json({message},{status});
  if(!sameOrigin(req))return reply('Please sign in from this website directly.',403);
  let data;
  try { data=await req.json(); } catch { return reply('Please enter your email and password.',400); }
  if(typeof data?.email!=='string'||typeof data?.password!=='string'||!data.password||data.password.length>200||data.email.length>254)return reply('Please enter a valid email and password.',400);
  try {
    const db=await database();
    if(!db)return reply('Sign-in is not connected yet. The site owner needs to configure Supabase.',503);
    const {error}=await db.auth.signInWithPassword({email:data.email.trim(),password:data.password});
    if(error){console.error('[login] Authentication failed',{code:error.code,status:error.status});const result=loginError(error);return reply(result.message,result.status);}
    const {data:{user},error:userError}=await db.auth.getUser();
    if(userError||!user){await db.auth.signOut();return reply('Your session could not be verified. Please sign in again.',401);}
    const {data:record,error:ownerError}=await db.from('owners').select('user_id').eq('user_id',user.id).maybeSingle();
    if(ownerError){await db.auth.signOut();console.error('[login] Owner lookup failed',{code:ownerError.code});return reply('Your login worked, but we could not check dashboard access. The site owner needs to check the database setup.',503);}
    if(!record){await db.auth.signOut();return reply('Your login worked, but this account is not approved to manage the portfolio. Add its User UID to the owners table in Supabase.',403);}
    return NextResponse.json({ok:true,message:'You are signed in. Opening your studio.'});
  } catch {return reply('We could not reach the sign-in service. Please try again shortly.',503);}
}
