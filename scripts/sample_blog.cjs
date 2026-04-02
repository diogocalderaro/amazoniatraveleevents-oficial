const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('server/db/amazonia.db');
db.get("SELECT * FROM blog_posts LIMIT 1", (err, row) => {
  if (err) console.error(err);
  console.log(JSON.stringify(row));
  db.close();
});
