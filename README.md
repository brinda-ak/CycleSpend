# CycleSpend

# The Problem
A study of 443 women (Pine & Fletcher, Personality and Individual Differences, 2011) found that women in the luteal phase showed significantly less self-control, more impulsive purchasing, and higher rates of buyer's remorse — yet no budgeting app accounts for this. College-age women are at the intersection of limited income, high temptation environments (campus food delivery, online shopping), and the highest frequency of regular menstrual cycles. A Purdue student with a $2,000/semester discretionary budget who overspends by 35% each luteal phase is losing ~$175/semester to a pattern she may not even be aware of.

# The Features
Features
1. Cycle-Spend Heatmap
A calendar-view heatmap where each day is color-coded by spending intensity with cycle phase bands overlaid. One glance reveals the correlation between cycle phase and spending. Tap any day to see transactions and phase context. Color scale interpolates from warm-bg (low spend) through dark-tan (moderate) to cranberry (high spend). Phase bands render at 20% opacity behind the grid.
2. Phase Budget Allocator
Splits the user's monthly budget across four cycle phases in unequal proportions based on personal spending history. Research-based defaults: follicular 22%, ovulatory 13%, luteal 40%, menstrual 25%. Users can fine-tune via sliders. Each phase shows a countdown with remaining budget and days left. The budget fits the biology — the user isn't "failing."
3. Cycle Savings Challenge
During follicular/ovulatory phases (high willpower), the app issues daily micro-challenges tied to real campus life: "Skip the $6 Starbucks today and bank it for Day 22." Completed challenges build a Cycle Cushion — a budget buffer that gets added to the luteal phase allocation. End-of-cycle receipt shows net impact. Challenges are verified against Nessie transaction data when possible.
4. Symptom-Spend Correlation Tracker
A 5-second daily check-in (mood, energy, craving level on a 1–4 scale) that the app correlates with spending using Pearson coefficients. Surfaces insights like "When you log low energy, you spend 2.3x more on food delivery within 4 hours." Correlations feed the monthly report after 14+ days of data.
5. Monthly Cycle Finance Report
AI-generated end-of-cycle report powered by Gemini 1.5 Flash. Includes phase spending breakdowns vs. personal averages, category analysis per phase, Cycle Cushion performance, symptom-spend highlights, and a personalized 3–4 sentence narrative with one actionable tip for the next cycle. Tone: encouraging and empowering, never shaming.
6. Badge Garden & Rewards
A collectible reward system where users grow a visual flower garden by hitting milestones. 13 unique botanical flower badges across four categories (Cycle, Challenge, Savings, Streak & Special) with rarity tiers from common to legendary. Petals (points) are earned from challenges, symptom logging, streaks, and cycle completions. Challenge completion is verified against Nessie transaction data — if you say you skipped DoorDash, the app checks.

# Tech Stack
React 18 + Vite + Tailwind CSS
Firebase (Auth, Firestore, Hosting)
Google Gemini API (1.5 Flash)
Nessie API (Capital One)
Simulated bank accounts and transactions. Realistic demo data. Finance track relevance.
Recharts
Custom JavaScript

## Phase 1 foundation (this repo)

- **React 18 + Vite** with Tailwind (custom palette: burgundy, cranberry, mauve, terracotta, tan, warm-bg, espresso)
- **Firebase**: Auth (Google), Firestore (users, transactions, symptoms, challenges, reports)
- **Shared utils**: `cycleUtils.js` (phase/day/color), `colorUtils.js` (spend-to-heatmap color)
- **Nessie API**: client in `src/lib/nessie.js`, sync to Firestore in `src/lib/nessieSync.js`, seed script in `scripts/seedTransactions.js`
- **Auth + onboarding**: Google sign-in, onboarding (name, last period start, cycle length, monthly budget), profile in Firestore
- **App shell**: 5 tabs (Home, Heatmap, Budget, Challenges, Report), phase badge in header

## Setup

1. **Install**
   ```bash
   npm install
   ```

2. **Env**
   - Copy `.env.example` to `.env`
   - Add Firebase config (Project settings in Firebase Console): `VITE_FIREBASE_*`
   - Add Nessie key (hackathon.nessieisreal.com): `VITE_NESSIE_API_KEY`
   - Add Gemini key (optional for Phase 1): `VITE_GEMINI_API_KEY`

3. **Firebase**
   - Create a project, enable **Email/Password** and **Google Auth** in Authentication → Sign-in method
   - Deploy rules: `firebase deploy --only firestore:rules` (after `firebase init` if needed)
   - Add your Firebase config to `.env`

4. **Run**
   ```bash
   npm run dev
   ```

5. **Demo account** — On the login page, click "Use demo account" to sign in with pre-filled data. Credentials: `demo@example.com` / `demo123456`. The account is created automatically on first use.

6. **Seed Nessie (optional, for demo data)**
   ```bash
   NESSIE_API_KEY=your_key node scripts/seedTransactions.js
   ```
   Then in the app, set the user’s `nessieCustomerId` and `nessieAccountId` in Firestore (or add an in-app “connect Nessie” flow that creates customer/account and stores IDs).

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — Production build (output in `dist/`)
- `npm run preview` — Preview production build
- `npm run seed:nessie` — Runs `node scripts/seedTransactions.js` (set `NESSIE_API_KEY` in env)

## Firestore schema (foundation)

- `users/{uid}` — name, email, cycleLength, lastPeriodStart, monthlyBudget, phaseAllocations, nessieCustomerId, nessieAccountId
- `users/{uid}/transactions/{txnId}` — amount, category, date, source (nessie|manual), cycleDay, phase
- `users/{uid}/symptoms/{YYYY-MM-DD}` — mood, energy, craving, cycleDay, phase
- `users/{uid}/challenges/{cycleId}` — entries, totalSaved, target
- `users/{uid}/reports/{cycleId}` — phaseSpends, aiSummary, etc.

## Next (feature build)

- Heatmap: calendar grid + phase bands + day detail modal
- Phase Budget: phase cards, sliders, countdown
- Savings Challenge: challenge cards, cushion jar, receipt
- Symptom tracker: emoji check-in, correlation engine
- Cycle Report: aggregation + Gemini narrative
