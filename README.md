# 🌸 Bloomora — Mini Flower E-Commerce (MERN Stack)

Bloomora is a colorful, modern, fresh, and animated Flower E-Commerce website built with the **MERN Stack** (MongoDB, Express, React, Node.js). It features fluid animations powered by Framer Motion, real-time cart state management, checkout with confetti celebrations, order history tracking, and a RESTful API backend.

---

## 📁 Project Architecture & Folder Structure

```
├── backend/                        # Standalone Express + MongoDB REST API
│   ├── config/
│   │   └── db.js                   # Mongoose database connection
│   ├── controllers/
│   │   ├── productController.js    # Product retrieval logic
│   │   └── orderController.js      # Order placement and tracking logic
│   ├── models/
│   │   ├── Product.js              # Mongoose Product Schema
│   │   └── Order.js                # Mongoose Order Schema
│   ├── routes/
│   │   ├── productRoutes.js        # /api/products endpoints
│   │   └── orderRoutes.js          # /api/orders endpoints
│   ├── data/
│   │   ├── seedData.js             # 16 Curated flower arrangements
│   │   └── seed.js                 # Database seeding script
│   ├── package.json                # Backend dependencies & scripts
│   ├── vercel.json                 # 1-click Vercel backend deployment config
│   ├── .env.example                # Backend environment template
│   └── server.js                   # Express server entry point
│
├── src/                            # Frontend React Application
│   ├── api/
│   │   └── api.js                  # Axios client with fallback resilience
│   ├── components/
│   │   ├── Navbar.jsx              # Responsive navigation with blur & search
│   │   ├── Footer.jsx              # Floral brand footer & links
│   │   ├── FlowerCard.jsx          # Animated product card with hover effects
│   │   ├── CategoryCard.jsx        # Category filter cards
│   │   └── FloatingFlowers.jsx     # Framer Motion floating petals
│   ├── context/
│   │   └── CartContext.jsx         # React Context API for Cart & Wishlist
│   ├── data/
│   │   └── flowerData.js           # 16 Flower bouquets & categories
│   ├── pages/
│   │   ├── Home.jsx                # Hero, categories, features, testimonials
│   │   ├── Products.jsx            # Flower catalogue with search & sorting
│   │   ├── ProductDetails.jsx      # Product view, care guide, related items
│   │   ├── Cart.jsx                # Cart items, quantities & summary
│   │   ├── Checkout.jsx            # Checkout form & confetti celebration
│   │   ├── Orders.jsx              # Live order status & delivery tracking
│   │   ├── About.jsx               # Heritage, farm-to-vase philosophy
│   │   └── Contact.jsx             # Studio contact info & inquiry form
│   ├── App.jsx                     # Route definitions & layout
│   ├── main.jsx                    # React 19 root mounting
│   └── index.css                   # Tailwind CSS styling
│
├── package.json                    # Full-stack root scripts & dependencies
├── server.ts                       # Integrated dev server with Vite middleware
└── README.md                       # Complete documentation
```

---

## 🛠️ Technology Stack

### Frontend
- **React.js (v19)** — Component-driven declarative UI
- **Tailwind CSS (v4)** — Utility-first soft floral design palette
- **React Router DOM (v7)** — Smooth multi-page routing
- **Framer Motion** — Gentle floating petals, card hovers, page transitions
- **Axios** — HTTP client for backend REST API requests
- **Lucide React** — Modern, clean icons
- **Canvas Confetti** — Delightful checkout completion celebration

### Backend
- **Node.js & Express.js** — Fast, lightweight REST API
- **MongoDB & Mongoose** — Document-based database for products & orders
- **CORS & Dotenv** — Cross-origin requests & configuration

---

## 🚀 Local Development Setup

### 1. Unified Development (Recommended)
You can run both frontend and backend seamlessly with a single command:

```bash
# 1. Install dependencies
npm install

# 2. Run the integrated dev server (Port 3000)
npm run dev
```

### 2. Running Standalone Backend
If you want to run the standalone backend independently:

```bash
cd backend
npm install
cp .env.example .env
npm run dev
# Server will run on http://localhost:5000
```

Seed the database with sample products:
```bash
npm run seed
```

---

## 🍃 MongoDB Atlas Setup Instructions

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a free account.
2. Create a free **M0 Sandbox Cluster**.
3. Under **Security → Database Access**, add a database user (e.g. `bloomora_admin`) with a secure password.
4. Under **Security → Network Access**, add IP `0.0.0.0/0` (Allow access from anywhere).
5. Click **Connect → Drivers → Node.js** and copy your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/bloomora?retryWrites=true&w=majority
   ```
6. Paste this URI into your backend `.env` file as `MONGO_URI`.

---

## ☁️ Vercel Deployment Instructions

### A. Deploy Backend to Vercel
1. Push the repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/), click **New Project** and import your repository.
3. In **Root Directory**, click edit and select `backend`.
4. In **Environment Variables**, add:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: `production`
5. Click **Deploy**. Vercel will deploy the Express server as serverless functions.
6. Note your backend URL (e.g., `https://bloomora-backend.vercel.app`).

### B. Deploy Frontend to Vercel
1. In Vercel, create a new project with the same repository.
2. Keep the root directory as `./` (or `frontend/` if separated).
3. In **Build & Output Settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. In **Environment Variables**, add:
   - `VITE_API_URL`: Your deployed backend URL (e.g. `https://bloomora-backend.vercel.app`)
5. Click **Deploy**. Your Bloomora flower store is now live! 🌸

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | API welcome status |
| `GET` | `/api/health` | Service health status check |
| `GET` | `/api/products` | Retrieve all 16 flower arrangements |
| `GET` | `/api/products/:id` | Retrieve single flower bouquet by ID |
| `POST` | `/api/orders` | Place a customer flower order |
| `GET` | `/api/orders` | Retrieve list of placed orders |
| `GET` | `/api/orders/:id` | Retrieve single order details by ID |

---

## 🌸 License
MIT License. Crafted with love for flower lovers and budding MERN developers.
