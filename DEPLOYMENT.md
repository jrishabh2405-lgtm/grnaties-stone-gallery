# Deployment Guide - SM GRNATIES

## Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or cloud like MongoDB Atlas)
- Git repository set up

## Quick Start (Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create `.env` file in the root:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/sm-grnaties
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:8080
```

Create `.env.local` file for frontend:
```env
VITE_API_URL=http://localhost:3000/api
```

### 3. Seed the Database

Create the admin user:
```bash
npm run seed
```

This creates an admin account:
- **Email:** admin@smgrnaties.com
- **Password:** admin123456 (CHANGE THIS!)

### 4. Run Development Servers

**Terminal 1 - Backend:**
```bash
npm run server:watch
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Visit:
- Frontend: http://localhost:8080
- Admin Panel: http://localhost:8080/admin/login

---

## Production Deployment

### Option 1: Vercel (Frontend) + Railway/Render (Backend)

#### Frontend on Vercel

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Set Environment Variables in Vercel Dashboard:**
   - `VITE_API_URL`: Your backend API URL

4. **Deploy to Production:**
```bash
vercel --prod
```

#### Backend on Railway

1. Visit [Railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Add MongoDB service (or use MongoDB Atlas)
4. Set environment variables:
   ```
   PORT=3000
   NODE_ENV=production
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-production-secret
   FRONTEND_URL=https://your-vercel-domain.vercel.app
   ```
5. Railway will auto-deploy on push to main

#### Backend on Render

1. Visit [Render.com](https://render.com)
2. Create new Web Service
3. Connect your GitHub repo
4. Configure:
   - **Build Command:** `npm install && npm run build:server`
   - **Start Command:** `npm start`
5. Add environment variables
6. Deploy

---

### Option 2: Netlify (Frontend) + Render (Backend)

#### Frontend on Netlify

1. **Install Netlify CLI:**
```bash
npm i -g netlify-cli
```

2. **Build:**
```bash
npm run build
```

3. **Deploy:**
```bash
netlify deploy --prod --dir=dist
```

4. **Or connect GitHub:** Push to main, Netlify auto-deploys

5. **Set Environment Variables in Netlify Dashboard:**
   - `VITE_API_URL`

---

### Option 3: VPS (DigitalOcean, AWS EC2, etc.)

#### Setup Server

1. **SSH into your server:**
```bash
ssh user@your-server-ip
```

2. **Install Node.js & MongoDB:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs mongodb

# Or use MongoDB Atlas for cloud database
```

3. **Clone Repository:**
```bash
git clone https://github.com/your-username/grnaties-stone-gallery.git
cd grnaties-stone-gallery
npm install
```

4. **Setup Environment Variables:**
```bash
nano .env
# Add your production environment variables
```

5. **Build Frontend:**
```bash
npm run build
```

6. **Build Backend:**
```bash
npm run build:server
```

7. **Install PM2 (Process Manager):**
```bash
sudo npm install -g pm2
```

8. **Start Backend:**
```bash
pm2 start dist-server/index.js --name smgrnaties-api
```

9. **Setup Nginx (Web Server):**
```bash
sudo apt-get install nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/smgrnaties

# Add configuration:
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /path/to/grnaties-stone-gallery/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/smgrnaties /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

10. **Setup SSL with Let's Encrypt:**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

11. **Auto-restart on reboot:**
```bash
pm2 startup
pm2 save
```

---

## Database Setup

### Local MongoDB
```bash
# Install MongoDB
sudo apt-get install mongodb

# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### MongoDB Atlas (Cloud)

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP addresses (or allow all: 0.0.0.0/0)
5. Get connection string
6. Update `MONGODB_URI` in `.env`

---

## Environment Variables Reference

### Backend (.env)
```env
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb://localhost:27017/sm-grnaties
JWT_SECRET=random-string-at-least-32-characters
FRONTEND_URL=https://your-domain.com

# Optional: Email configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@smgrnaties.com
CONTACT_EMAIL=contact@smgrnaties.com
```

### Frontend (.env.local)
```env
VITE_API_URL=https://your-backend-url.com/api
```

---

## Post-Deployment Checklist

- [ ] Change default admin password
- [ ] Set strong JWT_SECRET
- [ ] Configure SMTP for contact form emails
- [ ] Upload product images
- [ ] Add products via admin panel
- [ ] Add gallery projects
- [ ] Test contact form
- [ ] Setup domain DNS
- [ ] Enable SSL certificate
- [ ] Setup monitoring (optional)
- [ ] Configure backups for MongoDB
- [ ] Test admin panel login
- [ ] Test product CRUD operations

---

## Maintenance

### Update Code
```bash
git pull origin main
npm install
npm run build
npm run build:server
pm2 restart smgrnaties-api
```

### View Logs
```bash
pm2 logs smgrnaties-api
```

### MongoDB Backup
```bash
mongodump --uri="mongodb://localhost:27017/sm-grnaties" --out=/backup/$(date +%Y%m%d)
```

---

## Troubleshooting

### Backend won't start
- Check MongoDB is running: `sudo systemctl status mongodb`
- Check environment variables are set
- Check port 3000 is not in use: `lsof -i :3000`

### Frontend can't connect to API
- Verify `VITE_API_URL` is correct
- Check CORS settings in backend
- Check backend is running

### Admin login fails
- Verify admin user exists in database
- Run seed script: `npm run seed`
- Check JWT_SECRET is set

---

## Support

For issues, check:
- Server logs: `pm2 logs`
- MongoDB logs: `sudo journalctl -u mongodb`
- Nginx logs: `sudo tail -f /var/log/nginx/error.log`

---

Built with ❤️ by SM GRNATIES Team
