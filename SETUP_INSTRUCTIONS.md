# EWATECHIE Portfolio - Setup Instructions

## ✨ What You Have

A fully functional **semantic HTML-only** portfolio website with:

### Pages
- **Home** (`/`) - Hero, services, tools, projects, testimonials, articles
- **About Me** (`/about`) - Biography, experience, skills, contact info, philosophy
- **Contact** (`/contact`) - Contact form with social links
- **Admin Dashboard** (`/admin`) - Manage all portfolio content (requires authentication)

### Component Structure
All components follow the **100-line limit** rule for maintainability:

**Navigation & Footer:**
- `navbar.tsx` (21 lines)
- `footer.tsx` (45 lines)

**Home Page Sections:**
- `hero.tsx` (43 lines)
- `services.tsx` (24 lines)
- `tools.tsx` (14 lines)
- `projects.tsx` (40 lines)
- `testimonials.tsx` (29 lines)
- `articles.tsx` (34 lines)
- `about.tsx` (17 lines)

**Pages:**
- `app/page.tsx` (83 lines)
- `app/about/page.tsx` (78 lines)
- `app/contact/page.tsx` (96 lines)

## 🚀 Quick Start

### 1. Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Sign up and create a new project
3. Go to **Settings > API**
4. Copy your:
   - **Project URL**
   - **Anon Key**

### 2. Set Up Environment Variables

**Option A: Using `.env.local` (Local Development)**

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...your-key-here
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/auth/callback
```

**Option B: Using `.env.template` (Copy & Paste)**

1. Copy the `.env.template` file
2. Rename it to `.env.local`
3. Fill in your Supabase credentials

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Run the Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000` to see your portfolio!

## 📝 Available Environment Variable Files

- **`.env.example`** - Template showing all variables needed
- **`.env.template`** - Detailed template with comments
- **`.env.local`** - Your local development variables (DO NOT COMMIT)
- **`.env.production`** - For production on Vercel (fill before deploying)

## 🎨 Styling Your Portfolio

The portfolio comes with **NO styling** - just pure semantic HTML. You can style it however you want:

### Option 1: Tailwind CSS (Already Configured)
The project already has Tailwind CSS installed. Just add class names to your components.

### Option 2: CSS Modules
Create `.module.css` files and import them into your components.

### Option 3: Global CSS
Add styles to `app/globals.css`

### Option 4: Inline Styles
Add style attributes directly in your components.

## 📂 Project Structure

```
/
├── app/
│   ├── page.tsx           (Homepage)
│   ├── about/
│   │   └── page.tsx       (About Me Page)
│   ├── contact/
│   │   └── page.tsx       (Contact Page)
│   ├── admin/             (Admin Dashboard)
│   ├── auth/              (Authentication)
│   └── layout.tsx
├── components/
│   ├── navbar.tsx
│   ├── hero.tsx
│   ├── services.tsx
│   ├── tools.tsx
│   ├── projects.tsx
│   ├── testimonials.tsx
│   ├── articles.tsx
│   ├── about.tsx
│   └── footer.tsx
├── lib/
│   └── supabase/
│       └── client.ts      (Supabase configuration)
├── .env.example
├── .env.local             (Your local variables - DO NOT COMMIT)
├── .env.template
└── package.json
```

## 🗄️ Database Setup

The database tables are automatically set up by Supabase when you create your project. Key tables include:

- `profiles` - Your designer information
- `projects` - Portfolio projects
- `testimonials` - Client feedback
- `articles` - Blog posts
- `tech_stack` - Tools you use
- `settings` - Social links and preferences

See `DEPLOYMENT.md` for detailed schema.

## 🚀 Deploying to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Create Vercel Project
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Vercel will auto-detect Next.js configuration

### 3. Add Environment Variables
In Vercel Project Settings → Environment Variables, add:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=https://yourdomain.com/auth/callback
```

### 4. Deploy
Click "Deploy" - your site goes live! 🎉

## 🔑 Important Security Notes

**DO NOT:**
- ❌ Commit `.env.local` to version control
- ❌ Share your Supabase keys in public repos
- ❌ Use production keys in development

**DO:**
- ✅ Add `.env.local` to `.gitignore` (already done)
- ✅ Use different projects for dev and production
- ✅ Rotate keys if accidentally exposed

## 📚 Documentation Files

- **`SETUP_INSTRUCTIONS.md`** (this file) - Complete setup guide
- **`ENV_SETUP.md`** - Environment variables only
- **`DEPLOYMENT.md`** - Deployment and database schema
- **`.env.template`** - Environment variable template
- **`.env.example`** - Environment variable example

## 🆘 Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
```bash
pnpm install @supabase/supabase-js
```

### "Environment variables are not defined"
Make sure your `.env.local` file exists and has the three required variables.

### "Database connection failed"
1. Check your Supabase URL and key are correct
2. Verify your project is active in Supabase dashboard
3. Make sure the Supabase service is running

### "Vercel deployment fails"
1. Check that all environment variables are added in Vercel settings
2. Verify the redirect URL is set correctly for your domain
3. Check the deployment logs for specific errors

## 💡 Next Steps

1. **Update Profile** - Sign up and add your information in `/admin`
2. **Add Projects** - Upload your portfolio projects
3. **Customize Styling** - Add your own CSS/design
4. **Deploy** - Push to Vercel for a live site
5. **Share** - Tell the world about your portfolio!

## 📞 Need Help?

- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs

---

**Created by v0 | Happy Building! 🚀**
