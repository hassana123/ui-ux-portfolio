# EWATECHIE Portfolio - Deployment Guide

## Project Structure

This portfolio uses **plain semantic HTML** with no styling applied. You are free to style it however you want!

### Component Files (All Under 100 Lines)

**Layout & Navigation:**
- `components/navbar.tsx` - Header navigation
- `components/footer.tsx` - Footer with links

**Home Page Sections:**
- `components/hero.tsx` - Hero section with intro
- `components/services.tsx` - Services/what you can do
- `components/tools.tsx` - Tools & technologies list
- `components/projects.tsx` - Portfolio projects grid
- `components/testimonials.tsx` - Client testimonials
- `components/articles.tsx` - Blog articles
- `components/about.tsx` - About/CTA section

**Pages:**
- `app/page.tsx` - Homepage
- `app/about/page.tsx` - About me page
- `app/contact/page.tsx` - Contact page

## Environment Variables

### `.env.local` (for local development)

Create a `.env.local` file in the root with these variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

### `.env.production` (for Vercel)

Create a `.env.production` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://your-domain.com/auth/callback
```

## Getting Supabase Credentials

1. Visit [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Create a new project
4. Go to **Settings > API**
5. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Deployment to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in **Settings > Environment Variables**
5. Deploy!

## Database Tables

Your Supabase project needs these tables:

### `profiles`
- `id` (UUID, primary key)
- `name` (text)
- `title` (text)
- `bio` (text)
- `avatar_url` (text)
- `experience` (text)
- `projects` (text)

### `projects`
- `id` (UUID, primary key)
- `title` (text)
- `description` (text)
- `image_url` (text)
- `project_url` (text)
- `category` (text)
- `created_at` (timestamp)

### `testimonials`
- `id` (UUID, primary key)
- `quote` (text)
- `client_name` (text)
- `client_role` (text)
- `created_at` (timestamp)

### `articles`
- `id` (UUID, primary key)
- `title` (text)
- `content` (text)
- `featured_image_url` (text)
- `slug` (text)
- `created_at` (timestamp)

### `tech_stack`
- `id` (UUID, primary key)
- `name` (text)
- `category` (text)

### `settings`
- `id` (UUID, primary key)
- `social_github` (text)
- `social_twitter` (text)
- `social_linkedin` (text)
- `social_instagram` (text)

## Running Locally

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
pnpm start
```

## Important Notes

- All components use **pure semantic HTML** with NO CSS classes
- You can add CSS however you want - Tailwind, CSS modules, inline styles, etc.
- Never commit `.env.local` to version control
- Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Keep your Supabase Anon Key safe (though it's designed to be public)
