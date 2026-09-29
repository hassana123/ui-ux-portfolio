import { Hero } from "@/components/hero";
import Link from "next/link";
import { Shell } from "@/components/shell";
import { Intro } from "@/components/intro";
import { WorkGrid } from "@/components/work-grid";
import { ContactForm } from "@/components/contact-form";
import { getSettings, getContent, demo, labels } from "@/lib/data";
import { configured } from "@/lib/supabase";
export async function generateMetadata() {
  const s = await getSettings();
  return {
    title: { absolute: s.seoTitle },
    description: s.seoDescription,
    alternates: { canonical: "/" },
  };
}
export default async function Home() {
  const [s, projects, playground, articles] = await Promise.all([
    getSettings(),
    getContent("projects"),
    getContent("playground_items"),
    getContent("articles"),
  ]);
  const sections = [...s.sections]
    .filter((x) => x.visible)
    .sort((a, b) => a.order - b.order);
  return (
    <Shell>
      <Intro enabled={s.introEnabled} copy={s.introCopy} asset={s.introAsset} />
      <main id="main">
        <Hero settings={s} />
        <div className="discipline-strip">
          <span>Thoughtful by design</span>
          <span>✳</span>
          <span>{s.positioning}</span>
          <span>✳</span>
          <span>A little personality goes a long way</span>
          <span>✳</span>
        </div>
        {sections.map((section, index) => {
          const number = String(index + 1).padStart(2, "0");
          switch (section.kind) {
            case "work":
              return projects.length ? (
                <section id="work" className="section wrap" key={section.id}>
                  <div className="section-kicker">{number} / SELECTED WORK</div>
                  <div className="section-heading">
                    <div>
                      <h2>{section.title}</h2>
                      <p>{section.text}</p>
                    </div>
                    <Link className="text-link" href="/work">
                      View all projects ↗
                    </Link>
                  </div>
                  <WorkGrid
                    items={
                      projects.filter((p) => p.featured).length
                        ? projects.filter((p) => p.featured).slice(0, 6)
                        : projects.slice(0, 4)
                    }
                  />
                </section>
              ) : null;
            case "about":
              return (
                <section id="about" className="about-section" key={section.id}>
                  <div className="wrap">
                    <div className="section-kicker">
                      {number} / THE PERSON BEHIND THE PIXELS
                    </div>
                    <div className="about-grid">
                      <div className="about-art">
                        <div className="about-paper">
                          <span className="paper-top">
                            MEET THE DESIGNER <span>↙</span>
                          </span>
                          <img
                            src={s.portrait || s.introAsset}
                            alt={
                              s.portrait
                                ? s.portraitAlt
                                : "The EwaTechie character"
                            }
                            width="208"
                            height="260"
                            loading="lazy"
                          />
                          <span className="paper-signature">
                            Hey, I’m Barakat.
                          </span>
                          <span className="paper-bottom">
                            CURIOUS BY NATURE. THOUGHTFUL BY DESIGN.
                          </span>
                        </div>
                        <div className="about-stamp">
                          a little
                          <br />
                          <b>human</b>
                          <br />
                          touch ✳
                        </div>
                      </div>
                      <div className="about-copy">
                        <h2>{s.aboutTitle}</h2>
                        {s.about.split("\n\n").map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                        {demo() && (
                          <small className="sample-note">
                            Introductory copy · pending owner approval
                          </small>
                        )}
                        <div className="services">
                          {[
                            s.primary,
                            ...s.disciplines.filter(
                              (d) => d !== s.primary && d !== "general",
                            ),
                          ].map((d, i) => (
                            <div
                              className={
                                i === 0 ? "service primary" : "service"
                              }
                              key={d}
                            >
                              <span>0{i + 1}</span>
                              <div>
                                <h3>{labels[d]}</h3>
                                <p>
                                  {d === "product"
                                    ? "Turning ideas and complex products into clear, usable experiences."
                                    : d === "motion"
                                      ? "Movement that helps an idea communicate."
                                      : "Visuals with personality and a story to tell."}
                                </p>
                              </div>
                              <span>↗</span>
                            </div>
                          ))}
                        </div>
                        {s.cv && (
                          <a
                            className="text-link"
                            href={s.cv}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {s.cvLabel} ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              );
            case "playground":
              return playground.length ? (
                <section
                  id="playground"
                  className="section wrap"
                  key={section.id}
                >
                  <div className="section-kicker">
                    {number} / OFF THE CLOCK, ON THE CANVAS
                  </div>
                  <div className="section-heading">
                    <div>
                      <h2>
                        {section.title}
                        <span className="heading-spark">✳</span>
                      </h2>
                      <p>{s.playgroundIntro}</p>
                    </div>
                    <Link href="/playground" className="text-link">
                      Explore the playground ↗
                    </Link>
                  </div>
                  <WorkGrid items={playground.slice(0, 4)} base="playground" />
                </section>
              ) : null;
            case "blog":
              return articles.length ? (
                <section
                  id="blog"
                  className="section blog-section wrap"
                  key={section.id}
                >
                  <div className="section-kicker">
                    {number} / FROM MY NOTEBOOK
                  </div>
                  <div className="section-heading">
                    <div>
                      <h2>{section.title}</h2>
                      <p>{section.text}</p>
                    </div>
                    <Link href="/blog" className="text-link">
                      All notes ↗
                    </Link>
                  </div>
                  {articles.slice(0, 3).map((a, i) => (
                    <a
                      className="article-row"
                      href={a.externalUrl || `/blog/${a.slug}`}
                      target={a.externalUrl ? "_blank" : undefined}
                      rel={a.externalUrl ? "noopener noreferrer" : undefined}
                      key={a.id}
                    >
                      <div className="article-symbol">{["✳", "✧", "↗"][i]}</div>
                      <div>
                        <span className="eyebrow">
                          {a.category}
                          {a.sample ? " · SAMPLE ARTICLE" : ""}
                          {a.externalUrl
                            ? ` · ${a.externalPlatform || "EXTERNAL"} ↗`
                            : ""}
                        </span>
                        <h3>{a.title}</h3>
                        <p>{a.summary}</p>
                      </div>
                      <span className="round-arrow">↗</span>
                    </a>
                  ))}
                </section>
              ) : null;
            case "contact":
              return (
                <section
                  id="contact"
                  className="contact-section"
                  key={section.id}
                >
                  <div className="wrap">
                    <div className="section-kicker">
                      {number} / GOOD THINGS START WITH A CONVERSATION
                    </div>
                    <div className="contact-grid">
                      <div>
                        <h2>
                          {s.contactTitle}
                          <br />
                          <em>{s.contactSubtitle}</em>
                        </h2>
                        <p>
                          Have something in mind?
                          <br />
                          Let’s make something useful, together.
                        </p>
                        {s.email && (
                          <a className="email-link" href={`mailto:${s.email}`}>
                            {s.email} ↗
                          </a>
                        )}
                        <span className="contact-spark" aria-hidden="true">
                          ✳
                        </span>
                      </div>
                      <ContactForm
                        configured={
                          configured() &&
                          Boolean(
                            process.env.SUPABASE_SERVICE_ROLE_KEY &&
                            process.env.CONTACT_RATE_SECRET,
                          )
                        }
                      />
                    </div>
                  </div>
                </section>
              );
            default:
              return (
                <section
                  className="section wrap custom-section"
                  key={section.id}
                >
                  <div className="section-kicker">
                    {number} / {section.kind.toUpperCase()}
                  </div>
                  <h2>{section.title}</h2>
                  <p className="prose-text">{section.text}</p>
                  {section.media && (
                    <img
                      src={section.media}
                      alt={section.title}
                      width="1000"
                      height="650"
                      loading="lazy"
                    />
                  )}
                  {section.kind === "cta" && (
                    <a className="button dark" href="#contact">
                      Let’s work together ↗
                    </a>
                  )}
                </section>
              );
          }
        })}
      </main>
    </Shell>
  );
}
