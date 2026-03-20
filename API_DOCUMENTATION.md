# TravelAman Backend API Documentation

## Overview
TravelAman is a comprehensive travel platform for exploring and booking travel packages across India. The backend is built with Next.js 13 API Routes.

## Base URL
```
http://localhost:3000/api
```

## API Endpoints

### 1. Health Check
**Endpoint:** `GET /api/health`

Check if the API is running and get available endpoints.

**Response:**
```json
{
  "success": true,
  "message": "TravelAman API is running",
  "status": "healthy",
  "version": "1.0.0",
  "endpoints": {
    "destinations": "/api/destinations",
    "cities": "/api/cities",
    "packages": "/api/packages",
    "bookings": "/api/bookings"
  }
}
```

---

### 2. Destinations
**Base Endpoint:** `GET /api/destinations`

#### Get All Destinations
```
GET /api/destinations
```

**Query Parameters:**
- `category` (optional): Filter by category (e.g., "Heritage Site", "Adventure", "Beach")
- `state` (optional): Filter by state

**Example:**
```
GET /api/destinations?category=Heritage%20Site&state=Uttar%20Pradesh
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Taj Mahal",
      "city": "Agra",
      "state": "Uttar Pradesh",
      "description": "An ivory-white marble mausoleum...",
      "rating": 4.8,
      "visitors": 8000000,
      "image": "taj-mahal.jpg",
      "bestTime": "October to March",
      "category": "Heritage Site"
    }
  ],
  "count": 1
}
```

#### Create a Destination
```
POST /api/destinations
```

**Request Body:**
```json
{
  "name": "Destination Name",
  "city": "City Name",
  "state": "State Name",
  "description": "Detailed description",
  "rating": 4.5,
  "visitors": 1000000,
  "image": "image-url.jpg",
  "bestTime": "Season or months",
  "category": "Heritage Site"
}
```

**Required Fields:** name, city, state, description

---

### 3. Cities
**Base Endpoint:** `GET /api/cities`

#### Get All Cities
```
GET /api/cities
```

**Query Parameters:**
- `state` (optional): Filter by state
- `id` (optional): Get specific city by ID

**Example:**
```
GET /api/cities?state=Uttar%20Pradesh
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Delhi",
      "state": "Delhi",
      "population": 32900000,
      "description": "Capital city of India...",
      "attractions": ["Red Fort", "India Gate", "Jama Masjid"],
      "image": "delhi.jpg"
    }
  ],
  "count": 1
}
```

#### Add a New City
```
POST /api/cities
```

**Request Body:**
```json
{
  "name": "City Name",
  "state": "State Name",
  "population": 1000000,
  "description": "Detailed description",
  "attractions": ["Attraction 1", "Attraction 2"],
  "image": "image-url.jpg"
}
```

**Required Fields:** name, state, description

---

### 4. Travel Packages
**Base Endpoint:** `GET /api/packages`

#### Get All Packages
```
GET /api/packages
```

**Query Parameters:**
- `destination` (optional): Filter by destination city
- `maxPrice` (optional): Filter by maximum price (in INR)

**Example:**
```
GET /api/packages?destination=Delhi&maxPrice=15000
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Golden Triangle Tour",
      "destinations": ["Delhi", "Agra", "Jaipur"],
      "duration": "5 days",
      "price": 15000,
      "description": "Experience the iconic triangle of India...",
      "inclusions": ["Hotel", "Meals", "Transport", "Guide"],
      "rating": 4.8,
      "image": "golden-triangle.jpg"
    }
  ],
  "count": 1
}
```

#### Create a Package
```
POST /api/packages
```

**Request Body:**
```json
{
  "name": "Package Name",
  "destinations": ["City 1", "City 2"],
  "duration": "5 days",
  "price": 15000,
  "description": "Detailed description",
  "inclusions": ["Hotel", "Meals", "Transport"],
  "rating": 4.5,
  "image": "package-image.jpg"
}
```

