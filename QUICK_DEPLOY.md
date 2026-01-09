# ⚡ Quick Deployment Reference

## 🚨 CRITICAL: Read This First!

**Your backend CANNOT deploy to Vercel!**  
Deploy frontend to Vercel, backend to Railway/Render.

---

## 📋 30-Second Checklist

- [ ] Database setup (Supabase)
- [ ] Backend deployed (Railway/Render)
- [ ] Frontend deployed (Vercel)
- [ ] Environment variables set
- [ ] Admin password changed

---

## 🔑 Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=https://your-backend.railway.app/api
```

### Backend (.env)
```
DATABASE_URL=postgresql://...
JWT_SECRET=min-32-chars-random-string
FRONTEND_URL=https://your-app.vercel.app
NODE_ENV=production
```

---

## 🚀 Deploy Commands

### Backend (Railway)
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

### Frontend (Vercel)
```bash
npm i -g vercel
vercel --prod
```

---

## 🔒 Security

**MUST CHANGE**:
- Default admin password: `admin123456`
- JWT_SECRET in `.env.example`

---

## 📚 Full Guides

- `PRODUCTION_READINESS_REPORT.md` - Complete overview
- `VERCEL_DEPLOYMENT.md` - Step-by-step guide
- `PRODUCTION_CHECKLIST.md` - Detailed checklist

---

## 💰 Cost

**Free Tier**: $0-5/month  
**Production**: $55-65/month

---

## 🆘 Help

**Logs**: `vercel logs` or `railway logs`  
**Health Check**: `https://your-backend.railway.app/api/health`
