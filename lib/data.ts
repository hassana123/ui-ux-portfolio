import 'server-only';
import { cache } from 'react';
import { publicDatabase, configured, owner } from './supabase';
import { defaults } from './defaults';
import { contentWithFallback, type Collection } from './content-fallback';
import { contentSchema,settingsSchema,eligible,type Content } from './schema';
export type { Collection } from './content-fallback';
export const demo=()=>!configured()&&(process.env.NEXT_PUBLIC_DEMO_MODE==='true'||process.env.NODE_ENV==='development');
const loadSettings=cache(async()=>{
 try {
  const db=publicDatabase();
  if(!db)return {settings:defaults,available:true};
  const {data,error}=await db.from('settings_revisions').select('data').eq('state','published').maybeSingle();
  if(error){console.error('[portfolio] Settings query failed; verify Supabase keys and migration.',error.code);return {settings:defaults,available:false};}
  const parsed=settingsSchema.safeParse(data?.data);
  if(data&&!parsed.success){console.error('[portfolio] Published settings failed validation.');return {settings:defaults,available:false};}
  return {settings:parsed.success?parsed.data:defaults,available:true};
 } catch {
  console.error('[portfolio] Settings unavailable; verify the Supabase URL and connection.');
  return {settings:defaults,available:false};
 }
});
export const getSettings=cache(async()=>(await loadSettings()).settings);
export const getContent=cache(async(kind:Collection):Promise<Content[]>=>{
 const {settings,available}=await loadSettings();
 // If visibility settings cannot be loaded, fail closed for content, not the whole page.
 if(!available)return [];
 try {
  const db=publicDatabase();
  if(!db)return contentWithFallback(kind,[],settings);
  const {data,error}=await db.from(kind+'_revisions').select('resource_id,data').eq('state','published');
  if(error){console.error(`[portfolio] ${kind} query failed; verify the database migration.`,error.code);return [];}
  const published=(data||[]).flatMap(row=>{const p=contentSchema.safeParse(row.data);return p.success&&eligible(p.data.discipline,settings)?[{id:row.resource_id,...p.data}]:[];});
  return contentWithFallback(kind,published,settings);
 } catch {
  console.error(`[portfolio] ${kind} is temporarily unavailable.`);
  return [];
 }
});
export async function getPreview(kind:Collection,id:string){const auth=await owner();if(!auth)return null;const {data}=await auth.db.from(kind+'_revisions').select('data').eq('resource_id',id).eq('state','draft').maybeSingle();const parsed=contentSchema.safeParse(data?.data);return parsed.success?{id,...parsed.data}:null;}
export const labels={product:'UI/UX & Product Design',motion:'Motion Design',illustration:'Illustration',general:'Design notes'};
