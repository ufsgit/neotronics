const db = require('./dbconnection');

const expectedColumns = [
    'CurrencyId',
    'Delivery_Address1',
    'Delivery_Address2',
    'Delivery_Address3',
    'Delivery_Address4',
    'PaymentTermValue',
    'KindAttendId',
    'Basic_Discount',
    'Transportation_Gst',
    'Handling_Gst',
    'Roundoff_Amt',
    'Mobile_No',
    'PreparedBy',
    'VAT_Percentage',
    'VAT_Amount',
    'TaxableAmount',
    'Supplier_Ref_No'
];

async function fixSchema() {
    const pool = db.promise();
    try {
        const [rows] = await pool.query('DESCRIBE requirementmaster');
        const existingColumns = rows.map(r => r.Field);
        
        for (const col of expectedColumns) {
            if (!existingColumns.includes(col)) {
                console.log(`Adding missing column: ${col}`);
                let type = 'varchar(255)';
                if (col.includes('Amount') || col.includes('Gst') || col.includes('Discount') || col.includes('Amt') || col.includes('Total') || col.includes('Percentage')) {
                    type = 'decimal(18,3)';
                } else if (col.includes('Id') || col.includes('Value')) {
                    type = 'int';
                }
                
                await pool.query(`ALTER TABLE requirementmaster ADD COLUMN ${col} ${type} NULL`);
            } else {
                console.log(`Column already exists: ${col}`);
            }
        }
        console.log('Schema fix completed.');
    } catch (err) {
        console.error('Error fixing schema:', err.message);
    }
    process.exit();
}

fixSchema();
