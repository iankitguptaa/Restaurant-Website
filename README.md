# 🍽️ BiteRoute — Food Ordering Platform

> Precision-crafted meals delivered with speed. A full-stack gourmet food ordering platform.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-BiteRoute-orange?style=for-the-badge&logo=vercel)](https://restaurant-website-zeta-ruby.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend%20API-Render-blue?style=for-the-badge&logo=render)](https://restaurant-website-1-suom.onrender.com/api/restaurants)

## 🌐 Live Demo

👉 **[restaurant-website-zeta-ruby.vercel.app](https://restaurant-website-zeta-ruby.vercel.app)**

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + Vite + Tailwind CSS |
| **UI/Animation** | Framer Motion + React Icons |
| **Backend** | Node.js + Express.js |
| **ORM** | Sequelize |
| **Database** | PostgreSQL (Neon) |
| **Hosting** | Vercel (frontend) + Render (backend) |

## ✨ Features

- 🏠 Restaurant listings with search & filter
- 🍕 Menu browsing by category
- 🛒 Cart management
- 📦 Order placement & history
- 👤 User authentication (login/register)
- ❤️ Favorites / Wishlist
- 🎛️ Admin dashboard
- 🌙 Dark / Light mode
- 📱 Fully responsive design

## 🚀 Deployment

| Service | URL |
|---------|-----|
| 🖥️ Frontend (Vercel) | [restaurant-website-zeta-ruby.vercel.app](https://restaurant-website-zeta-ruby.vercel.app) |
| 🚀 Backend API (Render) | [restaurant-website-1-suom.onrender.com](https://restaurant-website-1-suom.onrender.com/api/restaurants) |
| 🗄️ Database | Neon PostgreSQL |

## 🏃 Local Development

```bash
# Clone the repo
git clone https://github.com/iankitguptaa/Restaurant-Website.git
cd Restaurant-Website

# Install dependencies
npm install
npm install --prefix frontend
npm install --prefix backend

# Run both frontend + backend
npm run dev
```

Frontend runs on `http://localhost:5173`  
Backend runs on `http://localhost:5000`

## 📁 Project Structure

```
├── frontend/          # React + Vite app
│   ├── src/
│   │   ├── pages/     # Route pages
│   │   ├── components/# Reusable components
│   │   ├── context/   # React context (Auth, Cart, etc.)
│   │   └── services/  # API service layer
├── backend/           # Express.js server
│   ├── models/        # Sequelize models
│   ├── database.js    # DB connection (SQLite dev / Postgres prod)
│   └── server.js      # API routes
└── render.yaml        # Render deployment config
```

## 🔑 Environment Variables

**Frontend** (`frontend/.env.production`):
```
VITE_API_URL=https://restaurant-website-1-suom.onrender.com/api
```

**Backend** (Render dashboard):
```
DATABASE_URL=<Neon PostgreSQL connection string>
NODE_ENV=production
FRONTEND_URL=https://restaurant-website-zeta-ruby.vercel.app
```

---

Made with ❤️ by [Ankit Gupta](https://github.com/iankitguptaa)
