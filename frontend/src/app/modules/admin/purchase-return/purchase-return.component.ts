import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, Renderer2, NgZone, Input, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client_Accounts } from '../../../models/Client_Accounts';
import { User_Details_Service } from '../../../services/User_Details.Service';
import { Sales_Master_Service } from '../../../services/Sales_Master.Service';
import { currencydetails_Service } from '../../../services/currencydetails.Service';
import { purchaseordermaster_Service } from '../../../services/purchaseordermaster.Service';
import { purchase_return_master_Service } from '../../../services/Purchase_Return_Master.Service';
import { Employee_Details_Service } from '../../../services/Employee_Details.Service';
import { Stock_Service } from '../../../services/Stock.Service';
import { Item_Group_Service } from '../../../services/Item_Group.Service';
import { payment_term_Service } from '../../../services/payment_term.Service';
import { Client_Accounts_Service } from '../../../services/Client_Accounts.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { purchase_return_master } from '../../../models/Purchase_Return_Master';
import { Company } from '../../../models/Company';
import { Purchase_Return_Details } from '../../../models/Purchase_Return_Details';
import { Bill_Type } from '../../../models/Bill_Type';
import { Bill_Mode } from '../../../models/Bill_Mode';
import { Stock } from '../../../models/Stock';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig, MatButtonToggleGroup} from '@angular/material';
import { ROUTES,Get_Page_Permission } from '../../../components/sidebar/sidebar.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { Item_Group } from '../../../models/Item_Group';
import { currencydetails } from '../../../models/currencydetails';
import { User_Details } from '../../../models/User_Details';
import { payment_term } from '../../../models/payment_term';
import { performainvoicemaster } from '../../../models/performainvoicemaster';
import { accounttype } from '../../../models/accounttype';
import { ThrowStmt } from '@angular/compiler';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: {    dateInput: 'DD/MM/YYYY', },
    display: {
    dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
    },
    };
