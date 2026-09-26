# Setup Guide — Panjgur Heritage Directory

This project now has a real database (Supabase), real login, and real photo
uploads. Everything below is written for someone who hasn't done this before —
follow it top to bottom in order.

---

## 0. What changed from the Lovable export

- Fixed a broken folder name (`routess` → `routes`) that would have stopped the
  app from building at all.
- Restored `.gitignore` / `.prettierrc` (the zip export had stripped their
  leading dots).
- Replaced every fake/sessionStorage-based feature with real Supabase calls:
  - `/login` — real email + password accounts
  - `/listing` — submitting a listing now saves it to a real database table
    and uploads photos to real storage
  - `/dashboard` — shows your real listing(s) and their real status
  - `/admin` — approve / reject / delete real submissions (admin-only)
  - `/dates`, `/crafts` — show real **approved** listings
  - `/listing/$id` — a public profile page for one real listing

You need to connect this to your own Supabase project before any of that
works. That's steps 1–3 below.

---

## 1. Create your Supabase project

1. Go to https://supabase.com, sign up (free), click **New Project**.
2. Pick any name/region, set a database password (save it somewhere), wait
   ~2 minutes for it to spin up.
3. In the left sidebar, go to **SQL Editor → New query**.
4. Open `supabase/schema.sql` from this project, copy **all** of it, paste it
   into the SQL editor, click **Run**.
   - This creates the `listings` table, a `profiles` table (tracks who's an
     admin), Row Level Security rules, and a public `listing-photos` storage
     bucket.
   - Safe to re-run if you ever need to.
5. In the left sidebar, go to **Settings → API**. You'll need two values from
   this page in step 3:
   - **Project URL**
   - **anon / public** key (NOT the `service_role` key — never expose that one)

### Turn off email confirmation (recommended for a hackathon)
By default Supabase requires people to click a confirmation email before they
can log in — fine for production, annoying to demo in a hurry.
Go to **Authentication → Providers → Email** and turn off **"Confirm email"**
if you want people (including yourself, for testing) to be able to sign up and
immediately log in.

---

## 2. Install VS Code and open the project

1. Download VS Code: https://code.visualstudio.com — install it like any app.
2. Unzip the project folder I've given you somewhere on your computer (e.g.
   Desktop).
3. Open VS Code → **File → Open Folder…** → select the unzipped project
   folder.
4. Open a terminal inside VS Code: **Terminal → New Terminal** (or
   `` Ctrl+` ``). Everything below is typed into that terminal.

You'll also need **Node.js** installed (VS Code doesn't include it):
download the LTS version from https://nodejs.org, install it, then restart
VS Code's terminal.

---

## 3. Connect the project to your Supabase project

1. In the terminal:
   ```
   cp .env.example .env
   ```
2. Open the new `.env` file in VS Code and paste in the two values from step 1:
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
3. Install dependencies and run the app locally:
   ```
   npm install
   npm run dev
   ```
4. Open the URL it prints (usually `http://localhost:3000`) in your browser.

### Try the full flow once, locally
1. Click **Login** in the header → **Create an account** → sign up with any
   email/password.
2. Go to **Add / Update Listing** → fill it in → submit. It'll say "pending".
3. To approve it, you need an admin account. In Supabase's **SQL Editor**, run
   (with your real email):
   ```sql
   update public.profiles set is_admin = true
   where id = (select id from auth.users where email = 'you@example.com');
   ```
4. Refresh the app, go to `/admin`, click **Approve** on your listing.
5. Go to `/dates` or `/crafts` — your listing now shows up for real.

---

## 4. Push the code to GitHub

1. Create a new empty repository at https://github.com/new (don't add a
   README/gitignore — this project already has them). Copy the repo URL it
   shows you, e.g. `https://github.com/your-username/panjgur-directory.git`.
2. Back in the VS Code terminal:
   ```
   git init
   git add .
   git commit -m "Initial commit: Panjgur Heritage Directory with Supabase"
   git branch -M main
   git remote add origin https://github.com/your-username/panjgur-directory.git
   git push -u origin main
   ```
   (The first push may open a browser window asking you to log in to GitHub —
   that's normal.)

Your `.env` file will **not** be pushed (it's in `.gitignore` on purpose,
since it holds your Supabase keys) — that's correct and expected.

---

## 5. Deploy to Vercel

1. Go to https://vercel.com, sign up/log in with your GitHub account.
2. Click **Add New… → Project**, select the GitHub repo you just pushed.
3. Vercel will auto-detect the framework. Leave build settings as default
   (build command `npm run build` — Vercel/Nitro handle the rest
   automatically for this TanStack Start setup).
4. Before clicking Deploy, open **Environment Variables** and add the same
   two values from your `.env` file:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click **Deploy**. Wait a minute or two — you'll get a live `.vercel.app`
   URL.
6. Every time you `git push` to `main` again, Vercel redeploys automatically.

---

## 6. Quick troubleshooting

- **"Supabase is not configured yet" warning in the browser console** → your
  `.env` (or Vercel env vars) are missing or misspelled. Restart `npm run dev`
  after editing `.env` — Vite only reads it on startup.
- **Login says "Email not confirmed"** → turn off "Confirm email" in Supabase
  (step 1), or check the confirmation email.
- **Listing submits but never shows in `/dates` or `/crafts`** → that's
  expected — it starts as "pending" until an admin approves it in `/admin`.
- **Can't access `/admin`** → you're not marked as an admin yet — run the SQL
  from step 3.3 with your account's email.
- **Photos don't upload** → double check `supabase/schema.sql` actually ran
  successfully (check **Storage** in the Supabase dashboard for a
  `listing-photos` bucket).
