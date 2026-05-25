import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, Renderer2, NgZone, Input, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Client_Accounts } from '../../../models/Client_Accounts';
import { User_Details_Service } from '../../../services/User_Details.Service';
// import { Sales_Master_Service } from '../../../services/Sales_Master.service';
import { currencydetails_Service } from '../../../services/currencydetails.Service';
import { purchaseordermaster_Service } from '../../../services/purchaseordermaster.Service';
import { Employee_Details_Service } from '../../../services/Employee_Details.Service';
import { Stock_Service } from '../../../services/Stock.Service';
import { Item_Group_Service } from '../../../services/Item_Group.Service';
import { payment_term_Service } from '../../../services/payment_term.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Quotation_Master } from '../../../models/Quotation_Master';
import { Company } from '../../../models/Company';
import { Quotation_Details } from '../../../models/Quotation_Details';
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
import { performainvoicemaster } from '../../../models/performainvoicemaster';
import { performainvoicedetails } from '../../../models/performainvoicedetails';
import { accounttype } from '../../../models/accounttype';
import { Purchase_Orderdetails } from '../../../models/Purchase_Orderdetails';
import { Purchase_Ordermaster } from '../../../models/Purchase_Ordermaster';
import { purchaseordermaster } from '../../../models/purchaseordermaster';
import { Sales_Master_Service } from '../../../services/Sales_Master.Service';
import { Client_Accounts_Service } from '../../../services/Client_Accounts.Service';
import { salesquotationmaster_Service } from '../../../services/salesquotationmaster.Service';
import { Item } from '../../../models/Item';
import { purchaseorderdetails } from '../../../models/purchaseorderdetails';
// import { ConsoleReporter } from 'jasmine';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: {    dateInput: 'DD/MM/YYYY',    },
    display: {
    dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
    },
    };
@Component({
selector: 'app-Purchase_order',
templateUrl: './Purchase_order.component.html',
styleUrls: ['./Purchase_order.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Purchase_orderComponent implements OnInit, AfterViewInit  {
    ngAfterViewInit() {}
    @ViewChild('bottomDiv5', { static: false }) bottomDiv5: ElementRef;
    @ViewChild('bottomDiv2', { static: false }) bottomDiv2: ElementRef;


    @ViewChild('bottomDiv6', { static: false }) bottomDiv6: ElementRef;

    @ViewChild('Barcode_n', { read: Input, static: true }) inputEl: ElementRef;
    @ViewChild('topDiv', { static: false }) topDiv: ElementRef;
    @ViewChild('topDiv1', { static: false }) topDiv1: ElementRef;
  @HostListener('document:keydown', ['$event']) 
  handleKeyboardEvent(event: KeyboardEvent) { ;
      if(event.key=='F2')
    this.Save_Quotation(1);
  }
  Quotation_Master_Data:Quotation_Master[]
Quotation_Master_:Quotation_Master= new Quotation_Master();

performainvoicemaster_ :performainvoicemaster = new performainvoicemaster();
performainvoicedetails_Data:performainvoicedetails[]
performainvoicedetails_ :performainvoicedetails =new performainvoicedetails();
performainvoice_Data:performainvoicemaster[]


Quotation_Details_Data:Quotation_Details[]
Quotation_Details_Data1:Quotation_Details[]
Quotation_Details_:Quotation_Details= new Quotation_Details();



Purchase_Ordermaster_ :Purchase_Ordermaster = new Purchase_Ordermaster();
Purchase_Ordermaster_Data :Purchase_Ordermaster [];
Purchase_Orderdetails_Data:Purchase_Orderdetails[]
Purchase_Orderdetails_ :Purchase_Orderdetails =new Purchase_Orderdetails();
Purchase_Orderdetails_Temp_ : Purchase_Orderdetails = new Purchase_Orderdetails();
Item_ :Purchase_Orderdetails = new Purchase_Orderdetails();
Item_Temp_:Purchase_Orderdetails = new Purchase_Orderdetails();
Barcode_:Purchase_Orderdetails= new Purchase_Orderdetails();
Item_Temp:Purchase_Orderdetails= new Purchase_Orderdetails();
Barcode_Temp_:Purchase_Orderdetails= new Purchase_Orderdetails();

Bill_Type_Data:Bill_Type[]
Bill_Type_:Bill_Type= new Bill_Type();
Bill_Type_Temp:Bill_Type= new Bill_Type();
Bill_Type_Search:Bill_Type= new Bill_Type();
Item_Group_Search:Item_Group = new Item_Group();
Currency_Search:currencydetails = new currencydetails();
Employee_Search:User_Details = new User_Details();
Bill_Mode_Data:Bill_Mode[]
Bill_Mode_:Bill_Mode= new Bill_Mode();
Bill_Mode_Temp:Bill_Mode= new Bill_Mode();
Customer_Data:Client_Accounts[];
PurchaseOrder_Data = [];
EmployeeData = [];
yeardispay:any;

itemGroupData: Item_Group[];
Item_Group_Temp: Item_Group = new Item_Group();

ItemCodeData = [];
Customer_:Client_Accounts= new Client_Accounts();
Search_Customer:Client_Accounts= new Client_Accounts();
Customer_Temp:Client_Accounts= new Client_Accounts();
Barcode_Data:Stock[]
Stock_Data:Stock[]
Stock_Data_Filter: Stock[];
Stock_:Stock= new Stock();

// Item_:Item= new Item();

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
Quotation_Details_Index:number=-1;
performainvoicedetails_Index:number=-1;
Purchase_Orderdetails_Index : number =-1;
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
Quotation_Details_Description:string;
Amount_In_Words:string;
Sales_Quantity:number=0;
Customer_Email: string = '';
Customer_WhatsApp: string = '';
Edit_Stock_:number=0;
Edit_CGST:number=0;
Edit_SGST:number=0;
Edit_GST:number=0;
Edit_Discount:number=0;
Edit_Cess:number=0;
Edit_Totamt:number=0;
Edit_Net:number=0;
Date_Print:any;printLetterhead = false;
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
invoicePendingData=[];
invoicePendingView = false;

performaPendingData=[];
performaPendingView=false;

GRNListView = false;GRN_Data=[];

Sale_Permission_Edit:boolean= false;
Sale_Permission_Edit_Temp:boolean= false;
Company_: Company = new Company();
Company_Temp: Company = new Company();
Company_Data: Company [];
Bank_Data:Client_Accounts[]
Bank_:Client_Accounts= new Client_Accounts();
Sales_Master_Data1:[];UnitName="";Quantity=0;SaleRate=0;discount=0;unitDiscount=0;TotalAmount=0;availablity='';Discount_Description=0;subTotal=0;POnumber;QuotNo;
partNo;
orderNo;
InvoiceNo;
Sales_Master_1:purchaseordermaster = new purchaseordermaster();
// Sales_Master_1:Quotation_Master= new Quotation_Master();
Address1 ='';Address2 ='';Address3 ='';Address4 ='';Attention;Employee;
Customer_Name = ''
// Accounttype;
totalAmount=0;Total=0;totalDiscount=0;amount1=0;amount2=0;amount3=0;

// itemGroupData=[];
quotationId=0;

Purchase_OrderMaster_Id_Edit :number;

/*** Added on 17-10-2024 */

PaymentTermData: payment_term[];
Payment_Term_Description_:payment_term = new payment_term();
PaymentTerm_Temp: payment_term = new payment_term();

PurchaseOrderMaster_Id: number;

currencyData: currencydetails[];
Currency_Temp: currencydetails = new currencydetails();
Currency: currencydetails = new currencydetails();

AccounttypeData: accounttype[];
Accounttype_Temp : accounttype = new accounttype();
Accounttype: accounttype = new accounttype();
accounttype_search:accounttype = new accounttype();

/** Added on 28-10-2024 */
Default_Vat_Percentage: number;

/** Added on 8-11-24 */

Vatin = '';
addDiscCheck = 0;

/*** Added on 12-11-24 */

printChargeAmount1: boolean = false;
printChargeAmount2: boolean = false;
printCharge1per: boolean = false;
printVAT_Amount: boolean = false;
printDiscount_Description:boolean = false;
printAdditional_Discount: boolean = false;
printRoundoff_Amt: boolean = false;
printVAT_Percentage: boolean = false;
printTotalDiscount:boolean=false;
SalesQuotationMaster_Id: number = 0;
blankItems: number[] = [];
breakPage: boolean = false;
Customer_Reference_Check = false;

constructor(public Sales_Master_Service_:Sales_Master_Service,public currencydetails_Service_:currencydetails_Service, public User_Details_Service_:User_Details_Service,private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog
,private el: ElementRef, private zone: NgZone, private renderer: Renderer2 , public purchaseordermaster_Service_:purchaseordermaster_Service, public Employee_Details_Service_:Employee_Details_Service, public Stock_Service_:Stock_Service,
public Item_Group_Service_:Item_Group_Service, public payment_term_Service_:payment_term_Service, 
public salesquotationmaster_Service_:salesquotationmaster_Service, public Client_Accounts_Service_:Client_Accounts_Service,
private cdr: ChangeDetectorRef) {
    this.Load_Bill_Type();     
    this.Load_Item_Group();
    this.Load_Currency();
    this.Load_Payment_Term();
    this.Load_InvoiceType();

   // this.Load_Employees();
    this.Load_Company() ;
    this.Load_Vat_Percentage(); 
 }
ngOnInit() 
{
    this.User_Type_Id=Number(localStorage.getItem('User_Type_Id'));
    this.User_Type=(localStorage.getItem('User_Type'));
    this.Login_User_Id=localStorage.getItem('Login_User');
    this.Employee_Name=localStorage.getItem('Employee_Name');
    this.Employee_Id=Number(localStorage.getItem('Employee_Id'));
    this.Permissions = Get_Page_Permission(99);
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

   

    this.quotationId = Number(localStorage.getItem('QuotationNo'));
    localStorage.removeItem('QuotationNo');

    this.PurchaseOrderMaster_Id = Number(localStorage.getItem('PurchaseOrderMaster_Id'));
    localStorage.removeItem('PurchaseOrderMaster_Id');

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
    // this.Quotation_Master_.EntryDate=new Date("dd-MMM-yyyy");

    


    this.Purchase_Ordermaster_.EntryDate=new Date("dd-MMM-yyyy");
    this.Purchase_Ordermaster_.DeliveryDate=new Date("dd-MMM-yyyy");

    this.Search_FromDate=this.New_Date(this.Search_FromDate);
    this.Search_ToDate=this.New_Date(this.Search_ToDate);
    this.Clr_Sales_Master();
    this.Clr_Sales_Details();
    this.Sales_Print=true;
    this.Entry_View=false;

    if(this.quotationId >0){
        this.loadQuotation()
    }

    if(this.PurchaseOrderMaster_Id > 0)
    {
        this.Load_PurchaseOrder();
    }
    
    //;
    // if(this.quotationId <= 0 && this.PurchaseOrderMaster_Id <= 0)
    // {
    //     this.Search_PerformaInvoice();
    // }    
    //this.myDate=new Date();
}
Load_Company() 
    {   
    this.Sales_Master_Service_.Load_Company().subscribe(Rows => {    
    if (Rows != null) {
    this.Print_Company_ = Rows[0][0];   
    this.Company_ = Rows[0];
    //this.Bank_Data=Rows[1];
    this.Bank_ = Rows[1];
    //this.Bank_Data=this.Bank_;
 }
 },
 Rows => {
 const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}


    // Load_Currency() {
    //     
    //     this.currencydetails_Service_.Search_currencydetails('').subscribe(Rows => {
    //         
    //         if (Rows != null) {
    //             this.currencyData = Rows[0];
    //             this.Currency_Temp.CurrencyDetails_Id = 0;
    //             this.Currency_Temp

    //         }
    //         this.issLoading = false;
    //     },
    //         Rows => {
    //             this.issLoading = false;
    //             const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
    //         });
    // }

    Load_Currency() {
        this.currencydetails_Service_.Load_currencydetails().subscribe(Rows => {
            this.currencyData = Rows[0];        
            this.Currency_Temp.CurrencyDetails_Id = 0;
            this.Currency_Temp.CurrecnyName = "Select";
            this.currencyData.unshift(this.Currency_Temp);
            this.Currency = this.currencyData[0];
            this.Currency_Search = this.currencyData[0];
        },
            Rows => {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
            });
    }
    Load_Item_Group() {
        this.Item_Group_Service_.Load_Item_Group().subscribe(Rows => {
            this.itemGroupData = Rows[0];        
            this.Item_Group_Temp.Item_Group_Id = 0;
            this.Item_Group_Temp.Item_Group_Name = "Select";
            this.itemGroupData.unshift(this.Item_Group_Temp);
            this.Item_Group_Search = this.itemGroupData[0];
        },
            Rows => {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
            });
    }
    // Load_Employees() {
    //     this.User_Details_Service_.Search_User_Details('',this.User_Type,this.Login_User_Id).subscribe(Rows => {
    //         if (Rows != null) {
    //             this.EmployeeData = Rows[0];
    //         }
    //         this.issLoading = false;
    //     },
    //         Rows => {
    //             this.issLoading = false;
    //             const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
    //         });
    // }

    // Load_InvoiceType() {
    //     this.User_Details_Service_.Load_InvoiceType('').subscribe(Rows => {
    //         if (Rows != null) {
    //             this.AccounttypeData = Rows[0];
              

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
            this.AccounttypeData = Rows[0];        
            this.Accounttype_Temp.AccountType_Id = 0;
            this.Accounttype_Temp.AccountType_Name = "Select";
            this.AccounttypeData.unshift(this.Accounttype_Temp);
            this.Accounttype = this.AccounttypeData[0];
            this.accounttype_search = this.AccounttypeData[0];
     
        },
            Rows => {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
            });
    }

    Load_Payment_Term() {
        this.payment_term_Service_.Load_Payment_Term().subscribe(Rows => {
           
            if (Rows != null) {
                this.PaymentTermData = Rows[0];
                this.PaymentTerm_Temp.Payment_Term_Description = "Select";
                this.PaymentTerm_Temp.payment_Term_ID = 0;
                this.PaymentTermData.unshift(this.PaymentTerm_Temp);
                this.Payment_Term_Description_ = this.PaymentTermData[0];
            };
        },
            Rows => {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
            });
    }

    loadQuotation(){
       
        this.Entry_View = true;
        this.issLoading = true;
        // this.Load_Bill_Type();     
        // this.Load_Item_Group();
        // this.Load_Currency();
        // this.Load_Payment_Term();
        // this.Load_InvoiceType();
    
        this.salesquotationmaster_Service_.Get_salesquotationmaster(this.quotationId).subscribe(result=>{

           // this.Purchase_Ordermaster_=new Purchase_Ordermaster()
            this.Purchase_Ordermaster_Data=result[0];
           this.Purchase_Ordermaster_=Object.assign({},result[0][0]); 
          // console.log( this.Purchase_Ordermaster_);
            // this.Purchase_Ordermaster_.OrderNumber = result[0][0].POnumber;
            this.Purchase_Ordermaster_.OrderNumber = 0;
            this.Purchase_Ordermaster_.POnumber = 0;
            this.Purchase_Ordermaster_.Purchase_OrderMaster_Id=0;
            debugger;
            this.Purchase_Ordermaster_.Account_Party_Id=result[0][0].Account_Party_Id;
            this.Purchase_Ordermaster_.Customer_Name=result[0][0].Customer_Name;
            debugger;
             this.Purchase_Ordermaster_.Payment_Term_Description=result[0][0].Payment_Term_Description;
             this.Purchase_Ordermaster_.CurrencyId=result[0][0].CurrencyId;
             this.Purchase_Ordermaster_.TypeId=result[0][0].TypeId;
            // this.Purchase_Ordermaster_.SalesQuotationMaster_Id=this.quotationId;
            // this.Purchase_Ordermaster_.AttendEmployee=result[0][0].AttendEmployee;
            // this.Purchase_Ordermaster_.KindAttend=result[0][0].KindAttend;
            // this.Purchase_Ordermaster_.Brand=result[0][0].Brand;
            // this.Purchase_Ordermaster_.PriceBasis=result[0][0].BPriceBasis;
            // this.Purchase_Ordermaster_.Delivery=result[0][0].Delivery;
            // this.Purchase_Ordermaster_.Validity=result[0][0].Validity;
            this.Purchase_Ordermaster_.Description1=result[0][0].Description1;
            // this.Purchase_Ordermaster_.Discount_Description=result[0][0].Discount_Description;
            // this.Purchase_Ordermaster_.Charge1=result[0][0].Charge1;
            // this.Purchase_Ordermaster_.Charge1per=result[0][0].Charge1per;
            // this.Purchase_Ordermaster_.Charge2=result[0][0].Charge2;
            // this.Purchase_Ordermaster_.PreparedBy=result[0][0].PreparedBy;
            this.Purchase_Ordermaster_.SalesQuotationMaster_Id=result[0][0].SalesQuotationMaster_Id;

            this.Purchase_Ordermaster_.VAT_Percentage = result[0][0].VAT_Percentage;
            // if(this.Purchase_Ordermaster_.VAT_Percentage == undefined || this.Purchase_Ordermaster_.VAT_Percentage == null)
            // this.Purchase_Ordermaster_.VAT_Percentage = this.Default_Vat_Percentage;
           
            debugger;
            
             this.Customer_Temp.Client_Accounts_Id=result[0][0].Account_Party_Id;
             this.Customer_Temp.Client_Accounts_Name=result[0][0].Customer_Name;
             this.Customer_=this.Customer_Temp;
             debugger;
            this.Purchase_Ordermaster_.DeliveryDate=new Date();
            this.Purchase_Ordermaster_.DeliveryDate=this.New_Date(this.Purchase_Ordermaster_.DeliveryDate);
            this.Purchase_Ordermaster_.EntryDate=new Date().toString();
            this.Purchase_Ordermaster_.EntryDate=this.formatDate(this.Purchase_Ordermaster_.EntryDate); 

            this.Customer_Name = result[0][0].Client_Accounts_Name;
            debugger;

            // this.Client_Accounts_Service_.Get_Client_Accounts(result[0][0].Account_Party_Id).subscribe((rows)=>{
            //     if(rows!=null)
            //     {
            //         debugger;
            //         this.Customer_Temp.Client_Accounts_Id=rows[0][0].Client_Accounts_Id;
            //         this.Customer_Temp.Client_Accounts_Name=rows[0][0].Client_Accounts_Name;
            //         this.Customer_= this.Customer_Temp;
            //         console.log('2',this.Customer_Temp);
            //         console.log(this.Customer_);
            //                 this.Address1 = rows[0][0].Address1;
            //                 this.Address2 = rows[0][0].Address2;
            //                 this.Address3 = rows[0][0].Address3;
            //                 this.Address4 = rows[0][0].Address4;
            //                 this.Vatin = rows[0][0].GSTNo;
            //     }
            // })
            debugger;
            this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39',"").subscribe(Rows => {  
                if (Rows != null) {
                    debugger;
                    this.Customer_Data = Rows[0];
                    for(let i=0;i<Rows[0].length;i++){
                        if(Rows[0][i].Client_Accounts_Id == result[0][0].Account_Party_Id){
                            this.Customer_Temp.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                            this.Customer_Temp.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                             this.Customer_= this.Customer_Temp;
                            this.Customer_ = Rows[0][i];
                            this.Customer_.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                            this.Customer_.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                            this.Customer_Name = Rows[0][i].Client_Accounts_Name;
                          
                            this.Purchase_Ordermaster_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                            this.Purchase_Ordermaster_.Customer=Rows[0][i].Client_Accounts_Name;
                            this.Purchase_Ordermaster_.Customer_Name=Rows[0][i].Client_Accounts_Name;
                            
                            this.Purchase_Ordermaster_.Address1 = Rows[0][i].Address1;
                            this.Purchase_Ordermaster_.Address2 = Rows[0][i].Address2;
                            this.Purchase_Ordermaster_.Address3 = Rows[0][i].Address3;
                            this.Purchase_Ordermaster_.Address4 = Rows[0][i].Address4;
                            this.Purchase_Ordermaster_.Vatin = Rows[0][i].GSTNo;
        
                            this.Address1 = Rows[0][i].Address1;
                            this.Address2 = Rows[0][i].Address2;
                            this.Address3 = Rows[0][i].Address3;
                            this.Address4 = Rows[0][i].Address4;
                            this.Vatin = Rows[0][i].GSTNo;
                        }
                    }  
                    debugger;             
                }
            },);

            this.Sales_Master_Service_.Get_Quotation_Details(result[0][0].SalesQuotationMaster_Id).subscribe(Rows => {     
                if (Rows != null) {
                    this.Purchase_Orderdetails_Data = Rows[0];
                    this.Final_Amounts();
                    this.addBlankRows();                    
                    }              
                   },
                 Rows => {
                    
                   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                });
                if(this.PaymentTermData==undefined || this.PaymentTermData==null)
                {
                    this.payment_term_Service_.Load_Payment_Term().subscribe(Rows => {
                       
                        if (Rows != null) {
                            this.PaymentTermData = Rows[0];
                            this.PaymentTerm_Temp.Payment_Term_Description = "Select";
                            this.PaymentTerm_Temp.payment_Term_ID = 0;
                            this.PaymentTermData.unshift(this.PaymentTerm_Temp);
                            this.Payment_Term_Description_ = this.PaymentTermData[0];
           
                            for(let i=0;i<this.PaymentTermData.length;i++){
                                if(this.PaymentTermData[i].payment_Term_ID == this.Purchase_Ordermaster_.Payment_Term_Description){
                                    this.Payment_Term_Description_ = this.PaymentTermData[i]
                                }
                            }
                        };
                    })
                }
                else
                {
                for(let i=0;i<this.PaymentTermData.length;i++){
                    if(this.PaymentTermData[i].payment_Term_ID == this.Purchase_Ordermaster_.Payment_Term_Description){
                        this.Payment_Term_Description_ = this.PaymentTermData[i]
                    }
                }
            }
debugger;
            if(this.currencyData==undefined || this.currencyData==null )
            {
                debugger;
                this.currencydetails_Service_.Load_currencydetails().subscribe(Rows => {
                    if( Rows[0]!=null)
                    {
                        debugger;
                        this.currencyData = Rows[0];  
                        this.Currency_Temp.CurrencyDetails_Id = 0;
                        this.Currency_Temp.CurrecnyName = "Select";
                        this.currencyData.unshift(this.Currency_Temp);
                        this.Currency = this.currencyData[0];
                        for(let i=0; i<this.currencyData.length; i++){
                            if(this.currencyData[i].CurrencyDetails_Id == this.Purchase_Ordermaster_.CurrencyId){
                                this.Currency = this.currencyData[i];
                            }
                        }   
                    } 
                })
                debugger;
            }
            else
            {
                for(let i=0; i<this.currencyData.length; i++){
                    if(this.currencyData[i].CurrencyDetails_Id == this.Purchase_Ordermaster_.CurrencyId){
                        this.Currency = this.currencyData[i];
                    }
                }   
            } 
                if(this.AccounttypeData==undefined || this.AccounttypeData==null)
                    {
                        this.User_Details_Service_.Load_InvoiceType2().subscribe(Rows => {
                            this.AccounttypeData = Rows[0]; 
                            this.Accounttype_Temp.AccountType_Id = 0;
                            this.Accounttype_Temp.AccountType_Name = "Select";
                            this.AccounttypeData.unshift(this.Accounttype_Temp);
                            this.Accounttype = this.AccounttypeData[0];
                     
                            for(let i=0;i<this.AccounttypeData.length;i++){
                                if(this.AccounttypeData[i].AccountType_Id == this.Purchase_Ordermaster_.TypeId){
                                    this.Accounttype = this.AccounttypeData[i]
                                }
                            }    
                        })
                    }   
                    else
                    { 
                for(let i=0;i<this.AccounttypeData.length;i++){
                    if(this.AccounttypeData[i].AccountType_Id == this.Purchase_Ordermaster_.TypeId){
                        this.Accounttype = this.AccounttypeData[i]
                    }
                }  
            }      
        })
        this.issLoading = false;
    }


