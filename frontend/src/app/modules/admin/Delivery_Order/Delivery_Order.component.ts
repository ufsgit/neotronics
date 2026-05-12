import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, Renderer2, NgZone, Input, ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { deliveryorderdetails } from '../../../models/deliveryorderdetails';
import { deliveryordermaster } from '../../../models/deliveryordermaster';
import { deliveryorderdetails_Service } from '../../../services/deliveryorderdetails.Service';
import { deliveryordermaster_Service } from '../../../services/deliveryordermaster.Service';
import {accounttype} from '../../../models/accounttype';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Client_Accounts_Service } from '../../../services/Client_Accounts.Service';
import { finalize } from 'rxjs/operators';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
    parse: {    dateInput: 'DD/MM/YYYY',    },
    display: {
    dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
    },
    };

interface PONumber 
    {
        InvoiceNo: any; // Replace `any` with the specific type, e.g., `string` or `number`
        PurchaseOrderMasterId: any; // Replace `any` with the specific type
        Is_Checked: any;
        Is_Checked1: number;
    }


@Component({
selector: 'app-Delivery_Order',
templateUrl: './Delivery_Order.component.html',
styleUrls: ['./Delivery_Order.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class Delivery_OrderComponent implements OnInit, AfterViewInit  {
    @ViewChild(MatAutocompleteTrigger, { static: false }) autoTrigger: MatAutocompleteTrigger;
    @ViewChild('myInput',{ static: false }) myInput: ElementRef;
    @ViewChild('bottomDiv2', { static: false }) bottomDiv2: ElementRef;

    ngAfterViewInit() {}
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
Quotation_Details_Data:Quotation_Details[]
Quotation_Details_Data1:Quotation_Details[]
Quotation_Details_:Quotation_Details= new Quotation_Details();
Bill_Type_Data:Bill_Type[]
Bill_Type_:Bill_Type= new Bill_Type();
Bill_Type_Temp:Bill_Type= new Bill_Type();
Bill_Type_Search:Bill_Type= new Bill_Type();
Item_Group_Search:Item_Group = new Item_Group();
Currency_Search:currencydetails = new currencydetails();
Employee_Search:User_Details = new User_Details();
Payment_Term_Description_:payment_term = new payment_term();
Bill_Mode_Data:Bill_Mode[]
Bill_Mode_:Bill_Mode= new Bill_Mode();
Bill_Mode_Temp:Bill_Mode= new Bill_Mode();
Customer_Data:Client_Accounts[];
PurchaseOrder_Data = [];
EmployeeData = [];ItemCodeData = [];
PaymentTermData:payment_term[];
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
Quotation_Details_Index:number=-1;
Delivery_Order_Details_Index:number=-1;

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
Sales_Master_Data1:[];UnitName="";Quantity=0;SaleRate=0;discount=0;unitDiscount=0;TotalAmount=0;availablity='';Discount_Description=0;subTotal=0;
POnumber;QuotNo;partNo;
Sales_Master_1:Quotation_Master= new Quotation_Master();printLetterhead = false;
Address1 ='';Address2 ='';Address3 ='';Address4 ='';Mobile="";PinCode="";GSTNo="";
currencyData:currencydetails[];
Attention;Employee;totalAmount=0;Total=0;totalDiscount=0;amount1=0;amount2=0;amount3=0;
itemGroupData:Item_Group [];
Customer_Name = ''
/*** Added on 13-09-2024 */

Delivery_Order_Master_Data:deliveryordermaster[]
Delivery_Order_Master_:deliveryordermaster= new deliveryordermaster();
 Delivery_Order_Details_Data:deliveryorderdetails[]=[];
Delivery_Order_Details_Data1:deliveryorderdetails[]=[];
Delivery_Order_Details_:deliveryorderdetails= new deliveryorderdetails();

Delivery_Order_Details_Temp_ : deliveryorderdetails = new deliveryorderdetails();
Item_ :deliveryorderdetails = new deliveryorderdetails();
Item_Temp_:deliveryorderdetails = new deliveryorderdetails();
Barcode_:deliveryorderdetails= new deliveryorderdetails();
Barcode_Temp_:deliveryorderdetails= new deliveryorderdetails();
Item_Temp:deliveryorderdetails= new deliveryorderdetails();


selectedPONumber: any[] = [];
paymentTerms;

/** Added on 18-09-2024 */


Currency_Temp: currencydetails = new currencydetails;
Item_Group_Temp: Item_Group = new Item_Group;
// AccountType_Temp: accounttype = new accounttype;
Search_AccountType: accounttype = new accounttype;
Currency: currencydetails = new currencydetails;
// AccountType: accounttype = new accounttype;

/*** Added on 19-09-2024 */

PaymentTerm_Temp: payment_term = new payment_term;
Payment: payment_term = new payment_term;
Attention_Temp : User_Details = new User_Details;

/*** Added on 20-09-2024 */

DeliveryOrderMaster_Id_Edit: number = 0;
PurchaseOrder_Data_Temp = [];quotationId=0;
PerformaInvoiceId=0;currencyName=''


/*** Added on 14-10-2024 */
showOptions: boolean = false;


/*** Added on 15-10-2024 */

SalesQuotationMaster_Id: number;
invoice_list_view =false;
Invoice_Data = [];

/*** Added on 17-10-2024 */

// accountData: accounttype[];
DeliveryOrderMaster_Id: number;

AccounttypeData: accounttype[];
accounttype_search:accounttype = new accounttype();
Accounttype_Temp : accounttype = new accounttype();
Accounttype: accounttype = new accounttype();

/*** Added on 07-11-2024 */

Vatin = '';
CurrecnyName = '';
Payment_Term_Description = '';
AccountType_Name = '';

blankItems: number[] = [];
breakPage: boolean = false;
marginTopItemNameCount : boolean = false;


constructor(public Sales_Master_Service_:Sales_Master_Service,public currencydetails_Service_:currencydetails_Service, public User_Details_Service_:User_Details_Service,private route: ActivatedRoute, private router: Router,public dialogBox: MatDialog
,private el: ElementRef, private zone: NgZone, private renderer: Renderer2 , public purchaseordermaster_Service_:purchaseordermaster_Service, public Employee_Details_Service_:Employee_Details_Service, public Stock_Service_:Stock_Service,
public Item_Group_Service_:Item_Group_Service, public payment_term_Service_:payment_term_Service, 
public salesquotationmaster_Service_:salesquotationmaster_Service,
public Client_Accounts_Service_:Client_Accounts_Service, private cdr: ChangeDetectorRef
) { 
    this.Load_Bill_Type();
    this.Load_InvoiceType();
    this.Load_Payment_Term();
    this.Load_Currency();   
    this.Load_Item_Group();
    this.Load_Company() ;

    //this.Load_Employees();
}
ngOnInit() 
{
    debugger
    this.User_Type=(localStorage.getItem('User_Type'));
    this.User_Type_Id=Number(localStorage.getItem('User_Type_Id'));
    this.Login_User_Id=localStorage.getItem('Login_User');
    this.Employee_Name=localStorage.getItem('Employee_Name');
    this.Employee_Id=Number(localStorage.getItem('Employee_Id'));
    this.Permissions = Get_Page_Permission(96);
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
    this.quotationId = Number(localStorage.getItem('QuotationNo'));
    localStorage.removeItem('QuotationNo');
debugger

    this.PerformaInvoiceId = Number(localStorage.getItem('PerformaInvoiceNo'));
    localStorage.removeItem('PerformaInvoiceNo');

    this.DeliveryOrderMaster_Id = Number(localStorage.getItem('DeliveryOrderMaster_Id'));
    localStorage.removeItem('DeliveryOrderMaster_Id');


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
    // this.Quotation_Master_.EntryDate=new Date("dd-MMM-yyyy").toString();
    this.Search_FromDate=this.New_Date(this.Search_FromDate);
    this.Search_ToDate=this.New_Date(this.Search_ToDate);
    this.Delivery_Order_Master_.EntryDate=new Date("dd-MMM-yyyy").toString();
    // this.Clr_Sales_Master();
    // this.Clr_Sales_Details();
    this.Sales_Print=true;
    this.Entry_View=false;

    // this.Load_Bill_Type();
    // this.Load_InvoiceType();
    // this.Load_Payment_Term();
    // this.Load_Currency();
    // this.Load_Company() ;
    // this.Load_Item_Group();

    // this.Load_Employees();


    if(this.quotationId >0){
        debugger
        this.loadQuotation()
    }
debugger
    if(this.PerformaInvoiceId >0){
        debugger
        this.loadPerforma()
    }

    if(this.DeliveryOrderMaster_Id > 0)
    {
        debugger
        this.Load_DeliveryOrder();
    }
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
        this.currencydetails_Service_.Load_currencydetails().subscribe(Rows => {
            if (Rows != null) {
                this.currencyData = Rows[0];
                this.Currency_Temp.CurrencyDetails_Id = 0;
                this.Currency_Temp.CurrecnyName = "Select";
                this.currencyData.unshift(this.Currency_Temp);
                this.Currency_Search=this.currencyData[0];
                this.Currency = this.currencyData[0];
            }
            this.issLoading = false;
        },
            Rows => {
                this.issLoading = false;
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
            });
    }

    Load_InvoiceType() {
        
        this.User_Details_Service_.Load_InvoiceType2().subscribe(Rows => {
            this.AccounttypeData = Rows[0];        
            this.Accounttype_Temp.AccountType_Id = 0;
            this.Accounttype_Temp.AccountType_Name = "Select";
            this.AccounttypeData.unshift(this.Accounttype_Temp);
            this.Accounttype = this.AccounttypeData[0];
            this.Search_AccountType=this.AccounttypeData[0];     

            this.accounttype_search = this.AccounttypeData[0];
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
                this.Item_Group_Temp.Item_Group_Id = 0;
                this.Item_Group_Temp.Item_Group_Name = "Select";
                this.itemGroupData.unshift(this.Item_Group_Temp);
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
            if (Rows != null) {
                this.EmployeeData = Rows[0];
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
                this.PaymentTermData = Rows[0];
                this.PaymentTerm_Temp.payment_Term_ID = 0;
                this.PaymentTerm_Temp.Payment_Term_Description = "Select";
                this.PaymentTermData.unshift(this.PaymentTerm_Temp);
                this.paymentTerms = this.PaymentTermData[0];
            }
            this.issLoading = false;
        },
            Rows => {
                this.issLoading = false;
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
            });
    }
 
    loadQuotation(){
        this.Entry_View = true;
        this.issLoading = true;
        // this.Load_Bill_Type();
        // this.Load_InvoiceType();
        // this.Load_Payment_Term();
        // this.Load_Currency(); 
        debugger
        this.salesquotationmaster_Service_.Get_salesquotationmaster(this.quotationId).subscribe(result=>{
            debugger
            this.Delivery_Order_Master_=new deliveryordermaster()
            //this.Delivery_Order_Master_Data=result[0];
            this.Delivery_Order_Master_=Object.assign({},result[0][0]); 
             this.Delivery_Order_Master_.DeliveryOrderMaster_Id=0;
            this.Delivery_Order_Master_.payment_Term_Value=result[0][0].PaymentTermValue;
             this.Delivery_Order_Master_.CurrencyId=result[0][0].CurrencyId;
             this.Delivery_Order_Master_.TypeId=result[0][0].TypeId;
            this.Delivery_Order_Master_.Payment_Term_Description=result[0][0].Payment_Term_Description;

            this.POnumber = result[0][0].POnumber;
            this.Delivery_Order_Master_.LPONo1 = result[0][0].POnumber;
            this.Delivery_Order_Master_.EntryDate=new Date().toString();
            this.Delivery_Order_Master_.EntryDate=this.formatDate(this.Delivery_Order_Master_.EntryDate);              
            
            this.Delivery_Order_Master_.Account_Party_Id=result[0][0].Account_Party_Id;
            this.Customer_Temp.Client_Accounts_Id=this.Delivery_Order_Master_.Account_Party_Id;
            this.Customer_Temp.Client_Accounts_Name=this.Delivery_Order_Master_.Customer;
            this.Customer_=this.Customer_Temp;

            this.Delivery_Order_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
            this.Delivery_Order_Master_.Customer=this.Delivery_Order_Master_.Customer_Name; 
            this.Customer_Name = this.Delivery_Order_Master_.Client_Accounts_Name;

            this.Customer_.Client_Accounts_Id=this.Delivery_Order_Master_.Account_Party_Id;
            this.Customer_.Client_Accounts_Name = this.Delivery_Order_Master_.Client_Accounts_Name;
            // this.Address1 = this.Delivery_Order_Master_.Address1;
            // this.Address2 = this.Delivery_Order_Master_.Address2;
            // this.Address3 = this.Delivery_Order_Master_.Address3;
            // this.Address4 = this.Delivery_Order_Master_.Address4;
            // this.Vatin = this.Delivery_Order_Master_.GSTNo;
            
           // this.issLoading = true;
            // this.Client_Accounts_Service_.Get_Client_Accounts(this.Delivery_Order_Master_.Account_Party_Id).subscribe((result)=>{
            //     if(result!=null)
            //     {
            //         debugger
            //                 this.Customer_Temp.Client_Accounts_Id=result[0][0].Client_Accounts_Id;
            //                 this.Customer_Temp.Client_Accounts_Name=result[0][0].Client_Accounts_Name;
            //                 this.Customer_= this.Customer_Temp;

            //                 this.Delivery_Order_Master_.Address1 = result[0][0].Address1;
            //                 this.Delivery_Order_Master_.Address2 = result[0][0].Address2;
            //                 this.Delivery_Order_Master_.Address3 = result[0][0].Address3;
            //                 this.Delivery_Order_Master_.Address4 = result[0][0].Address4;
            //                 this.Delivery_Order_Master_.Vatin = result[0][0].GSTNo;
                           
            //                 this.Address1 = result[0][0].Address1;
            //                 this.Address2 = result[0][0].Address2;
            //                 this.Address3 = result[0][0].Address3;
            //                 this.Address4 = result[0][0].Address4;
            //                 this.Vatin = result[0][0].GSTNo;
            //     }
            // });
            this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39','').subscribe(Rows => {     
                if (Rows != null) {
                    this.Customer_Data = Rows[0];
                    for (var i = 0; i < Rows[0].length; i++) {
                        if (Rows[0][i].Client_Accounts_Id == result[0][0].Account_Party_Id) {
                            this.Customer_ = Rows[0][i];
                            this.Customer_.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                            this.Customer_.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                            this.Customer_Name = Rows[0][i].Client_Accounts_Name;       
                            
                            this.Delivery_Order_Master_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                            this.Delivery_Order_Master_.Customer_Name=Rows[0][i].Client_Accounts_Name;
                            this.Delivery_Order_Master_.Customer=Rows[0][i].Client_Accounts_Name;

                            this.Delivery_Order_Master_.Address1 = Rows[0][i].Address1;
                            this.Delivery_Order_Master_.Address2 = Rows[0][i].Address2;
                            this.Delivery_Order_Master_.Address3 = Rows[0][i].Address3;
                            this.Delivery_Order_Master_.Address4 = Rows[0][i].Address4;
                            this.Delivery_Order_Master_.Vatin = Rows[0][i].GSTNo;

                            this.Address1 = Rows[0][i].Address1;
                            this.Address2 = Rows[0][i].Address2;
                            this.Address3 = Rows[0][i].Address3;
                            this.Address4 = Rows[0][i].Address4;
                            this.Vatin = Rows[0][i].GSTNo;
                        }
                    }
                }
            });

            this.Sales_Master_Service_.Get_Quotation_Details(result[0][0].SalesQuotationMaster_Id).subscribe(Rows => {     
                if (Rows != null) {
                    this.Delivery_Order_Details_Data = Rows[0];
                    this.Final_Amounts();
                    this.addBlankRows();                    
                    }
                      
                   },
                 Rows => {
                       
                   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                });

                if(this.currencyData==undefined || this.currencyData==null)
                    {
                        this.currencydetails_Service_.Load_currencydetails().subscribe(Rows => {
                            if (Rows != null) {
                                this.currencyData = Rows[0];
                                this.Currency_Temp.CurrencyDetails_Id = 0;
                                this.Currency_Temp.CurrecnyName = "Select";
                                this.currencyData.unshift(this.Currency_Temp);
                                this.Currency = this.currencyData[0];                            
                                          
                            for (var i = 0; i < Rows[0].length; i++) {
                                if (Rows[0][i].CurrencyDetails_Id == result[0][0].CurrencyId) {
                                    this.Currency = Rows[0][i];
                                }
                            }     
                        }
                        })
                    }
                    else{
                    for (var i = 0; i < this.currencyData.length; i++) {
                        if (this.currencyData[i].CurrencyDetails_Id == this.Delivery_Order_Master_.CurrencyId) {
                            this.Currency = this.currencyData[i];
                        }
                    }                  
                }
                if(this.AccounttypeData == undefined || this.AccounttypeData==null)
                {
                    this.User_Details_Service_.Load_InvoiceType2().subscribe(Rows => {
                        if (Rows != null) {
                            this.AccounttypeData = Rows[0];        
                            this.Accounttype_Temp.AccountType_Id = 0;
                            this.Accounttype_Temp.AccountType_Name = "Select";
                            this.AccounttypeData.unshift(this.Accounttype_Temp);
                            this.Accounttype = this.AccounttypeData[0];                       
                                
                        for(var i = 0; i< Rows[0].length;i++)
                            {
                                if(Rows[0][i].AccountType_Id == result[0][0].TypeId)
                                {
                                    this.Accounttype = Rows[0][i];
                                }
                            }
                        }
                    });
                }
                else
                    {
                    for(var i = 0; i< this.AccounttypeData.length;i++)
                    {
                        if(this.AccounttypeData[i].AccountType_Id == this.Delivery_Order_Master_.TypeId)
                        {
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
                            this.paymentTerms = this.PaymentTermData[0];
                   
                            for(var i = 0; i< Rows[0].length; i++)
                                {
                                    if(Rows[0][i].payment_Term_ID == result[0][0].Payment_Term_Description)
                                    {
                                        this.paymentTerms = Rows[0][i];
                                    }
                                }
                        }
                    })
                 }
                 else{
                for(var i = 0; i< this.PaymentTermData.length; i++)
                    {
                        if(this.PaymentTermData[i].payment_Term_ID == this.Delivery_Order_Master_.Payment_Term_Description)
                        {
                            this.paymentTerms = this.PaymentTermData[i];
                        }
                    }
                }           
        })
        this.issLoading = false;
    }

    loadPerforma(){
        this.Entry_View = true;
        this.issLoading = true;
        // this.Load_Bill_Type();
        // this.Load_InvoiceType();
        // this.Load_Payment_Term();
        // this.Load_Currency(); 
        debugger
        this.salesquotationmaster_Service_.Get_salesPerformaInvoicemaster(this.PerformaInvoiceId).subscribe(result=>{
            
            debugger; 
            this.Delivery_Order_Master_=new deliveryordermaster()
           // this.Delivery_Order_Master_Data=result[0];

            this.Delivery_Order_Master_=Object.assign({},result[0][0]); 
            // this.performainvoicemaster_.POnumber = null;
            this.Delivery_Order_Master_.payment_Term_Value=result[0][0].PaymentTermValue;
             this.Delivery_Order_Master_.CurrencyId=result[0][0].CurrencyId;
             this.Delivery_Order_Master_.TypeId=result[0][0].TypeId;
             this.Delivery_Order_Master_.Payment_Term_Description=result[0][0].Payment_Term_Description;
            this.POnumber = result[0][0].POnumber;
            this.Delivery_Order_Master_.LPONo1 = result[0][0].LPONo;
            debugger
            this.Delivery_Order_Master_.Account_Party_Id=result[0][0].Account_Party_Id;
            this.Customer_Temp.Client_Accounts_Id=this.Delivery_Order_Master_.Account_Party_Id;
            this.Customer_Temp.Client_Accounts_Name=this.Delivery_Order_Master_.Customer;
            this.Customer_=this.Customer_Temp;
            this.Delivery_Order_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
            this.Delivery_Order_Master_.Customer=this.Delivery_Order_Master_.Customer_Name; 

            this.Delivery_Order_Master_.EntryDate=new Date().toString();
            this.Delivery_Order_Master_.EntryDate=this.formatDate(this.Delivery_Order_Master_.EntryDate);  

            // this.Client_Accounts_Service_.Get_Client_Accounts(this.Delivery_Order_Master_.Account_Party_Id).subscribe((result)=>{
            //     if(result!=null)
            //     {
            //         debugger
            //                 this.Customer_Temp.Client_Accounts_Id=result[0][0].Client_Accounts_Id;
            //                 this.Customer_Temp.Client_Accounts_Name=result[0][0].Client_Accounts_Name;
            //                 this.Customer_= this.Customer_Temp;

            //                 this.Delivery_Order_Master_.Address1 = result[0][0].Address1;
            //                 this.Delivery_Order_Master_.Address2 = result[0][0].Address2;
            //                 this.Delivery_Order_Master_.Address3 = result[0][0].Address3;
            //                 this.Delivery_Order_Master_.Address4 = result[0][0].Address4;
            //                 this.Delivery_Order_Master_.Vatin = result[0][0].GSTNo;
                           
            //                 this.Address1 = result[0][0].Address1;
            //                 this.Address2 = result[0][0].Address2;
            //                 this.Address3 = result[0][0].Address3;
            //                 this.Address4 = result[0][0].Address4;
            //                 this.Vatin = result[0][0].GSTNo;
            //     }
            // });

        this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39','').subscribe(Rows => {   
            if (Rows != null) {
                debugger
                this.Customer_Data = Rows[0];
                for (var i = 0; i < Rows[0].length; i++) {
                    if (Rows[0][i].Client_Accounts_Id == result[0][0].Account_Party_Id) {
                        this.Customer_ = Rows[0][i];                       
                        this.Customer_.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                        this.Customer_.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                        this.Customer_Name = Rows[0][i].Client_Accounts_Name;                         

                        this.Delivery_Order_Master_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                        this.Delivery_Order_Master_.Customer=Rows[0][i].Client_Accounts_Name;
                        this.Delivery_Order_Master_.Customer_Name=Rows[0][i].Client_Accounts_Name;

                        this.Delivery_Order_Master_.Address1 = result[0][0].Address1;
                        this.Delivery_Order_Master_.Address2 = result[0][0].Address2;
                        this.Delivery_Order_Master_.Address3 = result[0][0].Address3;
                        this.Delivery_Order_Master_.Address4 = result[0][0].Address4;
                        this.Delivery_Order_Master_.Vatin = result[0][0].GSTNo;

                        this.Address1 = Rows[0][i].Address1;
                        this.Address2 = Rows[0][i].Address2;
                        this.Address3 = Rows[0][i].Address3;
                        this.Address4 = Rows[0][i].Address4;
                        this.Vatin = Rows[0][i].GSTNo;
                    }
                }
            }
        });

        this.Sales_Master_Service_.Get_Performa_invoice_Details(result[0][0].PerformaInvoiceMaster_Id).subscribe(Rows => {     
            if (Rows != null) {
                debugger;
                this.Delivery_Order_Details_Data = Rows[0];
                this.Final_Amounts();
                this.addBlankRows();        
                }
            },
            Rows => {
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            });

            if(this.currencyData==undefined || this.currencyData==null)
                {
                    this.currencydetails_Service_.Load_currencydetails().subscribe(Rows => {
                        if (Rows != null) {
                            this.currencyData = Rows[0];
                            this.Currency_Temp.CurrencyDetails_Id = 0;
                            this.Currency_Temp.CurrecnyName = "Select";
                            this.currencyData.unshift(this.Currency_Temp);
                            this.Currency = this.currencyData[0];                            
                                              
                            for (var i = 0; i < Rows[0].length; i++) {
                            if (Rows[0][i].CurrencyDetails_Id == result[0][0].CurrencyId) {
                                this.Currency = Rows[0][i];
                            }
                        }     
                    }
                    })
                }
                else{
                for (var i = 0; i < this.currencyData.length; i++) {
                    if (this.currencyData[i].CurrencyDetails_Id == this.Delivery_Order_Master_.CurrencyId) {
                        this.Currency = this.currencyData[i];
                    }
                }                  
            }
            if(this.AccounttypeData == undefined || this.AccounttypeData==null)
            {
                this.User_Details_Service_.Load_InvoiceType2().subscribe(Rows => {
                    if (Rows != null) {
                        this.AccounttypeData = Rows[0];        
                        this.Accounttype_Temp.AccountType_Id = 0;
                        this.Accounttype_Temp.AccountType_Name = "Select";
                        this.AccounttypeData.unshift(this.Accounttype_Temp);
                        this.Accounttype = this.AccounttypeData[0];                       
                               
                    for(var i = 0; i< this.AccounttypeData.length;i++)
                        {
                            if(this.AccounttypeData[i].AccountType_Id == this.Delivery_Order_Master_.TypeId)
                            {
                                this.Accounttype = this.AccounttypeData[i];
                            }
                        }
                    }
                });
            }
            else
                {
                for(var i = 0; i< this.AccounttypeData.length;i++)
                {
                    if(this.AccounttypeData[i].AccountType_Id == this.Delivery_Order_Master_.TypeId)
                    {
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
                        this.paymentTerms = this.PaymentTermData[0];

                        for(var i = 0; i< this.PaymentTermData.length; i++)
                            {
                                if(this.PaymentTermData[i].payment_Term_ID == this.Delivery_Order_Master_.Payment_Term_Description)
                                {
                                    this.paymentTerms = this.PaymentTermData[i];
                                }
                            }
                    }
                })
             }
             else{
            for(var i = 0; i< this.PaymentTermData.length; i++)
                {
                    if(this.PaymentTermData[i].payment_Term_ID == this.Delivery_Order_Master_.Payment_Term_Description)
                    {
                        this.paymentTerms = this.PaymentTermData[i];
                    }
                }
            } 
    this.issLoading = false;
                // this.purchaseordermaster_Service_.Search_PurchaseOrderNumber_DeliveryOrderMaster_Typeahead(this.POnumber,0).subscribe(Rows => {     
                // if (Rows != null) {
                //     this.PurchaseOrder_Data = Rows[0];

                //     for(var i = 0; i< this.PurchaseOrder_Data.length; i++)
                //         {
                //             if (this.PurchaseOrder_Data[i].Is_Checked.toString()=='1')
                //                 this.PurchaseOrder_Data[i].Is_Checked= true;
                //             else
                //              this.PurchaseOrder_Data[i].Is_Checked = false;
                //         } 
                     

                //         this.renderer.selectRootElement(this.myInput.nativeElement).click();


                //         debugger  
                // }
                // this.issLoading = false;
                // },
                // Rows => {
                 
                // this.issLoading = false;
                //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
                // });
      })
    }

