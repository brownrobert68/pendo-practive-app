# Pendo Practice App - Deployment Guide

## Prerequisites
- Node.js installed (version 14 or higher)
- A Pendo account (free trial at pendo.io)
- A free hosting account (Vercel, Netlify, or GitHub)

---

## Part 1: Setting Up the Application Locally

### Step 1: Prepare Your Project

1. Copy all the project files to a directory on your computer
2. Open a terminal/command prompt in that directory
3. Run: `npm install`
4. Test locally: `npm start`
5. Verify it opens at http://localhost:3000

---

## Part 2: Adding Pendo Analytics

### Step 1: Get Your Pendo Script

1. Go to [app.pendo.io](https://app.pendo.io)
2. Sign in to your Pendo account
3. Navigate to: **Settings** → **Subscription Settings** → **App Details**
4. Find your **Install Script** or **API Key**
5. Copy the entire installation script

### Step 2: Install Pendo in Your App

1. Open `public/index.html` in a text editor
2. Find the commented section that says `<!-- Pendo Script -->`
3. Replace it with your Pendo installation script
4. Update the visitor ID to be unique (you can use the current setup or modify it):

```javascript
pendo.initialize({
    visitor: {
        id: 'visitor-' + Math.random().toString(36).substring(7)
    },
    account: {
        id: 'practice-account'
    }
});
```

5. Save the file

### Step 3: Test Pendo Locally

1. Restart your development server (`npm start`)
2. Open your browser's developer console (F12)
3. Type `pendo` and press Enter - you should see the Pendo object
4. Navigate around your app - check Pendo's dashboard to see if events are being captured

---

## Part 3: Deploy to Free Hosting

Choose ONE of the following options:

---

### Option A: Deploy to Vercel (EASIEST - RECOMMENDED)

#### Why Vercel?
- Fastest deployment
- Automatic HTTPS
- Automatic deployments on git push
- Best for React apps

#### Steps:

1. **Create a Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket

2. **Push Your Code to Git** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Deploy via Vercel Website**
   - Click "Add New Project" in Vercel dashboard
   - Import your Git repository
   - Vercel will auto-detect it's a React app
   - Click "Deploy"
   - Wait 1-2 minutes
   - You'll get a URL like: `https://your-app.vercel.app`

4. **OR Deploy via Vercel CLI**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

---

### Option B: Deploy to Netlify

#### Why Netlify?
- Very easy drag-and-drop deployment
- Good for static sites
- Great free tier

#### Steps:

1. **Build Your App**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify Website** (Easiest)
   - Go to [netlify.com](https://www.netlify.com)
   - Sign up/login
   - Click "Add new site" → "Deploy manually"
   - Drag and drop your `build` folder
   - You'll get a URL like: `https://your-app.netlify.app`

3. **OR Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy
   # Follow prompts, then:
   netlify deploy --prod
   ```

4. **OR Connect to Git** (For Auto-Deployment)
   - Click "Add new site" → "Import existing project"
   - Connect to GitHub/GitLab
   - Select your repository
   - Build command: `npm run build`
   - Publish directory: `build`
   - Click "Deploy site"

---

### Option C: Deploy to GitHub Pages

#### Why GitHub Pages?
- Completely free
- Integrated with GitHub
- Good for simple projects

#### Steps:

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   Add these lines to your `package.json`:
   ```json
   "homepage": "https://YOUR-USERNAME.github.io/pendo-practice-app",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build",
     ...existing scripts...
   }
   ```

3. **Deploy**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   npm run deploy
   ```

4. **Enable GitHub Pages**
   - Go to your GitHub repository
   - Settings → Pages
   - Source: gh-pages branch
   - Your site will be at: `https://YOUR-USERNAME.github.io/pendo-practice-app`

---

## Part 4: Verify Pendo is Working

1. **Visit Your Deployed App**
   - Go to the URL provided by your hosting service
   
2. **Check Pendo Dashboard**
   - Log into [app.pendo.io](https://app.pendo.io)
   - Go to **Behavior** → **Pages**
   - You should see page views appearing
   
3. **Test Features**
   - Click around your app (buttons, tabs, forms)
   - Wait a few minutes
   - Check **Behavior** → **Features** in Pendo
   - You should see click events

4. **Create Your First Guide** (Optional)
   - Go to **Guides** in Pendo
   - Click "Create Guide"
   - Use the visual designer to create a walkthrough
   - Publish and test on your deployed app

---

## Part 5: Pendo Practice Activities

### Beginner Activities

1. **Track Page Views**
   - Navigate between pages
   - View in Pendo: Behavior → Pages

2. **Tag Features**
   - In Pendo, use visual designer to tag buttons
   - Tag: increment button, dashboard tabs, form submit

3. **Create User Segments**
   - Create segment: "Dashboard Users" (visited /dashboard)
   - Create segment: "Active Users" (>5 page views)

### Intermediate Activities

4. **Build a Guide**
   - Create a tooltip guide for the increment button
   - Create a multi-step walkthrough for the contact form

5. **Track Custom Events**
   - Add to your code:
   ```javascript
   // In App.js, add to button click:
   if (window.pendo) {
     window.pendo.track('IncrementClicked', {
       currentValue: count
     });
   }
   ```

6. **Analyze Funnels**
   - Create funnel: Home → Dashboard → Contact
   - See where users drop off

### Advanced Activities

7. **Resource Center**
   - Build a resource center with help articles
   - Test on your deployed app

8. **A/B Testing**
   - Create two versions of a guide
   - Split test them

9. **NPS Surveys**
   - Create an NPS poll
   - Target specific user segments

---

## Troubleshooting

### Pendo Not Loading
- Check browser console for errors
- Verify Pendo script is in `public/index.html`
- Make sure you're using the correct API key
- Check Pendo dashboard to ensure app is active

### Deployment Issues
- **Vercel**: Check build logs in dashboard
- **Netlify**: Check deploy logs, ensure build command is correct
- **GitHub Pages**: Ensure gh-pages branch exists

### Analytics Not Showing
- Wait 5-10 minutes for data to appear
- Ensure visitor ID is being set
- Check that you're viewing the correct app in Pendo
- Verify installation with: `pendo.getVisitorId()` in browser console

---

## Next Steps

1. Explore Pendo's documentation: [support.pendo.io](https://support.pendo.io)
2. Join Pendo community forums
3. Watch Pendo Academy tutorials
4. Experiment with advanced features like:
   - Track events
   - Metadata
   - Guide targeting rules
   - Integrations

---

## Cost Summary

✅ **Completely Free Setup:**
- React App: Free
- Pendo Trial: Free
- Vercel: Free tier
- Netlify: Free tier  
- GitHub Pages: Free

💰 **When You Might Pay:**
- Pendo: After trial ends (check pricing)
- Hosting: If you exceed free tier limits (unlikely for practice)

---

## Support Resources

- **This App**: Check README.md in the project
- **Pendo**: [support.pendo.io](https://support.pendo.io)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify**: [docs.netlify.com](https://docs.netlify.com)
- **React**: [react.dev](https://react.dev)

Good luck with your Pendo practice! 🚀
