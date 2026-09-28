import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
export const configured=()=>Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export async function database(){
 if(!configured())return null;
 const jar=await cookies();
 return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,{cookies:{getAll:()=>jar.getAll(),setAll(values){try{values.forEach(({name,value,options})=>jar.set(name,value,options));}catch{/* Server component cookies are refreshed by proxy. */}}}});
}
export function privileged(){if(!configured()||!process.env.SUPABASE_SERVICE_ROLE_KEY) return null;return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false,autoRefreshToken:false}});}
export async function owner(){const db=await database();if(!db)return null;const {data:{user}}=await db.auth.getUser();if(!user)return null;const {data}=await db.from('owners').select('user_id').eq('user_id',user.id).maybeSingle();return data?{db,user}:null;}
