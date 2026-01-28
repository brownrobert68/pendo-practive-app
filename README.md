# Pendo Practice App

A simple React application designed to help you practice implementing and using Pendo analytics.

## Features

- **Authentication System**: Login with role-based access control
- **Multiple User Roles**: Admin, Manager, User, and Viewer with different permissions
- **Multiple Pages**: Home, Dashboard, Admin Settings, and Contact pages
- **Interactive Elements**: Buttons, forms, tabs, and counters with unique IDs for easy Pendo tracking
- **Protected Routes**: Role-based page access
- **Navigation**: React Router for page transitions
- **Responsive Design**: Works on desktop and mobile

## Demo Accounts

The app includes 4 pre-configured user accounts with different roles:

| Username | Password | Role | Access Level |
|----------|----------|------|--------------|
| admin | admin123 | Admin | Full access to all features including Admin Settings |
| manager | manager123 | Manager | Access to Dashboard analytics and reports |
| user | user123 | User | Standard access to basic features |
| viewer | viewer123 | Viewer | Read-only access, limited features |

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
            id: 'anonymous'
        },
        account: {
            id: 'practice-account'
        }
    });
})('YOUR-API-KEY-HERE');
</script>
```

**Note:** The app automatically updates Pendo with user information when someone logs in. The `login` function in App.js calls `pendo.identify()` with the user's role and name, allowing you to segment users by role in Pendo.

### Step 3: Practice Tracking Events

The app includes many elements with unique IDs that you can track in Pendo:

**Login:**
- `#username`, `#password`
- `#login-btn`
- `#logout-btn`

**Navigation:**
- `#nav-home`
- `#nav-dashboard`
- `#nav-admin` (Admin only)
- `#nav-contact`

**Home Page Buttons:**
- `#increment-btn`
- `#decrement-btn`
- `#reset-btn`
- `#action-1`, `#action-2`, `#action-3`

**Dashboard Tabs:**
- `#tab-overview`
- `#tab-analytics` (Manager/Admin only)
- `#tab-reports` (Manager/Admin only)
- `#export-data` (Admin only)
- `#generate-report`

**Admin Settings (Admin only):**
- `#site-name`
- `#maintenance-mode`
- `#allow-registration`
- `#max-users`
- `#save-settings`
- `#edit-{username}`, `#delete-{username}` buttons

**Contact Form:**
- `#name`, `#email`, `#message`
- `#submit-contact`

## What You Can Practice with Pendo

1. **User Authentication Tracking**: Track login events and user sessions
2. **Role-Based Analytics**: Segment users by role (Admin, Manager, User, Viewer)
3. **Page Analytics**: Track visits to different pages based on user permissions
4. **Feature Usage**: See which buttons and features different roles use most
5. **User Flows**: Understand how different user types navigate through your app
6. **Form Analytics**: Track form completions on the Contact page
7. **Feature Adoption**: Monitor usage of dashboard tabs by role
8. **Access Denied Tracking**: Track when users try to access restricted features
9. **Guides**: Create role-specific in-app guides
10. **Segmentation**: Create visitor segments based on role and behavior
11. **Permission-Based Features**: Track usage of role-restricted features
12. **Admin Activity**: Monitor admin-specific actions and settings changes

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

1. **Start Simple**: Begin by tracking login events and page views
2. **Add Feature Tagging**: Use Pendo's visual designer to tag features
3. **Create Role-Based Segments**: Group visitors by role (Admin, Manager, User, Viewer)
4. **Build Role-Specific Guides**: Create different walkthroughs for different roles
5. **Track Events**: Use `pendo.track()` to send custom events
6. **Analyze Role-Based Funnels**: Track user progression by role
7. **Monitor Feature Access**: See which users attempt to access restricted features
8. **Test Permission Flows**: Log in as different roles to see how guides appear differently

### Practice Scenarios

**Scenario 1: Role-Based Feature Adoption**
- Log in as different roles
- Notice which features are available/restricted
- Create segments in Pendo for each role
- Compare feature usage across roles

**Scenario 2: Onboarding Guides**
- Create a guide for new "User" role members
- Create an advanced guide for "Admin" users
- Use role metadata to target guides appropriately

**Scenario 3: Access Monitoring**
- Try to access Admin page as a "User"
- Track "Access Denied" events in Pendo
- Create alerts for repeated access attempts

## Need Help?

- [Pendo Documentation](https://support.pendo.io/)
- [React Documentation](https://react.dev/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

## License

This is a practice project - feel free to use and modify as needed!
