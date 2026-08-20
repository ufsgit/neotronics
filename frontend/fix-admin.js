const fs = require('fs');

const file = 'd:/ufs project/neotronics/frontend/src/app/modules/admin/admin.module.ts';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove the old imports from lines 144 to 147
content = content.replace(/import \{ StateComponent \} from '.\/Lead_Config\/Company_Details\/State\/state.component';\r?\n/, '');
content = content.replace(/import \{ DistrictComponent \} from '.\/Lead_Config\/Company_Details\/District\/district.component';\r?\n/, '');
content = content.replace(/import \{ CompanySizeComponent \} from '.\/Lead_Config\/Company_Details\/CompanySize\/company-size.component';\r?\n/, '');
content = content.replace(/import \{ SourceComponent \} from '.\/Lead_Config\/Company_Details\/Source\/source.component';\r?\n/, '');

// 2. Remove duplicate DepartmentComponent in declarations
content = content.replace(/\t\tDepartmentComponent,\r?\n\t\tDepartmentComponent,\r?\n/, '\t\tDepartmentComponent,\r\n');

// 3. Ensure all new components are in declarations
const declarationsMatch = content.match(/declarations: \[([\s\S]*?)\]/);
if (declarationsMatch) {
  let declarations = declarationsMatch[1];
  const componentsToAdd = [
    'ServiceProductComponent',
    'MarketSystemComponent',
    'PipelineStageComponent',
    'PulseComponent',
    'TargetStageComponent',
    'BranchComponent'
  ];
  
  let newDeclarations = declarations;
  componentsToAdd.forEach(comp => {
    if (!newDeclarations.includes(comp)) {
      newDeclarations = newDeclarations.replace(/(\t\tWorkflowComponent)/, `\t\t${comp},\r\n$1`);
    }
  });

  content = content.replace(declarationsMatch[1], newDeclarations);
}

// 4. Force a change to trigger webpack recompile
content += '\n// Trigger recompile ' + Date.now();

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed admin.module.ts');
