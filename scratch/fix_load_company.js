const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, '../frontend/src/app/modules/admin');

// The fixed Load_Company pattern that properly unwraps sendSuccess
const fixedBlock = `Load_Company() 
    {   
    this.Sales_Master_Service_.Load_Company().subscribe((response) => {
    // API wraps with sendSuccess: { success: true, data: [[companyRows],[bankRows]] }
    const Rows = (response && typeof response === 'object' && 'success' in response) ? response.data : response;
    if (Rows != null && Array.isArray(Rows[0]) && Rows[0].length > 0) {
    this.Company_Data = Rows[0];
    this.Print_Company_ = Rows[0][0];
    this.Company_ = Rows[0][0];
    this.Bank_ = Rows[1] || [];
 }
 this.issLoading = false;
 },
 err => {
 this.issLoading = false;
 });
}`;

// Files to fix and their unique identifying strings inside Load_Company
const filesToFix = [
  {
    file: 'Performa_Invoice/Performa_Invoice.component.ts',
    // Unique string in this file's Load_Company
    uniqueMarker: "console.log(Rows[0][0].Note)"
  },
  {
    file: 'Purchase_Order/Purchase_Order.component.ts',
    uniqueMarker: null  // will use line-range approach
  },
  {
    file: 'purchase-return/purchase-return.component.ts',
    uniqueMarker: null
  },
  {
    file: 'Sales_Return/Sales_Return.component.ts',
    uniqueMarker: null
  }
];

// Strategy: find Load_Company() function and replace everything between its open and closing braces
function fixLoadCompany(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if already fixed
  if (content.includes('Load_Company().subscribe((response)') || 
      content.includes("Load_Company().subscribe((response: any)")) {
    // Check if it already has the full correct pattern
    if (content.includes('success in response') && content.includes('this.Company_Data = Rows[0]')) {
      console.log(`  ALREADY FIXED: ${path.basename(filePath)}`);
      return false;
    }
  }

  // Find the Load_Company function body using regex
  // Match: Load_Company() [whitespace] { [whitespace] this.XXX.Load_Company().subscribe(... 
  // up to the closing }
  const regex = /Load_Company\(\)\s*\{[\s\S]*?this\.\w+Service_?\.Load_Company\(\)\.subscribe\(Rows\s*=>\s*\{[\s\S]*?\}\s*\);?\s*\}/g;
  
  const matches = [...content.matchAll(regex)];
  if (matches.length === 0) {
    console.log(`  WARNING: No old pattern found in ${path.basename(filePath)}`);
    return false;
  }
  
  console.log(`  Found ${matches.length} match(es) in ${path.basename(filePath)}`);
  
  // Get the service name used in this file
  const serviceMatch = content.match(/this\.(\w+Service_?)\.Load_Company\(\)/);
  const serviceName = serviceMatch ? serviceMatch[1] : 'Sales_Master_Service_';
  
  const replacement = fixedBlock.replace('this.Sales_Master_Service_', `this.${serviceName}`);
  
  const newContent = content.replace(regex, replacement);
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`  FIXED: ${path.basename(filePath)} (service: ${serviceName})`);
    return true;
  }
  
  console.log(`  NO CHANGE: ${path.basename(filePath)}`);
  return false;
}

// Also check & fix Performa_Invoice which has a slightly different pattern (console.log inside)
function fixPerformaInvoice() {
  const filePath = path.join(basePath, 'Performa_Invoice/Performa_Invoice.component.ts');
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes("Load_Company().subscribe((response: any)") && content.includes('this.Company_Data = Rows[0]')) {
    console.log('  Performa_Invoice: ALREADY FIXED');
    return;
  }
  
  // Find the specific Load_Company block in Performa_Invoice
  const oldBlock = content.match(/Load_Company\(\)\s*\{[\s\S]*?console\.log\(Rows\[0\]\[0\]\.Note\)[\s\S]*?\}\s*\}/);
  if (!oldBlock) {
    console.log('  Performa_Invoice: old pattern not found, trying general fix');
    fixLoadCompany(filePath);
    return;
  }
  
  const replacement = `Load_Company() 
    {   
    this.Sales_Master_Service_.Load_Company().subscribe((response) => {
    // API wraps with sendSuccess: { success: true, data: [[companyRows],[bankRows]] }
    const Rows = (response && typeof response === 'object' && 'success' in response) ? response.data : response;
    if (Rows != null && Array.isArray(Rows[0]) && Rows[0].length > 0) {
    this.Company_Data = Rows[0];
    this.Print_Company_ = Rows[0][0];
    this.Company_ = Rows[0][0];
    this.Bank_ = Rows[1] || [];
 }
 this.issLoading = false;
 },
 err => {
 this.issLoading = false;
 });
}`;
  
  const newContent = content.replace(oldBlock[0], replacement);
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('  FIXED: Performa_Invoice.component.ts');
  } else {
    console.log('  Performa_Invoice: replacement had no effect');
  }
}

console.log('\n=== Fixing Load_Company in all modules ===\n');

// Fix Performa_Invoice first (has unique content)
console.log('Processing Performa_Invoice...');
fixPerformaInvoice();

// Fix remaining files
const remainingFiles = [
  'Purchase_Order/Purchase_Order.component.ts',
  'purchase-return/purchase-return.component.ts',
  'Sales_Return/Sales_Return.component.ts'
];

for (const f of remainingFiles) {
  console.log(`\nProcessing ${f}...`);
  fixLoadCompany(path.join(basePath, f));
}

console.log('\n=== Done ===\n');
