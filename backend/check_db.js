const mysql = require('mysql2');
const c = mysql.createConnection({host:'localhost',user:'root',password:'root',database:'neotronics_new'});
c.connect();
c.query("SHOW TABLES", (e, r) => {
  if(e) { console.log('Error showing tables:', e.message); }
  else { 
    console.log('=== Tables in neotronics_new ==='); 
    r.forEach(row => console.log(Object.values(row)[0])); 
  }
  c.end();
});
