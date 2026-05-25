const requirementmaster = require('../backend/models/requirementmaster');
const fs = require('fs');

async function testSave() {
    try {
        const bodyContent = fs.readFileSync('req_body.json', 'utf8');
        const payload = JSON.parse(bodyContent);
        
        console.log("Testing Save_Requirement with payload from req_body.json...");
        console.log("AttendEmployee value in payload:", payload.AttendEmployee);
        
        const result = await requirementmaster.Save_Requirement(payload);
        console.log("Success! Result:", result);
        process.exit(0);
    } catch (err) {
        console.error("Failed to execute Save_Requirement:", err);
        process.exit(1);
    }
}

testSave();
