import { Router } from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

const isVercel = !!process.env.VERCEL;

const uploadsDir = join(__dirname, '..', 'uploads');
if (!isVercel && !existsSync(uploadsDir)) {
  mkdirSync(uploadsDir, { recursive: true });
}

let storage;
if (isVercel) {
  storage = multer.memoryStorage();
} else {
  storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadsDir),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + extname(file.originalname));
    }
  });
}

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.post('/', upload.single('file'), (req, res) => {
  try {
    if (isVercel) {
      return res.json({ url: `https://placehold.co/800x600?text=Upload+Demo`, filename: 'demo.png', originalname: 'demo.png' });
    }
    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    const url = `/uploads/${req.file.filename}`;
    res.json({ url, filename: req.file.filename, originalname: req.file.originalname });
  } catch (err) { res.status(500).json({ error: 'Erro no upload' }); }
});

router.post('/multiple', upload.array('files', 10), (req, res) => {
  try {
    if (isVercel) {
       const files = (req.files || []).map((f, i) => ({ url: `https://placehold.co/800x600?text=Upload+Demo+${i}`, filename: `demo${i}.png`, originalname: `demo${i}.png` }));
       return res.json({ files: files.length ? files : [{ url: 'https://placehold.co/800x600?text=Upload+Demo', filename: 'demo.png', originalname: 'demo.png' }] });
    }
    if (!req.files?.length) return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    const files = req.files.map(f => ({ url: `/uploads/${f.filename}`, filename: f.filename, originalname: f.originalname }));
    res.json({ files });
  } catch (err) { res.status(500).json({ error: 'Erro no upload' }); }
});

export default router;
