import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { queryOne, run } from '../db/database.js';
import { generateToken, authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email e senha são obrigatórios' });

    const user = queryOne('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) return res.status(401).json({ error: 'Credenciais inválidas' });

    const valid = bcrypt.compareSync(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = generateToken(user);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { console.error(err); res.status(500).json({ error: 'Erro interno' }); }
});

router.get('/me', authMiddleware, (req, res) => {
  try {
    const user = queryOne('SELECT id, name, email, role FROM users WHERE id = ?', [req.user.id]);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json({ user });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

router.put('/password', authMiddleware, (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = queryOne('SELECT * FROM users WHERE id = ?', [req.user.id]);
    if (!bcrypt.compareSync(currentPassword, user.password_hash)) return res.status(400).json({ error: 'Senha atual incorreta' });

    const hash = bcrypt.hashSync(newPassword, 10);
    run('UPDATE users SET password_hash = ? WHERE id = ?', [hash, req.user.id]);
    res.json({ message: 'Senha atualizada' });
  } catch (err) { res.status(500).json({ error: 'Erro interno' }); }
});

export default router;
