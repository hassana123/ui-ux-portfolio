import type { Settings } from '@/lib/schema';

export function Hero({ settings: s }: { settings: Settings }) {
  return (
    <section className="hero hero-centered wrap">
      <div className="hero-portrait-frame">
        <img src={s.portrait || '/images/ewatechie.jpeg'} alt={s.portraitAlt || 'Barakat Opeyemi Abdulhakeem holding an orange flower'} width="160" height="160" fetchPriority="high" />
      </div>
      <div className="hero-copy">
        <div className="name-label">{s.label}</div>
        <h1>{s.hero}</h1>
        <div className="hero-discipline">
          <b>{s.positioning}</b>
          {s.supporting && <><span aria-hidden="true">•</span><span>{s.supporting}</span></>}
        </div>
        <div className="hero-actions">
          <a href="#work" className="button brand-gradient">See My Works <span>→</span></a>
          <a href="#contact" className="button hero-contact"><span aria-hidden="true">•</span>Let’s work together</a>
        </div>
      </div>
    </section>
  );
}
