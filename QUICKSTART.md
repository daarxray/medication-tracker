# 🚀 QUICK START GUIDE

## Immediate Setup (5 minutes)

### 1. Navigate to Project
```bash
cd medication-tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Your app will open at http://localhost:3000

## Deploy to Vercel (2 minutes)

### Option A: Vercel CLI
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option B: GitHub + Vercel Dashboard
```bash
# Initialize git and commit
git init
git add .
git commit -m "Initial commit"

# Push to GitHub (create repo first on github.com)
git remote add origin https://github.com/YOUR-USERNAME/medication-tracker.git
git branch -M main
git push -u origin main

# Then go to vercel.com → Import Project → Select your repo → Deploy
```

## What You Get

✅ Complete medication tracking app
✅ Real-time data visualization
✅ Correlation analysis
✅ Responsive design
✅ Zero configuration deployment

## File Overview

- **src/components/** - React components (EntryForm, Dashboard, Charts, EntryList)
- **src/utils/** - Business logic (storage, analytics)
- **src/App.jsx** - Main application
- **src/index.css** - All styling
- **package.json** - Dependencies

## All Dependencies Included

- React 18.2.0 - UI framework
- Chart.js 4.4.1 - Data visualization
- date-fns 3.0.6 - Date handling
- Vite 5.0.11 - Build tool

## Need Help?

Check README.md for:
- Detailed documentation
- Troubleshooting guide
- Git commands
- Deployment options
