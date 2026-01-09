# 🚨 PRODUCTION DEPLOYMENT CHECKLIST

## Critical Items Before Deploying

### ✅ Completed
- [x] `.gitignore` properly configured
- [x] `.env.example` updated with correct database (PostgreSQL)
- [x] Prisma build steps added to package.json
- [x] `uploads/.gitkeep` created for directory structure

### ⚠️ MUST DO BEFORE DEPLOYMENT

#### 1. Environment Variables
- [ ] Create `.env.local` with `VITE_API_URL` pointing to your backend
- [ ] Ensure `.env` has `DATABASE_URL` (PostgreSQL connection string)
- [ ] Generate a strong `JWT_SECRET` (min 32 characters)
- [ ] Update `FRONTEND_URL` to your production domain

#### 2. Database Setup
- [ ] Setup PostgreSQL database (Supabase recommended)
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma db push` or `npx prisma migrate deploy`
- [ ] Run `npm run seed` to create admin user
- [ ] **CHANGE DEFAULT ADMIN PASSWORD** after first login

#### 3. Backend Deployment
- [ ] **IMPORTANT**: Backend CANNOT be deployed to Vercel
- [ ] Deploy backend to Railway, Render, or Fly.io
- [ ] Set all environment variables in backend platform
- [ ] Test backend health endpoint: `/api/health`

#### 4. Frontend Deployment (Vercel)
- [ ] Set `VITE_API_URL` environment variable in Vercel
- [ ] Run `vercel --prod` or connect GitHub for auto-deploy
- [ ] Test frontend loads correctly
- [ ] Verify API calls work (check browser console)

#### 5. Security
- [ ] Change default admin password (admin123456)
- [ ] Use strong JWT_SECRET (not the example one)
- [ ] Never commit `.env` or `.env.local` files
- [ ] Enable CORS only for your frontend domain
- [ ] Verify HTTPS is enabled on all endpoints

#### 6. File Uploads
- [ ] **WARNING**: Vercel/Railway have ephemeral storage
- [ ] Consider using Cloudinary, AWS S3, or Supabase Storage
- [ ] Or configure persistent volumes (Railway supports this)

---

## 🚀 Quick Deployment Commands

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Backend (Railway)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

---

## 📚 Detailed Guides

- **Full Vercel Guide**: See `VERCEL_DEPLOYMENT.md`
- **General Deployment**: See `DEPLOYMENT.md`
- **Quick Start**: See `QUICK_START.md`

---

## 🔍 Architecture Overview

```
┌─────────────────┐
│   Vercel        │
│   (Frontend)    │ ← React + Vite
│   Port: 443     │
└────────┬────────┘
         │
         │ HTTPS API Calls
         │
         ▼
┌─────────────────┐
│ Railway/Render  │
│   (Backend)     │ ← Express + Prisma
│   Port: 3000    │
└────────┬────────┘
         │
         │ Database Connection
         │
         ▼
┌─────────────────┐
│   Supabase      │
│  (PostgreSQL)   │ ← Database
└─────────────────┘
```

---

## ⚠️ Known Limitations

1. **Backend on Vercel**: Not supported for Express servers
2. **File Uploads**: Need cloud storage for production
3. **Database**: Must use PostgreSQL (not MongoDB)
4. **Environment**: Requires separate `.env` for backend and `.env.local` for frontend

---

## 🆘 Need Help?

1. Check `VERCEL_DEPLOYMENT.md` for detailed instructions
2. Review `DEPLOYMENT.md` for alternative platforms
3. Check logs: `vercel logs` or `railway logs`
4. Verify environment variables are set correctly

---

## 📊 Current Status

- **Tech Stack**: React + Vite + Express + Prisma + PostgreSQL
- **Database**: PostgreSQL (via Supabase)
- **Frontend**: Ready for Vercel ✅
- **Backend**: Needs separate deployment ⚠️
- **Production Ready**: ⚠️ **AFTER completing checklist above**

---

**Last Updated**: January 9, 2026