**Required Fields:** name, destinations, duration, price

---

### 5. Bookings
**Base Endpoint:** `/api/bookings`

#### Get All Bookings
```
GET /api/bookings
```

**Query Parameters:**
- `id` (optional): Get specific booking by ID
- `userId` (optional): Get bookings for specific user

**Example:**
```
GET /api/bookings?userId=user123
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "bookingId": "TRVL-1234567890",
      "userId": "user123",
      "packageId": 1,
      "travelers": 5,
      "checkIn": "2024-04-15",
      "checkOut": "2024-04-20",
      "totalPrice": 75000,
      "specialRequests": "Vegetarian meals required",
      "status": "confirmed",
      "createdAt": "2024-03-20T10:30:00Z",
      "updatedAt": "2024-03-20T10:30:00Z"
    }
  ],
  "count": 1
}
```

#### Create a Booking
```
POST /api/bookings
```

**Request Body:**
```json
{
  "userId": "user123",
  "packageId": 1,
  "travelers": 5,
  "checkIn": "2024-04-15",
  "checkOut": "2024-04-20",
  "totalPrice": 75000,
  "specialRequests": "Vegetarian meals required"
}
```

**Required Fields:** userId, packageId, travelers, checkIn, checkOut

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": 1,
    "bookingId": "TRVL-1234567890",
    "userId": "user123",
    "packageId": 1,
    "travelers": 5,
    "checkIn": "2024-04-15",
    "checkOut": "2024-04-20",
    "totalPrice": 75000,
    "status": "pending",
    "createdAt": "2024-03-20T10:30:00Z",
    "updatedAt": "2024-03-20T10:30:00Z"
  }
}
```

#### Update a Booking
```
PUT /api/bookings
```

**Request Body:**
```json
{
  "id": 1,
  "status": "confirmed",
  "specialRequests": "Updated requests"
}
```

#### Cancel a Booking
```
DELETE /api/bookings?id=1
```

---

## Error Handling

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error information"
}
```

**HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request (missing fields)
- `404`: Not Found
- `500`: Server Error

---

## Data Models

### Destination Model
```typescript
{
  id: number;
  name: string;
  city: string;
  state: string;
  description: string;
  rating: number; // 0-5
  visitors: number;
  image: string; // URL
  bestTime: string;
  category: string;
}
```

### City Model
```typescript
{
  id: number;
  name: string;
  state: string;
  population: number;
  description: string;
  attractions: string[];
  image: string; // URL
}
```

### Package Model
```typescript
{
  id: number;
  name: string;
  destinations: string[];
  duration: string; // e.g., "5 days"
  price: number; // in INR
  description: string;
  inclusions: string[];
  rating: number; // 0-5
  image: string; // URL
}
```

### Booking Model
```typescript
{
  id: number;
  bookingId: string; // Unique reference
  userId: string;
  packageId: number;
  travelers: number;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  totalPrice: number;
  specialRequests: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
}
```

---

## Usage Examples

### JavaScript/Fetch API

#### Get destinations
```javascript
fetch('/api/destinations?category=Heritage%20Site')
  .then(res => res.json())
  .then(data => console.log(data));
```

#### Create a booking
```javascript
fetch('/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 'user123',
    packageId: 1,
    travelers: 5,
    checkIn: '2024-04-15',
    checkOut: '2024-04-20',
    totalPrice: 75000,
    specialRequests: 'Vegetarian meals'
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication
- Payment gateway integration
- Email notifications
- Review and rating system
- Image upload functionality
- Advanced filtering and search
- Analytics dashboard

---

## Development

### Run the application
```bash
npm run dev
```

### Build for production
```bash
npm run build
npm run start
```

---

## Notes

- Current implementation uses in-memory storage for development
- Data will be lost on server restart
- For production, integrate a proper database (MongoDB, PostgreSQL)
- Implement authentication and authorization
- Add rate limiting and API security
