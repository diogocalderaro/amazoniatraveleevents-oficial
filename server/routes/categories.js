import { Router } from 'express';
import { queryAll, queryOne, run } from '../db/database.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    const categories = queryAll('SELECT * FROM blog_categories ORDER BY name ASC');
    res.json(categories);
  } catch (err) { res.status(500).json({ error: 'Erro' }); }
});

router.post('/', authMiddleware, (req, res) => {
  try {
    const { name, slug } = req.body;
    const finalSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const result = run('INSERT INTO blog_categories (name, slug) VALUES (?, ?)', [name, finalSlug]);
    res.status(201).json({ id: result.lastInsertRowid, message: 'Categoria criada' });
  } catch (err) { res.status(500).json({ error: 'Erro ao criar' }); }
});

router.put('/:id', authMiddleware, (req, res) => {
  try {
    const { name, slug } = req.body;
    run('UPDATE blog_categories SET name=?, slug=? WHERE id=?', [name, slug, req.params.id]);
    res.json({ message: 'Categoria atualizada' });
  } catch (err) { res.status(500).json({ error: 'Erro ao atualizar' }); }
});

router.delete('/:id', authMiddleware, (req, res) => {
  try {
    run('DELETE FROM blog_categories WHERE id = ?', [req.params.id]);
    res.json({ message: 'Categoria removida' });
  } catch (err) { res.status(500).json({ error: 'Erro' }); }
});

export default router;
