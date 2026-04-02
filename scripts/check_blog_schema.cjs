const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('server/db/amazonia.db');
db.all("PRAGMA table_info(blog_posts)", (err, info) => {
  if (err) console.error(err);
  console.log(JSON.stringify(info));
  db.close();
});
