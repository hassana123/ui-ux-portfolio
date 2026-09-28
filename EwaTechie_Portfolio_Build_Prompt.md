# EwaTechie — complete portfolio build prompt

## 1. Build objective and priorities

Build a complete, responsive, database-managed portfolio for **EwaTechie — Barakat Opeyemi Abdulhakeem** using **Next.js App Router, TypeScript, Tailwind CSS and Supabase**. Include a working private admin dashboard. Implement the application, not just a visual mockup or a plan.

The portfolio should attract both employment opportunities and freelance clients, primarily for **UI/UX & Product Design**. Motion Design and Illustration are supporting creative disciplines. They must not receive equal weight with UI/UX in the default homepage presentation.

The experience should be clean, warm, spacious, thoughtful and professional, with a little playful character. Prioritise **clarity → work → personality → interaction**. Use simple, human language that non-designers understand. Avoid generic AI portfolio copy, inflated claims and positioning her as someone merely learning her craft.

**There is no hanging tag, lanyard, swinging badge or flipping ID card.** Her name is a simple static label/badge within the hero. Do not carry over Hassana's four oversized hero words, engineering/data content or Midnight Lilac palette.

## 2. Source references and how to combine them

When supplied, inspect these assets before implementing:

| Asset | Intended use |
|---|---|
| Pasted markdown(2).md | Barakat's editorial direction, hierarchy and sample copy; apply the later decisions in this prompt where they differ |
| Warm Editorial Portfolio(1).png | Main reference for warm backgrounds, whitespace, editorial layout and serif statements |
| Sophisticated Violet Minimalist Portfolio(1).png | Supporting reference for structured project layouts and hierarchy; do not inherit the violet theme |
| Frame 1(1).png | Character/wordmark relationship for the intro |
| Frame 3(1).png | Centred character on a warm background |
| Group 1(1).png | Separate static character asset; inspect transparency and intrinsic resolution before use |
| image 10(1).png | Optional illustration mood reference only; do not treat as her portrait, authored work or a required live asset |
| Hassana-Abdullahi-—-Front-End-Engineer-Data-Analyst-09-28-2026_04_34_PM(1).png | Secondary reference for spacing and restrained navigation; do not copy Hassana's identity, images, copy or hanging-tag treatment |

Original Figma reference: https://www.figma.com/design/DDNaX1aMD04sJcwvwcUtW5/Untitled?node-id=9-398

If Figma cannot be accessed, use the supplied exports and describe the limitation honestly. Screenshots are references, not a reason to recreate fictional studio credentials, addresses, awards, metrics or testimonials. Never use Hassana's portrait as Barakat's portrait. Use a labelled portrait placeholder or the supplied character until her real photo is added.

## 3. Visual system

Use cream/off-white backgrounds, near-black/brown text and restrained orange/peach accents. Gradients are allowed as small warm accents, not as giant rainbow backgrounds. The site should feel calm first and creative second.

Initial suggested tokens, editable later in admin (these are implementation defaults, not claimed exact Figma values):

| Token | Value | Use |
|---|---|---|
| Canvas | #FBF7EF | Main page background |
| Warm surface | #F4E8CF | Intro and secondary surfaces |
| Card | #FFFDFA | Project and content surfaces |
| Ink | #24211E | Main text and dark buttons |
| Muted ink | #625B53 | Supporting text |
| Accent | #E6783C | Decorative orange accents |
| Deep accent | #A9471C | Candidate accessible link/button colour, verify contrast |
| Peach | #F5C58F | Small highlights and restrained gradients |
| Rule | #DED5C8 | Section dividers |

Check contrast in actual combinations; bright orange is not automatically suitable for small text on cream. Give buttons readable contrast and visible focus.

Use a readable sans serif for navigation, labels and body text, paired with a graceful expressive serif for the hero statement and major editorial headings. If exact fonts are unavailable, use a coherent licensed pairing such as Manrope and Lora. Keep the supplied wordmark's visual identity instead of rendering all headings in its display style.

Use generous whitespace, fine rules, restrained rounded corners and subtle shadows. Build polished desktop, tablet and mobile layouts from 320px upward. Avoid excessively empty sections, tiny body text, oversized decorative content and visual clutter.

## 4. Public pages and homepage order

One long homepage with these sections in this default order:

1. Brief intro overlay, then hero.
2. Selected Work, primarily UI/UX and product projects.
3. About, approach and What I do.
4. Playground for motion, illustration and experiments.
5. Blog preview.
6. Contact form and direct contact options.
7. Footer.

Public routes:
- `/`: homepage.
- `/work`: all published projects with relevant filters.
- `/work/[slug]`: case study or visual-project detail.
- `/playground`: larger creative archive with category filters.
- `/playground/[slug]`: optional detail page for items needing context; simple items can use an accessible dialog instead.
- `/blog`: article listing.
- `/blog/[slug]`: full internal article.
- `/admin/login` and protected `/admin/*`: owner management.

