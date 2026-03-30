import { Router } from 'express';
import { queryAll, queryOne, run } from '../db/database.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    let posts = queryAll('SELECT * FROM blog_posts ORDER BY created_at DESC');
    if (req.query.published === '1') posts = posts.filter(p => p.is_published);
    if (req.query.category) posts = posts.filter(p => p.category === req.query.category);
    res.json({ posts, total: posts.length });
  } catch (err) { res.status(500).json({ error: 'Erro' }); }
});

router.get('/:id', (req, res) => {
  try {
    const post = queryOne('SELECT * FROM blog_posts WHERE id = ?', [req.params.id]) || queryOne('SELECT * FROM blog_posts WHERE slug = ?', [req.params.id]);
    if (!post) return res.status(404).json({ error: 'Não encontrado' });
    res.json(post);
  } catch (err) { res.status(500).json({ error: 'Erro' }); }
});

router.post('/', authMiddleware, (req, res) => {
  try {
    const { title, slug, excerpt, content, image_url, author, category, is_published } = req.body;
    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const result = run('INSERT INTO blog_posts (slug, title, excerpt, content, image_url, author, category, is_published) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [finalSlug, title, excerpt, content, image_url, author || 'Admin', category, is_published ? 1 : 0]);
    res.status(201).json({ id: result.lastInsertRowid, message: 'Post criado' });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao criar' }); }
});

router.put('/:id', authMiddleware, (req, res) => {
  try {
    const { title, slug, excerpt, content, image_url, author, category, is_published } = req.body;
    run('UPDATE blog_posts SET title=?, slug=?, excerpt=?, content=?, image_url=?, author=?, category=?, is_published=?, updated_at=CURRENT_TIMESTAMP WHERE id=?',
      [title, slug, excerpt, content, image_url, author, category, is_published ? 1 : 0, req.params.id]);
    res.json({ message: 'Post atualizado' });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao atualizar' }); }
});

router.delete('/:id', authMiddleware, (req, res) => {
  try { run('DELETE FROM blog_posts WHERE id = ?', [req.params.id]); res.json({ message: 'Post removido' }); }
  catch (err) { res.status(500).json({ error: 'Erro' }); }
});

export default router;