Create_New()
{
    //document.getElementById("Tab_Edit").hidden=true; 
    this.Entry_View = true;
    this.invoice_list_view = false;
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
    this.invoice_list_view = false;
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
   // this.Quotation_Details_Data=[];
   // this.Search_Quotation();
    this.invoice_list_view = false;

    setTimeout(() => {
        if (this.topDiv1) {
            this.topDiv1.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
    //document.getElementById("Tab_Edit").hidden=true; 
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

    if(this.Currency.CurrencyDetails_Id == 0)
        {
            this.CurrecnyName = '';
        }
        else
        {
            this.CurrecnyName = this.Currency.CurrecnyName;
        }
    
        if(this.paymentTerms.payment_Term_ID == 0)
            {
                this.Payment_Term_Description = '';
            }
            else
            {
                this.Payment_Term_Description = this.paymentTerms.Payment_Term_Description;
            }

    if(this.Accounttype.AccountType_Id == 0)
    {
        this.AccountType_Name = '';
    }
    else
    {
        this.AccountType_Name = this.Accounttype.AccountType_Name;

    }
   //this.Load_Company() ;   
    // this.Image_Url='/assets/img/'+this.Print_Company_.Company_Id+'.jpg';
    // this.Company_Sign='/assets/img/Sign_'+this.Print_Company_.Company_Id+'.jpg';
    // this.Company_Seal='/assets/img/Seal_'+this.Print_Company_.Company_Id+'.jpg';  
    // for (let i = 0; i < this.currencyData.length; i++) {
    //     if(this.Delivery_Order_Master_.CurrencyId = this.currencyData[i].CurrencyDetails_Id){
    //         this.currencyName = this.currencyData[i].CurrecnyName
    //     }
        
    //    }
    this.Delivery_Order_Master_.EntryDate = this.formatDate(this.Delivery_Order_Master_.EntryDate)
    this.Delivery_Order_Master_.PrintDate = this.formatPrintDate(this.Delivery_Order_Master_.EntryDate);    
    setTimeout(()=>{
    let popupWinindow
    let innerContents = document.getElementById("Print_Div1").innerHTML;
    popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();     
            }) 
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
    this.Delivery_Order_Master_.DeliveryOrderMaster_Id=0;
    this.Delivery_Order_Master_.Account_Party_Id=0;
    this.Delivery_Order_Master_.DONo = "";
    this.DeliveryOrderMaster_Id_Edit = 0;
    //this.Quotation_Master_.Employee_Id=0;
    //this.Quotation_Master_.Employee_Name=this.Employee_Name;
    this.Delivery_Order_Master_.User_Id=0;
    // this.Quotation_Master_.EntryDate=new Date().toString();
    // this.Quotation_Master_.EntryDate=this.formatDate(this.Quotation_Master_.EntryDate);
    // this.Quotation_Master_.QuotationNo="";
    // this.Delivery_Order_Master_.CurrencyId=0;
    // this.Quotation_Master_.Brand="";
    // this.Quotation_Master_.PriceBasis="";
    this.Delivery_Order_Master_.PaymentTerms = null;
    this.Delivery_Order_Master_.Payment_Term_Description = null;
    this.Delivery_Order_Master_.payment_Term_Value = 0;
    this.Delivery_Order_Master_.TypeId = 0;
    this.Delivery_Order_Master_.CurrencyId = 0;
    this.Delivery_Order_Master_.EntryDate=new Date().toString();
    this.Delivery_Order_Master_.EntryDate=this.formatDate(this.Delivery_Order_Master_.EntryDate);   
    this.Delivery_Order_Master_.Kind_Attend = '';
    this.Delivery_Order_Master_.UserName = "";
    // this.Quotation_Master_.Validity = "";
    // this.Quotation_Master_.Description1 = "";
    // this.Quotation_Master_.Discount_Description = null;
    // this.Quotation_Master_.Charge1 = "";
    // this.Quotation_Master_.Charge1per = null;
    // this.Quotation_Master_.Charge2 = "";
    this.Delivery_Order_Master_.Received_By = "";
    this.selectedPONumber = [];
    // this.Quotation_Master_.VAT_Percentage = null;
    // this.Quotation_Master_.Additional_Discount = 0;
    // this.Quotation_Master_.charge1_Amount = 0;
    // this.Quotation_Master_.charge2_Amount = 0;
    // this.Quotation_Master_.TotalDiscount = 0
    // this.Quotation_Master_.VAT_Amount = 0;
    // this.Quotation_Master_.Total_Amount = 0;
    // this.Quotation_Master_.Roundoff_Amt = 0;
    // this.Quotation_Master_.Amount_In_Words = "";
    // this.Quotation_Master_.NetTotal=0;
    // this.Quotation_Master_.Cess=0;
    // this.Quotation_Master_.RoundOff=0;
    // this.Quotation_Master_.TotalAmount=0;
    // this.Quotation_Master_.Description2="";
    // this.Quotation_Master_.Address1="";
    // this.Quotation_Master_.Address2="";
    // this.Quotation_Master_.Address3="";
    // this.Quotation_Master_.Address4="";
    // this.Quotation_Master_.Mobile="";
    // this.Quotation_Master_.Customer_Name="";
    // this.Quotation_Master_.PinCode="";
    // this.Quotation_Master_.GSTNo="";    
    // this.Quotation_Master_.GrandTotal=0;
    // this.Quotation_Master_.Transportation_Gst=0;
    // this.Quotation_Master_.Handling_Gst=0;
    // this.Quotation_Master_.Transportation_Total=0;
    // this.Quotation_Master_.Handling_Total=0;
    // this.Quotation_Master_.Vehicle_No="";
    // this.Quotation_Master_.Driver_Name="";
    // this.Quotation_Master_.Mobile_No = "";
    this.Delivery_Order_Master_.Delivery_Address1 = "";
    this.Delivery_Order_Master_.Delivery_Address2 = "";
    this.Delivery_Order_Master_.Delivery_Address3 = "";
    this.Delivery_Order_Master_.Delivery_Address4 = "";
    if(this.Bill_Type_Data!=undefined && this.Bill_Type_Data!=null)
    this.Bill_Type_=this.Bill_Type_Data[1];
    if(this.Bill_Mode_Data!=undefined && this.Bill_Mode_Data!=null)
    this.Bill_Mode_=this.Bill_Mode_Data[0];
    this.Customer_=null;
    this.Delivery_Order_Details_Data = [];    
    this.Address1 = null;
    this.Address2 = null;
    this.Address3 = null;
    this.Address4 = null;
    this.Customer_Name = null;
    this.Vatin = null;
    this.POnumber = null;
    this.Attention = null;
    this.Employee = null;
    this.Tot_Amount = null;
    this.Total = 0;

    this.DeliveryOrderMaster_Id_Edit = 0;
    this.SalesQuotationMaster_Id = 0;

    

    if(this.currencyData!=undefined && this.currencyData!=null)
    {
        this.Currency = this.currencyData[0];
    }

    if(this.AccounttypeData!= undefined && this.AccounttypeData!=null)
    {
        this.Accounttype = this.AccounttypeData[0];
    }

    if(this.PaymentTermData!= undefined && this.PaymentTermData!= null)
    {
        this.paymentTerms = this.PaymentTermData[0];
    }

    /*** Added on 31-10-2024 */

    this.Delivery_Order_Master_.LPONo1 = '';

}
Clr_Sales_Details()
{
    this.Quotation_Details_Index=-1;
    this.Delivery_Order_Details_.DeliveryOrderDetails_Id=0;
    this.Delivery_Order_Details_.DeliveryMaster_Id=0;
    this.Delivery_Order_Details_.StockId=0;
    //this.Quotation_Details_.Stock_Details_Id=0;
    this.Delivery_Order_Details_.ItemId=0;
    this.Delivery_Order_Details_.ItemName="";
    this.Delivery_Order_Details_.Item_Code="";
    this.Delivery_Order_Details_.GroupId=0;
    this.Delivery_Order_Details_.GroupName="";
    this.Delivery_Order_Details_.UnitId=0;
    this.Delivery_Order_Details_.UnitName="";
    this.Delivery_Order_Details_.PurchaseRate=0;
    this.Delivery_Order_Details_.UnitPrice=0;
    this.Delivery_Order_Details_.MRP=0;
    this.Delivery_Order_Details_.TaxAmount=0;
    this.Delivery_Order_Details_.Stock=0;
    this.Delivery_Order_Details_.HSNCODE="";
    this.Delivery_Order_Details_.SaleTax=0;
    this.Delivery_Order_Details_.Quantity=0;
    this.Delivery_Order_Details_.Discount=0;
    this.Delivery_Order_Details_.NetValue=0;

    this.Barcode_=null;
    this.Item_ = null;

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
   this.Sales_Master_Service_.Change_Bill_Status(Sales_Master_Id,BillType).subscribe((Status: any) => {       
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
Delete_Quotation_Master(DeliveryOrderMaster_Id,index)
 {
    const dialogRef = this.dialogBox.open
    ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>        
    {    
    if (result == 'Yes') {
        this.issLoading = true;
        this.Sales_Master_Service_.Delete_Delivery_Order(DeliveryOrderMaster_Id)
        .pipe(finalize(() => this.issLoading = false))
        .subscribe({
            next: (response: any) => {
                if (response.success && response.data) {
                    const deleteStatus = response.data;
                    if (deleteStatus.DeliveryOrderMaster_Id_ == -1) {
                        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: response.message || 'Cannot Delete', Type: "3" } });
                    } else if (deleteStatus.DeliveryOrderMaster_Id_ > 0) {
                        this.Quotation_Master_Data.splice(index, 1);
                        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Deleted Successfully', Type: "false" } });
                        this.Search_Quotation();
                    } else {
                        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: response.message || 'Error occurred', Type: "2" } });
                    }
                } else {
                    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: response.message || 'Error occurred', Type: "2" } });
                }
            },
            error: (err) => {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error occurred while deleting', Type: "2" } });
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
    debugger;
    var Value = "";
    if (event.target.value == "")
        Value = undefined;
    else
        Value = event.target.value;
      {
        debugger;
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
    debugger;
    var Value = "";
    console.log('event.target: ', event.target);
    console.log('event: ', event);
 if(event['target']){

     Value = event.target.value;
     console.log('Value: ', Value);
    }
    
      
     this.issLoading = true;
     debugger;
    this.purchaseordermaster_Service_.Search_PurchaseOrderNumber_DeliveryOrderMaster_Typeahead(Value,this.DeliveryOrderMaster_Id_Edit).subscribe(Rows => {     
        debugger;
    if (Rows != null) {
        this.PurchaseOrder_Data = Rows[0];
        for(var i = 0; i< this.PurchaseOrder_Data.length; i++)
            {
                if (this.PurchaseOrder_Data[i].Is_Checked.toString()=='1')
                    this.PurchaseOrder_Data[i].Is_Checked= true;
                else
                 this.PurchaseOrder_Data[i].Is_Checked = false;
            }   
            
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
       console.log(Value)
      this.issLoading = true;
     this.Sales_Master_Service_.Get_Purchase_Item_Code_Typeahead(Value).subscribe(Rows => {     
     if (Rows != null) {
        debugger
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
//         // else
//         // {

//         // }

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
    var Value = "";
    if(this.Barcode_ == null || this.Barcode_ == undefined)
         this.Barcode_ = new deliveryorderdetails();
     
    Value = event.target.value;
    if(Value == null || Value == undefined || Value == "undefined" || Value == "null")
        Value = "";
if(this.Barcode_.Item_Code)
{
   this.Barcode_.ItemName=Value
}   
    this.Quotation_Details_.ItemName=Value;
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
    this.Delivery_Order_Master_.Account_Party_Id=this.Customer_.Client_Accounts_Id;
    this.Delivery_Order_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.Delivery_Order_Master_.Customer=this.Customer_.Client_Accounts_Name;

    this.Delivery_Order_Master_.Address1 = this.Customer_.Address1;
    this.Delivery_Order_Master_.Address2 = this.Customer_.Address2;
    this.Delivery_Order_Master_.Address3 = this.Customer_.Address3;
    this.Delivery_Order_Master_.Address4 = this.Customer_.Address4;
    this.Delivery_Order_Master_.Mobile = this.Customer_.Mobile;
    this.Delivery_Order_Master_.PinCode=this.Customer_.PinCode;
    this.Delivery_Order_Master_.GSTNo=this.Customer_.GSTNo;

    this.Address1 = this.Customer_.Address1;
    this.Address2 = this.Customer_.Address2;
    this.Address3 = this.Customer_.Address3;
    this.Address4 = this.Customer_.Address4;
    this.Mobile = this.Customer_.Mobile;
    this.PinCode=this.Customer_.PinCode;
    this.GSTNo=this.Customer_.GSTNo;
}
selectCustomer(){
    this.Delivery_Order_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.Delivery_Order_Master_.Customer=this.Customer_.Client_Accounts_Name;
    this.Delivery_Order_Master_.Account_Party_Id=this.Customer_.Client_Accounts_Id;

    this.Delivery_Order_Master_.Address1 = this.Customer_.Address1;
    this.Delivery_Order_Master_.Address2 = this.Customer_.Address2;
    this.Delivery_Order_Master_.Address3 = this.Customer_.Address3;
    this.Delivery_Order_Master_.Address4 = this.Customer_.Address4;
    this.Delivery_Order_Master_.Mobile = this.Customer_.Mobile;
    this.Delivery_Order_Master_.PinCode=this.Customer_.PinCode;
    this.Delivery_Order_Master_.GSTNo=this.Customer_.GSTNo;

    this.Address1 = this.Customer_.Address1;
    this.Address2 = this.Customer_.Address2;
    this.Address3 = this.Customer_.Address3;
    this.Address4 = this.Customer_.Address4;
    this.Vatin = this.Customer_.GSTNo;
}
// Item_Name_Change(item:Stock){
//     debugger;
//     this.Barcode_Temp.Stock_Id=this.Stock_.Stock_Id;
//     //this.Barcode_Temp.Barcode=this.Stock_.Barcode;
//     this.Barcode_=Object.assign({},this.Barcode_Temp);
//     //this.Quotation_Details_.Barcode=this.Stock_.Barcode;
//     // if(this.Stock_.ItemId==0 || this.Stock_.ItemId ==null || this.Stock_.ItemId==undefined)
//     // {
//     //     this.Quotation_Details_.ItemId=0;

//     // }
//     // else
//     this.Quotation_Details_.ItemId=this.Stock_.ItemId;
   
//     this.Quotation_Details_.ItemName=this.Stock_.ItemName;
//     this.Quotation_Details_.UnitId=this.Stock_.UnitId;
//     this.Quotation_Details_.UnitName=this.Stock_.UnitName;
//     this.Quotation_Details_.MRP=this.Stock_.MRP;
//     this.Quotation_Details_.PurchaseRate=this.Stock_.PurchaseRate;
//     //this.Quotation_Details_.Quantity=this.Stock_.Quantity;
//     // this.Quotation_Details_.Stock=this.Stock_.Quantity;
//     //this.Quotation_Details_.SaleRate=this.Stock_.SaleRate;
//     this.Quotation_Details_.GroupId=this.Stock_.GroupId;
//     this.Quotation_Details_.GroupName=this.Stock_.GroupName;
//     this.Quotation_Details_.HSNMasterId=this.Stock_.HSNMasterId;
//     this.Quotation_Details_.HSNCODE=this.Stock_.HSNCODE;
//     this.Quotation_Details_.StockId=this.Stock_.Stock_Id;
//     this.Quotation_Details_.Sale_Tax=this.Stock_.SaleTax; 
// }
Barcode_Change(Barcode_sl:deliveryorderdetails)
{    
      debugger
    // this.Delivery_Order_Details_=Object.assign({},Barcode_sl);
    // this.Delivery_Order_Details_Temp_.ItemId=Barcode_sl.ItemId;
    // this.Delivery_Order_Details_Temp_.ItemName=Barcode_sl.ItemName;
    // this.Item_=Object.assign({},this.Delivery_Order_Details_Temp_);   
    
    // this.Delivery_Order_Details_.ItemId=Barcode_sl.ItemId;
    // this.Delivery_Order_Details_.ItemName=Barcode_sl.ItemName;
    // this.Delivery_Order_Details_.StockId=Barcode_sl.StockId;

    this.Delivery_Order_Details_=Object.assign({},Barcode_sl);
    this.Delivery_Order_Details_Temp_.ItemId=Barcode_sl.ItemId;
    this.Delivery_Order_Details_Temp_.ItemName=Barcode_sl.ItemName;
    this.Item_=Object.assign({},this.Delivery_Order_Details_Temp_);   
    
    this.Delivery_Order_Details_.ItemId=Barcode_sl.ItemId;
    this.Delivery_Order_Details_.ItemName=Barcode_sl.ItemName;
    this.Delivery_Order_Details_.StockId=Barcode_sl.StockId;

    this.Delivery_Order_Details_.Quantity=0;
}
// Calculate_Quotation_Details_Amount()
// {
//     debugger
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
Calculate_Quotation_Details_Amount()
{
    debugger
    if(this.Delivery_Order_Details_.Quantity == undefined || this.Delivery_Order_Details_.Quantity == null)
    this.Delivery_Order_Details_.Quantity = 0;
    if(this.Delivery_Order_Details_.UnitPrice == undefined || this.Delivery_Order_Details_.UnitPrice == null)
    this.Delivery_Order_Details_.UnitPrice = 0;


 this.Calculate_Total_Amount();
}
Calculate_Total_Amount()
{ 
    debugger;
    if(this.Delivery_Order_Details_.Discount == undefined || this.Delivery_Order_Details_.Discount == null)
        this.Delivery_Order_Details_.Discount = 0;
    if(this.Delivery_Order_Details_.Item_Discount_Amount == undefined || this.Delivery_Order_Details_.Item_Discount_Amount == null)
        this.Delivery_Order_Details_.Item_Discount_Amount = 0;

    this.Delivery_Order_Details_.Unit_Discount = (Number(this.Delivery_Order_Details_.UnitPrice) * Number(this.Delivery_Order_Details_.Discount))/ 100;
    this.Delivery_Order_Details_.Item_Discount_Amount =Number(this.Delivery_Order_Details_.Unit_Discount) * Number(this.Delivery_Order_Details_.Quantity);
    this.Delivery_Order_Details_.Amount = Number(this.Delivery_Order_Details_.Quantity) * Number(this.Delivery_Order_Details_.UnitPrice);
     this.Delivery_Order_Details_.TaxableAmount = Number(this.Delivery_Order_Details_.Amount) - Number(this.Delivery_Order_Details_.Item_Discount_Amount);
    this.Delivery_Order_Details_.TaxAmount = Number(this.Delivery_Order_Details_.TaxableAmount) * Number(this.Delivery_Order_Details_.Sale_Tax) /100;
    this.Delivery_Order_Details_.NetValue= Number(this.Delivery_Order_Details_.TaxableAmount) + Number(this.Delivery_Order_Details_.TaxAmount);

    this.Delivery_Order_Details_.Item_Discount_Amount=Number(this.Delivery_Order_Details_.Item_Discount_Amount.toFixed(3));    
    this.Delivery_Order_Details_.Amount=Number(this.Delivery_Order_Details_.Amount.toFixed(3));    
    this.Delivery_Order_Details_.TaxableAmount=Number(this.Delivery_Order_Details_.TaxableAmount.toFixed(3));
    this.Delivery_Order_Details_.TaxAmount=Number(this.Delivery_Order_Details_.TaxAmount.toFixed(3));  
    this.Delivery_Order_Details_.NetValue= Number(this.Delivery_Order_Details_.NetValue.toFixed(3));
    
}
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
    return isNaN(value) ? 0 : value;
}
Final_Amounts()
{      
    this.Tot_Gross=0,this.Tot_discount=0,this.Tot_Net=0,this.Delivery_Order_Master_.TotalAmount=0;this.Delivery_Order_Master_.Basic_Discount=0
    console.log('this.Delivery_Order_Details_Data.length :',this.Delivery_Order_Details_Data.length);
    for(var i = 0; i< this.Delivery_Order_Details_Data.length ; i++)
    {
        this.Delivery_Order_Master_.TotalAmount = Number(this.Delivery_Order_Master_.TotalAmount) + Number(this.Delivery_Order_Details_Data[i].UnitPrice) * Number(this.Delivery_Order_Details_Data[i].Quantity);

        this.Tot_discount = Number(this.Tot_discount)+  (Number(this.Delivery_Order_Details_Data[i].Unit_Discount) * Number(this.Delivery_Order_Details_Data[i].Quantity) );
        this.Delivery_Order_Master_.Basic_Discount = this.Delivery_Order_Master_.Basic_Discount + Number(this.Delivery_Order_Details_Data[i].Item_Discount_Amount)
        
    }
    this.Delivery_Order_Master_.TotalAmount = Number(this.Delivery_Order_Master_.TotalAmount.toFixed(3));
    this.Tot_discount = Number(this.Tot_discount.toFixed(3));
    if(Number(this.Delivery_Order_Master_.Discount_Description)>0){
        this.Delivery_Order_Master_.Additional_Discount = Number(this.Delivery_Order_Master_.TotalAmount) * (Number(this.Delivery_Order_Master_.Discount_Description)/ 100);

    }else{
        this.Delivery_Order_Master_.Additional_Discount = 0
    }
    //this.Delivery_Order_Master_.Discount_Description = (this.safeNumber(this.Delivery_Order_Master_.Additional_Discount) * 100)/this.Delivery_Order_Master_.TotalAmount
    this.Delivery_Order_Master_.TotalDiscount = Number(this.Tot_discount)+ Number(this.Delivery_Order_Master_.Additional_Discount);
    if(Number(this.Delivery_Order_Master_.Charge1per)>0){
        this.Delivery_Order_Master_.charge1_Amount = (Number(this.Delivery_Order_Master_.TotalAmount) - Number(this.Delivery_Order_Master_.Additional_Discount))* (Number(this.Delivery_Order_Master_.Charge1per)/100)
        this.Delivery_Order_Master_.charge1_Amount = Number(this.Delivery_Order_Master_.charge1_Amount.toFixed(3))
    }else{
        this.Delivery_Order_Master_.charge1_Amount =  0;
    }
    this.Total = Number(this.Delivery_Order_Master_.TotalAmount)-Number(this.Delivery_Order_Master_.TotalDiscount) + this.safeNumber(Number(this.Delivery_Order_Master_.charge2_Amount)) + Number(this.Delivery_Order_Master_.charge1_Amount)
    console.log('this.Total: ', this.Total);
    this.Total = Number(this.Total.toFixed(3))
    this.Delivery_Order_Master_.VAT_Amount = 0;
    if(this.Delivery_Order_Master_.VAT_Percentage>0){
        this.Delivery_Order_Master_.VAT_Amount = this.Total * (this.Delivery_Order_Master_.VAT_Percentage/100)
    }
    this.Delivery_Order_Master_.VAT_Amount = Number(this.Delivery_Order_Master_.VAT_Amount.toFixed(3))    
    this.Delivery_Order_Master_.Total_Amount = this.Total + this.Delivery_Order_Master_.VAT_Amount
    this.Delivery_Order_Master_.Total_Amount = Number(this.Delivery_Order_Master_.Total_Amount.toFixed(3))
    this.Delivery_Order_Master_.NetTotal = Number((this.Delivery_Order_Master_.Total_Amount - this.safeNumber(this.Delivery_Order_Master_.Roundoff_Amt)).toFixed(2))
    this.Delivery_Order_Master_.NetTotal = Number(this.Delivery_Order_Master_.NetTotal.toFixed(3))
    this.Delivery_Order_Master_.Amount_In_Words = this.numberToWordsIndianCurrency(this.Delivery_Order_Master_.NetTotal)
     
   
//this.Clr_Sales_Edit_Data();
}
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
    var look_In_Date_Value=0,CustomerId_=0,Item_Group_Id_=0,CurrencyDetails_Id_=0,User_Details_Id_ = 0,Account_Type_Id_ = 0;
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

    if(this.Search_AccountType.AccountType_Id == null || this.Search_AccountType.AccountType_Id == undefined)
        Account_Type_Id_ = 0;
    else
        Account_Type_Id_ = this.Search_AccountType.AccountType_Id;


    this.issLoading = true;
    this.Sales_Master_Service_.Search_Delivery_Order(look_In_Date_Value,
        moment(this.Search_FromDate).format('YYYY-MM-DD'),
        moment(this.Search_ToDate).format('YYYY-MM-DD'),
        CustomerId_,
        this.QuotNo,
        this.partNo,
        Item_Group_Id_,
        CurrencyDetails_Id_,
        User_Details_Id_,
        Account_Type_Id_,
        this.User_Type_Id, this.Login_User_Id)
    .pipe(finalize(() => this.issLoading = false))
    .subscribe({
        next: (response) => {
            if (response.success) {
                this.Quotation_Master_Data = response.data;
                this.Total_Entries = this.Quotation_Master_Data.length;
            } else {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: response.message || 'No Data Found', Type: "2" } });
            }
        },
        error: (err) => {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        }
    });
}
Add_Sales_Details()
{     
    if (this.Quotation_Details_Index >= 0) {
        this.Quotation_Details_Data[this.Quotation_Details_Index] = Object.assign({}, this.Quotation_Details_);
        }
    else {
        //this.Quotation_Details_.Barcode=this.Barcode_.Barcode;
        this.Quotation_Details_Data.push(Object.assign({}, this.Quotation_Details_));
}
this.Final_Amounts();
this.Quotation_Details_Index=-1;
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
//     else if(this.Delivery_Order_Details_.Quantity==undefined || this.Delivery_Order_Details_.Quantity==null || this.Delivery_Order_Details_.Quantity==0 )
//     {
//         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter the quantity',Type:"3"}});
//         return
//     }
//     else if(this.Delivery_Order_Details_.UnitPrice==undefined || this.Delivery_Order_Details_.UnitPrice==null || this.Delivery_Order_Details_.UnitPrice==0 )
//     {
//         const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter unit rate',Type:"3"}});
//         return
//     }     
//     if (this.Delivery_Order_Details_Data == undefined)
//         this.Delivery_Order_Details_Data = [];
//     var inserted = 0;
//     for (var i = 0; i < this.Delivery_Order_Details_Data.length; i++) {
//         if (this.Delivery_Order_Details_Data[i].StockId == this.Delivery_Order_Details_.StockId) {
//             if (this.Delivery_Order_Details_Index == i) {
//                 this.Delivery_Order_Details_Data[i] = Object.assign({}, this.Delivery_Order_Details_)// this.Sales_Details_;
//             }
//             else {
               
//                 this.Delivery_Order_Details_.TaxableAmount = this.TotalAmount-this.discount;
//                 this.Delivery_Order_Details_.TaxAmount = this.Delivery_Order_Details_.TaxableAmount * (this.safeNumber(this.Stock_.SaleTax) / 100);
//                 this.Delivery_Order_Details_.Item_Discount_Amount = Number(this.Delivery_Order_Details_.UnitPrice) * this.safeNumber(this.Delivery_Order_Details_.Discount)/100;
//                 this.Delivery_Order_Details_Data.push(Object.assign({}, this.Delivery_Order_Details_));
//             }
//             if (this.Delivery_Order_Details_Index != i && this.Delivery_Order_Details_Index >= 0) {
//                 this.Delivery_Order_Details_Data.splice(this.Delivery_Order_Details_Index, 1)
//             }
//             inserted = 1;
//             i = this.Delivery_Order_Details_Data.length;
//             break;
//         }
//     }
//     if (inserted == 0) {
//         if (this.Delivery_Order_Details_Index >= 0) {
//             this.Delivery_Order_Details_Data[this.Delivery_Order_Details_Index] = Object.assign({}, this.Delivery_Order_Details_)// this.Sales_Details_;
//         }
//         else {
//             this.Delivery_Order_Details_Data.push(Object.assign({}, this.Delivery_Order_Details_));
//         }
//     }
//     this.Delivery_Order_Details_Index = -1;
//     this.Focus_It(event);
//     this.Clr_Sales_Details();
//     this.Final_Amounts();

// }
Plus_Quotation_Details()
{
if(this.Delivery_Order_Details_.StockId>0)
    this.Delivery_Order_Details_.StockId=this.Delivery_Order_Details_.StockId;
else
    this.Delivery_Order_Details_.StockId=0;
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
if(this.Delivery_Order_Details_.Quantity==undefined || this.Delivery_Order_Details_.Quantity==null || this.Delivery_Order_Details_.Quantity==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Quantity',Type: "3" }});
return
}
else 
{
if(this.Delivery_Order_Details_Data==undefined)
this.Delivery_Order_Details_Data=[];
// if( this.Barcode_==null)
// {
//     this.Delivery_Order_Details_.Item_Code='';
// }
// else if(this.Barcode_.Item_Code!=undefined && this.Barcode_.Item_Code!=null)
// {
//     this.Delivery_Order_Details_.Item_Code=  this.Barcode_.Item_Code;
// }
// else if(this.Barcode_!=undefined && this.Barcode_!=null)
// {
//     const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
//     this.Delivery_Order_Details_.Item_Code=Barcode_string;
// }
//     this.Delivery_Order_Details_.Expiry_Date=this.New_Date(new Date(moment(this.Delivery_Order_Details_.Expiry_Date).format('YYYY-MM-DD')));
//     this.Delivery_Order_Details_.UnitPrice = parseFloat(Number(this.Delivery_Order_Details_.UnitPrice).toFixed(3));
//     this.Delivery_Order_Details_.Quantity = parseFloat(Number(this.Delivery_Order_Details_.Quantity).toFixed(3));
//     if (this.Delivery_Order_Details_Index >= 0) 
//     {
//         this.Delivery_Order_Details_Data[this.Delivery_Order_Details_Index] = Object.assign({}, this.Delivery_Order_Details_);
//     }
//     else
//     {
//         this.Delivery_Order_Details_Data.push(Object.assign({}, this.Delivery_Order_Details_));
//     }

    if( this.Barcode_==null)
        {
            this.Delivery_Order_Details_.Item_Code='';
        }
        else if(this.Barcode_.Item_Code!=undefined && this.Barcode_.Item_Code!=null)
        {
            this.Delivery_Order_Details_.Item_Code=  this.Barcode_.Item_Code;
        }
        else if(this.Barcode_!=undefined && this.Barcode_!=null)
        {
            const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
            this.Delivery_Order_Details_.Item_Code=Barcode_string;
        }

        if( this.Item_==null)
            {
                this.Delivery_Order_Details_.ItemName='';
            }
            else if(this.Item_.ItemName!=undefined && this.Item_.ItemName!=null)
            {
                this.Delivery_Order_Details_.ItemName=  this.Item_.ItemName;
            }
            else if(this.Item_!=undefined && this.Item_!=null)
            {
                const Itemnamestoing =JSON.parse(JSON.stringify(this.Item_));
                this.Delivery_Order_Details_.ItemName=Itemnamestoing;
            }


        
             this.Delivery_Order_Details_.UnitPrice = parseFloat(Number(this.Quotation_Details_.UnitPrice).toFixed(3));        
                 
            if (this.Delivery_Order_Details_Index >= 0) 
            {
                this.Delivery_Order_Details_Data[this.Delivery_Order_Details_Index] = Object.assign({}, this.Delivery_Order_Details_);
            }
            else
            {
                this.Delivery_Order_Details_Data.push(Object.assign({}, this.Delivery_Order_Details_));
            }
        

    this.Delivery_Order_Details_Index=-1;

    this.addBlankRows();
    this.Clr_Sales_Details(); 
    this.Final_Amounts(); 
}
}
Save_Quotation(Printstatus:number)
{
    /** account group id is same as client accounts id in client accounts table */

    debugger;
    let POnumber_Ids :PONumber[] = [];

    this.Delivery_Order_Master_.EntryDate = this.formatDate(this.Delivery_Order_Master_.EntryDate)

    if(this.Delivery_Order_Details_Data == undefined || this.Delivery_Order_Details_Data == null || this.Delivery_Order_Details_Data.length == 0 || this.Delivery_Order_Details_Data.length == undefined )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Add atleast one Item',Type:"3"}});
        return
    }
    if(this.Customer_ == undefined || this.Customer_ == null || this.Customer_.Client_Accounts_Id == undefined || this.Customer_.Client_Accounts_Id == 0 ){
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Choose Customer',Type:"3"}});
        return
    }   

    if(this.Delivery_Order_Master_.EntryDate == undefined || this.Delivery_Order_Master_.EntryDate == null)
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Pick a Date',Type:"3"}});
        return
    }  




debugger
// let minCheck = false;

// this.PurchaseOrder_Data_Temp=[]; 
// for (var i = 0; i< this.PurchaseOrder_Data.length; i++) 
//     {
//         if (Boolean(this.PurchaseOrder_Data[i].Is_Checked) == true) 
//             {
//                 this.PurchaseOrder_Data_Temp.push(this.PurchaseOrder_Data[i]);
//                 minCheck = true;
//             }
//     }

// if(minCheck == false)
// {
//     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Check at Least one P.O number from the dropdown',Type:"3"}});
//     return
// }

// debugger;

// if(this.PurchaseOrder_Data_Temp.length > 0)
// {
//     this.Delivery_Order_Master_.LPONo = this.PurchaseOrder_Data_Temp;
// }
// else
//     this.Delivery_Order_Master_.LPONo = [{"PurchaseOrderMaster_Id":0,
//                                           "InvoiceNo":""}]
    

    // for(var h = 0; h<this.selectedPONumber.length;h++)
    // {
    //     if (this.selectedPONumber[h].Is_Checked == true) 
    //         {
    //             POnumber_Ids = this.selectedPONumber.map(uni => ({ 
    //             InvoiceNo: uni.InvoiceNo,
    //             PurchaseOrderMasterId: uni.PurchaseOrderMaster_Id,
    //             Is_Checked: 1,
    //             Is_Checked1: 1
    //         }));
    //          }
    //     else
    //     {
    //        POnumber_Ids = this.selectedPONumber.map(uni => ({ 
    //        InvoiceNo: uni.InvoiceNo,
    //        PurchaseOrderMasterId: uni.PurchaseOrderMaster_Id,
    //        Is_Checked: 0,
    //        Is_Checked1: 0
    //     })); 
    //     }
    // }

    //  if(this.selectedPONumber.length == 0) {
    //     POnumber_Ids = [{ 
    //         InvoiceNo: "", 
    //         PurchaseOrderMasterId: 0 ,
    //         Is_Checked: 0,
    //         Is_Checked1: 0
    //     }];  
    // }



    debugger;
    if (this.Currency != null || this.Currency != undefined)
    {
        if(this.Currency.CurrencyDetails_Id != null || this.Currency.CurrencyDetails_Id != undefined)
        {
            this.Delivery_Order_Master_.CurrencyId = this.Currency.CurrencyDetails_Id;
        }
    }

    if (this.Accounttype != null || this.Accounttype != undefined)
        {
            if(this.Accounttype.AccountType_Id != null || this.Accounttype.AccountType_Id != undefined)
            {
                this.Delivery_Order_Master_.TypeId = this.Accounttype.AccountType_Id;
            }
        }

    debugger;
    // this.Delivery_Order_Master_.DeliveryOrderMaster_Id = 0;
    // this.Quotation_Master_.QuotationNo = "test"
    this.Delivery_Order_Master_.Account_Party_Id=this.Customer_.Client_Accounts_Id;
    this.Delivery_Order_Master_.User_Id=Number(this.Login_User_Id);

    // if(this.Attention)
    // {    
    //     this.Delivery_Order_Master_.Kind_Attend=this.Attention.User_Details_Id;
    //     this.Delivery_Order_Master_.UserName = this.Attention.User_Details_Name;
    // }
    // else
    // {
    //     this.Delivery_Order_Master_.Kind_Attend = 0;
    //     this.Delivery_Order_Master_.UserName = "";
    // }

    if(this.paymentTerms)
    {
        this.Delivery_Order_Master_.Payment_Term_Description = this.paymentTerms.payment_Term_ID;
        this.Delivery_Order_Master_.PaymentTerms = this.paymentTerms.Payment_Term_Description;
    }
    else
    {
        this.Delivery_Order_Master_.Payment_Term_Description = 0;
        this.Delivery_Order_Master_.PaymentTerms = "";
    }

    // this.Delivery_Order_Master_.LPONo = POnumber_Ids;
    this.Delivery_Order_Master_.Delivery_Order_Details = this.Delivery_Order_Details_Data;
    this.Delivery_Order_Master_.EntryDate = this.New_Date(new Date(moment(this.Delivery_Order_Master_.EntryDate).format('YYYY-MM-DD')));
    this.issLoading = true;

    this.Sales_Master_Service_.Save_Delivery_Order(this.Delivery_Order_Master_)
    .pipe(finalize(() => this.issLoading = false))
    .subscribe({
        next: (response: any) => {
            if (response.success && response.data) {
                const saveResult = response.data;
                if (Number(saveResult.DeliveryOrderMaster_Id_) > 0) {
                    this.Delivery_Order_Master_.DeliveryOrderMaster_Id = saveResult.DeliveryOrderMaster_Id_;
                    this.Delivery_Order_Master_.DONo = saveResult.DONo_;
                    this.DeliveryOrderMaster_Id_Edit = this.Delivery_Order_Master_.DeliveryOrderMaster_Id;

                    if (Printstatus == 1) {
                        this.Print_Click();
                    } else {
                        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Saved Successfully', Type: "false" } });
                    }
                    this.Sales_Print = false;
                } else {
                    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: response.message || 'Error Occured', Type: "2" } });
                    document.getElementById("Save_Button").hidden = false;
                }
            } else {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: response.message || 'Error Occured', Type: "2" } });
                document.getElementById("Save_Button").hidden = false;
            }
        },
        error: (err) => {
            document.getElementById('Save_Button').hidden = false;
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
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
Edit_Quotation_Master(Sales_Master_e:deliveryordermaster,index)
{ 
    debugger;
    this.Entry_View=true;
    this.Edit_Sales=1;
    this.Sales_Print = false;
    this.issLoading = true;

    this.Delivery_Order_Master_=Object.assign({},Sales_Master_e); 

    this.DeliveryOrderMaster_Id_Edit = Sales_Master_e.DeliveryOrderMaster_Id;
    this.Delivery_Order_Master_.LPONo1 = Sales_Master_e.LPONo1

    this.Customer_Temp.Client_Accounts_Id=Sales_Master_e.Account_Party_Id;
    this.Customer_Temp.Client_Accounts_Name=Sales_Master_e.Customer;
    this.Customer_=this.Customer_Temp;

    this.Customer_Temp.Address1 = Sales_Master_e.Address1;
    this.Customer_Temp.Address2 = Sales_Master_e.Address2;
    this.Customer_Temp.Address3 = Sales_Master_e.Address3;
    this.Customer_Temp.Address4 = Sales_Master_e.Address4;
    this.Customer_Temp.GSTNo = Sales_Master_e.GSTNo

    this.Customer_Name = this.Customer_.Client_Accounts_Name;
    this.Address1 = Sales_Master_e.Address1;
    this.Address2 = Sales_Master_e.Address2;
    this.Address3 = Sales_Master_e.Address3;
    this.Address4 = Sales_Master_e.Address4;
    this.Address4 = Sales_Master_e.Address4;
    this.Vatin = Sales_Master_e.GSTNo;


    this.SalesQuotationMaster_Id = Sales_Master_e.SalesQuotationMaster_Id


    // this.Customer_=this.Customer_Temp;
    // this.Customer_Name = this.Customer_.Client_Accounts_Name;
    this.Delivery_Order_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;

    // this.Client_Accounts_Service_.Get_Client_Accounts(this.Delivery_Order_Master_.Account_Party_Id).subscribe((result)=>{
    //     if(result!=null)
    //     {
    //         debugger
    //                 this.Customer_Temp.Client_Accounts_Id=result[0][0].Client_Accounts_Id;
    //                 this.Customer_Temp.Client_Accounts_Name=result[0][0].Client_Accounts_Name;
    //                 this.Customer_= this.Customer_Temp;
    //                 this.Delivery_Order_Master_.Customer=result[0][0].Client_Accounts_Name;
    //                 this.Delivery_Order_Master_.Customer_Name=result[0][0].Client_Accounts_Name;
    //                 this.Delivery_Order_Master_.Address1 = result[0][0].Address1;
    //                 this.Delivery_Order_Master_.Address2 = result[0][0].Address2;
    //                 this.Delivery_Order_Master_.Address3 = result[0][0].Address3;
    //                 this.Delivery_Order_Master_.Address4 = result[0][0].Address4;
    //                 this.Delivery_Order_Master_.Vatin = result[0][0].GSTNo;
                   
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
                if(Rows[0][i].Client_Accounts_Id == this.Delivery_Order_Master_.Account_Party_Id){
                    this.Customer_Temp.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                    this.Customer_Temp.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                     this.Customer_= this.Customer_Temp;

                    this.Delivery_Order_Master_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                    this.Delivery_Order_Master_.Customer=Rows[0][i].Client_Accounts_Name;
                    this.Delivery_Order_Master_.Customer_Name=Rows[0][i].Client_Accounts_Name;

                    this.Delivery_Order_Master_.Address1 = Rows[0][i].Address1;
                    this.Delivery_Order_Master_.Address2 = Rows[0][i].Address2;
                    this.Delivery_Order_Master_.Address3 = Rows[0][i].Address3;
                    this.Delivery_Order_Master_.Address4 = Rows[0][i].Address4;
                    this.Delivery_Order_Master_.Vatin = Rows[0][i].GSTNo;

                    this.Address1 = Rows[0][i].Address1;
                    this.Address2 = Rows[0][i].Address2;
                    this.Address3 = Rows[0][i].Address3;
                    this.Address4 = Rows[0][i].Address4;
                    this.Vatin = Rows[0][i].GSTNo;
                }
            }
        }},
        );

    // this.Attention_Temp.User_Details_Id = Sales_Master_e.Kind_Attend;
    // this.Attention_Temp.User_Details_Name = Sales_Master_e.UserName;
    
    // this.Attention = this.Attention_Temp;

    // debugger;

    // this.Delivery_Order_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
    // this.Quotation_Master_.Customer=this.Quotation_Master_.Customer_Name;   
    // this.Delivery_Order_Master_.DONo=this.Quotation_Master_.Bill_No;    
    //this.Quotation_Master_.GrandTotal =
   // this.Quotation_Master_.RoundOff = 0;
    // this.Tot_Amount= this.Quotation_Master_.TotalAmount;
    // this.CGST_SUM=this.Quotation_Master_.TotalCGST;
    // this.SGST_SUM=this.Quotation_Master_.ToalSGST ;
    // this.GST_Sum=this.Quotation_Master_ .TotalGST;    
    // this.Tot_Cess=this.Quotation_Master_.Cess;
    // this.Tot_Net=this.Quotation_Master_.NetTotal;
    // this.Tot_discount=this.Quotation_Master_.TotalDiscount;
    // this.Tot_Gross=this.Quotation_Master_.GrossTotal;
    //this.Amount_In_Words=this.numberToEnglish(this.Quotation_Master_.GrandTotal,'');