@Component({
  selector: 'app-purchase-return',
  templateUrl: './purchase-return.component.html',
  styleUrls: ['./purchase-return.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class PurchaseReturnComponent implements OnInit {  
  ngAfterViewInit() {}
  @ViewChild('Barcode_n', { read: Input, static: true }) inputEl: ElementRef;
  @ViewChild('topDiv', { static: false }) topDiv: ElementRef;
  @ViewChild('topDiv1', { static: false }) topDiv1: ElementRef;
@HostListener('document:keydown', ['$event']) 
handleKeyboardEvent(event: KeyboardEvent) { ;
    if(event.key=='F2')
  this.Save_Purchase(1);
}
purchase_return_master_Data:purchase_return_master[]
purchase_return_master_:purchase_return_master= new purchase_return_master();
purchase_return_master:purchase_return_master= new purchase_return_master();
performainvoicemaster_ :performainvoicemaster = new performainvoicemaster();
Purchase_Return_DetailsData:Purchase_Return_Details[]
Purchase_Return_Details :Purchase_Return_Details =new Purchase_Return_Details();
performainvoice_Data:performainvoicemaster[]
Item_Temp:Purchase_Return_Details= new Purchase_Return_Details();
Barcode_:Purchase_Return_Details= new Purchase_Return_Details();
Purchase_Return_Details_Data:Purchase_Return_Details[]
Purchase_Return_Details_Data1:Purchase_Return_Details[]
Purchase_Return_Details_:Purchase_Return_Details= new Purchase_Return_Details();
Purchase_Return_Details_Temp_ : Purchase_Return_Details = new Purchase_Return_Details();
Item_ :Purchase_Return_Details = new Purchase_Return_Details();
Bill_Type_Data:Bill_Type[]
Bill_Type_:Bill_Type= new Bill_Type();
Bill_Type_Temp:Bill_Type= new Bill_Type();
Bill_Type_Search:Bill_Type= new Bill_Type();
Item_Group_Search:Item_Group = new Item_Group();
Currency_Search:currencydetails = new currencydetails();
Employee_Search:User_Details = new User_Details();
EmployeeData: User_Details[];
Employee_Temp: User_Details = new User_Details();
// Payment_Term_Description_:payment_term = new payment_term();
Bill_Mode_Data:Bill_Mode[]
Bill_Mode_:Bill_Mode= new Bill_Mode();
Bill_Mode_Temp:Bill_Mode= new Bill_Mode();
Customer_Data:Client_Accounts[];
PurchaseOrder_Data = [];
// EmployeeData = [];
InvoiceNo_;
// AccounttypeData = [];
Invoice_Data=[]
AccounttypeData: accounttype[];
accounttype_search:accounttype = new accounttype();
Accounttype_Temp : accounttype = new accounttype();
Accounttype: accounttype = new accounttype();
// accounttype_search:accounttype = new accounttype();
ItemCodeData = [];
// PaymentTermData=[];
Customer_:Client_Accounts= new Client_Accounts();
Search_Customer:Client_Accounts= new Client_Accounts();
Customer_Temp:Client_Accounts= new Client_Accounts();
Barcode_Data:Stock[]
Stock_Data:Stock[]
Stock_Data_Filter: Stock[];
Stock_:Stock= new Stock();
// Barcode_:Stock= new Stock();
Stock_Temp:Stock= new Stock();
Barcode_Temp:Stock= new Stock();
Search_FromDate:Date=new Date();
myDate:Date=new Date();
Search_ToDate:Date=new Date();
Sales_Master_Name_Search:string;
Entry_View:boolean=false;
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
Purchase_Return_Details_Index:number=-1;
Purchase_Return_DetailsIndex:number=-1;
Login_User_Id:number;
username:string;
Employee_Name:string;
Employee_Id:number;
Voucher_Number:number=0;
From_Date:Date=new Date();
To_Date:Date=new Date();
Date_Check:boolean=false;
Stock:number;
Edit_Sales:number=0;
Sale_Detail_Quantity:number=0;
Purchase_Return_Details_Description:string;
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
User_Type_Id:number;
User_Type:string;

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
Bank_:Client_Accounts= new Client_Accounts();

Sales_Master_Data1:[];UnitName="";Quantity=0;SaleRate=0;discount=0;unitDiscount=0;TotalAmount=0;
availablity='';Discount_Description=0;subTotal=0;POnumber;QuotNo;partNo;UnitPrice=0;
InvoiceNo = null;

Sales_Master_1:purchase_return_master= new purchase_return_master();

Address1 ='';Address2 ='';Address3 ='';Address4 ='';Customer_Name='';
// currencyData=[];
Attention;Employee;
// Accounttype;accountData = [];
totalAmount=0;Total=0;totalDiscount=0;amount1=0;amount2=0;amount3=0;
// itemGroupData=[];
itemGroupData: Item_Group[];
itemGroup: Item_Group = new Item_Group();
itemGroup_Temp: Item_Group = new Item_Group();

printLetterhead=false;currencyName='';invoiceTypeName=''

currencyData: currencydetails[];
Currency_Temp: currencydetails = new currencydetails();
Currency: currencydetails = new currencydetails();
PaymentTermData: payment_term[];
PaymentTerm_Temp: payment_term = new payment_term();
Payment_Term_Description_:payment_term = new payment_term();

/*** Added on 28-10-2024 */
Default_Vat_Percentage: number;
/*** Added on 9-11-24 */
addDiscCheck = 0
Vatin = '';
/*** Added on 12-11-2024 */
printChargeAmount1: boolean = false;
printChargeAmount2: boolean = false;
printVAT_Amount: boolean = false;
printDiscount_Description:boolean = false;
printAdditional_Discount: boolean = false;
Purchase_Return_Master_Id_Edit: number;
blankItems: number[] = [];
breakPage: boolean = false;

constructor(public Sales_Master_Service_:Sales_Master_Service,public currencydetails_Service_:currencydetails_Service, 
  public User_Details_Service_:User_Details_Service,private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog,
private el: ElementRef, private zone: NgZone, private renderer: Renderer2 , public purchaseordermaster_Service_:purchaseordermaster_Service, 
public Employee_Details_Service_:Employee_Details_Service, public Stock_Service_:Stock_Service,
public Item_Group_Service_:Item_Group_Service, public payment_term_Service_:payment_term_Service,  
public purchase_return_master_Service_:purchase_return_master_Service,public Client_Accounts_Service_:Client_Accounts_Service,
private cdr: ChangeDetectorRef) { }

ngOnInit() 
{
  this.User_Type_Id=Number(localStorage.getItem('User_Type_Id'));
  this.User_Type=(localStorage.getItem('User_Type'));
  this.Login_User_Id=Number(localStorage.getItem('Login_User'));
  this.Employee_Name=localStorage.getItem('Employee_Name');
  this.Employee_Id=Number(localStorage.getItem('Employee_Id'));
  this.username=localStorage.getItem('uname');
  
  this.Permissions = Get_Page_Permission(101);
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
  debugger
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
  debugger
  this.myInnerHeight = (window.innerHeight);
  this.myInnerHeight = this.myInnerHeight - 200;
  // this.purchase_return_master_.EntryDate=new Date("dd-MMM-yyyy");

  debugger
  this.Load_Currency();
  this.Load_Payment_Term();
  this.Load_InvoiceType();
  
  this.purchase_return_master_.Entry_Date=new Date("dd-MMM-yyyy").toString();
   this.purchase_return_master_.Entry_Date=new Date().toString();
   this.purchase_return_master_.Entry_Date=this.formatDate(this.purchase_return_master_.Entry_Date);

  this.Search_FromDate=this.New_Date(this.Search_FromDate);
  this.Search_ToDate=this.New_Date(this.Search_ToDate);
  this.Clr_Sales_Master();
  this.Clr_Sales_Details();
  this.Sales_Print=true;
  this.Entry_View=false;
  this.Load_Bill_Type();
  this.Load_Employees();
  this.Load_Company() ;
  this.Load_Vat_Percentage();
//   this.Load_All_Account_Type();
  this.Load_Item_Group();
  
 // this.Search_PerformaInvoice();
  //this.myDate=new Date();
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

Load_Company() 
  {   
  this.Sales_Master_Service_.Load_Company().subscribe(Rows => {    
  if (Rows != null) {
      debugger;
  this.Print_Company_ = Rows[0][0];   
  this.Company_ = Rows[0];
  //this.Bank_Data=Rows[1];
  this.Bank_ = Rows[1];
  //this.Bank_Data=this.Bank_;
}
this.issLoading = false;
},
Rows => {
this.issLoading = false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
});
}

Load_Currency() {
    this.currencydetails_Service_.Search_currencydetails('').subscribe(Rows => {
        this.currencyData = Rows[0];        
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
            this.itemGroupData = Rows[0];
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
    this.User_Details_Service_.Search_User_Details('',this.User_Type, this.Login_User_Id).subscribe(Rows => {

        this.EmployeeData = Rows[0];
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

//   Load_InvoiceType() {
//       this.User_Details_Service_.Load_InvoiceType('').subscribe(Rows => {
//           if (Rows != null) {
//               this.AccounttypeData = Rows[0];
//           }
//           this.issLoading = false;
//       },
//           Rows => {
//               this.issLoading = false;
//               const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
//           });
//   }

Load_InvoiceType() {
        debugger;
    this.User_Details_Service_.Load_InvoiceType2().subscribe(Rows => {
        debugger;
        this.AccounttypeData = Rows[0];        
        this.Accounttype_Temp.AccountType_Id = 0;
        this.Accounttype_Temp.AccountType_Name = "Select";
        this.AccounttypeData.unshift(this.Accounttype_Temp);
        this.Accounttype = this.AccounttypeData[0];
        this.accounttype_search = this.AccounttypeData[0];
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}

Load_Payment_Term() {
    this.payment_term_Service_.Load_Payment_Term().subscribe(Rows => {
            this.PaymentTermData = Rows[0];
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
//             this.accountData.unshift({
//                 "AccountType_Id": 0,
//                 "AccountType_Name": "Select"
//             })
//         }
//         this.issLoading = false;
//     },
//         Rows => {
//             this.issLoading = false;
//             const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
//         });
// }

Create_New()
{
  //document.getElementById("Tab_Edit").hidden=true; 
  this.Entry_View = true;
  this.Sales_Print=true;
  this.Clr_Sales_Master();
  this.Clr_Sales_Details();
  this.Purchase_Return_Details_Data=[];
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
  //this.Search_PerformaInvoice();

  //this.Load_Dropdowns();
  this.Purchase_Return_Details_Data=[];
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

    this.printChargeAmount1 = false;
    this.printChargeAmount2 = false;
    this.printVAT_Amount = false;
    this.printDiscount_Description = false;
    this.printAdditional_Discount = false;

  this.purchase_return_master_.Entry_Date = this.formatDate(this.purchase_return_master_.Entry_Date)
  this.purchase_return_master_.PrintDate = this.formatPrintDate(this.purchase_return_master_.Entry_Date);

    if(this.purchase_return_master_.charge1_Amount != 0)
        if(this.purchase_return_master_.charge1_Amount != null)
            if(this.purchase_return_master_.charge1_Amount != undefined )
       if( this.purchase_return_master_.charge1_Amount.toString() != '0')
    if( this.purchase_return_master_.charge1_Amount.toString() != 'null')
        if( this.purchase_return_master_.charge1_Amount.toString() != 'undefined' )
        if( this.purchase_return_master_.charge1_Amount.toString() != '0.000')
     {
         this.printChargeAmount1 = true;
     }
 
 
 
 debugger;
    if(this.purchase_return_master_.charge2_Amount != 0)
        if(this.purchase_return_master_.charge2_Amount != null)
            if(this.purchase_return_master_.charge2_Amount != undefined )
       if( this.purchase_return_master_.charge2_Amount.toString() != '0')
    if( this.purchase_return_master_.charge2_Amount.toString() != 'null')
        if( this.purchase_return_master_.charge2_Amount.toString() != 'undefined' )
        if( this.purchase_return_master_.charge2_Amount.toString() != '0.000')
     {
         this.printChargeAmount2 = true;
     }
 
 
     debugger;
     if(this.purchase_return_master_.VAT_Amount != 0)
         if(this.purchase_return_master_.VAT_Amount != null )
            if(this.purchase_return_master_.VAT_Amount != undefined )
            if(this.purchase_return_master_.VAT_Amount.toString() != '0')
             if(this.purchase_return_master_.VAT_Amount.toString() != 'null')
                     if(this.purchase_return_master_.VAT_Amount.toString() != 'undefined')
                         {
                             this.printVAT_Amount = true;
                         }
 
                         if(this.purchase_return_master_.Discount_Description != '')
                             if(this.purchase_return_master_.Discount_Description != null )
                                if(this.purchase_return_master_.Discount_Description != undefined )
                                if(this.purchase_return_master_.Discount_Description.toString() != '0')
                                 if(this.purchase_return_master_.Discount_Description.toString() != 'null')
                                         if(this.purchase_return_master_.Discount_Description.toString() != 'undefined')
                                             {
                                                 this.printDiscount_Description = true;
                                             }
 
 
                                             if(this.purchase_return_master_.Additional_Discount != 0)
                                                 if(this.purchase_return_master_.Additional_Discount != null )
                                                    if(this.purchase_return_master_.Additional_Discount != undefined )
                                                    if(this.purchase_return_master_.Additional_Discount.toString() != '0')
                                                     if(this.purchase_return_master_.Additional_Discount.toString() != 'null')
                                                             if(this.purchase_return_master_.Additional_Discount.toString() != 'undefined')
                                                                 {
                                                                     this.printAdditional_Discount = true;
                                                                 }
                                                                 
//  this.Load_Company() ;   
  // this.Image_Url='/assets/img/'+this.Print_Company_.Company_Id+'.jpg';
  // this.Company_Sign='/assets/img/Sign_'+this.Print_Company_.Company_Id+'.jpg';
  // this.Company_Seal='/assets/img/Seal_'+this.Print_Company_.Company_Id+'.jpg';  
  this.purchase_return_master_.Entry_Date=this.formatDate(this.purchase_return_master_.Entry_Date);

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
  this.purchase_return_master_.Purchase_Return_Master_Id=0;
  this.purchase_return_master_.Account_Party_Id=0;
  this.purchase_return_master_.Ponumber='';
  this.purchase_return_master_.InvoiceNo='';
  this.purchase_return_master_.User_Id=0;
  this.Purchase_Return_Master_Id_Edit = 0;
  this.Edit_Sales = 0;

  // this.purchase_return_master_.EntryDate=this.New_Date(this.purchase_return_master_.EntryDate);

  this.purchase_return_master_.PurchaseDate=new Date().toString();
  this.purchase_return_master_.PurchaseDate=this.formatDate(this.purchase_return_master_.PurchaseDate);
  this.purchase_return_master_.Currency_Id=0;
  this.purchase_return_master_.Brand="";
  this.purchase_return_master_.PriceBasis="";
  this.purchase_return_master_.PaymentTerms ="";
  this.purchase_return_master_.Payment_Term_Description = 0;
  this.purchase_return_master_.Description1 = "";
  this.purchase_return_master_.Discount_Description = "";
  this.purchase_return_master_.Charge1 = "";
  this.purchase_return_master_.Charge2 = "";
  this.purchase_return_master_.VAT_Percentage = 0;
  this.purchase_return_master_.Additional_Discount = 0;
  this.purchase_return_master_.charge1_Amount = 0;
  this.purchase_return_master_.charge2_Amount = 0;
  this.purchase_return_master_.TotalDiscount = 0
  this.purchase_return_master_.VAT_Amount = 0;
  this.purchase_return_master_.TotalAmount = 0;
  this.purchase_return_master_.Roundoff_Amt = 0;
  this.purchase_return_master_.Amount_In_Words = "";
  this.purchase_return_master_.NetTotal=0;
  this.purchase_return_master_.VAT_Description='';
  this.purchase_return_master_.VAT_Percentage= this.Default_Vat_Percentage;
  this.purchase_return_master_.Discount_Description="";

  // this.purchase_return_master_.RoundOff=0;
  this.purchase_return_master_.TotalAmount=0;
  this.purchase_return_master_.Description2="";
  this.purchase_return_master_.Address1="";
  this.purchase_return_master_.Address2="";
  this.purchase_return_master_.Address3="";
  this.purchase_return_master_.Address4="";
  this.purchase_return_master_.Conversion = 0;
  this.purchase_return_master_.Discount_Description = "";
    this.purchase_return_master_.GSTNo = '';
  if(this.Bill_Type_Data!=undefined && this.Bill_Type_Data!=null)
  this.Bill_Type_=this.Bill_Type_Data[1];
  if(this.Bill_Mode_Data!=undefined && this.Bill_Mode_Data!=null)
  this.Bill_Mode_=this.Bill_Mode_Data[0];
  this.Customer_=null;
  this.Purchase_Return_DetailsData=[];
  this.Address1 = "";
  this.Customer_Name = "";
  this.Address2 = "";
  this.Address3 = "";
  this.Address4 = "";
  this.Vatin = "";
  this.POnumber = null;
  this.Attention = null;
  this.Employee = null;
  this.Tot_Amount = 0;
  this.Total = 0;
  this.InvoiceNo_ = null;

  this.purchase_return_master_.PaymentTermValue = 0;

  if(this.currencyData != undefined && this.currencyData != null)
    this.Currency = this.currencyData[0];

  if(this.AccounttypeData != undefined && this.AccounttypeData != null)
    this.Accounttype = this.AccounttypeData[0];

  if(this.PaymentTermData != undefined && this.PaymentTermData != null)
    this.Payment_Term_Description_ = this.PaymentTermData[0];

  this.purchase_return_master_.Purchase_Return_No = '';


}

Clr_Sales_Details()
{
  this.Purchase_Return_Details_Index=-1;
  this.Purchase_Return_Details_.Purchase_Return_Details_Id=0;
  this.Purchase_Return_Details_.Purchase_Return_Master_Id=0;
  this.Purchase_Return_Details_.UnitPrice =0;
  this.Purchase_Return_Details_.StockId=0;
  //this.Purchase_Return_Details_.Stock_Details_Id=0;
  this.Purchase_Return_Details_.ItemId=0;
  this.Purchase_Return_Details_.ItemName="";
  this.Purchase_Return_Details_.ItemCode="";
  this.Purchase_Return_Details_.GroupId=0;
  this.Purchase_Return_Details_.GroupName="";
  this.Purchase_Return_Details_.UnitId=0;
  this.Purchase_Return_Details_.UnitName="";
  this.Purchase_Return_Details_.StockId=0;
  this.Purchase_Return_Details_.HSNCODE="";
  this.Purchase_Return_Details_.HSNMasterId=0;
  this.Purchase_Return_Details_.Quantity=0;
  this.Purchase_Return_Details_.Discount=0;
  this.Purchase_Return_Details_.NetValue=0;
  this.Barcode_=null;
  this.Item_=null;
  this.UnitName = "";
  this.Quantity = 0;
  this.discount = 0;
  this.unitDiscount = 0;
  this.UnitPrice = 0;
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
  this.Purchase_Return_Details_Description="";
}

Delete_Sales_Details(Purchase_Return_Details_e:Purchase_Return_Details,index)
{
  /*this.Edit_CGST=Purchase_Return_Details_e.CGSTAMT
  this.Edit_SGST=Purchase_Return_Details_e.SGSTAMT;
  this.Edit_GST=Purchase_Return_Details_e.TaxAmount;
  this.Edit_Discount=Number(Purchase_Return_Details_e.Discount);
  this.Edit_Cess=Purchase_Return_Details_e.CessAMT;
  this.Edit_Net=Purchase_Return_Details_e.NetValue;
  this.Edit_Gross=Purchase_Return_Details_e.GrossValue;
  this.Edit_Totamt=Purchase_Return_Details_e.TotalAmount;
  this.CGST_SUM= this.CGST_SUM-this.Edit_CGST;
  this.SGST_SUM= this.SGST_SUM-this.Edit_SGST;
  this.GST_Sum= this.GST_Sum-this.Edit_GST;
  this.Tot_discount=this.Tot_discount-this.Edit_Discount;
  this.Tot_Cess=this.Tot_Cess- this.Edit_Cess;
  this.Tot_Amount=this.Tot_Amount- this.Edit_Totamt;
  this.Tot_Net=this.Tot_Net- this.Edit_Net;
  this.Tot_Gross=this.Tot_Gross-this.Edit_Gross;
  this.purchase_return_master_.GrossTotal=this.purchase_return_master_.GrossTotal-this.Edit_Gross;
  this.purchase_return_master_.TotalDiscount=this.purchase_return_master_.TotalDiscount-this.Edit_Discount;
  this.purchase_return_master_.NetTotal= this.purchase_return_master_.NetTotal-this.Edit_Net;
  this.purchase_return_master_.TotalCGST= this.purchase_return_master_.TotalCGST-this.Edit_CGST;
  this.purchase_return_master_.ToalSGST=   this.purchase_return_master_.ToalSGST-this.Edit_SGST;
  this.purchase_return_master_.Cess=  this.purchase_return_master_.Cess-this.Edit_Cess;
  this.purchase_return_master_.TotalAmount= this.purchase_return_master_.TotalAmount- this.Edit_Totamt;
  this.purchase_return_master_.TotalGST=   this.purchase_return_master_.TotalGST-this.Edit_GST;
  //this.purchase_return_master_.GrandTotal= this.purchase_return_master_.GrandTotal-this.Edit_Totamt;
  this.purchase_return_master_.GrossTotal=Number(this.purchase_return_master_.GrossTotal.toFixed(3));
  this.purchase_return_master_.TotalDiscount=Number(this.purchase_return_master_.TotalDiscount.toFixed(3));
  this.purchase_return_master_.NetTotal=Number(this.purchase_return_master_.NetTotal.toFixed(3));
  this.purchase_return_master_.TotalCGST=Number(this.purchase_return_master_.TotalCGST.toFixed(3));
  this.purchase_return_master_.ToalSGST=Number(this.purchase_return_master_.ToalSGST.toFixed(3));
  this.purchase_return_master_.Cess=Number(this.purchase_return_master_.Cess.toFixed(3));
  this.purchase_return_master_.TotalAmount=Number(this.purchase_return_master_.TotalAmount.toFixed(3));
  this.purchase_return_master_.TotalGST=Number(this.purchase_return_master_.TotalGST.toFixed(3));   
  this.purchase_return_master_.GrandTotal=Number(this.purchase_return_master_.GrandTotal.toFixed(3));*/   
  this.Purchase_Return_Details_Data.splice(index, 1); 
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
 this.Search_Purchase();
 this.issLoading=false;
 },
 Rows => {
     this.issLoading=false;
 const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error',Type:"2"}});
 });
 }
 });
}

Delete_purchase_return_master(Purchase_Return_Master_Id,index)
{
  const dialogRef = this.dialogBox.open
  ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
  dialogRef.afterClosed().subscribe(result =>        
  {    
  if(result=='Yes')
  {
  this.issLoading=true;
  debugger
  this.purchase_return_master_Service_.Delete_purchase_return_master(Purchase_Return_Master_Id).subscribe(Delete_status => {    
    //   debugger   
    //   Delete_status=Delete_status[1];
  if(Delete_status[0][0].purchase_return_master_Id_>0){
//   this.purchase_return_master_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    
    this.Search_Purtchase_Return();
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
      this.Bill_Type_Data = Rows[0];        
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
      this.Bill_Mode_Data = Rows[0];        
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
  debugger;
  var Value = "";
  if (event.target.value == "")
      Value = undefined;
  else
      Value = event.target.value;
    {
   this.issLoading = true;
  this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39',Value).subscribe(Rows => {   
    debugger;  
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

Search_Invoice_By_Supplier_Typeahead(event: any)
{
    let Client_Accounts_Id = 0
        debugger;
  var Value = "";
  if (event.target.value == "")
      Value = undefined;
  else
      Value = event.target.value;

Client_Accounts_Id=this.Customer_.Client_Accounts_Id;

   this.issLoading = true;
  this.purchase_return_master_Service_.Search_Invoice_By_Supplier_Typeahead(Client_Accounts_Id,Value).subscribe(Rows => {     
  if (Rows != null) {
      this.Invoice_Data = Rows[0];
  }
  this.issLoading = false;
  },
  Rows => {
   
  this.issLoading = false;
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  });
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

Get_PurchaseReturn_Item_Code_Typeahead(event: any)
{
  if(!this.InvoiceNo_){
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Choose Invoice',Type:"2"}});
    return
  }
   var Value = "";
   
   Value = event.target.value;
     
    this.issLoading = true;
    debugger
   this.purchase_return_master_Service_.Get_PurchaseReturn_Item_Code_Typeahead(this.InvoiceNo_.Purchase_Master_Id,Value).subscribe(Rows => {     
      debugger
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

Get_Stock_Item_Code_Typeahead(event: any)
{

    if(!this.InvoiceNo_)
    {
        this.ItemCodeData = [];
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Choose Invoice No.',Type:"2"}});
        return;
    }
    var Value = "";
    
    Value = event.target.value;
      
     this.issLoading = true;
    this.Sales_Master_Service_.Get_Item_Code_Typeahead_For_Purchase_Return(Value,this.InvoiceNo_.Purchase_Master_Id).subscribe(Rows => {     
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

    if(!this.InvoiceNo_)
        {
            this.Stock_Data_Filter = [];
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Choose Invoice No.',Type:"2"}});
            return;
        }
  
  var Value = "";

  if(this.Barcode_ == null || this.Barcode_ == undefined)
    this.Barcode_ = new Purchase_Return_Details();

  if (event.target.value == "") Value = "";
  else Value = event.target.value.toLowerCase();

  this.Barcode_.ItemName=Value
  this.Purchase_Return_Details_.ItemName=Value;

          this.issLoading = true;
  this.Sales_Master_Service_.Get_Item_Name_Typeahead_For_Purchase_Return(this.InvoiceNo_.Purchase_Master_Id,Value).subscribe(Rows => {

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

Barcode_keyup(event: any)
{
// if(event.key==1)
//     this.Focus_down(event);
// else
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
//  display_Barcode(Barcode_E: Stock) 
//  {
//     if (Barcode_E) { return Barcode_E.Barcode; }
// }
display_ItemCode(item) 
{
  if (item) { return item.Item_Code; }
}

/*
Search_Customer_Typeahead(event: any)
{
   var Value = "";
  if (event.target.value == "")
      Value = undefined;
  else
      Value = event.target.value;
     // if(this.Item_Data==undefined || this.Item_Data.length==0)
          
          //  var Temp_Group_Id='3,'+this.Employee_Id
          this.issLoading = true;
  this.Sales_Master_Service_.Search_Customer_Typeahead('1,3',Value).subscribe(Rows => {   
      if (Rows != null) {
          this.Customer_Data = Rows[0];
  }
      this.issLoading = false;
  },
      Rows => {      
          this.issLoading = false;
  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
      }
      );  
 
}*/
display_Customer(Client_Accounts_e: Client_Accounts)
{
  if (Client_Accounts_e) { return Client_Accounts_e.Client_Accounts_Name; }
}

display_Invoice(item)
{
  if (item) { return item.InvoiceNo; }
}

display_PurchaseOrderNo(item)
{
  if (item) { return item.InvoiceNo; }
}

display_User(item)
{
  if (item) { return item.User_Details_Name; }
}

display_InvoiceType(Accounttype)
{
  if (Accounttype) { return Accounttype.AccountType_Name; }
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
//   this.Customer_=Customer_T_;
  
//   this.purchase_return_master_.Customer_Name=this.Customer_.Client_Accounts_Name;
//   this.purchase_return_master_.Customer=this.Customer_.Client_Accounts_Name;
//   this.purchase_return_master_.Address1 = this.Customer_.Address1;
//   this.purchase_return_master_.Address2 = this.Customer_.Address2;
//   this.purchase_return_master_.Address3 = this.Customer_.Address3;
//   this.purchase_return_master_.Address4 = this.Customer_.Address4;
//   this.purchase_return_master_.Mobile = this.Customer_.Mobile;
//   this.purchase_return_master_.PinCode=this.Customer_.PinCode;
//   this.purchase_return_master_.GSTNo=this.Customer_.GSTNo;
// }

selectCustomer(){
  this.Customer_Name = this.Customer_.Client_Accounts_Name
  this.Address1 = this.Customer_.Address1;
  this.Address2 = this.Customer_.Address2;
  this.Address3 = this.Customer_.Address3;
  this.Address4 = this.Customer_.Address4;
  this.Vatin = this.Customer_.GSTNo;
}

Item_Name_Change(Item_sl:Purchase_Return_Details){

    debugger;

    this.Purchase_Return_Details_=Object.assign({},Item_sl);

 this.Item_Temp.StockId=Item_sl.StockId;
 this.Item_Temp.Item_Code=Item_sl.Item_Code;
 this.Item_Temp.ItemCode = Item_sl.Item_Code;
 this.Item_Temp.ItemId=Item_sl.ItemId;
 this.Item_Temp.ItemName =Item_sl.ItemName;
 this.Barcode_=Object.assign({},this.Item_Temp);

 this.Purchase_Return_Details_.StockId=Item_sl.StockId; 
 this.Purchase_Return_Details_.Item_Code=Item_sl.Item_Code;
 this.Purchase_Return_Details_.ItemCode =Item_sl.Item_Code
 this.Purchase_Return_Details_.ItemId=Item_sl.ItemId;
 this.Purchase_Return_Details_.ItemName =Item_sl.ItemName; 
}
// Barcode_Change()
// {
//   this.Stock_Temp.ItemId=this.Barcode_.ItemId;
//   this.Stock_Temp.ItemName=this.Barcode_.ItemName;
//   this.Stock_=Object.assign({},this.Stock_Temp);
//   this.Purchase_Return_Details_.ItemId=this.Barcode_.ItemId;
//   this.Purchase_Return_Details_.ItemName=this.Barcode_.ItemName;
//   this.Purchase_Return_Details_.CGST=this.Barcode_.CGST;
//   this.Purchase_Return_Details_.IGST=this.Barcode_.IGST;
//   this.Purchase_Return_Details_.SGST=this.Barcode_.SGST;
//   this.Purchase_Return_Details_.UnitId=this.Barcode_.UnitId;
//   this.Purchase_Return_Details_.UnitName=this.Barcode_.UnitName;
//   this.Purchase_Return_Details_.MRP=this.Barcode_.MRP;
//   this.Purchase_Return_Details_.PurchaseRate=this.Barcode_.PurchaseRate;
//   // this.Purchase_Return_Details_.Stock=this.Barcode_.Quantity;
//   this.Purchase_Return_Details_.SaleRate=this.Barcode_.SaleRate;
//   this.Purchase_Return_Details_.ItemName=this.Barcode_.ItemName;
//   this.Purchase_Return_Details_.GroupId=this.Barcode_.GroupId;
//   this.Purchase_Return_Details_.GroupName=this.Barcode_.GroupName;
//   this.Purchase_Return_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
//   this.Purchase_Return_Details_.HSNCODE=this.Barcode_.HSNCODE;
//   this.Purchase_Return_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
//   this.Purchase_Return_Details_.StockId=this.Barcode_.Stock_Id;
//   this.Purchase_Return_Details_.SaleTax=this.Barcode_.SaleTax;
//   //this.Purchase_Return_Details_.Barcode=this.Barcode_.Barcode;  
// }

Barcode_Change(Barcode_sl:Purchase_Return_Details)
{    
      debugger
    this.Purchase_Return_Details_=Object.assign({},Barcode_sl);
    this.Purchase_Return_Details_Temp_.ItemId=Barcode_sl.ItemId;
    this.Purchase_Return_Details_Temp_.ItemName=Barcode_sl.ItemName;
    this.Item_=Object.assign({},this.Purchase_Return_Details_Temp_);   
    
    this.Purchase_Return_Details_.ItemId=this.Barcode_.ItemId;
    this.Purchase_Return_Details_.ItemName=this.Barcode_.ItemName;
}

Invoice_Change(Invoice:purchase_return_master)
{
  debugger;
  debugger;
var Purchase_Master_Id_new=Invoice.Purchase_Master_Id;

this.purchase_return_master_=Object.assign({},Invoice);
this.purchase_return_master_.Currency_Id=Invoice.Currency_Id;
this.purchase_return_master_.TypeId=Invoice.TypeId;
this.purchase_return_master_.Conversion=Invoice.Conversion;
this.purchase_return_master_.Brand=Invoice.Brand;
this.purchase_return_master_.PriceBasis=Invoice.PriceBasis;
this.purchase_return_master_.PaymentTermValue=Invoice.PaymentTermValue;
this.purchase_return_master_.Payment_Term_Description=Invoice.Payment_Term_Description;
this.purchase_return_master_.Charge1=Invoice.Charge1;
this.purchase_return_master_.Charge2=Invoice.Charge2;
this.purchase_return_master_.Discount_Description=Invoice.Discount_Description;
this.purchase_return_master_.VAT_Description=Invoice.VAT_Description;
this.purchase_return_master_.charge1_Amount=Invoice.charge1_Amount;
this.purchase_return_master_.charge2_Amount=Invoice.charge2_Amount;
this.purchase_return_master_.Additional_Discount=Invoice.Additional_Discount;
this.purchase_return_master_.Roundoff=Invoice.Roundoff;
this.purchase_return_master_.Discount=Invoice.Discount;
this.purchase_return_master_.TaxableAmount=Invoice.TaxableAmount;
//this.purchase_return_master_.PurchaseDate=new Date().toString();
this.purchase_return_master_.PurchaseDate=this.formatDate(this.purchase_return_master_.PurchaseDate); 
this.purchase_return_master_.Entry_Date=new Date("dd-MMM-yyyy").toString();
this.purchase_return_master_.Entry_Date=new Date().toString();
this.purchase_return_master_.Entry_Date=this.formatDate(this.purchase_return_master_.Entry_Date); 

debugger;
if(this.currencyData==undefined || this.currencyData==null)
  {
    debugger;
      this.currencydetails_Service_.Load_currencydetails().subscribe(Rows => {
          if(Rows[0]!=null)
          {
            debugger;
              this.currencyData = Rows[0];        
              this.Currency_Temp.CurrencyDetails_Id = 0;
              this.Currency_Temp.CurrecnyName = "Select";
              this.currencyData.unshift(this.Currency_Temp);
              this.Currency = this.currencyData[0];
              debugger;
          for (var i = 0; i < this.currencyData.length; i++) {
              if (this.currencyData[i].CurrencyDetails_Id == Invoice.Currency_Id) {
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
      if (this.currencyData[i].CurrencyDetails_Id == Invoice.Currency_Id) {
          this.Currency = this.currencyData[i];
      }
  }
  debugger;
}
  if(this.AccounttypeData==undefined || this.AccounttypeData==null)
  {
      this.User_Details_Service_.Load_InvoiceType2().subscribe(Rows => {
          if( Rows[0]!=null){
          this.AccounttypeData = Rows[0];  
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
      if (Rows != null) {
          this.PaymentTermData = Rows[0];
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

debugger;

this.purchase_return_master_Service_.Get_Purchase_Details(Purchase_Master_Id_new).subscribe(Rows => { 
  debugger
  if (Rows != null) {
      this.Purchase_Return_DetailsData = Rows[0];
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

Calculate_Purchase_Return_Details_Amount()
{
  debugger
  if(this.Purchase_Return_Details_.Quantity == undefined || this.Purchase_Return_Details_.Quantity == null)
  this.Purchase_Return_Details_.Quantity = 0;
  if(this.Purchase_Return_Details_.UnitPrice == undefined || this.Purchase_Return_Details_.UnitPrice == null)
  this.Purchase_Return_Details_.UnitPrice = 0;

this.Calculate_Total_Amount();
}

Calculate_Total_Amount()
{ 
  //this.unitDiscount = (this.SaleRate * this.discount )/ 100;
//   this.TotalAmount = this.Quantity * this.UnitPrice ;
    this.Purchase_Return_Details_.Discount = 0;
    //if(this.Purchase_Details_.Item_Discount_Amount == undefined || this.Purchase_Details_.Item_Discount_Amount == null)
        this.Purchase_Return_Details_.Item_Discount_Amount = 0;

    this.Purchase_Return_Details_.Unit_Discount = (Number(this.Purchase_Return_Details_.UnitPrice) * Number(this.Purchase_Return_Details_.Discount))/ 100;
    this.Purchase_Return_Details_.Unit_Discount = Number(this.Purchase_Return_Details_.Unit_Discount.toFixed(3));

    this.Purchase_Return_Details_.Item_Discount_Amount =Number(this.Purchase_Return_Details_.Unit_Discount) * Number(this.Purchase_Return_Details_.Quantity);
    this.Purchase_Return_Details_.Item_Discount_Amount = Number(this.Purchase_Return_Details_.Item_Discount_Amount.toFixed(3));

    this.Purchase_Return_Details_.Amount = Number(this.Purchase_Return_Details_.Quantity) * Number(this.Purchase_Return_Details_.UnitPrice);
    this.Purchase_Return_Details_.Amount =Number(this.Purchase_Return_Details_.Amount.toFixed(3));

    // this.Purchase_Return_Details_.TaxableAmount = Number(this.Purchase_Return_Details_.Amount) - Number(this.Purchase_Return_Details_.Item_Discount_Amount);
    // this.Purchase_Return_Details_.TaxableAmount =Number(this.Purchase_Return_Details_.TaxableAmount.toFixed(3));
    //this.Purchase_Return_Details_.TaxAmount = Number(this.Purchase_Return_Details_.TaxableAmount) * Number(this.Purchase_Return_Details_.SaleTax) /100;
        
    this.Purchase_Return_Details_.Unit_Discount = (Number(this.Purchase_Return_Details_.UnitPrice) * Number(this.Purchase_Return_Details_.Discount))/ 100;
    this.Purchase_Return_Details_.Item_Discount_Amount =Number(this.Purchase_Return_Details_.Unit_Discount) * Number(this.Purchase_Return_Details_.Quantity);
    this.Purchase_Return_Details_.Amount = Number(this.Purchase_Return_Details_.Quantity) * Number(this.Purchase_Return_Details_.UnitPrice);
    this.Purchase_Return_Details_.TaxableAmount = Number(this.Purchase_Return_Details_.Amount) - Number(this.Purchase_Return_Details_.Item_Discount_Amount);
    this.Purchase_Return_Details_.TaxAmount = Number(this.Purchase_Return_Details_.TaxableAmount) * Number(this.Purchase_Return_Details_.SaleTax) /100;
    this.Purchase_Return_Details_.NetValue= Number(this.Purchase_Return_Details_.TaxableAmount) + Number(this.Purchase_Return_Details_.TaxAmount);

    this.Purchase_Return_Details_.Item_Discount_Amount=Number(this.Purchase_Return_Details_.Item_Discount_Amount.toFixed(3));    
    this.Purchase_Return_Details_.Amount=Number(this.Purchase_Return_Details_.Amount.toFixed(3));    
    this.Purchase_Return_Details_.TaxableAmount=Number(this.Purchase_Return_Details_.TaxableAmount.toFixed(3));
    this.Purchase_Return_Details_.TaxAmount=Number(this.Purchase_Return_Details_.TaxAmount.toFixed(3));  
    this.Purchase_Return_Details_.NetValue= Number(this.Purchase_Return_Details_.NetValue.toFixed(3));
    
}
// Round_Off_Calculation()
// {   
//   if(this.purchase_return_master_.RoundOff == undefined || this.purchase_return_master_.RoundOff == null)
//       this.purchase_return_master_.RoundOff = 0;   
//   this.purchase_return_master_.GrandTotal = Number(this.purchase_return_master_.RoundOff) + Number(this.purchase_return_master_.TotalAmount);
// }
checkbox_Click()
{ 
  this.Final_Amounts();
}

safeNumber(value) {
  return isNaN(value) ? 0 : value;
}

// Final_Amounts()
// {      
//   this.Tot_Gross=0,this.Tot_discount=0,this.Tot_Net=0,this.Tot_Amount=0;
//   for(var i = 0; i< this.Purchase_Return_DetailsData.length ; i++)
//   {
//       this.Tot_Amount = Number(this.Tot_Amount) + Number(this.Purchase_Return_DetailsData[i].UnitPrice) * Number(this.Purchase_Return_DetailsData[i].Quantity);

//       this.Tot_discount = Number(this.Tot_discount)+  (this.Purchase_Return_DetailsData[i].Unit_Discount * this.Purchase_Return_DetailsData[i].Quantity );
      
//   }
//   this.Tot_Amount = Number(this.Tot_Amount.toFixed(3));
//   this.Tot_discount = Number(this.Tot_discount.toFixed(3));
//   if(this.performainvoicemaster_.Discount_Description>0){
//       this.performainvoicemaster_.Additional_Discount = this.Tot_Amount * (this.performainvoicemaster_.Discount_Description/ 100);

//   }else{
//       this.performainvoicemaster_.Additional_Discount = 0
//   }
//   //this.purchase_return_master_.Discount_Description = (this.safeNumber(this.purchase_return_master_.Additional_Discount) * 100)/this.Tot_Amount
//   this.performainvoicemaster_.TotalDiscount = this.Tot_discount+ this.performainvoicemaster_.Additional_Discount;
//   if(this.performainvoicemaster_.Charge1per>0){
//       this.performainvoicemaster_.charge1_Amount = (this.Tot_Amount - this.performainvoicemaster_.Additional_Discount)* (this.performainvoicemaster_.Charge1per/100)
//       this.performainvoicemaster_.charge1_Amount = Number(this.performainvoicemaster_.charge1_Amount.toFixed(3))
//   }else{
//       this.performainvoicemaster_.charge1_Amount =  0;
//   }
//   this.Total = this.Tot_Amount-this.performainvoicemaster_.TotalDiscount + this.safeNumber(this.performainvoicemaster_.charge2_Amount) + this.performainvoicemaster_.charge1_Amount
//   this.Total = Number(this.Total.toFixed(3))
//   this.performainvoicemaster_.VAT_Amount = 0;
//   if(this.performainvoicemaster_.VAT_Percentage>0){
//       this.performainvoicemaster_.VAT_Amount = this.Total * (this.performainvoicemaster_.VAT_Percentage/100)
//   }
//   this.performainvoicemaster_.VAT_Amount = Number(this.performainvoicemaster_.VAT_Amount.toFixed(3))    
//   this.performainvoicemaster_.Total_Amount = this.Total + this.performainvoicemaster_.VAT_Amount
//   this.performainvoicemaster_.Total_Amount = Number(this.performainvoicemaster_.Total_Amount.toFixed(3))
//   this.performainvoicemaster_.NetTotal = Number((this.performainvoicemaster_.Total_Amount - this.safeNumber(this.performainvoicemaster_.Roundoff_Amt)).toFixed(3))
//   this.performainvoicemaster_.NetTotal = Number(this.performainvoicemaster_.NetTotal.toFixed(3))
//   this.performainvoicemaster_.Amount_In_Words = this.numberToWordsIndianCurrency(this.performainvoicemaster_.NetTotal)
   
 

// }





// Manual_Roundoff_Calculation()
// {
//   var Point_=0.50;
//   this.roundoff_value=0;
//   this.roundoff_value=this.purchase_return_master_.TotalAmount-(Math.round(this.purchase_return_master_.TotalAmount));
//   if(this.roundoff_value<Number(Point_))
//   this.roundoff_value=- this.roundoff_value;
//  // this.purchase_return_master_.TotalAmount=this.purchase_return_master_.TotalAmount+  this.roundoff_value;
//   this.purchase_return_master_.RoundOff=Number(this.roundoff_value);
//   this.purchase_return_master_.RoundOff=Number(this.purchase_return_master_.RoundOff.toFixed(3));
//   this.purchase_return_master_.TotalAmount= Number(this.purchase_return_master_.TotalAmount.toFixed(3));
// }
// Calculation_GSt()
// {
//   if(this.purchase_return_master_.Isgst==true)
//   {
//       this.purchase_return_master_.Transportation_Gst = Number(this.purchase_return_master_.Transportation_Charge) * (18 / 100)
//       this.purchase_return_master_.Transportation_Total = Number(this.purchase_return_master_.Transportation_Charge) + Number(this.purchase_return_master_.Transportation_Gst) ;
//       this.purchase_return_master_.Handling_Gst = (this.purchase_return_master_.Handling_Charge) * (18 / 100)
//       this.purchase_return_master_.Handling_Total = Number(this.purchase_return_master_.Handling_Charge) + Number(this.purchase_return_master_.Handling_Gst);
//  }
// }

Search_Purchase()
{
  var look_In_Date_Value=0,CustomerId_=0,Item_Group_Id_=0,CurrencyDetails_Id_=0,User_Details_Id_ = 0;
  this.Sales_Master_Total_Amount=0;    
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
  // if(this.Employee_Search.User_Details_Id==null || this.Employee_Search.User_Details_Id==undefined)
  //     User_Details_Id_=0;
  // else
  //     User_Details_Id_=this.Employee_Search.User_Details_Id;
  this.issLoading=true;    
  this.QuotNo = this.QuotNo == "" ? undefined : this.QuotNo
  this.partNo = this.partNo == "" ? undefined : this.partNo
  
//   this.Sales_Master_Service_.Search_Purchase(look_In_Date_Value,moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),CustomerId_,this.QuotNo,this.partNo,Item_Group_Id_,
//                                                           CurrencyDetails_Id_,User_Details_Id_).subscribe(Rows => {
//   this.purchase_return_master_Data=Rows[0];
//   if(this.purchase_return_master_Data.length>0)
//   {
//       for(var i=0;i<this.purchase_return_master_Data.length;i++)
//       {
//           this.Sales_Master_Total_Amount=Number(this.Sales_Master_Total_Amount)+Number(this.purchase_return_master_Data[i].GrandTotal);
//           this.Sales_Master_Total_Amount= Number(this.Sales_Master_Total_Amount.toFixed(3));
//       }
//   }
//   this.Total_Entries=this.purchase_return_master_Data.length;
//   if(this.purchase_return_master_Data.length==0)
//   {
//   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
//   }
//   this.issLoading=false;
//   },
//   Rows => {
//       this.issLoading=false;
//       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//   });
}
// Add_Sales_Details()
// {     
//     if (this.Purchase_Return_Details_Index >= 0) {
//         this.Purchase_Return_Details_Data[this.Purchase_Return_Details_Index] = Object.assign({}, this.Purchase_Return_Details_);
//         }
//     else {
//         //this.Purchase_Return_Details_.Barcode=this.Barcode_.Barcode;
//         this.Purchase_Return_Details_Data.push(Object.assign({}, this.Purchase_Return_Details_));
// }
// this.Final_Amounts();
// this.Purchase_Return_Details_Index=-1;
// this.Clr_Sales_Details();
//  }
Add_Sales_Details1()
{     
  if (this.Purchase_Return_DetailsIndex >= 0) {
      this.Purchase_Return_DetailsData[this.Purchase_Return_DetailsIndex] = Object.assign({}, this.Purchase_Return_Details);
      }
  else {
      //this.Purchase_Return_Details_.Barcode=this.Barcode_.Barcode;
      this.Purchase_Return_DetailsData.push(Object.assign({}, this.Purchase_Return_Details));
}
this.Final_Amounts();
this.Purchase_Return_DetailsIndex=-1;
this.Clr_Sales_Details();
}

Plus_Purchase_Return_Details(event)
{   
  debugger
  if(this.Barcode_==undefined || this.Barcode_==null )
      {
          const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select Item code',Type:"3"}});
          return
      }
  else if(this.Purchase_Return_Details_.Quantity==undefined || this.Purchase_Return_Details_.Quantity==null || this.Purchase_Return_Details_.Quantity==0 )
  {
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter the quantity',Type:"3"}});
      return
  }
  else if(this.Purchase_Return_Details_.UnitPrice==undefined || this.Purchase_Return_Details_.UnitPrice==null || this.Purchase_Return_Details_.UnitPrice==0 )
  {
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter purchase rate',Type:"3"}});
      return
  }     


  debugger;
    if (this.Purchase_Return_DetailsData == undefined)
        this.Purchase_Return_DetailsData = [];
    var inserted = 0;
    for (var i = 0; i < this.Purchase_Return_DetailsData.length; i++) {
        if (this.Purchase_Return_DetailsData[i].StockId == this.Purchase_Return_Details_.StockId) {
            if (this.Purchase_Return_DetailsIndex == i) {
                this.Purchase_Return_DetailsData[i] = Object.assign({}, this.Purchase_Return_Details_)// this.Sales_Details_;
            }
            else {
                this.Purchase_Return_Details_.TaxableAmount = this.TotalAmount-this.discount;
                this.Purchase_Return_Details_.TaxAmount = this.Purchase_Return_Details_.TaxableAmount * (this.safeNumber(this.Stock_.SaleTax) / 100);
                this.Purchase_Return_Details_.Item_Discount_Amount = Number(this.Purchase_Return_Details_.UnitPrice) * this.safeNumber(this.Purchase_Return_Details_.Discount)/100;
                this.Purchase_Return_DetailsData.push(Object.assign({}, this.Purchase_Return_Details_));
            }
            if (this.Purchase_Return_DetailsIndex != i && this.Purchase_Return_DetailsIndex >= 0) {
                this.Purchase_Return_DetailsData.splice(this.Purchase_Return_DetailsIndex, 1)
            }
            inserted = 1;
            i = this.Purchase_Return_DetailsData.length;
            break;
        }
    }

    debugger;
    if (inserted == 0) {
        if (this.Purchase_Return_DetailsIndex >= 0) {
            this.Purchase_Return_DetailsData[this.Purchase_Return_DetailsIndex] = Object.assign({}, this.Purchase_Return_Details_)// this.Sales_Details_;
        }
        else {
            this.Purchase_Return_DetailsData.push(Object.assign({}, this.Purchase_Return_Details_));
        }
    }
    this.Purchase_Return_DetailsIndex = -1;
    this.Focus_It(event);

  this.Clr_Sales_Details();
  this.addBlankRows();
  this.Final_Amounts();

}

Save_Purchase(Printstatus:number)
{

  if(this.Purchase_Return_Details_Data == undefined || this.Purchase_Return_Details_Data == null || this.Purchase_Return_Details_Data.length == 0 || this.Purchase_Return_Details_Data.length == undefined )
  {
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Add atleast one Item',Type:"3"}});
      return
  }
  if(this.Customer_ == undefined || this.Customer_ == null || this.Customer_.Client_Accounts_Id == undefined || this.Customer_.Client_Accounts_Id == 0 ){
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Choose Customer',Type:"3"}});
      return
  }    
  this.purchase_return_master_.Account_Party_Id=this.Customer_.Client_Accounts_Id;
  this.purchase_return_master_.User_Id=Number(this.Login_User_Id);
  this.purchase_return_master_.Purchase_Return_Details=this.Purchase_Return_Details_Data;
  // this.purchase_return_master_.KindAttend=this.Attention.User_Details_Id;
  // this.purchase_return_master_.AttendEmployee = this.Employee.User_Details_Id
  // this.purchase_return_master_.Payment_Term_Description = this.Payment_Term_Description_.payment_Term_ID


  if(this.Payment_Term_Description_ == undefined || this.Payment_Term_Description_ == null){
    this.purchase_return_master_.Payment_Term_Description = 0;
    this.purchase_return_master_.PaymentTerms = "";
}else{
    this.purchase_return_master_.Payment_Term_Description = this.Payment_Term_Description_.payment_Term_ID;
    this.purchase_return_master_.PaymentTerms = this.Payment_Term_Description_.Payment_Term_Description;
}


  this.issLoading=true;   
  this.purchase_return_master_Service_.Save_purchase_return_master(this.purchase_return_master_).subscribe(Save_status => {   
      
      if(Number(Save_status[0].purchase_return_master_Id_)>0)
      {
          this.purchase_return_master_.Purchase_Return_Master_Id = Save_status[0].purchase_return_master_Id_;
          this.purchase_return_master_.Purchase_Return_No = Save_status[0].Purchase_Return_No_;
          this.Edit_Sales = 1
          
          if (Printstatus==1)
          {
              this.Print_Click();
          }
          else
          {
              this.issLoading = false;
              const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});
              //this.Sales_Print = false;  
               
            //   this.Clr_Sales_Master() 
                       
          }
          //document.getElementById("Save_Button").hidden=true;
          // this.Disable_Tab_Permission();
          // document.getElementById("Tab_Edit").hidden=false;
      this.Sales_Print = false;
      }
      else{
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
      document.getElementById("Save_Button").hidden=false;   
      }
      this.issLoading=false;
      },
      Rows => { 
          this.issLoading=false;
          document.getElementById('Save_Button').hidden=false;
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
      });

}

// Edit_Button_Click()
// {
//   if (this.User_Type_Id == 1 || this.purchase_return_master_Data[this.Sale_EditIndex].User_Id.toString() == this.Login_User_Id)
//   {
//       this.Tabs_Edit_Permission();
//   }
//    else
//   {
//       const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No permission', Type: "3" } });
//   }
// }

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

Edit_purchase_return_master(Sales_Master_e:purchase_return_master,index)
{ 
    this.Entry_View=true;
    this.Edit_Sales=1;
    this.Sales_Print = false;
    this.purchase_return_master_=Object.assign({},Sales_Master_e); 
    if(this.purchase_return_master_.Additional_Discount) this.addDiscCheck = 1;
    else this.addDiscCheck = 0;
    this.Purchase_Return_Master_Id_Edit = Sales_Master_e.Purchase_Return_Master_Id;
    this.Customer_Temp.Client_Accounts_Id=Sales_Master_e.Account_Party_Id;
    this.Customer_Temp.Client_Accounts_Name=Sales_Master_e.Customer;
    this.Customer_=this.Customer_Temp;
    this.Customer_Name = this.Customer_.Client_Accounts_Name
    this.purchase_return_master_.Customer=this.Customer_.Client_Accounts_Name; 
    
    // this.Client_Accounts_Service_.Get_Client_Accounts(Sales_Master_e.Account_Party_Id).subscribe((result)=>{
                    
    //                 this.Address1 = result[0][0].Address1;
    //                 this.Address2 = result[0][0].Address2;
    //                 this.Address3 = result[0][0].Address3;
    //                 this.Address4 = result[0][0].Address4;
    //                 this.Vatin = result[0][0].GSTNo
    // })
    this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39',"").subscribe(Rows => {   
      if (Rows != null) {
          this.Customer_Data = Rows[0];
          for(let i=0;i<Rows[0].length;i++){
              if(Rows[0][i].Client_Accounts_Id == Sales_Master_e.Account_Party_Id){
                  this.Customer_Temp.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                  this.Customer_Temp.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                   this.Customer_= this.Customer_Temp;
                
                  this.purchase_return_master_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                  this.purchase_return_master_.Customer=Rows[0][i].Client_Accounts_Name;

                  this.purchase_return_master_.Address1 = Rows[0][i].Address1;
                  this.purchase_return_master_.Address2 = Rows[0][i].Address2;
                  this.purchase_return_master_.Address3 = Rows[0][i].Address3;
                  this.purchase_return_master_.Address4 = Rows[0][i].Address4;
                  this.purchase_return_master_.GSTNo = Rows[0][i].GSTNo;

                  this.Address1 = Rows[0][i].Address1;
                  this.Address2 = Rows[0][i].Address2;
                  this.Address3 = Rows[0][i].Address3;
                  this.Address4 = Rows[0][i].Address4;
                  this.Vatin = Rows[0][i].GSTNo;
              }
          }
      }},
      );
    this.purchase_return_master_Service_.Search_Invoice_By_Supplier_Typeahead(Sales_Master_e.Account_Party_Id,"").subscribe(Rows1 => {  
                         
                          if (Rows1 != null) {
                              this.Invoice_Data = Rows1[0];
                              for(let j=0;j<Rows1[0].length;j++){
                                if(Rows1[0][j].InvoiceNo == Sales_Master_e.InvoiceNo){
                                  this.InvoiceNo_ = Rows1[0][j]

                                }
                              }
                          }                          
                          });    
    for(let i=0;i<this.PaymentTermData.length;i++){
        if(this.PaymentTermData[i].Payment_Term_Description == Sales_Master_e.PaymentTerms){
            this.Payment_Term_Description_ = this.PaymentTermData[i]
        }
    }

    for(let i=0;i<this.AccounttypeData.length;i++){
        if(this.AccounttypeData[i].AccountType_Id == Sales_Master_e.TypeId){
            this.Accounttype = this.AccounttypeData[i]
            this.invoiceTypeName = this.AccounttypeData[i].AccountType_Name

        }
    }
    for(let i=0;i<this.currencyData.length;i++){
        if(this.currencyData[i].CurrencyDetails_Id == Sales_Master_e.Currency_Id){

            this.Currency = this.currencyData[i]
            this.currencyName = this.currencyData[i].CurrecnyName

        }
    }

this.issLoading = true;
debugger
this.purchase_return_master_Service_.Get_Purchase_Return_Details(Sales_Master_e.Purchase_Return_Master_Id).subscribe(Rows => { 
    debugger
    if (Rows != null) {
      debugger
        this.Purchase_Return_DetailsData = Rows[0];
        this.addBlankRows();
        this.Final_Amounts();        
        }           
       },
     Rows => {
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    this.issLoading = false;
    debugger
}
Edit_Sales_Details(Purchase_Return_Details_e:Purchase_Return_Details,index)
{   
  this.Purchase_Return_Details_Index=index;
  this.Purchase_Return_Details_=Purchase_Return_Details_e;
  this.Stock_Temp.ItemId=Purchase_Return_Details_e.ItemId;
  this.Stock_Temp.ItemName=Purchase_Return_Details_e.ItemName;
  this.Stock_=Object.assign({},this.Stock_Temp);
  this.Barcode_Temp.Stock_Id=Purchase_Return_Details_e.StockId;
  //this.Barcode_Temp.Barcode=Purchase_Return_Details_e.Barcode;
//   this.Barcode_=Object.assign({},this.Barcode_Temp);    
  // this.Edit_CGST=this.Purchase_Return_Details_.CGSTAMT
  // this.Edit_SGST=this.Purchase_Return_Details_.SGSTAMT;
  this.Edit_GST=this.Purchase_Return_Details_.TaxAmount;
  this.Edit_Discount=this.Purchase_Return_Details_.Discount;
  // this.Edit_Cess=this.Purchase_Return_Details_.CessAMT;
  this.Edit_Net=this.Purchase_Return_Details_.NetValue;
  this.Purchase_Return_Details_=Object.assign({},Purchase_Return_Details_e);
  this.Sale_Detail_Quantity=this.Purchase_Return_Details_.Quantity;
  // this.Edit_Stock_-this.Purchase_Return_Details_.Stock;
  this.Purchase_Return_Details_Description="";
}

Get_Stock(){
//   console.log("Barcode_", this.Barcode_.Stock_Id)
//   this.Sales_Master_Service_.Search_PurchaseItem_Typeahead("").subscribe(Rows => {

//       if (Rows != null) {
//           this.Stock_Data_Filter = Rows[0];
//           for(let i= 0;i< this.Stock_Data_Filter.length;i++){
//               if(this.Stock_Data_Filter[i].Item_Code == this.Barcode_.Item_Code){
//                   this.Stock_ = this.Stock_Data_Filter[i]
//                   this.UnitName = this.Stock_.UnitName
//                   //this.SaleRate = Number(this.Stock_.SaleRate);
                  
//               }
//           }
//       }
//   })

    this.Stock_Temp.ItemId=this.Barcode_.ItemId;
    this.Stock_Temp.ItemName=this.Barcode_.ItemName;
    this.Stock_=Object.assign({},this.Stock_Temp);
    this.Purchase_Return_Details_.ItemId=this.Barcode_.ItemId;
    this.Purchase_Return_Details_.ItemName=this.Barcode_.ItemName;
    this.Purchase_Return_Details_.UnitId=this.Barcode_.UnitId;
    this.Purchase_Return_Details_.UnitName=this.Barcode_.UnitName;
    this.Purchase_Return_Details_.StockId=this.Barcode_.Quantity;
    this.Purchase_Return_Details_.ItemName=this.Barcode_.ItemName;
    this.Purchase_Return_Details_.GroupId=this.Barcode_.GroupId;
    this.Purchase_Return_Details_.GroupName=this.Barcode_.GroupName;
    this.Purchase_Return_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
    this.Purchase_Return_Details_.HSNCODE=this.Barcode_.HSNCODE;
    // this.Purchase_Return_Details_.StockId=this.Barcode_.Stock_Id;
    this.Purchase_Return_Details_.SaleTax=this.Barcode_.SaleTax;
    this.Purchase_Return_Details_.ItemCode=this.Barcode_.Item_Code; 
    this.Purchase_Return_Details_.Country_Id=this.Barcode_.Country_Id; 
    this.Purchase_Return_Details_.Country_Name=this.Barcode_.Country_Name; 
}

Get_Stock_Item(){
    debugger;
    // this.Item_Temp_.ItemId=this.Stock_.ItemId;
    // this.Item_Temp_.ItemName=this.Stock_.ItemName;
    // this.Stock_=Object.assign({},this.Item_Temp_);
    debugger;
    console.log('this.Item_: ', this.Item_);

    if(this.Item_ != null || this.Item_ != undefined)
    {
        if(this.Item_.ItemId != null || this.Item_.ItemId != undefined)
            {
                this.Item_Temp.Item_Code=this.Item_.Item_Code;
                 this.Item_Temp.ItemId=this.Item_.ItemId;
                 this.Barcode_=Object.assign({},this.Item_Temp);
                 
                this.Purchase_Return_Details_.ItemId=this.Item_.ItemId;
                this.Purchase_Return_Details_.ItemName=this.Item_.ItemName;
                this.Purchase_Return_Details_.UnitId=this.Item_.UnitId;
                this.Purchase_Return_Details_.UnitName=this.Item_.UnitName;
                // this.Purchase_Return_Details_.Stock=this.Item_.Quantity;
                this.Purchase_Return_Details_.ItemName=this.Item_.ItemName;
                this.Purchase_Return_Details_.GroupId=this.Item_.GroupId;
                this.Purchase_Return_Details_.GroupName=this.Item_.GroupName;
                this.Purchase_Return_Details_.HSNMasterId=this.Item_.HSNMasterId;
                this.Purchase_Return_Details_.HSNCODE=this.Item_.HSNCODE;
                this.Purchase_Return_Details_.HSNMasterId=this.Item_.HSNMasterId;
                this.Purchase_Return_Details_.Item_Code=this.Item_.Item_Code; 
                this.Purchase_Return_Details_.ItemCode=this.Item_.Item_Code; 

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

Save_Purchase_Return(Printstatus:number)
{
  if(this.Purchase_Return_DetailsData == undefined || this.Purchase_Return_DetailsData == null || this.Purchase_Return_DetailsData.length == 0 || this.Purchase_Return_DetailsData.length == undefined )
  {
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Add atleast one Item',Type:"3"}});
      return
  }
  if(this.Customer_ == undefined || this.Customer_ == null || this.Customer_.Client_Accounts_Id == undefined || this.Customer_.Client_Accounts_Id == 0 ){
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Choose Customer',Type:"3"}});
      return
  }  
  if(this.InvoiceNo_ == undefined || this.InvoiceNo_ == null || this.InvoiceNo_.Purchase_Master_Id == undefined || this.InvoiceNo_.Purchase_Master_Id == 0 ){
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Choose Invoice',Type:"3"}});
    return
}   
  this.purchase_return_master_.Account_Party_Id = this.Customer_.Client_Accounts_Id;
  this.purchase_return_master_.Purchase_Master_Id = this.InvoiceNo_.Purchase_Master_Id;
  this.purchase_return_master_.InvoiceNo = this.InvoiceNo_.InvoiceNo;
  this.purchase_return_master_.User_Id = Number(this.Login_User_Id);
  this.purchase_return_master_.UserName = this.username;
  this.purchase_return_master_.TypeId = this.Accounttype.AccountType_Id;
  this.purchase_return_master_.Currency_Id = this.Currency.CurrencyDetails_Id;
  this.purchase_return_master_.CurrecnyName = this.Currency.CurrecnyName;
  this.purchase_return_master_.PaymentTermValue = this.Payment_Term_Description_.payment_Term_ID;
  this.purchase_return_master_.Payment_Term_Description = this.Payment_Term_Description_.payment_Term_ID;
  this.purchase_return_master_.PaymentTerms = this.Payment_Term_Description_.Payment_Term_Description;
  this.purchase_return_master_.PurchaseDate = this.New_Date(new Date(moment(this.purchase_return_master_.PurchaseDate).format('YYYY-MM-DD')));
  this.purchase_return_master_.Entry_Date = this.New_Date(new Date(moment(this.purchase_return_master_.Entry_Date).format('YYYY-MM-DD')));  
  this.purchase_return_master_.Purchase_Return_Details = this.Purchase_Return_DetailsData;

  this.issLoading=true;   
  debugger
  this.purchase_return_master_Service_.Save_purchase_return_master(this.purchase_return_master_).subscribe(Save_status => {   
      
      if(Number(Save_status[0][0].Purchase_Return_Master_Id_)>0)
      {
        debugger
          this.purchase_return_master_.Purchase_Return_Master_Id = Save_status[0][0].Purchase_Return_Master_Id_;
          this.purchase_return_master_.Purchase_Return_No = Save_status[0][0].Purchase_Return_No_;
          this.Purchase_Return_Master_Id_Edit = this.purchase_return_master_.Purchase_Return_Master_Id
          this.Edit_Sales = 1;
          this.Sales_Print = false;

          if (Printstatus==1)
          {
              this.Print_Click();
          }
          else
          {
              this.issLoading = false;
              const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Saved',Type:"false"}});         
            //   this.Clr_Sales_Master() 
            //   this.Close_Click();                       
          }
      }
      else{
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
      setTimeout(() => {
        if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
      document.getElementById("Save_Button").hidden=false;   
      }
      this.issLoading=false;
      },
      Rows => { 
          this.issLoading=false;
          document.getElementById('Save_Button').hidden=false;
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
      setTimeout(() => {
        if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
  });
}

Search_Purtchase_Return()
{
    debugger;
  var look_In_Date_Value=0,CustomerId_=0,Item_Group_Id_=0,CurrencyDetails_Id_=0,AccountType_Id_ = 0,User_Details_Id_=0;
  var invoiceno=''
  this.Sales_Master_Total_Amount=0; 

  if (this.Date_Check == true )
      look_In_Date_Value = 1;

  if(this.Search_Customer.Client_Accounts_Id==null || this.Search_Customer.Client_Accounts_Id==undefined)
   CustomerId_=0;
  else
   CustomerId_=this.Search_Customer.Client_Accounts_Id;

   debugger;
   
   if(this.InvoiceNo == null || this.InvoiceNo == undefined) invoiceno= '';
   else invoiceno="";

  if(this.Item_Group_Search.Item_Group_Id==null || this.Item_Group_Search.Item_Group_Id==undefined)
      Item_Group_Id_=0;
  else
      Item_Group_Id_=this.Item_Group_Search.Item_Group_Id;
  if(this.Currency_Search.CurrencyDetails_Id==null || this.Currency_Search.CurrencyDetails_Id==undefined)
      CurrencyDetails_Id_=0;
  else
      CurrencyDetails_Id_=this.Currency_Search.CurrencyDetails_Id;
  
  if(this.accounttype_search.AccountType_Id==null || this.accounttype_search.AccountType_Id==undefined)
      AccountType_Id_=0;
  else
      AccountType_Id_=this.accounttype_search.AccountType_Id;
  // if(this.Employee_Search.User_Details_Id==null || this.Employee_Search.User_Details_Id==undefined)
  //       User_Details_Id_=0;
  // else
  //       User_Details_Id_=this.Employee_Search.User_Details_Id;
  this.issLoading=true;    
//   this.InvoiceNo = this.InvoiceNo == "" ? undefined : this.InvoiceNo
  this.partNo = this.partNo == "" ? undefined : this.partNo
  debugger

  this.purchase_return_master_Service_.Search_purchase_return_master(
                        look_In_Date_Value,moment(this.Search_FromDate).format('YYYY-MM-DD'), 
                        moment(this.Search_ToDate).format('YYYY-MM-DD'),
                        invoiceno,
                        CustomerId_,
                        AccountType_Id_,
                        CurrencyDetails_Id_,
                        this.partNo,
                        Item_Group_Id_,
                        this.User_Type_Id,
                        this.Login_User_Id
                    ).subscribe(Rows => {
      debugger
  this.purchase_return_master_Data=Rows[0];
  if(this.purchase_return_master_Data.length>0)
  {
      for(var i=0;i<this.purchase_return_master_Data.length;i++)
      {
          this.Sales_Master_Total_Amount=Number(this.Sales_Master_Total_Amount)+Number(this.purchase_return_master_Data[i].NetTotal);
          this.Sales_Master_Total_Amount= Number(this.Sales_Master_Total_Amount.toFixed(3));
      }
  }
  this.Total_Entries=this.purchase_return_master_Data.length;
  if(this.purchase_return_master_Data.length==0)
  {
  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
  }
  this.issLoading=false;
  },
  Rows => {
      this.issLoading=false;
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  });
}

Delete_Quotation_Detail(itemIndex){
    this.Purchase_Return_DetailsData.splice(itemIndex, 1);
    this.addBlankRows();
    this.Final_Amounts();
  }

Edit_Quotation_Detail(Sales_Details_e, index){

debugger
  this.Purchase_Return_DetailsIndex=index;
  this.Purchase_Return_Details_=Object.assign({},Sales_Details_e);
  
  this.Item_Temp.ItemId=Sales_Details_e.ItemId;
  this.Item_Temp.Item_Code=Sales_Details_e.Item_Code;
  this.Barcode_=Object.assign({},this.Item_Temp);
  
  this.Item_Temp.ItemId=Sales_Details_e.ItemId;
  this.Item_Temp.ItemName=Sales_Details_e.ItemName;
  this.Item_=Object.assign({},this.Item_Temp);
  
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
  /** Added on 28-10-2024 */
Load_Vat_Percentage() 
  {   
  this.Sales_Master_Service_.Load_Vat_Percentage().subscribe(Rows => {    
  if (Rows != null) {
      debugger;
  this.Default_Vat_Percentage = Rows[0][0].vat_percentage;
}
this.issLoading = false;
},
Rows => {
this.issLoading = false;
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
});
}
  /*** Added on 9-11-24 */
Calculate_Discount_Percent()
  {
    let addDiscCheck = 1;
    let discountper = '0';

    debugger;
    if(Number(this.purchase_return_master_.Additional_Discount)>0){
        this.purchase_return_master_.Discount_Description = (this.purchase_return_master_.Additional_Discount * 100/this.purchase_return_master_.TotalAmount).toString();
        discountper = Number(this.purchase_return_master_.Discount_Description).toFixed(3);
        this.purchase_return_master_.Discount_Description = discountper; 
    }else{
        this.purchase_return_master_.Discount_Description = '0.000'
    }

    debugger;
    this.addDiscCheck = addDiscCheck;
    this.Final_Amounts();
}

Final_Amounts(){    
  this.Tot_Amount = 0;this.Total = 0;this.purchase_return_master_.TotalAmount = 0
  for(var i = 0; i< this.Purchase_Return_DetailsData.length ; i++)
  {
      this.Tot_Amount = Number(this.Tot_Amount) + Number(this.Purchase_Return_DetailsData[i].UnitPrice) * Number(this.Purchase_Return_DetailsData[i].Quantity);    
  }
  if(this.addDiscCheck == 0)
    {
      if(Number(this.purchase_return_master_.Discount_Description) > 0)
      {
          this.purchase_return_master_.Additional_Discount = Number((this.Tot_Amount *(Number(this.purchase_return_master_.Discount_Description)/100)).toFixed(3));
          this.purchase_return_master_.Additional_Discount = Number(this.purchase_return_master_.Additional_Discount.toFixed(3));    
          this.addDiscCheck = 0;
      }  
      else
      {
          this.purchase_return_master_.Additional_Discount = 0.000
          this.addDiscCheck = 0;
      }
      this.addDiscCheck = 0;  
    }
    this.addDiscCheck = 0;

  this.purchase_return_master_.TotalDiscount = this.purchase_return_master_.Additional_Discount;

  this.purchase_return_master_.TotalAmount = Number((Number(this.Tot_Amount) + 
  Number(this.purchase_return_master_.charge1_Amount) + 
  Number(this.purchase_return_master_.charge2_Amount) - 
  Number(this.purchase_return_master_.TotalDiscount)).toFixed(3));

  this.purchase_return_master_.VAT_Amount = Number((Number(this.purchase_return_master_.TotalAmount) * 
  Number(this.purchase_return_master_.VAT_Percentage)/100).toFixed(3));
  
  // this.purchase_return_master_.NetTotal = Number(Number(this.purchase_return_master_.TotalAmount) + 
  // Number(this.purchase_return_master_.VAT_Amount) + Number(this.purchase_return_master_.Roundoff) .toFixed(3));

  this.purchase_return_master_.NetTotal = Number((Number(this.purchase_return_master_.TotalAmount) + 
  Number(this.purchase_return_master_.VAT_Amount) +
  Number(this.purchase_return_master_.Roundoff)).toFixed(3));

  this.purchase_return_master_.Amount_In_Words = this.numberToWordsIndianCurrency(this.purchase_return_master_.NetTotal);
}

newQuotation(){
    this.Purchase_Return_Master_Id_Edit = 0
    this.purchase_return_master_= new purchase_return_master();
    this.Clr_Sales_Master();
    this.Clr_Sales_Details();
    setTimeout(() => {
        if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
  }

 //   Export() {
//     this.Sales_Master_Service_.exportExcel(this.performainvoice_Data,"Purchase Return" );
//   }

Export() {
    const filteredData = this.performainvoice_Data.map((receipt: any, index: number) => {
        return {
            No: index + 1,                  
            CustomerName: receipt["Customer"],
            InvoiceNo : receipt["InvoiceNo"],
            Date: receipt["FormattedPurchaseDate"],
            Amount: receipt["NetTotal"],

        };
    });

    this.Sales_Master_Service_.exportExcel(filteredData,"Purchase Return" );
  }

Clr_Purchase_Return_Details()
  {
    this.Purchase_Return_DetailsData = [];
  }

//   addBlankRows(): void {

//     let cellThr: number = 0;
//     let cellThr1: number = 0;
//     let nosOfBlankRows: number = 0;




//     let tempht1: number = 0;
//     let tempht2: number = 0;

//     debugger



//     this.cdr.detectChanges();

//     this.Purchase_Return_DetailsData.forEach((_, index) => {
//       const cellId = `cell${index + 1}`;
//       const cell = document.getElementById(cellId);

//       if (cell) {
//         debugger

//                     if(this. Purchase_Return_DetailsData[index].ItemName.length )
//           var alenght=  this. Purchase_Return_DetailsData[index].ItemName.length % 39;

//         console.log('this. Purchase_Return_DetailsData[index].ItemName.length: ', this. Purchase_Return_DetailsData[index].ItemName.length);
//         console.log('alenght: ', alenght);

//         if(tempht1==41 && alenght>1)
//             tempht1=tempht1 + 10 *alenght%100;

//         console.log('tempht1: ', tempht1);

//         let blank = 0;

//          tempht1 = cell ? cell.offsetHeight : 0 ;
//          cellThr += tempht1;


//          console.log('cellThr: ', cellThr);


//          if(cellThr1 > 0) cellThr1 = 0;

//          cellThr1 = cellThr;

//          console.log('cellThr1: ', cellThr1);

//          if (cellThr1 < 310) {                             //350
//             nosOfBlankRows = (290 - cellThr1) / 14;
//             // nosOfBlankRows-=1;
//         }
//         else {
//             cellThr1 = cellThr1 - 320;
//             console.log('cellThr1 - a: ', cellThr1);
//             cellThr1 = cellThr1 % 1250;                    //1471 excel master,2371 -perfect hills
//             console.log('cellThr1 = cellThr1 % b: ', cellThr1);
//             cellThr1 = 1310- cellThr1           
//             console.log('cellThr1 = c - cellThr1: ', cellThr1);
//             nosOfBlankRows = (cellThr1) / 11;
//             console.log('nosOfBlankRows = (cellThr1) / 9;: ', nosOfBlankRows);
//             console.log('nosOfBlankRows = blank + nosOfBlankRows;: ', nosOfBlankRows);
//         }  
        
//         console.log('nosOfBlankRows: ', nosOfBlankRows);


//         this.blankItems = [];
//         var start = 1
//         for (let i = start; i < nosOfBlankRows; i++) {
//           this.blankItems.push(i);
//         }


//       } else {
//         console.error(`Cell with ID '${cellId}' not found.`);
//       }
//     });


//   }

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
    this.Purchase_Return_DetailsData.forEach((_, index) => {
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



        // if(this. Quotation_Details_Data[index].ItemName.length )
        // var alenght=  this. Quotation_Details_Data[index].ItemName.length % (100-this.Quotation_Details_Data[index].ItemName.length);

        // console.log('this. Quotation_Details_Data[index].ItemName.length: ', this. Quotation_Details_Data[index].ItemName.length);
        // console.log('alenght: ', alenght);

        // if(tempht1==41 && alenght>1)
        //     tempht1=tempht1 + 10 *alenght%100;

        

        // console.log('tempht1 second: ', tempht1);

        let blank = 0;

         cellThr += tempht1;


         console.log('cellThr: ', cellThr);


         if(cellThr1 > 0) cellThr1 = 0;
         
         cellThr1 = cellThr;

         console.log('cellThr1: ', cellThr1);

        //  if (cellThr1 < 325 && this.Purchase_Return_DetailsData.length < 14 ) {   
        //     this.breakPage = false;                          //350
        //     nosOfBlankRows = (325 - cellThr1) / 12;
        //     if(nosOfBlankRows < 2) nosOfBlankRows +=2;
        //     // if(nosOfBlankRows > 25) nosOfBlankRows = 24;
        // }
        if (cellThr1 < 525 && this.Purchase_Return_DetailsData.length < 14 ) {   
            this.breakPage = false;                          //350
            nosOfBlankRows = (525 - cellThr1) / 12;
            if(nosOfBlankRows < 2) nosOfBlankRows +=2;
            // if(nosOfBlankRows > 25) nosOfBlankRows = 24;
        }
        else {
           // blank = blank + 2
           this.breakPage = true;
           if(cellThr1 < 325){cellThr1 = cellThr1 + (315-cellThr1)}
           cellThr1 = cellThr1 - 300;
           console.log('cellThr1 - a: ', cellThr1);
           cellThr1 = cellThr1 % 2250;                    
           console.log('cellThr1 = cellThr1 % b: ', cellThr1);
           cellThr1 = 1790- cellThr1           
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
