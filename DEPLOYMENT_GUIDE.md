# 🚀 TravelAman Deployment Guide

Complete guide to deploying TravelAman to production.

---

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Vercel Deployment](#vercel-deployment)
3. [Alternative Hosting](#alternative-hosting)
4. [Database Setup](#database-setup)
5. [Security Configuration](#security-configuration)
6. [Performance Optimization](#performance-optimization)
7. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Pre-Deployment Checklist

Before deploying to production, ensure:

### Code Quality
- [ ] All components render without errors
- [ ] No console errors or warnings (npm run lint)
- [ ] TypeScript compilation succeeds
- [ ] All API endpoints tested locally
- [ ] Environment variables configured
- [ ] .env.local not committed to git

### Security
- [ ] No sensitive data in code
- [ ] Environment variables for secrets
- [ ] CORS properly configured
- [ ] Input validation implemented
- [ ] SQL injection prevention (if using DB)
- [ ] XSS protection in place

### Performance
- [ ] Images optimized
- [ ] Next.js build succeeds
- [ ] No console errors
- [ ] API response times acceptable
- [ ] Database queries optimized

### Testing
- [ ] All pages load correctly
- [ ] API endpoints return expected data
- [ ] Forms work properly
- [ ] Mobile responsiveness verified
- [ ] Cross-browser testing done

### Documentation
- [ ] README updated
- [ ] API documentation complete
- [ ] Deployment instructions clear
- [ ] Environment setup documented

---

## Vercel Deployment (Recommended)

### Step 1: Prepare Repository

```bash
# Initialize git if not already done
git init

# Check for .gitignore
cat .gitignore
# Should include: node_modules, .env.local, .next, dist

# Add files to git
git add .

# Commit changes
git commit -m "Prepare for deployment"

# Create GitHub repository
# Then push to GitHub
git remote add origin <github-repo-url>
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Build Settings**
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Step 3: Set Environment Variables

In Vercel Dashboard:

1. Go to project settings
2. Select "Environment Variables"
3. Add production variables:

```env
NEXT_PUBLIC_API_URL=https://travel-aman.vercel.app/api
DATABASE_URL=your_database_url
API_KEY=your_api_key
```

### Step 4: Deploy

1. Click "Deploy"
2. Vercel builds and deploys automatically
3. Get deployment URL
4. Test all endpoints

### Step 5: Custom Domain (Optional)

1. In project settings → "Domains"
2. Add custom domain: www.travelaman.com
3. Configure DNS settings
4. Wait for DNS propagation (24 hours)

---

## Alternative Hosting

### Netlify Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build project
npm run build

# Deploy
netlify deploy --prod
```

**Netlify Configuration (netlify.toml):**
```toml
[build]
  command = "npm run build"
  functions = "api"
  publish = ".next"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

### AWS Amplify

```bash
# Install AWS CLI
npm install -g @aws-amplify/cli

# Initialize Amplify
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

### Docker on Heroku

**Dockerfile:**
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

**Deploy:**
```bash
# Create Heroku app
heroku create travel-aman

# Deploy
git push heroku main

# Set environment variables
heroku config:set NEXT_PUBLIC_API_URL=https://travel-aman.herokuapp.com/api
```

---

## Database Setup

### MongoDB Setup (Recommended for this project)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up free
   - Create cluster

2. **Get Connection String**
   - In Atlas → Connect
   - Get connection string
   - Add to .env.local

3. **Install MongoDB Driver**
```bash
npm install mongodb
# or
npm install mongoose
```

4. **Update API Routes**
```typescript
// Example with MongoDB
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export async function GET() {
  try {
    await client.connect();
    const db = client.db('travel_aman');
    const destinations = await db.collection('destinations').find().toArray();
    
    return Response.json({
      success: true,
      data: destinations
    });
  } finally {
    await client.close();
  }
}
```

### PostgreSQL Setup

```bash
npm install pg
```

```typescript
// Example with PostgreSQL
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM destinations');
    return Response.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}
```

---

## Security Configuration

### Environment Variables Template

**Production .env File:**
```env
# API Configuration
NEXT_PUBLIC_API_URL=https://travel-aman.vercel.app/api

# Database
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/dbname
MONGODB_URI=your_mongodb_connection_string

# Security
API_SECRET_KEY=your_secret_key_here
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret

# Payment Gateway (if needed)
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret

# Email Service (if needed)
SENDGRID_API_KEY=your_sendgrid_key
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

### CORS Configuration

```typescript
// api/middleware/cors.ts
export function configureCORS(response: Response) {
  response.headers.set('Access-Control-Allow-Origin', 
    process.env.ALLOWED_ORIGINS || '*');
  response.headers.set('Access-Control-Allow-Methods', 
    'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 
    'Content-Type, Authorization');
  return response;
}
```

### Input Validation

```typescript
// lib/validation.ts
export function validateDestinationInput(data: any) {
  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Invalid name');
  }
  if (!data.state || typeof data.state !== 'string') {
    throw new Error('Invalid state');
  }
  if (data.name.length > 100) {
    throw new Error('Name too long');
  }
  return true;
}
```

---

## Performance Optimization

### Next.js Optimization

**next.config.js:**
```javascript
module.exports = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  
  // Compression
  compress: true,
  
  // Trailing slash
  trailingSlash: false,
  
  // Production build
  productionBrowserSourceMaps: false,
};
```

### Database Query Optimization

```typescript
// Add indexes to frequently queried fields
// MongoDB:
db.destinations.createIndex({ state: 1 });
db.destinations.createIndex({ category: 1 });

// PostgreSQL:
CREATE INDEX idx_state ON destinations(state);
CREATE INDEX idx_category ON destinations(category);
```

### Caching Strategy

```typescript
// Add cache headers to API responses
export async function GET(request: NextRequest) {
  const response = NextResponse.json(data);
  response.headers.set('Cache-Control', 'public, max-age=3600');
  return response;
}
```

---

## Monitoring & Maintenance

### Performance Monitoring

1. **Set up error logging**
   - Sentry.io
   - LogRocket
   - New Relic

2. **Monitor API performance**
   - API response times
   - Error rates
   - Database query times

3. **Track user analytics**
   - Google Analytics
   - Mixpanel
   - Custom tracking

### Regular Maintenance

```bash
# Weekly
- Check error logs
- Monitor database size
- Review API usage

# Monthly
- Update dependencies: npm update
- Security audit: npm audit
- Performance review
- Backup database

# Quarterly
- Full security audit
- Update Node.js version
- Review and optimize queries
```

### Backup Strategy

```bash
# MongoDB backup
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/dbname" --out ./backup

# PostgreSQL backup
pg_dump -U user -h host -d database > backup.sql

# Verify backups regularly
# Store in separate location (AWS S3, Google Cloud Storage)
```

---

## Production Deployment Checklist

### Pre-Launch
- [ ] All tests passing
- [ ] API endpoints verified
- [ ] Database backups configured
- [ ] Error logging enabled
- [ ] Environment variables set
- [ ] SSL certificate installed
- [ ] Domain configured
- [ ] DNS records updated

### Launch Week
- [ ] Monitor error logs
- [ ] Check API performance
- [ ] Verify email notifications work
- [ ] Test payment processing
- [ ] Monitor database performance
- [ ] Get initial user feedback

### Post-Launch
- [ ] Weekly performance reviews
- [ ] Monthly security audits
- [ ] Regular database maintenance
- [ ] Dependency updates
- [ ] User analytics review

---

## Troubleshooting

### Build Fails on Vercel
```bash
# Check build logs
# Usually caused by:
# 1. TypeScript errors - run: npx tsc --noEmit
# 2. Missing env vars
# 3. API endpoint errors

# Test locally first
npm run build
npm start
```

### API Errors in Production
```bash
# Check:
# 1. Environment variables set correctly
# 2. Database connection string valid
# 3. API routes have proper error handling
# 4. CORS configured correctly
# 5. Request/response format correct
```

### Slow Performance
```bash
# Optimize:
# 1. Database indexes
# 2. Query performance
# 3. Image sizes
# 4. API response times
# 5. Enable caching
```

---

## Contact & Support

- **Vercel Support:** https://vercel.com/support
- **Next.js Docs:** https://nextjs.org/docs
- **MongoDB Docs:** https://docs.mongodb.com/
- **PostgreSQL Docs:** https://www.postgresql.org/docs/

---

## Summary

✅ **You're ready to deploy!**

1. Push code to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy
5. Monitor and maintain

Happy deploying! 🚀
