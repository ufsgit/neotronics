import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, Renderer2, NgZone, Input, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Client_Accounts } from '../../../models/Client_Accounts';
import { User_Details_Service } from '../../../services/User_Details.Service';
import { Sales_Master_Service } from '../../../services/Sales_Master.Service';
import { currencydetails_Service } from '../../../services/currencydetails.Service';
import { purchaseordermaster_Service } from '../../../services/purchaseordermaster.Service';
import { Employee_Details_Service } from '../../../services/Employee_Details.Service';
import { Client_Accounts_Service } from '../../../services/Client_Accounts.Service'; 
import { Stock_Service } from '../../../services/Stock.Service';
import { Item_Group_Service } from '../../../services/Item_Group.Service';
import { payment_term_Service } from '../../../services/payment_term.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Sales_Master } from '../../../models/Sales_Master';
import { Company } from '../../../models/Company';
import { Sales_Details } from '../../../models/Sales_Details';
import { Bill_Type } from '../../../models/Bill_Type';
import { Bill_Mode } from '../../../models/Bill_Mode';
import { Stock } from '../../../models/Stock';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { Item_Group } from '../../../models/Item_Group';
import { currencydetails } from '../../../models/currencydetails';
import { User_Details } from '../../../models/User_Details';
import { payment_term } from '../../../models/payment_term';
import { accounttype } from '../../../models/accounttype';
import { Sales_Return_Master } from '../../../models/Sales_Return_Master';
import { Sales_Return_Details } from '../../../models/Sales_Return_Details';
// import { ConsoleReporter } from 'jasmine';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: {    dateInput: 'DD/MM/YYYY',    },
    display: {
    dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
    },
    };

