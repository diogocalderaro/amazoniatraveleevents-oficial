const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('server/db/amazonia.db');
db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
  if (err) console.error(err);
  console.log(JSON.stringify(tables));
  db.close();
});
