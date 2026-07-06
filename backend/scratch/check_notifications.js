const db = require('../dbconnection');
const pool = db.promise();
async function check() {
  try {
    const [rows] = await pool.query('SHOW TABLES LIKE "notifications"');
    if(rows.length > 0) {
      console.log("Table 'notifications' exists.");
      const [cols] = await pool.query('DESCRIBE notifications');
      console.log('Columns:');
      cols.forEach(c => console.log(' - ' + c.Field + ' (' + c.Type + ')'));
    } else {
      console.log("Table 'notifications' is MISSING.");
    }
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
check();