// for(var i=0;i<this.Bill_Type_Data.length;i++)
// {
//     if(this.Bill_Type_Data[i].Bill_Type_Id==Sales_Master_e.BillType)
//     {
//         this.Bill_Type_=this.Bill_Type_Data[i];
//     }
// }
for(var i=0;i<this.AccounttypeData.length;i++)
    {
        if(this.AccounttypeData[i].AccountType_Id==Sales_Master_e.TypeId)
        {
            this.Accounttype=this.AccounttypeData[i];
        }
    }
    for(var i=0;i<this.currencyData.length;i++)
        {
            if(this.currencyData[i].CurrencyDetails_Id==Sales_Master_e.CurrencyId)
            {
                this.Currency=this.currencyData[i];
            }
        }

    for(var i = 0; i< this.PaymentTermData.length; i++)
    {
        if(this.PaymentTermData[i].payment_Term_ID == Sales_Master_e.Payment_Term_Description)
        {
            this.paymentTerms = this.PaymentTermData[i];
        }
    }

    debugger;
    
        this.issLoading = true;
        this.Sales_Master_Service_.Get_Delivery_Order_Details(Sales_Master_e.DeliveryOrderMaster_Id)
        .pipe(finalize(() => this.issLoading = false))
        .subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.Delivery_Order_Details_Data = response.data[0];
                    this.addBlankRows();
                } else {
                    const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: response.message || 'Error Occured', Type: "2" } });
                }
            },
            error: (err) => {
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured while fetching details', Type: "2" } });
            }
        });

    
            this.Search_PurchaseOrderNumber_Typeahead('')


            // debugger;
            // this.Sales_Master_Service_.Get_Deliveryordermaster_Purchaseordermaster_Checked_InvoiceNo(Sales_Master_e.DeliveryOrderMaster_Id).subscribe
            // (Rows => { 
        
            //     debugger;
            //     if (Rows != null) {
            //         this.PurchaseOrder_Data = Rows[0];

            //         for(var i = 0; i< this.PurchaseOrder_Data.length; i++)
            //         {
            //             if (this.PurchaseOrder_Data[i].Is_Checked.toString()=='1')
            //                 this.PurchaseOrder_Data[i].Is_Checked= true;
            //         }                    
            //         }
            //            this.issLoading = false;
            //        },
            //      Rows => {
            //             this.issLoading = false;
            //        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            //     });
