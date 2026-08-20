const fs = require('fs');

const file = 'd:/ufs project/neotronics/frontend/src/app/modules/admin/admin.module.ts';
let content = fs.readFileSync(file, 'utf8');

// The newly generated components have `Lead` prefix
const components = [
  { folderPath: 'Contacts/Designation', fileName: 'designation', compName: 'LeadDesignationComponent' },
  { folderPath: 'Requirement_Profile/ServiceProduct', fileName: 'service-product', compName: 'LeadServiceProductComponent' },
  { folderPath: 'Market_Study/MarketSystem', fileName: 'market-system', compName: 'LeadMarketSystemComponent' },
  { folderPath: 'Pipeline_Stage_Pulse/PipelineStage', fileName: 'pipeline-stage', compName: 'LeadPipelineStageComponent' },
  { folderPath: 'Pipeline_Stage_Pulse/Pulse', fileName: 'pulse', compName: 'LeadPulseComponent' },
  { folderPath: 'Pipeline_Stage_Pulse/TargetStage', fileName: 'target-stage', compName: 'LeadTargetStageComponent' },
  { folderPath: 'Assignment/Branch', fileName: 'branch', compName: 'LeadBranchComponent' },
  { folderPath: 'Assignment/Department', fileName: 'department', compName: 'LeadDepartmentComponent' },
  { folderPath: 'Follow_up_Automation/Workflow', fileName: 'workflow', compName: 'LeadWorkflowComponent' }
];

// Replace the old imports (DesignationComponent, BranchComponent, etc) with the new ones.
content = content.replace(/import \{ DesignationComponent \} from '.\/Lead_Config\/Contacts\/Designation\/designation.component';\r?\n/, '');
content = content.replace(/import \{ ServiceProductComponent \} from '.\/Lead_Config\/Requirement_Profile\/ServiceProduct\/service-product.component';\r?\n/, '');
content = content.replace(/import \{ MarketSystemComponent \} from '.\/Lead_Config\/Market_Study\/MarketSystem\/market-system.component';\r?\n/, '');
content = content.replace(/import \{ PipelineStageComponent \} from '.\/Lead_Config\/Pipeline_Stage_Pulse\/PipelineStage\/pipeline-stage.component';\r?\n/, '');
content = content.replace(/import \{ PulseComponent \} from '.\/Lead_Config\/Pipeline_Stage_Pulse\/Pulse\/pulse.component';\r?\n/, '');
content = content.replace(/import \{ TargetStageComponent \} from '.\/Lead_Config\/Pipeline_Stage_Pulse\/TargetStage\/target-stage.component';\r?\n/, '');
content = content.replace(/import \{ BranchComponent \} from '.\/Lead_Config\/Assignment\/Branch\/branch.component';\r?\n/, '');
content = content.replace(/import \{ DepartmentComponent \} from '.\/Lead_Config\/Assignment\/Department\/department.component';\r?\n/, '');
content = content.replace(/import \{ WorkflowComponent \} from '.\/Lead_Config\/Follow_up_Automation\/Workflow\/workflow.component';\r?\n/, '');

// Add new imports right before @NgModule
let importsString = components.map(c => `import { ${c.compName} } from './Lead_Config/${c.folderPath}/${c.fileName}.component';`).join('\n') + '\n';
content = content.replace(/@NgModule\(\{/, importsString + '\n@NgModule({');

// Replace old declarations in declarations array
// Earlier script might have added them as ServiceProductComponent etc. Let's remove them if they exist
content = content.replace(/\t\tServiceProductComponent,\r?\n/g, '');
content = content.replace(/\t\tMarketSystemComponent,\r?\n/g, '');
content = content.replace(/\t\tPipelineStageComponent,\r?\n/g, '');
content = content.replace(/\t\tPulseComponent,\r?\n/g, '');
content = content.replace(/\t\tTargetStageComponent,\r?\n/g, '');
content = content.replace(/\t\tBranchComponent,\r?\n/g, '');

const declarationsMatch = content.match(/declarations: \[([\s\S]*?)\]/);
if (declarationsMatch) {
  let declarations = declarationsMatch[1];
  let newDeclarations = declarations;
  
  components.forEach(comp => {
    if (!newDeclarations.includes(comp.compName)) {
       newDeclarations = newDeclarations.replace(/(\t\tWorkflowComponent)/, `\t\t${comp.compName},\r\n$1`);
    }
  });

  content = content.replace(declarationsMatch[1], newDeclarations);
}

content += '\n// Trigger recompile ' + Date.now();
fs.writeFileSync(file, content, 'utf8');
console.log('Fixed admin.module.ts with Lead components');
