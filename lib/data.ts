import 'server-only';
import { cache } from 'react';
import { database, configured, owner } from './supabase';
import { defaults,sampleProjects,samplePlayground,sampleArticles } from './defaults';
import { contentSchema,settingsSchema,eligible,type Content } from './schema';
export type Collection='projects'|'playground_items'|'articles';
export const demo=()=>!configured()&&(process.env.NEXT_PUBLIC_DEMO_MODE==='true'||process.env.NODE_ENV==='development');
export const getSettings=cache(async()=>{const db=await database();if(!db)return defaults;const {data,error}=await db.from('settings_revisions').select('data').eq('state','published').maybeSingle();if(error)throw new Error('Unable to load site settings. Check the database migration.');const parsed=settingsSchema.safeParse(data?.data);return parsed.success?parsed.data:defaults;});
export const getContent=cache(async(kind:Collection):Promise<Content[]>=>{const settings=await getSettings();const db=await database();if(!db)return(demo()?{projects:sampleProjects,playground_items:samplePlayground,articles:sampleArticles}[kind]:[]).filter(c=>eligible(c.discipline,settings));const {data,error}=await db.from(kind+'_revisions').select('resource_id,data').eq('state','published');if(error)throw new Error('Unable to load published content.');return(data||[]).flatMap(row=>{const p=contentSchema.safeParse(row.data);return p.success&&eligible(p.data.discipline,settings)?[{id:row.resource_id,...p.data}]:[];}).sort((a,b)=>a.order-b.order);});
export async function getPreview(kind:Collection,id:string){const auth=await owner();if(!auth)return null;const {data}=await auth.db.from(kind+'_revisions').select('data').eq('resource_id',id).eq('state','draft').maybeSingle();const parsed=contentSchema.safeParse(data?.data);return parsed.success?{id,...parsed.data}:null;}
export const labels={product:'UI/UX & Product Design',motion:'Motion Design',illustration:'Illustration',general:'Design notes'};
