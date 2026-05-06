const mysql = require('mysql2');
const c = mysql.createConnection({host:'localhost',user:'root',password:'root',database:'neotronics_new'});
c.connect();
c.query("DESCRIBE sales_order_master", (e, r) => {
  if(e) { console.log('sales_order_master error:', e.message); }
  else { console.log('=== sales_order_master ==='); r.forEach(col => console.log(col.Field, col.Type, col.Null, col.Key)); }
  c.query("DESCRIBE sales_order_details", (e2, r2) => {
    if(e2) { console.log('sales_order_details error:', e2.message); }
    else { console.log('=== sales_order_details ==='); r2.forEach(col => console.log(col.Field, col.Type, col.Null, col.Key)); }
    c.end();
  });
});