// this.Sales_Master_Service_.Get_Quotation_Details_forprint(Sales_Master_e.Sales_Master_Id).subscribe(Rows => 
//     {
//         this.Quotation_Details_Data1= Rows[0]
//     },
//      Rows => {
//             this.issLoading = false;
//        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//     });
/*
for(var i=0;i<this.Bill_Mode_Data.length;i++)
{
    if(this.Bill_Mode_Data[i].Bill_Mode_Id==Sales_Master_e.BillType)
    {
        this.Bill_Mode_=this.Bill_Mode_Data[i];
    }
}*/
// this.Sales_Master_Service_.Get_Quotation_Master(Sales_Master_e.Quotation_Master_Id).subscribe(Rows => { 
//     debugger; 
//     if (Rows != null) {
//         this.Quotation_Details_Data = Rows[0];
//         this.Quotation_Details_Data1 = Rows[1];
//         this.Sales_Master_Data1 = Rows[2];        
//         this.Bank_Data=Rows[3];
//         this.Bank_ = this.Bank_Data[0]
//         this.Company_ = Rows[4][0]
//         }
//            this.issLoading = false;
//        },
//      Rows => {
//             this.issLoading = false;
//        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//     });
this.issLoading = false;
}
Edit_Sales_Details(Quotation_Details_e:Quotation_Details,index)
{
    this.Quotation_Details_Index=index;
    this.Quotation_Details_=Quotation_Details_e;
    this.Stock_Temp.ItemId=Quotation_Details_e.ItemId;
    this.Stock_Temp.ItemName=Quotation_Details_e.ItemName;
    this.Stock_=Object.assign({},this.Stock_Temp);
    this.Barcode_Temp.Stock_Id=Quotation_Details_e.StockId;
    //this.Barcode_Temp.Barcode=Quotation_Details_e.Barcode;
    // this.Barcode_=Object.assign({},this.Barcode_Temp);  
    this.Edit_GST=this.Quotation_Details_.TaxAmount;
    this.Edit_Discount=this.Quotation_Details_.Discount;
    this.Edit_Net=this.Quotation_Details_.NetValue;
    this.Quotation_Details_=Object.assign({},Quotation_Details_e);
    this.Sale_Detail_Quantity=this.Quotation_Details_.Quantity;
    this.Edit_Stock_-this.Quotation_Details_.Stock;
    this.Quotation_Details_Description=this.Quotation_Details_.Description;

}

