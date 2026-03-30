import initSqlJs from 'sql.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'amazonia.db');
let db = null;
const isVercel = !!process.env.VERCEL;

function saveDb() {
  if (db && !isVercel) {
    const data = db.export();
    const buffer = Buffer.from(data);
    writeFileSync(dbPath, buffer);
  }
}

// Auto-save every 30 seconds
if (!isVercel) {
  setInterval(saveDb, 30000);
}

export async function initializeDatabase() {
  const SQL = await initSqlJs();

  if (!isVercel && existsSync(dbPath)) {
    const fileBuffer = readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  db.run('PRAGMA foreign_keys = ON');

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      location TEXT NOT NULL,
      price REAL NOT NULL DEFAULT 0,
      price_display TEXT,
      old_price REAL,
      installments INTEGER,
      installment_price REAL,
      duration TEXT,
      category TEXT,
      description TEXT,
      image_url TEXT,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`CREATE TABLE IF NOT EXISTS package_highlights (id INTEGER PRIMARY KEY AUTOINCREMENT, package_id INTEGER NOT NULL, text TEXT NOT NULL, sort_order INTEGER DEFAULT 0, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE)`);
  db.run(`CREATE TABLE IF NOT EXISTS package_itinerary (id INTEGER PRIMARY KEY AUTOINCREMENT, package_id INTEGER NOT NULL, day TEXT NOT NULL, title TEXT NOT NULL, description TEXT, sort_order INTEGER DEFAULT 0, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE)`);
  db.run(`CREATE TABLE IF NOT EXISTS package_included (id INTEGER PRIMARY KEY AUTOINCREMENT, package_id INTEGER NOT NULL, text TEXT NOT NULL, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE)`);
  db.run(`CREATE TABLE IF NOT EXISTS package_excluded (id INTEGER PRIMARY KEY AUTOINCREMENT, package_id INTEGER NOT NULL, text TEXT NOT NULL, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE)`);
  db.run(`CREATE TABLE IF NOT EXISTS package_gallery (id INTEGER PRIMARY KEY AUTOINCREMENT, package_id INTEGER NOT NULL, image_url TEXT NOT NULL, sort_order INTEGER DEFAULT 0, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE)`);
  db.run(`CREATE TABLE IF NOT EXISTS package_features (id INTEGER PRIMARY KEY AUTOINCREMENT, package_id INTEGER NOT NULL, text TEXT NOT NULL, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE CASCADE)`);

  db.run(`
    CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      content_json TEXT DEFAULT '{}',
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      package_id INTEGER,
      package_title TEXT,
      customer_name TEXT NOT NULL,
      customer_email TEXT,
      customer_phone TEXT NOT NULL,
      guests INTEGER DEFAULT 1,
      travel_date TEXT,
      status TEXT DEFAULT 'pendente',
      notes TEXT,
      total_price REAL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE SET NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT,
      content TEXT,
      image_url TEXT,
      author TEXT DEFAULT 'Admin',
      category TEXT,
      is_published INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`CREATE TABLE IF NOT EXISTS faq (id INTEGER PRIMARY KEY AUTOINCREMENT, question TEXT NOT NULL, answer TEXT NOT NULL, category TEXT DEFAULT 'Geral', sort_order INTEGER DEFAULT 0, is_active INTEGER DEFAULT 1, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
  db.run(`CREATE TABLE IF NOT EXISTS gallery (id INTEGER PRIMARY KEY AUTOINCREMENT, image_url TEXT NOT NULL, caption TEXT, category TEXT DEFAULT 'Geral', sort_order INTEGER DEFAULT 0, is_active INTEGER DEFAULT 1, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
  db.run(`CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, package_id INTEGER, package_title TEXT, author_name TEXT NOT NULL, author_email TEXT, content TEXT NOT NULL, rating INTEGER DEFAULT 5, is_approved INTEGER DEFAULT 0, created_at DATETIME DEFAULT CURRENT_TIMESTAMP, FOREIGN KEY (package_id) REFERENCES packages(id) ON DELETE SET NULL)`);

  // Seed admin user
  const existingAdmin = db.exec("SELECT id FROM users WHERE email = 'admin@amazoniatravel.com'");
  if (!existingAdmin.length || !existingAdmin[0].values.length) {
    const hash = bcrypt.hashSync('admin123', 10);
    db.run('INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)', ['Administrador', 'admin@amazoniatravel.com', hash, 'admin']);
    console.log('✅ Admin user created: admin@amazoniatravel.com / admin123');
  }

  // Seed pages
  const existingPages = db.exec('SELECT id FROM pages LIMIT 1');
  if (!existingPages.length || !existingPages[0].values.length) {
    db.run('INSERT INTO pages (slug, title, content_json) VALUES (?, ?, ?)', ['about', 'Quem Somos', JSON.stringify({ html: '' })]);
    db.run('INSERT INTO pages (slug, title, content_json) VALUES (?, ?, ?)', ['how-to-buy', 'Como Comprar', JSON.stringify({ html: '' })]);
    console.log('✅ Default pages seeded');
  }

  // Seed reservations
  const existingRes = db.exec('SELECT id FROM reservations LIMIT 1');
  if (!existingRes.length || !existingRes[0].values.length) {
    db.run(`INSERT INTO reservations (package_title, customer_name, customer_email, customer_phone, guests, travel_date, status, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, ['Passeio Turístico Regional', 'Maria Silva', 'maria@email.com', '(92) 99999-1234', 2, '2026-04-15', 'pendente', 700]);
    db.run(`INSERT INTO reservations (package_title, customer_name, customer_email, customer_phone, guests, travel_date, status, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, ['Excursão de Compras em Lethem', 'João Santos', 'joao@email.com', '(92) 98888-5678', 1, '2026-03-27', 'confirmada', 350]);
    db.run(`INSERT INTO reservations (package_title, customer_name, customer_email, customer_phone, guests, travel_date, status, total_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, ['Excursão de Páscoa - Lago Robertinho', 'Ana Costa', 'ana@email.com', '(92) 97777-9012', 3, '2026-04-02', 'pendente', 2340]);
    console.log('✅ Sample reservations seeded');
  }

  // Seed FAQ
  const existingFaq = db.exec('SELECT id FROM faq LIMIT 1');
  if (!existingFaq.length || !existingFaq[0].values.length) {
    db.run('INSERT INTO faq (question, answer, category, sort_order) VALUES (?, ?, ?, ?)', ['Como faço para reservar um pacote?', 'Você pode reservar pelo site clicando em "Reservar" no pacote desejado, ou entrar em contato pelo WhatsApp.', 'Reservas', 1]);
    db.run('INSERT INTO faq (question, answer, category, sort_order) VALUES (?, ?, ?, ?)', ['Quais formas de pagamento são aceitas?', 'Aceitamos PIX, cartão de crédito (parcelado) e transferência bancária.', 'Pagamento', 2]);
    db.run('INSERT INTO faq (question, answer, category, sort_order) VALUES (?, ?, ?, ?)', ['Posso cancelar minha reserva?', 'Sim, cancelamentos podem ser feitos até 48h antes da data de viagem. Consulte nossa política de cancelamento.', 'Reservas', 3]);
    console.log('✅ Sample FAQ seeded');
  }

  saveDb();
  console.log('✅ Database initialized successfully');
}

// Helper functions for sql.js compatibility
export function getDb() {
  return db;
}

export function queryAll(sql, params = []) {
  const result = db.exec(sql, params);
  if (!result.length) return [];
  const columns = result[0].columns;
  return result[0].values.map(row => {
    const obj = {};
    columns.forEach((col, i) => { obj[col] = row[i]; });
    return obj;
  });
}

export function queryOne(sql, params = []) {
  const results = queryAll(sql, params);
  return results.length ? results[0] : null;
}

export function run(sql, params = []) {
  db.run(sql, params);
  saveDb();
  return { lastInsertRowid: db.exec('SELECT last_insert_rowid()')[0]?.values[0]?.[0] };
}

export function runNoSave(sql, params = []) {
  db.run(sql, params);
}

export function save() {
  saveDb();
}
