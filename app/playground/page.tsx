import {Shell} from '@/components/shell';
import {WorkGrid} from '@/components/work-grid';
import {getContent,getSettings} from '@/lib/data';
export const metadata={title:'Playground',alternates:{canonical:'/playground'}};
export default async function Playground(){const s=await getSettings();return <Shell><main id="main" className="wrap archive"><span className="section-kicker">THE PLAYGROUND / FOLLOWING MY CURIOSITY</span><h1>Room for a little<br/><em>what if?</em> ✳</h1><p className="archive-intro">{s.playgroundIntro}</p><WorkGrid items={await getContent('playground_items')} base="playground" filters/></main></Shell>;}
