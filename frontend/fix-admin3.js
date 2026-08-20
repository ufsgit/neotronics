const fs = require('fs');
const file = 'd:/ufs project/neotronics/frontend/src/app/modules/admin/admin.module.ts';
let content = fs.readFileSync(file, 'utf8');

// Re-add imports for the original components
const importsToAdd = `
import { DesignationComponent } from './Designation/Designation.component';
import { DepartmentComponent } from './Department/Department.component';
`;
content = content.replace(/@NgModule\(\{/, importsToAdd + '\n@NgModule({');

// Remove WorkflowComponent from declarations
content = content.replace(/\t\tWorkflowComponent\r?\n/g, '');

content += '\n// Trigger recompile ' + Date.now();
fs.writeFileSync(file, content, 'utf8');
console.log('Fixed missing imports');
