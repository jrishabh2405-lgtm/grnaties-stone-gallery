# Vercel Deployment Guide - SM GRNATIES Stone Gallery

## ⚠️ IMPORTANT: Architecture Understanding

This application has **TWO parts**:
1. **Frontend** (React + Vite) - Can be deployed to Vercel
2. **Backend** (Express + Prisma + PostgreSQL) - **CANNOT** be deployed to Vercel as-is

### Why Backend Won't Work on Vercel?
- Vercel is designed for **serverless functions** and **static sites**
- Your Express server is a **long-running Node.js process**
- Vercel doesn't support persistent servers or file uploads in the traditional sense

---

## 🎯 Recommended Deployment Strategy

### Option 1: Split Deployment (RECOMMENDED)
- **Frontend**: Deploy to Vercel ✅
- **Backend**: Deploy to Railway, Render, or Fly.io ✅
- **Database**: Use Supabase (PostgreSQL) ✅

### Option 2: Full Stack on Single Platform
- Deploy everything to Railway, Render, or Fly.io
- These platforms support full-stack Node.js applications

---

## 📋 Pre-Deployment Checklist

### 1. Environment Variables Setup

Create a `.env.local` file for frontend (DO NOT COMMIT):
```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

Ensure your `.env` has (DO NOT COMMIT):
```env
DATABASE_URL="postgresql://user:password@host:5432/database"
JWT_SECRET="your-super-secret-jwt-key-min-32-characters-long"
FRONTEND_URL=https://your-vercel-app.vercel.app
NODE_ENV=production
PORT=3000
```

### 2. Database Setup (Supabase)

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Get your connection string from Settings → Database
4. Update `DATABASE_URL` in your backend environment variables

### 3. Run Prisma Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Or run migrations
npx prisma migrate deploy
```

### 4. Seed Database

```bash
npm run seed
```

This creates the admin user:
- Email: `admin@smgrnaties.com`
- Password: `admin123456` (CHANGE THIS IMMEDIATELY!)

---

## 🚀 Deployment Steps

### FRONTEND DEPLOYMENT (Vercel)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Configure Project
```bash
vercel
```

When prompted:
- **Set up and deploy**: Yes
- **Which scope**: Your account
- **Link to existing project**: No
- **Project name**: sm-grnaties-stone-gallery
- **Directory**: ./
- **Override settings**: No

#### Step 4: Set Environment Variables in Vercel Dashboard

Go to your project settings on Vercel and add:

```
VITE_API_URL=https://your-backend-url.railway.app/api
```

#### Step 5: Deploy to Production
```bash
vercel --prod
```

---

### BACKEND DEPLOYMENT (Railway)

#### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

#### Step 2: Login to Railway
```bash
railway login
```

#### Step 3: Initialize Project
```bash
railway init
```

#### Step 4: Link to Your Code
```bash
railway link
```

#### Step 5: Add PostgreSQL Database
```bash
railway add
# Select PostgreSQL
```

#### Step 6: Set Environment Variables

In Railway dashboard, add:
```
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
FRONTEND_URL=https://your-vercel-app.vercel.app
NODE_ENV=production
PORT=3000
```

#### Step 7: Configure Build Settings

In Railway dashboard:
- **Build Command**: `npm install && npm run build:server && npx prisma generate && npx prisma migrate deploy`
- **Start Command**: `npm start`
- **Root Directory**: `/`

#### Step 8: Deploy
```bash
railway up
```

---

## 🔧 Alternative: Backend on Render