Get_Stock(): void {

    // console.log("Barcode_.Stock_Id", this.Barcode_.Stock_Id)
    // this.Sales_Master_Service_.Search_Item_Typeahead("").subscribe(Rows => {
  
    //     if (Rows != null) {
    //         this.Stock_Data_Filter = Rows[0];
    //         for(let i= 0;i< this.Stock_Data_Filter.length;i++){
    //             debugger
    //             if(this.Stock_Data_Filter[i].Stock_Id == this.Barcode_.Stock_Id){
    //                 debugger
    //                 this.Stock_ = this.Stock_Data_Filter[i]
    //                 console.log("Stock_: ",this.Stock_); 

    //                 this.UnitName = this.Stock_.UnitName
    //                 //this.SaleRate = Number(this.Stock_.SaleRate);
                    
    //             }
    //         }
    //     }
    // })
    debugger
    //this.Barcode_.ItemName=this.Item_.ItemName;
    this.Stock_Temp.ItemId=this.Barcode_.ItemId;
    this.Stock_Temp.ItemName=this.Barcode_.ItemName;
    this.Stock_=Object.assign({},this.Stock_Temp);
    this.Delivery_Order_Details_.ItemId=this.Barcode_.ItemId;
    this.Delivery_Order_Details_.ItemName=this.Barcode_.ItemName;
    this.Delivery_Order_Details_.UnitId=this.Barcode_.UnitId;
    this.Delivery_Order_Details_.UnitName=this.Barcode_.UnitName;
    this.Delivery_Order_Details_.MRP=this.Barcode_.MRP;
    this.Delivery_Order_Details_.PurchaseRate=this.Barcode_.PurchaseRate;
    this.Delivery_Order_Details_.Stock=this.Barcode_.Quantity;
    // this.Delivery_Order_Details_.UnitPrice=this.Barcode_.SaleRate;
    this.Delivery_Order_Details_.ItemName=this.Barcode_.ItemName;
    this.Delivery_Order_Details_.GroupId=this.Barcode_.GroupId;
    this.Delivery_Order_Details_.GroupName=this.Barcode_.GroupName;
    this.Delivery_Order_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
    this.Delivery_Order_Details_.HSNCODE=this.Barcode_.HSNCODE;
    this.Delivery_Order_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
    // this.Delivery_Order_Details_.StockId=this.Barcode_.Stock_Id;
    this.Delivery_Order_Details_.Sale_Tax=this.Barcode_.SaleTax;
    // this.Delivery_Order_Details_.ItemCode=this.Barcode_.Item_Code;  

    
    this.Delivery_Order_Details_.Country_Id=this.Barcode_.Country_Id;
    this.Delivery_Order_Details_.Country_Name=this.Barcode_.Country_Name;
}
Item_Name_Change(Item_sl:deliveryorderdetails){

    debugger; 
 this.Delivery_Order_Details_=Object.assign({},Item_sl);
  this.Item_Temp.Item_Code=Item_sl.Item_Code;
  this.Item_Temp.ItemId=Item_sl.ItemId;
  this.Barcode_=Object.assign({},this.Item_Temp);
 
  this.Delivery_Order_Details_.StockId=Item_sl.StockId; 
  this.Delivery_Order_Details_.Item_Code=Item_sl.Item_Code;
  this.Delivery_Order_Details_.Item_Code=Item_sl.Item_Code;
  this.Delivery_Order_Details_.ItemId=Item_sl.ItemId;
  this.Delivery_Order_Details_.Quantity=0;

}
numberToWordsIndianCurrency(amount) {
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

    // Split amount into rupees and paise
    const parts = amount.toString().split(".");
    const rupeesPart = parseInt(parts[0], 10);
    const paisePart = parts.length > 1 ? parseInt(parts[1].substring(0, 3), 10) : 0; // Only handle two decimal places

    let rupeesWord = rupeesPart > 0 ? convertToWords(rupeesPart) + " rupees" : "";
    let paiseWord = paisePart > 0 ? convertToWords(paisePart) + " paise" : "";

    if (rupeesWord && paiseWord) {
        return `${rupeesWord} and ${paiseWord}`;
    } else if (rupeesWord) {
        return rupeesWord;
    } else {
        return paiseWord;
    }
}
Load_All_Account_Type()
{
    this.currencydetails_Service_.Load_All_Account_Type('').subscribe(Rows => {
        if (Rows != null) {
            this.AccounttypeData = Rows[0];
            console.log('AccounttypeData: ', this.AccounttypeData);
            this.Accounttype_Temp.AccountType_Id = 0;
            this.Accounttype_Temp.AccountType_Name = "Select";
            this.AccounttypeData.unshift(this.Accounttype_Temp);
            this.Search_AccountType=this.AccounttypeData[0];     
            console.log('Search_AccountType: ', this.Search_AccountType);   
        }
        
    },
        Rows => {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        });
}
formatDate(dateString: string): string {
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
  isSelected(university: any): boolean 
{
	return this.selectedPONumber.some(selectedUni => selectedUni.Is_Checked === university.Is_Checked);
}
toggleSelection(university: any) {
	const index = this.selectedPONumber.findIndex(selectedUni => selectedUni.Is_Checked === university.Is_Checked);
	if (index === -1) {
	  this.selectedPONumber.push(university);
	} else {
	  this.selectedPONumber.splice(index, 1);
	}
  }
/*** Added on 17-09-2024 */
// Edit_Quotation_Detail(Delivery_Order_Details_, index){
//     console.log('Sales_Details: ', Quotation_Details);
//     this.Barcode_ = new Stock();
//     this.Stock_ = new Stock();
//     this.Barcode_.Item_Code = Delivery_Order_Details_.ItemCode;
//     this.Stock_.ItemId = Delivery_Order_Details_.ItemId;
//     this.Stock_.ItemName= Delivery_Order_Details_.ItemName ;
//     this.Stock_.UnitName = this.UnitName = Delivery_Order_Details_.UnitName 
//     this.Stock_.UnitId = Delivery_Order_Details_.UnitId;
//     this.Quantity = Delivery_Order_Details_.Quantity;
//     // this.SaleRate = Quotation_Details.UnitPrice;
//     // this.discount = Quotation_Details.Discount;
//     // this.unitDiscount = Quotation_Details.Unit_Discount;
//     this.Stock_.GroupId = Delivery_Order_Details_.GroupId;
//     this.Stock_.GroupName = Delivery_Order_Details_.GroupName;
//     this.Stock_.Stock_Id = Delivery_Order_Details_.StockId;
//     this.Stock_.HSNMasterId = Delivery_Order_Details_.HSNMasterId;
//     this.Stock_.HSNCODE = Delivery_Order_Details_.HSNCODE;
//     // this.TotalAmount = Quotation_Details.Amount;
//     // this.availablity = Quotation_Details.Availability;
//     // this.Stock_.SaleTax = Quotation_Details.Sale_Tax;

//     this.Delivery_Order_Details_Data.splice(index, 1);
  
//   }


// Edit_Quotation_Detail(Delivery_Order_Details, index){
//     this.Delivery_Order_Details_Index=index;
//     this.Delivery_Order_Details_ = Delivery_Order_Details
//     // this.Barcode_ = new Stock();
//     this.Stock_ = new Stock();
//     // this.Barcode_.Item_Code = Delivery_Order_Details.ItemCode;
//     this.Stock_.ItemId = Delivery_Order_Details.ItemId;
//     this.Stock_.ItemName= Delivery_Order_Details.ItemName ;
//     this.Stock_.UnitName = this.UnitName = Delivery_Order_Details.UnitName 
//     this.Stock_.UnitId = Delivery_Order_Details.UnitId;
//     // this.Quantity = Delivery_Order_Details.Quantity;
//     // this.SaleRate = Delivery_Order_Details.UnitPrice;
//     // this.discount = Delivery_Order_Details.Discount;
//     // this.unitDiscount = Delivery_Order_Details.Unit_Discount;
//     this.Stock_.GroupId = Delivery_Order_Details.GroupId;
//     this.Stock_.GroupName = Delivery_Order_Details.GroupName;
//     this.Stock_.Stock_Id = Delivery_Order_Details.StockId;
//     this.Stock_.HSNMasterId = Delivery_Order_Details.HSNMasterId;
//     this.Stock_.HSNCODE = Delivery_Order_Details.HSNCODE;
//     // this.TotalAmount = Delivery_Order_Details.Amount;
//     // this.availablity = Delivery_Order_Details.Availability;
//     this.Stock_.SaleTax = Delivery_Order_Details.Sale_Tax;

//     this.Delivery_Order_Details_Data.splice(index, 1);
  
//   }
Edit_Quotation_Detail(Sales_Details_e:deliveryorderdetails,index)
{   
    debugger

this.Delivery_Order_Details_Index=index;

    this.Barcode_Temp_.StockId=Sales_Details_e.StockId;
    this.Barcode_Temp_.Item_Code=Sales_Details_e.Item_Code;
    this.Barcode_=Object.assign({},this.Barcode_Temp_);

    this.Item_Temp.ItemId=Sales_Details_e.ItemId;
    this.Item_Temp.ItemName=Sales_Details_e.ItemName;
    this.Item_=Object.assign({},this.Item_Temp);
    this.Delivery_Order_Details_=Object.assign({},Sales_Details_e);
    debugger;
}
  Delete_Quotation_Detail(itemIndex){
    this.Delivery_Order_Details_Data.splice(itemIndex, 1);
    this.addBlankRows();
    // this.Final_Amounts();
  }

  /** Added on 19-09-2024 */

//   Get_Deliveryordermaster_Purchaseordermaster_Checked_InvoiceNo(DeliveryOrderMaster_Id) 

//     {
//         let LPONumber_Data = [];
         
//         this.issLoading=true;
//     this.Sales_Master_Service_.Get_Deliveryordermaster_Purchaseordermaster_Checked_InvoiceNo(DeliveryOrderMaster_Id).subscribe(Rows => 
//     {
         
//     LPONumber_Data=Rows[0];

//     for(var j=0;j<LPONumber_Data.length;j++)
//     {

//     // if (this.User_Menu_Selection_Data[j].IsView.toString()=='1')
//     // this.User_Menu_Selection_Data[j].IsView= true;  
//     // else
//     // this.User_Menu_Selection_Data[j].IsView= false;
//     // if (this.User_Menu_Selection_Data[j].IsEdit.toString()=='1')
//     // this.User_Menu_Selection_Data[j].IsEdit= true;
//     // else  
//     // this.User_Menu_Selection_Data[j].IsEdit= false; 
//     // if (this.User_Menu_Selection_Data[j].IsSave.toString()=='1')  
//     // this.User_Menu_Selection_Data[j].IsSave= true; 
//     // else
//     // this.User_Menu_Selection_Data[j].IsSave= false;
//     // if (this.User_Menu_Selection_Data[j].IsDelete.toString()=='1')
//     // this.User_Menu_Selection_Data[j].IsDelete= true;
//     // else 
//     // this.User_Menu_Selection_Data[j].IsDelete= false;
//     }
//     this.issLoading=false;
//     },
//   Rows => { 
//     this.issLoading=false;
//  const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}}); });

//     }

    isChecked(university: any): boolean 
    {
        if(university.Is_Checked == 1)
        {
            return this.selectedPONumber.some(selectedUni => selectedUni.Is_Checked === true);
        }

        else
        {
            return this.selectedPONumber.some(selectedUni => selectedUni.Is_Checked === false);
        }
    }   

    /*** Added on 14-10-2024 */

    Duplicate_Click()
{
    this.Delivery_Order_Master_.DeliveryOrderMaster_Id=0;
    // this.Delivery_Order_Master_.Account_Party_Id=0;
    // this.Customer_=null;
    // this.Address1 = null;
    // this.Address2 = null;
    // this.Address3 = null;
    // this.Address4 = null;
    // this.Vatin = null;
    this.Delivery_Order_Master_.DONo = '';
    // this.Delivery_Order_Master_.Delivery_Address1 = '';
    // this.Delivery_Order_Master_.Delivery_Address2 = '';
    // this.Delivery_Order_Master_.Delivery_Address3 = '';
    // this.Delivery_Order_Master_.Delivery_Address4 = '';
    this.SalesQuotationMaster_Id = 0;
    this.Delivery_Order_Master_.SalesQuotationMaster_Id = 0;
    this.DeliveryOrderMaster_Id_Edit = 0;
    this.DeliveryOrderMaster_Id = 0;
    this.invoice_list_view = false;
    setTimeout(() => {
        if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

}
closeInvoiceListView(){
    debugger
    this.invoice_list_view = false;
    setTimeout(() => {
        if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });


}

    New_Click()
{
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
    this.Quotation_Details_Data=[];
    this.invoice_list_view = false;
    this.Sales_Print=true;
    this.SalesQuotationMaster_Id = 0;
    this.Delivery_Order_Master_.SalesQuotationMaster_Id = 0;
    this.invoice_list_view = false;
    setTimeout(() => {
        if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

}

Create_Invoice(DeliveryOrderMaster_Id)
{
    debugger;
    localStorage.setItem('DeliveryOrderMaster_Id', DeliveryOrderMaster_Id.toString());

    this.router.navigateByUrl(`/Invoice`);
}

Show_Quotation_Click(SalesQuotationMaster_Id)
{
    
    localStorage.setItem('SalesQuotationMaster_Id', SalesQuotationMaster_Id.toString());

    this.router.navigateByUrl(`/Quotation`);
}

/*** Added on 15 -10-2024 */

Invoice_Click(){
    this.invoice_list_view = true;
        this.issLoading = true;
        this.Sales_Master_Service_.Get_Delivery_Salesmaster(this.DeliveryOrderMaster_Id_Edit).subscribe((Rows: any) => {
            this.Invoice_Data=Rows[0];    
            this.issLoading = false;
            }); 


    setTimeout(() => {
        if (this.bottomDiv2) {
          this.bottomDiv2.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
  }

/** Added on 17-10-2024 */

Load_DeliveryOrder(){
    this.Entry_View = true;
    this.issLoading = true;
    debugger;
    this.salesquotationmaster_Service_.Load_DeliveryOrder(this.DeliveryOrderMaster_Id).subscribe((result: any)=>{
        debugger;
        //this.Delivery_Order_Master_Data=result[0];
        this.SalesQuotationMaster_Id = result[0][0].SalesQuotationMaster_Id;
        this.DeliveryOrderMaster_Id = 0;
        this.Delivery_Order_Master_=new deliveryordermaster()
        this.Delivery_Order_Master_=Object.assign({},result[0][0]); 
        this.POnumber = result[0][0].LPONo;
        this.Delivery_Order_Master_.LPONo1 = result[0][0].LPONo;
        this.Sales_Print = false;
            
        this.DeliveryOrderMaster_Id_Edit = result[0][0].DeliveryOrderMaster_Id;

         this.Customer_Temp.Client_Accounts_Id=this.Delivery_Order_Master_.Account_Party_Id;
         this.Customer_Temp.Client_Accounts_Name=this.Delivery_Order_Master_.Customer;
         this.Customer_=this.Customer_Temp;
         this.Delivery_Order_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
         this.Delivery_Order_Master_.Customer=this.Delivery_Order_Master_.Customer_Name; 
           
        // this.Client_Accounts_Service_.Get_Client_Accounts(this.Delivery_Order_Master_.Account_Party_Id).subscribe((result)=>{
        //     if(result!=null)
        //     {
        //         debugger
        //                 this.Customer_Temp.Client_Accounts_Id=result[0][0].Client_Accounts_Id;
        //                 this.Customer_Temp.Client_Accounts_Name=result[0][0].Client_Accounts_Name;
        //                 this.Customer_= this.Customer_Temp;

        //                 this.Delivery_Order_Master_.Address1 = result[0][0].Address1;
        //                 this.Delivery_Order_Master_.Address2 = result[0][0].Address2;
        //                 this.Delivery_Order_Master_.Address3 = result[0][0].Address3;
        //                 this.Delivery_Order_Master_.Address4 = result[0][0].Address4;
        //                 this.Delivery_Order_Master_.Vatin = result[0][0].GSTNo;
                       
        //                 this.Address1 = result[0][0].Address1;
        //                 this.Address2 = result[0][0].Address2;
        //                 this.Address3 = result[0][0].Address3;
        //                 this.Address4 = result[0][0].Address4;
        //                 this.Vatin = result[0][0].GSTNo;
        //     }
        // });

this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39','').subscribe(Rows => {     
    if (Rows != null) {
        debugger;
        this.Customer_Data = Rows[0];
        for (var i = 0; i < Rows[0].length; i++) {
            if (Rows[0][i].Client_Accounts_Id == result[0][0].Account_Party_Id) {
                this.Customer_ = Rows[0][i];
                this.Customer_.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                this.Customer_.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                this.Customer_Name = Rows[0][i].Client_Accounts_Name;   

                this.Delivery_Order_Master_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                this.Delivery_Order_Master_.Customer=Rows[0][i].Client_Accounts_Name;
                this.Delivery_Order_Master_.Customer_Name=Rows[0][i].Client_Accounts_Name;

                this.Delivery_Order_Master_.Address1 = Rows[0][i].Address1;
                this.Delivery_Order_Master_.Address2 = Rows[0][i].Address2;
                this.Delivery_Order_Master_.Address3 = Rows[0][i].Address3;
                this.Delivery_Order_Master_.Address4 = Rows[0][i].Address4;
                this.Delivery_Order_Master_.Vatin = Rows[0][i].GSTNo;

                this.Address1 = Rows[0][i].Address1;
                this.Address2 =Rows[0][i].Address2;
                this.Address3 = Rows[0][i].Address3;
                this.Address4 = Rows[0][i].Address4;
                this.Vatin = Rows[0][i].GSTNo;
            }
        }
    }
});

this.issLoading = true;
this.Sales_Master_Service_.Get_Delivery_Order_Details(result[0][0].DeliveryOrderMaster_Id)
.pipe(finalize(() => this.issLoading = false))
.subscribe({
    next: (response) => {
        if (response.success && response.data) {
            this.Delivery_Order_Details_Data = response.data[0];
            this.addBlankRows();
        } else {
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: response.message || 'Error Occured', Type: "2" } });
        }
    },
    error: (err) => {
        const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured while fetching details', Type: "2" } });
    }
});

        if(this.currencyData==undefined || this.currencyData==null)
            {
                this.currencydetails_Service_.Load_currencydetails().subscribe(Rows => {
                    if (Rows != null) {
                        this.currencyData = Rows[0];
                        this.Currency_Temp.CurrencyDetails_Id = 0;
                        this.Currency_Temp.CurrecnyName = "Select";
                        this.currencyData.unshift(this.Currency_Temp);
                        this.Currency = this.currencyData[0];                            
                    for (var i = 0; i < this.currencyData.length; i++) {
                        if (this.currencyData[i].CurrencyDetails_Id == this.Delivery_Order_Master_.CurrencyId) {
                            this.Currency = this.currencyData[i];
                        }
                    }     
                }
                })
            }
            else{
            for (var i = 0; i < this.currencyData.length; i++) {
                if (this.currencyData[i].CurrencyDetails_Id == this.Delivery_Order_Master_.CurrencyId) {
                    this.Currency = this.currencyData[i];                    
                }
            }                  
        }
        if(this.AccounttypeData == undefined || this.AccounttypeData==null)
        {
            this.User_Details_Service_.Load_InvoiceType2().subscribe(Rows => {
                if (Rows != null) {
                this.AccounttypeData = Rows[0];        
                this.Accounttype_Temp.AccountType_Id = 0;
                this.Accounttype_Temp.AccountType_Name = "Select";
                this.AccounttypeData.unshift(this.Accounttype_Temp);
                this.Accounttype = this.AccounttypeData[0];                       
              
                for(var i = 0; i< this.AccounttypeData.length;i++)
                    {
                        if(this.AccounttypeData[i].AccountType_Id == this.Delivery_Order_Master_.TypeId)
                        {
                            this.Accounttype = this.AccounttypeData[i];
                        }
                    }
                }
            });
        }
        else
            {
            for(var i = 0; i< this.AccounttypeData.length;i++)
            {
                if(this.AccounttypeData[i].AccountType_Id == this.Delivery_Order_Master_.TypeId)
                {
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
                    this.paymentTerms = this.PaymentTermData[0];
                    for(var i = 0; i< this.PaymentTermData.length; i++)
                        {
                            if(this.PaymentTermData[i].payment_Term_ID == this.Delivery_Order_Master_.Payment_Term_Description)
                            {
                                this.paymentTerms = this.PaymentTermData[i];
                            }
                        }
                }
            })
        }
        else{
        for(var i = 0; i< this.PaymentTermData.length; i++)
            {
                if(this.PaymentTermData[i].payment_Term_ID == this.Delivery_Order_Master_.Payment_Term_Description)
                {
                    this.paymentTerms = this.PaymentTermData[i];
                }
            }
        } 
            // this.purchaseordermaster_Service_.Search_PurchaseOrderNumber_DeliveryOrderMaster_Typeahead('',result[0][0].DeliveryOrderMaster_Id).subscribe(Rows => {     
            // if (Rows != null) {
            //     debugger;
            //     this.PurchaseOrder_Data = Rows[0];
            //     console.log('this.PurchaseOrder_Data :',this.PurchaseOrder_Data)

            //     for(var i = 0; i< this.PurchaseOrder_Data.length; i++)
            //         {
            //             console.log('this.PurchaseOrder_Data[',i,'].Is_Checked : ',this.PurchaseOrder_Data[i].Is_Checked)
            //             if (this.PurchaseOrder_Data[i].Is_Checked.toString()=='1')
            //                 this.PurchaseOrder_Data[i].Is_Checked= true;
            //             else
            //              this.PurchaseOrder_Data[i].Is_Checked = false;
            //         } 
                 

            //         this.renderer.selectRootElement(this.myInput.nativeElement).click();


            //         debugger  
            // }
            // this.issLoading = false;
            // },
            // Rows => {
             
            // this.issLoading = false;
            //     const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
            // });       
    })
    this.isLoading=false;
}
    
Edit_Delivery_Salesmaster(Sales_Master_Id)
{
  localStorage.setItem('Sales_Master_Id', Sales_Master_Id.toString());
  this.router.navigateByUrl(`/Invoice`); 
}

// Export() {
//     this.Sales_Master_Service_.exportExcel(this.Quotation_Master_Data,"Delivery Order" );
//   }

  Export() {
    const filteredData = this.Quotation_Master_Data.map((receipt: any, index: number) => {
        return {
            No: index + 1,                  
            CustomerName: receipt["Customer"],
            DONo: receipt["QuotationNo"],
            Date: receipt["FormattedEntryDate"],
        };
    });

    this.Sales_Master_Service_.exportExcel(filteredData,"Delivery Order" );


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

                this.Delivery_Order_Details_.ItemId=this.Item_.ItemId;
                this.Delivery_Order_Details_.ItemName=this.Item_.ItemName;
                this.Delivery_Order_Details_.UnitId=this.Item_.UnitId;
                this.Delivery_Order_Details_.UnitName=this.Item_.UnitName;
                this.Delivery_Order_Details_.MRP=this.Item_.MRP;
                this.Delivery_Order_Details_.PurchaseRate=this.Item_.PurchaseRate;
                this.Delivery_Order_Details_.Stock=this.Item_.Quantity;
                // this.Delivery_Order_Details_.UnitPrice=this.Item_.SaleRate;
                this.Delivery_Order_Details_.ItemName=this.Item_.ItemName;
                this.Delivery_Order_Details_.GroupId=this.Item_.GroupId;
                this.Delivery_Order_Details_.GroupName=this.Item_.GroupName;
                this.Delivery_Order_Details_.HSNMasterId=this.Item_.HSNMasterId;
                this.Delivery_Order_Details_.HSNCODE=this.Item_.HSNCODE;
                this.Delivery_Order_Details_.HSNMasterId=this.Item_.HSNMasterId;
                this.Delivery_Order_Details_.Item_Code=this.Item_.Item_Code; 
            }
    }
}

