const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../frontend/src/app/modules/admin/Quotation/Quotation.component.html');
let content = fs.readFileSync(filePath, 'utf8');

const startMarker = '<div class="row mt-2" *ngIf="Entry_View" style="background-color: #f1f1f1; padding: 15px;">';
const endMarker = '<!-- Print and PDF Actions -->';
const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker, startIndex);

if (startIndex === -1 || endIndex === -1) {
    console.error('Could not find the target section in Quotation.component.html');
    process.exit(1);
}

// Extract the target section
let section = content.substring(startIndex, endIndex);

// 1. Remove background-color: #f1f1f1; padding: 15px; from the wrapper
section = section.replace('<div class="row mt-2" *ngIf="Entry_View" style="background-color: #f1f1f1; padding: 15px;">', '<div class="row mt-2" *ngIf="Entry_View">');

// 2. Change the header wrapper to use info-card
section = section.replace(
    '<div class="col-md-12 d-flex justify-content-between align-items-center mb-3 p-2 bg-white rounded shadow-sm no-print" style="border-left: 4px solid #3e6bdd;">',
    '<div class="col-md-12 d-flex justify-content-between align-items-center mb-4 info-card" style="margin-bottom: 20px !important;">'
);
// Make Quotation Details header look better
section = section.replace('<h3 class="mb-0 font-weight-bold" style="color: #2d3436; font-size: 18px; margin: 0;">Quotation Details</h3>', '<h5><i class="fa fa-file-text-o"></i> Quotation Details</h5>');

// 3. Replace legacy label classes with standard-label
section = section.replace(/label-to-crect-all-names-to-divs down-label-name-to-all-sections/g, 'standard-label');
section = section.replace(/label-to-crect-all-names-to-div-tre-prt-sles/g, 'standard-label');

// 4. Replace legacy input classes with form-control-standard
section = section.replace(/col-md-8 mrgn-crct-input-bx-sls-mstr-rspnsv-nw-sctn bg-light/g, 'form-control-standard bg-light');
section = section.replace(/col-md-8 mrgn-crct-input-bx-sls-mstr-rspnsv-nw-sctn/g, 'form-control-standard');
section = section.replace(/col-md-12 for-input-selct-tblelst mrgn-crct-input-bx-sls-mstr-rspnsv-nw-sctn bg-light/g, 'form-control-standard bg-light');
section = section.replace(/col-md-12 for-input-selct-tblelst mrgn-crct-input-bx-sls-mstr-rspnsv-nw-sctn/g, 'form-control-standard');
section = section.replace(/for-input-selct-tblelst/g, 'form-control-standard');

// 5. Remove problematic inline styles from inputs (border: 1px solid #b1b1b1 etc)
section = section.replace(/style="height: 40px !important; border: 1px solid #b1b1b1; border-radius: 4px; background: white; display: flex; align-items: center; padding: 0 5px; background: #fff;"/g, 'class="form-control-standard" style="display: flex; align-items: center; padding: 0 10px;"');
section = section.replace(/style="height: 40px; border: 1px solid #b1b1b1;"/g, '');
section = section.replace(/style="height: 40px; margin-bottom: 0; border: 1px solid #b1b1b1; border-radius: 4px;"/g, '');
section = section.replace(/style="height: 40px; margin-bottom: 0;"/g, '');
section = section.replace(/style="height: 40px; margin-bottom: 0; text-align: center;"/g, '');
section = section.replace(/style="height: 40px; margin-bottom: 0; text-align: right; font-weight: bold;"/g, '');

// 6. Fix the col-md-6 blocks to use info-card and properly pad them
section = section.replace(/<div class="col-md-6 croct-float-purchase-master-section">/g, '<div class="col-md-6"><div class="info-card">');
// Since we wrapped it in info-card, we need to close it. We can rely on the fact that the next one or the Item Entry Section will close it.
// Actually, it is easier to just replace the row div ending. Let\'s just use regex for the end of the block.
// Instead, let\'s replace croct-float-purchase-master-section with a clean card
section = section.replace(/<div class="col-md-6"><div class="info-card">/g, '<div class="col-md-6 croct-float-purchase-master-section info-card" style="box-shadow:none; border:1px solid #edf2f9;">');

