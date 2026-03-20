# 🌍 TravelAman - Explore India's Wonders

Discover and book amazing travel experiences across India with TravelAman - your complete travel companion for exploring the rich culture, heritage, and natural beauty of India.

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Version-2.0-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Made%20With-Next.js-black?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Theme-Indian%20Culture-FF9933?style=for-the-badge"/>
</p>

## 🇮🇳 Overview

TravelAman is a modern, comprehensive travel platform designed specifically for exploring India. It combines a beautiful user interface with powerful backend APIs to provide a seamless travel booking experience.

## ✨ Key Features

- 🏛️ **1000+ Indian Destinations** - From temples to beaches, mountains to cities
- 🗺️ **Offline Maps** - Navigate anywhere without internet
- 📦 **Curated Travel Packages** - Pre-planned journeys covering heritage, adventure, and spiritual sites
- 🎫 **Easy Booking System** - Simple, secure booking with confirmation tracking
- 🏙️ **City Guides** - Comprehensive information on 10+ major Indian cities
- 🎨 **Indian Theme** - UI designed with Indian national colors (Saffron, White, Green)
- 📱 **Mobile Friendly** - Fully responsive design for all devices
- ⚡ **Fast & Lightweight** - Built with Next.js for optimal performance
- 🔍 **Advanced Filtering** - Filter by category, state, price, and more
- 🌟 **High Ratings** - 4000+ 5-star user reviews

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16.x or higher
- **npm** or **yarn** package manager
- Modern web browser

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/travel-aman.git
cd travel-aman
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open in browser**
Navigate to `http://localhost:3000`

## 📁 Project Structure

```
travel-aman/
├── app/
│   ├── api/                          # Backend API Routes
│   │   ├── destinations/route.ts    # Destinations CRUD
│   │   ├── cities/route.ts          # Cities endpoints
│   │   ├── packages/route.ts        # Travel packages
│   │   ├── bookings/route.ts        # Booking management
│   │   └── health/route.ts          # Health check
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page
│   └── globals.css                   # Global styles
├── components/
│   ├── Navbar.tsx                    # Navigation with TravelAman branding
│   ├── Hero.tsx                      # Hero section - "Explore India's Wonders"
│   ├── Camp.tsx                      # Featured destinations
│   ├── Features.tsx                  # "Why Choose TravelAman?"
│   ├── Guide.tsx                     # Travel guide section
│   ├── GetApp.tsx                    # Download app CTA
│   ├── Footer.tsx                    # Footer with Indian theme
│   └── Button.tsx                    # Reusable button component
├── lib/
│   ├── api.ts                        # API client utilities
│   ├── hooks/
│   │   └── useFetch.ts              # Custom React hook for data fetching
│   └── utils.ts                      # Helper functions
├── constants/
│   └── index.ts                      # App constants, Indian cities & content
├── public/                           # Static assets
├── styles/                           # Additional styles
├── tailwind.config.ts               # Tailwind CSS with Indian colors
├── tsconfig.json                     # TypeScript config
├── API_DOCUMENTATION.md              # Complete API reference
├── .env.example                      # Environment template
└── package.json                      # Dependencies & scripts
```

## 🎨 Design & Branding

### Indian National Colors
```css
Saffron: #FF9933    /* Primary accent */
Green:   #138808    /* Secondary accent */
White:   #FFFFFF    /* Background */
```

### Updated UI Elements
- Logo: Compass emoji (🧭) with "TravelAman" text
- Navbar: Indian travel navigation
- Hero: "Explore India's Wonders" headline
- Components: References to Indian destinations
- Content: Indian cultural context throughout

## 🔌 Backend API

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET/POST | `/api/destinations` | Indian destinations |
| GET/POST | `/api/cities` | Indian cities info |
| GET/POST | `/api/packages` | Travel packages |
| GET/POST/PUT/DELETE | `/api/bookings` | Booking management |

### Example API Calls

**Get all destinations:**
```bash
curl http://localhost:3000/api/destinations
```

**Get heritage sites:**
```bash
curl "http://localhost:3000/api/destinations?category=Heritage%20Site"
```

**Create a booking:**
```bash
curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user@example.com",
    "packageId": 1,
    "travelers": 4,
    "checkIn": "2024-05-01",
    "checkOut": "2024-05-07",
    "totalPrice": 50000
  }'
```

For complete API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

## 📊 Included Data

### 10 Major Indian Cities
Delhi, Mumbai, Bangalore, Jaipur, Kolkata, Chennai, Agra, Kochi, Varanasi, Goa

### 8+ Featured Destinations
- Taj Mahal (Agra)
- Himalayan Treks (Himachal Pradesh)
- Kerala Backwaters (Kochi)
- Spiritual Varanasi
- Goa Beaches
- Jaipur City Palace
- Dal Lake (Kashmir)
- Red Fort (Delhi)

### 5 Travel Packages
- Golden Triangle Tour
- Kerala Backwaters Package
- Himalayan Adventure
- Spiritual Varanasi Journey
- Goa Beach Getaway

## 🛠️ Available Scripts

```bash
# Development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 📦 Dependencies

### Core
- **next** ^13.5.4 - React framework
- **react** ^18 - UI library
- **react-dom** ^18 - React DOM rendering

### Styling
- **tailwindcss** ^3 - Utility CSS framework
- **autoprefixer** ^10 - PostCSS plugin
- **postcss** ^8 - CSS processor

### Development
- **typescript** ^5 - Type safety
- **@types/react** ^18 - React types
- **@types/node** ^20 - Node types

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Docker
```bash
docker build -t travel-aman .
docker run -p 3000:3000 travel-aman
```

### Traditional Hosting
```bash
npm run build
npm run start
```

## 🔐 Production Checklist

Before deploying to production:

- [ ] Add proper database (MongoDB, PostgreSQL, Firebase)
- [ ] Implement authentication (JWT, OAuth)
- [ ] Add input validation & sanitization
- [ ] Set up rate limiting
- [ ] Configure CORS properly
- [ ] Add error logging
- [ ] Set up payment gateway (Razorpay, PayPal)
- [ ] Enable HTTPS
- [ ] Add environment-specific configs
- [ ] Implement email notifications
- [ ] Set up monitoring & analytics

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Indian-themed frontend
- ✅ Backend API routes
- ✅ Destination & city data
- ✅ Travel packages

### Phase 2
- User authentication
- Payment integration
- Email notifications
- Advanced search filters

### Phase 3
- Mobile app (React Native)
- Real database integration
- Review system
- Blog/travel guides

### Phase 4
- AI recommendations
- Multi-language support
- Live chat support
- Analytics dashboard

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 📞 Support & Contact

- **Email**: support@travelaman.com
- **Phone**: +91 (123) 456-7890
- **Website**: www.travelaman.com
- **Issues**: GitHub Issues

## 🙏 Acknowledgments

- Inspired by the incredible diversity of India
- Built with ❤️ for Indian travelers and tourism
- Dedicated to promoting India's rich culture and heritage
- Thanks to all contributors and supporters

---

<h3 align="center">
  Made with ❤️ for India by <a href="https://github.com/yourusername">Your Name</a>
</h3>

<p align="center">
  <a href="#top">Back to Top</a> • 
  <a href="./API_DOCUMENTATION.md">API Docs</a> •
  <a href="https://github.com/yourusername/travel-aman">GitHub</a>
</p>

**Happy Travels! 🧭✈️🇮🇳**
