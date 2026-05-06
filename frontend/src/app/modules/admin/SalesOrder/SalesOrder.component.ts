import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, Renderer2, NgZone, Input, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Client_Accounts } from '../../../models/Client_Accounts';
import { User_Details_Service } from '../../../services/User_Details.Service';
import { Sales_Master_Service } from '../../../services/Sales_Master.Service';
import { currencydetails_Service } from '../../../services/currencydetails.Service';
import { purchaseordermaster_Service } from '../../../services/purchaseordermaster.Service';
import { Employee_Details_Service } from '../../../services/Employee_Details.Service';
import { salesquotationmaster_Service } from '../../../services/salesquotationmaster.Service';
import { Stock_Service } from '../../../services/Stock.Service';
import { Item_Group_Service } from '../../../services/Item_Group.Service';
import { payment_term_Service } from '../../../services/payment_term.Service';
import { Client_Accounts_Service } from '../../../services/Client_Accounts.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Sales_Master } from '../../../models/Sales_Master';
import {sales_order_master} from '../../../models/sales_order_master';
import {sales_order_details} from '../../../models/sales_order_details';
import {Sales_Order_Master_Service} from '../../../services/sales_order_master.Service';
import { Company } from '../../../models/Company';
import { Sales_Details } from '../../../models/Sales_Details';
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
import { accounttype } from '../../../models/accounttype';
import { Stock_Details } from '../../../models/Stock_Details';
// import { ConsoleReporter } from 'jasmine';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: {    dateInput: 'DD/MM/YYYY',    },
    display: {
    dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
    },
    };

