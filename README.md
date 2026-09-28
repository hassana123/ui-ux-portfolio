# EwaTechie portfolio

A warm editorial Next.js App Router / TypeScript portfolio with Tailwind, local Manrope and Lora fonts, Supabase owner authentication, private media and independent draft/published revisions.

## Run locally

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill the values you have.
3. `npm run dev` and open http://localhost:3000.
4. `npm run build`, `npm run typecheck` and `npm test` provide build and validation checks.

Without Supabase, development mode displays **labelled removable sample work**. Production only displays those samples if `NEXT_PUBLIC_DEMO_MODE=true`. Contact explicitly says delivery is not connected; it never reports a false send. Owner login is unavailable until configured. No browser-local fake admin is provided.

## Connect Supabase

1. Create a Supabase project. Run `supabase/migrations/001_portfolio.sql` once in its SQL editor.
2. Set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, a random `CONTACT_RATE_SECRET`, and the production `NEXT_PUBLIC_SITE_URL`. Never prefix the service-role key with `NEXT_PUBLIC_`.
3. In Supabase Auth settings, **disable new user signups**. Create the owner's email/password user through the Supabase dashboard. Add that UUID explicitly:

   ```sql
   insert into public.owners(user_id) values ('OWNER_AUTH_USER_UUID');
   ```

4. Sign in at `/admin/login`. A signed-in non-owner is rejected. All mutations check owner membership and database RLS independently protects drafts and enquiries.
5. Optionally run `node --env-file=.env.local --import tsx scripts/seed.ts`. This explicit, repeat-safe command creates sample **drafts only**, preserves existing data and never runs on app startup.
6. Review the homepage copy and settings, then publish. Publish each real project/article independently. Set `NEXT_PUBLIC_DEMO_MODE=false` for launch.

The contact endpoint stores messages through an atomic database rate limiter (five per IP hash per hour), with input validation and a honeypot. Configure your hosting proxy to overwrite the forwarded client-IP header; Vercel's platform header is preferred. No email-notification provider is configured. Storage success does not depend on email delivery.

## Owner guide

- **Brand / Intro / Hero:** edit identity, hero copy, character/portrait and color tokens. Contrast preview reports ink, muted and link text against canvas. Review other color combinations visually when changing tokens.
- **Homepage / Sections:** move sections with up/down controls, edit titles and introductions, hide sections or add simple text/media layouts. The renderer supports the main work, about, playground, blog and contact layouts. Added gallery/service/timeline/testimonial sections currently share a simple title/text/image presentation; they are not unrestricted visual builders.
- **Disciplines:** choose enabled areas and an enabled primary. Update positioning, supporting line, hero, footer and SEO together. At least one creative discipline must remain enabled. Published data queries and RLS hide disabled-only content, including direct detail routes.
- **Work / Playground / Blog:** create items, add and reorder text, image, grid, comparison, quote, controlled video or trusted Figma blocks. Comparisons use side-by-side images. Text is safely rendered as plain text with paragraph breaks. External article URLs are HTTPS and visibly marked. Save draft does not alter live content. Preview is authenticated and non-indexable. Publish promotes revisions atomically. Unpublish removes public access while retaining drafts.
- **Media:** upload a supported file, supply alt text, copy `/api/media/UUID` into a cover or block. Media is stored in a private bucket. Public delivery checks whether an eligible published revision references the asset; owners can access draft assets. Files are streamed with no-store caching. Replacing an asset means uploading a new file and updating its reference. Media metadata editing/deletion is not yet exposed in the UI.
- **CV:** upload a PDF in Media and paste its URL; leaving it blank hides the link. There is currently one shared CV option.
- **Messages:** mark read/unread, archive/restore or delete privately stored enquiries.
- **Dashboard:** review exact counts before clearing seed-marked records. Manual records, settings and owner access are preserved. Bundled sample artwork uses CSS and local assets, so the seed script creates no storage objects to clean up.

## Assets and references

`public/images/character.png` is the supplied `Group 1.png` (208 × 260, static RGBA). It is displayed at or below its intrinsic size. The intro animates the whole character with separate decorative typing/cursor cues, not individual hands or eyes. It lasts 3.2 seconds, supports immediate Skip, runs once per session, skips reduced motion and fails open. It does not lock page focus or scrolling. The provided wordmark export is retained in `public/images/wordmark.png` for social previews. A sharper transparent wordmark export would allow a clean animated wordmark reveal; current intro uses text branding.

The supplied Figma URL could not be accessed during development. Warm Editorial and Violet exports guided spacing and hierarchy; EwaTechie's cream/brown/peach tokens remain primary. Tega's reference influenced modest motion and visual project compositions only. No portraits, achievements, contact details or case-study claims were transferred. `image 10.png` is not presented as authored work.

## Remaining setup and scope

Real project screens, approved biography, case-study details, portrait, CV, email and social URLs remain owner-supplied. Ubedu and Settlr visuals are illustrative interface compositions, clearly labelled samples. Optional generic section kinds use text/media layouts; dedicated structured timeline/testimonial editors, multiple discipline-scoped CVs, media metadata/delete controls and full-fidelity settings previews remain extensions. Explicit auxiliary tables are provisioned for those future editors; current section/discipline configuration is validated and atomically published within settings revisions. Draft settings preview renders copy, theme and section order, not the complete homepage composition.

Before production, run the migration and exercise owner login, draft isolation, publication, disabled-discipline routes, private-media access, inbox storage and rate limiting against the actual Supabase project. These integration checks cannot be certified without credentials. Previously public assets may already have been downloaded; unpublishing cannot recall copies.

Framework references: [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [Supabase SSR client setup](https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs).
