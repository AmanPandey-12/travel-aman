# 🌍 TravelAman - Explore India's Wonders

Your comprehensive platform for discovering and booking travel experiences across India.

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Version-2.0-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Made%20With-Next.js-black?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Backend-API%20Routes-green?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Theme-Indian%20Culture-FF9933?style=for-the-badge"/>
</p>---

## 🇮🇳 About TravelAman

TravelAman is a modern, full-stack travel platform designed to showcase and promote travel across India. Experience the magic of Indian culture, heritage, temples, beaches, mountains, and vibrant cities - all in one comprehensive platform.

## ✨ Key Features

🏛️ **1000+ Indian Destinations** - Temples, beaches, mountains, heritage sites
🗺️ **Offline Maps** - Navigate without internet connection  
📦 **Travel Packages** - Curated journeys covering all of India
🎫 **Easy Booking** - Simple, secure booking system
🏙️ **City Guides** - Info on 10+ major Indian cities
🎨 **Indian Theme** - UI with national colors (Saffron, White, Green)
📱 **Mobile Friendly** - Fully responsive design
⚡ **Fast Performance** - Built with Next.js
🔍 **Advanced Filters** - Search by category, state, price

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Clone repository
git clone <repo-url>
cd travel-aman

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Start development server
npm run dev
```

Open http://localhost:3000

## 🔌 Backend API

Full REST API for managing destinations, cities, packages, and bookings.

### Endpoints

- `GET /api/destinations` - Get all destinations
- `GET /api/cities` - Get all Indian cities  
- `GET /api/packages` - Get travel packages
- `GET/POST/PUT/DELETE /api/bookings` - Booking management
- `GET /api/health` - Health check

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete details.

## 📁 Project Structure

```
├── app/
│   ├── api/              # Backend API routes
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # React components
├── lib/                  # Utilities & hooks
├── constants/            # App data
├── public/               # Static assets
└── README.md
```

## 🎨 Tech Stack

**Frontend:** React 18, Next.js 13.5, TypeScript, Tailwind CSS
**Backend:** Next.js API Routes
**Styling:** Tailwind CSS with custom Indian colors

## 📦 Scripts

```bash
npm run dev      # Development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🌟 Included Data

- 10 Major Indian Cities
- 8+ Featured Destinations  
- 5 Travel Packages
- 14+ Attractions per city
- Complete city descriptions

## 🚀 Deployment

Deploy to Vercel, Netlify, or any Node.js hosting:

```bash
npm run build
npm start
```

## 🔐 Production Ready

To deploy to production:

- [ ] Add database (MongoDB, PostgreSQL)
- [ ] Implement authentication
- [ ] Add payment gateway
- [ ] Setup error logging
- [ ] Enable CORS
- [ ] Configure SSL/TLS

## 📝 License

MIT License - feel free to use this project!

## 📞 Support

- Email: support@travelaman.com
- GitHub: [Repository Link]

---

<p align="center">
  Made with ❤️ for India's Travelers
</p>
├── styles/
└── README.md

---

⚙️ Setup Guide

🔽 Clone Repository

git clone https://github.com/AmanPandey-12/travel-aman.git
cd travel-aman

▶️ Run Frontend

npm install
npm run dev

▶️ Run Backend

cd backend
npm install
npm start

---

🔑 Environment Variables

# Firebase
FIREBASE_API_KEY=

# Google Auth
GOOGLE_CLIENT_ID=

# Razorpay
RAZORPAY_KEY_ID=

# JWT
JWT_SECRET=

---

🌟 Project Highlights

🏛️ Bhopal Heritage

- Van Vihar National Park
- Bhimbetka Rock Shelters
- Upper Lake & Lower Lake
- Taj-ul-Masjid

🍛 Indian Culture

- Street Food
- Regional Cuisine
- Cultural Traditions

🎉 Festivals

- Diwali
- Holi
- Regional Celebrations

---

🔐 Security Features

- Encrypted Passwords
- JWT Authentication
- Secure API Calls
- Protected Routes

---

📡 API Overview

POST /api/auth/login
POST /api/payments/create-order
GET  /api/cultural/destinations

---

🚀 Future Scope

- Mobile App
- AI Travel Planner
- Multi-language Support
- Reviews & Ratings
- Live Chat

---

📞 Contact

📧 aman@travelman.com
🔗 https://github.com/AmanPandey-12

---

⭐ Support This Project

If you like this project:

🌟 Star the repo
🍴 Fork it
🚀 Share it

---

💡 Developer

Aman Pandey
Full Stack Developer 🚀

---

<p align="center">
  ❤️ Made with passion for Indian Culture 🇮🇳
</p>