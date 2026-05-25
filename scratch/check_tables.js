const db = require('../backend/dbconnection');

db.query("DESCRIBE price_response_detail;", (err, res) => {
    if (err) {
        console.error("Error describing price_response_detail:", err.message);
    } else {
        console.log("price_response_detail columns:", res.map(r => r.Field));
    }
    
    db.query("DESCRIBE stock;", (err2, res2) => {
        if (err2) {
            console.error("Error describing stock:", err2.message);
        } else {
            console.log("stock columns:", res2.map(r => r.Field));
        }
        process.exit();
    });
});
