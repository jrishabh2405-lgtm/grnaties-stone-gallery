# ✅ Serverless Deployment Checklist

## Pre-Deployment Setup

### 1. Cloudinary Account Setup
- [ ] Go to https://cloudinary.com
- [ ] Sign up for free account
- [ ] Navigate to Dashboard
- [ ] Copy Cloud Name
- [ ] Copy API Key
- [ ] Copy API Secret
- [ ] Save credentials for next step

### 2. Database Setup (Supabase)
- [ ] Go to https://supabase.com
- [ ] Create new project
- [ ] Wait for project to be ready (~2 minutes)
- [ ] Go to Settings → Database
- [ ] Copy connection string (URI mode)
- [ ] Save for next step

### 3. Generate Strong JWT Secret
```bash
# Run this command to generate a secure random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
- [ ] Copy the generated string
- [ ] Save for next step

---

## Vercel Deployment

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy to Vercel
```bash
vercel --prod
```

Follow the prompts:
- Set up and deploy: **Yes**
- Which scope: **Your account**
- Link to existing project: **No**
- Project name: **sm-grnaties-stone-gallery**
- Directory: **./  (current directory)**
- Override settings: **No**

### 4. Set Environment Variables

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add the following (for Production, Preview, and Development):

#### Required Variables
```
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@[HOST]:5432/postgres
JWT_SECRET=[YOUR-GENERATED-SECRET-FROM-STEP-3]
CLOUDINARY_CLOUD_NAME=[YOUR-CLOUD-NAME]
CLOUDINARY_API_KEY=[YOUR-API-KEY]
CLOUDINARY_API_SECRET=[YOUR-API-SECRET]
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
```

#### Optional (Email Configuration)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@smgrnaties.com
CONTACT_EMAIL=contact@smgrnaties.com
```

### 5. Redeploy After Adding Variables
```bash
vercel --prod
```

---

## Database Migration

### Option 1: Using Vercel CLI (Recommended)
```bash
# Pull environment variables
vercel env pull .env.production

# Run migrations
npx prisma migrate deploy
```

### Option 2: Using Supabase SQL Editor
1. Go to Supabase Dashboard → SQL Editor
2. Run the migration SQL manually
3. Or use Prisma Studio: `npx prisma studio`

### 3. Seed Database
```bash
# Make sure DATABASE_URL is set in .env
npm run seed
```

This creates admin user:
- Email: `admin@smgrnaties.com`
- Password: `admin123456`

---

## Testing

### 1. Test Health Endpoint
```bash
curl https://your-app.vercel.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "SM GRNATIES API is running",
  "timestamp": "2026-01-09T...",
  "environment": "production"
}
```

### 2. Test Admin Login
1. Go to `https://your-app.vercel.app/admin/login`
2. Login with seeded credentials
3. **IMMEDIATELY CHANGE PASSWORD**

### 3. Test Product Creation
1. Go to Admin Panel → Products
2. Click "Add Product"
3. Fill in details
4. Upload image
5. Verify image uploads to Cloudinary
6. Check product appears in frontend

### 4. Test Gallery
1. Go to Admin Panel → Gallery
2. Add gallery item with image
3. Verify appears on frontend

### 5. Test Contact Form
1. Go to frontend contact page
2. Submit form
3. Check admin panel for submission
4. Verify email sent (if configured)

---

## Post-Deployment

### 1. Security
- [ ] Change default admin password
- [ ] Verify JWT_SECRET is strong and unique
- [ ] Check CORS settings in vercel.json
- [ ] Enable 2FA on Vercel account
- [ ] Enable 2FA on Cloudinary account
- [ ] Enable 2FA on Supabase account

### 2. Performance
- [ ] Test page load speeds
- [ ] Check Cloudinary image optimization
- [ ] Verify API response times
- [ ] Enable Vercel Analytics (optional)

### 3. Monitoring
- [ ] Check Vercel deployment logs
- [ ] Monitor function execution times
- [ ] Check Cloudinary usage dashboard
- [ ] Monitor Supabase database size

### 4. Backup
- [ ] Setup Supabase automated backups
- [ ] Export Cloudinary assets (optional)
- [ ] Document environment variables securely

---

## Troubleshooting

### Issue: Build Failed
**Check**:
- Vercel build logs
- Prisma generation errors
- TypeScript compilation errors

**Solution**:
```bash
# Test build locally
npm run build

# Check Prisma
npx prisma generate
```

### Issue: API Returns 500 Error
**Check**:
- Vercel function logs
- Environment variables are set
- Database connection string

**Solution**:
- Check Vercel Dashboard → Functions → Logs
- Verify all env vars are set for Production
- Test DATABASE_URL connection

### Issue: File Upload Fails
**Check**:
- Cloudinary credentials
- File size (max 10MB)
- Network connectivity

**Solution**:
- Verify CLOUDINARY_* env vars
- Check Cloudinary dashboard for errors
- Test with smaller file

### Issue: Database Connection Failed
**Check**:
- DATABASE_URL format
- Supabase project status
- SSL mode

**Solution**:
```bash
# Add SSL mode to connection string
DATABASE_URL="postgresql://...?sslmode=require"
```

---

## Rollback Plan

If deployment fails:

### 1. Revert to Previous Deployment
```bash
vercel rollback
```

### 2. Or Redeploy Specific Version
Go to Vercel Dashboard → Deployments → Select working version → Promote to Production

---

## Success Criteria

✅ All checks passed:
- [ ] Health endpoint returns 200
- [ ] Admin login works
- [ ] Products CRUD works
- [ ] Gallery CRUD works
- [ ] Contact form works
- [ ] File uploads work (Cloudinary)
- [ ] Images display correctly
- [ ] No console errors
- [ ] All pages load
- [ ] Mobile responsive

---

## Next Steps After Deployment

### 1. Custom Domain (Optional)
1. Go to Vercel → Settings → Domains
2. Add your domain
3. Update DNS records
4. Update FRONTEND_URL env var

### 2. Add Content
- [ ] Upload product images
- [ ] Add product descriptions
- [ ] Create gallery items
- [ ] Test contact form

### 3. SEO
- [ ] Add meta descriptions
- [ ] Create sitemap
- [ ] Submit to Google Search Console
- [ ] Add Google Analytics (optional)

### 4. Monitoring
- [ ] Setup error tracking (Sentry)
- [ ] Enable Vercel Analytics
- [ ] Monitor Cloudinary usage
- [ ] Check Supabase metrics

---

## Cost Monitoring

### Free Tier Limits

**Vercel (Hobby)**:
- 100GB bandwidth/month
- 100GB-hours function execution
- 6,000 build minutes/month

**Cloudinary (Free)**:
- 25GB storage
- 25GB bandwidth/month
- 25,000 transformations/month

**Supabase (Free)**:
- 500MB database
- 1GB file storage
- 2GB bandwidth/month

### Upgrade Triggers
- Vercel: If you exceed 100GB bandwidth
- Cloudinary: If you exceed 25GB storage/bandwidth
- Supabase: If database > 500MB

---

## Support Resources

- Vercel Docs: https://vercel.com/docs
- Cloudinary Docs: https://cloudinary.com/documentation
- Supabase Docs: https://supabase.com/docs
- Prisma Docs: https://www.prisma.io/docs

---

**Deployment Date**: _________________

**Deployed By**: _________________

**Production URL**: _________________

**Notes**: _________________
