# 🚀 SM GRNATIES - Quick Start (2 Minutes)

## Step 1: Install MongoDB
```bash
# Download and install MongoDB from: https://www.mongodb.com/try/download/community
# Or use cloud: https://www.mongodb.com/cloud/atlas (recommended)
```

## Step 2: Install & Seed
```bash
npm install
npm run seed
```

## Step 3: Start Servers

**Terminal 1:**
```bash
npm run server:watch
```

**Terminal 2:**
```bash
npm run dev
```

## Step 4: Login

**Admin Panel:** http://localhost:8080/admin/login

```
Email: admin@smgrnaties.com
Password: admin123456
```

**⚠️ Change this password immediately after login!**

---

## 🎯 What to Do First

1. **Login** to admin panel
2. **Change password** (Settings → Profile)
3. **Add products** (Dashboard → Products → Add Product)
4. **Upload images** for each product
5. **Add gallery** projects (Dashboard → Gallery → Add Item)
6. **Test contact form** on the main website

---

## 📁 Key URLs

- **Website:** http://localhost:8080
- **Admin Login:** http://localhost:8080/admin/login
- **API Health:** http://localhost:3000/api/health

---

## 🔧 Common Commands

```bash
# Start backend (with auto-reload)
npm run server:watch

# Start frontend
npm run dev

# Build for production
npm run build

# Reset admin user
npm run seed
```

---

## 🆘 Troubleshooting

**Backend won't start?**
```bash
# Check MongoDB is running
# Windows: Check Services for MongoDB
# Mac: brew services list
# Linux: sudo systemctl status mongodb
```

**Can't login?**
```bash
# Re-run seed script
npm run seed
```

**Port already in use?**
```bash
# Backend (3000) or Frontend (8080) ports occupied
# Close other applications or change ports in:
# - .env (PORT=3000)
# - vite.config.ts (port: 8080)
```

---

## 📚 Full Documentation

- **Complete Setup:** [SETUP_GUIDE.md](SETUP_GUIDE.md)
- **Deployment:** [DEPLOYMENT.md](DEPLOYMENT.md)
- **What Changed:** [TRANSFORMATION_SUMMARY.md](TRANSFORMATION_SUMMARY.md)

---

## ✅ Your Checklist

- [ ] MongoDB installed and running
- [ ] Dependencies installed (`npm install`)
- [ ] Database seeded (`npm run seed`)
- [ ] Backend running (`npm run server:watch`)
- [ ] Frontend running (`npm run dev`)
- [ ] Logged into admin panel
- [ ] Default password changed
- [ ] First product added
- [ ] Contact form tested

**Once complete, you're ready to deploy! 🎉**

---

Need help? Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.
