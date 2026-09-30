import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import productRoutes from './backend/routes/productRoutes.js';
import orderRoutes from './backend/routes/orderRoutes.js';
import connectDB from './backend/config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Initialize MongoDB connection (optional in dev, uses graceful fallback if not set)
  try {
    await connectDB();
  } catch (err) {
    console.warn('MongoDB connection skipped, using local data store:', err);
  }

  // Basic middleware
  app.use(cors());
  app.use(express.json());

  // API Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Bloomora API is healthy', time: new Date().toISOString() });
  });

  // API Root route
  app.get('/api', (req, res) => {
    res.json({ message: 'Bloomora API is running' });
  });

  // Mount backend routes
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);

  // In development, hook up Vite dev server middlewares
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static built files
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌸 Bloomora server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
