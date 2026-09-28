import {NextResponse} from 'next/server';
import {database} from '@/lib/supabase';
export async function POST(){const db=await database();await db?.auth.signOut();return NextResponse.json({ok:true});}
