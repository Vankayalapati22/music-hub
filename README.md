# 🎵 Music Hub - Ultimate Music Streaming Platform

A complete Next.js music streaming application with authentication, media browsing, playback, subscriptions, uploads, and admin moderation.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.2.0-764abc)

## ✨ Features

- 🔐 **Authentication** - Login/Register with validation
- 🎵 **Media Catalog** - Browse songs and videos with filters
- ▶️ **Media Player** - Full-featured audio/video playback
- 💎 **Subscriptions** - Free, Premium, and Family plans
- 📤 **Upload System** - Drag-and-drop media upload
- 👨‍💼 **Admin Dashboard** - Content moderation interface
- 🎨 **Modern UI** - Glassmorphism, gradients, and dark theme
- 📱 **Responsive** - Mobile-first design

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 🧪 Demo Credentials

### User Account
- **Email**: `user@example.com`
- **Password**: `password123`

### Admin Account
- **Email**: `admin@example.com`
- **Password**: `admin123`

## 📁 Project Structure

```
music-hub/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── login/             # Login page
│   ├── register/          # Registration
│   ├── browse/            # Media catalog
│   ├── subscriptions/     # Plans
│   ├── upload/            # Upload page
│   └── admin/dashboard/   # Admin panel
├── src/
│   ├── components/ui/     # UI components
│   ├── store/             # Redux store
│   ├── services/          # API services
│   ├── lib/               # Utilities & mock data
│   └── types/             # TypeScript types
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Forms**: React Hook Form + Yup
- **HTTP Client**: Axios

## 📖 Pages

### Public Pages
- **/** - Homepage with hero section
- **/login** - User authentication
- **/register** - Account creation
- **/browse** - Media catalog
- **/subscriptions** - Plan comparison

### Protected Pages
- **/upload** - Upload media (requires login)
- **/admin/dashboard** - Moderation (admin only)

## 🎨 Design Features

- **Glassmorphism** - Frosted glass UI elements
- **Gradient Text** - Eye-catching color gradients
- **Glow Effects** - Interactive hover states
- **Dark Theme** - Professional color scheme

## 🔧 Mock Data

The application uses mock data for development:

- **Users**: 3 test accounts
- **Media**: 8 songs/videos with metadata
- **Subscriptions**: 3 plans (Free, Premium, Family)
- **Mock API**: Axios interceptors simulate backend

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

## 🔄 Connecting to Real Backend

To connect to a real API:

1. Update `NEXT_PUBLIC_API_URL` in `.env.local`
2. Remove mock interceptors from `src/lib/axios.ts`
3. Implement real API endpoints

---

Built with ❤️ using Next.js and TypeScript