### Step 1: Create New Web Service
1. Go to [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository

### Step 2: Configure Service
- **Name**: sm-grnaties-backend
- **Environment**: Node
- **Region**: Choose closest to your users
- **Branch**: main
- **Build Command**: 
  ```bash
  npm install && npm run build:server && npx prisma generate && npx prisma migrate deploy
  ```
- **Start Command**: `npm start`

### Step 3: Add Environment Variables
```
DATABASE_URL=your-postgresql-connection-string
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=https://your-vercel-app.vercel.app
NODE_ENV=production
PORT=3000
```

### Step 4: Add PostgreSQL Database
1. Click "New +" → "PostgreSQL"
2. Copy the Internal Database URL
3. Update `DATABASE_URL` in your web service

---

## 🔒 Security Checklist

- [ ] Change default admin password immediately after first login
- [ ] Use a strong JWT_SECRET (min 32 characters, random)
- [ ] Never commit `.env` or `.env.local` files
- [ ] Enable CORS only for your frontend domain
- [ ] Use HTTPS for all production URLs
- [ ] Set `NODE_ENV=production` in production
- [ ] Whitelist your backend IP in Supabase (if using)
- [ ] Enable rate limiting on API endpoints (recommended)

---

## 🧪 Testing Deployment

### 1. Test Frontend
```bash
# Visit your Vercel URL
https://your-app.vercel.app

# Check if it loads correctly
# Check browser console for errors
```

### 2. Test Backend
```bash
# Health check
curl https://your-backend.railway.app/api/health

# Should return: {"status":"ok","message":"Server is running"}
```

### 3. Test Database Connection
```bash
# Try logging in to admin panel
https://your-app.vercel.app/admin/login

# Use the seeded credentials
```

### 4. Test API Integration
- Try creating a product from admin panel
- Test contact form submission
- Upload images to gallery
- Check if all CRUD operations work

---

## 📊 Monitoring & Logs

### Vercel Logs
```bash
vercel logs
```

### Railway Logs
```bash
railway logs
```

Or check the dashboard for real-time logs.

---

## 🐛 Common Issues & Solutions

### Issue 1: "Prisma Client not generated"
**Solution**:
```bash
npx prisma generate
```
Make sure `postinstall` script runs on deployment.

### Issue 2: "Database connection failed"
**Solution**:
- Verify `DATABASE_URL` is correct
- Check if database is accessible from your backend host
- Ensure SSL mode is correct (add `?sslmode=require` if needed)

### Issue 3: "CORS errors"
**Solution**:
Update `server/index.ts`:
```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### Issue 4: "File uploads not working"
**Solution**:
- Railway/Render have ephemeral file systems
- Use cloud storage (Cloudinary, AWS S3, Supabase Storage)
- Or use a persistent volume (Railway supports this)

### Issue 5: "Environment variables not loading"
**Solution**:
- Check if variables are set in platform dashboard
- Restart the service after adding variables
- Verify variable names match exactly (case-sensitive)

---

## 🔄 Continuous Deployment

### Vercel
- Automatically deploys on push to `main` branch
- Preview deployments for pull requests

### Railway
- Automatically deploys on push to `main` branch
- Can configure deployment triggers

### Manual Deployment
```bash
# Frontend
vercel --prod

# Backend (Railway)
railway up

# Backend (Render)
# Push to GitHub, Render auto-deploys
```

---

## 📈 Post-Deployment Tasks

1. **Update DNS** (if using custom domain)
   - Point domain to Vercel
   - Update `FRONTEND_URL` in backend

2. **Setup Monitoring**
   - Enable Vercel Analytics
   - Setup error tracking (Sentry, LogRocket)

3. **Backup Database**
   - Setup automated backups in Supabase
   - Or use `pg_dump` for manual backups

4. **Performance Optimization**
   - Enable Vercel Edge Network
   - Optimize images
   - Enable caching headers

5. **SEO Setup**
   - Add meta tags
   - Setup sitemap
   - Submit to Google Search Console

---

## 💡 Cost Estimation

### Free Tier (Hobby Projects)
- **Vercel**: Free (100GB bandwidth/month)
- **Railway**: $5/month credit (enough for small apps)
- **Supabase**: Free (500MB database, 2GB bandwidth)
- **Total**: ~$0-5/month

### Production (Small Business)
- **Vercel Pro**: $20/month
- **Railway**: ~$10-20/month
- **Supabase Pro**: $25/month
- **Total**: ~$55-65/month

---

## 📞 Support & Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)

---

## ✅ Final Verification

Before going live, verify:
- [ ] Frontend loads without errors
- [ ] Backend API responds to health check
- [ ] Database connection is stable
- [ ] Admin login works
- [ ] Product CRUD operations work
- [ ] Image uploads work
- [ ] Contact form sends emails (if configured)
- [ ] All environment variables are set correctly
- [ ] HTTPS is enabled on all endpoints
- [ ] Default admin password has been changed

---

**Built with ❤️ for SM GRNATIES**

*Last Updated: January 2026*
