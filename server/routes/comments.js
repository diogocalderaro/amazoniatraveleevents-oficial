import { Router } from 'express';
import { queryAll, run } from '../db/database.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', authMiddleware, (req, res) => {
  try {
    let items = queryAll('SELECT * FROM comments ORDER BY created_at DESC');
    if (req.query.approved === '1') items = items.filter(c => c.is_approved === 1);
    else if (req.query.approved === '0') items = items.filter(c => c.is_approved === 0);
    res.json(items);
  } catch (err) { res.status(500).json({ error: 'Erro' }); }
});

router.post('/', (req, res) => {
  try {
    const { package_id, package_title, author_name, author_email, content, rating, is_approved } = req.body;
    if (!author_name || !content) return res.status(400).json({ error: 'Nome e comentário obrigatórios' });
    const result = run('INSERT INTO comments (package_id, package_title, author_name, author_email, content, rating, is_approved) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [package_id || null, package_title || null, author_name, author_email || null, content, rating || 5, is_approved ? 1 : 0]);
    res.status(201).json({ id: result.lastInsertRowid, message: 'Comentário salvo' });
  } catch (err) { res.status(500).json({ error: 'Erro' }); }
});

router.put('/:id/approve', authMiddleware, (req, res) => {
  try { run('UPDATE comments SET is_approved = 1 WHERE id = ?', [req.params.id]); res.json({ message: 'Aprovado' }); }
  catch (err) { res.status(500).json({ error: 'Erro' }); }
});

router.put('/:id', authMiddleware, (req, res) => {
  try {
    const { author_name, author_email, content, rating, is_approved } = req.body;
    run('UPDATE comments SET author_name=?, author_email=?, content=?, rating=?, is_approved=? WHERE id=?',
      [author_name, author_email, content, rating, is_approved ? 1 : 0, req.params.id]);
    res.json({ message: 'Comentário atualizado' });
  } catch (err) { res.status(500).json({ error: 'Erro' }); }
});

router.put('/:id/reject', authMiddleware, (req, res) => {
  try { run('UPDATE comments SET is_approved = 0 WHERE id = ?', [req.params.id]); res.json({ message: 'Rejeitado' }); }
  catch (err) { res.status(500).json({ error: 'Erro' }); }
});

router.delete('/:id', authMiddleware, (req, res) => {
  try { run('DELETE FROM comments WHERE id = ?', [req.params.id]); res.json({ message: 'Removido' }); }
  catch (err) { res.status(500).json({ error: 'Erro' }); }
});

export default router;