// addBlankRows(): void {

//     let cellThr: number = 0;
//     let cellThr1: number = 0;
//     let nosOfBlankRows: number = 0;




//     let tempht1: number = 0;
//     let tempht2: number = 0;

//     debugger



//     this.cdr.detectChanges();

//     this.Delivery_Order_Details_Data.forEach((_, index) => {
//       const cellId = `cell${index + 1}`;
//       const cell = document.getElementById(cellId);

//       if (cell) {
//         debugger

//                     if(this. Delivery_Order_Details_Data[index].ItemName.length )
//           var alenght=  this. Delivery_Order_Details_Data[index].ItemName.length % 39;

//         console.log('this. Delivery_Order_Details_Data[index].ItemName.length: ', this. Delivery_Order_Details_Data[index].ItemName.length);
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
//             nosOfBlankRows = (310 - cellThr1) /7;
//         }
//         else {
//             cellThr1 = cellThr1 - 320;
//             console.log('cellThr1 - a: ', cellThr1);
//             cellThr1 = cellThr1 % 1250;                    //1471 excel master,2371 -perfect hills
//             console.log('cellThr1 = cellThr1 % b: ', cellThr1);
//             cellThr1 = 1290- cellThr1           
//             console.log('cellThr1 = c - cellThr1: ', cellThr1);
//             nosOfBlankRows = (cellThr1) / 8;
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

            console.clear();
            
    this.marginTopItemNameCount = false;
    this.Delivery_Order_Details_Data.forEach((_, index) => {
      const cellId = `cell${index + 1}`;
      const cell = document.getElementById(cellId);

      if (cell) {
        // Example: Apply a style or perform an action
        debugger

        tempht1 = cell ? cell.offsetHeight : 0 ;
         tempht1 -= 50;


        //  console.clear();            
       //  console.log("***********************************");
       //  console.log('index: ', index);
       // console.log('tempht1 first: ', tempht1);
      //  console.log('this.Delivery_Order_Details_Data[index].ItemName.length: ', this.Delivery_Order_Details_Data[index].ItemName.length);

        
        
        if(this.Delivery_Order_Details_Data[index].ItemName.length > 125)
        {
            this.marginTopItemNameCount = true;
        }

   // console.log('this.marginTopItemNameCount: ', this.marginTopItemNameCount);




        // if(this. Quotation_Details_Data[index].ItemName.length )
        // var alenght=  this. Quotation_Details_Data[index].ItemName.length % (100-this.Quotation_Details_Data[index].ItemName.length);

        // console.log('this. Quotation_Details_Data[index].ItemName.length: ', this. Quotation_Details_Data[index].ItemName.length);
        // console.log('alenght: ', alenght);

        // if(tempht1==41 && alenght>1)
        //     tempht1=tempht1 + 10 *alenght%100;

        

        // console.log('tempht1 second: ', tempht1);

        let blank = 0;

         cellThr += tempht1;


        // console.log('cellThr: ', cellThr);


         if(cellThr1 > 0) cellThr1 = 0;
         
         cellThr1 = cellThr;

       //  console.log('cellThr1: ', cellThr1);

         if (cellThr1 < 1600 && this.Delivery_Order_Details_Data.length < 27 ) {   
            this.breakPage = false;                          //350
            nosOfBlankRows = (1100 - cellThr1) / 15;
            if(nosOfBlankRows < 2) nosOfBlankRows +=2;
            // if(nosOfBlankRows > 25) nosOfBlankRows = 24;
        }
        else {
            // blank = blank + 2
            this.breakPage = true;
            if(cellThr1 < 1600){cellThr1 = cellThr1 + (1600-cellThr1)}
            cellThr1 = cellThr1 - 1610;
           //console.log('cellThr1 - a: ', cellThr1);
            cellThr1 = cellThr1 % 1990;                    
           // console.log('cellThr1 = cellThr1 % b: ', cellThr1);
            cellThr1 = 2000- cellThr1           
            //console.log('cellThr1 = c - cellThr1: ', cellThr1);
            nosOfBlankRows = (cellThr1) / 9;
            //console.log('nosOfBlankRows = (cellThr1) / 8: ', nosOfBlankRows);

            // if(nosOfBlankRows > 100) nosOfBlankRows = 100;
            // nosOfBlankRows = blank + nosOfBlankRows;
            // console.log('nosOfBlankRows = blank + nosOfBlankRows;: ', nosOfBlankRows);
        }  
        
        //console.log('nosOfBlankRows: ', nosOfBlankRows);


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