const fs = require('fs');
const file = 'd:/ufs project/neotronics/frontend/src/app/modules/admin/admin.module.ts';
let content = fs.readFileSync(file, 'utf8');

// Find the first @NgModule
let firstIndex = content.indexOf('@NgModule({');
let secondIndex = content.indexOf('@NgModule({', firstIndex + 1);

if (firstIndex !== -1 && secondIndex !== -1) {
    // Cut out everything from the first @NgModule to just before the second one
    content = content.slice(0, firstIndex) + content.slice(secondIndex);
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed file');
} else {
    console.log('Could not find two NgModules');
}
