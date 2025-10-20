# 🌳 COMPONENT TREE - Complete Structure

## Visual Component Hierarchy

```
secure-notes-vite/
│
├── 📄 App.jsx (Main Router)
│   │
│   ├── 🧭 Navbar (Layout)
│   │   ├── Logo & Brand
│   │   ├── Navigation Links (Home, About, Contact, Notes)
│   │   ├── User Dropdown Menu
│   │   │   ├── Profile Link
│   │   │   ├── Admin Panel Link (if admin)
│   │   │   └── Logout Button
│   │   └── Mobile Hamburger Menu
│   │
│   ├── 📋 Routes
│   │   │
│   │   ├── 🏠 PUBLIC ROUTES
│   │   │   ├── / → LandingPage
│   │   │   │   ├── Hero Section (gradient text, CTAs)
│   │   │   │   ├── Brands (6 feature cards)
│   │   │   │   ├── Stats (3 animated counters)
│   │   │   │   ├── CardSlider (auto-sliding)
│   │   │   │   └── Testimonials (3 cards)
│   │   │   │
│   │   │   ├── /about → AboutPage
│   │   │   │   ├── Hero Section
│   │   │   │   ├── Mission Statement
│   │   │   │   ├── Features Grid (4 cards)
│   │   │   │   └── Social Links
│   │   │   │
│   │   │   ├── /contact → ContactPage
│   │   │   │   └── Contact Form (name, email, message)
│   │   │   │
│   │   │   ├── /login → Login
│   │   │   │   ├── Email/Password Form
│   │   │   │   ├── 2FA Code Input (if enabled)
│   │   │   │   └── OAuth2 Buttons (Google, GitHub)
│   │   │   │
│   │   │   ├── /signup → Signup
│   │   │   │   └── Registration Form
│   │   │   │
│   │   │   ├── /forgot-password → ForgotPassword
│   │   │   │   └── Email Input Form
│   │   │   │
│   │   │   ├── /reset-password → ResetPassword
│   │   │   │   └── New Password Form
│   │   │   │
│   │   │   ├── /oauth2/redirect → OAuth2RedirectHandler
│   │   │   │   └── Token Processing
│   │   │   │
│   │   │   └── /access-denied → AccessDenied
│   │   │       └── 403 Error Display
│   │   │
│   │   ├── 🔒 PROTECTED ROUTES (Require Auth)
│   │   │   │
│   │   │   ├── /notes → AllNotes
│   │   │   │   ├── Search Bar
│   │   │   │   ├── Filter Options
│   │   │   │   ├── Notes Grid
│   │   │   │   │   └── NoteCard (title, preview, date)
│   │   │   │   ├── Empty State
│   │   │   │   └── Loading Spinner
│   │   │   │
│   │   │   ├── /notes/:id → NoteDetails
│   │   │   │   ├── View Mode
│   │   │   │   │   ├── Title Display
│   │   │   │   │   ├── Content Display (HTML)
│   │   │   │   │   ├── Metadata (date, author)
│   │   │   │   │   └── Action Buttons (Edit, Delete)
│   │   │   │   │
│   │   │   │   ├── Edit Mode
│   │   │   │   │   ├── Title Input
│   │   │   │   │   ├── ReactQuill Editor
│   │   │   │   │   └── Save/Cancel Buttons
│   │   │   │   │
│   │   │   │   └── DeleteNoteModal
│   │   │   │       ├── Confirmation Message
│   │   │   │       └── Delete/Cancel Buttons
│   │   │   │
│   │   │   ├── /create-note → CreateNote
│   │   │   │   ├── Title Input
│   │   │   │   ├── ReactQuill Editor
│   │   │   │   │   └── Toolbar (headers, bold, italic, lists, etc.)
│   │   │   │   └── Create Button
│   │   │   │
│   │   │   └── /profile → UserProfile
│   │   │       ├── Left Card (User Info)
│   │   │       │   ├── Avatar
│   │   │       │   ├── Username & Role
│   │   │       │   ├── Update Credentials Accordion
│   │   │       │   │   └── Username, Email, Password Form
│   │   │       │   ├── Account Settings Accordion
│   │   │       │   │   ├── Account Expired Toggle
│   │   │       │   │   ├── Account Locked Toggle
│   │   │       │   │   ├── Account Enabled Toggle
│   │   │       │   │   ├── Credentials Expiry Info
│   │   │       │   │   └── Credentials Expired Toggle
│   │   │       │   └── Last Login Session Info
│   │   │       │
│   │   │       └── Right Card (2FA Settings)
│   │   │           ├── 2FA Status Badge
│   │   │           ├── Enable/Disable Button
│   │   │           └── QR Code Setup (if enabling)
│   │   │               ├── QR Code Image
│   │   │               ├── Code Input
│   │   │               └── Verify Button
│   │   │
│   │   └── 👑 ADMIN ROUTES (Require Admin Role)
│   │       │
│   │       └── /admin/* → Admin
│   │           ├── AdminSidebar (collapsible)
│   │           │   ├── All Users Link
│   │           │   └── Audit Logs Link
│   │           │
│   │           └── Content Area
│   │               │
│   │               ├── /admin/users → UserList
│   │               │   └── Users Table
│   │               │       ├── Username Column
│   │               │       ├── Email Column
│   │               │       ├── Created Date Column
│   │               │       ├── Status Column (Active/Inactive)
│   │               │       └── Action Column (View Button)
│   │               │
│   │               ├── /admin/users/:userId → UserDetails
│   │               │   ├── Profile Info Card
│   │               │   │   ├── Username (readonly)
│   │               │   │   ├── Email (readonly)
│   │               │   │   └── Password (editable)
│   │               │   │
│   │               │   └── Admin Actions Card
│   │               │       ├── Role Dropdown & Update
│   │               │       └── Account Settings Checkboxes
│   │               │           ├── Lock Account
│   │               │           ├── Account Expired
│   │               │           ├── Account Enabled
│   │               │           └── Credentials Expired
│   │               │
│   │               ├── /admin/audit-logs → AdminAuditLogs
│   │               │   └── Audit Logs Table
│   │               │       ├── Action Column (CREATE/UPDATE/DELETE)
│   │               │       ├── Username Column
│   │               │       ├── Timestamp Column
│   │               │       ├── Note ID Column
│   │               │       ├── Note Content Preview
│   │               │       └── Action Column (View Button)
│   │               │
│   │               └── /admin/audit-logs/:noteId → AuditLogsDetails
│   │                   └── Note Audit History Table
│   │                       ├── Action Column
│   │                       ├── Username Column
│   │                       ├── Timestamp Column
│   │                       └── Full Note Content
│   │
│   └── 🦶 Footer (Layout)
│       ├── Brand Section (logo, description, social links)
│       ├── Quick Links (About, Contact, Notes)
│       ├── Resources (Privacy, Terms, FAQ, Support)
│       └── Copyright
│
├── 🎨 UI COMPONENTS (shadcn/ui)
│   ├── Button (variants: default, destructive, outline, ghost)
│   ├── Input (text, email, password, etc.)
│   ├── Label (form labels)
│   ├── Card (Card, CardHeader, CardTitle, CardDescription, CardContent)
│   ├── Dialog (Dialog, DialogTrigger, DialogContent, etc.)
│   ├── DropdownMenu (Menu, Trigger, Content, Item, Separator)
│   ├── Separator (divider line)
│   ├── Avatar (Avatar, AvatarImage, AvatarFallback)
│   ├── Accordion (Accordion, AccordionItem, AccordionTrigger, AccordionContent)
│   └── Switch (toggle switch)
│
├── 🔧 COMMON COMPONENTS
│   ├── InputField (reusable form input with label & error)
│   ├── ProtectedRoute (auth & admin route guard)
│   ├── LoadingSpinner (loading state)
│   ├── ErrorMessage (error display)
│   └── NotFound (404 page)
│
├── 🗂️ SERVICES
│   ├── api.js (Axios instance with interceptors)
│   │   ├── Request Interceptor (JWT token, CSRF token)
│   │   └── Response Interceptor (error handling)
│   │
│   └── authStore.js (Zustand state management)
│       ├── State: token, currentUser, isAdmin
│       ├── Actions: setToken, setCurrentUser, setIsAdmin
│       ├── Functions: fetchUser, logout
│       └── Persistence: localStorage sync
│
└── 🛠️ UTILITIES
    ├── utils.js (cn function for className merging)
    └── truncateText.js (text truncation helper)
```

