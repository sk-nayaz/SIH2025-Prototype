# 🏔️ Jharkhand Tourism — Smart Digital Platform

> **SIH 2025 Prototype** — An AI-powered smart tourism platform for Jharkhand, built to promote eco-tourism, tribal culture, and sustainable travel across the state.

🌐 **Live Demo:** [jharkhand-tourism-sih2025.vercel.app](https://jharkhand-tourism-sih2025.vercel.app/)

---

## 📌 Problem Statement

Jharkhand is rich in natural beauty, tribal heritage, and cultural diversity — yet it remains one of India's most underexplored states for tourism. Lack of digital infrastructure, poor discoverability of destinations, and absence of AI-driven travel planning tools leave tourists without proper guidance. This platform aims to bridge that gap using modern web technologies and artificial intelligence.

---

## ✨ Features

### 🏠 Landing Page
- Dynamic hero section with scroll-reveal animations
- Featured destinations (Betla National Park, Hundru Falls, Netarhat, etc.)
- Interactive navigation with smooth transitions and glassmorphism navbar
- Quick access to all platform modules
- User feedback & contact modal

### 🗺️ Interactive Maps (`/maps`)
- SVG-based interactive map of Jharkhand with destination markers
- Category-based filtering (Wildlife, Waterfalls, Heritage, Temples, Hill Stations)
- Detailed destination cards with ratings, travel time, entry fees, and facilities
- Geolocation support for user's current position
- Route/transport information (car, bus, train, flight)

### 📊 Analytics Dashboard (`/analytics`)
- Tourism statistics visualization with visitor trends & booking data
- Revenue tracking and growth rate metrics
- Destination popularity breakdown
- Time-range filtering (7d, 30d, 90d, 1y)
- Real-time status indicators for infrastructure (roads, weather, crowd levels)

### 🛍️ Cultural Marketplace (`/marketplace`)
- Tribal handicrafts, homestays, cultural events, and local cuisine listings
- Category-based browsing with search functionality
- Product cards with pricing, ratings, and artisan details
- Wishlist/favorites system
- Direct support for tribal artisans and local communities

### 🗓️ AI Trip Planner (`/planner`)
- AI-powered itinerary generation using **Groq (LLaMA 3.3 70B)**
- Customizable preferences: duration, interests, group size, accommodation, transport
- Multi-language support: English, Hindi, Bengali, and Santali (ᱥᱟᱱᱛᱟᱲᱤ)
- Day-by-day detailed itinerary with activities, costs, and locations
- Downloadable travel plans

### 🤖 AI Chatbot (Global)
- Floating AI assistant available on every page
- Powered by **Groq API** (LLaMA 3.3 70B Versatile)
- Expert knowledge on Jharkhand tourism — destinations, culture, food, transport
- Suggested quick-action questions
- Error handling with retry mechanism

### 🔐 Authentication System
- Sign up / Login modal with form validation
- Auth context provider for session management

### 📢 Real-Time Notifications
- Booking confirmations, weather alerts, promotions, and system notifications
- Priority-based notification system (low, medium, high)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) |
| **Language** | JavaScript (JSX) + TypeScript |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| **Charts** | [Recharts](https://recharts.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Font** | [Geist](https://vercel.com/font) (Sans & Mono) |
| **AI/LLM** | [Groq API](https://groq.com/) — LLaMA 3.3 70B |
| **AI SDK** | [Vercel AI SDK](https://sdk.vercel.ai/) |
| **Deployment** | [Vercel](https://vercel.com/) |
| **Analytics** | [Vercel Analytics](https://vercel.com/analytics) |

---

## 📁 Project Structure

```
SIH2025-Prototype/
├── app/
│   ├── layout.jsx              # Root layout with fonts, providers, chatbot
│   ├── page.jsx                # Home / Landing page
│   ├── globals.css             # Global styles & Tailwind config
│   ├── analytics/
│   │   └── page.jsx            # Tourism analytics dashboard
│   ├── maps/
│   │   ├── page.jsx            # Interactive map explorer
│   │   └── loading.jsx         # Loading skeleton
│   ├── marketplace/
│   │   ├── page.jsx            # Cultural marketplace
│   │   └── loading.jsx         # Loading skeleton
│   ├── planner/
│   │   └── page.jsx            # AI trip planner
│   └── api/
│       ├── chat/
│       │   └── route.js        # AI chatbot API (Groq)
│       └── generate-itinerary/
│           └── route.js        # Itinerary generation API (Groq)
├── components/
│   ├── ai-chatbot.jsx          # Global floating AI chatbot
│   ├── interactive-map.jsx     # SVG map component
│   ├── auth-modal.jsx          # Login/Signup modal
│   ├── auth-provider.jsx       # Authentication context
│   ├── feedback-modal.jsx      # User feedback & contact form
│   ├── real-time-notifications.jsx  # Notification system
│   ├── real-time-status.jsx    # Infrastructure status widget
│   ├── theme-provider.jsx      # Dark/Light theme provider
│   └── ui/                     # 55+ shadcn/ui components
├── lib/
│   └── utils.js                # Utility functions (cn, etc.)
├── styles/
│   └── globals.css             # Additional global styles
├── public/                     # Static assets & images
├── next.config.mjs             # Next.js configuration
├── postcss.config.mjs          # PostCSS + Tailwind setup
├── tsconfig.json               # TypeScript configuration
├── jsconfig.json               # JS path aliases (@/*)
└── package.json                # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Yarn** (recommended) or npm
- **Groq API Key** — [Get one here](https://console.groq.com/)

### Installation

```bash
# Clone the repository
git clone https://github.com/sk-nayaz/SIH2025-Prototype.git
cd SIH2025-Prototype

# Install dependencies
yarn install

# Create environment file
echo "GROQ_API_KEY=your_groq_api_key_here" > .env.local

# Start development server
yarn dev
```

The app will be running at **[http://localhost:3000](http://localhost:3000)**

### Build for Production

```bash
yarn build
yarn start
```

---

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `GROQ_API_KEY` | API key for Groq LLM (powers AI chatbot & trip planner) | Yes |

---

## 📸 Pages Overview

| Page | Route | Description |
|---|---|---|
| Home | `/` | Landing page with hero, destinations, and navigation |
| Maps | `/maps` | Interactive map with destination explorer |
| Analytics | `/analytics` | Tourism data dashboard with charts |
| Marketplace | `/marketplace` | Tribal handicrafts, homestays, and cultural events |
| Planner | `/planner` | AI-powered trip itinerary generator |

---

## 🏗️ SIH 2025 Context

This project was built as a prototype for **Smart India Hackathon (SIH) 2025**, addressing the challenge of digitizing and promoting tourism in Jharkhand through:

- **AI-driven personalization** — Smart itinerary planning with LLM
- **Cultural preservation** — Highlighting tribal art, festivals, and heritage
- **Eco-tourism promotion** — Sustainable travel recommendations
- **Multi-language accessibility** — English, Hindi, Bengali, and Santali support
- **Data-driven insights** — Analytics dashboard for tourism authorities

---

## 👥 Team

**Repository:** [github.com/sk-nayaz/SIH2025-Prototype](https://github.com/sk-nayaz/SIH2025-Prototype)

---

## 📄 License

This project is built for educational and hackathon purposes under SIH 2025.

---

<p align="center">
  Made with ❤️ for Jharkhand Tourism
</p>
