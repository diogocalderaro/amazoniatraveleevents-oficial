import { Router } from 'express';
import { queryAll, queryOne, run } from '../db/database.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', (req, res) => {
  try { res.json(queryAll('SELECT * FROM pages ORDER BY title')); }
  catch (err) { res.status(500).json({ error: 'Erro' }); }
});

router.get('/:slug', (req, res) => {
  try {
    const page = queryOne('SELECT * FROM pages WHERE slug = ?', [req.params.slug]);
    if (!page) return res.status(404).json({ error: 'Não encontrada' });
    res.json(page);
  } catch (err) { res.status(500).json({ error: 'Erro' }); }
});

router.put('/:slug', authMiddleware, (req, res) => {
  try {
    const { title, content_json } = req.body;
    run('UPDATE pages SET title = ?, content_json = ?, updated_at = CURRENT_TIMESTAMP WHERE slug = ?', [title, content_json, req.params.slug]);
    res.json({ message: 'Página atualizada' });
  } catch (err) { res.status(500).json({ error: 'Erro' }); }
});

export default router;
