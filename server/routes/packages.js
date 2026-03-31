import { Router } from 'express';
import { queryAll, queryOne, run } from '../db/database.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', (req, res) => {
  try {
    const packages = queryAll('SELECT * FROM packages ORDER BY created_at DESC');
    res.json(packages);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao buscar pacotes' }); }
});

router.get('/:id', (req, res) => {
  try {
    const pkg = queryOne('SELECT * FROM packages WHERE id = ?', [req.params.id]);
    if (!pkg) return res.status(404).json({ error: 'Pacote não encontrado' });
    pkg.highlights = queryAll('SELECT * FROM package_highlights WHERE package_id = ? ORDER BY sort_order', [pkg.id]);
    pkg.itinerary = queryAll('SELECT * FROM package_itinerary WHERE package_id = ? ORDER BY sort_order', [pkg.id]);
    pkg.included = queryAll('SELECT * FROM package_included WHERE package_id = ?', [pkg.id]);
    pkg.excluded = queryAll('SELECT * FROM package_excluded WHERE package_id = ?', [pkg.id]);
    pkg.gallery = queryAll('SELECT * FROM package_gallery WHERE package_id = ? ORDER BY sort_order', [pkg.id]);
    pkg.features = queryAll('SELECT * FROM package_features WHERE package_id = ?', [pkg.id]);
    res.json(pkg);
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao buscar pacote' }); }
});

router.post('/', authMiddleware, (req, res) => {
  try {
    const { title, slug, location, price, price_display, old_price, installments, installment_price, duration, category, description, image_url, highlights, itinerary, included, excluded, features } = req.body;
    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const result = run('INSERT INTO packages (slug, title, location, price, price_display, old_price, installments, installment_price, duration, category, description, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [finalSlug, title, location, price || 0, price_display || null, old_price || null, installments || null, installment_price || null, duration || null, category || null, description || null, image_url || null]);
    const pkgId = result.lastInsertRowid;
    if (highlights?.length) highlights.forEach((h, i) => run('INSERT INTO package_highlights (package_id, text, sort_order) VALUES (?, ?, ?)', [pkgId, h, i]));
    if (itinerary?.length) itinerary.forEach((it, i) => run('INSERT INTO package_itinerary (package_id, day, title, description, sort_order) VALUES (?, ?, ?, ?, ?)', [pkgId, it.day, it.title, it.description, i]));
    if (included?.length) included.forEach(t => run('INSERT INTO package_included (package_id, text) VALUES (?, ?)', [pkgId, t]));
    if (excluded?.length) excluded.forEach(t => run('INSERT INTO package_excluded (package_id, text) VALUES (?, ?)', [pkgId, t]));
    if (features?.length) features.forEach(f => run('INSERT INTO package_features (package_id, text) VALUES (?, ?)', [pkgId, f]));
    res.status(201).json({ id: pkgId, message: 'Pacote criado' });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao criar pacote' }); }
});

router.put('/:id', authMiddleware, (req, res) => {
  try {
    const { title, slug, location, price, price_display, old_price, installments, installment_price, duration, category, description, image_url, is_active, highlights, itinerary, included, excluded, features } = req.body;
    const pkgId = parseInt(req.params.id);
    run('UPDATE packages SET title=?, slug=?, location=?, price=?, price_display=?, old_price=?, installments=?, installment_price=?, duration=?, category=?, description=?, image_url=?, is_active=?, updated_at=CURRENT_TIMESTAMP WHERE id=?',
      [title, slug || null, location, price || 0, price_display || null, old_price || null, installments || null, installment_price || null, duration || null, category || null, description || null, image_url || null, is_active ?? 1, pkgId]);
    run('DELETE FROM package_highlights WHERE package_id = ?', [pkgId]);
    run('DELETE FROM package_itinerary WHERE package_id = ?', [pkgId]);
    run('DELETE FROM package_included WHERE package_id = ?', [pkgId]);
    run('DELETE FROM package_excluded WHERE package_id = ?', [pkgId]);
    run('DELETE FROM package_features WHERE package_id = ?', [pkgId]);
    if (highlights?.length) highlights.forEach((h, i) => run('INSERT INTO package_highlights (package_id, text, sort_order) VALUES (?, ?, ?)', [pkgId, h, i]));
    if (itinerary?.length) itinerary.forEach((it, i) => run('INSERT INTO package_itinerary (package_id, day, title, description, sort_order) VALUES (?, ?, ?, ?, ?)', [pkgId, it.day, it.title, it.description, i]));
    if (included?.length) included.forEach(t => run('INSERT INTO package_included (package_id, text) VALUES (?, ?)', [pkgId, t]));
    if (excluded?.length) excluded.forEach(t => run('INSERT INTO package_excluded (package_id, text) VALUES (?, ?)', [pkgId, t]));
    if (features?.length) features.forEach(f => run('INSERT INTO package_features (package_id, text) VALUES (?, ?)', [pkgId, f]));
    res.json({ message: 'Pacote atualizado' });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro ao atualizar pacote' }); }
});

router.delete('/:id', authMiddleware, (req, res) => {
  try { run('DELETE FROM packages WHERE id = ?', [req.params.id]); res.json({ message: 'Pacote removido' }); }
  catch (err) { res.status(500).json({ error: 'Erro ao remover' }); }
});

router.patch('/:id/toggle', authMiddleware, (req, res) => {
  try {
    const pkg = queryOne('SELECT is_active FROM packages WHERE id = ?', [req.params.id]);
    if (!pkg) return res.status(404).json({ error: 'Não encontrado' });
    run('UPDATE packages SET is_active = ? WHERE id = ?', [pkg.is_active ? 0 : 1, req.params.id]);
    res.json({ message: 'Status alterado', is_active: !pkg.is_active });
  } catch (err) { res.status(500).json({ error: 'Erro' }); }
});

export default router;
