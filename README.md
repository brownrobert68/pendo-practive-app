# Pendo Practice App

A simple React application designed to help you practice implementing and using Pendo analytics.

## Features

- **Multiple Pages**: Home, Dashboard, and Contact pages for tracking navigation
- **Interactive Elements**: Buttons, forms, tabs, and counters with unique IDs for easy Pendo tracking
- **Navigation**: React Router for page transitions
- **Responsive Design**: Works on desktop and mobile

## Quick Start

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deploying to Free Hosting

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts (first time will ask you to sign in)

**OR** use the Vercel website:
- Go to [vercel.com](https://vercel.com)
- Sign up/login with GitHub
- Click "Add New Project"
- Import your Git repository
- Click "Deploy"

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Build the app:
```bash
npm run build
```

3. Deploy:
```bash
netlify deploy
```

4. For production deployment:
```bash
netlify deploy --prod
```

**OR** use the Netlify website:
- Go to [netlify.com](https://www.netlify.com)
- Sign up/login
- Drag and drop the `build` folder
- Or connect your Git repository for automatic deployments

### Option 3: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/pendo-practice-app",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy:
```bash
npm run deploy
```

## Adding Pendo Analytics

### Step 1: Get Your Pendo Install Script

1. Log into your Pendo account at [app.pendo.io](https://app.pendo.io)
2. Go to Settings → Install Settings
3. Copy your Pendo install script

### Step 2: Add Pendo to Your App

Open `public/index.html` and replace the commented Pendo script section with your actual Pendo snippet. It should look something like this:

```html
<script>
  (function(apiKey){
    (function(p,e,n,d,o){var v,w,x,y,z;o=p[d]=p[d]||{};o._q=o._q||[];
    v=['initialize','identify','updateOptions','pageLoad','track'];for(w=0,x=v.length;w<x;++w)(function(m){
        o[m]=o[m]||function(){o._q[m===v[0]?'unshift':'push']([m].concat([].slice.call(arguments,0)));};})(v[w]);
        y=e.createElement(n);y.async=!0;y.src='https://cdn.pendo.io/agent/static/'+apiKey+'/pendo.js';
        z=e.getElementsByTagName(n)[0];z.parentNode.insertBefore(y,z);})(window,document,'script','pendo');
    
    pendo.initialize({
        visitor: {
            id: 'test-visitor-' + Date.now()
        },
        account: {
            id: 'test-account'
        }
    });
})('YOUR-API-KEY-HERE');
</script>
```

### Step 3: Practice Tracking Events

The app includes many elements with unique IDs that you can track in Pendo:

**Navigation:**
- `#nav-home`
- `#nav-dashboard`
- `#nav-contact`

**Home Page Buttons:**
- `#increment-btn`
- `#decrement-btn`
- `#reset-btn`
- `#action-1`, `#action-2`, `#action-3`

**Dashboard Tabs:**
- `#tab-overview`
- `#tab-analytics`
- `#tab-reports`
- `#export-data`
- `#generate-report`

**Contact Form:**
- `#name`, `#email`, `#message`
- `#submit-contact`

## What You Can Practice with Pendo

1. **Page Analytics**: Track visits to Home, Dashboard, and Contact pages
2. **Feature Usage**: See which buttons and features users click most
3. **User Flows**: Understand how users navigate through your app
4. **Form Analytics**: Track form completions on the Contact page
5. **Feature Adoption**: Monitor usage of different dashboard tabs
6. **Guides**: Create in-app guides to walk users through features
7. **Segmentation**: Create visitor segments based on behavior

## Project Structure

```
pendo-practice-app/
├── public/
│   └── index.html          # Add your Pendo script here
├── src/
│   ├── App.js              # Main application with routing
│   ├── App.css             # Styling
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json
└── README.md
```

## Tips for Pendo Practice

1. **Start Simple**: Begin by just tracking page views
2. **Add Feature Tagging**: Use Pendo's visual designer to tag features
3. **Create Segments**: Group visitors by behavior (e.g., "Dashboard users")
4. **Build Guides**: Create walkthroughs for new features
5. **Track Events**: Use `pendo.track()` to send custom events
6. **Analyze Funnels**: Track user progression through the contact form

## Need Help?

- [Pendo Documentation](https://support.pendo.io/)
- [React Documentation](https://react.dev/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

## License

This is a practice project - feel free to use and modify as needed!
