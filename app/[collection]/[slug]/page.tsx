import {notFound} from 'next/navigation';
import {Shell} from '@/components/shell';
import {Detail} from '@/components/detail';
import {getContent,type Collection} from '@/lib/data';
const tables:Record<string,Collection>={work:'projects',playground:'playground_items',blog:'articles'};
export async function generateMetadata({params}:{params:Promise<{collection:string,slug:string}>}){const p=await params;if(!tables[p.collection])return {};const item=(await getContent(tables[p.collection])).find(x=>x.slug===p.slug);return item?{title:item.seoTitle||item.title,description:item.seoDescription||item.summary,alternates:{canonical:`/${p.collection}/${p.slug}`},openGraph:item.cover?{images:[item.cover]}:undefined}:{};}
export default async function Page({params}:{params:Promise<{collection:string,slug:string}>}){const p=await params;if(!tables[p.collection])notFound();const items=await getContent(tables[p.collection]);const item=items.find(x=>x.slug===p.slug);if(!item)notFound();const next=items[items.indexOf(item)+1];return <Shell><Detail item={item} base={p.collection} next={next}/></Shell>;}
