# SM GRNATIES - Stone Gallery

Premium marble and granite solutions showcasing over 250 varieties of natural stones with 25+ years of excellence.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd grnaties-stone-gallery

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## 🛠️ Technology Stack

### Frontend
- **React 18.3.1** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite 5.4** - Fast build tool with SWC compiler
- **Tailwind CSS 3.4** - Utility-first styling
- **shadcn/ui** - High-quality React components
- **React Router 6** - Client-side routing
- **TanStack Query** - Data fetching and state management
- **React Hook Form + Zod** - Form handling and validation
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Backend (Coming Soon)
- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database for products and content
- **Multer** - File upload handling
- **JWT** - Authentication tokens

## 📁 Project Structure

```
grnaties-stone-gallery/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn-ui components
│   │   ├── Navbar.tsx    # Navigation component
│   │   ├── Hero.tsx      # Hero section
│   │   ├── Footer.tsx    # Footer component
│   │   └── ...
│   ├── pages/            # Page components
│   │   ├── Index.tsx     # Home page
│   │   ├── Products.tsx  # Product listing
│   │   ├── ProductDetail.tsx
│   │   ├── Gallery.tsx
│   │   ├── Contact.tsx
│   │   └── About.tsx
│   ├── data/             # Static data
│   │   └── products.ts   # Product database
│   ├── types/            # TypeScript definitions
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── public/               # Static assets
├── server/               # Backend (Coming Soon)
└── ...config files
```

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start development server (port 8080)

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
```

## 🚢 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Deploy to Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

1. Update `vite.config.ts` with your repo name:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ...
});
```

2. Build and deploy:
```bash
npm run build
# Push the dist folder to gh-pages branch
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SITE_URL=https://your-domain.com
```

## 🔐 Admin Dashboard (Coming Soon)

The admin dashboard will allow you to:
- Manage products (Add, Edit, Delete)
- Upload and organize product images
- Manage gallery projects
- Edit page content
- Handle customer inquiries
- View analytics

Access: `/admin` (after implementation)

## 🌟 Features

### Current Features
- ✅ Responsive design for all devices
- ✅ Product catalog with filtering
- ✅ Product detail pages
- ✅ Project gallery
- ✅ Contact form (UI only)
- ✅ About page with company information

### Upcoming Features
- 🔄 Backend API integration
- 🔄 Admin dashboard
- 🔄 Real email integration for contact form
- 🔄 Product search and advanced filtering
- 🔄 Customer reviews and ratings
- 🔄 Quote request system
- 🔄 Wishlist functionality
- 🔄 Image gallery with lightbox
- 🔄 Product comparison

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is proprietary software owned by SM GRNATIES.

## 📧 Contact

For inquiries, please visit our [Contact Page](./src/pages/Contact.tsx) or reach out directly.

---

Built with ❤️ by SM GRNATIES Team
