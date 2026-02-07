# CycleSpend

Financial wellness app that maps spending to menstrual cycle phases (research-backed: Pine & Fletcher, 2011). Budget with your cycle, not against it.

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
   - Create a project, enable Google Auth and Firestore
   - Deploy rules: `firebase deploy --only firestore:rules` (after `firebase init` if needed)
   - Add your Firebase config to `.env`

4. **Run**
   ```bash
   npm run dev
   ```

5. **Seed Nessie (optional, for demo data)**
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
