const Lead = require('../backend/models/Lead');
const db = require('../backend/dbconnection');

const payload = {
    Lead_Id: 0,
    Lead_Name: "Test Company Ltd",
    Phone: "9988776655",
    Source: 1,
    Contact_Person: "Test Person",
    Contact_Number: "9988776655",
    Designation: 1,
    Email: "test@company.com",
    State: 1,
    Lead_Priority: "Critical",
    Contact_Person_Details: [
        {
            Contact_Person: "Test Person",
            Contact_Number: "9988776655",
            Phone: "1122334455",
            Designation: 1,
            Email: "test@company.com"
        }
    ]
};

Lead.Save_Lead(payload, (err, rows) => {
    if (err) {
        console.error("Error saving lead:", err);
        process.exit(1);
    } else {
        console.log("Lead saved successfully:", rows);
        
        const leadId = rows[0][0].Key_Id;
        
        // Verify the database updated the priority and contact_person_details
        db.query("SELECT Lead_Name, Lead_Priority, Contact_Person_Details FROM `Lead` WHERE Lead_Id = ?", [leadId], (err2, result) => {
            if (err2) {
                console.error("Verification query error:", err2);
            } else {
                console.log("Verification Query Result:", result);
            }
            process.exit();
        });
    }
});
