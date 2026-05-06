import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import { initializeDatabase } from './db/database.js';
import authRoutes from './routes/auth.js';
import packagesRoutes from './routes/packages.js';
import reservationsRoutes from './routes/reservations.js';
import blogRoutes from './routes/blog.js';
import pagesRoutes from './routes/pages.js';
import faqRoutes from './routes/faq.js';
import galleryRoutes from './routes/gallery.js';
import commentsRoutes from './routes/comments.js';
import reportsRoutes from './routes/reports.js';
import uploadRoutes from './routes/upload.js';
import categoriesRoutes from './routes/categories.js';
import asaasRoutes from './routes/asaas.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'], credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/faq', faqRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/blog-categories', categoriesRoutes);
app.use('/api/asaas', asaasRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize database and start server
initializeDatabase();

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Amazonia Admin Server running on http://localhost:${PORT}`);
    console.log(`📁 Uploads dir: ${join(__dirname, 'uploads')}`);
    console.log(`🗄️  Database: SQLite\n`);
  });
}

export default app;