Create_New()
{
    //document.getElementById("Tab_Edit").hidden=true; 
    this.Entry_View = true;
    this.Sales_Print=true;
    this.Clr_Sales_Master();
    this.Clr_Sales_Details();
    this.Quotation_Details_Data=[];
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
    this.GRNListView = false;
    this.performaPendingView = false;
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
    //this.Load_Dropdowns();
    this.Purchase_Orderdetails_Data=[];
    //document.getElementById("Tab_Edit").hidden=true; 
   // this.Search_PerformaInvoice()
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
   
    //this.yeardispay= new this.date(this.Purchase_Ordermaster_.EntryDate.getFullYear());
   
    this.printCharge1per = false;
  this.printChargeAmount1 = false;
  this.printChargeAmount2 = false;
  this.printVAT_Amount = false;
  this.printDiscount_Description = false;
  this.printAdditional_Discount = false;
  this.printRoundoff_Amt = false;
  this.printVAT_Percentage = false;
  this.printTotalDiscount=false;


 

  if(this.Purchase_Ordermaster_.VAT_Percentage != 0)
    if(this.Purchase_Ordermaster_.VAT_Percentage != null )
       if(this.Purchase_Ordermaster_.VAT_Percentage != undefined )
       if(this.Purchase_Ordermaster_.VAT_Percentage.toString() != '0')
        if(this.Purchase_Ordermaster_.VAT_Percentage.toString() != 'null')
                if(this.Purchase_Ordermaster_.VAT_Percentage.toString() != 'undefined')
                    if(this.Purchase_Ordermaster_.VAT_Percentage.toString() != '0.00')
                        if(this.Purchase_Ordermaster_.VAT_Percentage.toString() != '0.000')
                    {
                        this.printVAT_Percentage = true;
                    }

  if(this.Purchase_Ordermaster_.Charge1per != '')
      if(this.Purchase_Ordermaster_.Charge1per != null )
         if(this.Purchase_Ordermaster_.Charge1per != undefined )
         if(this.Purchase_Ordermaster_.Charge1per.toString() != '0')
          if(this.Purchase_Ordermaster_.Charge1per.toString() != 'null')
                  if(this.Purchase_Ordermaster_.Charge1per.toString() != 'undefined')
                    if(this.Purchase_Ordermaster_.Charge1per.toString() != '0.00')
                        if(this.Purchase_Ordermaster_.Charge1per.toString() != '0.000')
                      {
                          this.printCharge1per = true;
                      }


                     
 if(this.Purchase_Ordermaster_.charge1_Amount != 0)
     if(this.Purchase_Ordermaster_.charge1_Amount != null)
         if(this.Purchase_Ordermaster_.charge1_Amount != undefined )
    if( this.Purchase_Ordermaster_.charge1_Amount.toString() != '0')
 if( this.Purchase_Ordermaster_.charge1_Amount.toString() != 'null')
     if( this.Purchase_Ordermaster_.charge1_Amount.toString() != 'undefined' )
        if( this.Purchase_Ordermaster_.charge1_Amount.toString() != '0.00')
     if( this.Purchase_Ordermaster_.charge1_Amount.toString() != '0.000')
  {
      this.printChargeAmount1 = true;
  }



;
 if(this.Purchase_Ordermaster_.charge2_Amount != 0)
     if(this.Purchase_Ordermaster_.charge2_Amount != null)
         if(this.Purchase_Ordermaster_.charge2_Amount != undefined )
    if( this.Purchase_Ordermaster_.charge2_Amount.toString() != '0')
 if( this.Purchase_Ordermaster_.charge2_Amount.toString() != 'null')
     if( this.Purchase_Ordermaster_.charge2_Amount.toString() != 'undefined' )
        if( this.Purchase_Ordermaster_.charge2_Amount.toString() != '0.00')
     if( this.Purchase_Ordermaster_.charge2_Amount.toString() != '0.000')
  {
      this.printChargeAmount2 = true;
  }


 
  if(this.Purchase_Ordermaster_.VAT_Amount != 0)
      if(this.Purchase_Ordermaster_.VAT_Amount != null )
         if(this.Purchase_Ordermaster_.VAT_Amount != undefined )
         if(this.Purchase_Ordermaster_.VAT_Amount.toString() != '0')
          if(this.Purchase_Ordermaster_.VAT_Amount.toString() != 'null')
                  if(this.Purchase_Ordermaster_.VAT_Amount.toString() != 'undefined')
                    if(this.Purchase_Ordermaster_.VAT_Amount.toString() != '0.00')
                        if(this.Purchase_Ordermaster_.VAT_Amount.toString() != '0.000')
                      {
                          this.printVAT_Amount = true;
                      }

                      if(this.Purchase_Ordermaster_.Discount_Description != '')
                          if(this.Purchase_Ordermaster_.Discount_Description != null )
                             if(this.Purchase_Ordermaster_.Discount_Description != undefined )
                             if(this.Purchase_Ordermaster_.Discount_Description.toString() != '0')
                              if(this.Purchase_Ordermaster_.Discount_Description.toString() != 'null')
                                      if(this.Purchase_Ordermaster_.Discount_Description.toString() != 'undefined')
                                        if(this.Purchase_Ordermaster_.Discount_Description.toString() != '0.00')
                                            if(this.Purchase_Ordermaster_.Discount_Description.toString() != '0.000')
                                          {
                                              this.printDiscount_Description = true;
                                          }

                                          if(this.Purchase_Ordermaster_.TotalDiscount != 0)
                                            if(this.Purchase_Ordermaster_.TotalDiscount != null )
                                               if(this.Purchase_Ordermaster_.TotalDiscount != undefined )
                                               if(this.Purchase_Ordermaster_.TotalDiscount.toString() != '0')
                                                if(this.Purchase_Ordermaster_.TotalDiscount.toString() != 'null')
                                                        if(this.Purchase_Ordermaster_.TotalDiscount.toString() != 'undefined')
                                                          if(this.Purchase_Ordermaster_.TotalDiscount.toString() != '0.00')
                                                            if(this.Purchase_Ordermaster_.TotalDiscount.toString() != '0.000')
                                                            {
                                                                this.printTotalDiscount = true;
                                                            }


                                          if(this.Purchase_Ordermaster_.Additional_Discount != 0)
                                              if(this.Purchase_Ordermaster_.Additional_Discount != null )
                                                 if(this.Purchase_Ordermaster_.Additional_Discount != undefined )
                                                 if(this.Purchase_Ordermaster_.Additional_Discount.toString() != '0')
                                                  if(this.Purchase_Ordermaster_.Additional_Discount.toString() != 'null')
                                                          if(this.Purchase_Ordermaster_.Additional_Discount.toString() != 'undefined')
                                                            if(this.Purchase_Ordermaster_.Additional_Discount.toString() != '0.00')
                                                                if(this.Purchase_Ordermaster_.Additional_Discount.toString() != '0.000')
                                                              {
                                                                  this.printAdditional_Discount = true;
                                                              }

                                                              if(this.Purchase_Ordermaster_.Roundoff_Amt != 0)
                                                                  if(this.Purchase_Ordermaster_.Roundoff_Amt != null )
                                                                     if(this.Purchase_Ordermaster_.Roundoff_Amt != undefined )
                                                                     if(this.Purchase_Ordermaster_.Roundoff_Amt.toString() != '0')
                                                                      if(this.Purchase_Ordermaster_.Roundoff_Amt.toString() != 'null')
                                                                              if(this.Purchase_Ordermaster_.Roundoff_Amt.toString() != 'undefined')
                                                                                if(this.Purchase_Ordermaster_.Roundoff_Amt.toString() != '0.00')
                                                                                    if(this.Purchase_Ordermaster_.Roundoff_Amt.toString() != '0.000')
                                                                                  {
                                                                                      this.printRoundoff_Amt = true;
                                                                                  }
    
   this.Load_Company() ;  
   
   setTimeout(()=>{
    let popupWinindow
    let innerContents = document.getElementById("Print_Div1").innerHTML;
    popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();   
})
    // this.Image_Url='/assets/img/'+this.Print_Company_.Company_Id+'.jpg';
    // this.Company_Sign='/assets/img/Sign_'+this.Print_Company_.Company_Id+'.jpg';
    // this.Company_Seal='/assets/img/Seal_'+this.Print_Company_.Company_Id+'.jpg';  
    // let popupWinindow
    // let innerContents = document.getElementById("Print_Div1").innerHTML;
    // popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    // popupWinindow.document.open();
    // popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
    // popupWinindow.document.close();      
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
    this.Quotation_Master_.SalesQuotationMaster_Id=0;
    this.Purchase_Ordermaster_.Account_Party_Id=0;
    //this.Quotation_Master_.Employee_Id=0;
    //this.Quotation_Master_.Employee_Name=this.Employee_Name;
    this.Quotation_Master_.User_Id=0;
    // this.Quotation_Master_.EntryDate=new Date();
    // this.Quotation_Master_.EntryDate=this.New_Date(this.Quotation_Master_.EntryDate);

    this.Purchase_Ordermaster_.EntryDate=new Date();
    this.Purchase_Ordermaster_.EntryDate=this.New_Date(this.Purchase_Ordermaster_.EntryDate);

    this.Purchase_Ordermaster_.DeliveryDate=new Date();
    this.Purchase_Ordermaster_.DeliveryDate=this.New_Date(this.Purchase_Ordermaster_.DeliveryDate);

    // this.Purchase_Ordermaster_.QuotationNo="";
    this.Purchase_Ordermaster_.Supplier_Ref_No = '';
    this.Purchase_Ordermaster_.Purchase_OrderMaster_Id = 0;
    this.Purchase_OrderMaster_Id_Edit = 0;
    this.Purchase_Ordermaster_.OrderNumber = 0;
    this.Purchase_Ordermaster_.CurrencyId=0;
    this.Purchase_Ordermaster_.Brand="";
    this.Purchase_Ordermaster_.PriceBasis="";
    this.Purchase_Ordermaster_.PaymentTerms = "";
    this.Purchase_Ordermaster_.Payment_Term_Description = 0;
    this.Purchase_Ordermaster_.PaymentTermValue = 0;
    this.Purchase_Ordermaster_.Delivery = "";
    this.Purchase_Ordermaster_.Validity = "";
    this.Purchase_Ordermaster_.Description1 = "";
    this.Purchase_Ordermaster_.Discount_Description = null;
    this.Purchase_Ordermaster_.Charge1 = "";
    this.Purchase_Ordermaster_.Charge1per = null;
    this.Purchase_Ordermaster_.Charge2 = "";
    this.Purchase_Ordermaster_.PreparedBy = "";
    this.Purchase_Ordermaster_.VAT_Percentage = null;
    this.Purchase_Ordermaster_.Additional_Discount = 0;
    this.Purchase_Ordermaster_.charge1_Amount = 0;
    this.Purchase_Ordermaster_.charge2_Amount = 0;

    this.SalesQuotationMaster_Id = 0;
    this.Purchase_Ordermaster_.SalesQuotationMaster_Id = 0;


    this.Purchase_Ordermaster_.TotalDiscount = 0
    this.Purchase_Ordermaster_.VAT_Amount = 0;
    this.Purchase_Ordermaster_.Total_Amount = 0;
    this.Purchase_Ordermaster_.Roundoff_Amt = 0;
    this.Purchase_Ordermaster_.Amount_In_Words = "";
    this.Purchase_Ordermaster_.NetTotal=0;
    this.Purchase_Ordermaster_.Total =0;
    this.Purchase_Ordermaster_.Customer_Reference = '';
    this.Purchase_Ordermaster_.VAT_Percentage = this.Default_Vat_Percentage;
    // this.Purchase_Ordermaster_.Cess=0;
    // this.Purchase_Ordermaster_.RoundOff=0;
    this.Purchase_Ordermaster_.TotalAmount=0;
    this.Purchase_Ordermaster_.Description2="";
    this.Purchase_Ordermaster_.Address1="";
    this.Purchase_Ordermaster_.Address2="";
    this.Purchase_Ordermaster_.Address3="";
    this.Purchase_Ordermaster_.Address4="";
    this.Purchase_Ordermaster_.KindAttend="";
    this.Purchase_Ordermaster_.GSTNo = "";
    // this.Purchase_Ordermaster_.Customer_Name="";
    // this.Purchase_Ordermaster_.PinCode="";
    // this.Purchase_Ordermaster_.GSTNo="";    
    this.Purchase_Ordermaster_.GrandTotal=0;
    this.Purchase_Ordermaster_.Transportation_Gst=0;
    this.Purchase_Ordermaster_.Handling_Gst=0;
    this.Purchase_Ordermaster_.Transportation_Total=0;
    this.Purchase_Ordermaster_.AttendEmployee='';
    // this.Purchase_Ordermaster_.Vehicle_No="";
    // this.Purchase_Ordermaster_.Driver_Name="";
    // this.Purchase_Ordermaster_.Mobile_No = "";
    this.Purchase_Ordermaster_.Delivery_Address1 = "";
    this.Purchase_Ordermaster_.Delivery_Address2 = "";
    this.Purchase_Ordermaster_.Delivery_Address3 = "";
    this.Purchase_Ordermaster_.Delivery_Address4 = "";
    if(this.Bill_Type_Data!=undefined && this.Bill_Type_Data!=null)
    this.Bill_Type_=this.Bill_Type_Data[1];
    if(this.Bill_Mode_Data!=undefined && this.Bill_Mode_Data!=null)
    this.Bill_Mode_=this.Bill_Mode_Data[0];

    if(this.currencyData != undefined && this.currencyData != null)
        this.Currency = this.currencyData[0];

    if(this.AccounttypeData!=undefined && this.AccounttypeData!=null)
        this.Accounttype = this.AccounttypeData[0];

   
    if(this.PaymentTermData!=undefined && this.PaymentTermData!=null)
        this.Payment_Term_Description_=this.PaymentTermData[0];

    this.Customer_=null;
    this.Purchase_Orderdetails_Data=[];
    this.Address1 = null;
    this.Customer_Name = null;
    this.Address2 = null;
    this.Address3 = null;
    this.Address4 = null;
    this.POnumber = null;
    this.Attention = null;
    this.Vatin = null;
    this.Employee = null;
    this.Tot_Amount = null;
    this.Total = 0;

}
Clr_Sales_Details()
{
    this.Quotation_Details_Index=-1;
    this.Purchase_Orderdetails_Index=-1;
    this.Purchase_Orderdetails_.Purchase_OrderDetails_Id="";
    this.Quotation_Details_.Quotation_Master_Id=0;
    this.Purchase_Orderdetails_.StockId=0;
    //this.Quotation_Details_.Stock_Details_Id=0;
    this.Purchase_Orderdetails_.ItemId=0;
    this.Purchase_Orderdetails_.ItemName="";
    this.Purchase_Orderdetails_.Item_Code="";
    this.Purchase_Orderdetails_.GroupId=0;
    this.Purchase_Orderdetails_.GroupName="";
    this.Purchase_Orderdetails_.UnitId=0;
    this.Purchase_Orderdetails_.UnitName="";
    this.Purchase_Orderdetails_.PurchaseRate=0;
    this.Purchase_Orderdetails_.SaleRate=0;
    this.Purchase_Orderdetails_.MRP=0;
    this.Purchase_Orderdetails_.TaxAmount=0;
    // this.Purchase_Orderdetails_.Stock=0;
    this.Purchase_Orderdetails_.HSNCODE="";
    this.Purchase_Orderdetails_.SaleTax=0;
    this.Purchase_Orderdetails_.CGST=0;
    this.Purchase_Orderdetails_.IGST=0;
    this.Purchase_Orderdetails_.SGST=0;
    // this.Purchase_Orderdetails_.Cesspers=0;
    this.Purchase_Orderdetails_.Quantity=0;
    this.Purchase_Orderdetails_.GrossValue=0;
    this.Purchase_Orderdetails_.Discount=0;
    this.Purchase_Orderdetails_.NetValue=0;
    this.Purchase_Orderdetails_.UnitPrice =0;
    this.Purchase_Orderdetails_.Unit_Discount = 0;
    // this.Purchase_Orderdetails_.CGSTAMT=0;
    // this.Purchase_Orderdetails_.SGSTAMT=0;
    // this.Purchase_Orderdetails_.IGSTAMT=0;
    // this.Purchase_Orderdetails_.CessAMT=0;
    this.Purchase_Orderdetails_.TotalAmount=0;
    this.Purchase_Orderdetails_.Description="";
    this.Barcode_=null;
    this.Stock_=null;
    this.Stock_Data=null;
    this.ItemCodeData=null;
    this.UnitName = null;
    this.Quantity = null;
    this.SaleRate = null;
    this.discount = null;
    this.unitDiscount = null;
    this.TotalAmount = null;
    this.availablity = null;
    this.Item_=null;
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
    this.Quotation_Details_Description="";
}
Delete_Sales_Details(Quotation_Details_e:Quotation_Details,index)
{
    /*this.Edit_CGST=Quotation_Details_e.CGSTAMT
    this.Edit_SGST=Quotation_Details_e.SGSTAMT;
    this.Edit_GST=Quotation_Details_e.TaxAmount;
    this.Edit_Discount=Number(Quotation_Details_e.Discount);
    this.Edit_Cess=Quotation_Details_e.CessAMT;
    this.Edit_Net=Quotation_Details_e.NetValue;
    this.Edit_Gross=Quotation_Details_e.GrossValue;
    this.Edit_Totamt=Quotation_Details_e.TotalAmount;
    this.CGST_SUM= this.CGST_SUM-this.Edit_CGST;
    this.SGST_SUM= this.SGST_SUM-this.Edit_SGST;
    this.GST_Sum= this.GST_Sum-this.Edit_GST;
    this.Tot_discount=this.Tot_discount-this.Edit_Discount;
    this.Tot_Cess=this.Tot_Cess- this.Edit_Cess;
    this.Tot_Amount=this.Tot_Amount- this.Edit_Totamt;
    this.Tot_Net=this.Tot_Net- this.Edit_Net;
    this.Tot_Gross=this.Tot_Gross-this.Edit_Gross;
    this.Quotation_Master_.GrossTotal=this.Quotation_Master_.GrossTotal-this.Edit_Gross;
    this.Quotation_Master_.TotalDiscount=this.Quotation_Master_.TotalDiscount-this.Edit_Discount;
    this.Quotation_Master_.NetTotal= this.Quotation_Master_.NetTotal-this.Edit_Net;
    this.Quotation_Master_.TotalCGST= this.Quotation_Master_.TotalCGST-this.Edit_CGST;
    this.Quotation_Master_.ToalSGST=   this.Quotation_Master_.ToalSGST-this.Edit_SGST;
    this.Quotation_Master_.Cess=  this.Quotation_Master_.Cess-this.Edit_Cess;
    this.Quotation_Master_.TotalAmount= this.Quotation_Master_.TotalAmount- this.Edit_Totamt;
    this.Quotation_Master_.TotalGST=   this.Quotation_Master_.TotalGST-this.Edit_GST;
    //this.Quotation_Master_.GrandTotal= this.Quotation_Master_.GrandTotal-this.Edit_Totamt;
    this.Quotation_Master_.GrossTotal=Number(this.Quotation_Master_.GrossTotal.toFixed(2));
    this.Quotation_Master_.TotalDiscount=Number(this.Quotation_Master_.TotalDiscount.toFixed(2));
    this.Quotation_Master_.NetTotal=Number(this.Quotation_Master_.NetTotal.toFixed(2));
    this.Quotation_Master_.TotalCGST=Number(this.Quotation_Master_.TotalCGST.toFixed(2));
    this.Quotation_Master_.ToalSGST=Number(this.Quotation_Master_.ToalSGST.toFixed(2));
    this.Quotation_Master_.Cess=Number(this.Quotation_Master_.Cess.toFixed(2));
    this.Quotation_Master_.TotalAmount=Number(this.Quotation_Master_.TotalAmount.toFixed(2));
    this.Quotation_Master_.TotalGST=Number(this.Quotation_Master_.TotalGST.toFixed(2));   
    this.Quotation_Master_.GrandTotal=Number(this.Quotation_Master_.GrandTotal.toFixed(2));*/   
    this.Quotation_Details_Data.splice(index, 1); 
    
    
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
   this.Search_Quotation();
   this.issLoading=false;
   },
   Rows => {
       this.issLoading=false;
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error',Type:"2"}});
   });
   }
   });
}


