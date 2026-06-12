const fs = require('fs');
const files = [
  'frontend/src/app/modules/admin/Requirement/Requirement.component.html',
  'frontend/src/app/modules/admin/Price_Response/Price_Response.component.html'
];
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content.replace(/<div class=\"col-md-1 row mb-1/g, '<div class=\"row w-100 mb-2\"><div class=\"col-md-1 row mb-1');
  newContent = newContent.replace(/<div class=\"col-md-3 row  mb-1\" style=\"align-items: center;\">\s*<label class=\"col-md-6 mb-0\" style=\"text-align: end;\">Requirement No<\/label>/g, '</div><div class=\"row w-100 mb-1\"><div class=\"col-md-3 row mb-1\" style=\"align-items: center;\"><label class=\"col-md-6 mb-0\" style=\"text-align: end;\">Requirement No</label>');
  newContent = newContent.replace(/<div class=\"col-md-3 row  mb-1\" style=\"align-items: center;\">\s*<label class=\"col-md-6 mb-0\" style=\"text-align: end;\">Price Response No<\/label>/g, '</div><div class=\"row w-100 mb-1\"><div class=\"col-md-3 row mb-1\" style=\"align-items: center;\"><label class=\"col-md-6 mb-0\" style=\"text-align: end;\">Price Response No</label>');
  newContent = newContent.replace(/<div class=\"clearfix\"><\/div>/g, '</div><div class=\"clearfix\"></div>');
  fs.writeFileSync(file, newContent);
}
console.log('Done');
