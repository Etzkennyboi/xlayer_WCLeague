push to git
# X-Layer World Cup Fantasy League (xlayer_WCLeague)

A blockchain-powered fantasy football platform and prediction market featuring immersive real-time match simulations, high-stakes PK Shootouts, and live global rankings.

## Tech Stack
- **Framework:** Next.js (App Router + React)
- **Styling:** Tailwind CSS
- **Web3:** Ethers.js & Hardhat
- **Database (Dev):** Local JSON Server

## Getting Started

### Prerequisites
Make sure you have Node.js and npm installed.

### Installation
Install the project dependencies:
```bash
npm install
```

### Local Development
To run the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build
The application has been structurally optimized to be deployed seamlessly to Vercel with zero hydration errors. 
To generate a production-ready static server bundle locally:
```bash
npm run build
```

## Pushing to GitHub & Vercel Deployment
The repository is primed and optimized for mainnet deployment. 

To securely push your latest codebase to GitHub and trigger an automatic deployment on your connected Vercel account, run this in your terminal:

```bash
git add .
git commit -m "Mainnet deployment"
git remote set-url origin https://github.com/Etzkennyboi/xlayer_WCLeague.git
git push -u origin main --force
```

## Core Features
- **Immersive Onboarding:** Cinematic background transitions and crisp user experience.
- **Matchday Predictions:** Predict outcomes on "Banger Fixtures" featuring a symmetrical UI and massive team flags.
- **Real-Stakes PK Shootout:** Interactive mini-game protected by dual-synced server/client 24-hour cooldowns (Vercel-stateless safe).
- **Lag-Free Simulations:** Butter-smooth live match simulation engine using heavily memoized rendering loops.
- **Web3 Ready:** Fully prepared for X-Layer mainnet smart contract interactions.
