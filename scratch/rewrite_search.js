const fs = require('fs');

const files = [
  'frontend/src/app/modules/admin/Requirement/Requirement.component.html',
  'frontend/src/app/modules/admin/Price_Response/Price_Response.component.html'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  const startPattern = '<div class=\"row mb-1 card-body\"';
  const startIndex = content.indexOf(startPattern);
  if (startIndex === -1) {
    console.log(`Could not find start pattern in ${file}`);
    continue;
  }
  
  const endPattern = '<div class=\"clearfix\"></div>\n            </div>';
  let endIndex = content.indexOf(endPattern, startIndex);
  if (endIndex === -1) {
    // try slightly different spacing
    const endPattern2 = '<div class=\"clearfix\"></div>';
    endIndex = content.indexOf(endPattern2, startIndex);
    if (endIndex === -1) {
      console.log(`Could not find end pattern in ${file}`);
      continue;
    }
    endIndex += endPattern2.length;
    // find next closing div
    endIndex = content.indexOf('</div>', endIndex) + 6;
  } else {
    endIndex += endPattern.length;
  }

  const isPriceResponse = file.includes('Price_Response');
  const currencyBlock = isPriceResponse ? `
                    <!-- Currency -->
                    <div class="col-md-2">
                        <label class="mb-1" style="display: block; font-weight: 500; font-size: 13px;">Currency</label>
                        <select [(ngModel)]="Currency_Search" id="Currency_Search" name="Currency_Search" required style="width: 100%; height: 40px; border: 1px solid #b1b1b1; border-radius: 8px; padding: 0 10px; background: #fff;">
                            <option *ngFor="let currency of currencyData" [ngValue]="currency">{{currency.CurrecnyName}}</option>
                        </select>
                    </div>` : '';

  // Define new cleaner HTML for the search block
  let newBlock = `
            <div class="row mb-3 card-body" style="align-items: flex-end; border: 0; border-radius: 6px; margin-left: 2px; color: #333333; background: #fff; width: 100%; padding: 15px; background-color: #f1f1f1; box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);">
                <div class="row w-100 mb-3" style="margin-left: 0;">
                    <!-- Date Checkbox -->
                    <div class="col-md-1" style="display: flex; flex-direction: column; justify-content: center; height: 60px;">
                        <label class="mb-1" style="font-weight: 500; font-size: 13px;">Date</label>
                        <div class="form-check uper-dte-lbel-sales-sctn-new m-0 p-0" style="margin-top: 5px !important;">
                            <label class="form-check-label m-0">
                                <input type="checkbox" class="form-check-input" name="Date_checks" [(ngModel)]="Date_Check" />
                                <span class="form-check-sign" style="left: 0px !important; top: -10px !important;"><span class="check"></span></span>
                            </label>
                        </div>
                    </div>

                    <!-- From Date -->
                    <div class="col-md-3">
                        <label class="mb-1" style="display: block; font-weight: 500; font-size: 13px;">From Date</label>
                        <div style="background: #fff; border: 1px solid #b1b1b1; border-radius: 8px; height: 40px; display: flex; align-items: center; padding: 0 5px;">
                            <input [matDatepicker]="dp1" placeholder="DD/MM/YYYY" name="Search_FromDate" [(ngModel)]="Search_FromDate" style="border: none; outline: none; width: 100%; height: 100%; background: transparent; padding-left: 10px;">
                            <mat-datepicker-toggle matSuffix [for]="dp1"></mat-datepicker-toggle>
                            <mat-datepicker #dp1></mat-datepicker>
                        </div>
                    </div>

                    <!-- To Date -->
                    <div class="col-md-3">
                        <label class="mb-1" style="display: block; font-weight: 500; font-size: 13px;">To Date</label>
                        <div style="background: #fff; border: 1px solid #b1b1b1; border-radius: 8px; height: 40px; display: flex; align-items: center; padding: 0 5px;">
                            <input [matDatepicker]="dp2" name="Search_ToDate" placeholder="DD/MM/YYYY" [(ngModel)]="Search_ToDate" style="border: none; outline: none; width: 100%; height: 100%; background: transparent; padding-left: 10px;">
                            <mat-datepicker-toggle matSuffix [for]="dp2"></mat-datepicker-toggle>
                            <mat-datepicker #dp2></mat-datepicker>
                        </div>
                    </div>

                    <!-- Customer / Supplier -->
                    <div class="col-md-5">
                        <label class="mb-1" style="display: block; font-weight: 500; font-size: 13px;">${isPriceResponse ? 'Supplier' : 'Customer'}</label>
                        <input type="text" [matAutocomplete]="auto_Customer" [(ngModel)]="Search_Customer" name="Customer" (click)="Search_Customer_Typeahead($event)" (input)="Search_Customer_Typeahead($event)" style="width: 100%; height: 40px; border: 1px solid #b1b1b1; border-radius: 8px; padding: 0 10px; background: #fff;">
                        <mat-autocomplete #auto_Customer="matAutocomplete" [displayWith]="display_Customer">
                            <mat-option *ngIf="isLoading"><mat-spinner diameter="20"></mat-spinner></mat-option>
                            <ng-container *ngIf="!isLoading">
                                <mat-option *ngFor="let Customer_T of Customer_Data" [value]="Customer_T">
                                    <span>{{Customer_T.Client_Accounts_Name}}</span>
                                </mat-option>
                            </ng-container>
                        </mat-autocomplete>
                    </div>
                </div>

                <div class="row w-100" style="margin-left: 0; align-items: flex-end;">
                    <!-- Document No -->
                    <div class="col-md-3">
                        <label class="mb-1" style="display: block; font-weight: 500; font-size: 13px;">${isPriceResponse ? 'Price Response No' : 'Requirement No'}</label>
                        <input type="text" [(ngModel)]="QuotNo" [ngModelOptions]="{standalone: true}" style="width: 100%; height: 40px; border: 1px solid #b1b1b1; border-radius: 8px; padding: 0 10px; background: #fff;">
                    </div>

                    <!-- Item / Part No -->
                    <div class="col-md-2" ${isPriceResponse ? 'style="display:none;"' : ''}>
                        <label class="mb-1" style="display: block; font-weight: 500; font-size: 13px;">${isPriceResponse ? 'Part No' : 'Item'}</label>
                        <input type="text" [(ngModel)]="partNo" [ngModelOptions]="{standalone: true}" style="width: 100%; height: 40px; border: 1px solid #b1b1b1; border-radius: 8px; padding: 0 10px; background: #fff;">
                    </div>

                    <!-- Group -->
                    <div class="col-md-3">
                        <label class="mb-1" style="display: block; font-weight: 500; font-size: 13px;">Group</label>
                        <select [(ngModel)]="Item_Group_Search" id="Item_Group_Search" name="Item_Group_Search" required style="width: 100%; height: 40px; border: 1px solid #b1b1b1; border-radius: 8px; padding: 0 10px; background: #fff;">
                            <option *ngFor="let itemGroup of itemGroupData" [ngValue]="itemGroup">{{itemGroup.Item_Group_Name}}</option>
                        </select>
                    </div>

                    ${currencyBlock}

                    <!-- Buttons -->
                    <div class="${isPriceResponse ? 'col-md-4' : 'col-md-4'}" style="display: flex; gap: 10px; justify-content: flex-end; align-items: flex-end; height: 60px;">
                        <button mat-raised-button type="button" (click)="Search_${isPriceResponse ? 'Price_Response' : 'Requirement'}()" class="btn btn-danger m-0" style="height: 40px; border-radius: 8px; padding: 0 20px;">
                            <i class="fa fa-search" aria-hidden="true" style="margin-right: 5px;"></i> Search
                        </button>
                        <button mat-raised-button type="button" (click)="Create_New()" class="btn btn-danger m-0" style="height: 40px; border-radius: 8px; padding: 0 15px;">
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </button>
                        <button mat-raised-button type="button" (click)="Export()" [hidden]="Export_View == true" class="btn btn-primary m-0" style="background-color: #3e6bdd; color: white; height: 40px; border-radius: 8px; padding: 0 20px;">
                            Export
                        </button>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>`;

  const finalContent = content.substring(0, startIndex) + newBlock.trim() + content.substring(endIndex);
  fs.writeFileSync(file, finalContent);
  console.log(`Successfully updated ${file}`);
}
