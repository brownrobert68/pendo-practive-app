# Pendo Practice App - Deployment Guide

## Prerequisites
- Node.js installed (version 14 or higher)
- A Pendo account (free trial at pendo.io)
- A free hosting account (Vercel, Netlify, or GitHub)

---

## Part 1: Setting Up the Application Locally

### Understanding the App

This app now includes:
- **Authentication System** with login/logout
- **4 User Roles**: Admin, Manager, User, and Viewer
- **Role-Based Access Control**: Different features available to different roles
- **Protected Routes**: Some pages require specific roles
- **Automatic Pendo Integration**: User info sent to Pendo on login

### Demo Accounts

| Username | Password | Role | What They Can Do |
|----------|----------|------|------------------|
| admin | admin123 | Admin | Access everything including Admin Settings |
| manager | manager123 | Manager | Dashboard analytics and reports |
| user | user123 | User | Basic features and contact form |
| viewer | viewer123 | Viewer | Read-only, limited access |

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
4. The initial visitor ID will be 'anonymous', but when users log in, the app automatically calls:

```javascript
pendo.identify({
    visitor: {
        id: user.username,      // e.g., 'admin', 'manager'
        role: user.role,        // e.g., 'admin', 'manager', 'user', 'viewer'
        name: user.name         // e.g., 'Admin User'
    }
});
```

This means you can segment users by role in Pendo and create role-specific guides!

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

1. **Track Login Events**
   - Log in as different users
   - View in Pendo: Behavior → Events → Look for login activity

2. **Track Page Views by Role**
   - Navigate between pages as different roles
   - View in Pendo: Behavior → Pages
   - Notice how Admin sees Admin page, but others don't

3. **Tag Features**
   - In Pendo, use visual designer to tag buttons
   - Tag: login button, increment button, dashboard tabs

4. **Create Role-Based Segments**
   - Create segment: "Admin Users" (role = admin)
   - Create segment: "Managers" (role = manager)
   - Create segment: "Standard Users" (role = user or viewer)

### Intermediate Activities

5. **Build Role-Specific Guides**
   - Create a guide for Admin users showing the Admin Settings page
   - Create a guide for new Users showing basic features
   - Use role metadata to target: visitor.role == 'admin'

6. **Track Feature Access by Role**
   - Notice locked features (🔒) on Dashboard for User/Viewer roles
   - Track when users click disabled buttons
   - Create a report on feature access attempts

7. **Analyze User Flows by Role**
   - Compare navigation patterns of Admins vs Users
   - Create funnels: Login → Dashboard → Specific Actions
   - See where different roles drop off

8. **Track Custom Events**
   - The app already sends user info on login
   - Add custom tracking for role-specific actions
   - Example: Track when admins change settings

### Advanced Activities

9. **Resource Center with Role-Based Content**
   - Build a resource center with different content for each role
   - Admin section: How to manage users
   - Manager section: How to read analytics
   - User section: Basic features guide

10. **A/B Testing by Role**
    - Create two versions of a guide
    - Test them with different roles
    - Compare engagement rates

11. **Permission Analytics**
    - Track which features are most clicked when locked
    - Identify if users need more permissions
    - Create reports on "access denied" scenarios

12. **Segmented NPS Surveys**
    - Create different NPS surveys for each role
    - Ask role-specific questions
    - Compare satisfaction by user type

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
