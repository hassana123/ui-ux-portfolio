import { sampleProjects, samplePlayground, sampleArticles } from './defaults';
import { eligible, type Content, type Settings } from './schema';

export type Collection = 'projects' | 'playground_items' | 'articles';
const samples: Record<Collection, Content[]> = {
  projects: sampleProjects,
  playground_items: samplePlayground,
  articles: sampleArticles,
};

export function contentWithFallback(kind: Collection, published: Content[], settings: Settings): Content[] {
  const visible = published.filter(item => eligible(item.discipline, settings));
  return (visible.length ? visible : samples[kind].filter(item => eligible(item.discipline, settings)))
    .slice().sort((a, b) => a.order - b.order);
}
