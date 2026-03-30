import { Router } from 'express';
import { queryAll, run } from '../db/database.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    let items = queryAll('SELECT * FROM faq ORDER BY sort_order, created_at DESC');
    if (req.query.active === '1') items = items.filter(i => i.is_active);
    res.json(items);
  } catch (err) { res.status(500).json({ error: 'Erro' }); }
});

router.post('/', authMiddleware, (req, res) => {
  try {
    const { question, answer, category, sort_order } = req.body;
    const result = run('INSERT INTO faq (question, answer, category, sort_order) VALUES (?, ?, ?, ?)', [question, answer, category || 'Geral', sort_order || 0]);
    res.status(201).json({ id: result.lastInsertRowid, message: 'Criada' });
  } catch (err) { res.status(500).json({ error: 'Erro' }); }
});

router.put('/:id', authMiddleware, (req, res) => {
  try {
    const { question, answer, category, sort_order, is_active } = req.body;
    run('UPDATE faq SET question=?, answer=?, category=?, sort_order=?, is_active=? WHERE id=?', [question, answer, category, sort_order, is_active ?? 1, req.params.id]);
    res.json({ message: 'Atualizada' });
  } catch (err) { res.status(500).json({ error: 'Erro' }); }
});

router.delete('/:id', authMiddleware, (req, res) => {
  try { run('DELETE FROM faq WHERE id = ?', [req.params.id]); res.json({ message: 'Removida' }); }
  catch (err) { res.status(500).json({ error: 'Erro' }); }
});

export default router;
