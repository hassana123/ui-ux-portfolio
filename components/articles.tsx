'use client'

import Link from 'next/link'

interface Article {
  id: string
  title: string
  content?: string
  featuredImageUrl?: string
  slug?: string
  category?: string
  date?: string
}

interface ArticlesProps {
  articles: Article[]
}

const fallbackArticles: Article[] = [
  {
    id: 'article-1',
    title: 'How AgriSmart Came to Life: Our Journey to Winning Second...',
    featuredImageUrl: '/article1.png',
    category: 'Hackathon',
    date: '28 July, 2024',
  },
  {
    id: 'article-2',
    title: 'Avoiding Common UI Design Mistakes',
    featuredImageUrl: '/article2.png',
    category: 'Design',
    date: '21 Feb, 2024',
  },
  {
    id: 'article-3',
    title: "Unveiling the Secrets of UI Design: A Beginner's Guide",
    featuredImageUrl: '/article3.png',
    category: 'Design',
    date: '22 Jan, 2024',
  },
]

export function Articles({ articles }: ArticlesProps) {
  const displayedArticles = articles.length > 0 ? articles.slice(0, 3) : fallbackArticles

  return (
    <section id="articles" className="relative overflow-hidden border-b border-[#17162a] bg-[#05050c] py-20 text-white">
      <div className="pointer-events-none absolute inset-y-0 left-[max(16px,calc((100%_-_1210px)/2_+_40px))] w-px bg-[#302b50]/90 max-lg:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-[max(16px,calc((100%_-_1210px)/2_+_40px))] w-px bg-[#302b50]/90 max-lg:hidden" />

      <div className="mx-auto max-w-[1210px] px-6 sm:px-10 lg:px-10">
        <div className="mb-10 flex items-end justify-between gap-8">
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.22em] text-[#2cbff2]">Articles</p>
            <h2 className="mt-5 max-w-[360px] text-[clamp(2rem,4vw,44px)] font-extrabold leading-[1.08] tracking-[0]">
              Latest Medium
              <br />
              Articles
            </h2>
          </div>
          <Link
            href="/articles"
            className="mb-2 hidden h-10 min-w-[128px] items-center justify-center rounded bg-white px-5 text-[10px] font-extrabold uppercase text-[#3b1b0c] transition hover:bg-[#f2f2f2] sm:inline-flex"
          >
            Discover All
          </Link>
        </div>

        <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {displayedArticles.map((article, index) => {
            const image = article.featuredImageUrl || fallbackArticles[index]?.featuredImageUrl || '/placeholder.jpg'
            const href = article.slug ? `/articles/${article.slug}` : '/articles'

            return (
              <li key={article.id}>
                <article>
                  <Link href={href} className="group block">
                    <div className="h-[170px] overflow-hidden rounded-[3px] bg-[#d7d7d7]">
                      <img
                        src={image}
                        alt={article.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="mt-5 text-[12px] font-medium text-white/70">{article.category || 'Design'}</p>
                    <h3 className="mt-3 min-h-[52px] text-[18px] font-extrabold leading-[1.25] tracking-[0] text-white">
                      {article.title}
                    </h3>
                    <p className="mt-5 text-[11px] text-white/38">{article.date || '21 Feb, 2024'}</p>
                  </Link>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