// 7. Update Item Entry Section styling
section = section.replace(/<div class="card" style="background-color: #f1f1f1; border: none; box-shadow: none;">/g, '<div class="item-entry-container">');
section = section.replace(/<div style="display: flex; gap: 8px; align-items: flex-end; margin-bottom: 15px; flex-wrap: wrap;">/g, '<div class="flex-entry-row mb-3">');
section = section.replace(/<div style="flex: 0 0 250px;">/g, '<div class="flex-item">');
section = section.replace(/<div style="flex: 0 0 120px;">/g, '<div class="flex-item">');
section = section.replace(/<div style="flex: 0 0 80px;">/g, '<div class="flex-item">');
section = section.replace(/<div style="flex: 0 0 180px;">/g, '<div class="flex-item">');
section = section.replace(/<div style="flex: 0 0 100px;"/g, '<div class="flex-item"');
section = section.replace(/<div style="flex: 0 0 auto;">/g, '<div class="flex-item-btn">');

// 8. Update Table styles
section = section.replace(/<div class="table-responsive" style="background: white; border-radius: 4px; box-shadow: 0 1px 3px rgba\(0,0,0,0\.1\);">/g, '<div class="table-responsive table-container">');
section = section.replace(/<thead class="bg-col-stock-add-diary">/g, '<thead>');

// 9. Update buttons
section = section.replace(/<button mat-raised-button type="button" \(click\)="Plus_Quotation_Details\(\$event\)" class="btn btn-danger" style="height: 40px; border-radius: 4px;">Add<\/button>/g, '<button mat-raised-button type="button" (click)="Plus_Quotation_Details($event)" class="btn btn-primary-resp" style="height: 42px;">Add</button>');
section = section.replace(/class="btn btn-danger div-rspnsv-pstn-crct-sls-mstr"/g, 'class="btn btn-danger"');
section = section.replace(/class="btn btn-info div-rspnsv-pstn-crct-sls-mstr"/g, 'class="btn btn-light-resp"');
section = section.replace(/class="btn btn-primary div-rspnsv-pstn-crct-sls-mstr"/g, 'class="btn btn-primary-resp"');

// 10. Totals and Summary Card
section = section.replace(/<div class="col-md-5">/g, '<div class="col-md-5 summary-card">');
section = section.replace(/<div class="col-md-12 d-flex justify-content-between mb-2">/g, '<div class="summary-item">');
section = section.replace(/<div class="col-md-12 d-flex justify-content-between align-items-center mb-2">/g, '<div class="summary-item">');
section = section.replace(/<div class="col-md-12 d-flex justify-content-between py-2 border-top mt-2" style="background: #eee; border-radius: 4px;">/g, '<div class="summary-item grand-total-item">');
section = section.replace(/<label class="font-weight-bold">Sub Total<\/label>/g, '<label class="summary-label">Sub Total</label>');
section = section.replace(/<label>Discount \(%\)<\/label>/g, '<label class="summary-label">Discount (%)</label>');
section = section.replace(/<label>VAT \/ Tax \(%\)<\/label>/g, '<label class="summary-label">VAT / Tax (%)</label>');
section = section.replace(/<label class="font-weight-bold mb-0">Grand Total<\/label>/g, '<label class="grand-total-label font-weight-bold mb-0">Grand Total</label>');
section = section.replace(/<span class="font-weight-bold" style="font-size: 1.2rem; color: #ef071e;">/g, '<span class="grand-total-value font-weight-bold">');
section = section.replace(/<span class="font-weight-bold">{{/g, '<span class="summary-value">{{');

// Reconstruct the file content
const newContent = content.substring(0, startIndex) + section + content.substring(endIndex);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Quotation UI updated successfully.');
