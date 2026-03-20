# 🚀 Getting Started with TravelAman

This guide will help you get TravelAman up and running on your local machine and understand the project structure.

## Table of Contents
1. [Installation](#installation)
2. [Project Structure](#project-structure)
3. [Key Components](#key-components)
4. [API Usage](#api-usage)
5. [Customization](#customization)
6. [Deployment Guide](#deployment-guide)

## Installation

### Step 1: Prerequisites
Make sure you have:
- Node.js 16 or higher
- npm 7 or higher (comes with Node.js)
- A code editor (VS Code recommended)
- Git

### Step 2: Clone the Repository
```bash
git clone https://github.com/yourusername/travel-aman.git
cd travel-aman
```

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Environment Setup
```bash
# Copy the example environment file
cp .env.example .env.local
```

Edit `.env.local` if needed:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Step 5: Start Development Server
```bash
npm run dev
```

The application will be available at http://localhost:3000

## Project Structure

### Frontend Structure

```
components/
├── Navbar.tsx           # Navigation bar with TravelAman branding
├── Hero.tsx             # Hero section with "Explore India's Wonders"
├── Camp.tsx             # Featured Indian destinations carousel
├── Features.tsx         # App features showcase
├── Guide.tsx            # Travel guide section with route planning
├── GetApp.tsx           # Download app section
├── Footer.tsx           # Footer with Indian theme
└── Button.tsx           # Reusable button component
```

### Backend API Structure

```
app/api/
├── health/route.ts      # API health check endpoint
├── destinations/
│   └── route.ts         # GET/POST destinations
├── cities/
│   └── route.ts         # GET/POST Indian cities
├── packages/
│   └── route.ts         # GET/POST travel packages
└── bookings/
    └── route.ts         # GET/POST/PUT/DELETE bookings
```

### Utilities

```
lib/
├── api.ts               # API client functions
├── hooks/
│   └── useFetch.ts     # Custom hook for data fetching
└── utils.ts            # Helper utilities

constants/
└── index.ts            # Navigation links, cities, features
```

## Key Components

### 1. Navbar Component
**Location:** `components/Navbar.tsx`

- Displays TravelAman branding (🧭 compass + text)
- Navigation links from constants
- Login button
- Responsive menu

### 2. Hero Section
**Location:** `components/Hero.tsx`

- Large headline: "Explore India's Wonders"
- Campaign tagline
- CTA buttons for app download
- Star ratings showcase

### 3. Featured Destinations
**Location:** `components/Camp.tsx`

- Carousel of 4 Indian destinations
- Each destination shows:
  - Background image
  - Title and location
  - Visitor count
  - User avatars

### 4. Features Section
**Location:** `components/Features.tsx`

- "Why Choose TravelAman?" heading
- 4 feature cards with icons:
  1. Offline Maps
  2. Plan Your Spiritual Journey
  3. Immersive Cultural Experience
  4. Hidden Gems Every Month

### 5. Travel Guide
**Location:** `components/Guide.tsx`

- Heading: "Your Travel Guide to India"
- Route planning example (Delhi to Taj Mahal)
- Beautiful guide image showcase

## API Usage

### Getting Started with API

#### 1. Health Check
```javascript
fetch('/api/health')
  .then(res => res.json())
  .then(data => console.log(data));
```

#### 2. Get All Destinations
```javascript
fetch('/api/destinations')
  .then(res => res.json())
  .then(data => console.log(data.data));
```

#### 3. Filter Destinations by Category
```javascript
fetch('/api/destinations?category=Heritage%20Site')
  .then(res => res.json())
  .then(data => console.log(data.data));
```

#### 4. Get All Cities
```javascript
fetch('/api/cities')
  .then(res => res.json())
  .then(data => console.log(data.data));
```

#### 5. Create a Booking
```javascript
const bookingData = {
  userId: 'user@example.com',
  packageId: 1,
  travelers: 4,
  checkIn: '2024-05-01',
  checkOut: '2024-05-07',
  totalPrice: 50000,
  specialRequests: 'Vegetarian meals'
};

fetch('/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(bookingData)
})
  .then(res => res.json())
  .then(data => console.log(data));
```

### Using the API Client Utility

```javascript
import { destinationsAPI, citiesAPI, packagesAPI } from '@/lib/api';

// Get all destinations
const { data: destinations } = await destinationsAPI.getAll();

// Get heritage sites only
const { data: heritage } = await destinationsAPI.getAll({ 
  category: 'Heritage Site' 
});

// Get cities by state
const { data: utprCities } = await citiesAPI.getAll({ 
  state: 'Uttar Pradesh' 
});

// Get packages filtered
const { data: packages } = await packagesAPI.getAll({ 
  destination: 'Delhi',
  maxPrice: 15000 
});
```

## Customization

### Changing Colors/Theme

Edit `tailwind.config.ts`:

```typescript
colors: {
  saffron: {
    50: '#FF9933',  // Change primary color
    90: '#E6840D',
  },
  green: {
    50: '#138808',  // Change secondary color
    90: '#0D5C05',
  },
}
```

### Adding New Destinations

**Option 1: Add to constants**
Edit `constants/index.ts`:
```typescript
export const INDIAN_CITIES = [
  { name: 'New City', country: 'India' },
  // ...
];
```

**Option 2: Use API**
```javascript
fetch('/api/destinations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'New Destination',
    city: 'City Name',
    state: 'State Name',
    description: 'Description',
    category: 'Heritage Site'
  })
})
```

### Updating Navigation Links

Edit `constants/index.ts`:
```typescript
export const NAV_LINKS = [
  { href: '/', key: 'home', label: 'Home' },
  { href: '/destinations', key: 'destinations', label: 'Destinations' },
  // Add more links...
];
```

### Adding New Features

1. Create component in `components/` folder
2. Import in `app/page.tsx`
3. Add to the page layout

## Deployment Guide

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git push origin main
```

2. **Connect to Vercel**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Click Import

3. **Set Environment Variables**
   - In Vercel Dashboard: Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL=https://your-domain.vercel.app/api`

4. **Deploy**
   - Click "Deploy"
   - Vercel automatically builds and deploys

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

### Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t travel-aman .
docker run -p 3000:3000 travel-aman
```

## Troubleshooting

### Issue: Port 3000 already in use
```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Issue: Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Build errors
```bash
# Check TypeScript errors
npx tsc --noEmit

# Lint code
npm run lint

# Clear Next.js cache
rm -rf .next
npm run build
```

## Next Steps

1. **Explore the codebase** - Understand each component
2. **Read API Documentation** - See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
3. **Customize content** - Update Indian destinations and cities
4. **Add authentication** - Integrate user login
5. **Setup database** - Replace in-memory storage with MongoDB/PostgreSQL
6. **Add payments** - Integrate Razorpay or Stripe
7. **Deploy** - Push to production

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Support

If you have questions or issues:
- Check the [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- Review the [README.md](./README.md)
- Open a GitHub issue
- Email: support@travelaman.com

---

Happy coding! 🚀 Enjoy building TravelAman!