Search_PurchaseItem_Typeahead(event: any)
{
  var Value = "";

  if(this.Barcode_ == null || this.Barcode_ == undefined)
    this.Barcode_ = new Purchase_Orderdetails();

  if (event.target.value == "") Value = "";
  else Value = event.target.value.toLowerCase();
  if(this.Barcode_.Item_Code)
    {
        this.Barcode_.ItemName=Value
    }

  this.Purchase_Orderdetails_.ItemName=Value;

          this.issLoading = true;
  this.Sales_Master_Service_.Search_PurchaseItem_Typeahead(Value).subscribe(Rows => {

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

Delete_Quotation_Master(PerformaInvoiceMaster_Id,index)
 {
    const dialogRef = this.dialogBox.open
    ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>        
    {    
    if(result=='Yes')
    {
    this.issLoading=true;
    
    this.Sales_Master_Service_.Delete_Performa_Invoice_Master(PerformaInvoiceMaster_Id).subscribe(Delete_status => {    
           
        Delete_status=Delete_status[1];
    if(Delete_status[0].PerformaInvoiceMaster_Id1_>0){
    this.Quotation_Master_Data.splice(index, 1);
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
      
      this.Search_Quotation();
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
    var value=1;
        this.Sales_Master_Service_.Load_Bill_Type(value).subscribe(Rows => {    
        if (Rows != null) {
        this.Bill_Type_Data = Rows[0];        
        this.Bill_Type_Temp.Bill_Type_Id = 0;
        this.Bill_Type_Temp.Bill_Type_Name = "Select";
        this.Bill_Type_Data.unshift(this.Bill_Type_Temp);
        this.Bill_Type_Search=this.Bill_Type_Data[0];
        this.Bill_Type_=this.Bill_Type_Data[1];
        }
        },
        Rows => {
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
    this.Sales_Master_Service_.Load_Company_Bank().subscribe(Rows => {   
      if (Rows != null) {
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
    console.log(this.Search_Customer)
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
     var Value = "";
     
     Value = event.target.value;
       
      this.issLoading = true;
      
     this.Sales_Master_Service_.Get_Purchase_Item_Code_Typeahead(Value).subscribe(Rows => {     
        
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
    var Value = "";

    if(this.Barcode_ == null || this.Barcode_ == undefined)
        this.Barcode_ = new Purchase_Orderdetails();

    if (event.target.value == "") Value = "";
    else Value = event.target.value.toLowerCase();

    if(this.Barcode_.Item_Code)
        {
            this.Barcode_.ItemName=Value
        }   
    this.Purchase_Orderdetails_.ItemName=Value;

            this.issLoading = true;
    this.Sales_Master_Service_.Search_Item_Typeahead(Value).subscribe(Rows => {
  
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
Customer_Change( Customer_T_)
{
    this.Customer_=Customer_T_;    
    this.Purchase_Ordermaster_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.Purchase_Ordermaster_.Customer=this.Customer_.Client_Accounts_Name;
    this.Purchase_Ordermaster_.Account_Party_Id=this.Customer_.Client_Accounts_Id;

    this.Purchase_Ordermaster_.Address1 = this.Customer_.Address1;
    this.Purchase_Ordermaster_.Address2 = this.Customer_.Address2;
    this.Purchase_Ordermaster_.Address3 = this.Customer_.Address3;
    this.Purchase_Ordermaster_.Address4 = this.Customer_.Address4;
    this.Purchase_Ordermaster_.Mobile = this.Customer_.Mobile;
    this.Purchase_Ordermaster_.PinCode=this.Customer_.PinCode;
    this.Purchase_Ordermaster_.GSTNo=this.Customer_.GSTNo;

    this.Customer_Name = this.Quotation_Master_.Customer_Name;

    this.Address1 = this.Quotation_Master_.Address1;
    this.Address2 = this.Quotation_Master_.Address2;
    this.Address3 = this.Quotation_Master_.Address3;
    this.Address4 = this.Quotation_Master_.Address4;
    this.Vatin = this.Quotation_Master_.GSTNo;
}


selectCustomer(){

this.Purchase_Ordermaster_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.Purchase_Ordermaster_.Customer=this.Customer_.Client_Accounts_Name;
    this.Purchase_Ordermaster_.Account_Party_Id=this.Customer_.Client_Accounts_Id;

    this.Purchase_Ordermaster_.Address1 = this.Customer_.Address1;
    this.Purchase_Ordermaster_.Address2 = this.Customer_.Address2;
    this.Purchase_Ordermaster_.Address3 = this.Customer_.Address3;
    this.Purchase_Ordermaster_.Address4 = this.Customer_.Address4;
    this.Purchase_Ordermaster_.Mobile = this.Customer_.Mobile;
    this.Purchase_Ordermaster_.PinCode=this.Customer_.PinCode;
    this.Purchase_Ordermaster_.GSTNo=this.Customer_.GSTNo;

    this.Customer_Name = this.Quotation_Master_.Customer_Name;

    this.Address1 = this.Customer_.Address1;
    this.Address2 = this.Customer_.Address2;
    this.Address3 = this.Customer_.Address3;
    this.Address4 = this.Customer_.Address4;
    this.Vatin = this.Customer_.GSTNo;
}

Barcode_Change(Barcode_sl:Purchase_Orderdetails)
{
   
    this.Stock_Temp.ItemId=Barcode_sl.ItemId;
    this.Stock_Temp.ItemName=Barcode_sl.ItemName;
    this.Stock_=Object.assign({},this.Stock_Temp);
   
  
    this.Purchase_Orderdetails_=Object.assign({},Barcode_sl);
    this.Purchase_Orderdetails_Temp_.ItemId=Barcode_sl.ItemId;
    this.Purchase_Orderdetails_Temp_.ItemName=Barcode_sl.ItemName;
    this.Item_=Object.assign({},this.Purchase_Orderdetails_Temp_);
    
    this.Purchase_Orderdetails_.ItemId=Barcode_sl.ItemId;
    this.Purchase_Orderdetails_.ItemName=Barcode_sl.ItemName;
    this.Purchase_Orderdetails_.StockId=Barcode_sl.StockId;
    this.Purchase_Orderdetails_.Quantity=0;
    
   // this.Purchase_Orderdetails_.ItemId=this.Barcode_.ItemId;
   // this.Purchase_Orderdetails_.ItemName=this.Barcode_.ItemName;
  


}
// Calculate_Quotation_Details_Amount()
// {
//     
//     if(this.Quotation_Details_.Quantity == undefined || this.Quotation_Details_.Quantity == null)
//     this.Quotation_Details_.Quantity = 0;
//     if(this.Quotation_Details_.SaleRate == undefined || this.Quotation_Details_.SaleRate == null)
//     this.Quotation_Details_.SaleRate = 0;

//  this.Calculate_Total_Amount();
// }
// Calculate_Total_Amount()
// { 
//     this.unitDiscount = (this.SaleRate * this.discount )/ 100;
//     this.TotalAmount = this.Quantity * this.SaleRate - (this.unitDiscount*this.Quantity);
    
// }
Round_Off_Calculation()
{   
    if(this.Quotation_Master_.RoundOff == undefined || this.Quotation_Master_.RoundOff == null)
        this.Quotation_Master_.RoundOff = 0;   
    this.Quotation_Master_.GrandTotal = Number(this.Quotation_Master_.RoundOff) + Number(this.Quotation_Master_.TotalAmount);
}
checkbox_Click()
{ 
    this.Final_Amounts();
}

safeNumber(value) {
    return isNaN(value) ? 0 : Number(value);
}

// Final_Amounts()
// {      
//     this.Tot_Gross=0,this.Tot_discount=0,this.Tot_Net=0,this.Tot_Amount=0;
//     for(var i = 0; i< this.Purchase_Orderdetails_Data.length ; i++)
//     {
//         this.Tot_Amount = Number(this.Tot_Amount) + Number(this.Purchase_Orderdetails_Data[i].UnitPrice) * Number(this.Purchase_Orderdetails_Data[i].Quantity);

//         this.Tot_discount = Number(this.Tot_discount)+  (this.Purchase_Orderdetails_Data[i].Unit_Discount * this.Purchase_Orderdetails_Data[i].Quantity );
        
//     }
//     this.Tot_Amount = Number(this.Tot_Amount.toFixed(2));
//     this.Tot_discount = Number(this.Tot_discount.toFixed(2));
//     if(this.Purchase_Ordermaster_.Discount_Description>0){
//         this.Purchase_Ordermaster_.Additional_Discount = this.Tot_Amount * (this.Purchase_Ordermaster_.Discount_Description/ 100);

//     }else{
//         this.Purchase_Ordermaster_.Additional_Discount = 0
//     }
//     //this.Quotation_Master_.Discount_Description = (this.safeNumber(this.Quotation_Master_.Additional_Discount) * 100)/this.Tot_Amount
//     this.Purchase_Ordermaster_.TotalDiscount = this.Tot_discount+ this.Purchase_Ordermaster_.Additional_Discount;
//     if(this.Purchase_Ordermaster_.Charge1per>0){
//         this.Purchase_Ordermaster_.charge1_Amount = (this.Tot_Amount - this.Purchase_Ordermaster_.Additional_Discount)* (this.Purchase_Ordermaster_.Charge1per/100)
//         this.Purchase_Ordermaster_.charge1_Amount = Number(this.Purchase_Ordermaster_.charge1_Amount.toFixed(2))
//     }else{
//         this.Purchase_Ordermaster_.charge1_Amount =  0;
//     }
//     this.Total = this.Tot_Amount-this.Purchase_Ordermaster_.TotalDiscount + this.safeNumber(this.Purchase_Ordermaster_.charge2_Amount) + this.Purchase_Ordermaster_.charge1_Amount
//     this.Total = Number(this.Total.toFixed(2))
//     this.Purchase_Ordermaster_.VAT_Amount = 0;
//     if(this.Purchase_Ordermaster_.VAT_Percentage>0){
//         this.Purchase_Ordermaster_.VAT_Amount = this.Total * (this.Purchase_Ordermaster_.VAT_Percentage/100)
//     }
//     this.Purchase_Ordermaster_.VAT_Amount = Number(this.Purchase_Ordermaster_.VAT_Amount.toFixed(2))    
//     this.Purchase_Ordermaster_.Total_Amount = this.Total + this.Purchase_Ordermaster_.VAT_Amount
//     this.Purchase_Ordermaster_.Total_Amount = Number(this.Purchase_Ordermaster_.Total_Amount.toFixed(2))
//     this.Purchase_Ordermaster_.NetTotal = Number((this.Purchase_Ordermaster_.Total_Amount - this.safeNumber(this.Purchase_Ordermaster_.Roundoff_Amt)).toFixed(2))
//     this.Purchase_Ordermaster_.NetTotal = Number(this.Purchase_Ordermaster_.NetTotal.toFixed(2))
//     this.Purchase_Ordermaster_.Amount_In_Words = this.numberToWordsIndianCurrency(this.Purchase_Ordermaster_.NetTotal)
//      //this.Clr_Sales_Edit_Data();

   




// }
Manual_Roundoff_Calculation()
{
    var Point_=0.50;
    this.roundoff_value=0;
    this.roundoff_value=this.Quotation_Master_.TotalAmount-(Math.round(this.Quotation_Master_.TotalAmount));
    if(this.roundoff_value<Number(Point_))
    this.roundoff_value=- this.roundoff_value;
   // this.Quotation_Master_.TotalAmount=this.Quotation_Master_.TotalAmount+  this.roundoff_value;
    this.Quotation_Master_.RoundOff=Number(this.roundoff_value);
    this.Quotation_Master_.RoundOff=Number(this.Quotation_Master_.RoundOff.toFixed(3));
    this.Quotation_Master_.TotalAmount= Number(this.Quotation_Master_.TotalAmount.toFixed(3));
}
Calculation_GSt()
{
    if(this.Quotation_Master_.Isgst==true)
    {
        this.Quotation_Master_.Transportation_Gst = Number(this.Quotation_Master_.Transportation_Charge) * (18 / 100)
        this.Quotation_Master_.Transportation_Total = Number(this.Quotation_Master_.Transportation_Charge) + Number(this.Quotation_Master_.Transportation_Gst) ;
        this.Quotation_Master_.Handling_Gst = (this.Quotation_Master_.Handling_Charge) * (18 / 100)
        this.Quotation_Master_.Handling_Total = Number(this.Quotation_Master_.Handling_Charge) + Number(this.Quotation_Master_.Handling_Gst);
   }
}
Search_Quotation()
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
    if(this.Employee_Search.User_Details_Id==null || this.Employee_Search.User_Details_Id==undefined)
        User_Details_Id_=0;
    else
        User_Details_Id_=this.Employee_Search.User_Details_Id;
    this.issLoading=true;    
    this.orderNo = this.orderNo == "" ? undefined : this.orderNo
    this.partNo = this.partNo == "" ? undefined : this.partNo
    
    // this.Sales_Master_Service_.Search_Quotation(look_In_Date_Value,moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),CustomerId_,this.QuotNo,this.partNo,Item_Group_Id_,
    //                                                         CurrencyDetails_Id_,User_Details_Id_).subscribe(Rows => {
    // this.Quotation_Master_Data=Rows[0];
    // if(this.Quotation_Master_Data.length>0)
    // {
    //     for(var i=0;i<this.Quotation_Master_Data.length;i++)
    //     {
    //         this.Sales_Master_Total_Amount=Number(this.Sales_Master_Total_Amount)+Number(this.Quotation_Master_Data[i].GrandTotal);
    //         this.Sales_Master_Total_Amount= Number(this.Sales_Master_Total_Amount.toFixed(3));
    //     }
    // }
    // this.Total_Entries=this.Quotation_Master_Data.length;
    // if(this.Quotation_Master_Data.length==0)
    // {
    // const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'No Details Found',Type:"3"}});
    // }
    // this.issLoading=false;
    // },
    // Rows => {
    //     this.issLoading=false;
    //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    // });
}
// Add_Sales_Details()
// {     
//     if (this.Quotation_Details_Index >= 0) {
//         this.Quotation_Details_Data[this.Quotation_Details_Index] = Object.assign({}, this.Quotation_Details_);
//         }
//     else {
//         //this.Quotation_Details_.Barcode=this.Barcode_.Barcode;
//         this.Quotation_Details_Data.push(Object.assign({}, this.Quotation_Details_));
// }
// this.Final_Amounts();
// this.Quotation_Details_Index=-1;
// this.Clr_Sales_Details();
//  }
 Add_Sales_Details1()
{     
    if (this.performainvoicedetails_Index >= 0) {
        this.performainvoicedetails_Data[this.performainvoicedetails_Index] = Object.assign({}, this.performainvoicedetails_);
        }
    else {
        //this.Quotation_Details_.Barcode=this.Barcode_.Barcode;
        this.performainvoicedetails_Data.push(Object.assign({}, this.performainvoicedetails_));
}
this.Final_Amounts();
this.performainvoicedetails_Index=-1;
this.Clr_Sales_Details();
 }
// Plus_Quotation_Details(event)
// {   
//     
//     if(this.Barcode_==undefined || this.Barcode_==null )
//         {
//             const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select Item code',Type:"3"}});
//             return
//         }
//     else if(this.Quantity==undefined || this.Quantity==null || this.Quantity==0 )
//     {
//         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter the quantity',Type:"3"}});
//         return
//     }
//     else if(this.SaleRate==undefined || this.SaleRate==null || this.SaleRate==0 )
//     {
//         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter unit rate',Type:"3"}});
//         return
//     }     
//     this.Purchase_Orderdetails_.ItemId = this.Stock_.ItemId;
//     this.Purchase_Orderdetails_.ItemCode = this.Barcode_.Item_Code;
//     this.Purchase_Orderdetails_.ItemName = this.Stock_.ItemName;
//     this.Purchase_Orderdetails_.GroupId = this.Stock_.GroupId;
//     this.Purchase_Orderdetails_.GroupName = this.Stock_.GroupName;
//     this.Purchase_Orderdetails_.UnitId = this.Stock_.UnitId;
//     this.Purchase_Orderdetails_.UnitName = this.Stock_.UnitName;
//     this.Purchase_Orderdetails_.StockId = this.Stock_.Stock_Id;
//     this.Purchase_Orderdetails_.HSNMasterId = this.Stock_.HSNMasterId;
//     this.Purchase_Orderdetails_.HSNCODE = this.Stock_.HSNCODE;
//     this.Purchase_Orderdetails_.UnitPrice = this.SaleRate;
//     this.Purchase_Orderdetails_.Quantity = this.Quantity;
//     this.Purchase_Orderdetails_.Amount = this.TotalAmount;
//     this.Purchase_Orderdetails_.Discount = this.discount;
//     // this.Purchase_Orderdetails_.Availability = this.availablity;
//     this.Purchase_Orderdetails_.Unit_Discount = this.unitDiscount;
//     this.Purchase_Orderdetails_.Sale_Tax = this.Stock_.SaleTax;
//     this.Purchase_Orderdetails_.TaxableAmount = this.TotalAmount-this.discount;
//     this.Purchase_Orderdetails_.TaxAmount = this.Purchase_Orderdetails_.TaxableAmount * (this.safeNumber(this.Stock_.SaleTax) / 100)
    
//     console.log(this.Purchase_Orderdetails_);
//         console.log(this.Purchase_Orderdetails_Data);


//         if (!this.Purchase_Orderdetails_Data) {
//             this.Purchase_Orderdetails_Data = [];
//         }
//    
//     this.Purchase_Orderdetails_Data.push(Object.assign({}, this.Purchase_Orderdetails_));

//     this.Clr_Sales_Details();
//     this.Final_Amounts();

// }



Plus_Sales_Details(event)
{   

;

if(this.Barcode_==undefined || this.Barcode_==null )
    {
        const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select Item code',Type:"3"}});
        return
    }
else if(this.Purchase_Orderdetails_.Quantity==undefined || this.Purchase_Orderdetails_.Quantity==null || this.Purchase_Orderdetails_.Quantity==0 )
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter the quantity',Type:"3"}});
    return
}
else if(this.Purchase_Orderdetails_.UnitPrice==undefined || this.Purchase_Orderdetails_.UnitPrice==null || this.Purchase_Orderdetails_.UnitPrice==0 )
{
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter unit rate',Type:"3"}});
    return
}     

;

if (this.Purchase_Orderdetails_Data == undefined)
  this.Purchase_Orderdetails_Data = [];

    if( this.Barcode_==null)
    {
        this.Purchase_Orderdetails_.Item_Code='';
    }
    else if(this.Barcode_.Item_Code!=undefined && this.Barcode_.Item_Code!=null)
    {
        this.Purchase_Orderdetails_.Item_Code=  this.Barcode_.Item_Code;
    }
    else if(this.Barcode_!=undefined && this.Barcode_!=null)
    {
        const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
        this.Purchase_Orderdetails_.Item_Code=Barcode_string;
    }
    if( this.Item_==null)
        {
            this.Purchase_Orderdetails_.ItemName='';
        }
        else if(this.Item_.ItemName!=undefined && this.Item_.ItemName!=null)
        {
            this.Purchase_Orderdetails_.ItemName=  this.Item_.ItemName;
        }
        else if(this.Item_!=undefined && this.Item_!=null)
        {
            const Itemnamestoing =JSON.parse(JSON.stringify(this.Item_));
            this.Purchase_Orderdetails_.ItemName=Itemnamestoing;
        }
        if (this.Purchase_Orderdetails_.SaleTax==null || this.Purchase_Orderdetails_.SaleTax==undefined)
            this.Purchase_Orderdetails_.SaleTax=0;

        this.Purchase_Orderdetails_.UnitPrice = parseFloat(Number(this.Purchase_Orderdetails_.UnitPrice).toFixed(3));
        this.Purchase_Orderdetails_.TaxableAmount = this.TotalAmount-this.discount;
        this.Purchase_Orderdetails_.TaxAmount = this.Purchase_Orderdetails_.TaxableAmount * (this.safeNumber(this.Purchase_Orderdetails_.SaleTax) / 100);
        this.Purchase_Orderdetails_.Item_Discount_Amount = Number(this.Purchase_Orderdetails_.UnitPrice) * this.safeNumber(this.Purchase_Orderdetails_.Discount)/100;
     
        if (this.Purchase_Orderdetails_Index >= 0) 
        {
            this.Purchase_Orderdetails_Data[this.Purchase_Orderdetails_Index] = Object.assign({}, this.Purchase_Orderdetails_);
        }
        else
        {
            this.Purchase_Orderdetails_Data.push(Object.assign({}, this.Purchase_Orderdetails_));
        }

  this.Purchase_Orderdetails_Index = -1;
  this.Focus_It(event);
   
 
this.Clr_Sales_Details();

this.addBlankRows();
this.Final_Amounts();
}


Save_Quotation(Printstatus:number)
{

    if(this.Quotation_Details_Data == undefined || this.Quotation_Details_Data == null || this.Quotation_Details_Data.length == 0 || this.Quotation_Details_Data.length == undefined )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Add atleast one Item',Type:"3"}});
        return
    }
    if(this.Customer_ == undefined || this.Customer_ == null || this.Customer_.Client_Accounts_Id == undefined || this.Customer_.Client_Accounts_Id == 0 ){
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Choose Customer',Type:"3"}});
        return
    }    
    this.Quotation_Master_.SalesQuotationMaster_Id = 0;
    this.Quotation_Master_.Account_Party_Id=this.Customer_.Client_Accounts_Id;
    this.Quotation_Master_.User_Id=Number(this.Login_User_Id);
    this.Quotation_Master_.POnumber = this.POnumber.InvoiceNo
    this.Quotation_Master_.Quotation_Details=this.Quotation_Details_Data;
    console.log("Before Purchase Order (Quotation) API call");
    this.issLoading = true;

    this.Sales_Master_Service_.Save_Quotation(this.Quotation_Master_)
    .pipe(
        finalize(() => {
            console.log("Purchase Order (Quotation) Finalize executed");
            this.issLoading = false;
            const saveButton = document.getElementById("Save_Button");
            if (saveButton) saveButton.hidden = false;
        })
    )
    .subscribe({
        next: (res: any) => {
            console.log("Purchase Order (Quotation) API Response:", res);

            if (res && res.success) {
                const data = res.data;
                const rows = Array.isArray(data) ? data : (data && data.rows ? data.rows : []);
                const result = rows && rows[0] ? rows[0] : (Array.isArray(data) ? data[0] : null);

                if (result && Number(result.SalesQuotationMaster_Id_) > 0) {
                    this.Quotation_Master_.SalesQuotationMaster_Id = result.SalesQuotationMaster_Id_;
                    
                    if (Printstatus == 1) {
                        this.Print_Click();
                    } else {
                        this.dialogBox.open(DialogBox_Component, {
                            panelClass: 'Dialogbox-Class',
                            data: { Message: 'Saved Successfully', Type: "false" }
                        });
                        this.Clr_Sales_Master();
                    }
                    this.Sales_Print = false;
                } else {
                    const msg = (result && result.Message) || (res && res.message) || 'Save failed';
                    this.dialogBox.open(DialogBox_Component, {
                        panelClass: 'Dialogbox-Class',
                        data: { Message: 'Error: ' + msg, Type: "2" }
                    });
                }
            } else {
                this.dialogBox.open(DialogBox_Component, {
                    panelClass: 'Dialogbox-Class',
                    data: { Message: 'Error: ' + (res && res.message ? res.message : 'Save failed'), Type: "2" }
                });
            }
        },
        error: (error: any) => {
            console.error("Purchase Order (Quotation) API ERROR:", error);
            this.dialogBox.open(DialogBox_Component, {
                panelClass: 'Dialogbox-Class',
                data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" }
            });
        }
    });

}
Edit_Button_Click()
{
    if (this.User_Type_Id == 1 || this.Quotation_Master_Data[this.Sale_EditIndex].User_Id.toString() == this.Login_User_Id)
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
Edit_Quotation_Master(Sales_Master_e:Quotation_Master,index)
{ 
   
    this.Entry_View=true;
    this.Edit_Sales=1;
    this.Sales_Print = false;
    this.Quotation_Master_=Object.assign({},Sales_Master_e); 
    this.Customer_Temp.Client_Accounts_Id=Sales_Master_e.Account_Party_Id;
    this.Customer_Temp.Client_Accounts_Name=Sales_Master_e.Customer;
    this.Customer_=this.Customer_Temp;
    this.Quotation_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.Quotation_Master_.Customer=this.Quotation_Master_.Customer_Name;   
    this.Quotation_Master_.QuotationNo=this.Quotation_Master_.Bill_No;    


for(var i=0;i<this.Bill_Type_Data.length;i++)
{
    if(this.Bill_Type_Data[i].Bill_Type_Id==Sales_Master_e.BillType)
    {
        this.Bill_Type_=this.Bill_Type_Data[i];
    }
}

this.issLoading = true;

}
// Edit_Sales_Details(Quotation_Details_e:Quotation_Details,index)
// {   
//     this.Quotation_Details_Index=index;
//     this.Quotation_Details_=Quotation_Details_e;
//     this.Stock_Temp.ItemId=Quotation_Details_e.ItemId;
//     this.Stock_Temp.ItemName=Quotation_Details_e.ItemName;
//     this.Stock_=Object.assign({},this.Stock_Temp);
//     this.Barcode_Temp.Stock_Id=Quotation_Details_e.StockId;
//     //this.Barcode_Temp.Barcode=Quotation_Details_e.Barcode;
//     this.Barcode_=Object.assign({},this.Barcode_Temp);    
//     this.Edit_CGST=this.Quotation_Details_.CGSTAMT
//     this.Edit_SGST=this.Quotation_Details_.SGSTAMT;
//     this.Edit_GST=this.Quotation_Details_.TaxAmount;
//     this.Edit_Discount=this.Quotation_Details_.Discount;
//     this.Edit_Cess=this.Quotation_Details_.CessAMT;
//     this.Edit_Net=this.Quotation_Details_.NetValue;
//     this.Edit_Gross=this.Quotation_Details_.GrossValue;
//     this.Edit_Totamt=this.Quotation_Details_.TotalAmount;
//     this.Quotation_Details_=Object.assign({},Quotation_Details_e);
//     this.Sale_Detail_Quantity=this.Quotation_Details_.Quantity;
//     this.Edit_Stock_-this.Quotation_Details_.Stock;
//     this.Quotation_Details_Description=this.Quotation_Details_.Description;
// }

Get_Stock(){

//     this.Sales_Master_Service_.Search_PurchaseItem_Typeahead("").subscribe(Rows => {
//   
//         if (Rows != null) {
//             this.Stock_Data_Filter = Rows[0];
//             for(let i= 0;i< this.Stock_Data_Filter.length;i++){
//                 if(this.Stock_Data_Filter[i].Stock_Id == this.Barcode_.Stock_Id){
//                     this.Stock_ = this.Stock_Data_Filter[i]
//                     this.UnitName = this.Stock_.UnitName
//                     //this.SaleRate = Number(this.Stock_.SaleRate);
                    
//                 }
//             }
//         }
//     })

//this.Barcode_.ItemName=this.Item_.ItemName;

/*this.Stock_Temp.ItemId=this.Barcode_.ItemId;
    this.Stock_Temp.ItemName=this.Barcode_.ItemName;
    this.Stock_=Object.assign({},this.Stock_Temp);
    this.Purchase_Orderdetails_.ItemId=this.Barcode_.ItemId;
    this.Purchase_Orderdetails_.ItemName=this.Barcode_.ItemName;
    this.Purchase_Orderdetails_.UnitId=this.Barcode_.UnitId;
    this.Purchase_Orderdetails_.UnitName=this.Barcode_.UnitName;
    this.Purchase_Orderdetails_.MRP=this.Barcode_.MRP;
    this.Purchase_Orderdetails_.PurchaseRate=this.Barcode_.PurchaseRate;
    this.Purchase_Orderdetails_.Stock=this.Barcode_.Quantity;
    this.Purchase_Orderdetails_.UnitPrice=this.Barcode_.SaleRate;
    this.Purchase_Orderdetails_.ItemName=this.Barcode_.ItemName;
    this.Purchase_Orderdetails_.GroupId=this.Barcode_.GroupId;
    this.Purchase_Orderdetails_.GroupName=this.Barcode_.GroupName;
    this.Purchase_Orderdetails_.HSNMasterId=this.Barcode_.HSNMasterId;
    this.Purchase_Orderdetails_.HSNCODE=this.Barcode_.HSNCODE;
    this.Purchase_Orderdetails_.HSNMasterId=this.Barcode_.HSNMasterId;
    this.Purchase_Orderdetails_.StockId=this.Barcode_.Stock_Id;
    this.Purchase_Orderdetails_.Sale_Tax=this.Barcode_.SaleTax;
    this.Purchase_Orderdetails_.Item_Code=this.Barcode_.Item_Code; 
    this.Purchase_Orderdetails_.Item_Code=this.Barcode_.ItemCode;   
    this.Purchase_Orderdetails_.Availability=this.Barcode_.Availability;
    this.Purchase_Orderdetails_.Country_Id=this.Barcode_.Country_Id;  
    this.Purchase_Orderdetails_.Country_Name=this.Barcode_.Country_Name; */

    this.Stock_Temp.ItemId=this.Barcode_.ItemId;
    this.Stock_Temp.ItemName=this.Barcode_.ItemName;
    this.Stock_=Object.assign({},this.Stock_Temp);
    
    this.Purchase_Orderdetails_.ItemId=this.Barcode_.ItemId;
    this.Purchase_Orderdetails_.ItemName=this.Barcode_.ItemName;
    this.Purchase_Orderdetails_.UnitId=this.Barcode_.UnitId;
    this.Purchase_Orderdetails_.UnitName=this.Barcode_.UnitName;
    this.Purchase_Orderdetails_.MRP=this.Barcode_.MRP;
    this.Purchase_Orderdetails_.PurchaseRate=this.Barcode_.PurchaseRate;
    this.Purchase_Orderdetails_.StockId=this.Barcode_.Quantity;
    this.Purchase_Orderdetails_.UnitPrice=this.Barcode_.SaleRate;
    this.Purchase_Orderdetails_.ItemName=this.Barcode_.ItemName;
    this.Purchase_Orderdetails_.GroupId=this.Barcode_.GroupId;
    this.Purchase_Orderdetails_.GroupName=this.Barcode_.GroupName;
    this.Purchase_Orderdetails_.HSNMasterId=this.Barcode_.HSNMasterId;
    this.Purchase_Orderdetails_.HSNCODE=this.Barcode_.HSNCODE;
    this.Purchase_Orderdetails_.HSNMasterId=this.Barcode_.HSNMasterId;
    this.Purchase_Orderdetails_.StockId=this.Barcode_.StockId;
    this.Purchase_Orderdetails_.SaleTax=this.Barcode_.SaleTax;
    this.Purchase_Orderdetails_.Item_Code=this.Barcode_.Item_Code; 
    this.Purchase_Orderdetails_.Country_Id=this.Barcode_.Country_Id; 
    this.Purchase_Orderdetails_.Country_Name=this.Barcode_.Country_Name; 
}


Get_Stock_Item(){
    this.Stock_Temp.ItemId=this.Item_.ItemId;
    this.Stock_Temp.ItemName=this.Item_.ItemName;
    this.Stock_=Object.assign({},this.Stock_Temp);

    if(this.Item_ != null || this.Item_ != undefined)
    {
        if(this.Item_.ItemId != null || this.Item_.ItemId != undefined)
            {
                this.Item_Temp.Item_Code=this.Item_.Item_Code;
               
                 this.Item_Temp.ItemId=this.Item_.ItemId;
                 this.Barcode_=Object.assign({},this.Item_Temp);
                 
                this.Purchase_Orderdetails_.ItemId=this.Item_.ItemId;
                this.Purchase_Orderdetails_.ItemName=this.Item_.ItemName;
                this.Purchase_Orderdetails_.UnitId=this.Item_.UnitId;
                this.Purchase_Orderdetails_.UnitName=this.Item_.UnitName;
                this.Purchase_Orderdetails_.MRP=this.Item_.MRP;
                this.Purchase_Orderdetails_.PurchaseRate=this.Item_.PurchaseRate;
                this.Purchase_Orderdetails_.Stock=this.Item_.Quantity;
                this.Purchase_Orderdetails_.UnitPrice=this.Item_.SaleRate;
                this.Purchase_Orderdetails_.ItemName=this.Item_.ItemName;
                this.Purchase_Orderdetails_.GroupId=this.Item_.GroupId;
                this.Purchase_Orderdetails_.GroupName=this.Item_.GroupName;
                this.Purchase_Orderdetails_.HSNMasterId=this.Item_.HSNMasterId;
                this.Purchase_Orderdetails_.HSNCODE=this.Item_.HSNCODE;
                this.Purchase_Orderdetails_.HSNMasterId=this.Item_.HSNMasterId;
                this.Purchase_Orderdetails_.Item_Code=this.Item_.Item_Code; 
            }
    }
   
  
    

}


// Item_Name_Change(item:Item){
//     this.Barcode_Temp.Stock_Id=this.Stock_.Stock_Id;
//     this.Barcode_Temp.Barcode=this.Stock_.Barcode;
//     this.Barcode_=Object.assign({},this.Barcode_Temp);
//     this.Purchase_Orderdetails_.ItemCode=this.Stock_.Barcode;
//     this.Purchase_Orderdetails_.ItemId=this.Stock_.ItemId;
//     this.Purchase_Orderdetails_.ItemName=this.Stock_.ItemName;
//     this.Purchase_Orderdetails_.UnitId=this.Stock_.UnitId;
//     this.Purchase_Orderdetails_.UnitName=this.Stock_.UnitName;
//     this.Purchase_Orderdetails_.MRP=this.Stock_.MRP;
//     this.Purchase_Orderdetails_.PurchaseRate=this.Stock_.PurchaseRate;
//     this.Purchase_Orderdetails_.UnitPrice=this.Stock_.SaleRate;
//     this.Purchase_Orderdetails_.GroupId=this.Stock_.GroupId;
//     this.Purchase_Orderdetails_.GroupName=this.Stock_.GroupName;
//     this.Purchase_Orderdetails_.HSNMasterId=this.Stock_.HSNMasterId;
//     this.Purchase_Orderdetails_.HSNCODE=this.Stock_.HSNCODE;
//     this.Purchase_Orderdetails_.StockId=this.Stock_.Stock_Id;
//     this.Purchase_Orderdetails_.Sale_Tax=this.Stock_.SaleTax;
    
//     this.Purchase_Orderdetails_.Country_Id=this.Barcode_.Country_Id;  
//     this.Purchase_Orderdetails_.Country_Name=this.Barcode_.Country_Name; 
// }

Item_Name_Change(Item_sl:Purchase_Orderdetails){


;

this.Purchase_Orderdetails_=Object.assign({},Item_sl);

this.Barcode_Temp_.StockId=Item_sl.StockId;
this.Barcode_Temp_.Item_Code=Item_sl.Item_Code;
this.Barcode_=Object.assign({},this.Barcode_Temp_);

this.Purchase_Orderdetails_.StockId=Item_sl.StockId; 
this.Purchase_Orderdetails_.Item_Code = Item_sl.Item_Code;
this.Purchase_Orderdetails_.ItemId=Item_sl.ItemId;
this.Purchase_Orderdetails_.Quantity=0;
// this.Purchase_Orderdetails_.ItemName=Item_sl.ItemName;

 
 }

Calculate_Quotation_Details_Amount()
{
    
    if(this.Purchase_Orderdetails_.Quantity == undefined || this.Purchase_Orderdetails_.Quantity == null)
    this.Purchase_Orderdetails_.Quantity = 0;
    if(this.Purchase_Orderdetails_.UnitPrice == undefined || this.Purchase_Orderdetails_.UnitPrice == null)
    this.Purchase_Orderdetails_.UnitPrice = 0;
    if(this.Purchase_Orderdetails_.SaleRate == undefined || this.Purchase_Orderdetails_.SaleRate == null)
    {
        this.Purchase_Orderdetails_.SaleRate = 0;
    }
if(this.Purchase_Orderdetails_.SaleTax==null || this.Purchase_Orderdetails_.SaleTax==undefined)
    this.Purchase_Orderdetails_.SaleTax=0;

 this.Calculate_Total_Amount();
}
Calculate_Total_Amount()
{ 
   
    if(this.Purchase_Orderdetails_.Discount == undefined || this.Purchase_Orderdetails_.Discount == null)
        this.Purchase_Orderdetails_.Discount = 0;
    if(this.Purchase_Orderdetails_.Item_Discount_Amount == undefined || this.Purchase_Orderdetails_.Item_Discount_Amount == null)
        this.Purchase_Orderdetails_.Item_Discount_Amount = 0;

    this.Purchase_Orderdetails_.Unit_Discount = (Number(this.Purchase_Orderdetails_.UnitPrice) * Number(this.Purchase_Orderdetails_.Discount))/ 100;
    this.Purchase_Orderdetails_.Unit_Discount = Number(this.Purchase_Orderdetails_.Unit_Discount.toFixed(3));

    this.Purchase_Orderdetails_.Item_Discount_Amount =Number(this.Purchase_Orderdetails_.Unit_Discount) * Number(this.Purchase_Orderdetails_.Quantity);
    this.Purchase_Orderdetails_.Item_Discount_Amount =Number(this.Purchase_Orderdetails_.Item_Discount_Amount.toFixed(3));

    this.Purchase_Orderdetails_.Amount = Number(this.Purchase_Orderdetails_.Quantity) * Number(this.Purchase_Orderdetails_.UnitPrice);
    this.Purchase_Orderdetails_.Amount =Number(this.Purchase_Orderdetails_.Amount.toFixed(3));
 
    this.Purchase_Orderdetails_.TaxableAmount = Number(this.Purchase_Orderdetails_.Amount) - Number(this.Purchase_Orderdetails_.Item_Discount_Amount);
    this.Purchase_Orderdetails_.TaxableAmount = Number(this.Purchase_Orderdetails_.TaxableAmount.toFixed(3));

    this.Purchase_Orderdetails_.TaxAmount = Number(this.Purchase_Orderdetails_.TaxableAmount) * Number(this.Purchase_Orderdetails_.SaleTax) /100;
    this.Purchase_Orderdetails_.TaxAmount=Number(this.Purchase_Orderdetails_.TaxAmount.toFixed(3));  

    this.Purchase_Orderdetails_.NetValue= Number(this.Purchase_Orderdetails_.TaxableAmount) + Number(this.Purchase_Orderdetails_.TaxAmount);


    this.Purchase_Orderdetails_.Item_Discount_Amount=Number(this.Purchase_Orderdetails_.Item_Discount_Amount.toFixed(3));    
    this.Purchase_Orderdetails_.Amount=Number(this.Purchase_Orderdetails_.Amount.toFixed(3));    
    this.Purchase_Orderdetails_.TaxableAmount=Number(this.Purchase_Orderdetails_.TaxableAmount.toFixed(3));
    this.Purchase_Orderdetails_.TaxAmount=Number(this.Purchase_Orderdetails_.TaxAmount.toFixed(3));  
    this.Purchase_Orderdetails_.NetValue= Number(this.Purchase_Orderdetails_.NetValue.toFixed(3));
    
}


Plus_Quotation_Details(event)
{   
    
    if(this.Barcode_==undefined || this.Barcode_==null )
        {
            const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select Item code',Type:"3"}});
            return
        }
    else if(this.Purchase_Orderdetails_.Quantity==undefined || this.Purchase_Orderdetails_.Quantity==null || this.Purchase_Orderdetails_.Quantity==0 )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter the quantity',Type:"3"}});
        return
    }
    else if(this.Purchase_Orderdetails_.UnitPrice==undefined || this.Purchase_Orderdetails_.UnitPrice==null || this.Purchase_Orderdetails_.UnitPrice==0 )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter unit rate',Type:"3"}});
        return
    }     
    if (this.Purchase_Orderdetails_Data == undefined)
        this.Purchase_Orderdetails_Data = [];
    var inserted = 0;
    for (var i = 0; i < this.Purchase_Orderdetails_Data.length; i++) {
        if (this.Purchase_Orderdetails_Data[i].StockId == this.Purchase_Orderdetails_.StockId) {
            if (this.Purchase_Orderdetails_Index == i) {
                this.Purchase_Orderdetails_Data[i] = Object.assign({}, this.Purchase_Orderdetails_)
            }
            else {
                if (this.Stock_.SaleTax==undefined || this.Stock_.SaleTax==null)
                this.Purchase_Orderdetails_.TaxableAmount = this.TotalAmount-this.discount;
                this.Purchase_Orderdetails_.TaxAmount = this.Purchase_Orderdetails_.TaxableAmount * (this.safeNumber(this.Stock_.SaleTax) / 100);
                this.Purchase_Orderdetails_.Item_Discount_Amount = Number(this.Purchase_Orderdetails_.UnitPrice) * this.safeNumber(this.Purchase_Orderdetails_.Discount)/100;
                this.Purchase_Orderdetails_Data.push(Object.assign({}, this.Purchase_Orderdetails_));
            }
            if (this.Purchase_Orderdetails_Index != i && this.Purchase_Orderdetails_Index >= 0) {
                this.Purchase_Orderdetails_Data.splice(this.Purchase_Orderdetails_Index, 1)
            }
            inserted = 1;
            i = this.Purchase_Orderdetails_Data.length;
            break;
        }
    }
    if (inserted == 0) {
        if (this.Purchase_Orderdetails_Index >= 0) {
            this.Purchase_Orderdetails_Data[this.Purchase_Orderdetails_Index] = Object.assign({}, this.Purchase_Orderdetails_)// this.Sales_Details_;
        }
        else {
            this.Purchase_Orderdetails_Data.push(Object.assign({}, this.Purchase_Orderdetails_));
        }
    }
    this.Final_Amounts();
    this.Purchase_Orderdetails_Index = -1;
    this.Focus_It(event);
    this.Clr_Sales_Details();    

}

Final_Amounts()
{      

     debugger;
    this.Tot_Gross=0,this.Tot_discount=0,this.Tot_Net=0,this.Purchase_Ordermaster_.TotalAmount=0;this.Purchase_Ordermaster_.Basic_Discount=0
    for(var i = 0; i< this.Purchase_Orderdetails_Data.length ; i++)
    {
      this.Purchase_Ordermaster_.TotalAmount = Number(this.Purchase_Ordermaster_.TotalAmount) + Number(this.Purchase_Orderdetails_Data[i].Amount);
  
        this.Tot_discount = Number(this.Tot_discount)+  (Number(this.Purchase_Orderdetails_Data[i].Unit_Discount) * Number(this.Purchase_Orderdetails_Data[i].Quantity) );
        this.Purchase_Ordermaster_.Basic_Discount = this.Purchase_Ordermaster_.Basic_Discount + Number(this.Purchase_Orderdetails_Data[i].Item_Discount_Amount)
    }
    this.Purchase_Ordermaster_.TotalAmount = Number(this.Purchase_Ordermaster_.TotalAmount.toFixed(3));
    this.Tot_discount = Number(this.Tot_discount.toFixed(3));
    debugger;
    if(this.addDiscCheck == 0)
    {
    if(Number(this.Purchase_Ordermaster_.Discount_Description)>0){
        this.Purchase_Ordermaster_.Additional_Discount = Number(this.Purchase_Ordermaster_.TotalAmount) * (Number(this.Purchase_Ordermaster_.Discount_Description)/ 100);
        this.Purchase_Ordermaster_.Additional_Discount = Number(this.Purchase_Ordermaster_.Additional_Discount.toFixed(3))
        this.addDiscCheck = 0;    

    }else{
        this.Purchase_Ordermaster_.Additional_Discount = 0
        this.addDiscCheck = 0;    

    }
    debugger;
    this.addDiscCheck = 0;   
}
this.addDiscCheck = 0;    




if(this.Purchase_Ordermaster_.VAT_Percentage==undefined || this.Purchase_Ordermaster_.VAT_Percentage==null)
    this.Purchase_Ordermaster_.VAT_Percentage=0;

    //this.Purchase_Ordermaster_.Discount_Description = (this.safeNumber(this.Purchase_Ordermaster_.Additional_Discount) * 100)/this.Tot_Amount
    this.Purchase_Ordermaster_.TotalDiscount = Number(this.Tot_discount)+ Number(this.Purchase_Ordermaster_.Additional_Discount);
    this.Purchase_Ordermaster_.TotalDiscount = Number(this.Purchase_Ordermaster_.TotalDiscount.toFixed(3))
    if(Number(this.Purchase_Ordermaster_.Charge1per)>0){
        this.Purchase_Ordermaster_.charge1_Amount = (Number(this.Purchase_Ordermaster_.TotalAmount) - Number(this.Purchase_Ordermaster_.Additional_Discount))* (Number(this.Purchase_Ordermaster_.Charge1per)/100)
        this.Purchase_Ordermaster_.charge1_Amount = Number(this.Purchase_Ordermaster_.charge1_Amount.toFixed(3))
    }else{
        this.Purchase_Ordermaster_.charge1_Amount =  0;
    }
   
    this.Purchase_Ordermaster_.Total = Number(this.Purchase_Ordermaster_.TotalAmount)-Number(this.Purchase_Ordermaster_.TotalDiscount) + 
    this.safeNumber(Number(this.Purchase_Ordermaster_.charge2_Amount)) + Number(this.Purchase_Ordermaster_.charge1_Amount)
    this.Purchase_Ordermaster_.Total = Number(this.Purchase_Ordermaster_.Total.toFixed(3))

    this.Purchase_Ordermaster_.VAT_Amount = 0;
    if(this.Purchase_Ordermaster_.VAT_Percentage>0){
        this.Purchase_Ordermaster_.VAT_Amount = this.Purchase_Ordermaster_.Total * (this.Purchase_Ordermaster_.VAT_Percentage/100)
    }
   
    this.Purchase_Ordermaster_.VAT_Amount = Number(this.Purchase_Ordermaster_.VAT_Amount.toFixed(3))    
    this.Purchase_Ordermaster_.Total_Amount = this.Purchase_Ordermaster_.Total + this.Purchase_Ordermaster_.VAT_Amount
    this.Purchase_Ordermaster_.Total_Amount = Number(this.Purchase_Ordermaster_.Total_Amount.toFixed(3))
    this.Purchase_Ordermaster_.NetTotal = Number((this.Purchase_Ordermaster_.Total_Amount - this.safeNumber(this.Purchase_Ordermaster_.Roundoff_Amt)).toFixed(3))
    this.Purchase_Ordermaster_.NetTotal = Number(this.Purchase_Ordermaster_.NetTotal.toFixed(3))
    this.Purchase_Ordermaster_.Amount_In_Words = this.numberToWordsIndianCurrency(this.Purchase_Ordermaster_.NetTotal)
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






Save_purchase_order(Printstatus:number)
{


    
    if(this.Purchase_Orderdetails_Data == undefined || this.Purchase_Orderdetails_Data == null || this.Purchase_Orderdetails_Data.length == 0 || this.Purchase_Orderdetails_Data.length == undefined )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Add atleast one Item',Type:"3"}});
        return
    }
    if(this.Customer_ == undefined || this.Customer_ == null || this.Customer_.Client_Accounts_Id == undefined || this.Customer_.Client_Accounts_Id == 0 ){
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Choose Customer',Type:"3"}});
        return
    }    
    //this.Purchase_Ordermaster_.Purchase_OrderMaster_Id = 0;
    this.Purchase_Ordermaster_.Account_Party_Id=this.Customer_.Client_Accounts_Id;
    this.Purchase_Ordermaster_.User_Id=Number(this.Login_User_Id);
    // this.performainvoicemaster_.POnumber = this.POnumber.InvoiceNo

    
    this.Purchase_Ordermaster_.Purchase_Orderdetails=this.Purchase_Orderdetails_Data;
    this.Purchase_Ordermaster_.EntryDate = this.New_Date(new Date(moment(this.Purchase_Ordermaster_.EntryDate).format('YYYY-MM-DD')));
    this.Purchase_Ordermaster_.DeliveryDate = this.New_Date(new Date(moment(this.Purchase_Ordermaster_.DeliveryDate).format('YYYY-MM-DD')));

    this.Purchase_Ordermaster_.CurrencyId = this.Currency.CurrencyDetails_Id;
    // this.Purchase_Ordermaster_.TypeId = this.Accounttype.AccountType_Id;
    this.Purchase_Ordermaster_.AccountType_Id = this.Accounttype.AccountType_Id;
    
    // if(this.Attention)
    //     this.Purchase_Ordermaster_.KindAttend=this.Attention.User_Details_Id;
    //     if(this.Employee)
    //     this.Purchase_Ordermaster_.AttendEmployee = this.Employee.User_Details_Id


    if(this.Payment_Term_Description_ == undefined || this.Payment_Term_Description_ == null){
        this.Purchase_Ordermaster_.Payment_Term_Description = 0;
        this.Purchase_Ordermaster_.PaymentTerms = "";
    }else{
        this.Purchase_Ordermaster_.Payment_Term_Description = this.Payment_Term_Description_.payment_Term_ID;
        this.Purchase_Ordermaster_.PaymentTerms = this.Payment_Term_Description_.Payment_Term_Description;
    }



    // this.Purchase_Ordermaster_.Payment_Term_Description = this.Payment_Term_Description_.payment_Term_ID
    console.log("Before Purchase Order API call");
    this.issLoading = true;

    this.Sales_Master_Service_.Save_Purchase_order(this.Purchase_Ordermaster_)
    .pipe(
        finalize(() => {
            console.log("Purchase Order Finalize executed");
            this.issLoading = false;
            const saveButton = document.getElementById("Save_Button");
            if (saveButton) saveButton.hidden = false;
        })
    )
    .subscribe({
        next: (res: any) => {
            console.log("Purchase Order API Response:", res);

            if (res && res.success) {
                const data = res.data;
                const rows = Array.isArray(data) ? data : (data && data.rows ? data.rows : []);
                const result = rows && rows[0] ? rows[0] : (Array.isArray(data) ? data[0] : null);

                if (result && Number(result.Purchase_OrderMaster_Id_) > 0) {
                    this.Purchase_Ordermaster_.Purchase_OrderMaster_Id = result.Purchase_OrderMaster_Id_;
                    this.Purchase_OrderMaster_Id_Edit = this.Purchase_Ordermaster_.Purchase_OrderMaster_Id;
                    this.Purchase_Ordermaster_.OrderNumber = result.OrderNumber_;
                    this.Purchase_Ordermaster_.PrintDate = result.PrintDate;
                    
                    if (Printstatus == 1) {
                        this.Print_Click();
                    } else {
                        this.dialogBox.open(DialogBox_Component, {
                            panelClass: 'Dialogbox-Class',
                            data: { Message: 'Saved Successfully', Type: "false" }
                        });
                    }
                    this.Sales_Print = false;
                } else {
                    const msg = (result && result.Message) || (res && res.message) || 'Save failed';
                    this.dialogBox.open(DialogBox_Component, {
                        panelClass: 'Dialogbox-Class',
                        data: { Message: 'Error: ' + msg, Type: "2" }
                    });
                }
            } else {
                this.dialogBox.open(DialogBox_Component, {
                    panelClass: 'Dialogbox-Class',
                    data: { Message: 'Error: ' + (res && res.message ? res.message : 'Save failed'), Type: "2" }
                });
            }
        },
        error: (error: any) => {
            console.error("Purchase Order API ERROR:", error);
            this.dialogBox.open(DialogBox_Component, {
                panelClass: 'Dialogbox-Class',
                data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" }
            });
        }
    });

}


Search_PerformaInvoice()
{

    
    var look_In_Date_Value=0,CustomerId_=0,Item_Group_Id_=0,CurrencyDetails_Id_=0,AccountType_Id_ = 0;
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
    if(this.Currency_Search.CurrencyDetails_Id)
        CurrencyDetails_Id_=this.Currency_Search.CurrencyDetails_Id;
    
    if(this.accounttype_search.AccountType_Id==null || this.accounttype_search.AccountType_Id==undefined)
        AccountType_Id_=0;
    else
        AccountType_Id_=this.accounttype_search.AccountType_Id;
    this.issLoading=true;    
    this.orderNo = this.orderNo == "" ? undefined : this.orderNo
    this.partNo = this.partNo == "" ? undefined : this.partNo
    
    this.Sales_Master_Service_.Search_PurchaseOrder(look_In_Date_Value,moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),
    CustomerId_,this.orderNo,this.partNo,Item_Group_Id_, CurrencyDetails_Id_,AccountType_Id_,
this.User_Type_Id, this.Login_User_Id).subscribe({
        next: (res: any) => {
            this.Purchase_Ordermaster_Data = [];
            if (res && res.success) {
                const data = res.data;
                const rows = Array.isArray(data) ? data : (data && data.rows ? data.rows : []);
                this.Purchase_Ordermaster_Data = rows && rows[0] ? rows[0] : (Array.isArray(data) ? data : []);

                if (this.Purchase_Ordermaster_Data.length > 0) {
                    for (var i = 0; i < this.Purchase_Ordermaster_Data.length; i++) {
                        this.Sales_Master_Total_Amount = Number(this.Sales_Master_Total_Amount) + Number(this.Purchase_Ordermaster_Data[i].NetTotal);
                        this.Sales_Master_Total_Amount = Number(this.Sales_Master_Total_Amount.toFixed(3));
                    }
                }
                this.Total_Entries = this.Purchase_Ordermaster_Data.length;
                if (this.Purchase_Ordermaster_Data.length == 0) {
                    this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'No Details Found', Type: "3" } });
                }
            } else {
                this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error: ' + (res && res.message ? res.message : 'Search failed'), Type: "2" } });
            }
            this.issLoading = false;
        },
        error: (error: any) => {
            this.issLoading = false;
            this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" } });
        }
    });
}

Edit_PurchaseOrder_Master(Sales_Master_e:Purchase_Ordermaster,index)
{ 
    
    this.Entry_View=true;
    this.Edit_Sales=1;
    this.Sales_Print = false;
    this.issLoading =true;
    this.Purchase_Ordermaster_=Object.assign({},Sales_Master_e); 
    this.Customer_Temp.Client_Accounts_Id=Sales_Master_e.Account_Party_Id;
    this.Customer_Temp.Client_Accounts_Name=Sales_Master_e.Customer;
    this.Customer_=this.Customer_Temp;
    this.Customer_.Client_Accounts_Id=Sales_Master_e.Account_Party_Id;
    this.Customer_.Client_Accounts_Name=Sales_Master_e.Customer;
    this.Customer_Name = this.Customer_.Client_Accounts_Name;
    this.Purchase_Ordermaster_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.Purchase_Ordermaster_.Customer=this.Quotation_Master_.Customer_Name; 

    this.SalesQuotationMaster_Id = Sales_Master_e.SalesQuotationMaster_Id

    if(this.Purchase_Ordermaster_.Additional_Discount) this.addDiscCheck = 1;
    else this.addDiscCheck = 0;
   
    this.Purchase_OrderMaster_Id_Edit = Sales_Master_e.Purchase_OrderMaster_Id;
   
    this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39',"").subscribe(Rows => {  
        if (Rows != null) {
            this.Customer_Data = Rows[0];
            for(let i=0;i<Rows[0].length;i++){
                if(Rows[0][i].Client_Accounts_Id == Sales_Master_e.Account_Party_Id){
                    debugger ;
                    this.Customer_Temp.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                        this.Customer_Temp.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                         this.Customer_= this.Customer_Temp;
                      
                        this.Purchase_Ordermaster_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                        this.Purchase_Ordermaster_.Customer=Rows[0][i].Client_Accounts_Name;
                        this.Purchase_Ordermaster_.Customer_Name=Rows[0][i].Client_Accounts_Name;
                        
                        this.Purchase_Ordermaster_.Address1 = Rows[0][i].Address1;
                        this.Purchase_Ordermaster_.Address2 = Rows[0][i].Address2;
                        this.Purchase_Ordermaster_.Address3 = Rows[0][i].Address3;
                        this.Purchase_Ordermaster_.Address4 = Rows[0][i].Address4;
                        this.Purchase_Ordermaster_.Vatin = Rows[0][i].GSTNo;
    
                        this.Address1 = Rows[0][i].Address1;
                        this.Address2 = Rows[0][i].Address2;
                        this.Address3 = Rows[0][i].Address3;
                        this.Address4 = Rows[0][i].Address4;
                        this.Vatin = Rows[0][i].GSTNo;
                }
            }                  
        }
    },
);  

    // this.Client_Accounts_Service_.Get_Client_Accounts(Sales_Master_e.Account_Party_Id).subscribe((result)=>{
    //     if(result!=null)
    //     {
    //                 this.Address1 = result[0][0].Address1;
    //                 this.Address2 = result[0][0].Address2;
    //                 this.Address3 = result[0][0].Address3;
    //                 this.Address4 = result[0][0].Address4;
    //                 this.Vatin = result[0][0].GSTNo;
    //     }
    // })
    for(let i=0;i<this.PaymentTermData.length;i++){
        if(this.PaymentTermData[i].payment_Term_ID == this.Purchase_Ordermaster_.Payment_Term_Description){
            this.Payment_Term_Description_ = this.PaymentTermData[i]
        }
    }

    for(let i=0; i<this.currencyData.length; i++){
        if(this.currencyData[i].CurrencyDetails_Id == this.Purchase_Ordermaster_.CurrencyId){
            this.Currency = this.currencyData[i];
        }
    }

    for(let i=0;i<this.AccounttypeData.length;i++){
        if(this.AccounttypeData[i].AccountType_Id == this.Purchase_Ordermaster_.AccountType_Id){
            this.Accounttype = this.AccounttypeData[i]
        }
    }  
    
    // this.Sales_Master_Service_.Search_Customer_Typeahead('1,2,3,39',"").subscribe(Rows => {    
        
    //     if (Rows != null) {
    //         this.Customer_Data = Rows[0];
    //         for(let i=0;i<this.Customer_Data.length;i++){
    //             if(this.Customer_Data[i].Client_Accounts_Id == this.Purchase_Ordermaster_.Account_Party_Id){
    //                 this.Customer_  = this.Customer_Data[i];
    //                 this.Address1 = this.Customer_.Address1;
    //                 this.Address2 = this.Customer_.Address2;
    //                 this.Address3 = this.Customer_.Address3;
    //                 this.Address4 = this.Customer_.Address4;
        
    //             }
    //         }
    //         for(let i= 0; i< this.EmployeeData.length; i++){
    //             if(this.EmployeeData[i].User_Details_Id== this.Purchase_Ordermaster_.KindAttend){
    //                 this.Attention = this.EmployeeData[i];
    //             }
    //             if(this.EmployeeData[i].User_Details_Id== this.Purchase_Ordermaster_.AttendEmployee){
    //                 this.Employee = this.EmployeeData[i];
    //             }
    //         }
    //         for(let i=0;i<this.PaymentTermData.length;i++){
    //             if(this.PaymentTermData[i].payment_Term_ID == this.Purchase_Ordermaster_.Payment_Term_Description){
    //                 this.Payment_Term_Description_ = this.PaymentTermData[i]
    //             }
    //         }
    //     }},
    //     );

this.Sales_Master_Service_.Get_PurchaseOrder_Details(Sales_Master_e.Purchase_OrderMaster_Id).subscribe({
    next: (res: any) => {
        if (res && res.success) {
            const data = res.data;
            const rows = Array.isArray(data) ? data : (data && data.rows ? data.rows : []);
            this.Purchase_Orderdetails_Data = rows && rows[0] ? rows[0] : (Array.isArray(data) ? data : []);
            this.addBlankRows();
            this.Final_Amounts();
        } else {
            this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error: ' + (res && res.message ? res.message : 'Load failed'), Type: "2" } });
        }
        this.issLoading = false;
    },
    error: (error: any) => {
        this.issLoading = false;
        this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" } });
    }
});
}


Delete_Purchase_Order(Purchase_OrderMaster_Id,index)
 {
    const dialogRef = this.dialogBox.open
    ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>        
    {    
    if(result=='Yes')
    {
    this.issLoading=true;
    
    this.Sales_Master_Service_.Delete_Purchase_Order(Purchase_OrderMaster_Id).subscribe({
        next: (res: any) => {
            if (res && res.success) {
                const data = res.data;
                const rows = Array.isArray(data) ? data : (data && data.rows ? data.rows : []);
                const result = rows && rows[0] ? rows[0] : (Array.isArray(data) ? data[0] : null);

                if (result && result.Purchase_OrderMaster_Id_ == -1) {
                    this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Cannot Delete', Type: "3" } });
                } else {
                    this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Deleted', Type: "false" } });
                    this.Search_PerformaInvoice();
                }
            } else {
                this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error: ' + (res && res.message ? res.message : 'Delete failed'), Type: "2" } });
            }
            this.issLoading = false;
        },
        error: (error: any) => {
            this.issLoading = false;
            this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" } });
        }
    });
    }
    });
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

  Delete_Quotation_Detail(itemIndex){
    this.Purchase_Orderdetails_Data.splice(itemIndex, 1);

    this.addBlankRows();
    this.Final_Amounts();
  }

//   Edit_Quotation_Detail(Quotation_Details, index){
//     console.log('Sales_Details: ', Quotation_Details);
//     this.Barcode_ = new Stock();
//     this.Stock_ = new Stock();
//     this.Barcode_.Item_Code = Quotation_Details.ItemCode;
//     this.Stock_.ItemId = Quotation_Details.ItemId;
//     this.Stock_.ItemName= Quotation_Details.ItemName ;
//     this.Stock_.UnitName = this.UnitName = Quotation_Details.UnitName 
//     this.Stock_.UnitId = Quotation_Details.UnitId;
//     this.Quantity = Quotation_Details.Quantity;
//     this.SaleRate = Quotation_Details.UnitPrice;
//     this.discount = Quotation_Details.Discount;
//     this.unitDiscount = Quotation_Details.Unit_Discount;
//     this.Stock_.GroupId = Quotation_Details.GroupId;
//     this.Stock_.GroupName = Quotation_Details.GroupName;
//     this.Stock_.Stock_Id = Quotation_Details.StockId;
//     this.Stock_.HSNMasterId = Quotation_Details.HSNMasterId;
//     this.Stock_.HSNCODE = Quotation_Details.HSNCODE;
//     this.TotalAmount = Quotation_Details.Amount;
//     this.availablity = Quotation_Details.Availability;
//     this.Stock_.SaleTax = Quotation_Details.Sale_Tax;

//     this.Purchase_Orderdetails_Data.splice(index, 1);
  
//   }

Edit_Quotation_Detail(Sales_Details_e:Purchase_Orderdetails,index)
{   
   

    this.Purchase_Orderdetails_Index=index;

    this.Barcode_Temp_.StockId=Sales_Details_e.StockId;
    this.Barcode_Temp_.Item_Code=Sales_Details_e.Item_Code;
    this.Barcode_=Object.assign({},this.Barcode_Temp_);

    this.Item_Temp.ItemId=Sales_Details_e.ItemId;
    this.Item_Temp.ItemName=Sales_Details_e.ItemName;
    this.Item_=Object.assign({},this.Item_Temp);

    this.Purchase_Orderdetails_=Object.assign({},Sales_Details_e);
   
}


  Proforma_Pending_Click(){
    
    this.performaPendingView = true;
    this.GRNListView = false;
    
    this.issLoading = true;
    this.Sales_Master_Service_.Load_GRn_Pending_List_ByPurchaseOrder(this.Purchase_Ordermaster_.Purchase_OrderMaster_Id).subscribe(Rows => {
     
    this.performaPendingData=Rows[0];
    this.issLoading = false;
    })
    setTimeout(() => {
        if (this.bottomDiv5) {
          this.bottomDiv5.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
  }

  closeGRNListView(){

   
    this.GRNListView = false;
    this.performaPendingView = false;

    setTimeout(() => {
        if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
  }

  closeGRNPendingListView(){

   
    this.GRNListView = false;
    this.performaPendingView = false

    setTimeout(() => {
        if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
  }

  GRN_Click(){
    this.GRNListView = true;
    this.performaPendingView=false;
    this.invoicePendingView = false;
    
    this.issLoading = true;
    this.Sales_Master_Service_.Get_Purchase_order_GRNClick_Details(this.Purchase_OrderMaster_Id_Edit).subscribe(Rows => {
        
              this.GRN_Data = Rows[0];
              this.issLoading = false;
          })
    setTimeout(() => {
        if (this.bottomDiv2) {
          this.bottomDiv2.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
  }


  
  makeGRN(){
    
    localStorage.setItem('GRNNo', this.Purchase_Ordermaster_.Purchase_OrderMaster_Id.toString());
    
    this.router.navigateByUrl(`/GRN`);
  }


  Edit_GRN_Purchase_Order(Purchase_Master_Id)
  {

    
    localStorage.setItem('GRNNo1', Purchase_Master_Id.toString());
    this.router.navigateByUrl(`/GRN`); 
  }

  Load_PurchaseOrder()
  {
   
    this.Entry_View=true;
    this.issLoading = true;

    //console.log('PO - load purchase order load purchaseorder service outside')
    this.salesquotationmaster_Service_.Load_PurchaseOrder(this.PurchaseOrderMaster_Id).subscribe(result=>{
        //console.log('PO - load purchaseorder service inside')
        //console.log('PO - result 1: ', result);
       
        this.Purchase_OrderMaster_Id_Edit = this.PurchaseOrderMaster_Id;
        this.Edit_Sales=1;
        this.Sales_Print = false;
        //this.Purchase_Ordermaster_Data=result[0];
        this.Purchase_Ordermaster_=Object.assign({},result[0][0]); 
       // console.log('PO - this.Purchase_Ordermaster_ 1: ', this.Purchase_Ordermaster_);
       this.Purchase_Ordermaster_.Account_Party_Id=result[0][0].Account_Party_Id;
       this.Purchase_Ordermaster_.Customer_Name=result[0][0].Customer_Name;
        this.Purchase_Ordermaster_.Payment_Term_Description=result[0][0].Payment_Term_Description;
       this.Purchase_Ordermaster_.CurrencyId=result[0][0].CurrencyId;
       this.Purchase_Ordermaster_.TypeId=result[0][0].TypeId;
    //    this.Purchase_Ordermaster_.SalesQuotationMaster_Id=this.quotationId;
    //    this.Purchase_Ordermaster_.AttendEmployee=result[0][0].AttendEmployee;
    //    this.Purchase_Ordermaster_.KindAttend=result[0][0].KindAttend;
    //    this.Purchase_Ordermaster_.Brand=result[0][0].Brand;
    //    this.Purchase_Ordermaster_.PriceBasis=result[0][0].BPriceBasis;
    //    this.Purchase_Ordermaster_.Delivery=result[0][0].Delivery;
    //    this.Purchase_Ordermaster_.Validity=result[0][0].Validity;
    //    this.Purchase_Ordermaster_.Description1=result[0][0].Description1;
    //    this.Purchase_Ordermaster_.Discount_Description=result[0][0].Discount_Description;
    //    this.Purchase_Ordermaster_.Charge1=result[0][0].Charge1;
    //    this.Purchase_Ordermaster_.Charge1per=result[0][0].Charge1per;
    //    this.Purchase_Ordermaster_.Charge2=result[0][0].Charge2;
    //    this.Purchase_Ordermaster_.PreparedBy=result[0][0].PreparedBy;
       this.SalesQuotationMaster_Id = result[0][0].SalesQuotationMaster_Id;
        this.Purchase_Ordermaster_.SalesQuotationMaster_Id= result[0][0].SalesQuotationMaster_Id;

       this.Purchase_Ordermaster_.VAT_Percentage = result[0][0].VAT_Percentage;
    //    if(this.Purchase_Ordermaster_.VAT_Percentage == undefined || this.Purchase_Ordermaster_.VAT_Percentage == null)
    //    this.Purchase_Ordermaster_.VAT_Percentage = this.Default_Vat_Percentage;

        this.Customer_Temp.Client_Accounts_Id=result[0][0].Account_Party_Id;
        this.Customer_Temp.Client_Accounts_Name=result[0][0].Customer;
        this.Customer_=this.Customer_Temp;       
        
        this.Purchase_Ordermaster_.Customer_Name=this.Customer_.Client_Accounts_Name;
        this.Purchase_Ordermaster_.Customer=this.Quotation_Master_.Customer_Name;
     
        // this.Client_Accounts_Service_.Get_Client_Accounts(this.Purchase_Ordermaster_.Account_Party_Id).subscribe((result)=>{
        //     if(result!=null)
        //     {
        //                 this.Address1 = result[0][0].Address1;
        //                 this.Address2 = result[0][0].Address2;
        //                 this.Address3 = result[0][0].Address3;
        //                 this.Address4 = result[0][0].Address4;
        //                 this.Vatin = result[0][0].GSTNo;
        //     }
        // })
        
        this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39',"").subscribe(Rows => {  
            if (Rows != null) {
                this.Customer_Data = Rows[0];
                for(let i=0;i<Rows[0].length;i++){
                    if(Rows[0][i].Client_Accounts_Id == result[0][0].Account_Party_Id){
                        debugger ;
                        this.Customer_Temp.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                            this.Customer_Temp.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                             this.Customer_= this.Customer_Temp;
                          
                            this.Purchase_Ordermaster_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                            this.Purchase_Ordermaster_.Customer=Rows[0][i].Client_Accounts_Name;
                            this.Purchase_Ordermaster_.Customer_Name=Rows[0][i].Client_Accounts_Name;
                            
                            this.Purchase_Ordermaster_.Address1 = Rows[0][i].Address1;
                            this.Purchase_Ordermaster_.Address2 = Rows[0][i].Address2;
                            this.Purchase_Ordermaster_.Address3 = Rows[0][i].Address3;
                            this.Purchase_Ordermaster_.Address4 = Rows[0][i].Address4;
                            this.Purchase_Ordermaster_.Vatin = Rows[0][i].GSTNo;
        
                            this.Address1 = Rows[0][i].Address1;
                            this.Address2 = Rows[0][i].Address2;
                            this.Address3 = Rows[0][i].Address3;
                            this.Address4 = Rows[0][i].Address4;
                            this.Vatin = Rows[0][i].GSTNo;
                    }
                }                  
            }
        },
    );        
    this.Sales_Master_Service_.Get_PurchaseOrder_Details(result[0][0].Purchase_OrderMaster_Id).subscribe(Rows => { 
        
        if (Rows != null) {
            this.Purchase_Orderdetails_Data = Rows[0];
            this.Final_Amounts();
            this.addBlankRows();
            }               
           },
         Rows => {
              
           const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });

    if(this.PaymentTermData==undefined || this.PaymentTermData==null)
        {
            this.payment_term_Service_.Load_Payment_Term().subscribe(Rows => {
               
                if (Rows != null) {
                    this.PaymentTermData = Rows[0];
                    this.PaymentTerm_Temp.Payment_Term_Description = "Select";
                    this.PaymentTerm_Temp.payment_Term_ID = 0;
                    this.PaymentTermData.unshift(this.PaymentTerm_Temp);
                    this.Payment_Term_Description_ = this.PaymentTermData[0];
   
                    for(let i=0;i<this.PaymentTermData.length;i++){
                        if(this.PaymentTermData[i].payment_Term_ID == this.Purchase_Ordermaster_.Payment_Term_Description){
                            this.Payment_Term_Description_ = this.PaymentTermData[i]
                        }
                    }
                };
            })
        }
        else
        {
        for(let i=0;i<this.PaymentTermData.length;i++){
            if(this.PaymentTermData[i].payment_Term_ID == this.Purchase_Ordermaster_.Payment_Term_Description){
                this.Payment_Term_Description_ = this.PaymentTermData[i]
            }
        }
    }

    if(this.currencyData==undefined || this.currencyData==null )
    {
        this.currencydetails_Service_.Load_currencydetails().subscribe(Rows => {
        this.currencyData = Rows[0]; 
        this.Currency_Temp.CurrencyDetails_Id = 0;
        this.Currency_Temp.CurrecnyName = "Select";
        this.currencyData.unshift(this.Currency_Temp);
        this.Currency = this.currencyData[0];

        for(let i=0; i<this.currencyData.length; i++){
            if(this.currencyData[i].CurrencyDetails_Id == this.Purchase_Ordermaster_.CurrencyId){
                this.Currency = this.currencyData[i];
            }
        }    
        })
    }
    else
    {
        for(let i=0; i<this.currencyData.length; i++){
            if(this.currencyData[i].CurrencyDetails_Id == this.Purchase_Ordermaster_.CurrencyId){
                this.Currency = this.currencyData[i];
            }
        }   
    } 
        if(this.AccounttypeData==undefined || this.AccounttypeData==null)
            {
                this.User_Details_Service_.Load_InvoiceType2().subscribe(Rows => {
                    this.AccounttypeData = Rows[0]; 
                    this.Accounttype_Temp.AccountType_Id = 0;
                    this.Accounttype_Temp.AccountType_Name = "Select";
                    this.AccounttypeData.unshift(this.Accounttype_Temp);
                    this.Accounttype = this.AccounttypeData[0];
             
                    for(let i=0;i<this.AccounttypeData.length;i++){
                        if(this.AccounttypeData[i].AccountType_Id == this.Purchase_Ordermaster_.TypeId){
                            this.Accounttype = this.AccounttypeData[i]
                        }
                    }    
                })
            }   
            else
            { 
        for(let i=0;i<this.AccounttypeData.length;i++){
            if(this.AccounttypeData[i].AccountType_Id == this.Purchase_Ordermaster_.TypeId){
                this.Accounttype = this.AccounttypeData[i]
            }
        }  
    } 

    })

    this.issLoading = false;
  }

        /*** Added on 24-10-2024 */

        Load_Vat_Percentage() 
        {   
        this.Sales_Master_Service_.Load_Vat_Percentage().subscribe(Rows => {    
        if (Rows != null) {
           
        this.Default_Vat_Percentage = Rows[0][0].vat_percentage;
     }
     },
     Rows => {
     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
     });
    }

    /*** Added on 8-11-24 */

    Calculate_Discount_Percent()
    {
      let addDiscCheck = 1;
      let discountper = '0';

     
      if(Number(this.Purchase_Ordermaster_.Additional_Discount)>0){
          this.Purchase_Ordermaster_.Discount_Description = (this.Purchase_Ordermaster_.Additional_Discount * 100/this.Purchase_Ordermaster_.TotalAmount).toString()
          discountper = Number(this.Purchase_Ordermaster_.Discount_Description).toFixed(3);
          this.Purchase_Ordermaster_.Discount_Description = discountper;    
      }else{
          this.Purchase_Ordermaster_.Discount_Description = '0.000'
      }
  
     
      this.addDiscCheck = addDiscCheck;
      this.Final_Amounts();
  }

  newQuotation(){
    this.Purchase_Ordermaster_= new Purchase_Ordermaster();
    this.Clr_Sales_Master();
    this.Clr_Sales_Details();
    this.GRNListView = false;
    this.performaPendingView = false;
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
    this.Purchase_Ordermaster_.Purchase_OrderMaster_Id = 0;
    // this.Purchase_Ordermaster_.Delivery_Address1 = '';
    // this.Purchase_Ordermaster_.Delivery_Address2 = '';
    // this.Purchase_Ordermaster_.Delivery_Address3 = '';
    // this.Purchase_Ordermaster_.Delivery_Address4 = '';
    this.Purchase_Ordermaster_.OrderNumber = 0;

    this.SalesQuotationMaster_Id = 0;
    this.Purchase_Ordermaster_.SalesQuotationMaster_Id = 0;
    this.Purchase_OrderMaster_Id_Edit = 0;
    this.GRNListView = false;
    this.performaPendingView = false;
    this.Purchase_Ordermaster_.EntryDate=new Date().toString();
    this.Purchase_Ordermaster_.EntryDate=this.formatDate(this.Purchase_Ordermaster_.EntryDate); 

    setTimeout(() => {
        if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
    

  }

  Show_Quotation_Click(SalesQuotationMaster_Id)
{
   
    localStorage.setItem('SalesQuotationMaster_Id', SalesQuotationMaster_Id.toString());
   
    this.router.navigateByUrl(`/Quotation`);
}

// Export() {
//     this.Sales_Master_Service_.exportExcel(this.Purchase_Orderdetails_Data,"PurchaseOrder" );
//   }

  Export() {
    const filteredData = this.Purchase_Orderdetails_Data.map((receipt: any, index: number) => {
        return {
            No: index + 1,                  
            CustomerName: receipt["Customer"],
            InvoiceNo : receipt["InvoiceNo"],
            Date: receipt["FormattedEntryDate"],
            Amount: receipt["NetTotal"],

        };
    });

    this.Sales_Master_Service_.exportExcel(filteredData,"PurchaseOrder" );


  }


//   addBlankRows(): void {

//     let cellThr: number = 0;
//     let cellThr1: number = 0;
//     let nosOfBlankRows: number = 0;




//     let tempht1: number = 0;
//     let tempht2: number = 0;

//     



//     this.cdr.detectChanges();

//     this.Purchase_Orderdetails_Data.forEach((_, index) => {
//       const cellId = `cell${index + 1}`;
//       const cell = document.getElementById(cellId);

//       if (cell) {
//         

//                     if(this. Purchase_Orderdetails_Data[index].ItemName.length )
//           var alenght=  this. Purchase_Orderdetails_Data[index].ItemName.length % 39;

//         console.log('this. Purchase_Orderdetails_Data[index].ItemName.length: ', this. Purchase_Orderdetails_Data[index].ItemName.length);
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
//             nosOfBlankRows = (280 - cellThr1) / 13;
//             nosOfBlankRows-=2;
//         }
//         else {
//             cellThr1 = cellThr1 - 320;
//             console.log('cellThr1 - a: ', cellThr1);
//             cellThr1 = cellThr1 % 1250;                    //1471 excel master,2371 -perfect hills
//             console.log('cellThr1 = cellThr1 % b: ', cellThr1);
//             cellThr1 = 1310- cellThr1           
//             console.log('cellThr1 = c - cellThr1: ', cellThr1);
//             nosOfBlankRows = (cellThr1) / 9;
//             console.log('nosOfBlankRows = (cellThr1) / 9;: ', nosOfBlankRows);
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

    

    // this.Quotation_Details_Data.forEach((item, index) => {
    //     item.ItemName = `Edited ${item.ItemName}`;
    //   });

    this.cdr.detectChanges();

    // Loop through and apply changes to all cells
    this.Purchase_Orderdetails_Data.forEach((_, index) => {
      const cellId = `cell${index + 1}`;
      const cell = document.getElementById(cellId);

      if (cell) {
        // Example: Apply a style or perform an action
        

        tempht1 = cell ? cell.offsetHeight : 0 ;
         tempht1 -= 50;


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

        if (cellThr1 < 375 && this.Purchase_Orderdetails_Data.length < 14 ) {   
            this.breakPage = false;                          //350
            nosOfBlankRows = (525 - cellThr1) / 12;
            if(nosOfBlankRows < 2) nosOfBlankRows +=2;
        }
        else {
            // blank = blank + 2
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

            // if(nosOfBlankRows > 100) nosOfBlankRows = 100;
            // nosOfBlankRows = blank + nosOfBlankRows;
            console.log('nosOfBlankRows = blank + nosOfBlankRows;: ', nosOfBlankRows);
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
    //     
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

    // 



    // Populate blank rows



    // Restore the style of the PrintDiv
    // if (printDiv) {
    //   printDiv.style.position = 'absolute';
    //   printDiv.style.visibility = 'hidden';
    //   printDiv.style.display = 'none';
    // }
  }

}