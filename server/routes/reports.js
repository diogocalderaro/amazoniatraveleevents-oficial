import { Router } from 'express';
import { queryAll, queryOne } from '../db/database.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/dashboard', authMiddleware, (req, res) => {
  try {
    const reservations = queryAll('SELECT * FROM reservations');
    const totalReservations = reservations.length;
    const pendingReservations = reservations.filter(r => r.status === 'pendente').length;
    const confirmedReservations = reservations.filter(r => r.status === 'confirmada').length;
    const totalRevenue = reservations.filter(r => ['confirmada', 'concluida'].includes(r.status)).reduce((a, r) => a + (r.total_price || 0), 0);
    const totalPackages = queryAll('SELECT id FROM packages WHERE is_active = 1').length;
    const totalBlogPosts = queryAll('SELECT id FROM blog_posts WHERE is_published = 1').length;
    const pendingComments = queryAll('SELECT id FROM comments WHERE is_approved = 0').length;

    const recentReservations = queryAll('SELECT * FROM reservations ORDER BY created_at DESC').slice(0, 5);

    // Monthly revenue
    const confirmed = reservations.filter(r => ['confirmada', 'concluida'].includes(r.status));
    const monthMap = {};
    confirmed.forEach(r => {
      const month = (r.created_at || '').substring(0, 7);
      if (month) {
        if (!monthMap[month]) monthMap[month] = { month, revenue: 0, count: 0 };
        monthMap[month].revenue += r.total_price || 0;
        monthMap[month].count++;
      }
    });
    const monthlyRevenue = Object.values(monthMap).sort((a, b) => a.month.localeCompare(b.month)).slice(-6);

    // Top packages
    const pkgMap = {};
    reservations.forEach(r => {
      if (r.package_title) {
        if (!pkgMap[r.package_title]) pkgMap[r.package_title] = { package_title: r.package_title, reservations: 0, revenue: 0 };
        pkgMap[r.package_title].reservations++;
        pkgMap[r.package_title].revenue += r.total_price || 0;
      }
    });
    const topPackages = Object.values(pkgMap).sort((a, b) => b.reservations - a.reservations).slice(0, 5);

    res.json({ stats: { totalReservations, pendingReservations, confirmedReservations, totalRevenue, totalPackages, totalBlogPosts, pendingComments }, recentReservations, monthlyRevenue, topPackages });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro' }); }
});

router.get('/sales', authMiddleware, (req, res) => {
  try {
    let sales = queryAll("SELECT * FROM reservations WHERE status IN ('confirmada', 'concluida') ORDER BY created_at DESC");
    const { from, to } = req.query;
    if (from) sales = sales.filter(s => s.created_at >= from);
    if (to) sales = sales.filter(s => s.created_at <= to);
    const totalRevenue = sales.reduce((a, s) => a + (s.total_price || 0), 0);
    res.json({ sales, totalRevenue, count: sales.length });
  } catch (err) { res.status(500).json({ error: 'Erro' }); }
});

export default router;