@Component({
  selector: 'app-Sales_Return',
  templateUrl: './Sales_Return.component.html',
  styleUrls: ['./Sales_Return.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Sales_ReturnComponent  implements OnInit, AfterViewInit{
    selectedAccountPartyId: any;
  currencyName: any;
  invoiceTypeName: any;

  ngAfterViewInit() {}
  @ViewChild('Barcode_n', { read: Input, static: true }) inputEl: ElementRef;
  @ViewChild('topDiv', { static: false }) topDiv: ElementRef;

  @ViewChild('topDiv1', { static: false }) topDiv1: ElementRef;

@HostListener('document:keydown', ['$event']) 
handleKeyboardEvent(event: KeyboardEvent) { ;
    if(event.key=='F2')
  this.Save_Sales(1);
}
Sales_Master_Data:Sales_Master[]
Sales_Master_:Sales_Master= new Sales_Master();
Sales_Return_Master_Data:Sales_Return_Master[];
Sales_Return_Master_:Sales_Return_Master= new Sales_Return_Master();

sales_master_invoice;

Sales_Return_Details_Data:Sales_Return_Details[];
Sales_Details_Data:Sales_Details[]
Sales_Details_Data1:Sales_Details[]
Sales_Details_:Sales_Details= new Sales_Details();
Sales_Return_Details_:Sales_Return_Details= new Sales_Return_Details();

Bill_Type_Data:Bill_Type[]
Bill_Type_:Bill_Type= new Bill_Type();
Bill_Type_Temp:Bill_Type= new Bill_Type();
Bill_Type_Search:Bill_Type= new Bill_Type();
Item_Group_Search:Item_Group = new Item_Group();
Currency_Search:currencydetails = new currencydetails();
searchAccountType:accounttype = new accounttype();
Employee_Search:User_Details = new User_Details();
// Payment_Term_Description_:payment_term = new payment_term();
Bill_Mode_Data:Bill_Mode[]
Bill_Mode_:Bill_Mode= new Bill_Mode();
Bill_Mode_Temp:Bill_Mode= new Bill_Mode();
Customer_Data:Client_Accounts[];
PurchaseOrder_Data = [];
// EmployeeData = [];

EmployeeData: User_Details[];
Employee_Temp: User_Details = new User_Details();
SaleInvoiceNoData = [];
ItemCodeData = [];
// PaymentTermData=[];
Payment_Term:payment_term = new payment_term();
Payment_Term_Data: payment_term[];
// PaymentTermData: payment_term[];
Payment_Term_Temp: payment_term = new payment_term();

PaymentTermData: payment_term[];
PaymentTerm_Temp: payment_term = new payment_term();
Payment_Term_Description_:payment_term = new payment_term();

AccounttypeData: accounttype[];
accounttype_search:accounttype = new accounttype();
Accounttype_Temp : accounttype = new accounttype();
Accounttype: accounttype = new accounttype();



Customer_:Client_Accounts= new Client_Accounts();
Search_Customer:Client_Accounts= new Client_Accounts();
Customer_Temp:Client_Accounts= new Client_Accounts();
Barcode_Data:Stock[]
Stock_Data:Stock[]
Stock_Data_Filter: Stock[];
Stock_:Stock= new Stock();
Barcode_:Sales_Return_Details= new Sales_Return_Details();
Item_Temp:Sales_Return_Details= new Sales_Return_Details();
Stock_Temp:Stock= new Stock();
Barcode_Temp:Sales_Return_Details= new Sales_Return_Details();
Search_FromDate=new Date().toString();
myDate:Date=new Date();
Search_ToDate=new Date().toString();
Sales_Master_Name_Search:string;
Entry_View:boolean=false;
Show_Filter:boolean=false;
Page_Index:number=0;
Page_Size:number=10;
myInnerHeight: number;
EditIndex: number;
Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Sales_Master_Edit:boolean;
Sales_Master_Save:boolean;
Sales_Master_Delete:boolean;
year:any;
month:any;
day:any;
date:any;
isLoading=false; 
Cess:number;
CGST_SUM:number=0;
SGST_SUM:number=0;
GST_Sum:number=0;
Tot_discount:number=0;
Tot_Cess:number=0;
Tot_Amount:number=0;
Tot_Net:number=0;
roundoff_value:number=0;
Tot_Gross:number=0;
Sales_Details_Index:number=-1;
Login_User_Id:string;
Employee_Name:string;
Employee_Id:number;
Voucher_Number:number=0;
From_Date:Date=new Date();
To_Date:Date=new Date();
Date_Check:boolean=false;
Stock:number;
Edit_Sales:number=0;
Sale_Detail_Quantity:number=0;
Sales_Details_Description:string;
Amount_In_Words:string;
Sales_Quantity:number=0;
Edit_Stock_:number=0;
Edit_CGST:number=0;
Edit_SGST:number=0;
Edit_GST:number=0;
Edit_Discount:number=0;
Edit_Cess:number=0;
Edit_Totamt:number=0;
Edit_Net:number=0;
Date_Print:any;
Edit_Gross:number=0;
Sales_Master_Total_Amount:number=0;
Employee_:Client_Accounts= new Client_Accounts();
Employee_Data:Client_Accounts[]
Bill_Data:number;
User_Type:string;
User_Type_Id:number;
Print_Company_:Company=new Company();
Image_Url:string;
Company_Sign:string;
Company_Seal:string;
Sales_Print:boolean;
Sale_EditIndex:number=-1;
Sale_Permission_Edit:boolean= false;
Sale_Permission_Edit_Temp:boolean= false;
Company_: Company = new Company();
Company_Temp: Company = new Company();
Company_Data: Company [];
Bank_Data:Client_Accounts[]

Sales_Return_Details_Index:number=-1;
printLetterhead:boolean = false;
Bank_:Client_Accounts= new Client_Accounts();
Sales_Master_Data1:[];UnitName="";Quantity=0;SaleRate=0;discount=0;unitDiscount=0;TotalAmount=0;availablity='';Discount_Description=0;subTotal=0;POnumber;QuotNo;partNo;
Sales_Master_1:Sales_Master= new Sales_Master();
Address1 ='';Address2 ='';Address3 ='';Address4 ='';
Customer_Name = '';
// currencyData=[];
// Currency: currencydetails = new currencydetails();

// currency: currencydetails = new currencydetails();
// currencyData: currencydetails[];
// Currency_Temp: currencydetails = new currencydetails();


currencyData: currencydetails[];
Currency_Temp: currencydetails = new currencydetails();
Currency: currencydetails = new currencydetails();

Attention;Employee;
SaleInvoiceNo;
totalAmount=0;Total=0;totalDiscount=0;amount1=0;amount2=0;amount3=0;
// itemGroupData=[];

itemGroupData: Item_Group[];
itemGroup: Item_Group = new Item_Group();
itemGroup_Temp: Item_Group = new Item_Group();
AccountType;accountData = [];

/** Added on 21-10-2024 */

Item_Temp_ : Sales_Return_Details = new Sales_Return_Details()

/*** Added on 26-10-2024 */

SaleInvoiceNo_Temp;


/*** Added on 28-10-2024 */
Default_Vat_Percentage: number;

/** Added on 8-11-24 */

Vatin = '';
addDiscCheck = 0;


/*** Added on 12-11-2024 */

printChargeAmount1: boolean = false;
printChargeAmount2: boolean = false;
printCharge1per: boolean = false;
printVAT_Amount: boolean = false;
printDiscount_Description:boolean = false;
printAdditional_Discount: boolean = false;
printRoundoff_Amt: boolean = false;

Sales_Return_Master_Id_Edit: number = 0;

blankItems: number[] = [];
breakPage: boolean = false;


constructor(public Sales_Master_Service_:Sales_Master_Service,public currencydetails_Service_:currencydetails_Service, public User_Details_Service_:User_Details_Service,private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog
,private el: ElementRef, private zone: NgZone, private renderer: Renderer2 , public purchaseordermaster_Service_:purchaseordermaster_Service, public Employee_Details_Service_:Employee_Details_Service, public Stock_Service_:Stock_Service,
public Item_Group_Service_:Item_Group_Service, public payment_term_Service_:payment_term_Service, public Client_Accounts_Service_:Client_Accounts_Service,
private cdr: ChangeDetectorRef) { }
ngOnInit() 
{
  this.User_Type_Id=Number(localStorage.getItem('User_Type_Id'));
  this.User_Type=(localStorage.getItem('User_Type'));
  this.Login_User_Id=localStorage.getItem('Login_User');
  this.Employee_Name=localStorage.getItem('Employee_Name');
  this.Employee_Id=Number(localStorage.getItem('Employee_Id'));
  this.Permissions = Get_Page_Permission(103);
  if(this.Permissions==undefined || this.Permissions==null)
  {
  localStorage.removeItem('token');
  this.router.navigateByUrl('/auth/login');
  }
  else
  {
  this.Sales_Master_Edit=this.Permissions.Edit;
  this.Sales_Master_Save=this.Permissions.Save;
  this.Sales_Master_Delete=this.Permissions.Delete;
  this.Page_Load()
  }
}
call_api()
{
this.Sales_Master_Service_.Get_Location().subscribe(Save_location => {   
  },
  Rows => {
      this.issLoading=false;         
  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error',Type:"2"}});
  });
}
Page_Load()
{
  this.myInnerHeight = (window.innerHeight);
  this.myInnerHeight = this.myInnerHeight - 200;
  //this.Sales_Master_.EntryDate=new Date("dd-MMM-yyyy").toString();
  this.Search_FromDate=this.formatDate(this.Search_FromDate);
  this.Search_ToDate=this.formatDate(this.Search_ToDate);
  this.Clr_Sales_Master();
  this.Clr_Sales_Details();
  this.Sales_Print=true;
  this.Entry_View=false;
  this.Load_Bill_Type();
  this.Load_Employees();
  this.Load_Vat_Percentage();
  this.Sales_Return_Master_.VAT_percentage = this.Default_Vat_Percentage;
  debugger
//   this.Load_SaleInvoiceNo();
  this.Load_Company() ;
  this.Load_Currency();
  this.Load_Item_Group();
  this.Load_Payment_Term();
  // this.Load_All_Account_Type();
  this.Load_InvoiceType();
  //this.myDate=new Date();
}
Company_Dropdown_Change() {
    if(this.Company_Data) {
        const c = this.Company_Data.find(x => x.Company_Id == this.Sales_Return_Master_.Company_Id);
        if (c) {
            this.Company_ = c;
            this.Print_Company_ = c;
        }
    }
}

private normalizeResponseRows(response: any): any {
    return response && response.success !== undefined ? response.data : response;
}

private getResultSet(response: any, index: number = 0): any[] {
    const rows = this.normalizeResponseRows(response);
    if (Array.isArray(rows) && Array.isArray(rows[index])) return rows[index];
    if (index === 0 && Array.isArray(rows)) return rows;
    return [];
}

private getFirstResult(response: any): any {
    const firstSet = this.getResultSet(response, 0);
    return firstSet[0] || {};
}

Load_Company() 
    {   
    this.Sales_Master_Service_.Load_Company().subscribe((response) => {
    const Rows = this.normalizeResponseRows(response);
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
}

Load_Currency() {
  debugger
  this.currencydetails_Service_.Search_currencydetails('').subscribe(Rows => {
    debugger
      this.currencyData = this.getResultSet(Rows, 0) || [];        
      this.Currency_Temp.CurrencyDetails_Id = 0;
      this.Currency_Temp.CurrecnyName = "Select";
      this.currencyData.unshift(this.Currency_Temp);
      this.Currency = this.currencyData[0];
      this.Currency_Search = this.currencyData[0];
      this.issLoading = false;
  },
      Rows => {
          this.issLoading = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
      });
}

Load_Item_Group() {
  this.Item_Group_Service_.Load_Item_Group().subscribe(Rows => {
      if (Rows != null) {
          this.itemGroupData = this.getResultSet(Rows, 0) || [];
          this.itemGroup_Temp.Item_Group_Id = 0;
          this.itemGroup_Temp.Item_Group_Name = "Select";
          this.itemGroupData.unshift(this.itemGroup_Temp);
          this.Item_Group_Search = this.itemGroupData[0];

      }
      this.issLoading = false;
  },
      Rows => {
          this.issLoading = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
      });
}
Load_Employees() {
  this.User_Details_Service_.Search_User_Details('',this.User_Type,this.Login_User_Id).subscribe(Rows => {

      this.EmployeeData = this.getResultSet(Rows, 0) || [];
      this.Employee_Temp.User_Details_Id = 0;
      this.Employee_Temp.User_Details_Name = "Select";
      this.EmployeeData.unshift(this.Employee_Temp);
      this.Employee_Search = this.EmployeeData[0];
      
      this.issLoading = false;
  },
      Rows => {
          this.issLoading = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
      });
}

  Search_SaleInvoiceNo_Typeahead(event: any) {
    console.log('this.selectedAccountPartyId: ', this.selectedAccountPartyId);
    if (this.selectedAccountPartyId) {
        
      this.isLoading = true;
      debugger
      this.Load_SaleInvoiceNo(this.selectedAccountPartyId);
    }
  }

  // Load Sale Invoice No based on selected Account_Party_Id
  Load_SaleInvoiceNo(Account_Party_Id: number) {
    debugger
    this.User_Details_Service_.Search_SaleInvoiceNo_Typeahead(Account_Party_Id).subscribe(
      (Rows: any) => {
        if (Rows != null) {
          this.SaleInvoiceNoData = Rows[0];
        }
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
        const dialogRef = this.dialogBox.open(DialogBox_Component, {
          panelClass: 'Dialogbox-Class',
          data: { Message: 'Error Occurred', Type: "2" }
        });
      }
    );
  }

  display_SaleInvoice(item)
{
  if (item) { return item.Invoice_No; }
}




//   Load_SaleInvoiceNo() {
//     debugger
//     this.User_Details_Service_.Search_SaleInvoiceNo_Typeahead('').subscribe(Rows => {
//         debugger
//         if (Rows != null) {
//             this.SaleInvoiceNoData = Rows[0];
//         }
//         this.issLoading = false;
//     },
//         Rows => {
//             this.issLoading = false;
//             const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
//         });
// }


// Search_SaleInvoiceNo_Typeahead(event: any)
// {
//   var Value = "";
//   if (event.target.value == "")
//       Value = undefined;
//   else
//       Value = event.target.value;
//     {
//    this.issLoading = true;
//   this.Sales_Master_Service_.Search_SaleInvoiceNo_Typeahead('3',Value).subscribe(Rows => {     
//   if (Rows != null) {
//       this.SaleInvoiceNoData = Rows[0];
//   }
//   this.issLoading = false;
//   },
//   Rows => {
   
//   this.issLoading = false;
//       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//   });
//   }
// }


display_SalesInvoice(Sales_Master)
{
  if (Sales_Master) { return Sales_Master.Invoice_No; }
}


Load_Payment_Term() {
  this.payment_term_Service_.Load_Payment_Term().subscribe(Rows => {
          this.PaymentTermData = this.getResultSet(Rows, 0) || [];
          this.PaymentTerm_Temp.payment_Term_ID = 0;
          this.PaymentTerm_Temp.Payment_Term_Description = "Select";
          this.PaymentTermData.unshift(this.PaymentTerm_Temp);
          this.Payment_Term_Description_ = this.PaymentTermData[0];
      this.issLoading = false;
  },
      Rows => {
          this.issLoading = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
      });
}

//   Load_All_Account_Type()
// {
//     this.currencydetails_Service_.Load_All_Account_Type('').subscribe(Rows => {
//         if (Rows != null) {
//             this.accountData = Rows[0];
//         }
//         this.issLoading = false;
//     },
//         Rows => {
//             this.issLoading = false;
//             const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
//         });
// }


Load_InvoiceType() {
        
  this.User_Details_Service_.Load_InvoiceType2().subscribe(Rows => {
      this.AccounttypeData = this.getResultSet(Rows, 0) || [];        
      this.Accounttype_Temp.AccountType_Id = 0;
      this.Accounttype_Temp.AccountType_Name = "Select";
      this.AccounttypeData.unshift(this.Accounttype_Temp);
      this.Accounttype = this.AccounttypeData[0];
      this.searchAccountType = this.AccounttypeData[0];
      this.issLoading = false;
  },
      Rows => {
          this.issLoading = false;
          const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
      });
}



Create_New()
{
  //document.getElementById("Tab_Edit").hidden=true; 
  this.Entry_View = true;
  this.Sales_Print=true;
  this.Clr_Sales_Master();
  this.Clr_Sales_Details();
  this.Sales_Details_Data=[];
  this.CGST_SUM=0;
  this.SGST_SUM=0;
  this.GST_Sum=0;
  this.Tot_discount=0;
  this.Tot_Cess=0;
  this.Tot_Amount=0;
  this.Tot_Net=0;
  this.Tot_Gross=0;
}
Close_Click()
{
  this.Entry_View = false;
  this.CGST_SUM=0;
  this.SGST_SUM=0;
  this.GST_Sum=0;
  this.Tot_discount=0;
  this.Tot_Cess=0;
  this.Tot_Amount=0;
  this.Tot_Net=0;
  this.Tot_Gross=0;
  this.Clr_Sales_Master();
  this.Clr_Sales_Details();
  //this.Search_Sales();
  //this.Load_Dropdowns();
  this.Sales_Details_Data=[];
  //document.getElementById("Tab_Edit").hidden=true; 
  setTimeout(() => {
    if (this.topDiv1) {
        this.topDiv1.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});
}
Focus_It(event)
{ 
  //const element = this.renderer.selectRootElement('#Barcode_n');
  setTimeout("$('[name=Barcode_n]').focus();", 0)
  //setTimeout(() => this.inputEl.nativeElement.focus());
}
Focus_down(event) {      
  // const element = this.renderer.selectRootElement('#Barcode_List');
  //setTimeout("$('[name=1]').focus();", 0)
  //setTimeout(() => this.inputEl.nativeElement.focus());
}
New_Date(Date_)
{
      this.date=Date_;
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth() + 1;
      if (this.month < 10) {
      this.month = "0" + this.month;
  }
      this.day = this.date.getDate().toString();
      if (Number.parseInt(this.day) <10) {
      this.day = "0" + this.day;
  }
      this.date = this.year + "-" + this.month + "-" + this.day;
    //  this.date = this.day + "-"+ this.month + "-" + this.year ;
      return this.date;
}
numberToEnglish(n, custom_join_character) {
  var string = n.toString(),
      units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;
  var and = custom_join_character || 'and';
  /* Is number zero? */
  if (parseInt(string) === 0) {
      return 'zero';
  }
  /* Array of units as words */
  units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  /* Array of tens as words */
  tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  /* Array of scales as words */
  scales = ['', 'Thousand', 'Million', 'Billion'];
  /* Split user arguemnt into 3 digit chunks from right to left */
  start = string.length;
  chunks = [];
  while (start > 0) {
      end = start;
      chunks.push(string.slice((start = Math.max(0, start - 3)), end));
  }
  /* Check if function has enough scale words to be able to stringify the user argument */
  chunksLen = chunks.length;
  if (chunksLen > scales.length) {
      return '';
  }
  /* Stringify each integer in each chunk */
  words = [];
  for (i = 0; i < chunksLen; i++) {
      chunk = parseInt(chunks[i]);
      if (chunk) {
          /* Split chunk into array of individual integers */
          ints = chunks[i].split('').reverse().map(parseFloat);
          /* If tens integer is 1, i.e. 10, then add 10 to units integer */
          if (ints[1] === 1) {
              ints[0] += 10;
          }
          /* Add scale word if chunk is not zero and array item exists */
          if ((word = scales[i])) {
              words.push(word);
          }
          /* Add unit word if array item exists */
          if ((word = units[ints[0]])) {
              words.push(word);
          }
          /* Add tens word if array item exists */
          if ((word = tens[ints[1]])) {
              words.push(word);
          }
          /* Add 'and' string after units or tens integer if: */
          if (ints[0] || ints[1]) {
              /* Chunk has a hundreds integer or chunk is the first of multiple chunks */
              if (ints[2] || !i && chunksLen) {
                  words.push(and);
              }
          }
          /* Add hundreds word if array item exists */
          if ((word = units[ints[2]])) {
              words.push(word + ' hundred');
          }
      }
  }
  return words.reverse().join(' ');
}
//var Amount_Paid = (Receipt_Array.Amount);
New_Date_Format(Date_)
{
  debugger;
      this.date=Date_;
      this.year = this.date.getFullYear();
      this.month = this.date.getMonth() + 1;
      if (this.month < 10) {
      this.month = "0" + this.month;
      }
      this.day = this.date.getDate().toString();
      if (Number.parseInt(this.day) <10) {
      this.day = "0" + this.day;
      }
      this.date = this.day + "-" + this.month + "-" + this.year;
    //  this.date = this.day + "-"+ this.month + "-" + this.year ;
      return this.date;
}
Print_Click()
{   

  this.printCharge1per = false;
  this.printChargeAmount1 = false;
  this.printChargeAmount2 = false;
  this.printVAT_Amount = false;
  this.printDiscount_Description = false;
  this.printAdditional_Discount = false;
  this.printRoundoff_Amt = false;

  this.Sales_Return_Master_.EntryDate = this.formatDate(this.Sales_Return_Master_.EntryDate)
  this.Sales_Return_Master_.PrintDate = this.formatPrintDate(this.Sales_Return_Master_.EntryDate);

  debugger;

  if(this.Sales_Return_Master_.Charge1per != '')
      if(this.Sales_Return_Master_.Charge1per != null )
         if(this.Sales_Return_Master_.Charge1per != undefined )
         if(this.Sales_Return_Master_.Charge1per.toString() != '0')
          if(this.Sales_Return_Master_.Charge1per.toString() != 'null')
                  if(this.Sales_Return_Master_.Charge1per.toString() != 'undefined')
                      {
                          this.printCharge1per = true;
                      }


                      debugger;
 if(this.Sales_Return_Master_.charge1_Amount != 0)
     if(this.Sales_Return_Master_.charge1_Amount != null)
         if(this.Sales_Return_Master_.charge1_Amount != undefined )
    if( this.Sales_Return_Master_.charge1_Amount.toString() != '0')
 if( this.Sales_Return_Master_.charge1_Amount.toString() != 'null')
     if( this.Sales_Return_Master_.charge1_Amount.toString() != 'undefined' )
     if( this.Sales_Return_Master_.charge1_Amount.toString() != '0.000')
  {
      this.printChargeAmount1 = true;
  }



debugger;
 if(this.Sales_Return_Master_.charge2_Amount != 0)
     if(this.Sales_Return_Master_.charge2_Amount != null)
         if(this.Sales_Return_Master_.charge2_Amount != undefined )
    if( this.Sales_Return_Master_.charge2_Amount.toString() != '0')
 if( this.Sales_Return_Master_.charge2_Amount.toString() != 'null')
     if( this.Sales_Return_Master_.charge2_Amount.toString() != 'undefined' )
     if( this.Sales_Return_Master_.charge2_Amount.toString() != '0.000')
  {
      this.printChargeAmount2 = true;
  }


  debugger;
  if(this.Sales_Return_Master_.VAT_Amount != 0)
      if(this.Sales_Return_Master_.VAT_Amount != null )
         if(this.Sales_Return_Master_.VAT_Amount != undefined )
         if(this.Sales_Return_Master_.VAT_Amount.toString() != '0')
          if(this.Sales_Return_Master_.VAT_Amount.toString() != 'null')
                  if(this.Sales_Return_Master_.VAT_Amount.toString() != 'undefined')
                      {
                          this.printVAT_Amount = true;
                      }

                      if(this.Sales_Return_Master_.Discount_Description != '')
                          if(this.Sales_Return_Master_.Discount_Description != null )
                             if(this.Sales_Return_Master_.Discount_Description != undefined )
                             if(this.Sales_Return_Master_.Discount_Description.toString() != '0')
                              if(this.Sales_Return_Master_.Discount_Description.toString() != 'null')
                                      if(this.Sales_Return_Master_.Discount_Description.toString() != 'undefined')
                                          {
                                              this.printDiscount_Description = true;
                                          }


                                          if(this.Sales_Return_Master_.Additional_Discount != 0)
                                              if(this.Sales_Return_Master_.Additional_Discount != null )
                                                 if(this.Sales_Return_Master_.Additional_Discount != undefined )
                                                 if(this.Sales_Return_Master_.Additional_Discount.toString() != '0')
                                                  if(this.Sales_Return_Master_.Additional_Discount.toString() != 'null')
                                                          if(this.Sales_Return_Master_.Additional_Discount.toString() != 'undefined')
                                                              {
                                                                  this.printAdditional_Discount = true;
                                                              }

                                                              if(this.Sales_Return_Master_.Roundoff_Amt != 0)
                                                                  if(this.Sales_Return_Master_.Roundoff_Amt != null )
                                                                     if(this.Sales_Return_Master_.Roundoff_Amt != undefined )
                                                                     if(this.Sales_Return_Master_.Roundoff_Amt.toString() != '0')
                                                                      if(this.Sales_Return_Master_.Roundoff_Amt.toString() != 'null')
                                                                              if(this.Sales_Return_Master_.Roundoff_Amt.toString() != 'undefined')
                                                                                  {
                                                                                      this.printRoundoff_Amt = true;
                                                                                  }

  this.Sales_Return_Master_.DueDate=this.formatDate(this.Sales_Return_Master_.DueDate);
    this.Sales_Return_Master_.SupplyDate=this.formatDate(this.Sales_Return_Master_.SupplyDate);
 //this.Load_Company() ;   
  // this.Image_Url='/assets/img/'+this.Print_Company_.Company_Id+'.jpg';
  // this.Company_Sign='/assets/img/Sign_'+this.Print_Company_.Company_Id+'.jpg';
  // this.Company_Seal='/assets/img/Seal_'+this.Print_Company_.Company_Id+'.jpg'; 
  for (let i = 0; i < this.currencyData.length; i++) {
    if(this.Sales_Return_Master_.CurrencyId = this.currencyData[i].CurrencyDetails_Id){
        this.currencyName = this.currencyData[i].CurrecnyName
    }
    
   }
for (let i = 0; i < this.accountData.length; i++) {
    if(this.Sales_Return_Master_.TypeId = this.accountData[i].AccountType_Id){
        this.invoiceTypeName = this.accountData[i].AccountType_Name
    }
    
   }
  setTimeout(()=>{ 
  let popupWinindow
  let innerContents = document.getElementById("Print_Div1").innerHTML;
  popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
  popupWinindow.document.open();
  popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
  popupWinindow.document.close();    
  })  
}
Print_Search_Click()
{            
  this.Image_Url='/assets/img/'+this.Print_Company_.Company_Id+'.jpg';
  this.Company_Sign='/assets/img/Sign_'+this.Print_Company_.Company_Id+'.jpg';
  this.Company_Seal='/assets/img/Seal_'+this.Print_Company_.Company_Id+'.jpg';  
  let popupWinindow
  let innerContents = document.getElementById("Print_Search_Div").innerHTML;
  popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
  popupWinindow.document.open();
  popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
  popupWinindow.document.close();      
}
Clr_Sales_Master()
{
    this.Sales_Return_Master_.Sales_Return_Master_Id =0;
  this.Sales_Master_.Sales_Master_Id=0;
  this.Sales_Return_Master_.Account_Party_Id=0;

  this.Sales_Return_Master_Id_Edit = 0;

  this.Sales_Return_Master_.User_Id=0;
  this.Sales_Return_Master_.EntryDate=new Date().toString();
  this.Sales_Return_Master_.EntryDate=this.formatDate(this.Sales_Return_Master_.EntryDate);
  this.Sales_Return_Master_.Invoice_No="";
  this.Sales_Return_Master_.CurrencyId=0;
  this.Sales_Return_Master_.LPONo="";
  this.Sales_Return_Master_.DONo="";
  this.Sales_Return_Master_.PaymentTerms = "";
  this.Sales_Return_Master_.Payment_Term_Description = 0;
  this.Sales_Return_Master_.PackingListNumber = 0;
  this.Sales_Return_Master_.Description1 = "";
  this.Sales_Return_Master_.Discount_Description = "";
  this.Sales_Return_Master_.Charge1per = "";
  this.Sales_Return_Master_.Charge2 = "";
  this.Sales_Return_Master_.VAT_percentage = this.Default_Vat_Percentage;
  this.Sales_Return_Master_.Additional_Discount = 0;
  this.Sales_Return_Master_.charge1_Amount = 0;
  this.Sales_Return_Master_.charge2_Amount = 0;
  this.Sales_Return_Master_.TotalDiscount = 0
  this.Sales_Return_Master_.VAT_Amount = 0;
  this.Sales_Return_Master_.Total_Amount = 0;
  this.Sales_Return_Master_.Roundoff_Amt = 0;
  this.Sales_Return_Master_.Amount_In_Words = "";
  this.Sales_Return_Master_.NetTotal=0;
  this.Sales_Return_Master_.Cess=0;
  this.Sales_Return_Master_.RoundOff=0;
  this.Sales_Return_Master_.TotalAmount=0;
  this.Sales_Return_Master_.Description2="";
  this.Sales_Return_Master_.Address1="";
  this.Sales_Return_Master_.Address2="";
  this.Sales_Return_Master_.Address3="";
  this.Sales_Return_Master_.Address4="";
  this.Sales_Return_Master_.Mobile="";
    if (this.Company_Data && this.Company_Data.length > 0) {
        this.Sales_Return_Master_.Company_Id = this.Company_Data[0].Company_Id;
        this.Company_ = this.Company_Data[0];
        this.Print_Company_ = this.Company_Data[0];
    }

  this.Sales_Return_Master_.Customer_Name="";
  this.Sales_Return_Master_.PinCode="";
  this.Sales_Return_Master_.GSTNo="";    
  this.Sales_Return_Master_.GrandTotal=0;
  this.Sales_Return_Master_.Transportation_Gst=0;
  this.Sales_Return_Master_.Handling_Gst=0;
  this.Sales_Return_Master_.Transportation_Total=0;
  this.Sales_Return_Master_.Handling_Total=0;
  this.Sales_Return_Master_.Vehicle_No="";
  this.Sales_Return_Master_.Driver_Name="";
  // this.Sales_Master_.PaymentTermValue = 0;
  this.Sales_Return_Master_.Discount_Description = "";
  this.Sales_Return_Master_.Mobile_No = "";
  this.Sales_Return_Master_.Delivery_Address1 = "";
  this.Sales_Return_Master_.Delivery_Address2 = "";
  this.Sales_Return_Master_.Delivery_Address3 = "";
  this.Sales_Return_Master_.Delivery_Address4 = "";
  if(this.Bill_Type_Data!=undefined && this.Bill_Type_Data!=null)
  this.Bill_Type_=this.Bill_Type_Data[1];
  if(this.Bill_Mode_Data!=undefined && this.Bill_Mode_Data!=null)
  this.Bill_Mode_=this.Bill_Mode_Data[0];
  this.Customer_=null;
  this.Sales_Details_Data=[];
  this.Address1 = null;
  this.Customer_Name = null;
  this.Address2 = null;
  this.Address3 = null;
  this.Address4 = null;
  this.Vatin = null;
  // this.Sales_Master_.POnumber = null;
  this.Attention = null;
  this.Employee = null;
  this.Tot_Amount = 0;
  this.Total = 0;
  this.SaleInvoiceNo = null;

  if(this.currencyData != undefined || this.currencyData !=null)
  {
    this.Currency = this.currencyData[0];
  }

  debugger;
  if(this.AccounttypeData !=undefined || this.AccounttypeData != null )
  {
    this.Accounttype = this.AccounttypeData[0];
  }

  this.Sales_Return_Master_.KindAttend = '';
  this.Sales_Return_Master_.PaymentTermValue = 0;

  if(this.PaymentTermData != undefined || this.PaymentTermData != null)
  {
    this.Payment_Term_Description_ = this.PaymentTermData[0];
  }

  this.Sales_Return_Master_.AttendEmployee = '';
  this.Sales_Return_Details_Data = [];
  this.Sales_Return_Master_.Charge1 = '';
  this.Sales_Return_Master_.Employee = '';
  this.Sales_Return_Master_.TotalDiscount = 0;
  this.Sales_Return_Master_.Total = 0;
  this.Sales_Return_Master_.Total_Amount = 0;
  this.Sales_Return_Master_.NetTotal = 0;
  this.Sales_Return_Master_.Amount_In_Words = '';

}
Clr_Sales_Details()
{
  this.Sales_Details_Index=-1;
  this.Sales_Return_Details_.Sales_Return_Details_Id=0;
  this.Sales_Return_Details_.Sales_Return_Master_Id=0;
  this.Sales_Return_Details_.Stock_Id=0;
  //this.Sales_Return_Details_.Stock_Details_Id=0;
  this.Sales_Return_Details_.ItemId=0;
  this.Sales_Return_Details_.ItemName="";
  this.Sales_Return_Details_.ItemCode="";
  this.Sales_Return_Details_.GroupId=0;
  this.Sales_Return_Details_.GroupName="";
  this.Sales_Return_Details_.UnitId=0;
  this.Sales_Return_Details_.UnitName="";
  this.Sales_Return_Details_.Stock=0;
  this.Sales_Return_Details_.HSNCODE="";
  this.Sales_Return_Details_.Description="";
  this.Sales_Return_Details_.Availability = '0';
  this.Barcode_=null;
  this.Stock_=null;

}
Clr_Sales_Edit_Data()
{
  this.Edit_CGST=0;
  this.Edit_SGST=0;
  this.Edit_GST=0;
  this.Edit_Discount=0;
  this.Edit_Cess=0;
  this.Edit_Net=0;
  this.Edit_Gross=0;
  this.Edit_Totamt=0;
  this.Sales_Details_Description="";
}
Delete_Sales_Details(Sales_Details_e:Sales_Details,index)
{
     
  this.Sales_Details_Data.splice(index, 1);   

  this.addBlankRows();
  this.Final_Amounts();
this.Clr_Sales_Edit_Data();
}
Change_Bill_Status(Sales_Master_Id,BillType,index)
{
 const dialogRef = this.dialogBox.open
 ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Are you sure to Change the Status?',Type:"true",Heading:'Confirm'}});
 dialogRef.afterClosed().subscribe(result =>
 {
 if(result=='Yes')
 {
 this.issLoading=true;   
 this.Sales_Master_Service_.Change_Bill_Status(Sales_Master_Id,BillType).subscribe(Status => {       
  Status=Status[0];
 if(Status[0].Sales_Master_Id_>0){
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Status Changed',Type:"false"}});
 }
 else
 {
 //this.Sales_Master_Data.splice(index, 1);
 const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"false"}});
 }
 this.Search_SalesReturn_Master();
 this.issLoading=false;
 },
 Rows => {
     this.issLoading=false;
 const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error',Type:"2"}});
 });
 }
 });
}


Delete_Sales_Master(SalesSalesMaster_Id,index)
{
  const dialogRef = this.dialogBox.open
  ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
  dialogRef.afterClosed().subscribe(result =>        
  {    
  if(result=='Yes')
  {
  this.issLoading=true;
  debugger
  this.Sales_Master_Service_.Delete_Sales_Master(SalesSalesMaster_Id).subscribe(Delete_status => {    
      debugger   
      Delete_status=Delete_status[0];
  if(Delete_status[0].SalesSalesMaster_Id_>0){
  this.Sales_Master_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    
    this.Search_SalesReturn_Master();
  }
  else
  {
  //this.Sales_Master_Data.splice(index, 1);
  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
  }
  this.issLoading=false;
  },
  Rows => {
      this.issLoading=false;
  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error',Type:"2"}});
  });
  }
  });
}





Load_Bill_Type()
{
  debugger;
  var value=1;
      this.Sales_Master_Service_.Load_Bill_Type(value).subscribe(Rows => {    
      if (Rows != null) {
      this.Bill_Type_Data = this.getResultSet(Rows, 0) || [];        
      this.Bill_Type_Temp.Bill_Type_Id = 0;
      this.Bill_Type_Temp.Bill_Type_Name = "Select";
      this.Bill_Type_Data.unshift(this.Bill_Type_Temp);
      debugger;
      this.Bill_Type_Search=this.Bill_Type_Data[0];
      this.Bill_Type_=this.Bill_Type_Data[1];
      }
      this.issLoading = false;
      },
      Rows => {
      this.issLoading = false;
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
      });
}
Load_Bill_Mode()
{
      this.Sales_Master_Service_.Load_Bill_Mode().subscribe(Rows => {    
      if (Rows != null) {
      this.Bill_Mode_Data = this.getResultSet(Rows, 0) || [];        
      this.Bill_Mode_Temp.Bill_Mode_Id = 0;
      this.Bill_Mode_Temp.Bill_Mode_Name = "Select";
      this.Bill_Mode_Data.unshift(this.Bill_Mode_Temp);
      this.Bill_Mode_=this.Bill_Mode_Data[0];
      }
      this.issLoading = false;
      },
      Rows => {
      this.issLoading = false;
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
      });
}
Load_Cess()
{
  this.Sales_Master_Service_.Load_Cess().subscribe(Rows => {      
    
      if (Rows != null) {
       //   Rows=0;//Rows[0];
          this.Cess = 0;//Rows[0].Cess;
      }
      this.issLoading = false;
  },
      Rows => {
          this.issLoading = false;
  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
      });
}
Load_Company_bank()
{
  debugger;
  this.Sales_Master_Service_.Load_Company_Bank().subscribe(Rows => {   
    if (Rows != null) {
          debugger;
          this.Bank_Data=Rows[0];
      this.Bank_ = this.Bank_Data[0]
      this.Company_ = Rows[1][0]
      }
      this.issLoading = false;
  },
      Rows => {
          this.issLoading = false;
  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
      });
}

Search_Customer_Typeahead(event: any)
{
  var Value = "";
  if (event.target.value == "")
      Value = undefined;
  else
      Value = event.target.value;
    {
   this.issLoading = true;
  this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39',Value).subscribe(Rows => {     
  if (Rows != null) {
      this.Customer_Data = Rows[0];
  }
  this.issLoading = false;
  },
  Rows => {
   
  this.issLoading = false;
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  });
  }
}


Search_PurchaseOrderNumber_Typeahead(event: any)
{
  var Value = "";
  
  Value = event.target.value;
    
   this.issLoading = true;
  this.purchaseordermaster_Service_.Search_PurchaseOrderNumber_Typeahead(Value).subscribe(Rows => {     
  if (Rows != null) {
      this.PurchaseOrder_Data = Rows[0];
  }
  this.issLoading = false;
  },
  Rows => {
   
  this.issLoading = false;
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  });
  
}

Search_User_Details(event: any)
{
   var Value = "";
   
   Value = event.target.value;
     
    this.issLoading = true;
   this.User_Details_Service_.Search_User_Details(Value,this.User_Type,this.Login_User_Id).subscribe(Rows => {     
   if (Rows != null) {
       this.EmployeeData = Rows[0];
   }
   this.issLoading = false;
   },
   Rows => {
    
   this.issLoading = false;
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
   });
   
}

Get_Stock_Item_Code_Typeahead(event: any)
{

  if(!this.SaleInvoiceNo)
    {
        this.ItemCodeData = [];
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Choose Sales Invoice No.',Type:"2"}});
        return;
    }
   var Value = "";
   
   Value = event.target.value;
     
    this.issLoading = true;
   this.Sales_Master_Service_.Get_Item_Code_Typeahead_For_Sales_Return(this.SaleInvoiceNo.Sales_Master_Id,Value).subscribe(Rows => {     
   if (Rows != null) {
       this.ItemCodeData = Rows[0];
   }
   this.issLoading = false;
   },
   Rows => {
    
   this.issLoading = false;
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
   });
   
}


Search_Item_Typeahead(event: any)
{

  if(!this.SaleInvoiceNo)
    {
        this.Stock_Data_Filter = [];
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Choose Sales Invoice No.',Type:"2"}});
        return;
    }

    if(this.Barcode_ == null || this.Barcode_ == undefined)
      this.Barcode_ = new Sales_Return_Details();

  var Value = "";
  if (event.target.value == "") Value = "";
  else Value = event.target.value.toLowerCase();

  this.Barcode_.ItemName=Value
  this.Sales_Return_Details_.ItemName=Value;

          this.issLoading = true;
  this.Sales_Master_Service_.Get_Item_Name_Typeahead_For_Sales_Return(this.SaleInvoiceNo.Sales_Master_Id,Value).subscribe(Rows => {

      if (Rows != null) {
          this.Stock_Data = Rows[0];
      }
      

      this.issLoading = false;
  },
      Rows => {             
          this.issLoading = false;
  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
      });
  }

display_Item(Stock_e: Stock)
{
   if (Stock_e) { return Stock_e.ItemName; }
}



formatPrintDate(dateString): string {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    console.error('Invalid date:', dateString);
    return '';
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${day}-${month}-${year}`;
}












Barcode_keyup(event: any)
{

  this.Search_Barcode_Typeahead(event);
}
Search_Barcode_Typeahead(event: any)
{
    var Value = "";
  if (event.target.value == "")
      Value = undefined;
  else
      Value = event.target.value;
      {
      this.issLoading = true;
      this.Sales_Master_Service_.Search_Barcode_Typeahead(Value).subscribe(Rows => {
          if (Rows != null) 
          {
              this.Barcode_Data = Rows[0];
          }
          this.issLoading = false;
      },
      Rows => {     
          this.issLoading = false;
  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
      });
  }
}

display_ItemCode(item) 
{
  if (item) { return item.Item_Code; }
}


display_Customer(Client_Accounts_e: Client_Accounts)
{
  if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
}
display_PurchaseOrderNo(item)
{
  if (item) { return item.InvoiceNo; }
}
display_User(item)
{
  if (item) { return item.User_Details_Name; }
}

Employee_Typeahead(event: any)
{    
  var Value = "";
   if (event.target.value == "")
       Value = undefined;
   else
       Value = event.target.value;             
      // if(this.Item_Data==undefined || this.Item_Data.length==0)
       {             
           this.issLoading = true;
   this.User_Details_Service_.Employee_Typeahead(2,Value).subscribe(Rows => {
 
       if (Rows != null) {
           this.Employee_Data = Rows[0];
            }
            this.issLoading = false;
   },
       Rows => {            
           this.issLoading = false;
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
       });
   }
}
display_Employee(Client_Accounts_e: Client_Accounts)
{
 if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
}
// Customer_Change( Customer_T_)
// {
//     debugger
//   this.Customer_=Customer_T_;
  
//   this.Sales_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
//   this.Sales_Master_.Customer=this.Customer_.Client_Accounts_Name;
//   this.Sales_Master_.Address1 = this.Customer_.Address1;
//   this.Sales_Master_.Address2 = this.Customer_.Address2;
//   this.Sales_Master_.Address3 = this.Customer_.Address3;
//   this.Sales_Master_.Address4 = this.Customer_.Address4;
//   this.Sales_Master_.Mobile = this.Customer_.Mobile;
//   this.Sales_Master_.PinCode=this.Customer_.PinCode;
//   this.Sales_Master_.GSTNo=this.Customer_.GSTNo;
//   this.selectedAccountPartyId = this.Customer_.Client_Accounts_Id;
// }

selectCustomer(){
  debugger;
  this.Customer_Name = this.Customer_.Client_Accounts_Name
  this.Address1 = this.Customer_.Address1;
  this.Address2 = this.Customer_.Address2;
  this.Address3 = this.Customer_.Address3;
  this.Address4 = this.Customer_.Address4;
  this.Vatin = this.Customer_.GSTNo;
}


Item_Name_Change(Item_sl:Sales_Return_Details){

  debugger;

  this.Sales_Return_Details_=Object.assign({},Item_sl);

this.Item_Temp_.StockId=Item_sl.Stock_Id;
this.Item_Temp_.ItemId=Item_sl.ItemId;
this.Item_Temp_.ItemName=Item_sl.ItemName;
this.Item_Temp_.Item_Code=Item_sl.Item_Code;
this.Barcode_=Object.assign({},this.Item_Temp_);

this.Sales_Return_Details_.StockId=Item_sl.Stock_Id; 
this.Sales_Return_Details_.ItemCode=Item_sl.Item_Code;

this.Sales_Return_Details_.ItemId=Item_sl.ItemId;
this.Sales_Return_Details_.ItemName=Item_sl.ItemName;


  // this.Barcode_Temp.Stock_Id=this.Stock_.Stock_Id;
  // this.Barcode_Temp.Barcode=this.Stock_.Barcode;
  // this.Barcode_=Object.assign({},this.Barcode_Temp);
  // this.Sales_Return_Details_.ItemCode=this.Stock_.Barcode;
  // this.Sales_Return_Details_.ItemId=this.Stock_.ItemId;
  // this.Sales_Return_Details_.ItemName=this.Stock_.ItemName;
  // this.Sales_Return_Details_.UnitId=this.Stock_.UnitId;
  // this.Sales_Return_Details_.UnitName=this.Stock_.UnitName;
  // this.Sales_Return_Details_.MRP=this.Stock_.MRP;
  // this.Sales_Return_Details_.PurchaseRate=this.Stock_.PurchaseRate;
  // this.Sales_Return_Details_.UnitPrice=this.Stock_.SaleRate;
  // this.Sales_Return_Details_.GroupId=this.Stock_.GroupId;
  // this.Sales_Return_Details_.GroupName=this.Stock_.GroupName;
  // this.Sales_Return_Details_.HSNMasterId=this.Stock_.HSNMasterId;
  // this.Sales_Return_Details_.HSNCODE=this.Stock_.HSNCODE;
  // this.Sales_Return_Details_.StockId=this.Stock_.Stock_Id;
  // this.Sales_Return_Details_.Sale_Tax=this.Stock_.SaleTax; 

  // this.Sales_Return_Details_.Country_Id=this.Stock_.Country_Id;
  // this.Sales_Return_Details_.Country_Name=this.Stock_.Country_Name; 
}
Barcode_Change()
{
  this.Stock_Temp.ItemId=this.Barcode_.ItemId;
  this.Stock_Temp.ItemName=this.Barcode_.ItemName;
  this.Stock_=Object.assign({},this.Stock_Temp);
  this.Sales_Details_.ItemId=this.Barcode_.ItemId;
  this.Sales_Details_.ItemName=this.Barcode_.ItemName;
  this.Sales_Details_.UnitId=this.Barcode_.UnitId;
  this.Sales_Details_.UnitName=this.Barcode_.UnitName;
  this.Sales_Details_.MRP=this.Barcode_.MRP;
  this.Sales_Details_.PurchaseRate=this.Barcode_.PurchaseRate;
  this.Sales_Details_.Stock=this.Barcode_.Quantity;
  this.Sales_Details_.SaleRate=this.Barcode_.SaleRate;
  this.Sales_Details_.ItemName=this.Barcode_.ItemName;
  this.Sales_Details_.GroupId=this.Barcode_.GroupId;
  this.Sales_Details_.GroupName=this.Barcode_.GroupName;
  this.Sales_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
  this.Sales_Details_.HSNCODE=this.Barcode_.HSNCODE;
  this.Sales_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
  this.Sales_Details_.Stock_Id=this.Barcode_.Stock_Id;
  this.Sales_Details_.SaleTax=this.Barcode_.SaleTax;
  //this.Sales_Details_.Barcode=this.Barcode_.Barcode;  
}
// Calculate_Sales_Details_Amount()
// {
//   debugger
//   if(this.Sales_Details_.Quantity == undefined || this.Sales_Details_.Quantity == null)
//   this.Sales_Details_.Quantity = 0;
//   if(this.Sales_Details_.SaleRate == undefined || this.Sales_Details_.SaleRate == null)
//   this.Sales_Details_.SaleRate = 0;

// this.Calculate_Total_Amount();
// }
// Calculate_Total_Amount()
// { 
//   this.unitDiscount = (this.SaleRate * this.discount )/ 100;
//   this.TotalAmount = this.Quantity * this.SaleRate - (this.unitDiscount*this.Quantity);
  
// }


Calculate_Quotation_Details_Amount()
{
    debugger
    if(this.Sales_Return_Details_.Quantity == undefined || this.Sales_Return_Details_.Quantity == null)
    this.Sales_Return_Details_.Quantity = 0;
    if(this.Sales_Return_Details_.UnitPrice == undefined || this.Sales_Return_Details_.UnitPrice == null)
    this.Sales_Return_Details_.UnitPrice = 0;


 this.Calculate_Total_Amount();
}
Calculate_Total_Amount()
{ 
    debugger;
    if(this.Sales_Return_Details_.Discount == undefined || this.Sales_Return_Details_.Discount == null)
        this.Sales_Return_Details_.Discount = 0;
    if(this.Sales_Return_Details_.Item_Discount_Amount == undefined || this.Sales_Return_Details_.Item_Discount_Amount == null)
        this.Sales_Return_Details_.Item_Discount_Amount = 0;

    this.Sales_Return_Details_.Unit_Discount = (Number(this.Sales_Return_Details_.UnitPrice) * Number(this.Sales_Return_Details_.Discount))/ 100;
    this.Sales_Return_Details_.Unit_Discount = Number(this.Sales_Return_Details_.Unit_Discount.toFixed(3));

    this.Sales_Return_Details_.Item_Discount_Amount =Number(this.Sales_Return_Details_.Unit_Discount) * Number(this.Sales_Return_Details_.Quantity);
    this.Sales_Return_Details_.Item_Discount_Amount = Number(this.Sales_Return_Details_.Item_Discount_Amount.toFixed(3));

    this.Sales_Return_Details_.Amount = Number(this.Sales_Return_Details_.Quantity) * Number(this.Sales_Return_Details_.UnitPrice);
    this.Sales_Return_Details_.Amount =Number(this.Sales_Return_Details_.Amount.toFixed(3));
 
    this.Sales_Return_Details_.TaxableAmount = Number(this.Sales_Return_Details_.Amount) - Number(this.Sales_Return_Details_.Item_Discount_Amount);
    this.Sales_Return_Details_.TaxableAmount =Number(this.Sales_Return_Details_.TaxableAmount.toFixed(3));

    this.Sales_Return_Details_.TaxAmount = Number(this.Sales_Return_Details_.TaxableAmount) * Number(this.Sales_Return_Details_.SaleTax) /100;
    this.Sales_Return_Details_.NetValue= Number(this.Sales_Return_Details_.TaxableAmount) + Number(this.Sales_Return_Details_.TaxAmount);

    this.Sales_Return_Details_.Item_Discount_Amount=Number(this.Sales_Return_Details_.Item_Discount_Amount.toFixed(3));    
    this.Sales_Return_Details_.Amount=Number(this.Sales_Return_Details_.Amount.toFixed(3));    
    this.Sales_Return_Details_.TaxableAmount=Number(this.Sales_Return_Details_.TaxableAmount.toFixed(3));
    this.Sales_Return_Details_.TaxAmount=Number(this.Sales_Return_Details_.TaxAmount.toFixed(3));  
    this.Sales_Return_Details_.NetValue= Number(this.Sales_Return_Details_.NetValue.toFixed(3));
    
}
Round_Off_Calculation()
{   
  if(this.Sales_Master_.RoundOff == undefined || this.Sales_Master_.RoundOff == null)
      this.Sales_Master_.RoundOff = 0;   
  this.Sales_Master_.GrandTotal = Number(this.Sales_Master_.RoundOff) + Number(this.Sales_Master_.TotalAmount);
}
checkbox_Click()
{ 
  this.Final_Amounts();
}

safeNumber(value) {
  return isNaN(value) ? 0 : value;
}

// Final_Amounts_old()
// {      
//   this.Tot_Gross=0,this.Tot_discount=0,this.Tot_Net=0,this.Tot_Amount=0;
//   for(var i = 0; i< this.Sales_Return_Details_Data.length ; i++)
//   {
//       this.Tot_Amount = Number(this.Tot_Amount) + Number(this.Sales_Return_Details_Data[i].UnitPrice) * Number(this.Sales_Return_Details_Data[i].Quantity);

//       this.Tot_discount = Number(this.Tot_discount)+  (Number(this.Sales_Return_Details_Data[i].Unit_Discount) * Number(this.Sales_Return_Details_Data[i].Quantity) );
      
//   }
//   this.Tot_Amount = Number(this.Tot_Amount.toFixed(3));
//   this.Tot_discount = Number(this.Tot_discount.toFixed(3));
//   if(Number(this.Sales_Return_Master_.Discount_Description)>0){
//       this.Sales_Return_Master_.Additional_Discount = Number(this.Tot_Amount) * (Number(this.Sales_Return_Master_.Discount_Description)/ 100);

//   }else{
//       this.Sales_Return_Master_.Additional_Discount = 0
//   }
//   //this.Sales_Return_Master_.Discount_Description = (this.safeNumber(this.Sales_Return_Master_.Additional_Discount) * 100)/this.Tot_Amount
//   this.Sales_Return_Master_.TotalDiscount = Number(this.Tot_discount)+ Number(this.Sales_Return_Master_.Additional_Discount);
//   if(Number(this.Sales_Return_Master_.Charge1per)>0){
//       this.Sales_Return_Master_.charge1_Amount = (Number(this.Tot_Amount) - Number(this.Sales_Return_Master_.Additional_Discount))* (Number(this.Sales_Return_Master_.Charge1per)/100)
//       this.Sales_Return_Master_.charge1_Amount = Number(this.Sales_Return_Master_.charge1_Amount.toFixed(3))
//   }else{
//       this.Sales_Return_Master_.charge1_Amount =  0;
//   }
//   this.Total = Number(this.Tot_Amount)-Number(this.Sales_Return_Master_.TotalDiscount) + this.safeNumber(Number(this.Sales_Return_Master_.charge2_Amount)) + Number(this.Sales_Return_Master_.charge1_Amount)
//   console.log('this.Total: ', this.Total);
//   this.Total = Number(this.Total.toFixed(3))
//   this.Sales_Return_Master_.VAT_Amount = 0;
//   if(this.Sales_Return_Master_.VAT_Percentage>0){
//       this.Sales_Return_Master_.VAT_Amount = this.Total * (this.Sales_Return_Master_.VAT_Percentage/100)
//   }
//   this.Sales_Return_Master_.VAT_Amount = Number(this.Sales_Return_Master_.VAT_Amount.toFixed(3))    
//   this.Sales_Return_Master_.Total_Amount = this.Total + this.Sales_Return_Master_.VAT_Amount
//   this.Sales_Return_Master_.Total_Amount = Number(this.Sales_Return_Master_.Total_Amount.toFixed(3))
//   this.Sales_Return_Master_.NetTotal = Number((this.Sales_Return_Master_.Total_Amount - this.safeNumber(this.Sales_Return_Master_.Roundoff_Amt)).toFixed(3))
//   this.Sales_Return_Master_.NetTotal = Number(this.Sales_Return_Master_.NetTotal.toFixed(3))
//   this.Sales_Return_Master_.Amount_In_Words = this.numberToWordsIndianCurrency(this.Sales_Return_Master_.NetTotal)
   
 
// //this.Clr_Sales_Edit_Data();
// }


Calculate_Discount_Percent()
{
  let addDiscCheck = 1;
  let discountper = '0';

  debugger;
  if(Number(this.Sales_Return_Master_.Additional_Discount)>0){
      this.Sales_Return_Master_.Discount_Description = (this.Sales_Return_Master_.Additional_Discount * 100/this.Sales_Return_Master_.TotalAmount).toString();
      discountper = Number(this.Sales_Return_Master_.Discount_Description).toFixed(3);
      this.Sales_Return_Master_.Discount_Description = discountper; 
  }else{
      this.Sales_Return_Master_.Discount_Description = '0.000'
  }

  debugger;
  this.addDiscCheck = addDiscCheck;
  this.Final_Amounts();
}


Final_Amounts()
{      
    this.Tot_Gross=0,this.Tot_discount=0,this.Tot_Net=0,this.Sales_Return_Master_.TotalAmount=0;this.Sales_Return_Master_.Basic_Discount=0
    for(var i = 0; i< this.Sales_Return_Details_Data.length ; i++)
    {
        this.Sales_Return_Master_.TotalAmount = Number(this.Sales_Return_Master_.TotalAmount) + Number(this.Sales_Return_Details_Data[i].UnitPrice) * Number(this.Sales_Return_Details_Data[i].Quantity);

        this.Tot_discount = Number(this.Tot_discount)+  (Number(this.Sales_Return_Details_Data[i].Unit_Discount) * Number(this.Sales_Return_Details_Data[i].Quantity) );
        this.Sales_Return_Master_.Basic_Discount = this.Sales_Return_Master_.Basic_Discount + Number(this.Sales_Return_Details_Data[i].Item_Discount_Amount)
        
    }
    this.Sales_Return_Master_.TotalAmount = Number(this.Sales_Return_Master_.TotalAmount.toFixed(3));
    this.Tot_discount = Number(this.Tot_discount.toFixed(3));


    // if(Number(this.Sales_Return_Master_.Discount_Description)>0){
    //     this.Sales_Return_Master_.Additional_Discount = Number(this.Sales_Return_Master_.TotalAmount) * (Number(this.Sales_Return_Master_.Discount_Description)/ 100);
    //     this.Sales_Return_Master_.Additional_Discount = Number(this.Sales_Return_Master_.Additional_Discount.toFixed(3))
    // }else{
    //     this.Sales_Return_Master_.Additional_Discount = 0
    // }

    
    if(this.addDiscCheck == 0)
      {
      if(Number(this.Sales_Return_Master_.Discount_Description)>0){
          this.Sales_Return_Master_.Additional_Discount = Number(this.Sales_Return_Master_.TotalAmount) * (Number(this.Sales_Return_Master_.Discount_Description)/ 100);
          this.Sales_Return_Master_.Additional_Discount = Number(this.Sales_Return_Master_.Additional_Discount.toFixed(3))
          this.addDiscCheck = 0;    
  
      }else{
          this.Sales_Return_Master_.Additional_Discount = 0
          this.addDiscCheck = 0;    
  
      }
      this.addDiscCheck = 0;   
  }
  this.addDiscCheck = 0;    


    //this.Sales_Return_Master_.Discount_Description = (this.safeNumber(this.Sales_Return_Master_.Additional_Discount) * 100)/this.Sales_Return_Master_.TotalAmount
    this.Sales_Return_Master_.TotalDiscount = Number(this.Tot_discount)+ Number(this.Sales_Return_Master_.Additional_Discount);
    this.Sales_Return_Master_.TotalDiscount = Number(this.Sales_Return_Master_.TotalDiscount.toFixed(3))
    if(Number(this.Sales_Return_Master_.Charge1per)>0){
        this.Sales_Return_Master_.charge1_Amount = (Number(this.Sales_Return_Master_.TotalAmount) - Number(this.Sales_Return_Master_.Additional_Discount))* (Number(this.Sales_Return_Master_.Charge1per)/100)
        this.Sales_Return_Master_.charge1_Amount = Number(this.Sales_Return_Master_.charge1_Amount.toFixed(3))
    }else{
        this.Sales_Return_Master_.charge1_Amount =  0;
    }
    this.Sales_Return_Master_.Total = Number(this.Sales_Return_Master_.TotalAmount)-Number(this.Sales_Return_Master_.TotalDiscount) + this.safeNumber(Number(this.Sales_Return_Master_.charge2_Amount)) + Number(this.Sales_Return_Master_.charge1_Amount)
    console.log('this.Total: ', this.Sales_Return_Master_.Total);
    this.Sales_Return_Master_.Total = Number(this.Sales_Return_Master_.Total.toFixed(3))
    this.Sales_Return_Master_.VAT_Amount = 0;
    if(this.Sales_Return_Master_.VAT_percentage>0){
        this.Sales_Return_Master_.VAT_Amount = this.Sales_Return_Master_.Total * (this.Sales_Return_Master_.VAT_percentage/100)
    }
    this.Sales_Return_Master_.VAT_Amount = Number(this.Sales_Return_Master_.VAT_Amount.toFixed(3))    
    this.Sales_Return_Master_.Total_Amount = this.Sales_Return_Master_.Total + this.Sales_Return_Master_.VAT_Amount
    this.Sales_Return_Master_.Total_Amount = Number(this.Sales_Return_Master_.Total_Amount.toFixed(3))
    this.Sales_Return_Master_.NetTotal = Number((this.Sales_Return_Master_.Total_Amount - this.safeNumber(this.Sales_Return_Master_.Roundoff_Amt)).toFixed(3))
    this.Sales_Return_Master_.NetTotal = Number(this.Sales_Return_Master_.NetTotal.toFixed(3))
    this.Sales_Return_Master_.Amount_In_Words = this.numberToWordsIndianCurrency(this.Sales_Return_Master_.NetTotal)
     
   
//this.Clr_Sales_Edit_Data();
}
Manual_Roundoff_Calculation()
{
  var Point_=0.50;
  this.roundoff_value=0;
  this.roundoff_value=this.Sales_Master_.TotalAmount-(Math.round(this.Sales_Master_.TotalAmount));
  if(this.roundoff_value<Number(Point_))
  this.roundoff_value=- this.roundoff_value;
 // this.Sales_Master_.TotalAmount=this.Sales_Master_.TotalAmount+  this.roundoff_value;
  this.Sales_Master_.RoundOff=Number(this.roundoff_value);
  this.Sales_Master_.RoundOff=Number(this.Sales_Master_.RoundOff.toFixed(3));
  this.Sales_Master_.TotalAmount= Number(this.Sales_Master_.TotalAmount.toFixed(3));
}
Calculation_GSt()
{
  if(this.Sales_Master_.Isgst==true)
  {
      this.Sales_Master_.Transportation_Gst = Number(this.Sales_Master_.Transportation_Charge) * (18 / 100)
      this.Sales_Master_.Transportation_Total = Number(this.Sales_Master_.Transportation_Charge) + Number(this.Sales_Master_.Transportation_Gst) ;
      this.Sales_Master_.Handling_Gst = (this.Sales_Master_.Handling_Charge) * (18 / 100)
      this.Sales_Master_.Handling_Total = Number(this.Sales_Master_.Handling_Charge) + Number(this.Sales_Master_.Handling_Gst);
 }
}
Search_SalesReturn_Master()
{
  var look_In_Date_Value=0,CustomerId_=0,Item_Group_Id_=0,CurrencyDetails_Id_=0,User_Details_Id_ = 0, AccountType_Id_ = 0;
  this.Sales_Master_Total_Amount=0;    
  this.Page_Index=0;
  if (this.Date_Check == true )
      look_In_Date_Value = 1;
  if(this.Search_Customer.Client_Accounts_Id==null || this.Search_Customer.Client_Accounts_Id==undefined)
   CustomerId_=0;
  else
   CustomerId_=this.Search_Customer.Client_Accounts_Id;
  if(this.Item_Group_Search.Item_Group_Id==null || this.Item_Group_Search.Item_Group_Id==undefined)
      Item_Group_Id_=0;
  else
      Item_Group_Id_=this.Item_Group_Search.Item_Group_Id;
  if(this.Currency_Search.CurrencyDetails_Id==null || this.Currency_Search.CurrencyDetails_Id==undefined)
      CurrencyDetails_Id_=0;
  else
      CurrencyDetails_Id_=this.Currency_Search.CurrencyDetails_Id;
  if(this.searchAccountType.AccountType_Id==null || this.searchAccountType.AccountType_Id==undefined)
        AccountType_Id_=0;
  else
        AccountType_Id_=this.searchAccountType.AccountType_Id;
  // if(this.Employee_Search.User_Details_Id==null || this.Employee_Search.User_Details_Id==undefined)
  //     User_Details_Id_=0;User_Details_Id_
  // else
  //     User_Details_Id_=this.Employee_Search.User_Details_Id;
  
  this.issLoading = true;
  this.QuotNo = this.QuotNo == "" ? undefined : this.QuotNo;
  this.partNo = this.partNo == "" ? undefined : this.partNo;

  this.Sales_Master_Service_.Search_SalesReturn_Master(look_In_Date_Value, moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'), CustomerId_, this.QuotNo, this.partNo, Item_Group_Id_,
      CurrencyDetails_Id_, AccountType_Id_,
      this.User_Type_Id, this.Login_User_Id)
  .pipe(finalize(() => this.issLoading = false))
  .subscribe({
      next: (response: any) => {
          if (response.success) {
              this.Sales_Return_Master_Data = response.data;
              if (this.Sales_Return_Master_Data.length > 0) {
                  for (var i = 0; i < this.Sales_Return_Master_Data.length; i++) {
                      this.Sales_Master_Total_Amount = Number(this.Sales_Master_Total_Amount) + Number(this.Sales_Return_Master_Data[i].NetTotal);
                      this.Sales_Master_Total_Amount = Number(this.Sales_Master_Total_Amount.toFixed(3));
                  }
              }
              this.Total_Entries = this.Sales_Return_Master_Data.length;
          } else {
              const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: response.message || 'No Details Found', Type: "3" } });
          }
      },
      error: (err) => {
          const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
      }
  });
}

get Paginated_Sales_Return_Data(): Sales_Return_Master[] {
  const source = this.Sales_Return_Master_Data || [];
  const start = this.Page_Index * this.Page_Size;
  return source.slice(start, start + this.Page_Size);
}

get Sales_Return_Total_Pages(): number {
  const total = this.Total_Entries || (this.Sales_Return_Master_Data || []).length;
  return Math.max(1, Math.ceil(total / this.Page_Size));
}

get Sales_Return_Page_Start(): number {
  if (!this.Total_Entries) return 0;
  return this.Page_Index * this.Page_Size + 1;
}

get Sales_Return_Page_End(): number {
  return Math.min((this.Page_Index + 1) * this.Page_Size, this.Total_Entries || 0);
}

Previous_Sales_Return_Page() {
  if (this.Page_Index > 0) this.Page_Index--;
}

Next_Sales_Return_Page() {
  if (this.Page_Index < this.Sales_Return_Total_Pages - 1) this.Page_Index++;
}

Add_Sales_Details()
{     
  if (this.Sales_Details_Index >= 0) {
      this.Sales_Details_Data[this.Sales_Details_Index] = Object.assign({}, this.Sales_Details_);
      }
  else {
      //this.Sales_Details_.Barcode=this.Barcode_.Barcode;
      this.Sales_Details_Data.push(Object.assign({}, this.Sales_Details_));
}
this.Final_Amounts();
this.Sales_Details_Index=-1;
this.Clr_Sales_Details();
}
// Plus_Sales_Details(event)
// {   
//   if(this.Barcode_==undefined || this.Barcode_==null )
//       {
//           const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select Item code',Type:"3"}});
//           return
//       }
//   else if(this.Quantity==undefined || this.Quantity==null || this.Quantity==0 )
//   {
//       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter the quantity',Type:"3"}});
//       return
//   }
//   else if(this.SaleRate==undefined || this.SaleRate==null || this.SaleRate==0 )
//   {
//       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter unit rate',Type:"3"}});
//       return
//   }     
//   this.Sales_Return_Details_.ItemId = this.Stock_.ItemId;
//   this.Sales_Return_Details_.ItemCode = this.Barcode_.Item_Code;
//   this.Sales_Return_Details_.ItemName = this.Stock_.ItemName;
//   this.Sales_Return_Details_.GroupId = this.Stock_.GroupId;
//   this.Sales_Return_Details_.GroupName = this.Stock_.GroupName;
//   this.Sales_Return_Details_.UnitId = this.Stock_.UnitId;
//   this.Sales_Return_Details_.UnitName = this.Stock_.UnitName;
//   this.Sales_Return_Details_.Stock_Id = this.Stock_.Stock_Id;
//   this.Sales_Return_Details_.HSNMasterId = this.Stock_.HSNMasterId;
//   this.Sales_Return_Details_.HSNCODE = this.Stock_.HSNCODE;
//   this.Sales_Return_Details_.UnitPrice = this.SaleRate;
//   this.Sales_Return_Details_.Quantity = this.Quantity;
//   this.Sales_Return_Details_.Amount = this.TotalAmount;
//   this.Sales_Return_Details_.Discount = this.discount;
//   this.Sales_Return_Details_.Unit_Discount = this.unitDiscount;
//   this.Sales_Return_Details_.SaleTax = this.Stock_.SaleTax;
//   this.Sales_Return_Details_.TaxableAmount = this.TotalAmount-this.discount;
//   this.Sales_Return_Details_.TaxAmount = this.Sales_Return_Details_.TaxableAmount * (this.safeNumber(this.Stock_.SaleTax) / 100)

//   if (!this.Sales_Return_Details_Data) {
//     this.Sales_Return_Details_Data = [];
// }
  

//   this.Sales_Return_Details_Data.push(Object.assign({}, this.Sales_Return_Details_));
     
//   this.Clr_Sales_Details();
//   this.Final_Amounts();

// }

Plus_Quotation_Details(event)
{   
    debugger
    if(this.Barcode_==undefined || this.Barcode_==null )
        {
            const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select Item code',Type:"3"}});
            return
        }
    else if(this.Sales_Return_Details_.Quantity==undefined || this.Sales_Return_Details_.Quantity==null || this.Sales_Return_Details_.Quantity==0 )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter the quantity',Type:"3"}});
        return
    }
    else if(this.Sales_Return_Details_.UnitPrice==undefined || this.Sales_Return_Details_.UnitPrice==null || this.Sales_Return_Details_.UnitPrice==0 )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter unit rate',Type:"3"}});
        return
    }     
    if (this.Sales_Return_Details_Data == undefined)
        this.Sales_Return_Details_Data = [];
    var inserted = 0;
    for (var i = 0; i < this.Sales_Return_Details_Data.length; i++) {
        if (this.Sales_Return_Details_Data[i].StockId == this.Sales_Return_Details_.StockId) {
            if (this.Sales_Return_Details_Index == i) {
                this.Sales_Return_Details_Data[i] = Object.assign({}, this.Sales_Return_Details_)// this.Sales_Details_;
            }
            else {
            
                this.Sales_Return_Details_.TaxableAmount = this.TotalAmount-this.discount;
                this.Sales_Return_Details_.TaxAmount = this.Sales_Return_Details_.TaxableAmount * (this.safeNumber(this.Stock_.SaleTax) / 100);
                this.Sales_Return_Details_.Item_Discount_Amount = Number(this.Sales_Return_Details_.UnitPrice) * this.safeNumber(this.Sales_Return_Details_.Discount)/100;
                this.Sales_Return_Details_Data.push(Object.assign({}, this.Sales_Return_Details_));
            }
            if (this.Sales_Return_Details_Index != i && this.Sales_Return_Details_Index >= 0) {
                this.Sales_Return_Details_Data.splice(this.Sales_Return_Details_Index, 1)
            }
            inserted = 1;
            i = this.Sales_Return_Details_Data.length;
            break;
        }
    }
    if (inserted == 0) {
        if (this.Sales_Return_Details_Index >= 0) {
            this.Sales_Return_Details_Data[this.Sales_Return_Details_Index] = Object.assign({}, this.Sales_Return_Details_)// this.Sales_Details_;
        }
        else {
            this.Sales_Return_Details_Data.push(Object.assign({}, this.Sales_Return_Details_));
        }
    }
    this.Sales_Return_Details_Index = -1;
    this.Focus_It(event);
    this.Clr_Sales_Details();

    this.addBlankRows();
    this.Final_Amounts();

}
Save_Sales(Printstatus:number)
{
debugger
  if(this.Sales_Return_Details_Data == undefined || this.Sales_Return_Details_Data == null || this.Sales_Return_Details_Data.length == 0 || this.Sales_Return_Details_Data.length == undefined )
  {
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Add atleast one Item',Type:"3"}});
      return
  }
  if(this.Customer_ == undefined || this.Customer_ == null || this.Customer_.Client_Accounts_Id == undefined || this.Customer_.Client_Accounts_Id == 0 ){
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Choose Customer',Type:"3"}});
      return
  }    
  // if(this.Sales_Return_Master_.CurrencyId == undefined || this.Sales_Return_Master_.CurrencyId == 0 ){
  //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Choose currency',Type:"3"}});
  //     return
  // }
  this.Sales_Return_Master_.Account_Party_Id=this.Customer_.Client_Accounts_Id;
  this.Sales_Return_Master_.User_Id=Number(this.Login_User_Id);
  this.Sales_Return_Master_.Sales_Return_Details=this.Sales_Return_Details_Data;
//   if(this.Attention)
//   this.Sales_Return_Master_.KindAttend=this.Attention.User_Details_Id;
//   if(this.Employee)
//   this.Sales_Return_Master_.AttendEmployee = this.Employee.User_Details_Id
  if(this.SaleInvoiceNo)
  {
    this.Sales_Return_Master_.Invoice_No = this.SaleInvoiceNo.Invoice_No;
    this.Sales_Return_Master_.Sales_Master_Id =this.SaleInvoiceNo.SalesMaster_Id;    
   }

  // this.Sales_Return_Master_.Payment_Term_Description = this.Payment_Term_Description_.Payment_Term_Description;
  // this.Sales_Return_Master_.PaymentTerms = this.Payment_Term_Description_.payment_Term_ID;
  this.Sales_Return_Master_.EntryDate = this.New_Date(new Date(moment(this.Sales_Return_Master_.EntryDate).format('YYYY-MM-DD')));
  this.Sales_Return_Master_.SupplyDate = this.New_Date(new Date(moment(this.Sales_Return_Master_.SupplyDate).format('YYYY-MM-DD')));
  this.Sales_Return_Master_.DueDate = this.New_Date(new Date(moment(this.Sales_Return_Master_.DueDate).format('YYYY-MM-DD')));
  this.Sales_Return_Master_.Bill_Date=this.New_Date(new Date(moment(this.Sales_Return_Master_.Bill_Date).format('YYYY-MM-DD')));
  this.Sales_Return_Master_.CurrencyId = this.Currency.CurrencyDetails_Id;
  this.Sales_Return_Master_.TypeId = this.Accounttype.AccountType_Id;
  this.Sales_Return_Master_.CurrecnyName = this.Currency.CurrecnyName;

  if(this.Payment_Term_Description_ == undefined || this.Payment_Term_Description_ == null){
    this.Sales_Return_Master_.Payment_Term_Description = 0;
    this.Sales_Return_Master_.PaymentTerms = "";
}else{
    this.Sales_Return_Master_.Payment_Term_Description = this.Payment_Term_Description_.payment_Term_ID;
    this.Sales_Return_Master_.PaymentTerms = this.Payment_Term_Description_.Payment_Term_Description;
}

  console.log("Before Sales Return Save API call");
  this.issLoading = true;
  this.Sales_Master_Service_.Save_Sales_Returns_Master(this.Sales_Return_Master_)
    .pipe(finalize(() => this.issLoading = false))
    .subscribe({
      next: (response: any) => {
        if (response.success && response.data) {
          const saveResult = response.data;
          if (Number(saveResult.Sales_Return_Master_Id_) > 0) {
            this.Sales_Return_Master_.Sales_Return_Master_Id = saveResult.Sales_Return_Master_Id_;
            this.Sales_Print = false;
            this.Sales_Return_Master_.Invoice_No = saveResult.Voucher_No_;
            this.Sales_Return_Master_Id_Edit = this.Sales_Return_Master_.Sales_Return_Master_Id;
            this.Edit_Sales = 1;

            this.dialogBox.open(DialogBox_Component, {
              panelClass: 'Dialogbox-Class',
              data: { Message: 'Saved Successfully', Type: "false" }
            });
          } else {
            this.dialogBox.open(DialogBox_Component, {
              panelClass: 'Dialogbox-Class',
              data: { Message: response.message || 'Error Occured', Type: "2" }
            });
            document.getElementById("Save_Button").hidden = false;
          }
        } else {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: response.message || 'Error Occured', Type: "2" }
          });
          document.getElementById("Save_Button").hidden = false;
        }
      },
      error: (error) => {
        document.getElementById("Save_Button").hidden = false;
        this.dialogBox.open(DialogBox_Component, {
          panelClass: 'Dialogbox-Class',
          data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" }
        });
        setTimeout(() => {
          if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
    });
}
Edit_Button_Click()
{
  if (this.User_Type_Id == 1 || this.Sales_Master_Data[this.Sale_EditIndex].User_Id.toString() == this.Login_User_Id)
  {
      this.Tabs_Edit_Permission();
  }
   else
  {
      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission', Type: "3" } });
  }
}
Tabs_Edit_Permission()
{
//  if (this.Sale_EditIndex == -1)
  {
  this.Sale_Permission_Edit= this.Sale_Permission_Edit_Temp;
  this.Enable_Disable_Permission();
  //document.getElementById("Tab_Edit").hidden=true;
  document.getElementById("Save_Button").hidden=false;
  }
}
Enable_Disable_Permission()
{
  if( this.Sale_Permission_Edit==false)
  {
  $('#SALE :input').attr('disabled', 'true');
  }
  else if( this.Sale_Permission_Edit==true){
  $('#SALE :input').removeAttr('disabled');
  }
}
Disable_Tab_Permission()
{
  this.Sale_Permission_Edit= false;
  this.Enable_Disable_Permission();
}
Edit_Sales_Master(Sales_Master_e:Sales_Master,index)
{ 
  debugger;
  this.Entry_View=true;
  this.Edit_Sales=1;
  this.Sales_Print = false;
  this.Sales_Master_=Object.assign({},Sales_Master_e); 
  this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,39',"").subscribe(Rows => {  
          if (Rows != null) {
          this.Customer_Data = Rows[0];
          for(let i=0;i<this.Customer_Data.length;i++){
              if(this.Customer_Data[i].Client_Accounts_Id == this.Sales_Master_.Account_Party_Id){
                  this.Customer_  = this.Customer_Data[i];
                  this.Customer_Name = this.Customer_.Client_Accounts_Name;
                  this.Address1 = this.Customer_.Address1;
                  this.Address2 = this.Customer_.Address2;
                  this.Address3 = this.Customer_.Address3;
                  this.Address4 = this.Customer_.Address4;
                  this.Vatin = this.Customer_.GSTNo;
      
              }
          }
      }},
      );

      this.Sales_Master_Service_.Search_SaleInvoice_By_Supplier_Typeahead(this.Customer_.Client_Accounts_Id,"").subscribe(Rows1 => {  
        debugger   
      if (Rows1 != null) {
          this.SaleInvoiceNoData = Rows1[0];
          // for(let j=0;j<this.SaleInvoiceNoData.length;j++){
          //   if(this.SaleInvoiceNoData[j].Invoice_No == this.Sales_Master_.Invoice_No){
          //     this.SaleInvoiceNo = this.SaleInvoiceNoData[j]
          //   }
          // }
      }
      
      });

  
  for(let i=0;i<this.PaymentTermData.length;i++){
      if(this.PaymentTermData[i].payment_Term_ID == this.Sales_Master_.Payment_Term_Description){
          this.Payment_Term_Description_ = this.PaymentTermData[i]
      }
  }
this.issLoading = true;
this.Sales_Master_Service_.Get_Sales_Details(Sales_Master_e.Sales_Master_Id).subscribe(Rows => { 
  
  if (Rows != null) {
      this.Sales_Details_Data = Rows[0];
      this.Final_Amounts();
      
      }
         this.issLoading = false;
     },
   Rows => {
          this.issLoading = false;
     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  });
}
Edit_Sales_Details(Sales_Details_e:Sales_Details,index)
{   
  this.Sales_Details_Index=index;
  this.Sales_Details_=Sales_Details_e;
  this.Stock_Temp.ItemId=Sales_Details_e.ItemId;
  this.Stock_Temp.ItemName=Sales_Details_e.ItemName;
  this.Stock_=Object.assign({},this.Stock_Temp);
  this.Barcode_Temp.Stock_Id=Sales_Details_e.Stock_Id;
  //this.Barcode_Temp.Barcode=Sales_Details_e.Barcode;
  this.Barcode_=Object.assign({},this.Barcode_Temp);    
  this.Edit_GST=this.Sales_Details_.TaxAmount;
  this.Edit_Discount=this.Sales_Details_.Discount;
  this.Edit_Net=this.Sales_Details_.NetValue;
  this.Sales_Details_=Object.assign({},Sales_Details_e);
  this.Sale_Detail_Quantity=this.Sales_Details_.Quantity;
  this.Edit_Stock_-this.Sales_Details_.Stock;
  this.Sales_Details_Description=this.Sales_Details_.Description;
}

Get_Stock(){
  // console.log("Barcode_", this.Barcode_.Stock_Id)
  // this.Sales_Master_Service_.Search_Item_Typeahead("").subscribe(Rows => {

  //     if (Rows != null) {
  //         this.Stock_Data_Filter = Rows[0];
  //         for(let i= 0;i< this.Stock_Data_Filter.length;i++){
  //             if(this.Stock_Data_Filter[i].Stock_Id == this.Barcode_.Stock_Id){
  //                 this.Stock_ = this.Stock_Data_Filter[i]
  //                 this.UnitName = this.Stock_.UnitName
  //                 //this.SaleRate = Number(this.Stock_.SaleRate);
                  
  //             }
  //         }
  //     }
  // })

  this.Stock_Temp.ItemId=this.Barcode_.ItemId;
    this.Stock_Temp.ItemName=this.Barcode_.ItemName;
    this.Stock_=Object.assign({},this.Stock_Temp);
    this.Sales_Return_Details_.ItemId=this.Barcode_.ItemId;
    this.Sales_Return_Details_.ItemName=this.Barcode_.ItemName;
    this.Sales_Return_Details_.UnitId=this.Barcode_.UnitId;
    this.Sales_Return_Details_.UnitName=this.Barcode_.UnitName;
    this.Sales_Return_Details_.MRP=this.Barcode_.MRP;
    this.Sales_Return_Details_.PurchaseRate=this.Barcode_.PurchaseRate;
    this.Sales_Return_Details_.Stock=this.Barcode_.Quantity;
    this.Sales_Return_Details_.UnitPrice=this.Barcode_.SaleRate;
    this.Sales_Return_Details_.ItemName=this.Barcode_.ItemName;
    this.Sales_Return_Details_.GroupId=this.Barcode_.GroupId;
    this.Sales_Return_Details_.GroupName=this.Barcode_.GroupName;
    this.Sales_Return_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
    this.Sales_Return_Details_.HSNCODE=this.Barcode_.HSNCODE;
    this.Sales_Return_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
    this.Sales_Return_Details_.StockId=this.Barcode_.Stock_Id;
    this.Sales_Return_Details_.Sale_Tax=this.Barcode_.SaleTax;
    this.Sales_Return_Details_.ItemCode=this.Barcode_.Item_Code;  

    this.Sales_Return_Details_.Country_Id=this.Barcode_.Country_Id;
    this.Sales_Return_Details_.Country_Name=this.Barcode_.Country_Name;  
}


Get_Stock_Item(){
  this.Stock_Temp.ItemId=this.Stock_.ItemId;
  this.Stock_Temp.ItemName=this.Stock_.ItemName;
  this.Stock_=Object.assign({},this.Stock_Temp);
  debugger;
  console.log('this.Stock_: ', this.Stock_);

  if(this.Stock_ != null || this.Stock_ != undefined)
  {
      if(this.Stock_.ItemId != null || this.Stock_.ItemId != undefined)
          {
              this.Item_Temp.Item_Code=this.Stock_.Item_Code;
               this.Item_Temp.ItemId=this.Stock_.ItemId;
               this.Barcode_=Object.assign({},this.Item_Temp);
               
              this.Sales_Return_Details_.ItemId=this.Stock_.ItemId;
              this.Sales_Return_Details_.ItemName=this.Stock_.ItemName;
              this.Sales_Return_Details_.UnitId=this.Stock_.UnitId;
              this.Sales_Return_Details_.UnitName=this.Stock_.UnitName;
              this.Sales_Return_Details_.MRP=this.Stock_.MRP;
              this.Sales_Return_Details_.PurchaseRate=this.Stock_.PurchaseRate;
              this.Sales_Return_Details_.Stock=this.Stock_.Quantity;
              this.Sales_Return_Details_.UnitPrice=this.Stock_.SaleRate;
              this.Sales_Return_Details_.ItemName=this.Stock_.ItemName;
              this.Sales_Return_Details_.GroupId=this.Stock_.GroupId;
              this.Sales_Return_Details_.GroupName=this.Stock_.GroupName;
              this.Sales_Return_Details_.HSNMasterId=this.Stock_.HSNMasterId;
              this.Sales_Return_Details_.HSNCODE=this.Stock_.HSNCODE;
              // this.Sales_Return_Details_.Availability=this.Stock_.Availability;
              this.Sales_Return_Details_.HSNMasterId=this.Stock_.HSNMasterId;
              this.Sales_Return_Details_.ItemCode=this.Stock_.Item_Code; 
          }
  }
 

  

}

numberToWordsIndianCurrency(amount) {

  amount = parseFloat(amount.toString().replace(/,/g, ""));
  amount = new Intl.NumberFormat('en-US', {
     minimumFractionDigits: 3,
     maximumFractionDigits: 3,
     useGrouping: false
   }).format(amount);


  if (amount === 0) return "zero rupees";

  const belowTwenty = [
      "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven",
      "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
  ];

  const tens = [
      "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
  ];

  const indianUnits = [
      "", "thousand", "lakh", "crore"
  ];

  function helper(num) {
      if (num < 20) return belowTwenty[num];
      else if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? " " + belowTwenty[num % 10] : "");
      else return belowTwenty[Math.floor(num / 100)] + " hundred" + (num % 100 ? " " + helper(num % 100) : "");
  }

  function convertToWords(num) {
      let word = "";
      let unitsIndex = 0;

      // Handle numbers below 1000
      if (num % 1000 !== 0) {
          word = helper(num % 1000) + (indianUnits[unitsIndex] ? " " + indianUnits[unitsIndex] : "") + " " + word;
      }
      num = Math.floor(num / 1000);
      unitsIndex++;

      // Handle thousands
      if (num % 100 !== 0) {
          word = helper(num % 100) + " thousand " + word;
      }
      num = Math.floor(num / 100);
      unitsIndex++;

      // Handle lakhs
      if (num % 100 !== 0) {
          word = helper(num % 100) + " lakh " + word;
      }
      num = Math.floor(num / 100);
      unitsIndex++;

      // Handle crores
      if (num > 0) {
          word = helper(num) + " crore " + word;
      }

      return word.trim();
  }

  let MainCurrency, SubCurrency;
  if(this.Currency.CurrencyDetails_Id>0){
            MainCurrency = this.Currency.CurrecnyName;
            SubCurrency = this.Currency.SubCurrecnyName == null ? '' : this.Currency.SubCurrecnyName;
    }else{
        MainCurrency = 'OMR';
        SubCurrency = 'BZ';
    }

  // Split amount into rupees and paise
  const parts = amount.toString().split(".");
  const rupeesPart = parseInt(parts[0], 10);
  const paisePart = parts.length > 1 ? parseInt(parts[1].substring(0, 3), 10) : 0; // Only handle two decimal places

  let rupeesWord = rupeesPart > 0 ?  MainCurrency+ ' ' + convertToWords(rupeesPart)  : "";
    let paiseWord = paisePart > 0 ?  SubCurrency+ ' ' + convertToWords(paisePart)  : "";

    if (rupeesWord && paiseWord) {
        return `${rupeesWord} and ${paiseWord} only`;
    } else if (rupeesWord) {
        return `${rupeesWord} only`;
    } else {
        return `${paiseWord} only`;
    }
}

formatDate(dateString): string {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    console.error('Invalid date:', dateString);
    return '';
  }

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

Delete_Sales_Detail(itemIndex){
  debugger
  this.Sales_Return_Details_Data.splice(itemIndex, 1);
  this.addBlankRows();
  this.Final_Amounts();
}

// Edit_Sales_Detail(Sales_Details, index){
//   console.log('Sales_Details: ', Sales_Details);
//   this.Barcode_ = new Stock();
//   this.Stock_ = new Stock();
//   this.Barcode_.Item_Code = Sales_Details.ItemCode;
//   this.Stock_.ItemId = Sales_Details.ItemId;
//   this.Stock_.ItemName= Sales_Details.ItemName ;
//   this.Stock_.UnitName = this.UnitName = Sales_Details.UnitName 
//   this.Stock_.UnitId = Sales_Details.UnitId;
//   this.Quantity = Sales_Details.Quantity;
//   this.SaleRate = Sales_Details.UnitPrice;
//   this.discount = Sales_Details.Discount;
//   this.unitDiscount = Sales_Details.Unit_Discount;
//   this.Stock_.GroupId = Sales_Details.GroupId;
//   this.Stock_.GroupName = Sales_Details.GroupName;
//   this.Stock_.Stock_Id = Sales_Details.StockId;
//   this.Stock_.HSNMasterId = Sales_Details.HSNMasterId;
//   this.Stock_.HSNCODE = Sales_Details.HSNCODE;
//   this.TotalAmount = Sales_Details.Amount;
//   this.availablity = Sales_Details.Availability;
//   this.Stock_.SaleTax = Sales_Details.Sale_Tax;

//   this.Sales_Details_Data.splice(index, 1);

// }


Edit_Sales_Detail(Sales_Details, index){
  this.Sales_Return_Details_Index=index;
  this.Sales_Return_Details_ = Sales_Details
  this.Barcode_ = new Sales_Return_Details();
  this.Stock_ = new Stock();
  this.Barcode_.Item_Code = Sales_Details.ItemCode;
  this.Stock_.ItemId = Sales_Details.ItemId;
  this.Stock_.ItemName= Sales_Details.ItemName ;
  this.Stock_.UnitName = this.UnitName = Sales_Details.UnitName 
  this.Stock_.UnitId = Sales_Details.UnitId;
  // this.Quantity = Sales_Details.Quantity;
  // this.SaleRate = Sales_Details.UnitPrice;
  // this.discount = Sales_Details.Discount;
  // this.unitDiscount = Sales_Details.Unit_Discount;
  this.Stock_.GroupId = Sales_Details.GroupId;
  this.Stock_.GroupName = Sales_Details.GroupName;
  this.Stock_.Stock_Id = Sales_Details.StockId;
  this.Stock_.HSNMasterId = Sales_Details.HSNMasterId;
  this.Stock_.HSNCODE = Sales_Details.HSNCODE;
  // this.TotalAmount = Sales_Details.Amount;
  // this.availablity = Sales_Details.Availability;
  this.Stock_.SaleTax = Sales_Details.Sale_Tax;

  this.Sales_Return_Details_Data.splice(index, 1);
 
}

Edit_SalesReturn_Master(Sales_Master_e:Sales_Return_Master,index)
{ 
  debugger;
  this.Entry_View=true;
  this.Edit_Sales=1;
  this.Sales_Print = false;
  this.Sales_Return_Master_=Object.assign({},Sales_Master_e); 
//   debugger
//   this.Sales_Master_Service_.Search_Customer_Typeahead('1,2,3,39',"").subscribe(Rows => { 
//     debugger    
//       if (Rows != null) {
//           this.Customer_Data = Rows[0];
//           for(let i=0;i<this.Customer_Data.length;i++){
//               if(this.Customer_Data[i].Client_Accounts_Id == this.Sales_Return_Master_.Account_Party_Id){
//                   this.Customer_  = this.Customer_Data[i];
//                   this.Address1 = this.Customer_.Address1;
//                   this.Address2 = this.Customer_.Address2;
//                   this.Address3 = this.Customer_.Address3;
//                   this.Address4 = this.Customer_.Address4;
      
//               }
//           }
//       }},
//       );
  
//       debugger

    this.Customer_Temp.Client_Accounts_Id=Sales_Master_e.Account_Party_Id;
    this.Customer_Temp.Client_Accounts_Name=Sales_Master_e.Customer;
    this.Customer_=this.Customer_Temp;

    this.Sales_Return_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.Sales_Return_Master_.Customer=this.Sales_Return_Master_.Customer_Name;
    this.Customer_Name = this.Customer_.Client_Accounts_Name;
    this.Sales_Return_Master_.Delivery_Address1=Sales_Master_e.Delivery_Address1;
    this.Sales_Return_Master_.Delivery_Address2=Sales_Master_e.Delivery_Address2;
    this.Sales_Return_Master_.Delivery_Address3=Sales_Master_e.Delivery_Address3;
    this.Sales_Return_Master_.Delivery_Address4=Sales_Master_e.Delivery_Address4;
    this.Sales_Return_Master_.PaymentTermValue=Sales_Master_e.Payment_Term_Description;
    this.Sales_Return_Master_.Payment_Term_Description=Sales_Master_e.Payment_Term_Description;
    this.Sales_Return_Master_.TypeId=Sales_Master_e.TypeId;
    this.Sales_Return_Master_.CurrencyId=Sales_Master_e.CurrencyId;

  // this.SaleInvoiceNo.Sales_Master_Id=Sales_Master_e.Sales_Master_Id;
  // this.SaleInvoiceNo.Invoice_No=Sales_Master_e.Invoice_No;

    this.Sales_Return_Master_Id_Edit = this.Sales_Return_Master_.Sales_Return_Master_Id; 

    if(this.Sales_Return_Master_.Additional_Discount) this.addDiscCheck = 1;
    else this.addDiscCheck = 0;
    
    // this.Client_Accounts_Service_.Get_Client_Accounts(Sales_Master_e.Account_Party_Id).subscribe((result)=>{
    //                 this.Address1 = result[0][0].Address1;
    //                 this.Address2 = result[0][0].Address2;
    //                 this.Address3 = result[0][0].Address3;
    //                 this.Address4 = result[0][0].Address4;
    //                 this.Vatin = result[0][0].GSTNo; 
    // });

    this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39',"").subscribe(Rows => {   
      if (Rows != null) {
        debugger;
          this.Customer_Data = Rows[0];
          debugger;
          for(let i=0;i<Rows[0].length;i++){
              if(Rows[0][i].Client_Accounts_Id == Sales_Master_e.Account_Party_Id){
                  this.Customer_Temp.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                  this.Customer_Temp.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                   this.Customer_= this.Customer_Temp;
                
                  this.Sales_Return_Master_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                  this.Sales_Return_Master_.Customer=Rows[0][i].Client_Accounts_Name;

                  this.Sales_Return_Master_.Address1 = Rows[0][i].Address1;
                  this.Sales_Return_Master_.Address2 = Rows[0][i].Address2;
                  this.Sales_Return_Master_.Address3 = Rows[0][i].Address3;
                  this.Sales_Return_Master_.Address4 = Rows[0][i].Address4;
                  this.Sales_Return_Master_.GSTNo = Rows[0][i].GSTNo;

                  this.Address1 = Rows[0][i].Address1;
                  this.Address2 = Rows[0][i].Address2;
                  this.Address3 = Rows[0][i].Address3;
                  this.Address4 = Rows[0][i].Address4;
                  this.Vatin = Rows[0][i].GSTNo;
              }
              debugger;
          }
      }},
      );
//    this.User_Details_Service_.Search_User_Details("").subscribe(Rows => {     
//     debugger
//       if (Rows != null) {
//           this.EmployeeData = Rows[0];
//           for(let i= 0; i< this.EmployeeData.length; i++){
//               if(this.EmployeeData[i].User_Details_Id== this.Sales_Return_Master_.KindAttend){
//                   this.Attention = this.EmployeeData[i];
//               }
//               if(this.EmployeeData[i].User_Details_Id== this.Sales_Return_Master_.AttendEmployee){
//                   this.Employee = this.EmployeeData[i];
//               }
//           }
//       }
//       });
  this.Sales_Master_Service_.Search_SaleInvoice_By_Supplier_Typeahead(Sales_Master_e.Account_Party_Id,"").subscribe(Rows1 => {  
    debugger   
    if (Rows1 != null) {
      this.SaleInvoiceNoData = Rows1[0];
      for(let j=0;j<Rows1[0].length;j++){
        if(Rows1[0][j].Invoice_No == Sales_Master_e.Invoice_No){
          this.SaleInvoiceNo = Rows1[0][j]
        }        
      }
      debugger;
  } 
  });
debugger
for(let i=0;i<this.PaymentTermData.length;i++){
    if(this.PaymentTermData[i].Payment_Term_Description == this.Sales_Return_Master_.PaymentTerms){
        this.Payment_Term_Description_ = this.PaymentTermData[i]
    }
}

for(let i=0;i<this.AccounttypeData.length;i++){
    if(this.AccounttypeData[i].AccountType_Id == this.Sales_Return_Master_.TypeId){
        this.Accounttype = this.AccounttypeData[i]
    }
}

for(let i=0;i<this.currencyData.length;i++){
    if(this.currencyData[i].CurrencyDetails_Id == this.Sales_Return_Master_.CurrencyId){
        this.Currency = this.currencyData[i]
    }
}
this.issLoading = true;
this.Sales_Master_Service_.Get_SalesReturn_Details(Sales_Master_e.Sales_Return_Master_Id)
.pipe(finalize(() => this.issLoading = false))
.subscribe({
    next: (response) => {
        if (response.success && response.data) {
            this.Sales_Return_Details_Data = response.data[0];
            this.addBlankRows();
            this.Final_Amounts();
        } else {
            this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: response.message || 'Error Occured', Type: "2" } });
        }
    },
    error: (err) => {
        this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured while fetching details', Type: "2" } });
    }
});
}



Delete_SalesReturn_Master(Sales_Return_Master_Id,index)
{
  const dialogRef = this.dialogBox.open
  ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
  dialogRef.afterClosed().subscribe(result =>        
  {    
  if (result == 'Yes') {
      this.issLoading = true;
      this.Sales_Master_Service_.Delete_SalesReturn_Master(Sales_Return_Master_Id)
      .pipe(finalize(() => this.issLoading = false))
      .subscribe({
          next: (response: any) => {
              if (response.success && response.data) {
                  const deleteStatus = response.data;
                  if (deleteStatus.Sales_Return_Master_Id_ > 0) {
                      const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Deleted Successfully', Type: "false" } });
                      this.Search_SalesReturn_Master();
                  } else {
                      this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: response.message || 'Error occurred', Type: "2" } });
                  }
              } else {
                  this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: response.message || 'Error occurred', Type: "2" } });
              }
          },
          error: (err) => {
              this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error occurred while deleting', Type: "2" } });
          }
      });
  }
  });
}

/*** Added on 26-10-2024 */

Search_SaleInvoice_By_Supplier_Typeahead(event: any)
{

  debugger;
  if(!this.Customer_){
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Choose supplier',Type:"2"}});
    this.SaleInvoiceNoData = [];
    return
  }
  let Client_Accounts_Id = 0
  debugger;
  var Value = "";
  if (event.target.value == "")
  Value = undefined;
  else
  Value = event.target.value;

  Client_Accounts_Id=this.Customer_.Client_Accounts_Id;

   this.issLoading = true;
  this.Sales_Master_Service_.Search_SaleInvoice_By_Supplier_Typeahead(Client_Accounts_Id,Value).subscribe(Rows => {     
    debugger;
  if (Rows != null) {
      this.SaleInvoiceNoData = Rows[0];

      console.log('this.SaleInvoiceNoData: ',this.SaleInvoiceNoData)
  }
  this.issLoading = false;
  },
  Rows => {
   
  this.issLoading = false;
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  });
  
}

  /** Added on 28-10-2024 */

  Load_Vat_Percentage() 
  {   
  this.Sales_Master_Service_.Load_Vat_Percentage().subscribe(Rows => {    
  if (Rows != null) {
      debugger;
  this.Default_Vat_Percentage = this.getFirstResult(Rows).vat_percentage || 0;
}
this.issLoading = false;
},
Rows => {
this.issLoading = false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
});
}


Invoice_Change(Invoice:Sales_Return_Master)
{
  debugger;
var Sales_Master_Id_new=Invoice.Sales_Master_Id;

this.Sales_Return_Master_=Object.assign({},Invoice);
this.Sales_Return_Master_.CurrencyId=Invoice.CurrencyId;
this.Sales_Return_Master_.TypeId=Invoice.TypeId;
this.Sales_Return_Master_.PaymentTermValue=Invoice.PaymentTermValue;
this.Sales_Return_Master_.Payment_Term_Description=Invoice.Payment_Term_Description;
this.Sales_Return_Master_.Charge1=Invoice.Charge1;
this.Sales_Return_Master_.Charge2=Invoice.Charge2;
this.Sales_Return_Master_.Discount_Description=Invoice.Discount_Description;
this.Sales_Return_Master_.charge1_Amount=Invoice.charge1_Amount;
this.Sales_Return_Master_.charge2_Amount=Invoice.charge2_Amount;
this.Sales_Return_Master_.Additional_Discount=Invoice.Additional_Discount;
this.Sales_Return_Master_.TaxableAmount=Invoice.TaxableAmount;
this.Sales_Return_Master_.LPONo=Invoice.LPONo;
this.Sales_Return_Master_.DONo=Invoice.DONo;
this.Sales_Return_Master_.VAT_percentage=Invoice.VAT_percentage;
this.Sales_Return_Master_.VAT_Amount=Invoice.VAT_Amount;
this.Sales_Return_Master_.Delivery_Address1=Invoice.Delivery_Address1;
this.Sales_Return_Master_.Delivery_Address2=Invoice.Delivery_Address2;
this.Sales_Return_Master_.Delivery_Address3=Invoice.Delivery_Address3;
this.Sales_Return_Master_.Delivery_Address4=Invoice.Delivery_Address4;
this.Sales_Return_Master_.Sales_Master_Id=Sales_Master_Id_new;
this.Sales_Return_Master_.Bill_Date=this.formatDate(Invoice.EntryDate); 
this.Sales_Return_Master_.EntryDate=new Date("dd-MMM-yyyy").toString();
this.Sales_Return_Master_.EntryDate=new Date().toString();
this.Sales_Return_Master_.EntryDate=this.formatDate(this.Sales_Return_Master_.EntryDate); 

if(this.currencyData==undefined || this.currencyData==null)
  {
    debugger;
      this.currencydetails_Service_.Load_currencydetails().subscribe(Rows => {
          const currencyRows = this.getResultSet(Rows, 0) || [];
          if(currencyRows.length > 0)
          {
            debugger;
              this.currencyData = currencyRows;        
              this.Currency_Temp.CurrencyDetails_Id = 0;
              this.Currency_Temp.CurrecnyName = "Select";
              this.currencyData.unshift(this.Currency_Temp);
              this.Currency = this.currencyData[0];
              debugger;
          for (var i = 0; i < this.currencyData.length; i++) {
              if (this.currencyData[i].CurrencyDetails_Id == Invoice.CurrencyId) {
                  this.Currency = this.currencyData[i];
              }
          }
          debugger;
      }
      })
  }
  else{
    debugger;
  for (var i = 0; i < this.currencyData.length; i++) {
      if (this.currencyData[i].CurrencyDetails_Id == Invoice.CurrencyId) {
          this.Currency = this.currencyData[i];
      }
  }
  debugger;
}
  if(this.AccounttypeData==undefined || this.AccounttypeData==null)
  {
      this.User_Details_Service_.Load_InvoiceType2().subscribe(Rows => {
          const accountTypeRows = this.getResultSet(Rows, 0) || [];
          if(accountTypeRows.length > 0){
          this.AccounttypeData = accountTypeRows;  
          this.Accounttype_Temp.AccountType_Id = 0;
          this.Accounttype_Temp.AccountType_Name = "Select";
          this.AccounttypeData.unshift(this.Accounttype_Temp);
          this.Accounttype = this.AccounttypeData[0];
     
          for (var i = 0; i < this.AccounttypeData.length; i++) {
              if (this.AccounttypeData[i].AccountType_Id == Invoice.TypeId) {
                  this.Accounttype = this.AccounttypeData[i];
              }
          }  
          }
         })
  }
  else
  {
  for (var i = 0; i < this.AccounttypeData.length; i++) {
      if (this.AccounttypeData[i].AccountType_Id == Invoice.TypeId) {
          this.Accounttype = this.AccounttypeData[i];
      }
  }  
}  
if(this.PaymentTermData==undefined || this.PaymentTermData==null)
{
  this.payment_term_Service_.Load_Payment_Term().subscribe(Rows => {
      const paymentTermRows = this.getResultSet(Rows, 0) || [];
      if (paymentTermRows.length > 0) {
          this.PaymentTermData = paymentTermRows;
          this.PaymentTerm_Temp.payment_Term_ID = 0;
          this.PaymentTerm_Temp.Payment_Term_Description = "Select";
          this.PaymentTermData.unshift(this.PaymentTerm_Temp);
          this.Payment_Term_Description_ = this.PaymentTermData[0];
   
          for(var i = 0; i< this.PaymentTermData.length; i++)
              {
                  if(this.PaymentTermData[i].payment_Term_ID == Invoice.Payment_Term_Description)
                  {
                      this.Payment_Term_Description_ = this.PaymentTermData[i];
                  }
              } 
      }
  })
}
else{
  for(var i = 0; i< this.PaymentTermData.length; i++)
      {
          if(this.PaymentTermData[i].payment_Term_ID == Invoice.Payment_Term_Description)
          {
              this.Payment_Term_Description_ = this.PaymentTermData[i];
          }
      } 
  }    



this.Sales_Master_Service_.Get_Sales_Details(Sales_Master_Id_new).subscribe((Rows: any) => { 
  debugger
  if (Rows != null) {
      this.Sales_Return_Details_Data = Rows[0];
      this.addBlankRows();
      this.Final_Amounts();      
      }
         this.issLoading = false;
     },
   Rows => {
          this.issLoading = false;
     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  });
}

newQuotation(){
  this.Sales_Return_Master_= new Sales_Return_Master();
  this.Clr_Sales_Master();
  this.Clr_Sales_Details();
  setTimeout(() => {
    if (this.topDiv) {
        this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});
}

duplicate(){
  // this.Customer_ = new Client_Accounts();;
  // this.Address1 = ''
  // this.Address2 = ''
  // this.Address3 = ''
  // this.Address4 = ''
  // this.Vatin = ''
  this.Sales_Return_Master_Id_Edit = 0;
  this.Sales_Return_Master_.Sales_Return_Master_Id = 0;
  // this.Sales_Return_Master_.Delivery_Address1 = '';
  // this.Sales_Return_Master_.Delivery_Address2 = '';
  // this.Sales_Return_Master_.Delivery_Address3 = '';
  // this.Sales_Return_Master_.Delivery_Address4 = '';
  this.Sales_Return_Master_.Invoice_No = '0'
  setTimeout(() => {
    if (this.topDiv) {
        this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});

}

// Export() {
//   this.Sales_Master_Service_.exportExcel(this.Sales_Return_Master_Data,"Sales Return" );
// }

Export() {
  const filteredData = this.Sales_Return_Master_Data.map((receipt: any, index: number) => {
      return {
          No: index + 1,                  
          CustomerName: receipt["Customer"],
          InvoiceNo : receipt["Invoice_No"],
          Date: receipt["FormattedEntryDate"],
          Amount: receipt["NetTotal"],

      };
  });

  this.Sales_Master_Service_.exportExcel(filteredData,"Sales Return" );


}

// addBlankRows(): void {

//   let cellThr: number = 0;
//   let cellThr1: number = 0;
//   let nosOfBlankRows: number = 0;




//   let tempht1: number = 0;
//   let tempht2: number = 0;

//   debugger



//   this.cdr.detectChanges();

//   this.Sales_Return_Details_Data.forEach((_, index) => {
//     const cellId = `cell${index + 1}`;
//     const cell = document.getElementById(cellId);

//     if (cell) {
//       debugger

//                   if(this. Sales_Return_Details_Data[index].ItemName.length )
//         var alenght=  this. Sales_Return_Details_Data[index].ItemName.length % 39;

//       console.log('this. Sales_Return_Details_Data[index].ItemName.length: ', this. Sales_Return_Details_Data[index].ItemName.length);
//       console.log('alenght: ', alenght);

//       if(tempht1==41 && alenght>1)
//           tempht1=tempht1 + 10 *alenght%100;

//       console.log('tempht1: ', tempht1);

//       let blank = 0;

//        tempht1 = cell ? cell.offsetHeight : 0 ;
//        cellThr += tempht1;


//        console.log('cellThr: ', cellThr);


//        if(cellThr1 > 0) cellThr1 = 0;

//        cellThr1 = cellThr;

//        console.log('cellThr1: ', cellThr1);
// debugger
//        if (cellThr1 < 310) {                             //350
//         nosOfBlankRows = (300 - cellThr1) / 9;
//     }
//     else {
//         cellThr1 = cellThr1 - 320;
//         console.log('cellThr1 - a: ', cellThr1);
//         cellThr1 = cellThr1 % 1250;                    //1471 excel master,2371 -perfect hills
//         console.log('cellThr1 = cellThr1 % b: ', cellThr1);
//         cellThr1 = 1290- cellThr1           
//         console.log('cellThr1 = c - cellThr1: ', cellThr1);
//         nosOfBlankRows = (cellThr1) / 10;
//         console.log('nosOfBlankRows = (cellThr1) / 10;: ', nosOfBlankRows);
//         console.log('nosOfBlankRows = blank + nosOfBlankRows;: ', nosOfBlankRows);
//     }   
      
//       console.log('nosOfBlankRows: ', nosOfBlankRows);


//       this.blankItems = [];
//       var start = 1
//       for (let i = start; i < nosOfBlankRows; i++) {
//         this.blankItems.push(i);
//       }


//     } else {
//       console.error(`Cell with ID '${cellId}' not found.`);
//     }
//   });


// }

addBlankRows(): void {

  let cellThr: number = 0;
  let cellThr1: number = 0;
  let nosOfBlankRows: number = 0;


  // Temporarily modify the style of the PrintDiv to make it visible but hidden
  // const printDiv = document.getElementById('Edit_Div');

  // if (printDiv) {
  //   printDiv.style.position = 'absolute';
  //   printDiv.style.visibility = 'hidden';
  //   printDiv.style.display = 'block';
  // }

  let tempht1: number = 0;
  let tempht2: number = 0;

  debugger

  // this.Quotation_Details_Data.forEach((item, index) => {
  //     item.ItemName = `Edited ${item.ItemName}`;
  //   });

  this.cdr.detectChanges();

  // Loop through and apply changes to all cells
  this.Sales_Return_Details_Data.forEach((_, index) => {
    const cellId = `cell${index + 1}`;
    const cell = document.getElementById(cellId);

    if (cell) {
      // Example: Apply a style or perform an action
      debugger

      tempht1 = cell ? cell.offsetHeight : 0 ;
       tempht1 -= 50;


       console.clear();            
       console.log("***********************************");

      console.log('tempht1 first: ', tempht1);


      let blank = 0;

       cellThr += tempht1;


       console.log('cellThr: ', cellThr);


       if(cellThr1 > 0) cellThr1 = 0;
       
       cellThr1 = cellThr;

       console.log('cellThr1: ', cellThr1);

       if (cellThr1 < 375 && this.Sales_Return_Details_Data.length < 14 ) {   
        this.breakPage = false;                          //350
        nosOfBlankRows = (525 - cellThr1) / 12;
        if(nosOfBlankRows < 2) nosOfBlankRows +=2;
      }
      else {
        this.breakPage = true;
        if(cellThr1 < 375){cellThr1 = cellThr1 + (380-cellThr1)}
        cellThr1 = cellThr1 - 380;
        console.log('cellThr1 - a: ', cellThr1);
        cellThr1 = cellThr1 % 1940;                    
        console.log('cellThr1 = cellThr1 % b: ', cellThr1);
        cellThr1 = 1850- cellThr1           
        console.log('cellThr1 = c - cellThr1: ', cellThr1);
        nosOfBlankRows = (cellThr1) / 6;
        console.log('nosOfBlankRows = (cellThr1) / 8: ', nosOfBlankRows);
      }  
      
      console.log('nosOfBlankRows: ', nosOfBlankRows);


      this.blankItems = [];
      var start = 1
      for (let i = start; i < nosOfBlankRows; i++) {
        this.blankItems.push(i);
      }


      // console.log(`Cell ${cellId} height:`, tempht1);
      // console.log(`Updated Cell (${cellId}):`, cell.textContent);
    } else {
      console.error(`Cell with ID '${cellId}' not found.`);
    }
  });

  
  

  // for (let x = 0; x <= this. Quotation_Details_Data.length -1; x++) {
  //     console.log('document.getElementById(`cell${x+1}`);: ', document.getElementById(`cell${x+1}`));



      
  //   const cell1 = document.getElementById(`cell${x+1}`);
  // //   const cell2 = document.getElementById(`cellx${x+1}`);
  //   tempht1 = cell1 ? cell1.offsetHeight : 0;
  //   tempht2 = cell2 ? cell2.offsetHeight : 0;

  //   if (tempht1 > tempht2) tempht2 = tempht1;


      

  // }






  // let totalCharCount = 0;
  // this.Quotation_Details_Data.forEach(item => {
      // Match only alphabetic characters (letters)
      // const totalLetters = (item.ItemName.match(/[a-zA-Z]/g) || []).length;
      
      // Match non-alphanumeric characters (special characters)
      // const specialChars = (item.ItemName.match(/[^a-zA-Z0-9]/g) || []).length;
      
      // Match digits (numbers)
      // const numbers = (item.ItemName.match(/\d/g) || []).length;
      
      // Match whitespace characters (spaces, tabs, newlines)
      // const whitespace = (item.ItemName.match(/\s/g) || []).length;
      
      // totalCharCount += (totalLetters + specialChars + numbers)
      // console.log(`Item: ${item.ItemName}`);
      // console.log(`Total Letters: ${totalLetters}`);
      // console.log(`Special Characters: ${specialChars}`);
      // console.log(`Numbers: ${numbers}`);
      // console.log(`Whitespace Characters: ${whitespace}`);
  //   });

  //   console.log('character count', totalCharCount)


  // let totalWordCount = 0;
  // this.Quotation_Details_Data.forEach(item => {
  //     debugger
  //     const wordCount = this.getWordCount(item.ItemName);
  //     totalWordCount += wordCount;
  //     console.log(`Item: ${item.ItemName}, Word Count: ${wordCount}`);
  //   });

  //   console.log('word count', totalWordCount)


  // Determine number of blank rows// 6 entries
  // if (cellThr < 250) {
  //   nosOfBlankRows = (255 - cellThr) / 5;
  // } else if(cellThr > 250 && cellThr < 450) //11 entries
  //     {
  //   cellThr = cellThr - 250;
  //   cellThr = cellThr % 1125;
  //   cellThr = 1110 - cellThr;
  //   nosOfBlankRows = cellThr / 5;
  // }

  // else if(cellThr > 450 && cellThr < 780) //19 entries
  //     {
  //         nosOfBlankRows = (800 - cellThr) / 3;
  //     }
  //   else if(cellThr > 780  && cellThr < 980) // 24 entries
  //   {
  //     cellThr = cellThr - 780;
  //     cellThr = cellThr % 900;
  //     cellThr = 885 - cellThr;
  //     nosOfBlankRows = cellThr / 4;
  //   }
  //   else if(cellThr > 980 && cellThr < 1270) // 31 entries
  //   {
  //       nosOfBlankRows = (1300 - cellThr) / 3;
  //   }
  //   else if(cellThr > 1270 && cellThr < 1510) //  36 entries
  //   {
  //     cellThr = cellThr - 1270;
  //     cellThr = cellThr % 960;
  //     cellThr = 945 - cellThr;
  //     nosOfBlankRows = cellThr / 4;          }
  //     else if(cellThr > 1510) //  entries
  //     {
  //         nosOfBlankRows = (1900 - cellThr) / 3;
  //     }

  // debugger



  // Populate blank rows



  // Restore the style of the PrintDiv
  // if (printDiv) {
  //   printDiv.style.position = 'absolute';
  //   printDiv.style.visibility = 'hidden';
  //   printDiv.style.display = 'none';
  // }
}

}
