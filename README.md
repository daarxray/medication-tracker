# 💊 Medication & Well-being Tracker

A complete web application for tracking medications, vitamins, and correlating them with your well-being over time. Features data visualization, correlation analysis, and local data storage.

## 🌟 Features

- **Entry Logging**: Log medications/vitamins with well-being scores (1-10) and notes
- **Automatic Timestamps**: Every entry automatically saves date and exact time
- **Analytics Dashboard**: View summary statistics and medication-wellbeing correlations
- **Data Visualizations**: Interactive charts showing:
  - Medication frequency (bar chart)
  - Well-being trends over time (line chart)
  - Well-being score distribution (pie chart)
- **Correlation Analysis**: Automatically calculates how each medication correlates with your well-being
- **Local Storage**: All data stored in your browser - no external servers
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 📦 Tech Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.11
- **Charts**: Chart.js 4.4.1 with react-chartjs-2 5.2.0
- **Date Handling**: date-fns 3.0.6
- **Styling**: Pure CSS (no framework dependencies)
- **Storage**: Browser localStorage API

## 🚀 Installation & Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)
- Git

### Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages:
- react (^18.2.0)
- react-dom (^18.2.0)
- chart.js (^4.4.1)
- react-chartjs-2 (^5.2.0)
- date-fns (^3.0.6)
- @vitejs/plugin-react (^4.2.1)
- vite (^5.0.11)

### Step 2: Run Development Server

```bash
npm run dev
```

The application will open automatically in your browser at `http://localhost:3000`

### Step 3: Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Step 4: Preview Production Build (Optional)

```bash
npm run preview
```

## 🔧 Git Setup & Version Control

### Initialize Git Repository

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Complete medication tracker application"

# Optional: Add remote repository (replace with your GitHub URL)
git remote add origin https://github.com/your-username/medication-tracker.git

# Optional: Push to remote repository
git push -u origin main
```

### Useful Git Commands

```bash
# Check status
git status

# Add specific files
git add src/components/EntryForm.jsx

# Commit changes
git commit -m "Your commit message"

# View commit history
git log --oneline

# Create a new branch
git checkout -b feature/new-feature

# Switch branches
git checkout main
```

## 🌐 Deployment to Vercel

Vercel offers the simplest deployment process with zero configuration needed.

### Method 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? (default: medication-tracker)
   - In which directory is your code? **./`**
   - Auto-detected settings? **Y**

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

### Method 2: Deploy via GitHub (Automated)

1. **Push your code to GitHub**:
   ```bash
   git remote add origin https://github.com/your-username/medication-tracker.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect settings
   - Click "Deploy"

3. **Automatic Deployments**:
   - Every push to `main` branch auto-deploys to production
   - Pull requests create preview deployments

### Method 3: Deploy via Vercel Dashboard

1. Build your project:
   ```bash
   npm run build
   ```

2. Go to [vercel.com/new](https://vercel.com/new)

3. Drag and drop your `dist/` folder

4. Your app is live!

### Vercel Configuration (Optional)

If you need custom configuration, create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

This is optional - Vercel auto-detects these settings.

### Environment Variables (If Needed)

If you add API keys or external services later:

1. In Vercel Dashboard → Project → Settings → Environment Variables
2. Add variables (e.g., `VITE_API_KEY`)
3. Redeploy

## 📁 Project Structure

```
medication-tracker/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── EntryForm.jsx       # Form for logging entries
│   │   ├── EntryList.jsx       # Display all entries
│   │   ├── Dashboard.jsx       # Statistics & correlations
│   │   └── Charts.jsx          # Data visualizations
│   ├── utils/
│   │   ├── storage.js          # localStorage CRUD operations
│   │   └── analytics.js        # Correlation & statistics logic
│   ├── App.jsx                 # Main application component
│   ├── index.jsx               # React entry point
│   └── index.css               # Global styles
├── package.json                # Dependencies & scripts
├── vite.config.js              # Vite configuration
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 💡 Usage Guide

### Logging an Entry

1. Click "📝 Log Entry"
2. Enter medications/vitamins (comma-separated)
3. Adjust well-being slider (1-10)
4. Add optional notes
5. Click "Save Entry"

### Viewing Analytics

- **Dashboard**: See overall statistics and medication correlations
- **Charts**: View visual trends and distributions
- **All Entries**: Browse and delete individual entries

### Understanding Correlations

The app calculates average well-being:
- **With medication**: When you took the specific medication
- **Without medication**: When you didn't take it
- **Difference**: Positive means better well-being with medication

**Important**: Correlation ≠ Causation. Always consult healthcare professionals.

## 🔒 Privacy & Data

- **100% Local Storage**: All data stays in your browser
- **No External Servers**: Nothing is sent over the internet
- **Export/Backup**: Data persists in browser localStorage
- **Reset**: Clear browser data to reset the app

## 🛠 Troubleshooting

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

```bash
# Change port in vite.config.js or kill the process
lsof -ti:3000 | xargs kill
```

### Charts Not Displaying

- Ensure you have at least 2 entries logged
- Check browser console for errors
- Clear browser cache

### Data Lost

- Data is stored in localStorage - don't clear browser data
- Use browser export/backup features if needed

## 🚀 Future Enhancements

Potential features for future versions:
- Export data to CSV/JSON
- Import historical data
- Multi-user support with accounts
- Medication reminders
- Custom medication categories
- Weekly/monthly reports
- Data export to healthcare providers

## 📄 License

MIT License - Feel free to use and modify for personal or commercial use.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📞 Support

For issues or questions:
- Check the troubleshooting section
- Review browser console for errors
- Ensure all dependencies are installed correctly

## 🎯 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

**Built with ❤️ for better health tracking**
