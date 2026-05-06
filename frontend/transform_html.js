const fs = require('fs');
const path = require('path');

const srcPath = 'd:/Afsal_projects/neotronics/neotronics_frontend/src/app/modules/admin/Quotation/Quotation.component.html';
const destPath = 'd:/Afsal_projects/neotronics/neotronics_frontend/src/app/modules/admin/Requirement/Requirement.component.html';

console.log('Checking source file at:', srcPath);
if (!fs.existsSync(srcPath)) {
    console.error('Source file NOT found!');
    process.exit(1);
}

let content = fs.readFileSync(srcPath, 'utf8');
console.log('Read', content.length, 'bytes');

const mapping = {
    'Quotation_Master_': 'Requirement_Master_',
    'Quotation_Details_': 'Requirement_Details_',
    'Quotation_Details_Data': 'Requirement_Details_Data',
    'Quotation_Master_Data': 'Requirement_Master_Data',
    'Edit_Quotation_Master': 'Edit_Requirement_Master',
    'Delete_Quotation_Master': 'Delete_Requirement_Master',
    'Edit_Quotation_Detail': 'Edit_Requirement_Detail',
    'Delete_Quotation_Detail': 'Delete_Requirement_Detail',
    'Plus_Quotation_Details': 'Plus_Requirement_Details',
    'Save_Quotation': 'Save_Requirement',
    'Search_Quotation': 'Search_Requirement',
    'Calculate_Quotation_Details_Amount': 'Calculate_Requirement_Details_Amount',
    'Clr_Quotation_Master': 'Clr_Requirement_Master',
    'Clr_Quotation_Details': 'Clr_Requirement_Details',
    'QuotationMaster_Id': 'RequirementMaster_Id',
    'Quotation No': 'Requirement No',
    'Sales Quotation': 'Requirement',
    'SalesQuotationMaster_Id_Edit': 'RequirementMaster_Id_Edit',
     'QuotationNo': 'QuotationNo'
};

for (const [key, value] of Object.entries(mapping)) {
    if (key === value) continue;
    const regex = new RegExp(key, 'g');
    content = content.replace(regex, value);
}

fs.writeFileSync(destPath, content);
console.log('Transformation complete for Requirement.component.html. New size:', content.length);
