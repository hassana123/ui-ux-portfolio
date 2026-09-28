import {Shell} from '@/components/shell';
import {WorkGrid} from '@/components/work-grid';
import {getContent} from '@/lib/data';
export const metadata={title:'Selected work',alternates:{canonical:'/work'}};
export default async function Work(){return <Shell><main id="main" className="wrap archive"><span className="section-kicker">THE WORK / IDEAS MADE USEFUL</span><h1>Considered from<br/><em>every angle.</em></h1><p className="archive-intro">Interfaces, experiences and the thinking behind them.</p><WorkGrid items={await getContent('projects')} filters/></main></Shell>;}