About and Contact remain homepage sections. Case studies are destination pages, not full-length sections inserted between homepage blocks. Use navigation **ET. · Work · About · Playground · Blog · Contact**, plus a prominent **Let's work together ↗** CTA where space allows. Logo returns home. Navigation links reflect visible sections and populated destinations. Mobile navigation must be designed, keyboard accessible and easy to dismiss.

## 5. Intro/loading experience

Use the supplied illustrated character at her laptop. The separate character is currently static. Do not claim it contains independently movable hands/eyes or a finished animation.

Build a brief 2–4-second introductory greeting with a total upper bound of four seconds. Suggested sequence:
- Character appears on warm cream with very subtle whole-character motion.
- A decorative animated cursor travels toward the laptop; small typing indicators communicate activity.
- A short greeting bubble appears: **Hi, I'm EwaTechie.** Optionally include **Give me a second…** only if it remains readable within the short sequence.
- Cursor travels toward **ET.**, followed by an **EwaTechie** identity reveal, then the overlay exits into the hero.

The name is a simple label/wordmark, never a hanging badge. Preserve the distinctive provided logo if available as an asset. A text reveal or mask may animate it without distorting its lettering.

The animated cursor is decorative and confined to the intro; never hijack, hide or reposition the visitor's actual pointer. Do not show fake percentage progress or imply that a timed animation measures loading.

For the static character version, use subtle whole-asset motion and adjacent typing cues. Real isolated typing hands or blinking require separate suitable layers or an animated asset. If supplied later, support replacing the static character with SVG/Lottie/video without rebuilding the intro. Inspect the actual file structure before assuming it is layered. Avoid stretching the small PNG into a blurry full-screen illustration; use it at an appropriate display size and document the need for a larger export if required.

Provide an immediate **Skip intro** control. Default to playing once per browsing session on the homepage, not on every navigation or case-study visit. Respect reduced motion by skipping the animated sequence. Render real homepage content immediately behind the overlay, release focus/scroll cleanly after exit and fail open if assets or scripts fail. The intro must never block access indefinitely or delay content requests. Make the intro enabled state, copy and asset configurable in admin.

## 6. Hero

Create a spacious editorial hero using the warm reference. Suggested desktop composition: text on one side and a portrait/character composition on the other, stacking naturally on mobile.

Use these initial editable texts:
- Small static name label: **HI, I'M BARAKAT.**
- Main statement: **I design thoughtful interfaces, clear user journeys and visual details that make products easier and more enjoyable to use.**
- Primary positioning: **UI/UX & PRODUCT DESIGN**.
- Smaller supporting line: **with Motion & Illustration**.
- Primary action: **View my work →**.
- Secondary action: **Let's work together ↗**.
- Optional scroll cue: **Scroll to explore ↓**.

Introduce **Barakat Opeyemi Abdulhakeem** naturally in the About copy and use **EwaTechie** as the brand. Use restrained entrance reveals and real anchor navigation. Do not require visitors to press a continue button to access the portfolio. Do not claim availability, years of experience or geographic details without supplied content.

## 7. Selected Work and project previews

Place Selected Work immediately after the hero. Show roughly 4–6 owner-selected projects, with a clear **View all projects →** link. Make the layout visual, curated and focused on UI/UX.

Use a balanced editorial grid or spacious alternating project compositions. Each preview should contain a compelling arrangement of project screens, a clear project title, a short plain-language description and modest category text. Use the reference layouts for composition, not their architecture imagery or fictional studios.

Examples supplied in the brief are Ubedu — “Making school management easier to manage” and Settlr — “Rethinking the rental search experience.” Treat these as draft examples until genuine project details are supplied. Do not fabricate their research, client relationships or outcomes.

For layered screen previews, animate a small translation or scale of individual screens on hover/focus; optionally reveal **View project ↗**. A flattened screenshot cannot have its internal screens independently animated. Provide an attractive static preview when only one image exists. Store layered media configuration through a small set of reusable preview layouts.

The preview should link to the full case study and be keyboard operable, with no nested conflicting links. Hover cannot be the only way to see vital information; touch layouts show a clear static action. Do not impose pinned sideways scrolling or a motion-heavy gallery by default.

## 8. Project and case-study templates

Use an editable block-based case-study template. Fields: title, slug, summary, category/discipline, cover with alt text, featured state, order, role, timeline, platform, team, status and SEO.

Default UI/UX case-study blocks:
1. Project title and summary.
2. Role · Timeline · Platform · Team.
3. The challenge: the actual problem.
4. Context: business/user/product background.
5. My role: her specific contributions.
6. The process: relevant research, information architecture, user flows, wireframes, UI and testing/iteration.
7. The design: large visuals, readable flows and decisions with captions.
8. The outcome: supplied deliverables, findings, results and lessons.
9. Contact CTA: **Have a project in mind? Let's talk →**.
10. Next project navigation where appropriate.

