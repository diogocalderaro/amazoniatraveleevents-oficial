import { Router } from 'express';
import { queryAll, queryOne, run } from '../db/database.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', authMiddleware, (req, res) => {
  try {
    const reservations = queryAll('SELECT * FROM reservations ORDER BY created_at DESC');
    const { status, search } = req.query;
    let filtered = reservations;
    if (status && status !== 'todos') filtered = filtered.filter(r => r.status === status);
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(r => (r.customer_name || '').toLowerCase().includes(s) || (r.customer_email || '').toLowerCase().includes(s) || (r.customer_phone || '').includes(s) || (r.package_title || '').toLowerCase().includes(s));
    }
    res.json({ reservations: filtered, total: filtered.length });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao buscar' }); }
});

router.get('/:id', authMiddleware, (req, res) => {
  try {
    const r = queryOne('SELECT * FROM reservations WHERE id = ?', [req.params.id]);
    if (!r) return res.status(404).json({ error: 'Não encontrada' });
    res.json(r);
  } catch (err) { res.status(500).json({ error: 'Erro' }); }
});

router.post('/', (req, res) => {
  try {
    const { package_id, package_title, customer_name, customer_email, customer_phone, guests, travel_date, notes, total_price } = req.body;
    if (!customer_name || !customer_phone) return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
    const result = run('INSERT INTO reservations (package_id, package_title, customer_name, customer_email, customer_phone, guests, travel_date, notes, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [package_id, package_title, customer_name, customer_email, customer_phone, guests || 1, travel_date, notes, total_price || 0]);
    res.status(201).json({ id: result.lastInsertRowid, message: 'Reserva criada' });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao criar' }); }
});

router.put('/:id/status', authMiddleware, (req, res) => {
  try {
    const { status } = req.body;
    if (!['pendente', 'confirmada', 'cancelada', 'concluida'].includes(status)) return res.status(400).json({ error: 'Status inválido' });
    run('UPDATE reservations SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ message: 'Status atualizado' });
  } catch (err) { res.status(500).json({ error: 'Erro' }); }
});

router.delete('/:id', authMiddleware, (req, res) => {
  try { run('DELETE FROM reservations WHERE id = ?', [req.params.id]); res.json({ message: 'Removida' }); }
  catch (err) { res.status(500).json({ error: 'Erro' }); }
});

export default router;