@Component({
  selector: 'app-SalesOrder',
  templateUrl: './SalesOrder.component.html',
  styleUrls: ['./SalesOrder.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class SalesOrderComponent  implements OnInit, AfterViewInit{

  ngAfterViewInit() {}
  @ViewChild('Barcode_n', { read: Input, static: true }) inputEl: ElementRef;
  @ViewChild('topDiv', { static: false }) topDiv: ElementRef;
  @ViewChild('topDiv1', { static: false }) topDiv1: ElementRef;
@HostListener('document:keydown', ['$event']) 
handleKeyboardEvent(event: KeyboardEvent) { ;
    if(event.key=='F2')
  this.Save_Sales(1);
}
Sales_Order_Master_Data:sales_order_master[];
Sales_Order_Master_:sales_order_master= new sales_order_master();

Sales_Order_Details_Data:sales_order_details[];
Sales_Order_Details_Data1:sales_order_details[];
Sales_Order_Details_:sales_order_details= new sales_order_details();

Bill_Type_Data:Bill_Type[]
Bill_Type_:Bill_Type= new Bill_Type();
Bill_Type_Temp:Bill_Type= new Bill_Type();
Bill_Type_Search:Bill_Type= new Bill_Type();

Item_Group_Search:Item_Group = new Item_Group();
Currency_Search:currencydetails = new currencydetails();
searchAccountType:accounttype = new accounttype();
Employee_Search:User_Details = new User_Details();
Payment_Term_Description_:payment_term = new payment_term();

Bill_Mode_Data:Bill_Mode[]
Bill_Mode_:Bill_Mode= new Bill_Mode();
Bill_Mode_Temp:Bill_Mode= new Bill_Mode();

Customer_Data:Client_Accounts[];
PurchaseOrder_Data = [];
ItemCodeData = [];PaymentTermData=[];
Customer_:Client_Accounts= new Client_Accounts();
Search_Customer:Client_Accounts= new Client_Accounts();
Customer_Temp:Client_Accounts= new Client_Accounts();

Barcode_Data:Stock[]
Stock_Data:Stock[]
Stock_Data_Filter: Stock[];
Stock_:Stock= new Stock();
Barcode_:Stock= new Stock();
Stock_Temp:Stock= new Stock();
Barcode_Temp:Stock= new Stock();

Search_FromDate=new Date().toString();
myDate:Date=new Date();
Search_ToDate=new Date().toString();
Sales_Order_Master_Name_Search:string;
Entry_View:boolean=false;
myInnerHeight: number;
EditIndex: number;
Total_Entries: number=0;
color = 'primary';
mode = 'indeterminate';
value = 50;
issLoading: boolean;
Permissions: any;
Sales_Order_Master_Edit:boolean;
Sales_Order_Master_Save:boolean;
Sales_Order_Master_Delete:boolean;
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
Sales_Order_Details_Index:number=-1;
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
Sales_Order_Details_Description:string;
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

Sales_Order_Master_Total_Amount:number=0;
Employee_:Client_Accounts= new Client_Accounts();
Employee_Data:Client_Accounts[]

Bill_Data:number;
User_Type:string;
User_Type_Id:number;
Print_Company_:Company=new Company();
Image_Url:string;
Company_Sign:string;
Company_Seal:string;
Sales_Order_Print:boolean;

Sale_Order_EditIndex:number=-1;
Sale_Order_Permission_Edit:boolean= false;
Sale_Order_Permission_Edit_Temp:boolean= false;

Company_: Company = new Company();
Company_Temp: Company = new Company();
Company_Data: Company [];
Bank_Data:Client_Accounts[]
Bank_:Client_Accounts= new Client_Accounts();

Sales_Order_Master_Data1:[];UnitName="";Quantity=0;SaleRate=0;discount=0;unitDiscount=0;TotalAmount=0;
availablity=0;Discount_Description=0;subTotal=0;POnumber;QuotNo;partNo;
Sales_Master_1:Sales_Master= new Sales_Master();
Address1 ='';Address2 ='';Address3 ='';Address4 ='';Attention;Employee;totalAmount=0;Total=0;totalDiscount=0;
amount1=0;amount2=0;amount3=0;quotationId = 0;
PerformaInvoiceId=0;printLetterhead = false;currencyName='';invoiceTypeName='';

Currency: currencydetails = new currencydetails();
Currency_Data: currencydetails[];
Currency_Temp: currencydetails = new currencydetails();

AccounttypeData: accounttype[];
accounttype_search:accounttype = new accounttype();
Accounttype_Temp : accounttype = new accounttype();
Accounttype: accounttype = new accounttype();

PaymentTerm: payment_term = new payment_term();
PaymentTerm_Data: payment_term[];
PaymentTerm_Temp: payment_term = new payment_term();

DeliveryOrderMaster_Id: number;

itemGroupData: Item_Group[];
Item_Group_Temp: Item_Group = new Item_Group();

EmployeeData: User_Details[];
Employee_Temp: User_Details = new User_Details();

Sales_Order_Master_Id: number;

Default_Vat_Percentage: number;

addDiscCheck = 0;
Vatin = '';

printChargeAmount1: boolean = false;
printChargeAmount2: boolean = false;
printCharge1per: boolean = false;
printVAT_Amount: boolean = false;
printDiscount_Description:boolean = false;
printAdditional_Discount: boolean = false;
printRoundoff_Amt: boolean = false;

SalesQuotationMaster_Id: number = 0
Sales_Order_Master_Id_Edit: number = 0;

blankItems: number[] = [];
breakPage: boolean = false;
Customer_Name = '';

constructor(public Sales_Master_Service_:Sales_Master_Service,public Sales_Order_Master_Service_ : Sales_Order_Master_Service,
public currencydetails_Service_:currencydetails_Service, public User_Details_Service_:User_Details_Service,private route: ActivatedRoute, 
private router: Router,public dialogBox: MatDialog,private el: ElementRef, private zone: NgZone, private renderer: Renderer2 , 
public purchaseordermaster_Service_:purchaseordermaster_Service, public Employee_Details_Service_:Employee_Details_Service, 
public Stock_Service_:Stock_Service,public Item_Group_Service_:Item_Group_Service, public payment_term_Service_:payment_term_Service, 
public salesquotationmaster_Service_:salesquotationmaster_Service,public Client_Accounts_Service_:Client_Accounts_Service,
private cdr: ChangeDetectorRef) { 
    this.Load_Bill_Type();
    this.Load_Currency();   
    this.Load_Payment_Term();
    this.Load_InvoiceType();
    this.Load_Item_Group();
    this.Load_Vat_Percentage();
    this.Load_Company() ;
}
ngOnInit() 
{
  this.User_Type=(localStorage.getItem('User_Type'));
  this.User_Type_Id=Number(localStorage.getItem('User_Type_Id'));
  this.Login_User_Id=localStorage.getItem('Login_User');
  this.Employee_Name=localStorage.getItem('Employee_Name');
  this.Employee_Id=Number(localStorage.getItem('Employee_Id'));
  this.quotationId = Number(localStorage.getItem('QuotationNo'));
  localStorage.removeItem('QuotationNo');

  this.DeliveryOrderMaster_Id = Number(localStorage.getItem('DeliveryOrderMaster_Id'))
  localStorage.removeItem('DeliveryOrderMaster_Id');

  this.Sales_Order_Master_Id = Number(localStorage.getItem('Sales_Order_Master_Id'))
  localStorage.removeItem('Sales_Order_Master_Id');

  debugger

  this.PerformaInvoiceId = Number(localStorage.getItem('PerformaInvoiceNo'));
  localStorage.removeItem('PerformaInvoiceNo');

  this.Permissions = Get_Page_Permission(117);
  if(this.Permissions==undefined || this.Permissions==null)
  {
  localStorage.removeItem('token');
  this.router.navigateByUrl('/auth/login');
  }
  else
  {
  this.Sales_Order_Master_Edit=this.Permissions.Edit;
  this.Sales_Order_Master_Save=this.Permissions.Save;
  this.Sales_Order_Master_Delete=this.Permissions.Delete;
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

  this.Date_Check=false;
  this.Clr_Sales_Master();
  this.Clr_Sales_Details();
  this.Sales_Order_Print=true;
  this.Entry_View=false;

  if(this.quotationId >0){
    this.loadQuotation()
}

if(this.DeliveryOrderMaster_Id > 0)
{
    this.Load_Delivery_Order_Master()
}

if(this.Sales_Order_Master_Id > 0)
{
    this.Load_Order_SalesMaster()
}

if(this.PerformaInvoiceId >0){
    debugger
    this.loadPerformaInvoice()
}
}
Load_Company() 
  {   
  this.Sales_Master_Service_.Load_Company().subscribe(Rows => {    
  if (Rows != null) {
      debugger;
  this.Print_Company_ = Rows[0][0];   
  this.Company_ = Rows[0];
  this.Bank_ = Rows[1];
}
},
Rows => {
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
});
}

Load_InvoiceType() {        
    this.User_Details_Service_.Load_InvoiceType2().subscribe(Rows => {
        if (Rows != null) {
        this.AccounttypeData = Rows[0];        
        this.Accounttype_Temp.AccountType_Id = 0;
        this.Accounttype_Temp.AccountType_Name = "Select";
        this.AccounttypeData.unshift(this.Accounttype_Temp);
        this.Accounttype = this.AccounttypeData[0];
        this.searchAccountType=this.AccounttypeData[0];  
        }
    },
        Rows => {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}

  Load_Currency() {
    this.currencydetails_Service_.Load_currencydetails().subscribe(Rows => {
        if (Rows != null) {
            this.Currency_Data = Rows[0];        
            this.Currency_Temp.CurrencyDetails_Id = 0;
            this.Currency_Temp.CurrecnyName = "Select";
            this.Currency_Data.unshift(this.Currency_Temp);
            this.Currency = this.Currency_Data[0];
            this.Currency_Search = this.Currency_Data[0];
        }
    },
        Rows => {;
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

loadQuotation(){
    this.Entry_View = true;
    this.issLoading = true;
    this.salesquotationmaster_Service_.Get_salesquotationmaster (this.quotationId).subscribe(result=>
        {
            debugger;
        this.Sales_Order_Master_ = new sales_order_master();
        this.Sales_Order_Master_=Object.assign({},result[0][0]); 
        this.Sales_Order_Master_.Sales_Order_Master_Id = 0;
         this.Sales_Order_Master_.PaymentTermValue= result[0][0].PaymentTermValue;
         this.Sales_Order_Master_.Account_Party_Id=result[0][0].Account_Party_Id;
         this.Sales_Order_Master_.CurrencyId=result[0][0].CurrencyId;
         this.Sales_Order_Master_.Payment_Term_Description=result[0][0].Payment_Term_Description;
         this.Sales_Order_Master_.TypeId=result[0][0].TypeId;
        this.Sales_Order_Master_.LPONo=result[0][0].POnumber;   
        this.Sales_Order_Master_.PaymentTermValue=result[0][0].PaymentTermValue;
        this.Sales_Order_Master_.SalesQuotationMaster_Id=this.quotationId;
         this.Sales_Order_Master_.Payment_Term_Description=result[0][0].Payment_Term_Description;
         this.Sales_Order_Master_.CurrencyId=result[0][0].CurrencyId;
         this.Sales_Order_Master_.TypeId=result[0][0].TypeId;
         this.Sales_Order_Master_.Account_Party_Id=result[0][0].Account_Party_Id;
         this.Sales_Order_Master_.Customer_Name=result[0][0].Customer_Name;
        this.Sales_Order_Master_.VAT_percentage = result[0][0].VAT_Percentage;
        debugger;
        this.Customer_Temp.Client_Accounts_Id=result[0][0].Account_Party_Id;
        this.Customer_Temp.Client_Accounts_Name=result[0][0].Account_Party_Id.Customer;
        this.Customer_=this.Customer_Temp;

        this.Sales_Order_Master_.SupplyDate=new Date().toString();
        this.Sales_Order_Master_.SupplyPrintDate = this.Sales_Order_Master_.SupplyDate;
        this.Sales_Order_Master_.SupplyPrintDate = this.formatPrintDate(this.Sales_Order_Master_.SupplyPrintDate);
        this.Sales_Order_Master_.SupplyDate=this.formatDate(this.Sales_Order_Master_.SupplyDate);
        this.Sales_Order_Master_.EntryDate=new Date().toString();
        this.Sales_Order_Master_.EntryDate=this.formatDate(this.Sales_Order_Master_.EntryDate);   

        if(result[0][0].PaymentTermValue > 0 || result[0][0].PaymentTermValue != null || result[0][0].PaymentTermValue != undefined)
        {
            this.Sales_Order_Master_.DueDate = new Date(new Date().setDate(new Date().getDate() + result[0][0].PaymentTermValue)).toString();
            this.Sales_Order_Master_.DuePrintDate = this.Sales_Order_Master_.DueDate;
            this.Sales_Order_Master_.DuePrintDate = this.formatPrintDate(this.Sales_Order_Master_.DuePrintDate);
            this.Sales_Order_Master_.DueDate=this.formatDate(this.Sales_Order_Master_.DueDate);
        }
        else
        {
            this.Sales_Order_Master_.DueDate=new Date().toString();
            this.Sales_Order_Master_.DuePrintDate = this.Sales_Order_Master_.DueDate;
            this.Sales_Order_Master_.DuePrintDate = this.formatPrintDate(this.Sales_Order_Master_.DuePrintDate);
            this.Sales_Order_Master_.DueDate=this.formatDate(this.Sales_Order_Master_.DueDate);
        }   
        
        this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39',"").subscribe(Rows => {   
            if (Rows != null) {
                this.Customer_Data = Rows[0];
                for(let i=0;i<Rows[0].length;i++){
                    if(Rows[0][i].Client_Accounts_Id == result[0][0].Account_Party_Id){

                        this.Customer_Temp.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                        this.Customer_Temp.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                         this.Customer_= this.Customer_Temp;

                        this.Customer_  =Rows[0][i];
                        this.Customer_.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                        this.Customer_.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                        this.Customer_Name = Rows[0][i].Client_Accounts_Name;

                        this.Sales_Order_Master_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                        this.Sales_Order_Master_.Customer=Rows[0][i].Client_Accounts_Name;
                        this.Sales_Order_Master_.Customer_Name=Rows[0][i].Client_Accounts_Name;

                        this.Sales_Order_Master_.Address1 = Rows[0][i].Address1;
                        this.Sales_Order_Master_.Address2 = Rows[0][i].Address2;
                        this.Sales_Order_Master_.Address3 = Rows[0][i].Address3;
                        this.Sales_Order_Master_.Address4 = Rows[0][i].Address4;
                        this.Sales_Order_Master_.Vatin = Rows[0][i].GSTNo;     

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

    this.Sales_Master_Service_.Get_Quotation_Details(result[0][0].SalesQuotationMaster_Id).subscribe(Rows => {           
        if (Rows != null) {
            this.Sales_Order_Details_Data = Rows[0];
            this.Final_Amounts();
            // if( this.Sales_Details_Data.length>21){
            this.addBlankRows();//}         
            }                  
           },
         Rows => {
               
           const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });

        if(this.Currency_Data==undefined || this.Currency_Data==null)
        {
            this.currencydetails_Service_.Load_currencydetails().subscribe(Rows => {
                if (Rows != null) {
                    this.Currency_Data = Rows[0];   
                    this.Currency_Temp.CurrencyDetails_Id = 0;
                    this.Currency_Temp.CurrecnyName = "Select";
                    this.Currency_Data.unshift(this.Currency_Temp);
                    this.Currency = this.Currency_Data[0];
               
                    for(let i=0; i<this.Currency_Data.length;i++){
                        if(this.Currency_Data[i].CurrencyDetails_Id == this.Sales_Order_Master_.CurrencyId)
                        {
                            this.Currency = this.Currency_Data[i]
                        }
                    }
                }
            })
        }
        else{
            for(let i=0; i<this.Currency_Data.length;i++){
                if(this.Currency_Data[i].CurrencyDetails_Id == this.Sales_Order_Master_.CurrencyId)
                {
                    this.Currency = this.Currency_Data[i]
                }
            }
        }
        if(this.AccounttypeData==undefined || this.AccounttypeData==null)
        {
            this.User_Details_Service_.Load_InvoiceType2().subscribe(Rows => {
                if (Rows != null) {
                this.AccounttypeData = Rows[0]; 
                this.Accounttype_Temp.AccountType_Id = 0;
                this.Accounttype_Temp.AccountType_Name = "Select";
                this.AccounttypeData.unshift(this.Accounttype_Temp);
                this.Accounttype = this.AccounttypeData[0];
                
                for(let i=0; i<this.AccounttypeData.length; i++)
                    {
                        if(this.AccounttypeData[i].AccountType_Id == this.Sales_Order_Master_.TypeId)
                        {
                            this.Accounttype = this.AccounttypeData[i];
                        }
                    }  
                }       
              })
        }
        else{
            for(let i=0; i<this.AccounttypeData.length; i++)
            {
                if(this.AccounttypeData[i].AccountType_Id == this.Sales_Order_Master_.TypeId)
                {
                    this.Accounttype = this.AccounttypeData[i];
                }
            }  
        }       
           if(this.PaymentTerm_Data==undefined || this.PaymentTerm_Data==null)
           {
            this.payment_term_Service_.Load_Payment_Term().subscribe(Rows => {
                if (Rows != null) {
                    this.PaymentTerm_Data = Rows[0];
                    this.PaymentTerm_Temp.payment_Term_ID = 0;
                    this.PaymentTerm_Temp.Payment_Term_Description = "Select";
                    this.PaymentTerm_Data.unshift(this.PaymentTerm_Temp);
                    this.PaymentTerm = this.PaymentTerm_Data[0];
               
                    for(let i=0;i<this.PaymentTerm_Data.length;i++)
                        {
                        if(this.PaymentTerm_Data[i].payment_Term_ID == this.Sales_Order_Master_.Payment_Term_Description){
                            this.PaymentTerm = this.PaymentTerm_Data[i]
                        }
                    } 
                   }
            })
           }
           else{            
            for(let i=0;i<this.PaymentTerm_Data.length;i++)
                {
                if(this.PaymentTerm_Data[i].payment_Term_ID == this.Sales_Order_Master_.Payment_Term_Description){
                    this.PaymentTerm = this.PaymentTerm_Data[i]
                }
            } 
        }          
    })

    this.issLoading = false;    
}

loadPerformaInvoice(){
    this.Entry_View = true;
    this.issLoading = true;
    debugger
    this.salesquotationmaster_Service_.Get_salesPerformaInvoicemaster(this.PerformaInvoiceId).subscribe(result=>{      
        debugger
        this.Sales_Order_Master_= new sales_order_master();
        this.Sales_Order_Master_=Object.assign({},result[0][0]); 
        this.Sales_Order_Master_.Sales_Order_Master_Id = 0;
        this.Sales_Order_Master_.LPONo=result[0][0].POnumber;   
        this.Sales_Order_Master_.PaymentTermValue=result[0][0].PaymentTermValue;
        this.Sales_Order_Master_.SalesQuotationMaster_Id=result[0][0].SalesQuotationMaster_Id;
        this.Sales_Order_Master_.PerformaInvoiceMaster_Id=this.PerformaInvoiceId;
         this.Sales_Order_Master_.Payment_Term_Description=result[0][0].Payment_Term_Description;
         this.Sales_Order_Master_.CurrencyId=result[0][0].CurrencyId;
         this.Sales_Order_Master_.TypeId=result[0][0].TypeId;
         this.Sales_Order_Master_.Account_Party_Id=result[0][0].Account_Party_Id;
         this.Sales_Order_Master_.Customer_Name=result[0][0].Customer_Name;
         this.Sales_Order_Master_.VAT_percentage=result[0][0].VAT_Percentage;

        this.Customer_Temp.Client_Accounts_Id=this.Sales_Order_Master_.Account_Party_Id;
        this.Customer_Temp.Client_Accounts_Name=this.Sales_Order_Master_.Customer;
        this.Customer_=this.Customer_Temp;

        this.Customer_.Client_Accounts_Id=this.Sales_Order_Master_.Account_Party_Id;
        this.Customer_.Client_Accounts_Name=this.Sales_Order_Master_.Customer;

        this.Sales_Order_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
        this.Sales_Order_Master_.Customer=this.Sales_Order_Master_.Customer_Name; 
        this.Sales_Order_Master_.Employee = result[0][0].PreparedBy;
        this.Sales_Order_Master_.SupplyDate=new Date().toString();
        this.Sales_Order_Master_.SupplyPrintDate = this.Sales_Order_Master_.SupplyDate;
        this.Sales_Order_Master_.SupplyPrintDate = this.formatPrintDate(this.Sales_Order_Master_.SupplyPrintDate);
        this.Sales_Order_Master_.SupplyDate=this.formatDate(this.Sales_Order_Master_.SupplyDate);
        this.Sales_Order_Master_.EntryDate=new Date().toString();
        this.Sales_Order_Master_.EntryDate=this.formatDate(this.Sales_Order_Master_.EntryDate);   
        debugger

        if(result[0][0].PaymentTermValue > 0 || result[0][0].PaymentTermValue != null || result[0][0].PaymentTermValue != undefined)
            {
                this.Sales_Order_Master_.DueDate = new Date(new Date().setDate(new Date().getDate() + result[0][0].PaymentTermValue)).toString();
                this.Sales_Order_Master_.DuePrintDate = this.Sales_Order_Master_.DueDate;
                this.Sales_Order_Master_.DuePrintDate = this.formatPrintDate(this.Sales_Order_Master_.DuePrintDate);    
                this.Sales_Order_Master_.DueDate=this.formatDate(this.Sales_Order_Master_.DueDate);
            }
            else
            {
                this.Sales_Order_Master_.DueDate=new Date().toString();
                this.Sales_Order_Master_.DuePrintDate = this.Sales_Order_Master_.DueDate;
                this.Sales_Order_Master_.DuePrintDate = this.formatPrintDate(this.Sales_Order_Master_.DuePrintDate);    
                this.Sales_Order_Master_.DueDate=this.formatDate(this.Sales_Order_Master_.DueDate);
            }      

            // this.Client_Accounts_Service_.Get_Client_Accounts(this.Sales_Master_.Account_Party_Id).subscribe((result)=>{
            //     if(result!=null)
            //     {
            //         debugger
            //                 this.Customer_Temp.Client_Accounts_Id=result[0][0].Client_Accounts_Id;
            //                 this.Customer_Temp.Client_Accounts_Name=result[0][0].Client_Accounts_Name;
            //                 this.Customer_= this.Customer_Temp;
                           
            //                 this.Address1 = result[0][0].Address1;
            //                 this.Address2 = result[0][0].Address2;
            //                 this.Address3 = result[0][0].Address3;
            //                 this.Address4 = result[0][0].Address4;
            //                 this.Vatin = result[0][0].GSTNo;
            //     }
            // });
  
        this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39',"").subscribe(Rows => {           
            if (Rows != null) {
                this.Customer_Data = Rows[0];
                for(let i=0;i<Rows[0].length;i++){
                    if(Rows[0][i].Client_Accounts_Id == result[0][0].Account_Party_Id){
                        this.Customer_Temp.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                        this.Customer_Temp.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                         this.Customer_= this.Customer_Temp;

                        this.Customer_  =Rows[0][i];
                        this.Customer_.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                        this.Customer_.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                        this.Customer_Name = Rows[0][i].Client_Accounts_Name;

                        this.Sales_Order_Master_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                        this.Sales_Order_Master_.Customer=Rows[0][i].Client_Accounts_Name;
                        this.Sales_Order_Master_.Customer_Name=Rows[0][i].Client_Accounts_Name;

                        this.Sales_Order_Master_.Address1 = Rows[0][i].Address1;
                        this.Sales_Order_Master_.Address2 = Rows[0][i].Address2;
                        this.Sales_Order_Master_.Address3 = Rows[0][i].Address3;
                        this.Sales_Order_Master_.Address4 = Rows[0][i].Address4;
                        this.Sales_Order_Master_.Vatin = Rows[0][i].GSTNo;     

                        this.Address1 = Rows[0][i].Address1;
                        this.Address2 = Rows[0][i].Address2;
                        this.Address3 = Rows[0][i].Address3;
                        this.Address4 = Rows[0][i].Address4;
                        this.Vatin = Rows[0][i].GSTNo;               
                    }
                }
            }
        },);

            debugger
            this.Sales_Master_Service_.Get_Performa_invoice_Details(result[0][0].PerformaInvoiceMaster_Id).subscribe(Rows => { 
                debugger
                    if (Rows != null) {
                    this.Sales_Order_Details_Data = Rows[0];
                    this.Final_Amounts();
                    // if( this.Sales_Details_Data.length>21)
                    // {
                    this.addBlankRows();//}            
                    }                       
                   },
                 Rows => {                      
                   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                });
        
                if(this.Currency_Data==undefined || this.Currency_Data==null)
                    {
                        this.currencydetails_Service_.Load_currencydetails().subscribe(Rows => {
                            if (Rows != null) {
                                this.Currency_Data = Rows[0];        
                                this.Currency_Temp.CurrencyDetails_Id = 0;
                                this.Currency_Temp.CurrecnyName = "Select";
                                this.Currency_Data.unshift(this.Currency_Temp);
                                this.Currency = this.Currency_Data[0];
               
                                for(let i=0; i<this.Currency_Data.length;i++){
                                    if(this.Currency_Data[i].CurrencyDetails_Id == this.Sales_Order_Master_.CurrencyId)
                                    {
                                        this.Currency = this.Currency_Data[i]
                                    }
                                }
                            }
                        })
                    }
                    else{
                        for(let i=0; i<this.Currency_Data.length;i++){
                            if(this.Currency_Data[i].CurrencyDetails_Id == this.Sales_Order_Master_.CurrencyId)
                            {
                                this.Currency = this.Currency_Data[i]
                            }
                        }
                    }
                    if(this.AccounttypeData==undefined || this.AccounttypeData==null)
                    {
                        this.User_Details_Service_.Load_InvoiceType2().subscribe(Rows => {
                            if (Rows != null) {
                            this.AccounttypeData = Rows[0]; 
                            this.Accounttype_Temp.AccountType_Id = 0;
                            this.Accounttype_Temp.AccountType_Name = "Select";
                            this.AccounttypeData.unshift(this.Accounttype_Temp);
                            this.Accounttype = this.AccounttypeData[0];
                            
                            for(let i=0; i<this.AccounttypeData.length; i++)
                                {
                                    if(this.AccounttypeData[i].AccountType_Id == this.Sales_Order_Master_.TypeId)
                                    {
                                        this.Accounttype = this.AccounttypeData[i];
                                    }
                                }  
                            }       
                          })
                    }
                    else{
                        for(let i=0; i<this.AccounttypeData.length; i++)
                        {
                            if(this.AccounttypeData[i].AccountType_Id == this.Sales_Order_Master_.TypeId)
                            {
                                this.Accounttype = this.AccounttypeData[i];
                            }
                        }  
                    }       
                       if(this.PaymentTerm_Data==undefined || this.PaymentTerm_Data==null)
                       {
                        this.payment_term_Service_.Load_Payment_Term().subscribe(Rows => {
                            if (Rows != null) {
                                this.PaymentTerm_Data = Rows[0];
                                this.PaymentTerm_Temp.payment_Term_ID = 0;
                                this.PaymentTerm_Temp.Payment_Term_Description = "Select";
                                this.PaymentTerm_Data.unshift(this.PaymentTerm_Temp);
                                this.PaymentTerm = this.PaymentTerm_Data[0];
                           
                                for(let i=0;i<this.PaymentTerm_Data.length;i++)
                                    {
                                    if(this.PaymentTerm_Data[i].payment_Term_ID == this.Sales_Order_Master_.Payment_Term_Description){
                                        this.PaymentTerm = this.PaymentTerm_Data[i]
                                    }
                                } 
                               }
                        })
                       }
                       else{            
                        for(let i=0;i<this.PaymentTerm_Data.length;i++)
                            {
                            if(this.PaymentTerm_Data[i].payment_Term_ID == this.Sales_Order_Master_.Payment_Term_Description){
                                this.PaymentTerm = this.PaymentTerm_Data[i]
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
  this.Sales_Order_Print=true;
  this.Clr_Sales_Master();
  this.Clr_Sales_Details();
  this.Sales_Order_Details_Data=[];
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
  this.Edit_Sales=0;
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
  this.Sales_Order_Details_Data=[];
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
    this.Sales_Order_Master_.EntryDate=this.formatDate(this.Sales_Order_Master_.EntryDate);
    this.Sales_Order_Master_.PrintDate = this.formatPrintDate(this.Sales_Order_Master_.EntryDate);

    this.Sales_Order_Master_.DueDate=this.formatDate(this.Sales_Order_Master_.DueDate);
    this.Sales_Order_Master_.SupplyDate=this.formatDate(this.Sales_Order_Master_.SupplyDate);

    debugger;
    // for (let i = 0; i < this.Currency_Data.length; i++) {
    //     if(this.Sales_Master_.CurrencyId = this.Currency_Data[i].CurrencyDetails_Id){
    //         this.currencyName = this.Currency_Data[i].CurrecnyName
    //     }
        
    //    }
    // for (let i = 0; i < this.AccounttypeData.length; i++) {
    //     if(this.Sales_Master_.TypeId = this.AccounttypeData[i].AccountType_Id){
    //         this.invoiceTypeName = this.AccounttypeData[i].AccountType_Name
    //     }
        
    //    }
 //this.Load_Company() ;   
  // this.Image_Url='/assets/img/'+this.Print_Company_.Company_Id+'.jpg';
  // this.Company_Sign='/assets/img/Sign_'+this.Print_Company_.Company_Id+'.jpg';
  // this.Company_Seal='/assets/img/Seal_'+this.Print_Company_.Company_Id+'.jpg';  

  this.printChargeAmount1 = false;
  this.printChargeAmount2 = false;
  this.printCharge1per = false;
  this.printVAT_Amount = false;
  this.printDiscount_Description = false;
  this.printAdditional_Discount = false;
  this.printRoundoff_Amt = false;
debugger;
  if (this.Sales_Order_Master_.Charge1per != '')
    if (this.Sales_Order_Master_.Charge1per != null)
        if (this.Sales_Order_Master_.Charge1per != undefined)
            if (this.Sales_Order_Master_.Charge1per.toString() != '0')
                if (this.Sales_Order_Master_.Charge1per.toString() != 'null')
                    if (this.Sales_Order_Master_.Charge1per.toString() != 'undefined') 
                        if (this.Sales_Order_Master_.Charge1per.toString() != '0.000')
                            if (this.Sales_Order_Master_.Charge1per.toString()!='0.00')
                        {
                        this.printCharge1per = true;
                    }
                    else
                    {
                        this.printCharge1per=false;}


if (this.Sales_Order_Master_.charge1_Amount != 0)
    if (this.Sales_Order_Master_.charge1_Amount != null)
        if (this.Sales_Order_Master_.charge1_Amount != undefined)
            if (this.Sales_Order_Master_.charge1_Amount.toString() != '0')
                if (this.Sales_Order_Master_.charge1_Amount.toString() != 'null')
                    if (this.Sales_Order_Master_.charge1_Amount.toString() != 'undefined')
                        if (this.Sales_Order_Master_.charge1_Amount.toString() != '0.000') 
                             if (this.Sales_Order_Master_.charge1_Amount.toString() != '0.00') 
                            {
                            this.printChargeAmount1 = true;
                        }



debugger;
if (this.Sales_Order_Master_.charge2_Amount != 0)
    if (this.Sales_Order_Master_.charge2_Amount != null)
        if (this.Sales_Order_Master_.charge2_Amount != undefined)
            if (this.Sales_Order_Master_.charge2_Amount.toString() != '0')
                if (this.Sales_Order_Master_.charge2_Amount.toString() != 'null')
                    if (this.Sales_Order_Master_.charge2_Amount.toString() != 'undefined')
                        if (this.Sales_Order_Master_.charge2_Amount.toString() != '0.000') 
                             if (this.Sales_Order_Master_.charge2_Amount.toString() != '0.00') 
                            {
                            this.printChargeAmount2 = true;
                        }


debugger;
if (this.Sales_Order_Master_.VAT_Amount != 0)
    if (this.Sales_Order_Master_.VAT_Amount != null)
        if (this.Sales_Order_Master_.VAT_Amount != undefined)
            if (this.Sales_Order_Master_.VAT_Amount.toString() != '0')
                if (this.Sales_Order_Master_.VAT_Amount.toString() != 'null')
                    if (this.Sales_Order_Master_.VAT_Amount.toString() != 'undefined')
                            if (this.Sales_Order_Master_.VAT_Amount.toString() != '0.000') 
                             if (this.Sales_Order_Master_.VAT_Amount.toString() != '0.00') 
                         {
                        this.printVAT_Amount = true;
                    }

if (this.Sales_Order_Master_.Discount_Description != '')
    if (this.Sales_Order_Master_.Discount_Description != null)
        if (this.Sales_Order_Master_.Discount_Description != undefined)
            if (this.Sales_Order_Master_.Discount_Description.toString() != '0')
                if (this.Sales_Order_Master_.Discount_Description.toString() != 'null')
                    if (this.Sales_Order_Master_.Discount_Description.toString() != 'undefined') 
                          if (this.Sales_Order_Master_.Discount_Description.toString() != '0.000') 
                             if (this.Sales_Order_Master_.Discount_Description.toString() != '0.00') 
                        {
                        this.printDiscount_Description = true;
                    }


if (this.Sales_Order_Master_.Additional_Discount != 0)
    if (this.Sales_Order_Master_.Additional_Discount != null)
        if (this.Sales_Order_Master_.Additional_Discount != undefined)
            if (this.Sales_Order_Master_.Additional_Discount.toString() != '0')
                if (this.Sales_Order_Master_.Additional_Discount.toString() != 'null')
                    if (this.Sales_Order_Master_.Additional_Discount.toString() != 'undefined') 
                          if (this.Sales_Order_Master_.Additional_Discount.toString() != '0.000') 
                             if (this.Sales_Order_Master_.Additional_Discount.toString() != '0.00') 
                        {
                        this.printAdditional_Discount = true;
                    }

if (this.Sales_Order_Master_.Roundoff_Amt != 0)
    if (this.Sales_Order_Master_.Roundoff_Amt != null)
        if (this.Sales_Order_Master_.Roundoff_Amt != undefined)
            if (this.Sales_Order_Master_.Roundoff_Amt.toString() != '0')
                if (this.Sales_Order_Master_.Roundoff_Amt.toString() != 'null')
                    if (this.Sales_Order_Master_.Roundoff_Amt.toString() != 'undefined') 
                         if (this.Sales_Order_Master_.Roundoff_Amt.toString() != '0.000') 
                             if (this.Sales_Order_Master_.Roundoff_Amt.toString() != '0.00') 
                        {
                        this.printRoundoff_Amt = true;
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
  this.Sales_Order_Master_.Sales_Order_Master_Id=0;
  this.Sales_Order_Master_.Account_Party_Id=0;
  this.Sales_Order_Master_.User_Id=0;
  this.Sales_Order_Master_.EntryDate=new Date().toString();
  this.Sales_Order_Master_.EntryDate=this.formatDate(this.Sales_Order_Master_.EntryDate);
  this.Sales_Order_Master_.SupplyDate=new Date().toString();
  this.Sales_Order_Master_.SupplyDate=this.formatDate(this.Sales_Order_Master_.SupplyDate);
  this.Sales_Order_Master_.PaymentTermValue = 0;
  this.Sales_Order_Master_.DueDate=new Date().toString();
  this.Sales_Order_Master_.DueDate=this.formatDate(this.Sales_Order_Master_.DueDate);
  this.Sales_Order_Master_.Invoice_No="";
  this.Sales_Order_Master_.CurrencyId=0;
  this.Sales_Order_Master_.LPONo="";
  this.Sales_Order_Master_.DONo="";
  this.Sales_Order_Master_.Charge1="";
  this.Sales_Order_Master_.PaymentTerms = null;
  this.Sales_Order_Master_.Payment_Term_Description = null;
  this.Sales_Order_Master_.PackingListNumber = null;
  this.Sales_Order_Master_.Description1 = "";
  this.Sales_Order_Master_.Discount_Description = null;
  this.Sales_Order_Master_.Charge1per = null;
  this.Sales_Order_Master_.Charge2 = "";
  this.Sales_Order_Master_.VAT_percentage = null;
  this.SalesQuotationMaster_Id = 0;
  this.Sales_Order_Master_.SalesQuotationMaster_Id = 0;
  this.Sales_Order_Master_.Additional_Discount = null;
  this.Sales_Order_Master_.charge1_Amount = null;
  this.Sales_Order_Master_.charge2_Amount = null;
  this.Sales_Order_Master_.TotalDiscount = null
  this.Sales_Order_Master_.VAT_Amount = null;
  this.Sales_Order_Master_.Total_Amount = null;
  this.Sales_Order_Master_.Roundoff_Amt = null;
  this.Sales_Order_Master_.Amount_In_Words = "";
  this.Sales_Order_Master_.NetTotal=null;
  this.Sales_Order_Master_.Cess=0;
  this.Sales_Order_Master_.RoundOff=null;
  this.Sales_Order_Master_.TotalAmount=0;
  this.Sales_Order_Master_.Description2="";
  this.Sales_Order_Master_.Address1="";
  this.Sales_Order_Master_.Address2="";
  this.Sales_Order_Master_.Address3="";
  this.Sales_Order_Master_.Address4="";
  this.Sales_Order_Master_.Mobile="";
  this.Sales_Order_Master_.Customer_Name="";
  this.Sales_Order_Master_.Employee="";
  this.Sales_Order_Master_.KindAttend="";    
  this.Sales_Order_Master_.GrandTotal=null;
  this.Sales_Order_Master_.Transportation_Gst=0;
  this.Sales_Order_Master_.Handling_Gst=0;
  this.Sales_Order_Master_.Transportation_Total=0;
  this.Sales_Order_Master_.Handling_Total=0;
  this.Sales_Order_Master_.Vehicle_No="";
  this.Sales_Order_Master_.Driver_Name="";
  this.Sales_Order_Master_.Mobile_No = "";
  this.Sales_Order_Master_.Delivery_Address1 = "";
  this.Sales_Order_Master_.Delivery_Address2 = "";
  this.Sales_Order_Master_.Delivery_Address3 = "";
  this.Sales_Order_Master_.Delivery_Address4 = "";
  this.Sales_Order_Master_.GSTNo = "";
  if(this.Bill_Type_Data!=undefined && this.Bill_Type_Data!=null)
  this.Bill_Type_=this.Bill_Type_Data[1];
  if(this.Bill_Mode_Data!=undefined && this.Bill_Mode_Data!=null)
  this.Bill_Mode_=this.Bill_Mode_Data[0];
  this.Customer_=null;
  this.Sales_Order_Details_Data=[];
  this.Customer_Name = null;
  this.Address1 = null;
  this.Address2 = null;
  this.Address3 = null;
  this.Address4 = null;
  // this.Sales_Master_.POnumber = null;
  this.Attention = null;
  this.Employee = null;
  this.Tot_Amount = null;
  this.Vatin = null;

  this.Total = 0;

  this.Sales_Order_Master_.VAT_percentage = this.Default_Vat_Percentage;

  if(this.Currency_Data != null || this.Currency_Data != undefined)
  {
    this.Currency = this.Currency_Data[0];
  }

  if(this.AccounttypeData != null || this.AccounttypeData != undefined)
    {
      this.Accounttype = this.AccounttypeData[0];
    }

  if(this.PaymentTerm_Data != null || this.PaymentTerm_Data != undefined)
  {
    this.PaymentTerm = this.PaymentTerm_Data[0];
  }

}
Clr_Sales_Details()
{
  this.Sales_Order_Details_Index=-1;
  this.Sales_Order_Details_.Sales_Order_Details_Id=0;
  this.Sales_Order_Details_.Sales_Order_Master_Id=0;
  this.Sales_Order_Details_.Stock_Id=0;
  this.Sales_Order_Details_.ItemId=0;
  this.Sales_Order_Details_.ItemName="";
  this.Sales_Order_Details_.ItemCode="";
  this.Sales_Order_Details_.GroupId=0;
  this.Sales_Order_Details_.GroupName="";
  this.Sales_Order_Details_.UnitId=0;
  this.Sales_Order_Details_.UnitName="";
  this.Sales_Order_Details_.PurchaseRate=0;
  this.Sales_Order_Details_.SaleRate=0;
  this.Sales_Order_Details_.MRP=0;
  this.Sales_Order_Details_.TaxAmount=0;
  this.Sales_Order_Details_.Stock=0;
  this.Sales_Order_Details_.HSNCODE="";
  this.Sales_Order_Details_.SaleTax=0;
  this.Sales_Order_Details_.Quantity=0;
  this.Sales_Order_Details_.Discount=0;
  this.Sales_Order_Details_.NetValue=0;
  this.Sales_Order_Details_.Description="";
  this.Barcode_=null;
  this.ItemCodeData =null;
  this.Stock_=null;
  this.UnitName = null;
  this.Quantity = null;
  this.Sales_Order_Details_.UnitPrice = 0;
  this.discount = null;
  this.Sales_Order_Details_.Unit_Discount = 0;
  this.TotalAmount = null;
  this.availablity = null;
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
  this.Sales_Order_Details_Description="";
}
Delete_Sales_Details(Sales_Details_e:sales_order_details,index)
{
     
  this.Sales_Order_Details_Data.splice(index, 1);   
  this.Final_Amounts();
this.Clr_Sales_Edit_Data();
}
Change_Bill_Status(Sales_Order_Master_Id,BillType,index)
{
 const dialogRef = this.dialogBox.open
 ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Are you sure to Change the Status?',Type:"true",Heading:'Confirm'}});
 dialogRef.afterClosed().subscribe(result =>
 {
 if(result=='Yes')
 {
 this.issLoading=true;   
 this.Sales_Master_Service_.Change_Bill_Status(Sales_Order_Master_Id,BillType).subscribe(Status => {       
  Status=Status[0];
 if(Status[0].Sales_Master_Id_>0){
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Status Changed',Type:"false"}});
 }
 else
 {
 //this.Sales_Master_Data.splice(index, 1);
 const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"false"}});
 }
 this.Search_Sales();
 this.issLoading=false;
 },
 Rows => {
     this.issLoading=false;
 const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error',Type:"2"}});
 });
 }
 });
}


Delete_Sales_Order_Master(Sales_Order_Master_Id,index)
{
  const dialogRef = this.dialogBox.open
  ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
  dialogRef.afterClosed().subscribe(result =>        
  {    
  if(result=='Yes')
  {
  this.issLoading=true;
  debugger
  this.Sales_Master_Service_.Delete_Sales_Master(Sales_Order_Master_Id).subscribe(Delete_status => {    
      debugger   
      Delete_status=Delete_status[0];
  if(Delete_status[0].Sales_Master_Id_>0){
  this.Sales_Order_Master_Data.splice(index, 1);
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
    
    this.Search_Sales();
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
   var Value = "";
   
   Value = event.target.value;
     
    this.issLoading = true;
   this.Sales_Master_Service_.Get_Stock_Item_Code_Typeahead(Value).subscribe(Rows => {     
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
    this.Barcode_ = new Stock();

  if (event.target.value == "") Value = "";
  else Value = event.target.value.toLowerCase();

  if(this.Barcode_.Item_Code)
    {
        this.Barcode_.ItemName=Value
    }

  this.Sales_Order_Details_.ItemName=Value;


          this.issLoading = true;
          debugger;
  this.Sales_Master_Service_.Search_Item_Typeahead(Value).subscribe(Rows => {
debugger;
      if (Rows != null) {
          this.Stock_Data = Rows[0];
          console.log('this.Stock_Data: ', this.Stock_Data);
        //   this.Stock_Data_Filter = [];

        //   for (var i = 0; i < this.Stock_Data.length; i++) {
        //       if (
        //           this.Stock_Data[i].ItemName.toLowerCase().includes(Value)
        //       )
        //           this.Stock_Data_Filter.push(this.Stock_Data[i]);
        //   }
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
Customer_Change( Customer_T_)
{
    this.Customer_=Customer_T_;    
    this.Sales_Order_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.Sales_Order_Master_.Customer=this.Customer_.Client_Accounts_Name;
    this.Sales_Order_Master_.Account_Party_Id=this.Customer_.Client_Accounts_Id;

    this.Sales_Order_Master_.Address1 = this.Customer_.Address1;
    this.Sales_Order_Master_.Address2 = this.Customer_.Address2;
    this.Sales_Order_Master_.Address3 = this.Customer_.Address3;
    this.Sales_Order_Master_.Address4 = this.Customer_.Address4;
    this.Sales_Order_Master_.Mobile = this.Customer_.Mobile;
    this.Sales_Order_Master_.PinCode=this.Customer_.PinCode;
    this.Sales_Order_Master_.GSTNo=this.Customer_.GSTNo;
    this.Customer_Name = this.Sales_Order_Master_.Customer_Name;

    this.Address1 = this.Sales_Order_Master_.Address1;
    this.Address2 = this.Sales_Order_Master_.Address2;
    this.Address3 = this.Sales_Order_Master_.Address3;
    this.Address4 = this.Sales_Order_Master_.Address4;
    this.Vatin = this.Sales_Order_Master_.GSTNo;
}

selectCustomer(){
    this.Sales_Order_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.Sales_Order_Master_.Customer=this.Customer_.Client_Accounts_Name;
    this.Sales_Order_Master_.Account_Party_Id=this.Customer_.Client_Accounts_Id;

    this.Sales_Order_Master_.Address1 = this.Customer_.Address1;
    this.Sales_Order_Master_.Address2 = this.Customer_.Address2;
    this.Sales_Order_Master_.Address3 = this.Customer_.Address3;
    this.Sales_Order_Master_.Address4 = this.Customer_.Address4;
    this.Sales_Order_Master_.Mobile = this.Customer_.Mobile;
    this.Sales_Order_Master_.PinCode=this.Customer_.PinCode;
    this.Sales_Order_Master_.GSTNo=this.Customer_.GSTNo;
    this.Customer_Name = this.Sales_Order_Master_.Customer_Name;

    this.Address1 = this.Customer_.Address1;
    this.Address2 = this.Customer_.Address2;
    this.Address3 = this.Customer_.Address3;
    this.Address4 = this.Customer_.Address4;
    this.Vatin = this.Customer_.GSTNo;
  
}
Item_Name_Change(Item_sl:Stock){
  debugger;
  

  this.Barcode_Temp.Stock_Id=Item_sl.Stock_Id;
  this.Barcode_Temp.ItemId =Item_sl.ItemId;
  this.Barcode_Temp.ItemName =Item_sl.ItemName;
  this.Barcode_Temp.ItemCode =Item_sl.Item_Code
  this.Barcode_Temp.Item_Code =Item_sl.Item_Code
  this.Barcode_=Object.assign({},this.Barcode_Temp);
  console.log('this.Barcode_: ', this.Barcode_);

  this.Sales_Order_Details_.ItemId=Item_sl.ItemId;
  this.Sales_Order_Details_.ItemCode=Item_sl.Item_Code;

  this.Sales_Order_Details_.ItemName=Item_sl.ItemName;
  this.Sales_Order_Details_.UnitId=Item_sl.UnitId;
  this.Sales_Order_Details_.UnitName=Item_sl.UnitName;
  this.Sales_Order_Details_.MRP=Item_sl.MRP;
  this.Sales_Order_Details_.PurchaseRate=Item_sl.PurchaseRate;

  this.Sales_Order_Details_.GroupId=Item_sl.GroupId;
  this.Sales_Order_Details_.GroupName=Item_sl.GroupName;
  this.Sales_Order_Details_.HSNMasterId=Item_sl.HSNMasterId;
  this.Sales_Order_Details_.HSNCODE=Item_sl.HSNCODE;
  this.Sales_Order_Details_.Stock_Id=Item_sl.Stock_Id;
  this.Sales_Order_Details_.SaleTax=Item_sl.SaleTax; 
  this.Sales_Order_Details_.Quantity=0;
}
Barcode_Change()
{
  this.Stock_Temp.ItemId=this.Barcode_.ItemId;
  this.Stock_Temp.ItemName=this.Barcode_.ItemName;
  this.Stock_=Object.assign({},this.Stock_Temp);
  this.Sales_Order_Details_.ItemId=this.Barcode_.ItemId;
  this.Sales_Order_Details_.ItemName=this.Barcode_.ItemName;
  this.Sales_Order_Details_.UnitId=this.Barcode_.UnitId;
  this.Sales_Order_Details_.UnitName=this.Barcode_.UnitName;
  this.Sales_Order_Details_.MRP=this.Barcode_.MRP;
  this.Sales_Order_Details_.PurchaseRate=this.Barcode_.PurchaseRate;
  this.Sales_Order_Details_.Stock=this.Barcode_.Quantity;
  this.Sales_Order_Details_.SaleRate=this.Barcode_.SaleRate;
  this.Sales_Order_Details_.ItemName=this.Barcode_.ItemName;
  this.Sales_Order_Details_.GroupId=this.Barcode_.GroupId;
  this.Sales_Order_Details_.GroupName=this.Barcode_.GroupName;
  this.Sales_Order_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
  this.Sales_Order_Details_.HSNCODE=this.Barcode_.HSNCODE;
  this.Sales_Order_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
  this.Sales_Order_Details_.Stock_Id=this.Barcode_.Stock_Id;
  this.Sales_Order_Details_.SaleTax=this.Barcode_.SaleTax;
  this.Sales_Order_Details_.Quantity=0;
}
Calculate_Sales_Details_Amount()
{
  debugger
  if(this.Sales_Order_Details_.Quantity == undefined || this.Sales_Order_Details_.Quantity == null)
  this.Sales_Order_Details_.Quantity = 0;
  if(this.Sales_Order_Details_.SaleRate == undefined || this.Sales_Order_Details_.SaleRate == null)
  this.Sales_Order_Details_.SaleRate = 0;
  debugger
this.Calculate_Total_Amount();
}
Calculate_Total_Amount()
{ 
    debugger
if(this.Sales_Order_Details_.Discount == undefined || this.Sales_Order_Details_.Discount == null)
    this.Sales_Order_Details_.Discount = 0;
if(this.Sales_Order_Details_.Item_Discount_Amount == undefined || this.Sales_Order_Details_.Item_Discount_Amount == null)
    this.Sales_Order_Details_.Item_Discount_Amount = 0;
if(this.Sales_Order_Details_.Discount==undefined)
    this.Sales_Order_Details_.Discount=0;
this.Sales_Order_Details_.Unit_Discount = (Number(this.Sales_Order_Details_.UnitPrice) * Number(this.Sales_Order_Details_.Discount))/ 100;
this.Sales_Order_Details_.Unit_Discount = Number(this.Sales_Order_Details_.Unit_Discount.toFixed(3));

this.Sales_Order_Details_.Item_Discount_Amount =Number(this.Sales_Order_Details_.Unit_Discount) * Number(this.Sales_Order_Details_.Quantity);
this.Sales_Order_Details_.Item_Discount_Amount = Number(this.Sales_Order_Details_.Item_Discount_Amount.toFixed(3));

this.Sales_Order_Details_.Amount = Number(this.Sales_Order_Details_.Quantity) * Number(this.Sales_Order_Details_.UnitPrice);
this.Sales_Order_Details_.Amount =Number(this.Sales_Order_Details_.Amount.toFixed(3));

 this.Sales_Order_Details_.TaxableAmount = Number(this.Sales_Order_Details_.Amount) - Number(this.Sales_Order_Details_.Item_Discount_Amount);
 this.Sales_Order_Details_.TaxableAmount =Number(this.Sales_Order_Details_.TaxableAmount.toFixed(3));
if(this.Sales_Order_Details_.SaleTax==undefined || this.Stock_.SaleTax==null)
    this.Sales_Order_Details_.SaleTax=0;
this.Sales_Order_Details_.TaxAmount = Number(this.Sales_Order_Details_.TaxableAmount) * Number(this.Sales_Order_Details_.SaleTax) /100;
this.Sales_Order_Details_.NetValue= Number(this.Sales_Order_Details_.TaxableAmount) + Number(this.Sales_Order_Details_.TaxAmount);

this.Sales_Order_Details_.Item_Discount_Amount=Number(this.Sales_Order_Details_.Item_Discount_Amount.toFixed(3));    
this.Sales_Order_Details_.Amount=Number(this.Sales_Order_Details_.Amount.toFixed(3));    
this.Sales_Order_Details_.TaxableAmount=Number(this.Sales_Order_Details_.TaxableAmount.toFixed(3));
this.Sales_Order_Details_.TaxAmount=Number(this.Sales_Order_Details_.TaxAmount.toFixed(3));  
this.Sales_Order_Details_.NetValue= Number(this.Sales_Order_Details_.NetValue.toFixed(3));
  
}
Round_Off_Calculation()
{   
  if(this.Sales_Order_Master_.RoundOff == undefined || this.Sales_Order_Master_.RoundOff == null)
      this.Sales_Order_Master_.RoundOff = 0;   
  this.Sales_Order_Master_.GrandTotal = Number(this.Sales_Order_Master_.RoundOff) + Number(this.Sales_Order_Master_.TotalAmount);
}
checkbox_Click()
{ 
  this.Final_Amounts();
}

safeNumber(value) {
  return isNaN(value) ? 0 : value;
}


Manual_Roundoff_Calculation()
{
  var Point_=0.50;
  this.roundoff_value=0;
  this.roundoff_value=this.Sales_Order_Master_.TotalAmount-(Math.round(this.Sales_Order_Master_.TotalAmount));
  if(this.roundoff_value<Number(Point_))
  this.roundoff_value=- this.roundoff_value;
  this.Sales_Order_Master_.RoundOff=Number(this.roundoff_value);
  this.Sales_Order_Master_.RoundOff=Number(this.Sales_Order_Master_.RoundOff.toFixed(3));
  this.Sales_Order_Master_.TotalAmount= Number(this.Sales_Order_Master_.TotalAmount.toFixed(3));
}
Calculation_GSt()
{
  if(this.Sales_Order_Master_.Isgst==true)
  {
      this.Sales_Order_Master_.Transportation_Gst = Number(this.Sales_Order_Master_.Transportation_Charge) * (18 / 100)
      this.Sales_Order_Master_.Transportation_Total = Number(this.Sales_Order_Master_.Transportation_Charge) + Number(this.Sales_Order_Master_.Transportation_Gst) ;
      this.Sales_Order_Master_.Handling_Gst = (this.Sales_Order_Master_.Handling_Charge) * (18 / 100)
      this.Sales_Order_Master_.Handling_Total = Number(this.Sales_Order_Master_.Handling_Charge) + Number(this.Sales_Order_Master_.Handling_Gst);
 }
}
Search_Sales()
{
  var look_In_Date_Value=0,CustomerId_=0,Item_Group_Id_=0,CurrencyDetails_Id_=0,User_Details_Id_ = 0, AccountType_Id_ = 0;
  this.Sales_Order_Master_Total_Amount=0;    
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

  //if(this.Employee_Search.User_Details_Id==null || this.Employee_Search.User_Details_Id==undefined)
      User_Details_Id_=0;
  //else
      //User_Details_Id_=this.Employee_Search.User_Details_Id;
  
  this.issLoading=true;    
  this.QuotNo = this.QuotNo == "" ? undefined : this.QuotNo
  this.partNo = this.partNo == "" ? undefined : this.partNo
  
  this.Sales_Master_Service_.Search_Sales_Master(
    look_In_Date_Value,
    moment(this.Search_FromDate).format('YYYY-MM-DD'), 
    moment(this.Search_ToDate).format('YYYY-MM-DD'),
    CustomerId_,
    this.QuotNo,
    this.partNo,
    Item_Group_Id_,
    CurrencyDetails_Id_,
    AccountType_Id_,
    User_Details_Id_,
this.User_Type_Id,
this.Login_User_Id).subscribe(Rows => {
  this.Sales_Order_Master_Data=Rows[0];
  if(this.Sales_Order_Master_Data.length>0)
  {
      for(var i=0;i<this.Sales_Order_Master_Data.length;i++)
      {
          this.Sales_Order_Master_Total_Amount=Number(this.Sales_Order_Master_Total_Amount)+Number(this.Sales_Order_Master_Data[i].NetTotal);
          this.Sales_Order_Master_Total_Amount= Number(this.Sales_Order_Master_Total_Amount.toFixed(3));
      }
  }
  this.Total_Entries=this.Sales_Order_Master_Data.length;
  if(this.Sales_Order_Master_Data.length==0)
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
Add_Sales_Details()
{     
  if (this.Sales_Order_Details_Index >= 0) {
      this.Sales_Order_Details_Data[this.Sales_Order_Details_Index] = Object.assign({}, this.Sales_Order_Details_);
      }
  else {
      this.Sales_Order_Details_Data.push(Object.assign({}, this.Sales_Order_Details_));
}
this.Final_Amounts();
this.Sales_Order_Details_Index=-1;
this.Clr_Sales_Details();
}
Plus_Sales_Details(event)
{   
    debugger;
  if(this.Barcode_==undefined || this.Barcode_==null )
      {
          const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select Item code',Type:"3"}});
          return
      }
else   if(this.Stock_==undefined || this.Stock_==null )
    {
        const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select Item Name',Type:"3"}});
        return
    }
  else if(this.Sales_Order_Details_.Quantity==undefined || this.Sales_Order_Details_.Quantity==null || this.Sales_Order_Details_.Quantity==0 )
  {
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter the quantity',Type:"3"}});
      return
  }
  else if(this.Sales_Order_Details_.UnitPrice==undefined || this.Sales_Order_Details_.UnitPrice==null || this.Sales_Order_Details_.UnitPrice==0 )
  {
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Unit Price',Type:"3"}});
      return
  }     

if(this.Sales_Order_Details_.Stock_Id>0)
    this.Sales_Order_Details_.Stock_Id=this.Sales_Order_Details_.Stock_Id;
else
    this.Sales_Order_Details_.Stock_Id=0;
    if(this.Barcode_.Item_Code!=undefined && this.Barcode_.Item_Code!=null)
        {
            this.Sales_Order_Details_.ItemCode=  this.Barcode_.Item_Code;
        }
        else if(this.Barcode_!=undefined && this.Barcode_!=null)
        {
            const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
            this.Sales_Order_Details_.ItemCode=Barcode_string;
        }


if (this.Sales_Order_Details_Data == undefined)
    this.Sales_Order_Details_Data = [];
var inserted = 0;
this.Sales_Order_Details_.UnitPrice = parseFloat(Number(this.Sales_Order_Details_.UnitPrice).toFixed(3));
this.Sales_Order_Details_.Quantity = parseFloat(Number(this.Sales_Order_Details_.Quantity).toFixed(3));
if (this.Sales_Order_Details_Index >= 0) 
    {
        this.Sales_Order_Details_Data[this.Sales_Order_Details_Index] = Object.assign({}, this.Sales_Order_Details_);
    }
    else
    {
        this.Sales_Order_Details_Data.push(Object.assign({}, this.Sales_Order_Details_));
    }

debugger;

    this.Sales_Order_Details_Index = -1;
    this.Focus_It(event);
     
  this.Clr_Sales_Details();
//   if( this.Sales_Details_Data.length>21){
  this.addBlankRows();//}
  this.Final_Amounts();

}
Save_Sales(Printstatus:number)
{

  if(this.Sales_Order_Details_Data == undefined || this.Sales_Order_Details_Data == null || this.Sales_Order_Details_Data.length == 0 || this.Sales_Order_Details_Data.length == undefined )
  {
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Add atleast one Item',Type:"3"}});
      return
  }
  if(this.Customer_ == undefined || this.Customer_ == null || this.Customer_.Client_Accounts_Id == undefined || this.Customer_.Client_Accounts_Id == 0 ){
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Choose Customer',Type:"3"}});
      return
  }    
  if(this.Currency.CurrencyDetails_Id == undefined || this.Currency.CurrencyDetails_Id == 0 ){
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Choose currency',Type:"3"}});
      return
  }

  let unitPriceCheck = 0;

  for(let i = 0; i< this.Sales_Order_Details_Data.length; i++)
  {
    if(this.Sales_Order_Details_Data[i].UnitPrice == 0)
    {
        unitPriceCheck = 1;
    }
  }

  if(unitPriceCheck == 1)
  {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Enter a Unit Price for the Item',Type:"3"}});
    return;
  }
  
  this.Sales_Order_Master_.Account_Party_Id=this.Customer_.Client_Accounts_Id;
  this.Sales_Order_Master_.User_Id=Number(this.Login_User_Id);
  this.Sales_Order_Master_.sales_order_details=this.Sales_Order_Details_Data;

  this.Sales_Order_Master_.CurrencyId = this.Currency.CurrencyDetails_Id;

  this.Sales_Order_Master_.TypeId = this.Accounttype.AccountType_Id;

  if(this.Sales_Order_Master_.DeliveryOrderMaster_Id == null || this.Sales_Order_Master_.DeliveryOrderMaster_Id == undefined)
  {
    this.Sales_Order_Master_.DeliveryOrderMaster_Id = 0;
  }
debugger;
if(this.PaymentTerm == undefined || this.PaymentTerm == null){
    this.Sales_Order_Master_.Payment_Term_Description = 0;
    this.Sales_Order_Master_.PaymentTerms = "";
}else{
    this.Sales_Order_Master_.Payment_Term_Description = this.PaymentTerm.payment_Term_ID;
    this.Sales_Order_Master_.PaymentTerms = this.PaymentTerm.Payment_Term_Description;
}

  this.Sales_Order_Master_.EntryDate = this.New_Date(new Date(moment(this.Sales_Order_Master_.EntryDate).format('YYYY-MM-DD')));
  this.Sales_Order_Master_.SupplyDate = this.New_Date(new Date(moment(this.Sales_Order_Master_.SupplyDate).format('YYYY-MM-DD')));
  this.Sales_Order_Master_.DueDate = this.New_Date(new Date(moment(this.Sales_Order_Master_.DueDate).format('YYYY-MM-DD')));

  console.log("Before Sales Order API call");
  this.issLoading = true;

  this.Sales_Order_Master_Service_.Save_Sales_Order(this.Sales_Order_Master_)
  .pipe(
    finalize(() => {
      console.log("Sales Order Finalize executed");
      this.issLoading = false;
      const saveButton = document.getElementById("Save_Button");
      if (saveButton) saveButton.hidden = false;
    })
  )
  .subscribe({
    next: (Save_status) => {
      console.log("Sales Order API Response:", Save_status);

      if (!Save_status || !Save_status[0]) {
        this.dialogBox.open(DialogBox_Component, {
          panelClass: 'Dialogbox-Class',
          data: { Message: 'Invalid server response', Type: "2" }
        });
        return;
      }

      if (Number(Save_status[0].Sales_Master_Id_) > 0) {
        this.Sales_Order_Master_.Sales_Order_Master_Id = Save_status[0].Sales_Master_Id_;
        this.Sales_Order_Master_.Invoice_No = Save_status[0].Voucher_No_;
        this.Sales_Order_Master_Id_Edit = this.Sales_Order_Master_.Sales_Order_Master_Id;
        this.Edit_Sales = 1;

        if (Printstatus == 1) {
          this.Print_Click();
        } else {
          this.dialogBox.open(DialogBox_Component, {
            panelClass: 'Dialogbox-Class',
            data: { Message: 'Saved Successfully', Type: "false" }
          });
        }
        this.Sales_Order_Print = false;
      } else {
        this.dialogBox.open(DialogBox_Component, {
          panelClass: 'Dialogbox-Class',
          data: { 
            Message: 'Error: ' + (Save_status[0].Message || 'Save failed'), 
            Type: "2" 
          }
        });
        setTimeout(() => {
          if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      }
    },
    error: (error) => {
      console.error("Sales Order API ERROR:", error);
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
  if (this.User_Type_Id == 1 || this.Sales_Order_Master_Data[this.Sale_Order_EditIndex].User_Id.toString() == this.Login_User_Id)
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

  {
  this.Sale_Order_Permission_Edit= this.Sale_Order_Permission_Edit_Temp;
  this.Enable_Disable_Permission();
  document.getElementById("Save_Button").hidden=false;
  }
}
Enable_Disable_Permission()
{
  if( this.Sale_Order_Permission_Edit==false)
  {
  $('#SALE :input').attr('disabled', 'true');
  }
  else if( this.Sale_Order_Permission_Edit==true){
  $('#SALE :input').removeAttr('disabled');
  }
}
Disable_Tab_Permission()
{
  this.Sale_Order_Permission_Edit= false;
  this.Enable_Disable_Permission();
}
Edit_Sales_Master(Sales_Master_e:sales_order_master,index)
{ 
  debugger;
  this.Entry_View=true;
  this.Edit_Sales=1;
  this.Sales_Order_Print = false;
  this.Sales_Order_Master_=Object.assign({},Sales_Master_e); 

    this.Customer_Temp.Client_Accounts_Id=Sales_Master_e.Account_Party_Id;
    this.Customer_Temp.Client_Accounts_Name=Sales_Master_e.Customer;
    this.Customer_=this.Customer_Temp;

    this.Customer_.Client_Accounts_Id=Sales_Master_e.Account_Party_Id;
    this.Customer_.Client_Accounts_Name=Sales_Master_e.Customer;

    this.Customer_Name = this.Customer_.Client_Accounts_Name
    this.Sales_Order_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.Sales_Order_Master_.Customer=this.Sales_Order_Master_.Customer_Name; 

    this.SalesQuotationMaster_Id = Sales_Master_e.SalesQuotationMaster_Id
    this.Sales_Order_Master_Id_Edit = Sales_Master_e.Sales_Order_Master_Id;

    if(this.Sales_Order_Master_.Additional_Discount) this.addDiscCheck = 1;
    else this.addDiscCheck = 0;

    this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39',"").subscribe(Rows => {   
        if (Rows != null) {
            this.Customer_Data = Rows[0];
            for(let i=0;i<Rows[0].length;i++){
                if(Rows[0][i].Client_Accounts_Id == Sales_Master_e.Account_Party_Id){

                    this.Customer_Temp.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                    this.Customer_Temp.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                     this.Customer_= this.Customer_Temp;

                    this.Customer_  =Rows[0][i];
                    this.Customer_.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                    this.Customer_.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                    this.Customer_Name = Rows[0][i].Client_Accounts_Name;

                    this.Sales_Order_Master_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                    this.Sales_Order_Master_.Customer=Rows[0][i].Client_Accounts_Name;
                    this.Sales_Order_Master_.Customer_Name=Rows[0][i].Client_Accounts_Name;

                    this.Sales_Order_Master_.Address1 = Rows[0][i].Address1;
                    this.Sales_Order_Master_.Address2 = Rows[0][i].Address2;
                    this.Sales_Order_Master_.Address3 = Rows[0][i].Address3;
                    this.Sales_Order_Master_.Address4 = Rows[0][i].Address4;
                    this.Sales_Order_Master_.Vatin = Rows[0][i].GSTNo;     

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
   
  for(let i=0;i<this.Currency_Data.length;i++)
  {
    if(this.Currency_Data[i].CurrencyDetails_Id == this.Sales_Order_Master_.CurrencyId)
    {
        this.Currency = this.Currency_Data[i];
        this.currencyName = this.Currency_Data[i].CurrecnyName

    }

  }

  for(let i=0;i<this.AccounttypeData.length;i++)
    {
      if(this.AccounttypeData[i].AccountType_Id == this.Sales_Order_Master_.TypeId)
      {
          this.Accounttype = this.AccounttypeData[i];
          this.invoiceTypeName = this.AccounttypeData[i].AccountType_Name

      }
  
    }
  
  for(let i=0;i<this.PaymentTerm_Data.length;i++){
      if(this.PaymentTerm_Data[i].payment_Term_ID == this.Sales_Order_Master_.Payment_Term_Description){
          this.PaymentTerm = this.PaymentTerm_Data[i]
      }
  }
this.issLoading = true;
this.Sales_Order_Master_Service_.Get_Sales_Order_Details(Sales_Master_e.Sales_Order_Master_Id).subscribe(Rows => { 
  
  if (Rows != null) {
      this.Sales_Order_Details_Data = Rows[0];
      this.addBlankRows();//}
      this.Final_Amounts();
      
      }
         this.issLoading = false;
     },
   Rows => {
          this.issLoading = false;
     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
  });
}
Edit_Sales_Details(Sales_Details_ed:sales_order_details,index)
{   
  this.Sales_Order_Details_Index=index;
  this.Sales_Order_Details_ = {...Sales_Details_ed}

  this.Stock_Temp.ItemId=Sales_Details_ed.ItemId;
  this.Stock_Temp.ItemName=Sales_Details_ed.ItemName;
  this.Stock_=Object.assign({},this.Stock_Temp);
    this.Barcode_Temp.Stock_Id=Sales_Details_ed.Stock_Id;
  //this.Barcode_Temp.Barcode=Sales_Details_ed.Barcode;
  this.Barcode_=Object.assign({},this.Barcode_Temp); 

  this.Edit_GST=this.Sales_Order_Details_.TaxAmount;
  this.Edit_Discount=this.Sales_Order_Details_.Discount;
  this.Edit_Net=this.Sales_Order_Details_.NetValue;
  this.Sales_Order_Details_=Object.assign({},Sales_Details_ed);
  this.Sale_Detail_Quantity=this.Sales_Order_Details_.Quantity;
  this.Edit_Stock_-this.Sales_Order_Details_.Stock;
  this.Sales_Order_Details_Description=this.Sales_Order_Details_.Description;
  
}

Get_Stock(){
debugger;
    this.Stock_Temp.ItemId=this.Barcode_.ItemId;
    this.Stock_Temp.ItemName=this.Barcode_.ItemName;
    this.Stock_=Object.assign({},this.Stock_Temp);
    
    this.Sales_Order_Details_.ItemId=this.Barcode_.ItemId;
    this.Sales_Order_Details_.ItemName=this.Barcode_.ItemName;
    this.Sales_Order_Details_.UnitId=this.Barcode_.UnitId;
    this.Sales_Order_Details_.UnitName=this.Barcode_.UnitName;
    this.Sales_Order_Details_.MRP=this.Barcode_.MRP;
    this.Sales_Order_Details_.PurchaseRate=this.Barcode_.PurchaseRate;
    this.Sales_Order_Details_.Stock=this.Barcode_.Quantity;
    this.Sales_Order_Details_.UnitPrice=this.Barcode_.SaleRate;
    this.Sales_Order_Details_.ItemName=this.Barcode_.ItemName;
    this.Sales_Order_Details_.GroupId=this.Barcode_.GroupId;
    this.Sales_Order_Details_.GroupName=this.Barcode_.GroupName;
    this.Sales_Order_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
    this.Sales_Order_Details_.HSNCODE=this.Barcode_.HSNCODE;
    this.Sales_Order_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
    this.Sales_Order_Details_.Stock_Id=this.Barcode_.Stock_Id;
    this.Sales_Order_Details_.SaleTax=this.Barcode_.SaleTax;
    this.Sales_Order_Details_.ItemCode=this.Barcode_.Item_Code;
    this.Sales_Order_Details_.Country_Id=this.Barcode_.Country_Id;
    this.Sales_Order_Details_.Country_Name=this.Barcode_.Country_Name;
    this.availablity=this.Barcode_.Availability;  
}

Get_Stock_Item(){
    console.log('this.Stock_: ', this.Stock_);

    if(this.Stock_ != null || this.Stock_ != undefined)
    {
        if(this.Stock_.ItemId != null || this.Stock_.ItemId != undefined)
            {
                this.Stock_Temp.Item_Code=this.Stock_.Item_Code;
                 this.Stock_Temp.ItemId=this.Stock_.ItemId;
                 this.Barcode_=Object.assign({},this.Stock_Temp);
                 
                this.Sales_Order_Details_.ItemId=this.Stock_.ItemId;
                this.Sales_Order_Details_.ItemName=this.Stock_.ItemName;
                this.Sales_Order_Details_.UnitId=this.Stock_.UnitId;
                this.Sales_Order_Details_.UnitName=this.Stock_.UnitName;
                this.Sales_Order_Details_.MRP=this.Stock_.MRP;
                this.Sales_Order_Details_.PurchaseRate=this.Stock_.PurchaseRate;
                this.Sales_Order_Details_.Stock=this.Stock_.Quantity;
                this.Sales_Order_Details_.UnitPrice=this.Stock_.SaleRate;
                this.Sales_Order_Details_.ItemName=this.Stock_.ItemName;
                this.Sales_Order_Details_.GroupId=this.Stock_.GroupId;
                this.Sales_Order_Details_.GroupName=this.Stock_.GroupName;
                this.Sales_Order_Details_.HSNMasterId=this.Stock_.HSNMasterId;
                this.Sales_Order_Details_.HSNCODE=this.Stock_.HSNCODE;
                this.Sales_Order_Details_.HSNMasterId=this.Stock_.HSNMasterId;
                this.Sales_Order_Details_.ItemCode=this.Stock_.Item_Code; 
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

Delete_Order_Sales_Detail(itemIndex){
  this.Sales_Order_Details_Data.splice(itemIndex, 1);
  this.addBlankRows();//}
  this.Final_Amounts();
}

Edit_Order_Sales_Detail(Sales_Order_Details_ed:sales_order_details,index)
{

    this.Sales_Order_Details_Index=index;

    this.Sales_Order_Details_ ={...Sales_Order_Details_ed};

    this.Barcode_ = new Stock();
    this.Stock_ = new Stock();
    this.Stock_.Stock_Id = Sales_Order_Details_ed.Stock_Id;

    this.Barcode_Temp.ItemId = Sales_Order_Details_ed.ItemId;
    this.Barcode_Temp.Item_Code = Sales_Order_Details_ed.ItemCode;
    this.Barcode_=Object.assign({},this.Barcode_Temp); 

    this.Stock_Temp.ItemId=Sales_Order_Details_ed.ItemId;
    this.Stock_Temp.ItemName=Sales_Order_Details_ed.ItemName;
    this.Stock_=Object.assign({},this.Stock_Temp);
    this.Sales_Order_Details_=Object.assign({},Sales_Order_Details_ed);
}

newQuotation(){
    this.Sales_Order_Master_= new sales_order_master();
    this.Clr_Sales_Master();
    this.Clr_Sales_Details();
    this.Sales_Order_Master_Id_Edit = 0;
    this.SalesQuotationMaster_Id = 0;
    this.Edit_Sales = 0;
    setTimeout(() => {
        if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

  }

  duplicate(){
    this.Sales_Order_Master_.Sales_Order_Master_Id = 0;
    this.Sales_Order_Master_.Invoice_No = '0'

    this.SalesQuotationMaster_Id = 0;
    this.Sales_Order_Master_.SalesQuotationMaster_Id = 0;
    this.Sales_Order_Master_Id_Edit = 0;
    this.Edit_Sales = 0;
    this.Sales_Order_Master_.EntryDate=new Date().toString();
    this.Sales_Order_Master_.EntryDate=this.formatDate(this.Sales_Order_Master_.EntryDate);   

    setTimeout(() => {
        if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

  }

Load_All_Account_Type()
{
    this.currencydetails_Service_.Load_All_Account_Type('').subscribe(Rows => {
        if (Rows != null) {
            this.AccounttypeData = Rows[0];
            this.Accounttype_Temp.AccountType_Id = 0;
            this.Accounttype_Temp.AccountType_Name = "Select";
            this.AccounttypeData.unshift(this.Accounttype_Temp);
            this.Accounttype = this.AccounttypeData[0];
            this.searchAccountType=this.AccounttypeData[0];     
        }
        this.issLoading = false;
    },
        Rows => {
            this.issLoading = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}


Load_Payment_Term() {
    this.payment_term_Service_.Load_Payment_Term().subscribe(Rows => {
        if (Rows != null) {
            this.PaymentTerm_Data = Rows[0];
            this.PaymentTerm_Temp.payment_Term_ID = 0;
            this.PaymentTerm_Temp.Payment_Term_Description = "Select";
            this.PaymentTerm_Data.unshift(this.PaymentTerm_Temp);
            this.PaymentTerm = this.PaymentTerm_Data[0];
        }
    },
        Rows => {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}


Load_Delivery_Order_Master(){
    this.Entry_View = true;
    this.issLoading = true;
    this.Sales_Master_Service_.Load_Delivery_Order_Master(this.DeliveryOrderMaster_Id).subscribe(result=>{
        debugger
        this.Sales_Order_Master_=new sales_order_master();
        this.Sales_Order_Master_=Object.assign({},result[0][0]); 
        this.Sales_Order_Master_.Sales_Order_Master_Id = 0;
        this.Sales_Order_Master_.VAT_percentage = result[0][0].VAT_Percentage;
        this.Sales_Order_Master_.LPONo=result[0][0].LPONo;   
        this.Sales_Order_Master_.PaymentTermValue=result[0][0].PaymentTermValue;
        this.Sales_Order_Master_.SalesQuotationMaster_Id=0;
        this.Sales_Order_Master_.DeliveryOrderMaster_Id=this.DeliveryOrderMaster_Id;
         this.Sales_Order_Master_.payment_Term_ID=result[0][0].Payment_Term_Description;
         this.Sales_Order_Master_.Payment_Term_Description=result[0][0].Payment_Term_Description;
         this.Sales_Order_Master_.CurrencyId=result[0][0].CurrencyId;
         this.Sales_Order_Master_.TypeId=result[0][0].TypeId;
        this.Sales_Order_Master_.Account_Party_Id=result[0][0].Account_Party_Id;
        this.Sales_Order_Master_.Customer_Name=result[0][0].Customer_Name;
        this.Customer_Temp.Client_Accounts_Id=result[0][0].Account_Party_Id;
        this.Customer_Temp.Client_Accounts_Name=result[0][0].Account_Party_Id.Customer;
        this.Customer_=this.Customer_Temp; 
        this.Customer_.Client_Accounts_Id=result[0][0].Account_Party_Id;
        this.Customer_.Client_Accounts_Name=result[0][0].Account_Party_Id.Customer;
        this.Sales_Order_Master_.SupplyDate=new Date().toString();
        this.Sales_Order_Master_.SupplyPrintDate = this.Sales_Order_Master_.SupplyDate;
        this.Sales_Order_Master_.SupplyPrintDate = this.formatPrintDate(this.Sales_Order_Master_.SupplyPrintDate);
        this.Sales_Order_Master_.SupplyDate=this.formatDate(this.Sales_Order_Master_.SupplyDate);
        this.Sales_Order_Master_.EntryDate=new Date().toString();
        this.Sales_Order_Master_.EntryDate=this.formatDate(this.Sales_Order_Master_.EntryDate);  

        if(result[0][0].PaymentTermValue > 0 || result[0][0].PaymentTermValue != null || result[0][0].PaymentTermValue != undefined)
            {
                this.Sales_Order_Master_.DueDate = new Date(new Date().setDate(new Date().getDate() + result[0][0].PaymentTermValue)).toString();
                this.Sales_Order_Master_.DuePrintDate = this.Sales_Order_Master_.DueDate;
                this.Sales_Order_Master_.DuePrintDate = this.formatPrintDate(this.Sales_Order_Master_.DuePrintDate);    
                this.Sales_Order_Master_.DueDate=this.formatDate(this.Sales_Order_Master_.DueDate);
            }
            else
            {
                this.Sales_Order_Master_.DueDate=new Date().toString();
                this.Sales_Order_Master_.DuePrintDate = this.Sales_Order_Master_.DueDate;
                this.Sales_Order_Master_.DuePrintDate = this.formatPrintDate(this.Sales_Order_Master_.DuePrintDate);    
                this.Sales_Order_Master_.DueDate=this.formatDate(this.Sales_Order_Master_.DueDate);
            }   

        this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39','').subscribe(Rows => {  
            if (Rows != null) {
                this.Customer_Data = Rows[0];
                for(let i=0;i<Rows[0].length;i++){
                    if(Rows[0][i].Client_Accounts_Id ==result[0][0].Account_Party_Id){
                        this.Customer_Temp.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                        this.Customer_Temp.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                         this.Customer_= this.Customer_Temp;

                        this.Customer_  =Rows[0][i];
                        this.Customer_.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                        this.Customer_.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                        this.Customer_Name = Rows[0][i].Client_Accounts_Name;

                        this.Sales_Order_Master_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                        this.Sales_Order_Master_.Customer=Rows[0][i].Client_Accounts_Name;
                        this.Sales_Order_Master_.Customer_Name=Rows[0][i].Client_Accounts_Name;

                        this.Sales_Order_Master_.Address1 = Rows[0][i].Address1;
                        this.Sales_Order_Master_.Address2 = Rows[0][i].Address2;
                        this.Sales_Order_Master_.Address3 = Rows[0][i].Address3;
                        this.Sales_Order_Master_.Address4 = Rows[0][i].Address4;
                        this.Sales_Order_Master_.Vatin = Rows[0][i].GSTNo;     

                        this.Address1 = Rows[0][i].Address1;
                        this.Address2 = Rows[0][i].Address2;
                        this.Address3 = Rows[0][i].Address3;
                        this.Address4 = Rows[0][i].Address4;
                        this.Vatin = Rows[0][i].GSTNo;            
                    }
                    
                } }
            },
        );

        this.Sales_Master_Service_.Get_Delivery_Order_Details(this.Sales_Order_Master_.DeliveryOrderMaster_Id).subscribe(Result => {           
            debugger;    
            if (Result != null) {
                this.Sales_Order_Details_Data = Result[0];
                this.Final_Amounts();
                this.addBlankRows();      
                }                   
               },
               Result => {                  
               const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            });  
            if(this.Currency_Data==undefined || this.Currency_Data==null)
                {
                    this.currencydetails_Service_.Load_currencydetails().subscribe(Rows => {
                        if (Rows != null) {
                            this.Currency_Data = Rows[0];        
                            this.Currency_Temp.CurrencyDetails_Id = 0;
                            this.Currency_Temp.CurrecnyName = "Select";
                            this.Currency_Data.unshift(this.Currency_Temp);
                            this.Currency = this.Currency_Data[0];
                       
                            for(let i=0; i<this.Currency_Data.length;i++){
                                if(this.Currency_Data[i].CurrencyDetails_Id == this.Sales_Order_Master_.CurrencyId)
                                {
                                    this.Currency = this.Currency_Data[i]
                                }
                            }
                        }
                    })
                }
                else{
                    for(let i=0; i<this.Currency_Data.length;i++){
                        if(this.Currency_Data[i].CurrencyDetails_Id == this.Sales_Order_Master_.CurrencyId)
                        {
                            this.Currency = this.Currency_Data[i]
                        }
                    }
                }
                if(this.AccounttypeData==undefined || this.AccounttypeData==null)
                {
                    this.User_Details_Service_.Load_InvoiceType2().subscribe(Rows => {
                        if (Rows != null) {
                        this.AccounttypeData = Rows[0]; 
                        this.Accounttype_Temp.AccountType_Id = 0;
                        this.Accounttype_Temp.AccountType_Name = "Select";
                        this.AccounttypeData.unshift(this.Accounttype_Temp);
                        this.Accounttype = this.AccounttypeData[0];
                        
                        for(let i=0; i<this.AccounttypeData.length; i++)
                            {
                                if(this.AccounttypeData[i].AccountType_Id == this.Sales_Order_Master_.TypeId)
                                {
                                    this.Accounttype = this.AccounttypeData[i];
                                }
                            }  
                        }       
                      })
                }
                else{
                    for(let i=0; i<this.AccounttypeData.length; i++)
                    {
                        if(this.AccounttypeData[i].AccountType_Id == this.Sales_Order_Master_.TypeId)
                        {
                            this.Accounttype = this.AccounttypeData[i];
                        }
                    }  
                }       
                   if(this.PaymentTerm_Data==undefined || this.PaymentTerm_Data==null)
                   {
                    this.payment_term_Service_.Load_Payment_Term().subscribe(Rows => {
                        if (Rows != null) {
                            this.PaymentTerm_Data = Rows[0];
                            this.PaymentTerm_Temp.payment_Term_ID = 0;
                    this.PaymentTerm_Temp.Payment_Term_Description = "Select";
                    this.PaymentTerm_Data.unshift(this.PaymentTerm_Temp);
                    this.PaymentTerm = this.PaymentTerm_Data[0];
               
                            for(let i=0;i<this.PaymentTerm_Data.length;i++)
                                {
                                if(this.PaymentTerm_Data[i].payment_Term_ID == this.Sales_Order_Master_.Payment_Term_Description){
                                    this.PaymentTerm = this.PaymentTerm_Data[i]
                                }
                            } 
                           }
                    })
                   }
                   else{            
                    for(let i=0;i<this.PaymentTerm_Data.length;i++)
                        {
                        if(this.PaymentTerm_Data[i].payment_Term_ID == this.Sales_Order_Master_.Payment_Term_Description){
                            this.PaymentTerm = this.PaymentTerm_Data[i]
                        }
                    } 
                } 
    })  
    this.issLoading = false;
}

/*** Added on 17-10-2024 */

Load_Order_SalesMaster()
  {
    this.Entry_View=true;
    this.issLoading = true;
      debugger;
      console.log("Inv - Outside Load_SalesMaster ");
      this.Sales_Order_Master_Service_.Load_Sales_Order_Master(this.Sales_Order_Master_Id).subscribe(rows=>{
        console.log("Inv - Inside Load_SalesMaster ");


        debugger;
  this.Sales_Order_Master_Id_Edit = this.Sales_Order_Master_Id
  this.Sales_Order_Master_Id = 0;
  this.Edit_Sales=1;
  this.Sales_Order_Print = false;
  this.Sales_Order_Master_=Object.assign({},rows[0][0]); 

  this.SalesQuotationMaster_Id = rows[0][0].SalesQuotationMaster_Id;
    this.Customer_Temp.Client_Accounts_Id=rows[0][0].Account_Party_Id;
    this.Customer_Temp.Client_Accounts_Name=rows[0][0].Customer;
    this.Customer_=this.Customer_Temp;

    this.Customer_.Client_Accounts_Id=rows[0][0].Account_Party_Id;
    this.Customer_.Client_Accounts_Name=rows[0][0].Customer;

    this.Sales_Order_Master_.Account_Party_Id=rows[0][0].Account_Party_Id;
    this.Sales_Order_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;

    this.Sales_Order_Master_.Customer=this.Sales_Order_Master_.Customer_Name; 
    this.Sales_Order_Master_.LPONo=rows[0][0].LPONo;

    this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39','').subscribe(Rows => {  
    if (Rows != null) {
        this.Customer_Data = Rows[0];
        for(let i=0;i<Rows[0].length;i++){
            if(Rows[0][i].Client_Accounts_Id == rows[0][0].Account_Party_Id){
                this.Customer_Temp.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                this.Customer_Temp.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                 this.Customer_= this.Customer_Temp;

                this.Customer_  =Rows[0][i];
                this.Customer_.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                this.Customer_.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                this.Customer_Name = Rows[0][i].Client_Accounts_Name;

                this.Sales_Order_Master_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                this.Sales_Order_Master_.Customer=Rows[0][i].Client_Accounts_Name;
                this.Sales_Order_Master_.Customer_Name=Rows[0][i].Client_Accounts_Name;

                this.Sales_Order_Master_.Address1 = Rows[0][i].Address1;
                this.Sales_Order_Master_.Address2 = Rows[0][i].Address2;
                this.Sales_Order_Master_.Address3 = Rows[0][i].Address3;
                this.Sales_Order_Master_.Address4 = Rows[0][i].Address4;
                this.Sales_Order_Master_.Vatin = Rows[0][i].GSTNo;     

                this.Address1 = Rows[0][i].Address1;
                this.Address2 = Rows[0][i].Address2;
                this.Address3 = Rows[0][i].Address3;
                this.Address4 = Rows[0][i].Address4;
                this.Vatin = Rows[0][i].GSTNo;             
            }
        } }
    },);
        this.Sales_Order_Master_Service_.Get_Sales_Order_Details(rows[0][0].Sales_Master_Id).subscribe(Rows1 => {   
            if (Rows1 != null) {
                this.Sales_Order_Details_Data = Rows1[0];
                this.Final_Amounts();
                debugger;
                this.addBlankRows();  
               // }    
                }
               },
             Rows => {       
               const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            });


        if(this.Currency_Data==undefined || this.Currency_Data==null)
            {
                this.currencydetails_Service_.Load_currencydetails().subscribe(Rows => {
                    if (Rows != null) {
                        this.Currency_Data = Rows[0];        
                        this.Currency_Temp.CurrencyDetails_Id = 0;
                        this.Currency_Temp.CurrecnyName = "Select";
                        this.Currency_Data.unshift(this.Currency_Temp);
                        this.Currency = this.Currency_Data[0];
                   
                        for(let i=0; i<this.Currency_Data.length;i++){
                            if(this.Currency_Data[i].CurrencyDetails_Id == this.Sales_Order_Master_.CurrencyId)
                            {
                                this.Currency = this.Currency_Data[i]
                            }
                        }
                    }
                })
            }
            else{
                for(let i=0; i<this.Currency_Data.length;i++){
                    if(this.Currency_Data[i].CurrencyDetails_Id == this.Sales_Order_Master_.CurrencyId)
                    {
                        this.Currency = this.Currency_Data[i]
                    }
                }
            }
            if(this.AccounttypeData==undefined || this.AccounttypeData==null)
            {
                this.User_Details_Service_.Load_InvoiceType2().subscribe(Rows => {
                    if (Rows != null) {
                    this.AccounttypeData = Rows[0]; 
                    this.Accounttype_Temp.AccountType_Id = 0;
                    this.Accounttype_Temp.AccountType_Name = "Select";
                    this.AccounttypeData.unshift(this.Accounttype_Temp);
                    this.Accounttype = this.AccounttypeData[0];
                   
                    for(let i=0; i<this.AccounttypeData.length; i++)
                        {
                            if(this.AccounttypeData[i].AccountType_Id == this.Sales_Order_Master_.TypeId)
                            {
                                this.Accounttype = this.AccounttypeData[i];
                            }
                        }  
                    }       
                  })
            }
            else{
                for(let i=0; i<this.AccounttypeData.length; i++)
                {
                    if(this.AccounttypeData[i].AccountType_Id == this.Sales_Order_Master_.TypeId)
                    {
                        this.Accounttype = this.AccounttypeData[i];
                    }
                }  
            }       
               if(this.PaymentTerm_Data==undefined || this.PaymentTerm_Data==null)
               {
                this.payment_term_Service_.Load_Payment_Term().subscribe(Rows => {
                    if (Rows != null) {
                        this.PaymentTerm_Data = Rows[0];
                        this.PaymentTerm_Temp.payment_Term_ID = 0;
                        this.PaymentTerm_Temp.Payment_Term_Description = "Select";
                        this.PaymentTerm_Data.unshift(this.PaymentTerm_Temp);
                        this.PaymentTerm = this.PaymentTerm_Data[0];
                   
                        for(let i=0;i<this.PaymentTerm_Data.length;i++)
                            {
                            if(this.PaymentTerm_Data[i].payment_Term_ID == this.Sales_Order_Master_.Payment_Term_Description){
                                this.PaymentTerm = this.PaymentTerm_Data[i]
                            }
                        } 
                       }
                })
               }
               else{            
                for(let i=0;i<this.PaymentTerm_Data.length;i++)
                    {
                    if(this.PaymentTerm_Data[i].payment_Term_ID == this.Sales_Order_Master_.Payment_Term_Description){
                        this.PaymentTerm = this.PaymentTerm_Data[i]
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

DueDateChange()
{
    debugger

    if(this.Sales_Order_Master_.EntryDate)
        {
            if (!this.Sales_Order_Master_.PaymentTermValue) {
                this.Sales_Order_Master_.DueDate = this.Sales_Order_Master_.EntryDate;
            } else {
                const entryDate = new Date(this.Sales_Order_Master_.EntryDate); // Convert EntryDate to a Date object
                this.Sales_Order_Master_.DueDate = new Date(entryDate.setDate(entryDate.getDate() + this.Sales_Order_Master_.PaymentTermValue)).toString();
                this.Sales_Order_Master_.DueDate = this.formatDate(this.Sales_Order_Master_.DueDate);
            }
        }


    if(!this.Sales_Order_Master_.EntryDate)
    {
        if(!this.Sales_Order_Master_.PaymentTermValue)
            {
                this.Sales_Order_Master_.DueDate=new Date().toString();
                this.Sales_Order_Master_.DueDate=this.formatDate(this.Sales_Order_Master_.DueDate);
    
            }
            else
            {
                this.Sales_Order_Master_.DueDate = new Date(new Date().setDate(new Date().getDate() + this.Sales_Order_Master_.PaymentTermValue)).toString();
                this.Sales_Order_Master_.DueDate=this.formatDate(this.Sales_Order_Master_.DueDate);
            } 
    }

}

/*** Added on 31-10-2024 */

supplyDateChange()
{
    if(this.Sales_Order_Master_.EntryDate)
    this.Sales_Order_Master_.SupplyDate = this.Sales_Order_Master_.EntryDate;
}

/*** Added on 8-11-24 */

Calculate_Discount_Percent()
{
  let addDiscCheck = 1;
  let discountper = '0';

  debugger;
  if(Number(this.Sales_Order_Master_.Additional_Discount)>0){
      this.Sales_Order_Master_.Discount_Description = (this.Sales_Order_Master_.Additional_Discount * 100/this.Sales_Order_Master_.TotalAmount).toString();
      discountper = Number(this.Sales_Order_Master_.Discount_Description).toFixed(3);
      this.Sales_Order_Master_.Discount_Description = discountper; 
  }else{
      this.Sales_Order_Master_.Discount_Description = '0.000'
  }

  debugger;
  this.addDiscCheck = addDiscCheck;
  this.Final_Amounts();
}

Final_Amounts()
{      
    debugger
  this.Tot_Gross=0,this.Tot_discount=0,this.Tot_Net=0,this.Sales_Order_Master_.TotalAmount=0;this.Sales_Order_Master_.Basic_Discount=0
  for(var i = 0; i< this.Sales_Order_Details_Data.length ; i++)
  {
    this.Sales_Order_Master_.TotalAmount = Number(this.Sales_Order_Master_.TotalAmount) + Number(this.Sales_Order_Details_Data[i].Amount);

      this.Tot_discount = Number(this.Tot_discount)+  (Number(this.Sales_Order_Details_Data[i].Unit_Discount) * Number(this.Sales_Order_Details_Data[i].Quantity) );
      this.Tot_discount = Number(this.Tot_discount.toFixed(3));

      this.Sales_Order_Master_.Basic_Discount = this.Sales_Order_Master_.Basic_Discount + Number(this.Sales_Order_Details_Data[i].Item_Discount_Amount)
      this.Sales_Order_Master_.Basic_Discount = Number(this.Sales_Order_Master_.Basic_Discount.toFixed(3));        

  }
  debugger;
  this.Sales_Order_Master_.TotalAmount = Number(this.Sales_Order_Master_.TotalAmount.toFixed(3));
  this.Tot_discount = Number(this.Tot_discount.toFixed(3));

  if(this.addDiscCheck == 0)
    {
  if(Number(this.Sales_Order_Master_.Discount_Description)>0){
      this.Sales_Order_Master_.Additional_Discount = Number(this.Sales_Order_Master_.TotalAmount) * (Number(this.Sales_Order_Master_.Discount_Description)/ 100);
      this.Sales_Order_Master_.Additional_Discount = Number(this.Sales_Order_Master_.Additional_Discount.toFixed(3))
      this.addDiscCheck = 0;

  }else{
      this.Sales_Order_Master_.Additional_Discount = 0
      this.addDiscCheck = 0;

    }
    this.addDiscCheck = 0;
  }

  this.addDiscCheck = 0;


if (this.Sales_Order_Master_.VAT_percentage==undefined || this.Sales_Order_Master_.VAT_percentage==null)
    this.Sales_Order_Master_.VAT_percentage=0;
  this.Sales_Order_Master_.TotalDiscount = Number(this.Tot_discount)+ Number(this.Sales_Order_Master_.Additional_Discount);
  this.Sales_Order_Master_.TotalDiscount = Number(this.Sales_Order_Master_.TotalDiscount.toFixed(3))
  if((this.Sales_Order_Master_.Charge1per)>'0'){
      this.Sales_Order_Master_.charge1_Amount = (Number(this.Sales_Order_Master_.TotalAmount) - Number(this.Sales_Order_Master_.Additional_Discount))* (Number(this.Sales_Order_Master_.Charge1per)/100)
      this.Sales_Order_Master_.charge1_Amount = Number(this.Sales_Order_Master_.charge1_Amount.toFixed(3))
  }else{
      this.Sales_Order_Master_.charge1_Amount =  0.000;
  }
  this.Total = Number(this.Sales_Order_Master_.TotalAmount.toFixed(3))-Number(this.Sales_Order_Master_.TotalDiscount.toFixed(3)) + 
  this.safeNumber(Number(this.Sales_Order_Master_.charge2_Amount)) + Number(this.Sales_Order_Master_.charge1_Amount.toFixed(3))
  this.Total = Number(this.Total.toFixed(3))
  this.Sales_Order_Master_.VAT_Amount = 0.000;
  if(this.Sales_Order_Master_.VAT_percentage>0){
      this.Sales_Order_Master_.VAT_Amount = Number(this.Total) * Number(this.Sales_Order_Master_.VAT_percentage/100)
  }
  this.Sales_Order_Master_.VAT_Amount = Number(this.Sales_Order_Master_.VAT_Amount.toFixed(3))    
  this.Sales_Order_Master_.Total_Amount = this.Total + this.Sales_Order_Master_.VAT_Amount
  this.Sales_Order_Master_.Total_Amount = Number(this.Sales_Order_Master_.Total_Amount.toFixed(3))
  this.Sales_Order_Master_.NetTotal = Number((this.Sales_Order_Master_.Total_Amount - this.safeNumber(this.Sales_Order_Master_.Roundoff_Amt)).toFixed(3))
  this.Sales_Order_Master_.NetTotal = Number(this.Sales_Order_Master_.NetTotal.toFixed(3))
  this.Sales_Order_Master_.TotalAmount = parseFloat(this.Sales_Order_Master_.TotalAmount.toFixed(3));
  this.Sales_Order_Master_.Amount_In_Words = this.numberToWordsIndianCurrency(this.Sales_Order_Master_.NetTotal)
   debugger;
}

Show_Quotation_Click(SalesQuotationMaster_Id)
{
    
    localStorage.setItem('SalesQuotationMaster_Id', SalesQuotationMaster_Id.toString());

    this.router.navigateByUrl(`/Quotation`);
}

  Export() {
    const filteredData = this.Sales_Order_Master_Data.map((receipt: any, index: number) => {
        return {
            No: index + 1,                  
            CustomerName: receipt["Customer"],
            InvoiceNo : receipt["Invoice_No"],
            Date: receipt["FormattedEntryDate"],
            Amount: receipt["NetTotal"],

        };
    });

    this.Sales_Master_Service_.exportExcel(filteredData,"Invoice" );


  }

  addBlankRows(): void {

    let cellThr: number = 0;
    let cellThr1: number = 0;
    let nosOfBlankRows: number = 0;

    let tempht1: number = 0;
    let tempht2: number = 0;

    debugger

    this.cdr.detectChanges();

    this.Sales_Order_Details_Data.forEach((_, index) => {
      const cellId = `cell${index + 1}`;
      const cell = document.getElementById(cellId);

      if (cell) {
       
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

        if (cellThr1 < 375 && this.Sales_Order_Details_Data.length < 14 ) {   
            this.breakPage = false;                          //350
            nosOfBlankRows = (525 - cellThr1) / 12;
            if(nosOfBlankRows < 2) nosOfBlankRows +=2;
            // if(nosOfBlankRows > 25) nosOfBlankRows = 24;
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

      } else {
        console.error(`Cell with ID '${cellId}' not found.`);
      }
    });

  }

}
