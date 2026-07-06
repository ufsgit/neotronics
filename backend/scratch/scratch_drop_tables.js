const mysql = require('mysql2/promise');

async function main() {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root123",
        database: "neo"
    });

    try {
        const tablesToDrop = [
            "website_widgets", "drip_enrollments", "integrations", "ivr_call_logs", "ivr_flows", "messages", "opt_in_links", "orders", "products", "rcs_campaigns", "rcs_templates", "sms_campaigns", "sms_dlt_templates", "templates", "users", "affiliate_referrals", "affiliates", "analytics", "broadcast_logs", "broadcasts", "businesses", "chatbot_sessions", "chatbots", "contacts", "conversations", "ctwa_clicks", "ctwa_links", "drip_campaigns"
        ];
        
        await connection.query('SET FOREIGN_KEY_CHECKS = 0;');
        for (const table of tablesToDrop) {
            await connection.query(`DROP TABLE IF EXISTS \`${table}\``);
            console.log(`Dropped table: ${table}`);
        }
        await connection.query('SET FOREIGN_KEY_CHECKS = 1;');
        console.log("Successfully cleaned up accidentally imported tables.");
    } catch (e) {
        console.error(e);
    } finally {
        await connection.end();
    }
}
main();
