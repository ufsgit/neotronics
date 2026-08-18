const fs = require('fs');
const path1 = 'd:/ufs projects/Neotronics folder/neotronics/frontend/src/app/modules/admin/Lead/Lead.component.html';
const path2 = 'd:/ufs projects/Neotronics folder/neotronics/frontend/src/app/modules/admin/Register_Lead/Register_Lead.component.html';

let html1 = fs.readFileSync(path1, 'utf8');

const entryStart = html1.indexOf('<div *ngIf="Entry_View" class="ig-entry-view">');
const listStart = html1.indexOf('<div *ngIf="!Entry_View" class="ig-list-view">');

if(entryStart !== -1 && listStart !== -1) {
    const entryHTML = html1.substring(entryStart, listStart);
    let listHTML = html1.substring(0, entryStart) + html1.substring(listStart); 
    
    listHTML = listHTML.replace('<div *ngIf="!Entry_View" class="ig-list-view">', '<div class="ig-list-view">');
    let entryHTMLClean = entryHTML.replace('<div *ngIf="Entry_View" class="ig-entry-view">', '<div class="ig-entry-view">');
    
    fs.writeFileSync(path1, listHTML);
    fs.writeFileSync(path2, entryHTMLClean);
    console.log('Successfully split HTML files.');
} else {
    console.log('Could not find split points.');
}
