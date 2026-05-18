const db = require('./dbconnection');

async function checkAndAddColumn(pool, tableName, columnName, colDefinition) {
    try {
        const [rows] = await pool.query(`DESCRIBE \`${tableName}\``);
        const existingColumns = rows.map(r => r.Field.toLowerCase());
        
        if (!existingColumns.includes(columnName.toLowerCase())) {
            console.log(`Adding missing column ${columnName} to table ${tableName}...`);
            await pool.query(`ALTER TABLE \`${tableName}\` ADD COLUMN \`${columnName}\` ${colDefinition}`);
            console.log(`Successfully added ${columnName} to ${tableName}.`);
        } else {
            console.log(`Column ${columnName} already exists in table ${tableName}.`);
        }
    } catch (err) {
        console.error(`Error checking/adding column ${columnName} to table ${tableName}:`, err.message);
    }
}

async function run() {
    const pool = db.promise();
    
    // Add columns to Item table
    await checkAndAddColumn(pool, 'Item', 'gst', 'decimal(18,4) NULL DEFAULT 0');
    await checkAndAddColumn(pool, 'Item', 'cgst', 'decimal(18,4) NULL DEFAULT 0');
    await checkAndAddColumn(pool, 'Item', 'sgst', 'decimal(18,4) NULL DEFAULT 0');
    await checkAndAddColumn(pool, 'Item', 'igst', 'decimal(18,4) NULL DEFAULT 0');
    await checkAndAddColumn(pool, 'Item', 'b2b_rate', 'decimal(18,4) NULL DEFAULT 0');
    await checkAndAddColumn(pool, 'Item', 'b2c_rate', 'decimal(18,4) NULL DEFAULT 0');
    
    // Add columns to requirementdetails table
    await checkAndAddColumn(pool, 'requirementdetails', 'part_number', 'varchar(100) NULL');
    await checkAndAddColumn(pool, 'requirementdetails', 'gst', 'decimal(18,4) NULL DEFAULT 0');
    await checkAndAddColumn(pool, 'requirementdetails', 'cgst', 'decimal(18,4) NULL DEFAULT 0');
    await checkAndAddColumn(pool, 'requirementdetails', 'sgst', 'decimal(18,4) NULL DEFAULT 0');
    await checkAndAddColumn(pool, 'requirementdetails', 'igst', 'decimal(18,4) NULL DEFAULT 0');
    await checkAndAddColumn(pool, 'requirementdetails', 'b2b_rate', 'decimal(18,4) NULL DEFAULT 0');
    await checkAndAddColumn(pool, 'requirementdetails', 'b2c_rate', 'decimal(18,4) NULL DEFAULT 0');

    // Backfill columns
    try {
        console.log("Backfilling Sales_Tax to gst in Item...");
        await pool.query("UPDATE `Item` SET `gst` = COALESCE(`gst`, `Sales_Tax`, 0) WHERE `gst` = 0 OR `gst` IS NULL");
        console.log("Successfully backfilled Item table.");
    } catch (err) {
        console.error("Error backfilling Item table:", err.message);
    }

    try {
        console.log("Backfilling SaleTax to gst in requirementdetails...");
        await pool.query("UPDATE `requirementdetails` SET `gst` = COALESCE(`gst`, `SaleTax`, 0) WHERE `gst` = 0 OR `gst` IS NULL");
        console.log("Successfully backfilled requirementdetails table.");
    } catch (err) {
        console.error("Error backfilling requirementdetails table:", err.message);
    }

    console.log("Schema update completed successfully.");
    process.exit(0);
}

run();
