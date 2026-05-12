import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, Renderer2, NgZone, Input, DebugElement, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Client_Accounts } from '../../../models/Client_Accounts';
import { User_Details_Service } from '../../../services/User_Details.Service';
import { Sales_Master_Service } from '../../../services/Sales_Master.Service';
import { currencydetails_Service } from '../../../services/currencydetails.Service';
import { purchaseordermaster_Service } from '../../../services/purchaseordermaster.Service';
import { Employee_Details_Service } from '../../../services/Employee_Details.Service';
import { Stock_Service } from '../../../services/Stock.Service';
import { Item_Group_Service } from '../../../services/Item_Group.Service';
import { payment_term_Service } from '../../../services/payment_term.Service';
import { salesquotationmaster_Service } from '../../../services/salesquotationmaster.Service';
import { Client_Accounts_Service } from '../../../services/Client_Accounts.Service';
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
import { Item } from '../../../models/Item';
// import { ConsoleReporter } from 'jasmine';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: {    dateInput: 'DD/MM/YYYY',    },
    display: {
    dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
    },
    };
@Component({
selector: 'app-Performa_Invoice',
templateUrl: './Performa_Invoice.component.html',
styleUrls: ['./Performa_Invoice.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Performa_InvoiceComponent implements OnInit, AfterViewInit  {
    ngAfterViewInit() {}
    @ViewChild('bottomDiv2', { static: false }) bottomDiv2: ElementRef;
    @ViewChild('bottomDiv1', { static: false }) bottomDiv1: ElementRef;

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
performainvoicedetails_Temp_ : performainvoicedetails = new performainvoicedetails();
performainvoice_Data:performainvoicemaster[]
Item_ :performainvoicedetails = new performainvoicedetails();
Item_Temp_:performainvoicedetails = new performainvoicedetails();
Barcode_:performainvoicedetails= new performainvoicedetails();
Item_Temp:performainvoicedetails= new performainvoicedetails();
Barcode_Temp_:performainvoicedetails= new performainvoicedetails();

Quotation_Details_Data:Quotation_Details[]
Quotation_Details_Data1:Quotation_Details[]
Quotation_Details_:Quotation_Details= new Quotation_Details();


Bill_Type_Data:Bill_Type[]
Bill_Type_:Bill_Type= new Bill_Type();
Bill_Type_Temp:Bill_Type= new Bill_Type();
Bill_Type_Search:Bill_Type= new Bill_Type();
Currency_Search:currencydetails = new currencydetails();
Bill_Mode_Data:Bill_Mode[]
Bill_Mode_:Bill_Mode= new Bill_Mode();
Bill_Mode_Temp:Bill_Mode= new Bill_Mode();
Customer_Data:Client_Accounts[];
PurchaseOrder_Data = [];



ItemCodeData = [];
Customer_:Client_Accounts= new Client_Accounts();
Search_Customer:Client_Accounts= new Client_Accounts();
Customer_Temp:Client_Accounts= new Client_Accounts();
Barcode_Data:Stock[]
Stock_Data:Stock[]
Stock_Data_Filter: Stock[];
Stock_:Stock= new Stock();
// Barcode_:performainvoicedetails= new performainvoicedetails();
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
Sales_Master_Data1:[];UnitName="";Quantity=0;SaleRate=0;discount=0;unitDiscount=0;TotalAmount=0;availablity='';Discount_Description=0;subTotal=0;POnumber;QuotNo;partNo;InvoiceNo;
Sales_Master_1:Quotation_Master= new Quotation_Master();
Address1 ='';Address2 ='';Address3 ='';Address4 ='';Attention;Employee;
totalAmount=0;Total=0;totalDiscount=0;amount1=0;amount2=0;amount3=0;quotationId = 0;

doListView = false;DO_Data=[];poListView=false;
invoiceListView = false;
proformaListView = false;
currencyName=''
Sales_Master_Data=[];printLetterhead = false;

/** Added on 15-10-2024 */

currencyData: currencydetails[];
Currency_Temp: currencydetails = new currencydetails();
Currency: currencydetails = new currencydetails();

AccounttypeData: accounttype[];
accounttype_search:accounttype = new accounttype();
Accounttype_Temp : accounttype = new accounttype();
Accounttype: accounttype = new accounttype();

itemGroupData: Item_Group[];
Item_Group_Search:Item_Group = new Item_Group();
Item_Group_Temp:Item_Group = new Item_Group();

EmployeeData : User_Details[];
Employee_Search:User_Details = new User_Details();
Employee_Temp: User_Details = new User_Details();

PaymentTermData: payment_term[];
PaymentTerm_Temp: payment_term = new payment_term();
Payment_Term_Description_:payment_term = new payment_term();


/*** */


/*** Added on 16-10-2024 */

PrintDate: string;
PerformaInvoiceMaster_Id: number;
PerformaInvoiceMaster_Id_Edit: number;
invoice_Data=[];

/** Added on 28-10-2024 */

Default_Vat_Percentage: number;

/*** Added on 07-11-2024 */

Vatin = '';
addDiscCheck = 0;

printChargeAmount1: boolean = false;
printChargeAmount2: boolean = false;
printCharge1per: boolean = false;
printVAT_Amount: boolean = false;
printDiscount_Description:boolean = false;
printAdditional_Discount: boolean = false;
printRoundoff_Amt: boolean = false;
printTotalDiscount:boolean=false;

SalesQuotationMaster_Id: number;
blankItems: number[] = [];
breakPage: boolean = false;
marginTopItemNameCount : boolean = false;
Customer_Name ='';


constructor(public Sales_Master_Service_:Sales_Master_Service,public currencydetails_Service_:currencydetails_Service, public User_Details_Service_:User_Details_Service,private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog
,private el: ElementRef, private zone: NgZone, private renderer: Renderer2 , public purchaseordermaster_Service_:purchaseordermaster_Service, public Employee_Details_Service_:Employee_Details_Service, public Stock_Service_:Stock_Service,
public Item_Group_Service_:Item_Group_Service, public payment_term_Service_:payment_term_Service, 
public salesquotationmaster_Service_:salesquotationmaster_Service, public Client_Accounts_Service_:Client_Accounts_Service,
private cdr: ChangeDetectorRef) { 
    this.Load_Bill_Type();  
 
    this.Load_Currency();
    this.Load_Payment_Term();    
    this.Load_InvoiceType();
    this.Load_Company() ; 
    this.Load_Vat_Percentage();
    this.Load_Item_Group();   
     // this.Load_Employees();   
}
ngOnInit() 
{
    this.User_Type=(localStorage.getItem('User_Type'));
    this.User_Type_Id=Number(localStorage.getItem('User_Type_Id'));
    this.Login_User_Id=localStorage.getItem('Login_User');
    this.Employee_Name=localStorage.getItem('Employee_Name');
    this.Employee_Id=Number(localStorage.getItem('Employee_Id'));
    this.Permissions = Get_Page_Permission(97);
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

    this.PerformaInvoiceMaster_Id = Number(localStorage.getItem('PerformaInvoiceMaster_Id'));
    localStorage.removeItem('PerformaInvoiceMaster_Id');
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

 
    this.Quotation_Master_.EntryDate=new Date("dd-MMM-yyyy").toString();

    this.Search_FromDate=this.New_Date(this.Search_FromDate);
    this.Search_ToDate=this.New_Date(this.Search_ToDate);
    this.Clr_Sales_Master();
    this.Clr_Sales_Details();
    this.Sales_Print=true;
    this.Entry_View=false;
        
    debugger;
    //this.myDate=new Date();
    if(this.quotationId >0)
    {
        this.loadQuotation()
    }

    debugger;
    if(this.PerformaInvoiceMaster_Id > 0)
    {
      this.Load_PerformaInvoiceMaster()  
    }

    // debugger;
    // if(this.quotationId <= 0 )
    // {
    //     if(this.PerformaInvoiceMaster_Id <= 0)
    // {
    //     this.Search_PerformaInvoice();
    // }
    // }
}
Load_Company() 
    {   
    this.Sales_Master_Service_.Load_Company().subscribe(Rows => {    
    if (Rows != null) {
        debugger;
    this.Print_Company_ = Rows[0][0];
    console.log(Rows[0][0].Note);   
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
            this.issLoading = false;
        },
            Rows => {
                this.issLoading = false;
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
            });
    }
    // Load_Employees() {
    //     this.User_Details_Service_.Search_User_Details('',this.User_Type_Id,this.Login_User_Id).subscribe(Rows => {

    //         this.EmployeeData = Rows[0];
    //         this.Employee_Temp.User_Details_Id = 0;
    //         this.Employee_Temp.User_Details_Name = "Select";
    //         this.EmployeeData.unshift(this.Employee_Temp);
    //         this.Employee_Search = this.EmployeeData[0];
            
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
                this.PaymentTermData = Rows[0];
                this.PaymentTerm_Temp.payment_Term_ID = 0;
                this.PaymentTerm_Temp.Payment_Term_Description = "Select";
                this.PaymentTermData.unshift(this.PaymentTerm_Temp);
                this.Payment_Term_Description_ = this.PaymentTermData[0];
      
        },
            Rows => {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
            });
    }

    loadQuotation(){
        debugger;
        this.Entry_View = true;
        this.issLoading = true;
        // this.Load_Bill_Type();  
        // this.Load_Item_Group();   
        // this.Load_Currency();
        // this.Load_Payment_Term();    
        // this.Load_InvoiceType();
        this.salesquotationmaster_Service_.Get_salesquotationmaster(this.quotationId).subscribe(result=>{
            this.performainvoicemaster_=new performainvoicemaster()
            //this.performainvoice_Data=result[0];
            this.performainvoicemaster_=Object.assign({},result[0][0]); 
            this.performainvoicemaster_.PerformaInvoiceMaster_Id=0;
            this.performainvoicemaster_.LPONo=result[0][0].POnumber;   
            this.performainvoicemaster_.PaymentTermValue=result[0][0].PaymentTermValue;
            // this.performainvoicemaster_.SalesQuotationMaster_Id=this.quotationId;
            this.performainvoicemaster_.Payment_Term_Description=result[0][0].Payment_Term_Description;
             this.performainvoicemaster_.CurrencyId=result[0][0].CurrencyId;
             this.performainvoicemaster_.AccountType_Id=result[0][0].AccountType_Id;
            this.performainvoicemaster_.Account_Party_Id=result[0][0].Account_Party_Id;
             this.performainvoicemaster_.Customer_Name=result[0][0].Customer_Name;

            // this.performainvoicemaster_.Brand=result[0][0].Brand;
            // this.performainvoicemaster_.PriceBasis=result[0][0].PriceBasis;
            // this.performainvoicemaster_.Delivery=result[0][0].Delivery;
            // this.performainvoicemaster_.Validity=result[0][0].Validity;
            // this.performainvoicemaster_.Description1=result[0][0].Description1;
            // this.performainvoicemaster_.Discount_Description=result[0][0].Discount_Description;
            // this.performainvoicemaster_.Charge1=result[0][0].Charge1;
            // this.performainvoicemaster_.Charge2=result[0][0].Charge2;
            // this.performainvoicemaster_.Charge1per=result[0][0].Charge1per;
            // this.performainvoicemaster_.PreparedBy=result[0][0].PreparedBy;
             this.performainvoicemaster_.VAT_Percentage=result[0][0].VAT_Percentage;

            this.Customer_Temp.Client_Accounts_Id=result[0][0].Account_Party_Id;
            this.Customer_Temp.Client_Accounts_Name=result[0][0].Customer_Name;
            this.Customer_=this.Customer_Temp;

            debugger;
            this.performainvoicemaster_.EntryDate=new Date().toString();
            this.performainvoicemaster_.EntryDate=this.formatDate(this.performainvoicemaster_.EntryDate);   
            
            // this.Client_Accounts_Service_.Get_Client_Accounts(this.performainvoicemaster_.Account_Party_Id).subscribe((result)=>{
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
            // })
            
           this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39',"").subscribe(Rows => {  
                if (Rows != null) {
                    this.Customer_Data = Rows[0];
                    for(let i=0;i<Rows[0].length;i++){
                        if(Rows[0][i].Client_Accounts_Id == result[0][0].Account_Party_Id){
                            this.Customer_Temp.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                            this.Customer_Temp.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                             this.Customer_= this.Customer_Temp;

                            this.Customer_  = Rows[0][i];
                            this.Customer_.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                            this.Customer_.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                            this.Customer_Name = Rows[0][i].Client_Accounts_Name;  
                             
                            this.performainvoicemaster_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                            this.performainvoicemaster_.Customer=Rows[0][i].Client_Accounts_Name;  
                             this.performainvoicemaster_.Customer_Name=Rows[0][i].Client_Accounts_Name;  
                             
                             this.performainvoicemaster_.Address1 = Rows[0][i].Address1;
                             this.performainvoicemaster_.Address2 = Rows[0][i].Address2;
                             this.performainvoicemaster_.Address3 = Rows[0][i].Address3;
                             this.performainvoicemaster_.Address4 = Rows[0][i].Address4;
                             this.performainvoicemaster_.Vatin = Rows[0][i].GSTNo;

                            this.Address1 = this.Customer_.Address1;
                            this.Address2 = this.Customer_.Address2;
                            this.Address3 = this.Customer_.Address3;
                            this.Address4 = this.Customer_.Address4;
                            this.Vatin = this.Customer_.GSTNo;
                        }
                    }
                }  
            },);   
            
            this.Sales_Master_Service_.Get_Quotation_Details(result[0][0].SalesQuotationMaster_Id).subscribe(Rows => { 
                if (Rows != null) {
                    this.performainvoicedetails_Data = Rows[0];
                    this.Final_Amounts();
                    this.addBlankRows();                    
                    }                     
                   },
                 Rows => {
                   
                   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                });

                if(this.AccounttypeData==undefined || this.AccounttypeData==null)
                    {
                        this.User_Details_Service_.Load_InvoiceType2().subscribe(Rows => {
                            this.AccounttypeData = Rows[0];
                            this.Accounttype_Temp.AccountType_Id = 0;
                            this.Accounttype_Temp.AccountType_Name = "Select";
                            this.AccounttypeData.unshift(this.Accounttype_Temp);
                            this.Accounttype = this.AccounttypeData[0];
                           
                               for(let i=0;i<this.AccounttypeData.length;i++){
                                if(this.AccounttypeData[i].AccountType_Id == this.performainvoicemaster_.TypeId){
                                    this.Accounttype = this.AccounttypeData[i]
                                }
                            }
                    })
                    }
                    else{
                    for(let i=0;i<this.AccounttypeData.length;i++){
                        if(this.AccounttypeData[i].AccountType_Id == this.performainvoicemaster_.TypeId){
                            this.Accounttype = this.AccounttypeData[i]
                        }
                    }
                }    

                if(this.PaymentTermData==undefined || this.PaymentTermData==null)
                {
                    this.payment_term_Service_.Load_Payment_Term().subscribe(Rows => {
                        this.PaymentTermData = Rows[0];
                        this.PaymentTerm_Temp.payment_Term_ID = 0;
                        this.PaymentTerm_Temp.Payment_Term_Description = "Select";
                        this.PaymentTermData.unshift(this.PaymentTerm_Temp);
                        this.Payment_Term_Description_ = this.PaymentTermData[0];
              
                           for(let i=0;i<this.PaymentTermData.length;i++){
                            if(this.PaymentTermData[i].payment_Term_ID == this.performainvoicemaster_.Payment_Term_Description){
                                this.Payment_Term_Description_ = this.PaymentTermData[i]
                            }
                        }
                })
                }
                else{
                for(let i=0;i<this.PaymentTermData.length;i++){
                    if(this.PaymentTermData[i].payment_Term_ID == this.performainvoicemaster_.Payment_Term_Description){
                        this.Payment_Term_Description_ = this.PaymentTermData[i]
                    }
                }
            }

                if(this.currencyData== undefined || this.currencyData==null)
                {
                    this.currencydetails_Service_.Load_currencydetails().subscribe(Rows => {
                        this.currencyData = Rows[0]; 
                        this.Currency_Temp.CurrencyDetails_Id = 0;
                        this.Currency_Temp.CurrecnyName = "Select";
                        this.currencyData.unshift(this.Currency_Temp);
                        this.Currency = this.currencyData[0];
                       
                        for(var i = 0;i<this.currencyData.length;i++)
                            {
                                if(this.currencyData[i].CurrencyDetails_Id == this.performainvoicemaster_.CurrencyId)
                                {
                                    this.Currency = this.currencyData[i];
                                }
                            }  
                    })
                }
                else{
                for(var i = 0;i<this.currencyData.length;i++)
                    {
                        if(this.currencyData[i].CurrencyDetails_Id == this.performainvoicemaster_.CurrencyId)
                        {
                            this.Currency = this.currencyData[i];
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
    this.CGST_SUM=0;
    this.SGST_SUM=0;
    this.GST_Sum=0;
    this.Tot_discount=0;
    this.Tot_Cess=0;
    this.Tot_Amount=0;
    this.Tot_Net=0;
    this.Tot_Gross=0;
    this.invoiceListView = false;
    this.doListView = false;
    this.Clr_Sales_Master();
    this.Clr_Sales_Details();
    //this.Load_Dropdowns();
    this.Quotation_Details_Data=[];
    this.performainvoicedetails_Data=[];
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
   //this.Load_Company() ;   
   this.performainvoicemaster_.EntryDate=this.formatDate(this.performainvoicemaster_.EntryDate);
   
    for (let i = 0; i < this.currencyData.length; i++) {
        if(this.performainvoicemaster_.CurrencyId == this.currencyData[i].CurrencyDetails_Id){
            this.currencyName = this.currencyData[i].CurrecnyName
        }
        
       }
   
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
    this.printTotalDiscount=false;

    if (this.performainvoicemaster_.Charge1per != '')
        if (this.performainvoicemaster_.Charge1per != null)
            if (this.performainvoicemaster_.Charge1per != undefined)
                if (this.performainvoicemaster_.Charge1per.toString() != '0')
                    if (this.performainvoicemaster_.Charge1per.toString() != 'null')
                        if (this.performainvoicemaster_.Charge1per.toString() != 'undefined') 
                            if (this.performainvoicemaster_.Charge1per.toString() != '0.00')
                            {
                            this.printCharge1per = true;
                        }


    if (this.performainvoicemaster_.charge1_Amount != 0)
        if (this.performainvoicemaster_.charge1_Amount != null)
            if (this.performainvoicemaster_.charge1_Amount != undefined)
                if (this.performainvoicemaster_.charge1_Amount.toString() != '0')
                    if (this.performainvoicemaster_.charge1_Amount.toString() != 'null')
                        if (this.performainvoicemaster_.charge1_Amount.toString() != 'undefined')
                            if (this.performainvoicemaster_.charge1_Amount.toString() != '0.000') {
                                this.printChargeAmount1 = true;
                            }


                            
    if (this.performainvoicemaster_.TotalDiscount != 0)
        if (this.performainvoicemaster_.TotalDiscount != null)
            if (this.performainvoicemaster_.TotalDiscount != undefined)
                if (this.performainvoicemaster_.TotalDiscount.toString() != '0')
                    if (this.performainvoicemaster_.TotalDiscount.toString() != 'null')
                        if (this.performainvoicemaster_.TotalDiscount.toString() != 'undefined')
                            if (this.performainvoicemaster_.TotalDiscount.toString() != '0.000') {
                                this.printTotalDiscount = true;
                            }




    debugger;
    if (this.performainvoicemaster_.charge2_Amount != 0)
        if (this.performainvoicemaster_.charge2_Amount != null)
            if (this.performainvoicemaster_.charge2_Amount != undefined)
                if (this.performainvoicemaster_.charge2_Amount.toString() != '0')
                    if (this.performainvoicemaster_.charge2_Amount.toString() != 'null')
                        if (this.performainvoicemaster_.charge2_Amount.toString() != 'undefined')
                            if (this.performainvoicemaster_.charge2_Amount.toString() != '0.000') {
                                this.printChargeAmount2 = true;
                            }


    debugger;
    if (this.performainvoicemaster_.VAT_Amount != 0)
        if (this.performainvoicemaster_.VAT_Amount != null)
            if (this.performainvoicemaster_.VAT_Amount != undefined)
                if (this.performainvoicemaster_.VAT_Amount.toString() != '0')
                    if (this.performainvoicemaster_.VAT_Amount.toString() != 'null')
                        if (this.performainvoicemaster_.VAT_Amount.toString() != 'undefined') {
                            this.printVAT_Amount = true;
                        }

    if (this.performainvoicemaster_.Discount_Description != '')
        if (this.performainvoicemaster_.Discount_Description != null)
            if (this.performainvoicemaster_.Discount_Description != undefined)
                if (this.performainvoicemaster_.Discount_Description.toString() != '0')
                    if (this.performainvoicemaster_.Discount_Description.toString() != 'null')
                        if (this.performainvoicemaster_.Discount_Description.toString() != 'undefined') {
                            this.printDiscount_Description = true;
                        }


    if (this.performainvoicemaster_.Additional_Discount != 0)
        if (this.performainvoicemaster_.Additional_Discount != null)
            if (this.performainvoicemaster_.Additional_Discount != undefined)
                if (this.performainvoicemaster_.Additional_Discount.toString() != '0')
                    if (this.performainvoicemaster_.Additional_Discount.toString() != 'null')
                        if (this.performainvoicemaster_.Additional_Discount.toString() != 'undefined') {
                            this.printAdditional_Discount = true;
                        }

    if (this.performainvoicemaster_.Roundoff_Amt != 0)
        if (this.performainvoicemaster_.Roundoff_Amt != null)
            if (this.performainvoicemaster_.Roundoff_Amt != undefined)
                if (this.performainvoicemaster_.Roundoff_Amt.toString() != '0')
                    if (this.performainvoicemaster_.Roundoff_Amt.toString() != 'null')
                        if (this.performainvoicemaster_.Roundoff_Amt.toString() != 'undefined') {
                            this.printRoundoff_Amt = true;
                        }

                        // this.addBlankRows();

    setTimeout( () =>{
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
    this.performainvoicedetails_Index=-1;
    this.performainvoicemaster_.PerformaInvoiceMaster_Id=0;
    this.performainvoicemaster_.Account_Party_Id=0;
    //this.Quotation_Master_.Employee_Id=0;
    //this.Quotation_Master_.Employee_Name=this.Employee_Name;
    this.performainvoicemaster_.User_Id=0;
    // this.Quotation_Master_.EntryDate=new Date();
    // this.Quotation_Master_.EntryDate=this.New_Date(this.Quotation_Master_.EntryDate);

    this.performainvoicemaster_.EntryDate=new Date().toString();
    this.performainvoicemaster_.EntryDate=this.formatDate(this.performainvoicemaster_.EntryDate);

    // this.performainvoicemaster_.EntryDate=new Date();
    // this.performainvoicemaster_.EntryDate=this.New_Date(this.performainvoicemaster_.EntryDate);

    this.performainvoicemaster_.InvoiceNo='';
    this.performainvoicemaster_.CurrencyId=0;
    this.performainvoicemaster_.AccountType_Id=0;

    this.SalesQuotationMaster_Id = 0;
    this.performainvoicemaster_.SalesQuotationMaster_Id = 0;

    this.performainvoicemaster_.Brand="";
    this.performainvoicemaster_.PriceBasis="";
    this.performainvoicemaster_.PaymentTerms = null;
    this.performainvoicemaster_.Payment_Term_Description = null;
    this.performainvoicemaster_.Delivery = "";
    this.performainvoicemaster_.Validity = "";
    this.performainvoicemaster_.Description1 = "";
    this.performainvoicemaster_.Discount_Description = null;
    this.performainvoicemaster_.Charge1 = "";
    this.performainvoicemaster_.Charge1per = null;
    this.performainvoicemaster_.Charge2 = "";
    this.performainvoicemaster_.PreparedBy = "";
    this.performainvoicemaster_.VAT_Percentage = this.Default_Vat_Percentage;;
    this.performainvoicemaster_.Additional_Discount = null;
    this.performainvoicemaster_.charge1_Amount = null;
    this.performainvoicemaster_.charge2_Amount = null;
    this.performainvoicemaster_.TotalDiscount = null;
    this.performainvoicemaster_.VAT_Amount = null;
    this.performainvoicemaster_.Total_Amount = null;
    this.performainvoicemaster_.Roundoff_Amt = null;
    this.performainvoicemaster_.Amount_In_Words = "";
    this.performainvoicemaster_.NetTotal=0;
    // this.performainvoicedetails_.Cess=0;
    // this.performainvoicedetails_.RoundOff=0;
    this.performainvoicemaster_.TotalAmount=0;
    this.performainvoicemaster_.Description2="";
    this.performainvoicemaster_.PaymentTermValue = null;
    this.performainvoicemaster_.POnumber =null;
    this.performainvoicemaster_.Total = null;

    // this.performainvoicedetails_.Address1="";
    // this.performainvoicedetails_.Address2="";
    // this.performainvoicedetails_.Address3="";
    // this.performainvoicedetails_.Address4="";
    // this.performainvoicedetails_.Mobile="";
    // this.performainvoicemaster_.Customer_Name="";
    // this.performainvoicemaster_.PinCode="";
    this.performainvoicemaster_.KindAttend="";    
    this.performainvoicemaster_.GrandTotal=null;
    // this.performainvoicemaster_.Transportation_Gst=0;
    // this.performainvoicemaster_.Handling_Gst=0;
    // this.performainvoicemaster_.Transportation_Total=0;
    // this.performainvoicemaster_.Handling_Total=0;
    // this.performainvoicemaster_.Vehicle_No="";
    // this.performainvoicemaster_.Driver_Name="";
    // this.performainvoicemaster_.Mobile_No = "";
    // this.performainvoicemaster_.Delivery_Address1 = "";
    // this.performainvoicemaster_.Delivery_Address2 = "";
    // this.performainvoicemaster_.Delivery_Address3 = "";
    // this.performainvoicemaster_.Delivery_Address4 = "";
    if(this.Bill_Type_Data!=undefined && this.Bill_Type_Data!=null)
    this.Bill_Type_=this.Bill_Type_Data[1];

    if(this.PaymentTermData!=undefined && this.PaymentTermData!=null)
        this.Payment_Term_Description_=this.PaymentTermData[0];

    if(this.Bill_Mode_Data!=undefined && this.Bill_Mode_Data!=null)
    this.Bill_Mode_=this.Bill_Mode_Data[0];
    this.Customer_=null;
    this.performainvoicedetails_Data=[];
    this.Customer_Name = null;
    this.Address1 = null;
    this.Address2 = null;
    this.Address3 = null;
    this.Address4 = null;
    this.POnumber = null;
    this.Attention = null;
    this.Employee = null;
    this.Tot_Amount = null;
    this.Total = null;
    this.Stock_Data=null;
    this.ItemCodeData=null;
    this.Quotation_Details_Index=-1;
    // this.PerformaInvoiceMaster_Id = 0;
    this.PerformaInvoiceMaster_Id_Edit = 0;
    

    if(this.currencyData!=undefined && this.currencyData!=null)
        this.Currency = this.currencyData[0];

    if(this.AccounttypeData!=undefined && this.AccounttypeData!=null)
        this.Accounttype = this.AccounttypeData[0];

    this.performainvoicemaster_.LPONo = ''

}
Clr_Sales_Details()
{
    this.Quotation_Details_Index=-1;
    this.performainvoicedetails_Index=-1;
    this.performainvoicedetails_.PerformaMaster_Id=0;
    this.performainvoicedetails_.PerformaInvoiceDetails_Id=0;
    this.performainvoicedetails_.StockId=0;
    //this.performainvoicedetails_.Stock_Details_Id=0;
    this.performainvoicedetails_.ItemId=0;
    this.performainvoicedetails_.ItemName="";
    this.performainvoicedetails_.Item_Code="";
    this.performainvoicedetails_.GroupId=0;
    this.performainvoicedetails_.GroupName="";
    this.performainvoicedetails_.UnitId=0;
    this.performainvoicedetails_.UnitName="";
    // this.performainvoicedetails_.Item_Code="";

    this.performainvoicedetails_.SaleRate=null;
    this.performainvoicedetails_.Unit_Discount = null;
    this.performainvoicedetails_.TotalAmount =null;
    this.performainvoicedetails_.UnitPrice =null;

    // this.performainvoicedetails_.PurchaseRate=0;
    // this.performainvoicedetails_.SaleRate=0;
    this.performainvoicedetails_.MRP=null;
    this.performainvoicedetails_.TaxAmount=null;
    // this.performainvoicedetails_.Stock=0;
    this.performainvoicedetails_.HSNCODE="";
    this.performainvoicedetails_.SaleTax=null;
    // this.performainvoicedetails_.CGST=0;
    // this.performainvoicedetails_.IGST=0;
    // this.performainvoicedetails_.SGST=0;
    // this.performainvoicedetails_.Cesspers=0;
    this.performainvoicedetails_.Quantity=null;
    // this.performainvoicedetails_.GrossValue=0;
    this.performainvoicedetails_.Discount=null;
    this.performainvoicedetails_.NetValue=null;
    // this.performainvoicedetails_.CGSTAMT=0;
    // this.performainvoicedetails_.SGSTAMT=0;
    // this.performainvoicedetails_.IGSTAMT=0;
    // this.performainvoicedetails_.CessAMT=0;
    // this.performainvoicedetails_.TotalAmount=0;
    // this.performainvoicedetails_.Description="";
    
    this.Barcode_=null;
    this.Item_=null;
    this.UnitName = null;
    this.Quantity = null;
    this.SaleRate = null;
    this.discount = null;
    this.unitDiscount = null;
    this.TotalAmount = null;
    this.availablity = null;
    this.Stock_Data=null;
    this.ItemCodeData=null;
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
    this.performainvoicedetails_Data.splice(index, 1);   
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


// Delete_Quotation_Master(PerformaInvoiceMaster_Id,index)
//  {
//     const dialogRef = this.dialogBox.open
//     ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
//     dialogRef.afterClosed().subscribe(result =>        
//     {    
//     if(result=='Yes')
//     {
//     this.issLoading=true;
//     debugger
//     this.Sales_Master_Service_.Delete_Performa_Invoice_Master(PerformaInvoiceMaster_Id).subscribe(Delete_status => {    
//         debugger   
//         Delete_status=Delete_status[1];
//     if(Delete_status[0].PerformaInvoiceMaster_Id1_>0){
//     this.Quotation_Master_Data.splice(index, 1);
//       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
      
//       this.Search_Quotation();
//     }
//     else
//     {
//     //this.Sales_Master_Data.splice(index, 1);
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});
//     }
//     this.issLoading=false;
//     },
//     Rows => {
//         this.issLoading=false;
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error',Type:"2"}});
//     });
//     }
//     });
// }



Delete_Performa_Invoice_Master(PerformaInvoiceMaster_Id,index)
 {
    const dialogRef = this.dialogBox.open
    ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>        
    {    
    if(result=='Yes')
    {
    this.issLoading=true;
    this.Sales_Master_Service_.Delete_Performa_Invoice_Master(PerformaInvoiceMaster_Id).subscribe({
        next: (res: any) => {
            if (res && res.success) {
                const data = res.data;
                const rows = Array.isArray(data) ? data : (data && data.rows ? data.rows : []);
                const result = rows && rows[0] ? rows[0] : (Array.isArray(data) ? data[0] : null);

                if (result && result.PerformaInvoiceMaster_Id_ == -1) {
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
     debugger
    this.purchaseordermaster_Service_.Search_PurchaseOrderNumber_Typeahead(Value).subscribe(Rows => {     
    debugger
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


// Search_Item_Typeahead(event: any)
// {
//     var Value = "";
//     if (event.target.value == "") Value = "";
//     else Value = event.target.value.toLowerCase();
//     if (this.Stock_Data == undefined || this.Stock_Data.length == 0) {
//             this.issLoading = true;
//     this.Sales_Master_Service_.Search_Item_Typeahead(Value).subscribe(Rows => {

//         if (Rows != null) {
//             this.Stock_Data = Rows[0];
//             this.Stock_Data_Filter = [];

//             for (var i = 0; i < this.Stock_Data.length; i++) {
//                 if (
//                     this.Stock_Data[i].ItemName.toLowerCase().includes(Value)
//                 )
//                     this.Stock_Data_Filter.push(this.Stock_Data[i]);
//             }
//         }
    
//         this.issLoading = false;
//     },
//         Rows => {             
//             this.issLoading = false;
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//         });
//     }

//     else {
//         this.Stock_Data_Filter = [];
//         for (var i = 0; i < this.Stock_Data.length; i++) {
//             if (this.Stock_Data[i].ItemName.toLowerCase().includes(Value))
//                 this.Stock_Data_Filter.push(this.Stock_Data[i]);
//         }
//     }

//     }

    Search_Item_Typeahead(event: any)
    {    
        debugger
        var Value = "";   
        if(this.Barcode_ == null || this.Barcode_ == undefined)
             this.Barcode_ = new performainvoicedetails();         
         Value = event.target.value;    
         if(Value == null || Value == undefined || Value == "undefined" || Value == "null")
             Value = "";
         if(this.Barcode_.Item_Code)
            {
                this.Barcode_.ItemName=Value
            } 
         this.performainvoicedetails_.ItemName=Value;
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
// display_Item(Stock_e: Stock)
// {
//      if (Stock_e) { return Stock_e.ItemName; }
// }


Search_PurchaseItem_Typeahead(event: any)
{
  var Value = "";

  if(this.Barcode_ == null || this.Barcode_ == undefined)
    this.Barcode_ = new performainvoicedetails();


  if (event.target.value == "") Value = "";
  else Value = event.target.value.toLowerCase();
        
  if(this.Barcode_.Item_Code)
    {
        this.Barcode_.ItemName=Value
    }

  this.performainvoicedetails_.ItemName=Value;

  this.issLoading = true;
  this.Sales_Master_Service_.Search_PurchaseItem_Typeahead(Value).subscribe(Rows => {

      if (Rows != null) {
          this.Stock_Data = Rows[0];
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

    this.performainvoicemaster_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.performainvoicemaster_.Customer=this.Customer_.Client_Accounts_Name;
    this.performainvoicemaster_.Account_Party_Id=this.Customer_.Client_Accounts_Id;

    this.performainvoicemaster_.Address1 = this.Customer_.Address1;
    this.performainvoicemaster_.Address2 = this.Customer_.Address2;
    this.performainvoicemaster_.Address3 = this.Customer_.Address3;
    this.performainvoicemaster_.Address4 = this.Customer_.Address4;
    this.performainvoicemaster_.Mobile = this.Customer_.Mobile;
    this.performainvoicemaster_.PinCode=this.Customer_.PinCode;
    this.performainvoicemaster_.Vatin=this.Customer_.GSTNo;

    this.Customer_Name = this.Quotation_Master_.Customer_Name;

    this.Address1 = this.Quotation_Master_.Address1;
    this.Address2 = this.Quotation_Master_.Address2;
    this.Address3 = this.Quotation_Master_.Address3;
    this.Address4 = this.Quotation_Master_.Address4;
    this.Vatin = this.Quotation_Master_.GSTNo;

}

selectCustomer(){

    this.performainvoicemaster_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.performainvoicemaster_.Customer=this.Customer_.Client_Accounts_Name;
    this.performainvoicemaster_.Account_Party_Id=this.Customer_.Client_Accounts_Id;

    this.performainvoicemaster_.Address1 = this.Customer_.Address1;
    this.performainvoicemaster_.Address2 = this.Customer_.Address2;
    this.performainvoicemaster_.Address3 = this.Customer_.Address3;
    this.performainvoicemaster_.Address4 = this.Customer_.Address4;
    this.performainvoicemaster_.Mobile = this.Customer_.Mobile;
    this.performainvoicemaster_.PinCode=this.Customer_.PinCode;
    this.performainvoicemaster_.Vatin=this.Customer_.GSTNo;

    this.Customer_Name = this.Quotation_Master_.Customer_Name;

    this.Address1 = this.Customer_.Address1;
    this.Address2 = this.Customer_.Address2;
    this.Address3 = this.Customer_.Address3;
    this.Address4 = this.Customer_.Address4;
    this.Vatin = this.Customer_.GSTNo;
}

Barcode_Change(Barcode_sl:performainvoicedetails)
{    
      debugger
    this.performainvoicedetails_=Object.assign({},Barcode_sl);
    this.performainvoicedetails_Temp_.ItemId=Barcode_sl.ItemId;
    this.performainvoicedetails_Temp_.ItemName=Barcode_sl.ItemName;
    this.Item_=Object.assign({},this.performainvoicedetails_Temp_);   
    this.performainvoicedetails_.ItemId=Barcode_sl.ItemId;
    this.performainvoicedetails_.ItemName=Barcode_sl.ItemName;
    this.performainvoicedetails_.StockId=Barcode_sl.StockId;
    this.performainvoicedetails_.Quantity=0;

}



Plus_Sales_Details(event)
{   
    debugger;
  if(this.Stock_==undefined || this.Stock_==null || this.Stock_.ItemId==undefined || this.Stock_.ItemId==0 )
    {
        const dialogRef = this.dialogBox.open ( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Select Item ',Type:"3"}});
        return
    }
    else if(this.performainvoicedetails_.SaleRate==undefined || this.performainvoicedetails_.SaleRate==null || this.performainvoicedetails_.SaleRate==0 )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter the Unit Price',Type:"3"}});
        return
    }
    else if(this.performainvoicedetails_.Quantity==undefined || this.performainvoicedetails_.Quantity==null || this.performainvoicedetails_.Quantity==0 )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter the Quantity',Type:"3"}});
        return
    } 
    if(this.Stock_.SaleTax==undefined || this.Stock_.SaleTax==null)this.Stock_.SaleTax=0;
    this.performainvoicedetails_.TaxableAmount = this.TotalAmount-this.discount;
    this.performainvoicedetails_.TaxAmount = this.performainvoicedetails_.TaxableAmount * (this.safeNumber(this.Stock_.SaleTax) / 100)

    if (this.performainvoicedetails_Data == undefined)
        this.performainvoicedetails_Data = [];

    var inserted = 0;
    for (var i = 0; i < this.performainvoicedetails_Data.length; i++) {
        if (this.performainvoicedetails_Data[i].Stock_Id == this.performainvoicedetails_.Stock_Id) {
            if (this.performainvoicedetails_Index == i) {
                this.performainvoicedetails_Data[i] = Object.assign({}, this.performainvoicedetails_)// this.performainvoicedetails_;
            }
            else {
                this.performainvoicedetails_.Quantity = Number(this.performainvoicedetails_Data[i].Quantity) + Number(this.performainvoicedetails_.Quantity);
               
                if (this.performainvoicedetails_.Discount == undefined || this.performainvoicedetails_.Discount == null)
                    this.performainvoicedetails_.Discount = 0;
            
                if (this.performainvoicedetails_.SaleTax == undefined || this.performainvoicedetails_.SaleTax == null)
                    this.performainvoicedetails_.SaleTax = 0;
                
                this.performainvoicedetails_.TotalAmount = Number(this.performainvoicedetails_.Quantity) * Number(this.performainvoicedetails_.SaleRate);

                this.performainvoicedetails_.NetValue = Number(this.performainvoicedetails_.TotalAmount) - Number(this.performainvoicedetails_.Discount);
                this.performainvoicedetails_.TaxAmount = Number(this.performainvoicedetails_.NetValue) * Number(this.performainvoicedetails_.SaleTax) / 100;
              if(this.Stock_.SaleTax==undefined || this.Stock_.SaleTax==null)
                this.Stock_.SaleTax=0;
           
                    // this.performainvoicedetails_.Cesspers = 0;
                    // this.performainvoicedetails_.CessAMT = 0;
                    // this.Cess = 0;
                // }
                // this.performainvoicedetails_.TotalAmount = this.performainvoicedetails_.NetValue + 
                // this.performainvoicedetails_.CGSTAMT + this.performainvoicedetails_.SGSTAMT + this.performainvoicedetails_.CessAMT;
                this.performainvoicedetails_.GrossValue = Number(this.performainvoicedetails_.GrossValue.toFixed(3));
                this.performainvoicedetails_.NetValue = Number(this.performainvoicedetails_.NetValue.toFixed(3));
                // this.performainvoicedetails_.CGSTAMT = Number(this.performainvoicedetails_.CGSTAMT.toFixed(2));
                // this.performainvoicedetails_.SGSTAMT = Number(this.performainvoicedetails_.SGSTAMT.toFixed(2));
                this.performainvoicedetails_.TaxAmount = Number(this.performainvoicedetails_.TaxAmount.toFixed(3));
                // this.performainvoicedetails_.CessAMT = Number(this.performainvoicedetails_.CessAMT.toFixed(2));
                this.performainvoicedetails_.TotalAmount = Number(this.performainvoicedetails_.TotalAmount.toFixed(3));
                this.performainvoicedetails_Data[i] = Object.assign({}, this.performainvoicedetails_)// this.Sales_Details_;
            
                this.performainvoicedetails_.Item_Code = this.Barcode_.Item_Code;
                this.performainvoicedetails_.TaxableAmount = this.TotalAmount-this.discount;
                this.performainvoicedetails_.TaxAmount = this.performainvoicedetails_.TaxableAmount * (this.safeNumber(this.Stock_.SaleTax) / 100)
                
            
            }
            if (this.performainvoicedetails_Index != i && this.performainvoicedetails_Index >= 0) {
                this.performainvoicedetails_Data.splice(this.performainvoicedetails_Index, 1)
            }
            inserted = 1;
            i = this.performainvoicedetails_Data.length;
            break;
        }
    }
    if (inserted == 0) {
        if (this.performainvoicedetails_Index >= 0) {
            this.performainvoicedetails_Data[this.performainvoicedetails_Index] = Object.assign({}, this.performainvoicedetails_)// this.Sales_Details_;
        }
        else {
            this.performainvoicedetails_Data.push(Object.assign({}, this.performainvoicedetails_));
        }
    }
    this.performainvoicedetails_Index = -1;
    this.Focus_It(event);
    this.Clr_Sales_Details();
    this.addBlankRows();
    this.Final_Amounts();
}


// Calculate_Performa_Details_Amount()
// {
//     debugger
//     if(this.performainvoicedetails_.Quantity == undefined || this.performainvoicedetails_.Quantity == null)
//     this.performainvoicedetails_.Quantity = 0;
//     if(this.performainvoicedetails_.SaleRate == undefined || this.performainvoicedetails_.SaleRate == null)
//     this.performainvoicedetails_.SaleRate = 0;
// debugger
//  this.Calculate_Total_Amount();
// }
// Calculate_Total_Amount()
// { 
//     debugger
//     this.performainvoicedetails_.Unit_Discount = (this.performainvoicedetails_.SaleRate * this.performainvoicedetails_.Discount )/ 100;
//     this.performainvoicedetails_.TotalAmount = this.performainvoicedetails_.Quantity * this.performainvoicedetails_.SaleRate - (this.performainvoicedetails_.Unit_Discount *this.performainvoicedetails_.Quantity);
//     this.performainvoicedetails_.TaxableAmount = this.TotalAmount-this.discount;
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
//     this.Tot_Gross=0,this.Tot_discount=0,this.Tot_Net=0,this.CGST_SUM=0,this.SGST_SUM=0,this.GST_Sum=0,this.Tot_Cess=0,this.Tot_Amount=0;
//     for(var i = 0; i< this.performainvoicedetails_Data.length ; i++)
//     {
//         this.Tot_Gross = Number(this.Tot_Gross) + Number(this.performainvoicedetails_Data[i].GrossValue);
//         // this.Tot_discount = Number(this.Tot_discount) + Number(this.performainvoicedetails_Data[i].Discount);
//         this.Tot_Net = Number(this.Tot_Net) + Number(this.performainvoicedetails_Data[i].NetValue);
//         this.Tot_Amount = Number(this.Tot_Amount) + Number(this.performainvoicedetails_Data[i].SaleRate) * Number(this.performainvoicedetails_Data[i].Quantity);
//         this.Tot_discount = Number(this.Tot_discount)+  (Number(this.performainvoicedetails_Data[i].Unit_Discount) * Number(this.performainvoicedetails_Data[i].Quantity) );

//         // this.Tot_Amount = Number(this.Tot_Amount) + Number(this.performainvoicedetails_Data[i].TotalAmount);
//     }

//     this.Tot_Amount = Number(this.Tot_Amount.toFixed(2));
//     this.Tot_discount = Number(this.Tot_discount.toFixed(2));
//     // this.performainvoicemaster_.GrossTotal = Number(this.Tot_Gross.toFixed(2));
//     // this.performainvoicemaster_.TotalDiscount = Number(this.Tot_discount.toFixed(2));
//     // this.performainvoicemaster_.NetTotal = Number(this.Tot_Net.toFixed(2));
//     // this.performainvoicemaster_.TotalCGST = Number(this.CGST_SUM.toFixed(2));
//     // this.performainvoicemaster_.ToalSGST =  Number(this.SGST_SUM.toFixed(2));
//     // this.performainvoicemaster_.Cess = this.Tot_Cess;
//     // this.performainvoicemaster_.TotalGST = Number(this.GST_Sum.toFixed(2));  
//     // this.performainvoicemaster_.Cess = Number(this.Tot_Cess.toFixed(2)); 
//     this.performainvoicemaster_.TotalAmount = Number(this.Tot_Amount.toFixed(2));
//     var Transportation_Gst = 0, Transportation_Total = 0, Handling_Gst = 0, Handling_Total = 0;
// //     if (this.performainvoicemaster_.Transportation_Charge == undefined || this.performainvoicemaster_.Transportation_Charge == null)
// //         this.performainvoicemaster_.Transportation_Charge = 0;
// //     if (this.performainvoicemaster_.Handling_Charge == undefined || this.performainvoicemaster_.Handling_Charge == null)
// //         this.performainvoicemaster_.Handling_Charge = 0;
// //     if(this.performainvoicemaster_.Isgst==true)
// //     {
// //         this.performainvoicemaster_.Transportation_Gst = Number(this.performainvoicemaster_.Transportation_Charge) * (18 / 100)
// //         this.performainvoicemaster_.Transportation_Total = Number(this.performainvoicemaster_.Transportation_Charge) + Number(this.performainvoicemaster_.Transportation_Gst) ;
// //         this.performainvoicemaster_.Handling_Gst = (this.performainvoicemaster_.Handling_Charge) * (18 / 100)
// //         this.performainvoicemaster_.Handling_Total = Number(this.performainvoicemaster_.Handling_Charge) + Number(this.performainvoicemaster_.Handling_Gst);
// //    }
// //     else
// //     {
// //         this.performainvoicemaster_.Transportation_Gst = 0;
// //         this.performainvoicemaster_.Transportation_Total = Number(this.performainvoicemaster_.Transportation_Charge);
// //         this.performainvoicemaster_.Transportation_Total = Number(this.performainvoicemaster_.Transportation_Total.toFixed(2));
// //         this.performainvoicemaster_.Handling_Gst = 0;
// //         this.performainvoicemaster_.Handling_Total = Number(this.performainvoicemaster_.Handling_Charge);
// //         this.performainvoicemaster_.Handling_Total = Number(this.performainvoicemaster_.Handling_Total.toFixed(2));
// //     }
// //     if(this.performainvoicemaster_.RoundOff == undefined || this.performainvoicemaster_.RoundOff == null)
// //         this.performainvoicemaster_.RoundOff = 0;
// //     this.performainvoicemaster_.GrandTotal = Number(this.performainvoicemaster_.RoundOff) + Number(this.performainvoicemaster_.TotalAmount)+Number(this.performainvoicemaster_.Handling_Total) + Number(this.performainvoicemaster_.Transportation_Total);;
//     this.performainvoicemaster_.GrandTotal = Number(this.performainvoicemaster_.GrandTotal.toFixed(2));
  
// this.Clr_Sales_Edit_Data();
// }



// Final_Amounts()
// {      

//     debugger
//     this.Tot_Gross=0,this.Tot_discount=0,this.Tot_Net=0,this.Tot_Amount=0;
//     for(var i = 0; i< this.performainvoicedetails_Data.length ; i++)
//     {
//         this.Tot_Amount = Number(this.Tot_Amount) + Number(this.performainvoicedetails_Data[i].SaleRate) * Number(this.performainvoicedetails_Data[i].Quantity);

//         this.Tot_discount = Number(this.Tot_discount)+  (Number(this.performainvoicedetails_Data[i].Unit_Discount) * Number(this.performainvoicedetails_Data[i].Quantity) );
        
//     }
//     this.Tot_Amount = Number(this.Tot_Amount.toFixed(2));
//     this.Tot_discount = Number(this.Tot_discount.toFixed(2));
//     if(Number(this.performainvoicemaster_.Discount_Description)>0){
//         this.performainvoicemaster_.Additional_Discount = Number(this.Tot_Amount) * (Number(this.performainvoicemaster_.Discount_Description)/ 100);

//     }else{
//         this.performainvoicemaster_.Additional_Discount = 0
//     }
//     //this.Quotation_Master_.Discount_Description = (this.safeNumber(this.Quotation_Master_.Additional_Discount) * 100)/this.Tot_Amount
//     this.performainvoicemaster_.TotalDiscount = Number(this.Tot_discount)+ Number(this.performainvoicemaster_.Additional_Discount);
//     if(Number(this.performainvoicemaster_.Charge1per)>0){
//         this.performainvoicemaster_.charge1_Amount = (Number(this.Tot_Amount) - Number(this.performainvoicemaster_.Additional_Discount))* (Number(this.performainvoicemaster_.Charge1per)/100)
//         this.performainvoicemaster_.charge1_Amount = Number(this.performainvoicemaster_.charge1_Amount.toFixed(2))
        
//     }else{
//         this.performainvoicemaster_.charge1_Amount =  0;
//     }
//     this.Total = this.Tot_Amount-Number(this.performainvoicemaster_.TotalDiscount) + this.safeNumber(this.performainvoicemaster_.charge2_Amount) + Number(this.performainvoicemaster_.charge1_Amount)
    
//     this.Total = Number(this.Total.toFixed(2))
//     this.performainvoicemaster_.VAT_Amount = 0;
//     if(this.performainvoicemaster_.VAT_Percentage>0){
//         this.performainvoicemaster_.VAT_Amount = this.Total * (this.performainvoicemaster_.VAT_Percentage/100)
//     }
//     this.performainvoicemaster_.VAT_Amount = Number(this.performainvoicemaster_.VAT_Amount.toFixed(2))    
//     this.performainvoicemaster_.Total_Amount = this.Total + this.performainvoicemaster_.VAT_Amount
//     this.performainvoicemaster_.Total_Amount = Number(this.performainvoicemaster_.Total_Amount.toFixed(2))
//     this.performainvoicemaster_.NetTotal = Number((this.performainvoicemaster_.Total_Amount - this.safeNumber(this.performainvoicemaster_.Roundoff_Amt)).toFixed(2))
//     this.performainvoicemaster_.NetTotal = Number(this.performainvoicemaster_.NetTotal.toFixed(2))
//     this.performainvoicemaster_.Amount_In_Words = this.numberToWordsIndianCurrency(this.performainvoicemaster_.NetTotal)
     
   
// //this.Clr_Sales_Edit_Data();
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
    // this.Sales_Master_Total_Amount=0;    
    // if (this.Date_Check == true )
    //     look_In_Date_Value = 1;
    // if(this.Search_Customer.Client_Accounts_Id==null || this.Search_Customer.Client_Accounts_Id==undefined)
    //  CustomerId_=0;
    // else
    //  CustomerId_=this.Search_Customer.Client_Accounts_Id;
    // if(this.Item_Group_Search.Item_Group_Id==null || this.Item_Group_Search.Item_Group_Id==undefined)
    //     Item_Group_Id_=0;
    // else
    //     Item_Group_Id_=this.Item_Group_Search.Item_Group_Id;
    // if(this.Currency_Search.CurrencyDetails_Id==null || this.Currency_Search.CurrencyDetails_Id==undefined)
    //     CurrencyDetails_Id_=0;
    // else
    //     CurrencyDetails_Id_=this.Currency_Search.CurrencyDetails_Id;
    // if(this.Employee_Search.User_Details_Id==null || this.Employee_Search.User_Details_Id==undefined)
    //     User_Details_Id_=0;
    // else
    //     User_Details_Id_=this.Employee_Search.User_Details_Id;
    // this.issLoading=true;    
    // this.QuotNo = this.QuotNo == "" ? undefined : this.QuotNo
    // this.partNo = this.partNo == "" ? undefined : this.partNo
    
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
//     debugger
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
//     this.performainvoicedetails_.ItemId = this.Stock_.ItemId;
//     this.performainvoicedetails_.ItemCode = this.Barcode_.Item_Code;
//     this.performainvoicedetails_.ItemName = this.Stock_.ItemName;
//     this.performainvoicedetails_.GroupId = this.Stock_.GroupId;
//     this.performainvoicedetails_.GroupName = this.Stock_.GroupName;
//     this.performainvoicedetails_.UnitId = this.Stock_.UnitId;
//     this.performainvoicedetails_.UnitName = this.Stock_.UnitName;
//     this.performainvoicedetails_.StockId = this.Stock_.Stock_Id;
//     this.performainvoicedetails_.HSNMasterId = this.Stock_.HSNMasterId;
//     this.performainvoicedetails_.HSNCODE = this.Stock_.HSNCODE;
//     this.performainvoicedetails_.UnitPrice = this.SaleRate;
//     this.performainvoicedetails_.Quantity = this.Quantity;
//     this.performainvoicedetails_.Amount = this.TotalAmount;
//     this.performainvoicedetails_.Discount = this.discount;
//     // this.performainvoicedetails_.Availability = this.availablity;
//     this.performainvoicedetails_.Unit_Discount = this.unitDiscount;
//     this.performainvoicedetails_.Sale_Tax = this.Stock_.SaleTax;
//     this.performainvoicedetails_.TaxableAmount = this.TotalAmount-this.discount;
//     this.performainvoicedetails_.TaxAmount = this.performainvoicedetails_.TaxableAmount * (this.safeNumber(this.Stock_.SaleTax) / 100)
    
//     console.log(this.performainvoicedetails_);
//         console.log(this.performainvoicedetails_Data);


//         if (!this.performainvoicedetails_Data) {
//             this.performainvoicedetails_Data = [];
//         }
//    debugger
//     this.performainvoicedetails_Data.push(Object.assign({}, this.performainvoicedetails_));

//     this.Clr_Sales_Details();
//     this.Final_Amounts();

// }
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
    // this.Quotation_Master_.QuotationNo = "test"
    
    this.Quotation_Master_.Account_Party_Id=this.Customer_.Client_Accounts_Id;
    this.Quotation_Master_.User_Id=Number(this.Login_User_Id);
    this.Quotation_Master_.POnumber = this.POnumber.InvoiceNo
    this.Quotation_Master_.Quotation_Details=this.Quotation_Details_Data;
    //this.Quotation_Master_.KindAttend=this.Attention.User_Details_Id;
    this.Quotation_Master_.AttendEmployee = this.Employee.User_Details_Id
    // this.Quotation_Master_.Payment_Term_Description = this.Payment_Term_Description_.payment_Term_ID
    console.log("Before Performa (Quotation) API call");
    this.issLoading = true;

    this.Sales_Master_Service_.Save_Quotation(this.Quotation_Master_)
    .pipe(
        finalize(() => {
            console.log("Performa (Quotation) Finalize executed");
            this.issLoading = false;
            const saveButton = document.getElementById("Save_Button");
            if (saveButton) saveButton.hidden = false;
        })
    )
    .subscribe({
        next: (Save_status) => {
            console.log("Performa (Quotation) API Response:", Save_status);

            if (!Save_status || !Save_status[0]) {
                this.dialogBox.open(DialogBox_Component, {
                    panelClass: 'Dialogbox-Class',
                    data: { Message: 'Invalid server response', Type: "2" }
                });
                return;
            }

            if (Number(Save_status[0].SalesQuotationMaster_Id_) > 0) {
                this.Quotation_Master_.SalesQuotationMaster_Id = Save_status[0].SalesQuotationMaster_Id_;
                
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
                this.dialogBox.open(DialogBox_Component, {
                    panelClass: 'Dialogbox-Class',
                    data: { Message: 'Error Occured', Type: "2" }
                });
            }
        },
        error: (error) => {
            console.error("Performa (Quotation) API ERROR:", error);
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
    debugger;
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
       

    // this.Tot_Amount= this.Quotation_Master_.TotalAmount;
    // this.CGST_SUM=this.Quotation_Master_.TotalCGST;
    // this.SGST_SUM=this.Quotation_Master_.ToalSGST ;
    // this.GST_Sum=this.Quotation_Master_ .TotalGST;    
    // this.Tot_Cess=this.Quotation_Master_.Cess;
    // this.Tot_Net=this.Quotation_Master_.NetTotal;
    // this.Tot_discount=this.Quotation_Master_.TotalDiscount;
    // this.Tot_Gross=this.Quotation_Master_.GrossTotal;
for(var i=0;i<this.Bill_Type_Data.length;i++)
{
    if(this.Bill_Type_Data[i].Bill_Type_Id==Sales_Master_e.BillType)
    {
        this.Bill_Type_=this.Bill_Type_Data[i];
    }
}

for(var i = 0;i<this.currencyData.length;i++)
{
    if(this.currencyData[i].CurrencyDetails_Id = Sales_Master_e.CurrencyId)
    {
        this.Currency = this.currencyData[i];
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


    //this.Barcode_.ItemName=this.Item_.ItemName;
    this.Stock_Temp.ItemId=this.Barcode_.ItemId;
    this.Stock_Temp.ItemName=this.Barcode_.ItemName;
    this.Stock_=Object.assign({},this.Stock_Temp);
    this.performainvoicedetails_.ItemId=this.Barcode_.ItemId;
    this.performainvoicedetails_.ItemName=this.Barcode_.ItemName;
    this.performainvoicedetails_.UnitId=this.Barcode_.UnitId;
    this.performainvoicedetails_.UnitName=this.Barcode_.UnitName;
    this.performainvoicedetails_.MRP=this.Barcode_.MRP;
    this.performainvoicedetails_.PurchaseRate=this.Barcode_.PurchaseRate;
    this.performainvoicedetails_.Stock=this.Barcode_.Quantity;
    this.performainvoicedetails_.UnitPrice=this.Barcode_.SaleRate;
    this.performainvoicedetails_.ItemName=this.Barcode_.ItemName;
    this.performainvoicedetails_.GroupId=this.Barcode_.GroupId;
    this.performainvoicedetails_.GroupName=this.Barcode_.GroupName;
    this.performainvoicedetails_.HSNMasterId=this.Barcode_.HSNMasterId;
    this.performainvoicedetails_.HSNCODE=this.Barcode_.HSNCODE;
    this.performainvoicedetails_.HSNMasterId=this.Barcode_.HSNMasterId;
    this.performainvoicedetails_.StockId=this.Barcode_.Stock_Id;
    this.performainvoicedetails_.Sale_Tax=this.Barcode_.SaleTax;
    this.performainvoicedetails_.Item_Code=this.Barcode_.Item_Code;  
    this.performainvoicedetails_.Availability=this.Barcode_.Availability;
    this.performainvoicedetails_.Country_Id=this.Barcode_.Country_Id;
    this.performainvoicedetails_.Country_Name=this.Barcode_.Country_Name;
    this.performainvoicedetails_.Quantity=0;
}

Item_Name_Change(Item_sl:performainvoicedetails){    
//     this.performainvoicedetails_=Object.assign({},Item_sl);
//  if(Item_sl.Item_Code!="")
//  {
//  this.Item_Temp_.StockId=Item_sl.StockId;
//  this.Item_Temp_.Item_Code=Item_sl.Item_Code;
//  this.Barcode_=Object.assign({},this.Item_Temp_);
//  this.performainvoicedetails_.Item_Code=Item_sl.Item_Code;
//  }
debugger;
this.performainvoicedetails_=Object.assign({},Item_sl);
this.Item_Temp_.StockId=Item_sl.StockId;
this.Item_Temp_.Item_Code=Item_sl.Item_Code;
this.Barcode_=Object.assign({},this.Item_Temp_);
this.performainvoicedetails_.StockId=Item_sl.StockId; 
this.performainvoicedetails_.Item_Code=Item_sl.Item_Code;
this.performainvoicedetails_.ItemId=Item_sl.ItemId;
this.performainvoicedetails_.ItemName=Item_sl.ItemName;
this.performainvoicedetails_.Quantity=0;
 }

 
Get_Stock_Item(){
    this.Stock_Temp.ItemId=this.Item_.ItemId;
    this.Stock_Temp.ItemName=this.Item_.ItemName;
    this.Stock_=Object.assign({},this.Stock_Temp);
    debugger;

    if(this.Item_ != null || this.Item_ != undefined)
    {
        if(this.Item_.ItemId != null || this.Item_.ItemId != undefined)
            {
                this.Item_Temp.Item_Code=this.Item_.Item_Code;
                 this.Item_Temp.ItemId=this.Item_.ItemId;
                 this.Barcode_=Object.assign({},this.Item_Temp);
                 
                this.performainvoicedetails_.ItemId=this.Item_.ItemId;
                this.performainvoicedetails_.ItemName=this.Item_.ItemName;
                this.performainvoicedetails_.UnitId=this.Item_.UnitId;
                this.performainvoicedetails_.UnitName=this.Item_.UnitName;
                this.performainvoicedetails_.MRP=this.Item_.MRP;
                this.performainvoicedetails_.PurchaseRate=this.Item_.PurchaseRate;
                this.performainvoicedetails_.Stock=this.Item_.Quantity;
                this.performainvoicedetails_.UnitPrice=this.Item_.SaleRate;
                this.performainvoicedetails_.ItemName=this.Item_.ItemName;
                this.performainvoicedetails_.GroupId=this.Item_.GroupId;
                this.performainvoicedetails_.GroupName=this.Item_.GroupName;
                this.performainvoicedetails_.HSNMasterId=this.Item_.HSNMasterId;
                this.performainvoicedetails_.HSNCODE=this.Item_.HSNCODE;
                this.performainvoicedetails_.HSNMasterId=this.Item_.HSNMasterId;
                this.performainvoicedetails_.Item_Code=this.Item_.Item_Code; 
            }
    }
}

Calculate_Quotation_Details_Amount()
{
    debugger
    if(this.performainvoicedetails_.Quantity == undefined || this.performainvoicedetails_.Quantity == null)
    this.performainvoicedetails_.Quantity = 0;
    if(this.performainvoicedetails_.UnitPrice == undefined || this.performainvoicedetails_.UnitPrice == null)
    this.performainvoicedetails_.UnitPrice = 0;


 this.Calculate_Total_Amount();
}
Calculate_Total_Amount()
{ 
    debugger;
    if(this.performainvoicedetails_.Discount == undefined || this.performainvoicedetails_.Discount == null)
        this.performainvoicedetails_.Discount = 0;
    if(this.performainvoicedetails_.Item_Discount_Amount == undefined || this.performainvoicedetails_.Item_Discount_Amount == null)
        this.performainvoicedetails_.Item_Discount_Amount = 0;

    this.performainvoicedetails_.Unit_Discount = (Number(this.performainvoicedetails_.UnitPrice) * Number(this.performainvoicedetails_.Discount))/ 100;
    this.performainvoicedetails_.Unit_Discount = Number(this.performainvoicedetails_.Unit_Discount.toFixed(3));

    this.performainvoicedetails_.Item_Discount_Amount =Number(this.performainvoicedetails_.Unit_Discount) * Number(this.performainvoicedetails_.Quantity);
    this.performainvoicedetails_.Item_Discount_Amount = Number(this.performainvoicedetails_.Item_Discount_Amount.toFixed(3));

    this.performainvoicedetails_.Amount = Number(this.performainvoicedetails_.Quantity) * Number(this.performainvoicedetails_.UnitPrice);
    this.performainvoicedetails_.Amount =Number(this.performainvoicedetails_.Amount.toFixed(3));

     this.performainvoicedetails_.TaxableAmount = Number(this.performainvoicedetails_.Amount) - Number(this.performainvoicedetails_.Item_Discount_Amount);
     this.performainvoicedetails_.TaxableAmount =Number(this.performainvoicedetails_.TaxableAmount.toFixed(3));

     this.performainvoicedetails_.TaxAmount = Number(this.performainvoicedetails_.TaxableAmount) * Number(this.performainvoicedetails_.SaleTax) /100;
    this.performainvoicedetails_.NetValue= Number(this.performainvoicedetails_.TaxableAmount) + Number(this.performainvoicedetails_.TaxAmount);

    this.performainvoicedetails_.Item_Discount_Amount=Number(this.performainvoicedetails_.Item_Discount_Amount.toFixed(3));    
    this.performainvoicedetails_.Amount=Number(this.performainvoicedetails_.Amount.toFixed(3));    
    this.performainvoicedetails_.TaxableAmount=Number(this.performainvoicedetails_.TaxableAmount.toFixed(3));
    this.performainvoicedetails_.TaxAmount=Number(this.performainvoicedetails_.TaxAmount.toFixed(3));  
    this.performainvoicedetails_.NetValue= Number(this.performainvoicedetails_.NetValue.toFixed(3));
    
}

Plus_Performa_Details()
{
    debugger;

if(this.performainvoicedetails_.StockId>0)
    this.performainvoicedetails_.StockId=this.performainvoicedetails_.StockId;
else
    this.performainvoicedetails_.StockId=0;
// if(this.Item_==undefined || this.Item_==null ||this.Item_.ItemId==0 || this.Item_.ItemId==undefined)
// {
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Item Name',Type: "3" }});
// return
// } 

if(this.Barcode_ == undefined || this.Barcode_ == null)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Item Code',Type: "3" }});
    return
    }
if(this.performainvoicedetails_.Quantity==undefined || this.performainvoicedetails_.Quantity==null || this.performainvoicedetails_.Quantity==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Quantity',Type: "3" }});
return
}
else if(this.performainvoicedetails_.UnitPrice==undefined || this.performainvoicedetails_.UnitPrice==null || this.performainvoicedetails_.UnitPrice==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Unit Price',Type: "3" }});
return
}
else 
{
    debugger; 
    
if(this.performainvoicedetails_Data==undefined)
this.performainvoicedetails_Data=[];
if( this.Barcode_==null)
{
    this.performainvoicedetails_.Item_Code='';
}
else if(this.Barcode_.Item_Code!=undefined && this.Barcode_.Item_Code!=null)
{
    this.performainvoicedetails_.Item_Code=  this.Barcode_.Item_Code;
}
else if(this.Barcode_!=undefined && this.Barcode_!=null)
{
    const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
    this.performainvoicedetails_.Item_Code=Barcode_string;
}
    this.performainvoicedetails_.Expiry_Date=this.New_Date(new Date(moment(this.performainvoicedetails_.Expiry_Date).format('YYYY-MM-DD')));
         
    if (this.performainvoicedetails_Index >= 0) 
    {
        this.performainvoicedetails_Data[this.performainvoicedetails_Index] = Object.assign({}, this.performainvoicedetails_);
    }
    else
    {
        this.performainvoicedetails_Data.push(Object.assign({}, this.performainvoicedetails_));
    }
    this.performainvoicedetails_Index=-1;
    this.Clr_Sales_Details(); 
    this.addBlankRows();
    this.Final_Amounts(); 
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
    // if(this.performainvoicemaster_.CurrencyId>0){
        
    //     for (let i = 0; i < this.currencyData.length; i++) {
    //         if(this.currencyData[i].CurrencyDetails_Id == this.performainvoicemaster_.CurrencyId){
    //             MainCurrency = this.currencyData[i].CurrecnyName;
    //             SubCurrency = this.currencyData[i].SubCurrecnyName == null ? '' : this.currencyData[i].SubCurrecnyName;
    //         }
            
    //     }

    if(this.Currency.CurrencyDetails_Id>0){
        debugger;
            // if(this.currency.CurrencyDetails_Id === this.Quotation_Master_.CurrencyId){
                MainCurrency = this.Currency.CurrecnyName;
                SubCurrency = this.Currency.SubCurrecnyName == null ? '' : this.Currency.SubCurrecnyName;
            // }
            
        
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

Save_PerformaInvoice(Printstatus:number)
{

 
    if(this.performainvoicedetails_Data == undefined || this.performainvoicedetails_Data == null || this.performainvoicedetails_Data.length == 0 || this.performainvoicedetails_Data.length == undefined )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Add atleast one Item',Type:"3"}});
        return
    }
    if(this.Customer_ == undefined || this.Customer_ == null || this.Customer_.Client_Accounts_Id == undefined || this.Customer_.Client_Accounts_Id == 0 ){
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Choose Customer',Type:"3"}});
        return
    }    
    if(this.performainvoicemaster_.InvoiceNo == undefined || this.performainvoicemaster_.InvoiceNo == null || this.performainvoicemaster_.InvoiceNo == 'undefined' || this.performainvoicemaster_.InvoiceNo == 'null' || this.performainvoicemaster_.InvoiceNo =='' ){
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Input Invoice No',Type:"3"}});
        return
    }  

    this.performainvoicemaster_.Account_Party_Id=this.Customer_.Client_Accounts_Id;
    this.performainvoicemaster_.User_Id=Number(this.Login_User_Id);
    this.performainvoicemaster_.performainvoicedetails=this.performainvoicedetails_Data;
    this.performainvoicemaster_.CurrencyId = this.Currency.CurrencyDetails_Id;
    this.performainvoicemaster_.TypeId = this.Accounttype.AccountType_Id;
    this.performainvoicemaster_.AccountType_Id = this.Accounttype.AccountType_Id;

    if(this.Payment_Term_Description_ == undefined || this.Payment_Term_Description_ == null){
        this.performainvoicemaster_.Payment_Term_Description = 0;
        this.performainvoicemaster_.PaymentTerms = "";
    }else{
        this.performainvoicemaster_.Payment_Term_Description = this.Payment_Term_Description_.payment_Term_ID;
        this.performainvoicemaster_.PaymentTerms = this.Payment_Term_Description_.Payment_Term_Description;
    }
    
    this.performainvoicemaster_.EntryDate = this.New_Date(new Date(moment(this.performainvoicemaster_.EntryDate).format('YYYY-MM-DD')));

    console.log("Before Performa Invoice API call");
    this.issLoading = true;

    this.Sales_Master_Service_.Save_PerformaInvoice(this.performainvoicemaster_)
    .pipe(
        finalize(() => {
            console.log("Performa Invoice Finalize executed");
            this.issLoading = false;
            const saveButton = document.getElementById("Save_Button");
            if (saveButton) saveButton.hidden = false;
        })
    )
    .subscribe({
        next: (res: any) => {
            console.log("Performa Invoice API Response:", res);

            if (res && res.success) {
                const data = res.data;
                const rows = Array.isArray(data) ? data : (data && data.rows ? data.rows : []);
                const result = rows && rows[0] ? rows[0] : (Array.isArray(data) ? data[0] : null);

                if (result && Number(result.PerformaInvoiceMaster_Id_) > 0) {
                    this.performainvoicemaster_.PerformaInvoiceMaster_Id = result.PerformaInvoiceMaster_Id_;
                    this.PerformaInvoiceMaster_Id_Edit = this.performainvoicemaster_.PerformaInvoiceMaster_Id;
                    this.performainvoicemaster_.PrintDate = result.PrintDate;
                    
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
            console.error("Performa Invoice API ERROR:", error);
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
    if(this.Currency_Search.CurrencyDetails_Id==null || this.Currency_Search.CurrencyDetails_Id==undefined)
        CurrencyDetails_Id_=0;
    else
        CurrencyDetails_Id_=this.Currency_Search.CurrencyDetails_Id;
    
        if(this.accounttype_search.AccountType_Id==null || this.accounttype_search.AccountType_Id==undefined)
        AccountType_Id_=0;
    else
        AccountType_Id_=this.accounttype_search.AccountType_Id;
    this.issLoading=true;    
    this.InvoiceNo = this.InvoiceNo == "" ? undefined : this.InvoiceNo
    this.partNo = this.partNo == "" ? undefined : this.partNo
    this.Sales_Master_Service_.Search_PerformaInvoice(look_In_Date_Value,moment(this.Search_FromDate).format('YYYY-MM-DD'), moment(this.Search_ToDate).format('YYYY-MM-DD'),
    CustomerId_,this.InvoiceNo,this.partNo,Item_Group_Id_, CurrencyDetails_Id_,AccountType_Id_,
    this.User_Type_Id, this.Login_User_Id).subscribe({
        next: (res: any) => {
            this.performainvoice_Data = [];
            if (res && res.success) {
                const data = res.data;
                const rows = Array.isArray(data) ? data : (data && data.rows ? data.rows : []);
                this.performainvoice_Data = rows && rows[0] ? rows[0] : (Array.isArray(data) ? data : []);

                if (this.performainvoice_Data.length > 0) {
                    for (var i = 0; i < this.performainvoice_Data.length; i++) {
                        this.Sales_Master_Total_Amount = Number(this.Sales_Master_Total_Amount) + Number(this.performainvoice_Data[i].NetTotal);
                        this.Sales_Master_Total_Amount = Number(this.Sales_Master_Total_Amount.toFixed(3));
                    }
                }
                this.Total_Entries = this.performainvoice_Data.length;
                if (this.performainvoice_Data.length == 0) {
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



Edit_Performa_invoice(Sales_Master_e:performainvoicemaster,index)
{ 

    // this.Final_Amounts();

    this.Entry_View=true;
    this.Edit_Sales=1;
    this.Sales_Print = false;
    this.performainvoicemaster_=Object.assign({},Sales_Master_e); 
    this.PerformaInvoiceMaster_Id_Edit = Sales_Master_e.PerformaInvoiceMaster_Id;

// debugger
//     this.Sales_Master_Service_.Search_Customer_Typeahead('3',"").subscribe(Rows => {    
//         debugger 
//         if (Rows != null) {
//             this.Customer_Data = Rows[0];
//             for(let i=0;i<this.Customer_Data.length;i++){
//                 if(this.Customer_Data[i].Client_Accounts_Id == this.performainvoicemaster_.Account_Party_Id){
//                     this.Customer_  = this.Customer_Data[i];
//                     this.Address1 = this.Customer_.Address1;
//                     this.Address2 = this.Customer_.Address2;
//                     this.Address3 = this.Customer_.Address3;
//                     this.Address4 = this.Customer_.Address4;
        
//                 }
//             }
//         }},
//         );
        debugger
    this.PrintDate = Sales_Master_e.PrintDate;
   // console.log('PrintDate: ',this.PrintDate);
    this.Customer_Temp.Client_Accounts_Id=Sales_Master_e.Account_Party_Id;
    this.Customer_Temp.Client_Accounts_Name=Sales_Master_e.Customer;
    this.Customer_=this.Customer_Temp;

    this.Customer_Name = this.Customer_.Client_Accounts_Name;
    this.performainvoicemaster_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.performainvoicemaster_.Customer=this.Customer_.Client_Accounts_Name; 
    this.Customer_.Client_Accounts_Id=Sales_Master_e.Account_Party_Id;
    this.Customer_.Client_Accounts_Name=Sales_Master_e.Customer;

    if(this.performainvoicemaster_.Additional_Discount) this.addDiscCheck = 1;
    else this.addDiscCheck = 0;
    this.performainvoicemaster_.Account_Party_Id = Sales_Master_e.Account_Party_Id;

    this.SalesQuotationMaster_Id = Sales_Master_e.SalesQuotationMaster_Id;
   // console.log('this.SalesQuotationMaster_Id: ', this.SalesQuotationMaster_Id);
    
    // this.Client_Accounts_Service_.Get_Client_Accounts(Sales_Master_e.Account_Party_Id).subscribe((result)=>{
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

    this.Sales_Master_Service_.Search_Customer_Typeahead('1,2,3,39',"").subscribe(Rows => { 
        debugger    
        if (Rows != null) {
            debugger
            this.Customer_Data = Rows[0];
            for(let i=0;i<Rows[0].length;i++){
                if(Rows[0][i].Client_Accounts_Id == this.Quotation_Master_.Account_Party_Id){

                    this.Customer_Temp.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                    this.Customer_Temp.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                     this.Customer_= this.Customer_Temp;

                    this.performainvoicemaster_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                    this.performainvoicemaster_.Customer=Rows[0][i].Client_Accounts_Name;
                    this.performainvoicemaster_.Customer_Name=Rows[0][i].Client_Accounts_Name;

                    this.performainvoicemaster_.Address1 = Rows[0][i].Address1;
                    this.performainvoicemaster_.Address2 = Rows[0][i].Address2;
                    this.performainvoicemaster_.Address3 = Rows[0][i].Address3;
                    this.performainvoicemaster_.Address4 = Rows[0][i].Address4;
                    this.performainvoicemaster_.Vatin = Rows[0][i].GSTNo;

                    this.Address1 = Rows[0][i].Address1;
                    this.Address2 = Rows[0][i].Address2;
                    this.Address3 = Rows[0][i].Address3;
                    this.Address4 = Rows[0][i].Address4;
                    this.Vatin = Rows[0][i].GSTNo;
                }
            }
        }},
        );
     
     this.User_Details_Service_.Search_User_Details("",this.User_Type,this.Login_User_Id).subscribe(Rows => {     
        debugger
        if (Rows != null) {
            this.EmployeeData = Rows[0];
            // for(let i= 0; i< this.EmployeeData.length; i++){
            //     if(this.EmployeeData[i].User_Details_Id== this.performainvoicemaster_.KindAttend){
            //         this.Attention = this.EmployeeData[i];
            //     }
            //     if(this.EmployeeData[i].User_Details_Id== this.performainvoicemaster_.AttendEmployee){
            //         this.Employee = this.EmployeeData[i];
            //     }
            // }
        }
        });
        debugger
    for(let i=0;i<this.PaymentTermData.length;i++){
        if(this.PaymentTermData[i].Payment_Term_Description == this.performainvoicemaster_.PaymentTerms){
            this.Payment_Term_Description_ = this.PaymentTermData[i]
        }
    }

    for(let i=0;i<this.AccounttypeData.length;i++){
        if(this.AccounttypeData[i].AccountType_Id == this.performainvoicemaster_.TypeId){
            this.Accounttype = this.AccounttypeData[i]
        }
    }

    for(let i=0;i<this.currencyData.length;i++){
        if(this.currencyData[i].CurrencyDetails_Id == this.performainvoicemaster_.CurrencyId){
            this.Currency = this.currencyData[i]
        }
    }
this.issLoading = true;
debugger
this.Sales_Master_Service_.Get_Performa_invoice_Details(Sales_Master_e.PerformaInvoiceMaster_Id).subscribe({
    next: (res: any) => {
        if (res && res.success) {
            const data = res.data;
            const rows = Array.isArray(data) ? data : (data && data.rows ? data.rows : []);
            this.performainvoicedetails_Data = rows && rows[0] ? rows[0] : (Array.isArray(data) ? data : []);
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

Delete_Quotation_Detail(itemIndex){
    this.performainvoicedetails_Data.splice(itemIndex, 1);
    this.addBlankRows();
    this.Final_Amounts();
  }

//   Edit_Quotation_Detail(performainvoicedetails, index){

//     debugger
//     console.log('Sales_Details: ', performainvoicedetails);
//     this.Barcode_ = new Stock();
//     this.Stock_ = new Stock();
//     this.Barcode_.Item_Code = performainvoicedetails.ItemCode;
//     this.Stock_.ItemId = performainvoicedetails.ItemId;
//     this.Stock_.ItemName= performainvoicedetails.ItemName ;
//     this.Stock_.UnitName = this.UnitName = performainvoicedetails.UnitName 
//     this.Stock_.UnitId = performainvoicedetails.UnitId;
//     this.Quantity = performainvoicedetails.Quantity;
//     this.SaleRate = performainvoicedetails.SaleRate;
//     this.discount = performainvoicedetails.Discount;
//     this.unitDiscount = performainvoicedetails.Unit_Discount;
//     this.Stock_.GroupId = performainvoicedetails.GroupId;
//     this.Stock_.GroupName = performainvoicedetails.GroupName;
//     this.Stock_.Stock_Id = performainvoicedetails.StockId;
//     this.Stock_.HSNMasterId = performainvoicedetails.HSNMasterId;
//     this.Stock_.HSNCODE = performainvoicedetails.HSNCODE;
//     this.TotalAmount = performainvoicedetails.Amount;
//     this.availablity = performainvoicedetails.Availability;
//     this.Stock_.SaleTax = performainvoicedetails.Sale_Tax;

//     this.performainvoicedetails_Data.splice(index, 1);
  
//   }

Edit_Quotation_Detail(Sales_Details_e:performainvoicedetails,index)
{   
    debugger
    // this.performainvoicedetails_Index =index;
    // this.performainvoicedetails_=Sales_Details_e;

    // this.Stock_Temp.ItemId=Sales_Details_e.ItemId;
    // this.Stock_Temp.ItemName=Sales_Details_e.ItemName;
    // this.Stock_=Object.assign({},this.Stock_Temp);
    // this.Barcode_Temp.Stock_Id=Sales_Details_e.Stock_Id;
    // this.Barcode_Temp.Barcode=Sales_Details_e.Barcode;
    // // this.Barcode_=Object.assign({},this.Barcode_Temp);  
    // this.Stock_.Item_Code=Sales_Details_e.Item_Code;
  

    // this.Edit_GST=this.performainvoicedetails_.TaxAmount;
    // this.Edit_Discount=this.performainvoicedetails_.Discount;
    // this.Edit_Net=this.performainvoicedetails_.NetValue;
    // this.Edit_Gross=this.performainvoicedetails_.GrossValue;
    // this.Edit_Totamt=this.performainvoicedetails_.TotalAmount;
    // this.performainvoicedetails_=Object.assign({},Sales_Details_e);
    // this.Sale_Detail_Quantity=this.performainvoicedetails_.Quantity;
    // this.Edit_Stock_-this.performainvoicedetails_.Stock;
    // this.performainvoicedetails_Data.splice(index, 1);

    // this.To_Stock_=null;
this.performainvoicedetails_Index=index;

   this.Barcode_Temp_.StockId=Sales_Details_e.StockId;
    this.Barcode_Temp_.Item_Code=Sales_Details_e.Item_Code;
    this.Barcode_=Object.assign({},this.Barcode_Temp_);

this.Item_Temp.ItemId=Sales_Details_e.ItemId;
this.Item_Temp.ItemName=Sales_Details_e.ItemName;
this.Item_=Object.assign({},this.Item_Temp);
this.performainvoicedetails_=Object.assign({},Sales_Details_e);

// this.To_Stock_Temp.Client_Accounts_Id=Sales_Details_e.To_Employee_Id;
// this.To_Stock_Temp.Client_Accounts_Name=Sales_Details_e.Client_Accounts_Name;
// this.To_Stock_=Object.assign({},this.To_Stock_Temp);
}


  DO_Click(){
    this.doListView = true;
    this.invoiceListView = false;
    this.proformaListView = false;
    this.poListView = false;
    debugger
    this.issLoading = true;
    this.Sales_Master_Service_.Get_Proforma_DOClick_Details(this.PerformaInvoiceMaster_Id_Edit).subscribe(Rows => {
        debugger
              this.DO_Data = Rows[0];
              this.issLoading = false;

          })
    setTimeout(() => {
        if (this.bottomDiv2) {
          this.bottomDiv2.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
  }


  makeDO(){
    
    localStorage.setItem('PerformaInvoiceNo', this.performainvoicemaster_.PerformaInvoiceMaster_Id.toString());
    debugger
    this.router.navigateByUrl(`/Delivery_Order`);
  }


  Invoice_Click(){
    this.invoiceListView = true;
    this.proformaListView = false;
    this.doListView = false;
    this.poListView = false;
    // this.packingListView = false
    // this.performaPendingView=false;
    // this.invoicePendingView = false;
    // this.deliveryPendingView = false;
debugger
    this.issLoading = true;
    this.Sales_Master_Service_.Get_Proforma_InvoiceClick_Details(this.PerformaInvoiceMaster_Id_Edit).subscribe(Rows => {
        debugger
        this.invoice_Data=Rows[0];
        this.issLoading = false;   
     });
    setTimeout(() => {
        if (this.bottomDiv1) {
          this.bottomDiv1.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
  }

  closeInvoiceListView(){
    this.invoiceListView =false;
    this.doListView = false;

    setTimeout(() => {
        if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
  }

  closeDoListView(){
    debugger
    this.invoiceListView =false;
    this.doListView = false;
    setTimeout(() => {
        if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
  }
  makeInvoice(){
    debugger
    localStorage.setItem('PerformaInvoiceNo', this.performainvoicemaster_.PerformaInvoiceMaster_Id.toString());
    debugger
    this.router.navigateByUrl(`/Invoice`);
  }


  newPerforma(){
    debugger
    this.performainvoicemaster_= new performainvoicemaster();
    this.PerformaInvoiceMaster_Id = 0;
    this.invoiceListView = false;
    this.doListView = false;
    this.Clr_Sales_Master();
    this.Clr_Sales_Details();
    setTimeout(() => {
        if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
  }

  duplicate(){
    debugger
    // this.Customer_ = new Client_Accounts();
    // this.Address1 = ''
    // this.Address2 = ''
    // this.Address3 = ''
    // this.Address4 = ''
    // this.Vatin = '';
    this.performainvoicemaster_.InvoiceNo = '';
    this.performainvoicemaster_.PerformaInvoiceMaster_Id = 0;
    this.SalesQuotationMaster_Id = 0
    this.performainvoicemaster_.SalesQuotationMaster_Id = 0

    this.PerformaInvoiceMaster_Id = 0;
    this.PerformaInvoiceMaster_Id_Edit = 0;
    this.invoiceListView = false;
    this.doListView = false;
    this.performainvoicemaster_.EntryDate=new Date().toString();
    this.performainvoicemaster_.EntryDate=this.formatDate(this.performainvoicemaster_.EntryDate); 
    setTimeout(() => {
        if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

  }

  /*** Added on 16-10-2024 */

  Load_PerformaInvoiceMaster()
  {
    this.Entry_View=true;
    this.issLoading = true;
      debugger;
      this.Sales_Master_Service_.Load_PerformaInvoiceMaster(this.PerformaInvoiceMaster_Id).subscribe(result=>{
        debugger;
        this.Edit_Sales=1;
        this.Sales_Print = false;
        this.PerformaInvoiceMaster_Id_Edit = this.PerformaInvoiceMaster_Id
       // this.performainvoice_Data=result[0];
        this.performainvoicemaster_=Object.assign({},result[0][0]); 
        this.performainvoicemaster_.LPONo=result[0][0].LPONo;
        this.SalesQuotationMaster_Id=result[0][0].SalesQuotationMaster_Id;
            debugger
        this.PrintDate = result[0][0].PrintDate;
        this.performainvoicemaster_.Account_Party_Id==result[0][0].Account_Party_Id;    

        this.performainvoicemaster_.PaymentTermValue=result[0][0].PaymentTermValue;
        this.performainvoicemaster_.SalesQuotationMaster_Id=this.quotationId;
        this.performainvoicemaster_.Payment_Term_Description=result[0][0].Payment_Term_Description;
        this.performainvoicemaster_.CurrencyId=result[0][0].CurrencyId;
        this.performainvoicemaster_.AccountType_Id=result[0][0].AccountType_Id;
        this.performainvoicemaster_.VAT_Percentage=result[0][0].VAT_Percentage;

        this.Customer_Temp.Client_Accounts_Id=result[0][0].Account_Party_Id;
        this.Customer_Temp.Client_Accounts_Name=result[0][0].Customer;
        this.Customer_=this.Customer_Temp;
        
        this.performainvoicemaster_.Customer_Name=this.Customer_.Client_Accounts_Name;
        this.performainvoicemaster_.Customer=this.Customer_.Client_Accounts_Name; 

        // this.Client_Accounts_Service_.Get_Client_Accounts(this.performainvoicemaster_.Account_Party_Id).subscribe((result)=>{
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
        // })
 
        this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39',"").subscribe(Rows => {            
            if (Rows != null) {

                this.Customer_Data = Rows[0];
                for(let i=0;i<Rows[0].length;i++){
                    if(Rows[0][i].Client_Accounts_Id == result[0][0].Account_Party_Id){
                        this.Customer_Temp.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                        this.Customer_Temp.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                         this.Customer_= this.Customer_Temp;
                        this.Customer_  = Rows[0][i];  

                        this.Customer_.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                        this.Customer_.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                        this.Customer_Name = Rows[0][i].Client_Accounts_Name;   

                        this.performainvoicemaster_.Address1 = Rows[0][i].Address1;
                    this.performainvoicemaster_.Address2 = Rows[0][i].Address2;
                    this.performainvoicemaster_.Address3 = Rows[0][i].Address3;
                    this.performainvoicemaster_.Address4 = Rows[0][i].Address4;
                    this.performainvoicemaster_.Vatin = Rows[0][i].GSTNo;

                        this.Address1 = result[0][0].Address1;
                        this.Address2 = result[0][0].Address2;
                        this.Address3 = result[0][0].Address3;
                        this.Address4 = result[0][0].Address4;
                        this.Vatin = result[0][0].GSTNo;
                         
                    }
                }     
            }
        },
    );

    this.Sales_Master_Service_.Get_Performa_invoice_Details(result[0][0].PerformaInvoiceMaster_Id).subscribe(Rows => { 
        debugger        
        if (Rows != null) {
            this.performainvoicedetails_Data = Rows[0];
            debugger
             this.Final_Amounts();
             this.addBlankRows();            
            }              
           },
         Rows => {
           const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });  
        
        if(this.AccounttypeData==undefined || this.AccounttypeData==null)
            {
                this.User_Details_Service_.Load_InvoiceType2().subscribe(Rows => {
                    this.AccounttypeData = Rows[0];
                    this.Accounttype_Temp.AccountType_Id = 0;
                    this.Accounttype_Temp.AccountType_Name = "Select";
                    this.AccounttypeData.unshift(this.Accounttype_Temp);
                    this.Accounttype = this.AccounttypeData[0];
                   
                       for(let i=0;i<this.AccounttypeData.length;i++){
                        if(this.AccounttypeData[i].AccountType_Id == this.performainvoicemaster_.TypeId){
                            this.Accounttype = this.AccounttypeData[i]
                        }
                    }
            })
            }
            else{
            for(let i=0;i<this.AccounttypeData.length;i++){
                if(this.AccounttypeData[i].AccountType_Id == this.performainvoicemaster_.TypeId){
                    this.Accounttype = this.AccounttypeData[i]
                }
            }
        }    

        if(this.PaymentTermData==undefined || this.PaymentTermData==null)
        {
            this.payment_term_Service_.Load_Payment_Term().subscribe(Rows => {
                this.PaymentTermData = Rows[0];
                this.PaymentTerm_Temp.payment_Term_ID = 0;
                this.PaymentTerm_Temp.Payment_Term_Description = "Select";
                this.PaymentTermData.unshift(this.PaymentTerm_Temp);
                this.Payment_Term_Description_ = this.PaymentTermData[0];
      
                   for(let i=0;i<this.PaymentTermData.length;i++){
                    if(this.PaymentTermData[i].payment_Term_ID == this.performainvoicemaster_.Payment_Term_Description){
                        this.Payment_Term_Description_ = this.PaymentTermData[i]
                    }
                }
        })
        }
        else{
        for(let i=0;i<this.PaymentTermData.length;i++){
            if(this.PaymentTermData[i].payment_Term_ID == this.performainvoicemaster_.Payment_Term_Description){
                this.Payment_Term_Description_ = this.PaymentTermData[i]
            }
        }
    }

        if(this.currencyData== undefined || this.currencyData==null)
        {
            this.currencydetails_Service_.Load_currencydetails().subscribe(Rows => {
                this.currencyData = Rows[0];  
                this.Currency_Temp.CurrencyDetails_Id = 0;
                this.Currency_Temp.CurrecnyName = "Select";
                this.currencyData.unshift(this.Currency_Temp);
                this.Currency = this.currencyData[0];
                     
                for(var i = 0;i<this.currencyData.length;i++)
                    {
                        if(this.currencyData[i].CurrencyDetails_Id == this.performainvoicemaster_.CurrencyId)
                        {
                            this.Currency = this.currencyData[i];
                        }
                    }  
            })
        }
        else{
        for(var i = 0;i<this.currencyData.length;i++)
            {
                if(this.currencyData[i].CurrencyDetails_Id == this.performainvoicemaster_.CurrencyId)
                {
                    this.Currency = this.currencyData[i];
                }
            }    
        }
        
      })
      this.issLoading = false;
  }

  Edit_invoice_Proforma(Sales_Master_Id)
  {
    localStorage.setItem('Sales_Master_Id', Sales_Master_Id.toString());
    this.router.navigateByUrl(`/Invoice`); 
  }

  Edit_deliveryorder_Proforma(DeliveryOrderMaster_Id)
  {
    localStorage.setItem('DeliveryOrderMaster_Id', DeliveryOrderMaster_Id.toString());
    this.router.navigateByUrl(`/Delivery_Order`); 
}


      /*** Added on 28-10-2024 */

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


  /** Added on 7-11-24 */

  Calculate_Discount_Percent()
  {
    let addDiscCheck = 1;
    let discountper = '0';

    debugger;
    if(Number(this.performainvoicemaster_.Additional_Discount)>0){
        this.performainvoicemaster_.Discount_Description = (this.performainvoicemaster_.Additional_Discount * 100/this.performainvoicemaster_.TotalAmount).toString();
        discountper = Number(this.performainvoicemaster_.Discount_Description).toFixed(3);
        this.performainvoicemaster_.Discount_Description = discountper;   
    }else{
        this.performainvoicemaster_.Discount_Description = '0.000'
    }

    debugger;
    this.addDiscCheck = addDiscCheck;
    this.Final_Amounts();
}

Final_Amounts()
{      
    this.Tot_Gross=0,this.Tot_discount=0,this.Tot_Net=0,this.performainvoicemaster_.TotalAmount=0;this.performainvoicemaster_.Basic_Discount=0
    for(var i = 0; i< this.performainvoicedetails_Data.length ; i++)
    {
        this.performainvoicemaster_.TotalAmount = Number(this.performainvoicemaster_.TotalAmount) + Number(this.performainvoicedetails_Data[i].Amount);

        this.Tot_discount = Number(this.Tot_discount)+  (Number(this.performainvoicedetails_Data[i].Unit_Discount) * Number(this.performainvoicedetails_Data[i].Quantity) );
        this.performainvoicemaster_.Basic_Discount = this.performainvoicemaster_.Basic_Discount + Number(this.performainvoicedetails_Data[i].Item_Discount_Amount)
        
    }
    this.performainvoicemaster_.TotalAmount = Number(this.performainvoicemaster_.TotalAmount.toFixed(3));
    this.Tot_discount = Number(this.Tot_discount.toFixed(3));

    debugger;

    if(this.addDiscCheck == 0)
    {
        if(Number(this.performainvoicemaster_.Discount_Description)>0){
            this.performainvoicemaster_.Additional_Discount = Number(this.performainvoicemaster_.TotalAmount) * (Number(this.performainvoicemaster_.Discount_Description)/ 100);
            this.performainvoicemaster_.Additional_Discount = Number(this.performainvoicemaster_.Additional_Discount.toFixed(3))
            this.addDiscCheck = 0;    

        }else{
            this.performainvoicemaster_.Additional_Discount = 0.000
            this.addDiscCheck = 0;    

        }
        this.addDiscCheck = 0;    

    }
    this.addDiscCheck = 0;    


if(this.performainvoicemaster_.VAT_Percentage==undefined || this.performainvoicemaster_.VAT_Percentage==null)
    this.performainvoicemaster_.VAT_Percentage=0;
    this.performainvoicemaster_.TotalDiscount = Number(this.Tot_discount)+ Number(this.performainvoicemaster_.Additional_Discount);
    this.performainvoicemaster_.TotalDiscount = Number(this.performainvoicemaster_.TotalDiscount.toFixed(3))
    if(Number(this.performainvoicemaster_.Charge1per)>0){
        this.performainvoicemaster_.charge1_Amount = (Number(this.performainvoicemaster_.TotalAmount) - Number(this.performainvoicemaster_.Additional_Discount))* (Number(this.performainvoicemaster_.Charge1per)/100)
        this.performainvoicemaster_.charge1_Amount = Number(this.performainvoicemaster_.charge1_Amount.toFixed(3))
    }else{
        this.performainvoicemaster_.charge1_Amount =  0;
    }
    this.performainvoicemaster_.Total = Number(this.performainvoicemaster_.TotalAmount)-Number(this.performainvoicemaster_.TotalDiscount) + this.safeNumber(Number(this.performainvoicemaster_.charge2_Amount)) + Number(this.performainvoicemaster_.charge1_Amount)
    this.performainvoicemaster_.Total = Number(this.performainvoicemaster_.Total.toFixed(3))
    this.performainvoicemaster_.VAT_Amount = 0;
    if(this.performainvoicemaster_.VAT_Percentage>0){
        this.performainvoicemaster_.VAT_Amount = Number(this.performainvoicemaster_.Total)  * Number(this.performainvoicemaster_.VAT_Percentage/100)
    }
    this.performainvoicemaster_.VAT_Amount = Number(this.performainvoicemaster_.VAT_Amount.toFixed(3))    
    this.performainvoicemaster_.Total_Amount = this.performainvoicemaster_.Total  + this.performainvoicemaster_.VAT_Amount
    this.performainvoicemaster_.Total_Amount = Number(this.performainvoicemaster_.Total_Amount.toFixed(3))
    this.performainvoicemaster_.NetTotal = Number((this.performainvoicemaster_.Total_Amount - this.safeNumber(this.performainvoicemaster_.Roundoff_Amt)).toFixed(3))
    this.performainvoicemaster_.NetTotal = Number(this.performainvoicemaster_.NetTotal.toFixed(3))
    this.performainvoicemaster_.Amount_In_Words = this.numberToWordsIndianCurrency(this.performainvoicemaster_.NetTotal)
     
   
//this.Clr_Sales_Edit_Data();
}


Show_Quotation_Click(SalesQuotationMaster_Id)
{
    
    localStorage.setItem('SalesQuotationMaster_Id', SalesQuotationMaster_Id.toString());

    this.router.navigateByUrl(`/Quotation`);
}

// Export() {
//     this.Sales_Master_Service_.exportExcel(this.performainvoice_Data,"Proforma Invoice" );
//   }

  Export() {
    const filteredData = this.performainvoice_Data.map((receipt: any, index: number) => {
        return {
            No: index + 1,                  
            CustomerName: receipt["Customer"],
            InvoiceNo : receipt["PerformaInvNo"],
            Date: receipt["FormattedEntryDate"],
            Amount: receipt["NetTotal"],

        };
    });

    this.Sales_Master_Service_.exportExcel(filteredData,"Proforma Invoice" );


  }

//   addBlankRows(): void {

//     let cellThr: number = 0;
//     let cellThr1: number = 0;
//     let nosOfBlankRows: number = 0;




//     let tempht1: number = 0;
//     let tempht2: number = 0;

//     debugger



//     this.cdr.detectChanges();

//     this.performainvoicedetails_Data.forEach((_, index) => {
//       const cellId = `cell${index + 1}`;
//       const cell = document.getElementById(cellId);

//       if (cell) {
//         debugger

//                     if(this. performainvoicedetails_Data[index].ItemName.length )
//           var alenght=  this. performainvoicedetails_Data[index].ItemName.length % 39;

//         console.log('this. performainvoicedetails_Data[index].ItemName.length: ', this. performainvoicedetails_Data[index].ItemName.length);
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

//          if (cellThr1 < 105) {                             //350
//             nosOfBlankRows = (105 - cellThr1) / 17;
//             nosOfBlankRows -=4
//         }
//         else {
//             cellThr1 = cellThr1 - 110;
//             console.log('cellThr1 - a: ', cellThr1);
//             cellThr1 = cellThr1 % 1050;                    //1471 excel master,2371 -perfect hills
//             console.log('cellThr1 = cellThr1 % b: ', cellThr1);
//             cellThr1 = 1000- cellThr1           
//             console.log('cellThr1 = c - cellThr1: ', cellThr1);
//             nosOfBlankRows = (cellThr1) / 10;
//             console.log('nosOfBlankRows = (cellThr1) / 8;: ', nosOfBlankRows);
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




    let tempht1: number = 0;
    let tempht2: number = 0;

    debugger



    this.cdr.detectChanges();
    this.marginTopItemNameCount = false;


    this.performainvoicedetails_Data.forEach((_, index) => {
      const cellId = `cell${index + 1}`;
      const cell = document.getElementById(cellId);

      if (cell) {
        debugger

        tempht1 = cell ? cell.offsetHeight : 0 ;
         tempht1 -= 50;


         console.clear();            
         console.log("***********************************");

        console.log('tempht1 first: ', tempht1);



        console.log('this. performainvoicedetails_Data[index].ItemName.length: ', this. performainvoicedetails_Data[index].ItemName.length);
        // console.log('this. performainvoicedetails_Data[index].Item_Code.length: ', this. performainvoicedetails_Data[index].Item_Code.length);
        
        if(this.performainvoicedetails_Data[index].ItemName.length > 96)
            {
                this.marginTopItemNameCount = true;
            }

        let blank = 0;

         cellThr += tempht1;


         console.log('cellThr: ', cellThr);


         if(cellThr1 > 0) cellThr1 = 0;
         
         cellThr1 = cellThr;

         console.log('cellThr1: ', cellThr1);

         if (cellThr1 < 400 
            && (this.performainvoicedetails_Data.length < 15 && this.marginTopItemNameCount == false) 
            || (this.performainvoicedetails_Data.length < 10 && this.marginTopItemNameCount == true) ) {   
            this.breakPage = false;                         
            nosOfBlankRows = (300 - cellThr1) / 18;
            if(nosOfBlankRows < 2) nosOfBlankRows +=2;
        }
        else {
            this.breakPage = true;
            if(cellThr1 < 400){cellThr1 = cellThr1 + (405-cellThr1)}
            cellThr1 = cellThr1 - 405;
            console.log('cellThr1 - a: ', cellThr1);
            // cellThr1 = cellThr1 % 1450;   
            cellThr1 = cellThr1 % 2100;                    
                 
            console.log('cellThr1 = cellThr1 % b: ', cellThr1);
            cellThr1 = 1390- cellThr1           
            console.log('cellThr1 = c - cellThr1: ', cellThr1);
            nosOfBlankRows = (cellThr1) / 6;
            console.log('nosOfBlankRows = (cellThr1) / 8: ', nosOfBlankRows);


            console.log('nosOfBlankRows = blank + nosOfBlankRows;: ', nosOfBlankRows);
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