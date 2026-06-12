const mysql = require('mysql2/promise');
mysql.createConnection({host: 'localhost', user: 'root', password: 'root123', database: 'neotronics_db'}).then(async c => {
    try {
        // Simulate what the Quotation Confirmation page does:
        // Search today's quotations (Is_Date_Check_=1, today's date)
        const today = '2026-06-01';
        const [rows] = await c.query('CALL Search_Quotation(1, ?, ?, 0, "", "", 0, 0, 0, 1, 0)', [today, today]);
        const data = rows[0];

        console.log(`Total records returned: ${data.length}`);

        // Apply the same normalization logic as the frontend
        data.forEach(q => {
            if (q.Status_Id !== undefined && q.Status_Id !== null) {
                const sid = parseInt(q.Status_Id);
                if (sid === 1) {
                    if (q.workflow_status === 'CONFIRMED' || q.Status == 5) {
                        q._normalizedStatus = 5; q._normalizedName = 'Confirmed';
                    } else {
                        q._normalizedStatus = 2; q._normalizedName = 'Pending';
                    }
                } else if (sid === 2) {
                    if (q.workflow_status === 'CONFIRMED' || q.Status == 5) {
                        q._normalizedStatus = 5; q._normalizedName = 'Confirmed';
                    } else {
                        q._normalizedStatus = 3; q._normalizedName = 'Approved';
                    }
                } else if (sid === 3) {
                    q._normalizedStatus = 4; q._normalizedName = 'Rejected';
                }
            } else {
                const statusVal = parseInt(q.Status);
                if (statusVal === 1 || statusVal === 2) {
                    q._normalizedStatus = 2; q._normalizedName = 'Pending';  // fixed: Status=1 → Pending
                } else if (statusVal === 3) {
                    q._normalizedStatus = q.workflow_status === 'CONFIRMED' ? 5 : 3;
                    q._normalizedName = q.workflow_status === 'CONFIRMED' ? 'Confirmed' : 'Approved';
                } else if (statusVal === 4) {
                    q._normalizedStatus = 4; q._normalizedName = 'Rejected';
                } else if (statusVal === 5) {
                    q._normalizedStatus = 5; q._normalizedName = 'Confirmed';
                }
            }
        });

        // Count by status
        const counts = {};
        data.forEach(q => {
            const name = q._normalizedName || 'Unknown';
            counts[name] = (counts[name] || 0) + 1;
        });

        console.log('\n📊 Quotations by Status after normalization:');
        Object.entries(counts).forEach(([name, count]) => {
            console.log(`  ${name}: ${count}`);
        });

        // Show what "Pending" filter would return
        const pendingItems = data.filter(q => q._normalizedStatus === 2);
        console.log(`\n✅ Selecting "Pending" would show ${pendingItems.length} records`);
        if (pendingItems.length > 0) {
            console.log('   Sample:', JSON.stringify(pendingItems.slice(0, 3).map(q => ({
                QuotationNo: q.QuotationNo,
                Status: q.Status,
                Status_Id: q.Status_Id,
                workflow_status: q.workflow_status,
                _normalized: q._normalizedName
            })), null, 2));
        }
    } catch (e) {
        console.error(e);
    } finally {
        c.end();
    }
}).catch(console.error);
