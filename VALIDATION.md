# Validation — 28 September 2026

Passed locally:

- `npm run build`: production compilation, TypeScript and route generation.
- `npm run typecheck`.
- `npm test`: four checks covering discipline invariants, disabled-content eligibility, contact validation and unsafe URL/embed rejection.
- HTTP 200: homepage, Work, Ubedu sample detail, Playground, motion sample detail, Blog, sample article, owner login and sitemap.
- Missing project: HTTP 404.
- Unauthenticated `/admin`: redirects to `/admin/login`.
- Unauthenticated admin mutation: HTTP 401.
- Invalid contact submission: HTTP 400.
- Valid contact submission without backend configuration: HTTP 503, not a false success.
- Dependency installation reported zero known vulnerabilities.

Not verified:

- Desktop/mobile screenshots, 320px overflow and real keyboard/intro behavior: no browser was exposed by the browser tooling (Chrome and in-app browser were both unavailable).
- Supabase migration execution, authenticated owner workflow, RLS isolation, atomic publication, upload storage and actual enquiry persistence: no Supabase environment configuration was supplied.

See README.md for implementation scope, setup and remaining extensions. The development server runs at http://localhost:3000 while its process remains active.