---

## 📊 Component Statistics

### By Category

- **Authentication:** 6 components
- **Notes:** 4 components
- **Admin:** 6 components
- **Landing:** 5 components
- **Layout:** 2 components
- **Pages:** 3 components
- **Common:** 5 components
- **UI (shadcn/ui):** 10 components

### Total: 41 Core Components + 10 UI Components = **51 Components**

---

## 🎨 Design Patterns Used

### Layout Patterns

- **Card Layout:** Used throughout for content sections
- **Grid Layout:** Notes list, feature cards, testimonials
- **Sidebar Layout:** Admin panel
- **Modal/Dialog:** Delete confirmations, 2FA setup

### State Management Patterns

- **Global State:** Zustand for auth (token, user, admin)
- **Local State:** Component-specific (forms, toggles)
- **Form State:** React Hook Form for validation
- **Loading State:** Boolean flags for async operations

### Navigation Patterns

- **Nested Routes:** Admin panel (/admin/\*)
- **Protected Routes:** HOC wrapper for auth
- **Dynamic Routes:** Note details (/notes/:id)
- **Redirects:** After login, after create

---

## 🔄 Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
API Call (via api.js)
    ↓
Backend Processing
    ↓
Response
    ↓
State Update (Zustand or Local)
    ↓
UI Re-render
    ↓
User Feedback (Toast or UI Change)
```

---

## 🎯 Key Features by Component

### LandingPage

- Hero section with gradient text
- Feature showcase
- Statistics display
- Testimonials
- Call-to-action buttons

### Login

- Email/password authentication
- 2FA code verification
- OAuth2 buttons
- Remember me
- Forgot password link

### AllNotes

- Grid layout display
- Note previews
- Date formatting
- Empty state
- Create note CTA

### NoteDetails

- View/Edit mode toggle
- Rich text display
- Edit with ReactQuill
- Delete confirmation
- Auto-save

### UserProfile

- Credentials update
- Password change
- 2FA setup/disable
- Account settings
- Last login info

### Admin Panel

- User management
- Role assignment
- Account control
- Audit logs
- Activity tracking

---

This component tree shows the complete structure and hierarchy of your application! 🌳✨
