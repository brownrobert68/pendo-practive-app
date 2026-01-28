# Authentication Features Overview

## What's New

Your Pendo Practice App now includes a complete authentication system with role-based access control!

## User Roles & Permissions

### 🔴 Admin (admin / admin123)
**Full Access** - Can do everything
- ✅ Home page
- ✅ Dashboard (all tabs including Analytics & Reports)
- ✅ **Admin Settings page** (exclusive)
- ✅ Export data feature
- ✅ Contact form
- ✅ User management table

### 🟠 Manager (manager / manager123)
**Management Access** - Can manage and analyze
- ✅ Home page
- ✅ Dashboard (Analytics & Reports tabs unlocked)
- ❌ Admin Settings (blocked)
- ❌ Export data (disabled)
- ✅ Contact form

### 🟢 User (user / user123)
**Standard Access** - Basic features
- ✅ Home page
- ✅ Dashboard (Overview only - Analytics & Reports locked 🔒)
- ❌ Admin Settings (blocked)
- ❌ Export data (disabled)
- ✅ Contact form

### ⚫ Viewer (viewer / viewer123)
**Read-Only Access** - Most limited
- ✅ Home page (read-only features)
- ✅ Dashboard (Overview only - other tabs locked 🔒)
- ❌ Admin Settings (blocked)
- ❌ Export data (disabled)
- ✅ Contact form (read-only)

## How It Works

### Login Flow
1. User lands on `/login` page
2. Enters credentials (see demo accounts above)
3. App validates credentials
4. On success:
   - User is logged in
   - JWT/session would be created (mocked in this demo)
   - **Pendo is automatically notified** with user info
   - Redirected to Home page

### Pendo Integration

When a user logs in, the app automatically calls:

```javascript
pendo.identify({
    visitor: {
        id: user.username,      // 'admin', 'manager', 'user', or 'viewer'
        role: user.role,        // Role metadata for segmentation
        name: user.name         // Display name
    }
});
```

This means you can:
- Segment users by role in Pendo
- Create role-specific guides
- Track feature adoption by role
- See which roles engage most with specific features

### Protected Routes

The app uses `<ProtectedRoute>` component to:
- Require login for all pages (except /login)
- Restrict certain pages to specific roles
- Show "Access Denied" page if user tries to access unauthorized page

Example:
```javascript
// Admin Settings requires 'admin' role
<Route path="/admin" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <AdminSettings />
  </ProtectedRoute>
} />
```

### Role-Based Feature Visibility

Features are hidden/disabled based on role:

**Dashboard Tabs:**
- Overview: All roles ✅
- Analytics: Admin, Manager only 🔒
- Reports: Admin, Manager only 🔒

**Dashboard Features:**
- Export Data button: Admin only 🔒

**Navigation:**
- Admin link: Only visible to Admins

## Testing Different Roles

1. **Login as Admin** (admin/admin123)
   - Notice "Admin" link in navigation
   - Visit `/admin` to see Admin Settings
   - All Dashboard tabs are unlocked
   - Export Data button is enabled

2. **Logout and Login as User** (user/user123)
   - No "Admin" link in navigation
   - Try visiting `/admin` directly - you'll see "Access Denied"
   - Dashboard Analytics/Reports tabs show 🔒
   - Clicking locked tabs does nothing

3. **Compare in Pendo**
   - Check Pendo dashboard after logging in as different roles
   - Create segments by role
   - See how feature usage differs

## Pendo Practice Opportunities

### 1. Role-Based Segmentation
Create segments for each role:
- "Admin Users" where `visitor.role == 'admin'`
- "Managers" where `visitor.role == 'manager'`
- "Standard Users" where `visitor.role == 'user'`
- "Viewers" where `visitor.role == 'viewer'`

### 2. Role-Specific Guides
- **Admin Onboarding**: Guide showing Admin Settings features
- **Manager Training**: Guide focused on Analytics & Reports
- **User Welcome**: Basic features walkthrough
- **Viewer Orientation**: Read-only capabilities explanation

Target guides using: `visitor.role` metadata

### 3. Feature Adoption by Role
Track and compare:
- Which roles use Dashboard most?
- Do Users try to click locked features?
- How often do Managers export data?
- What's the Admin engagement rate?

### 4. Access Denied Tracking
- Monitor when users hit "Access Denied" pages
- Track clicks on disabled/locked features
- Identify if users need role upgrades
- Create alerts for suspicious access attempts

### 5. Login/Logout Events
- Track login success/failure rates
- Monitor session durations by role
- Track which roles logout most frequently
- Identify authentication issues

### 6. Role-Based Funnels
Create funnels like:
- Login → Home → Dashboard → Analytics (Manager vs User comparison)
- Login → Admin Settings → Save Settings (Admin only)
- Login → Contact Form → Submit (all roles)

### 7. Permission Analysis
- Which locked features get clicked most?
- Do Users repeatedly try to access Analytics?
- Should some Users be upgraded to Manager?

## File Changes

### New Components Added:
- `Login` component - Login form with demo accounts
- `ProtectedRoute` component - Route protection wrapper
- `AuthContext` - React context for auth state
- `AdminSettings` component - Admin-only settings page

### Modified Components:
- `App` - Now includes auth provider and routing logic
- `Home` - Shows user name and role badge
- `Dashboard` - Role-based tab restrictions
- `Contact` - User info integration

### New CSS:
- `.login-container`, `.login-box` - Login page styling
- `.role-badge` - Colored role indicators
- `.access-denied` - Blocked page styling
- `.settings-panel`, `.user-management` - Admin page styling

## Security Note

⚠️ **Important**: This is a PRACTICE app with mock authentication. In a real application:
- Never store passwords in frontend code
- Use proper backend authentication (JWT, OAuth, etc.)
- Implement HTTPS
- Add CSRF protection
- Hash passwords server-side
- Use secure session management

This app is purely for Pendo practice and should never be used for real authentication!

## Next Steps

1. ✅ Download the updated app
2. ✅ Run `npm install` and `npm start`
3. ✅ Test logging in as different roles
4. ✅ Deploy to Vercel/Netlify
5. ✅ Add your Pendo script
6. ✅ Start practicing role-based analytics!

Enjoy exploring the new authentication features! 🎉
