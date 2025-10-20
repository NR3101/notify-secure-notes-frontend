# 🔐 Secure Notes - Modern UI/UX Revamp

A complete UI/UX redesign of the Secure Notes application using modern web technologies while maintaining 100% backend compatibility.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit **http://localhost:3000**

## 📚 Documentation

- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Current progress & remaining tasks
- **[SETUP.md](./SETUP.md)** - Installation & configuration guide
- **[TEMPLATES.md](./TEMPLATES.md)** - Component templates for development

## ✨ Features

- ✅ Modern UI with shadcn/ui components
- ✅ Zustand state management
- ✅ Tailwind CSS styling
- ✅ Framer Motion animations
- ✅ JWT & OAuth2 authentication
- ✅ Two-Factor Authentication (2FA)
- ✅ Protected routes
- ✅ Role-based access control

## 🛠️ Tech Stack

- **Vite** - Lightning-fast build tool
- **React 18** - UI framework
- **Zustand** - State management
- **shadcn/ui** - Component library
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations
- **React Router v6** - Routing
- **Axios** - HTTP client
- **React Hook Form** - Form handling

## 📁 Project Structure

```
secure-notes-vite/
├── src/
│   ├── components/
│   │   ├── auth/        # Authentication pages ✅
│   │   ├── common/      # Reusable components ✅
│   │   ├── ui/          # shadcn/ui components ✅
│   │   ├── notes/       # Notes pages ⏳
│   │   ├── admin/       # Admin panel ⏳
│   │   ├── layout/      # Layout components ⏳
│   │   └── pages/       # Static pages ⏳
│   ├── store/           # Zustand stores ✅
│   ├── services/        # API services ✅
│   ├── utils/           # Utility functions ✅
│   └── lib/             # Helper libraries ✅
```

## 🎯 Current Progress

**Completed (50%)**:

- ✅ Project setup & configuration
- ✅ Authentication pages (Login, Signup, etc.)
- ✅ Zustand state management
- ✅ API service with interceptors
- ✅ shadcn/ui components
- ✅ Common utilities

**Remaining (50%)**:

- ⏳ Notes pages
- ⏳ Admin panel
- ⏳ Landing page
- ⏳ Navbar & Footer
- ⏳ User profile
- ⏳ Animations

See [PROJECT_STATUS.md](./PROJECT_STATUS.md) for detailed breakdown.

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🌐 Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8080
```

## 📖 API Integration

All API calls preserve the original backend integration logic:

- JWT token authentication
- CSRF protection
- Cookie handling
- OAuth2 flow

## 🎨 Design System

- **Primary**: Blue-Purple gradient
- **Font**: Montserrat
- **Radius**: 0.5rem
- **Animations**: 300ms transitions

## 🤝 Contributing

1. Read [PROJECT_STATUS.md](./PROJECT_STATUS.md) to see what needs to be done
2. Use [TEMPLATES.md](./TEMPLATES.md) for component structure
3. Add Hinglish comments for business logic
4. Maintain backend compatibility

## 📝 License

Same as the original Secure Notes project.

---

**Built with ❤️ using Vite, React, and shadcn/ui**

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