All blocks are optional and reorderable; never invent process work or metrics to fill a template. Support images, image grids, before/after comparisons, text, quotes, videos and optional trusted Figma prototype embeds. Embeds should load on demand with fallback links and must not accept arbitrary scripts. Do not add password-protected work unless requested later.

Provide a lighter motion/illustration project template with overview, contribution, media gallery/video, tools, process and optional outcomes. Support accessible video controls, captions where speech is relevant and reduced-motion previews.

## 9. About and Playground

About should feel personal, not like a CV. Suggested heading: **A designer who likes making things make sense.** Use editable placeholder prose until approved biography exists.

What I do:
- **UI/UX & Product Design** — main area: turning ideas and complex products into clear, usable experiences.
- **Motion Design** — movement and interaction that help communicate or improve an experience.
- **Illustration** — visuals that add personality and help tell a story.

UI/UX stays visually primary by default. Support optional experience, education, tools, certifications, community and testimonial sections, all hidden when empty and controlled through admin. Do not crowd the default site with all optional sections.

Playground showcases motion experiments, illustrations, animation studies, UI interactions and visual experiments. Suggested editable introduction: **Not everything here needed to be made. I just wanted to make it.**

Use a more playful but consistent grid with previews, categories and an archive link. Keep UI/UX work prominent above it. Avoid several autoplaying videos at once; pause media outside the viewport and provide playback controls. Never present inspiration images as original authored portfolio work.

## 10. Blog

Include a homepage article preview and an archive page. As a configurable default, support both full internal articles and external article links, so the owner can choose her publishing approach later.

Admin fields: title, slug, excerpt, cover/alt text, tags, discipline scope, featured state, date, draft/published state and SEO. Internal content uses a structured rich-text or Markdown editor with safe rendering. External entries store a validated URL and platform and visibly indicate an external destination.

Keep the article style clean and readable. Hide empty blog previews/navigation until there are eligible published posts. Use clearly labelled sample posts during development.

## 11. Contact, socials and footer

Include a working contact form with name, email, optional subject/project type and message. Store submissions in a private admin inbox, with read/unread, archive and delete controls. Validate server-side, add rate limiting/spam protection, and provide accessible errors and clear success feedback. Never expose inbox contents to public users.

Email notifications are an optional integration configured separately through a suitable server-side provider. Database storage must work independently; notification failure must not discard an enquiry. Show success only after the submission is stored. If no backend is configured, clearly disclose the demo state rather than showing a false successful send.

Use repeated, restrained CTAs: **Let's work together ↗**, **Have something in mind? Let's talk**, and **Start a conversation ↗**. Final contact heading: **Got a project in mind?** followed by **Tell me about it.**

Show direct email contact, **LinkedIn ↗** and **More of me ↗** linking to Linktree. Actual email/URLs are pending: keep them editable and hide unconfigured public links instead of inventing addresses. Do not add WhatsApp by default.

Footer: EwaTechie; **UI/UX & Product Designer**, smaller **with Motion & Illustration**; **Let's make something useful.**; LinkedIn and Linktree; current year and **Barakat Opeyemi Abdulhakeem**. The supplied character may reappear as a small static detail to echo the intro.

## 12. Discipline controls

Provide admin visibility switches for **UI/UX & Product Design**, **Motion Design** and **Illustration**. The default state has all enabled, with UI/UX primary. Enable configurable primary-discipline ordering so a future alternate focus is possible without forcing equal prominence today. This is a flexibility default, not a claim that motion-only positioning has been chosen.

At least one discipline must remain active, validated server-side. If the primary discipline is disabled, require selecting an enabled primary before publishing. Provide editable title, introduction and footer wording for the resulting configuration; don't ship contradictory copy.

Apply visibility consistently to services, projects, Playground filters/items, relevant articles, CV options, navigation, metadata and sitemap. Shared/General content remains eligible. Disabling a discipline retains its content in admin. Disabled-only content is unavailable through direct public routes/data queries, not merely hidden with CSS. Preview changes before publication and refresh affected caches together.

## 13. Admin and Supabase implementation

Use Supabase Postgres for content, Auth for the owner and Storage for media/documents. Initial administration is owner-only; do not build unnecessary team features. Use typed data access, validated mutations and appropriate schema constraints/indexes. Public pages should be server-rendered where suitable, with client components for interactions. Content edits must persist and become public after publication without rebuilding code manually.

Admin areas: Dashboard, Homepage/Sections, Brand/Intro/Hero, Disciplines, Work/Case studies, Playground, Blog, About/Optional content, Media, CV, Messages, Settings/SEO.

Allow the owner to:
- Edit all meaningful public copy, labels, media, links and availability settings.
- Create, edit, archive, delete, feature and reorder content.
- Show/hide sections and rearrange them, including keyboard-accessible move controls.
- Add sections from predefined layouts: text/image, project grid, gallery, service rows, timeline, testimonials, article preview and CTA. Arbitrary new layout types require development; do not promise unrestricted visual page building.
- Upload/replace images, videos, documents and future animation assets; edit alt text and captions.
- Update theme tokens and preview contrast.
- Manage CV files and download labels, with missing options hidden.
- Inspect messages and manage the private inbox.
- Preview mobile/desktop layouts and unpublished content.

Use explicit tables for settings/revisions, section instances, disciplines, projects/revisions, case-study blocks, playground items, articles/revisions, optional About collections, media, CVs and enquiries. Variable layout data can use validated structured JSON; don't store the entire site as one unchecked object.

## 14. Drafts, publication and starter content

Every editable public resource supports independent draft and published versions. Saving edits to a published project must not immediately change its live version. Provide **Save draft**, **Preview**, **Publish**, **Unpublish** and appropriate delete confirmations. Preview is owner-authorized, non-indexable and excluded from shared caches. Public queries return only eligible published versions.

Publish coordinated site settings, discipline visibility and dependent copy coherently. Invalidate affected public pages and metadata. Handle save/publish failures without losing edits.

Use removable dummy content to begin. Mark it clearly in admin and development previews as sample data; do not present fictional client praise, case-study outcomes, employment or awards as facts. Use suitable local placeholder visuals and honest labels. Never import Hassana's personal achievements as Barakat's.

Seed only through an explicit, repeat-safe script. Add a **Clear starter content** action with confirmation and a scope/count preview. It removes only seed-marked records and unreferenced seed assets, preserving manual content, owner access and unrelated settings. Do not reseed on every app start or deployment. The owner can manually delete and rebuild all content. Hide empty public sections gracefully.

## 15. Security, accessibility and performance

- Authenticate and authorize every admin route/mutation; a signed-in user is not automatically an administrator. Disable public admin signup and document secure owner provisioning.
- Enforce Supabase row-level security for public published reads, owner writes and private enquiries/drafts. Enforce discipline visibility in the public data layer too.
- Keep privileged credentials server-side. Validate uploads, URLs, embed providers and content. Sanitize rich text. Protect draft media with appropriate private storage and authorized previews.
- Publicly shared media may have been downloaded already; don't promise that unpublishing can recall copies.
- Use semantic structure, meaningful alt text, visible focus, keyboard-operable menus/cards/dialogs/forms and sufficient contrast. Match hover effects with focus/touch alternatives.
- Respect reduced motion for the intro, reveals and animated previews. Content remains visible and usable without motion. Persistent movement has pause controls.
- Limit animation to purposeful moments: character intro, project previews, section/detail transitions and subtle micro-interactions. No scroll-jacking, mandatory custom cursor or unnecessary large animation libraries.
- Optimise images, reserve dimensions, lazy-load heavy assets, defer embeds and pause offscreen videos. Preserve legibility of UI screenshots.
- Include relevant metadata, canonical URLs, social previews and published-content sitemap. Exclude admin, drafts and previews from indexing.

## 16. Delivery and acceptance

Build in stages: visual foundation; schema/auth/policies; content/admin; publishing; loader and project motion; accessibility/performance checks. Use one coherent animation approach such as CSS plus Motion when needed. Prefer small maintainable components over a large monolithic page.

Provide complete source, migrations, RLS/storage policies, optional seed script, environment-variable example and clear setup instructions. Include an owner guide for replacing dummy content, publishing, discipline switches, managing the blog/inbox and replacing the static intro character later. If Supabase or another service isn't configured, identify exactly which behaviour is demo-only.

Verify:
1. No hanging tag or swinging badge exists; hero uses a simple name label.
2. UI/UX is primary, with motion and illustration supporting it by default.
3. Intro completes promptly, supports Skip/reduced motion, plays once per session and cannot trap visitors.
4. Selected Work follows the hero; cards navigate to useful case studies.
5. All agreed content and section controls persist through the admin.
6. Draft saves don't leak to live pages; publishing/unpublishing updates content and caches correctly.
7. Discipline switches produce coherent public presentation and direct-route behaviour.
8. Seed cleanup preserves manually created work and leaves usable empty states.
9. Contact messages are stored privately; form feedback is truthful.
10. Blog, filters, mobile navigation, media playback and keyboard operation work.
11. Responsive layouts at 390px and 1440px look finished, with no accidental horizontal overflow at 320px.

Finish with a concise summary of implementation, validation and any missing configuration. The final result should feel like EwaTechie: warm, clear, personal and professionally focused on design.
