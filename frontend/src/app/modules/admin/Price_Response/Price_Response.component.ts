import { ChangeDetectorRef,Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, Renderer2, NgZone, Input, Pipe, PipeTransform, QueryList, ViewChildren  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { Client_Accounts } from '../../../models/Client_Accounts';
import { User_Details_Service } from '../../../services/User_Details.Service';
// import { Sales_Master_Service } from '../../../services/Sales_Master.service';
import { currencydetails_Service } from '../../../services/currencydetails.Service';
import { purchaseordermaster_Service } from '../../../services/purchaseordermaster.Service';
import { Employee_Details_Service } from '../../../services/Employee_Details.Service';
import { Client_Accounts_Service } from '../../../services/Client_Accounts.Service';
import { Stock_Service } from '../../../services/Stock.Service';
import { Item_Group_Service } from '../../../services/Item_Group.Service';
import { payment_term_Service } from '../../../services/payment_term.Service';
import { Brand_Service } from '../../../services/Brand.Service';
import { Model_Service } from '../../../services/Model.Service';
import { Price_Response_Master } from '../../../models/Price_Response_Master';
import { Price_Response_Details } from '../../../models/Price_Response_Details';
import { Price_Response_Service } from '../../../services/Price_Response.Service';
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Company } from '../../../models/Company';
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
import { Sales_Master_Service } from '../../../services/Sales_Master.Service';
import { Requirement_Master_Service } from '../../../services/Requirement_Master.Service';
import { RequirementWorkflowService } from '../../../services/RequirementWorkflow.Service';
import { Item_Service } from '../../../services/Item.Service';
import { CommonModule } from '@angular/common';
import { DecimalPipe } from '@angular/common';
import { WorkDocs } from 'aws-sdk';
// import { ConsoleReporter } from 'jasmine';
const moment = _rollupMoment || _moment;



export const MY_FORMATS = {
    parse: {    dateInput: 'DD/MM/YYYY',    },
    display: {
    dateInput: 'DD/MM/YYYY',monthYearLabel: 'MMM YYYY',dateA11yLabel: 'DD/MM/YYYY',monthYearA11yLabel: 'MMMM YYYY',
    },
    };

    
@Component({
selector: 'app-Price_Response',
templateUrl: './Price_Response.component.html',
styleUrls: ['./Price_Response.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})

export class Price_ResponseComponent implements OnInit, AfterViewInit  {
    ngAfterViewInit() {}
    @ViewChild('Barcode_n', { read: Input, static: true }) inputEl: ElementRef;
    @ViewChild('bottomDiv', { static: false }) bottomDiv: ElementRef;
    @ViewChild('bottomDiv1', { static: false }) bottomDiv1: ElementRef;
    @ViewChild('bottomDiv2', { static: false }) bottomDiv2: ElementRef;
    @ViewChild('bottomDiv3', { static: false }) bottomDiv3: ElementRef;
    @ViewChild('bottomDiv4', { static: false }) bottomDiv4: ElementRef;
    @ViewChild('bottomDiv5', { static: false }) bottomDiv5: ElementRef;
    @ViewChild('bottomDiv6', { static: false }) bottomDiv6: ElementRef;
    @ViewChild('bottomDiv7', { static: false }) bottomDiv7: ElementRef;
    @ViewChild('bottomDiv8', { static: false }) bottomDiv8: ElementRef;
    @ViewChild('topDiv', { static: false }) topDiv: ElementRef;
    @ViewChild('topDiv1', { static: false }) topDiv1: ElementRef;
    @ViewChildren('cell') cells: QueryList<ElementRef>;
  @HostListener('document:keydown', ['$event']) 
  handleKeyboardEvent(event: KeyboardEvent) { ;
      if(event.key=='F2')
    this.Save_Price_Response(1);
  }
  Price_Response_Master_Data:Price_Response_Master[]
Price_Response_Master_:Price_Response_Master= new Price_Response_Master();
Price_Response_Details_Data:Price_Response_Details[]
Price_Response_Details_:Price_Response_Details= new Price_Response_Details();
Price_Response_Details_Temp_ : Price_Response_Details = new Price_Response_Details();
Item_ :Price_Response_Details = new Price_Response_Details();
Item_Temp:Price_Response_Details= new Price_Response_Details();
Barcode_:Price_Response_Details= new Price_Response_Details();

Barcode_Temp_:Price_Response_Details= new Price_Response_Details();

Bill_Type_Data:Bill_Type[]
Bill_Type_:Bill_Type= new Bill_Type();
Bill_Type_Temp:Bill_Type= new Bill_Type();
Bill_Type_Search:Bill_Type= new Bill_Type();
Item_Group_Search:Item_Group = new Item_Group();
Currency_Search:currencydetails = new currencydetails();

currency: currencydetails = new currencydetails();
currencyData: currencydetails[];
Currency_Temp: currencydetails = new currencydetails();

Employee_Search:User_Details = new User_Details();
Payment_Term:payment_term = new payment_term();
Payment_Term_Data: payment_term[];
Payment_Term_Temp: payment_term = new payment_term();
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
BrandData: any[] = [];
ModelData: any[] = [];
Stock_:Stock= new Stock();
Stock_Temp:Stock= new Stock();
Barcode_Temp:Stock= new Stock();
Search_FromDate=new Date().toString();
myDate:Date=new Date();
Search_ToDate=new Date().toString();
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
Price_Response_Details_Index:number=-1;
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
Price_Response_Details_Description:string;
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
Price_Response_Master_Index:number=0;
Sale_Permission_Edit:boolean= false;
Sale_Permission_Edit_Temp:boolean= false;
Company_: Company = new Company();
Company_Temp: Company = new Company();
Company_Data: Company [];
Bank_Data:Client_Accounts[]
Bank_:Client_Accounts= new Client_Accounts();
Customer_Name:string="";
Sales_Master_Data1:[];UnitName="";Quantity=0;SaleRate=0;discount=0;unitDiscount=0;TotalAmount=0;availablity='';Discount_Description=0;subTotal=0;POnumber;QuotNo;partNo;
Sales_Master_1:Price_Response_Master= new Price_Response_Master();
Address1 ='';Address2 ='';Address3 ='';Address4 ='';Attention;totalAmount=0;Total=0;totalDiscount=0;amount1=0;amount2=0;amount3=0;
proformaListView = false;performainvoice_Data=[];invoiceListView = false;
Sales_Master_Data=[];doListView = false;DO_Data=[];poListView=false;Purchase_Orderdetails_Data=[];
packingListView = false;packinglist_details_Data=[];performaPendingView=false;performaPendingData=[];invoicePendingView = false;invoicePendingData=[];deliveryPendingView = false;
deliveryPendingData=[];purchasePendingView=false;purchasePendingData=[];printLetterhead:boolean = false;
/*** Added on 15-10-2024 */
Price_Response_Master_Id: number = 0;
itemGroupData: Item_Group[];
itemGroup: Item_Group = new Item_Group();
itemGroup_Temp: Item_Group = new Item_Group();
EmployeeData: User_Details[];
Employee: User_Details = new User_Details();
Employee_Temp: User_Details = new User_Details();
/** Added on 16-10-2024 */
Price_Response_Master_Id_Edit: number;
/*** Added on 17-10-2024 */
packingListPendingView: Boolean;
/*** Added on 18-10-2024 */
PaymentTermData: payment_term[];
/** Added on 19-10-2024 */
packinglistPendingData=[];
/** Added on 24-10-2024 */
Default_Vat_Percentage: number;

// UI-only field (not persisted by backend SP)
ProfitOptions: Array<{ label: string; value: number }> = [
    { label: '0%', value: 0 },
    { label: '5%', value: 5 },
    { label: '10%', value: 10 },
    { label: '15%', value: 15 },
    { label: '20%', value: 20 },
];
Profit: number = 0;

/*** Added on 26-10-2024 */
CurrecnyName: string;
/*** Added on 06-11-2024 */
Vatin = '';
/*** Added on 07-11-2024 */
addDiscCheck = 0;
/*** Added on 12-11-2024 */
printChargeAmount1: boolean = false;
printChargeAmount2: boolean = false;
printAcknowledgeChargeAmount1: boolean = false;
printAcknowledgeChargeAmount2: boolean = false;
printAcknowledgeCharge1per: boolean = false;
printAcknowledgeVAT_Amount: boolean = false;
printAcknowledgeDiscount_Description:boolean = false;
printAcknowledgeAdditional_Discount: boolean = false;
printAcknowledgeRoundoff_Amt: boolean = false;
printAcknowledgeTotalDiscount:boolean = false;
Payment_Term_Description: string = '';
blankItems: number[] = [];
marginTopItemNameCount : boolean = false;
breakPage: boolean = false;
RequirementMaster_Id: number = 0;
cameFromRequirement: boolean = false;
constructor(public Price_Response_Service_: Price_Response_Service, public Sales_Master_Service_: Sales_Master_Service, public currencydetails_Service_: currencydetails_Service, public User_Details_Service_: User_Details_Service, private route: ActivatedRoute, private router: Router, public dialogBox: MatDialog
        , private el: ElementRef, private zone: NgZone, private renderer: Renderer2, public purchaseordermaster_Service_: purchaseordermaster_Service, public Employee_Details_Service_: Employee_Details_Service, public Stock_Service_: Stock_Service,
        public Item_Group_Service_: Item_Group_Service, public payment_term_Service_: payment_term_Service, public Client_Accounts_Service_:Client_Accounts_Service,
        private cdr: ChangeDetectorRef,
        public Requirement_Master_Service_: Requirement_Master_Service,
        public RequirementWorkflowService_: RequirementWorkflowService,
        public Item_Service_: Item_Service,
        public Brand_Service_: Brand_Service,
        public Model_Service_: Model_Service
    ) { 
        this.Load_Bill_Type();       
        this.Load_Currency();
        this.Load_Item_Group();
        this.Load_Payment_Term();
        
        this.Load_Company() ;
        this.Load_Vat_Percentage();        
    }

    compareCurrency(c1: any, c2: any): boolean {
        return c1 && c2 ? c1.CurrencyDetails_Id === c2.CurrencyDetails_Id : c1 === c2;
    }
    comparePaymentTerm(p1: any, p2: any): boolean {
        return p1 && p2 ? p1.payment_Term_ID === p2.payment_Term_ID : p1 === p2;
    }
    ngOnInit() 
{
    debugger;
    this.User_Type=(localStorage.getItem('User_Type'));
    this.User_Type_Id=Number(localStorage.getItem('User_Type_Id'));
    this.Login_User_Id=localStorage.getItem('Login_User');
    this.Employee_Name=localStorage.getItem('Employee_Name');
    this.Employee_Id=Number(localStorage.getItem('Employee_Id'));
    this.Price_Response_Master_Id = Number(localStorage.getItem('Price_Response_Master_Id'));
    localStorage.removeItem('Price_Response_Master_Id');
    this.Permissions = Get_Page_Permission(95);
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
    this.Price_Response_Master_.EntryDate=new Date("dd-MMM-yyyy").toString();
    this.Search_FromDate=this.formatDate(this.Search_FromDate);
    this.Search_ToDate=this.formatDate(this.Search_ToDate);
    this.Clr_Sales_Master();
    this.Clr_Sales_Details();
    this.Sales_Print=true;
    this.Entry_View=false;
    this.Load_Brand_Dropdown();
    this.Load_Model_Dropdown();

    // Check if navigated from Requirement module
    const reqData = localStorage.getItem('Requirement_For_PriceRequest');
    if (reqData) {
        try {
            const parsed = JSON.parse(reqData);
            this.RequirementMaster_Id = Number(parsed.RequirementMaster_Id || 0);
            const pendingItem = parsed.PendingItem;

            if (this.RequirementMaster_Id > 0) {
                this.cameFromRequirement = true;
                this.Entry_View = true;
                this.Edit_Sales = 0;
                this.Sales_Print = true;
                this.issLoading = true;
                this.Load_Next_Price_Request_No();
                
                // Load Requirement Master to autofill Customer, Currency, etc.
                this.Requirement_Master_Service_.Load_RequirementMaster(this.RequirementMaster_Id).subscribe(result => {
                    const master = (result && result[0] && result[0][0]) ? result[0][0] : null;
                    if (master) {
                        this.Customer_ = { 
                            Client_Accounts_Id: master.Account_Party_Id, 
                            Client_Accounts_Name: master.Client_Accounts_Name || master.Customer
                        } as any;
                        this.currency = { 
                            CurrencyDetails_Id: master.CurrencyDetails_Id, 
                            CurrecnyName: master.CurrecnyName 
                        } as any;

                        // Map master fields
                        this.Price_Response_Master_.Account_Party_Id = master.Account_Party_Id;
                        this.Price_Response_Master_.Supplier_Id = master.Account_Party_Id;
                        this.Price_Response_Master_.Address1 = master.Address1;
                        this.Price_Response_Master_.Address2 = master.Address2;
                        this.Price_Response_Master_.Address3 = master.Address3;
                        this.Price_Response_Master_.Address4 = master.Address4;

                        this.Address1 = master.Address1;
                        this.Address2 = master.Address2;
                        this.Address3 = master.Address3;
                        this.Address4 = master.Address4;
                        this.Attention = { User_Details_Name: master.KindAttend } as any;
                        this.Employee = { User_Details_Name: master.AttendEmployee } as any;

                        this.Price_Response_Master_.Vatin = master.GSTNo || master.Vatin;
                        this.Price_Response_Master_.Reference = master.RequirementNo;
                        this.Price_Response_Master_.Description1 = master.Description1;
                        this.Price_Response_Master_.Description2 = master.RequirementNo; // Showing Req No in Reference field
                        this.Price_Response_Master_.AttendEmployee = master.AttendEmployee;
                        this.Price_Response_Master_.KindAttend = master.KindAttend;
                        this.Price_Response_Master_.POnumber = master.POnumber;
                        this.Price_Response_Master_.Supplier_Ref_No = master.Supplier_Ref_No;

                        if (master.CurrencyDetails_Id > 0 && this.currencyData) {
                            this.currency = this.currencyData.find(c => c.CurrencyDetails_Id == master.CurrencyDetails_Id);
                        }
                        this.Price_Response_Master_.PriceBasis = master.PriceBasis;
                        if (master.Payment_Term_Description > 0 || master.PaymentTerms) {
                            this.Payment_Term = {
                                payment_Term_ID: master.Payment_Term_Description,
                                Payment_Term_Description: master.PaymentTerms
                            } as any;
                            if (this.PaymentTermData && master.Payment_Term_Description > 0) {
                                const found = this.PaymentTermData.find(p => p.payment_Term_ID == master.Payment_Term_Description);
                                if (found) this.Payment_Term = found;
                            }
                        }
                        this.Price_Response_Master_.Delivery = master.Delivery;
                        this.Price_Response_Master_.Validity = master.Validity;
                        this.Price_Response_Master_.PreparedBy = master.PreparedBy;
                        this.Price_Response_Master_.Charge1 = master.Charge1;
                        this.Price_Response_Master_.charge1_Amount = master.charge1_Amount;
                        this.Price_Response_Master_.Charge2 = master.Charge2;
                        this.Price_Response_Master_.charge2_Amount = master.charge2_Amount;
                        this.Price_Response_Master_.Additional_Discount = master.Additional_Discount;
                        this.Price_Response_Master_.Discount_Description = master.Discount_Description;
                        this.Price_Response_Master_.Amount_In_Words = master.Amount_In_Words;
                    }
                    
                    if (pendingItem) {
                        this.Price_Response_Details_Data = [Object.assign({}, pendingItem)];
                        this.Final_Amounts();
                        this.issLoading = false;
                    } else {
                        // Load all details if no specific pending item
                        this.Requirement_Master_Service_.Get_Requirement_Details(this.RequirementMaster_Id).subscribe(detailsResult => {
                            const details = (detailsResult && detailsResult[0]) ? detailsResult[0] : [];
                            this.Price_Response_Details_Data = details.map(item => ({
                                ItemId: item.ItemId,
                                ItemName: item.ItemName,
                                Item_Code: item.Part_No || item.Item_Code,
                                Quantity: item.Quantity,
                                UnitPrice: item.UnitPrice,
                                UnitId: item.UnitId,
                                UnitName: item.UnitName,
                                Description: item.Description,
                                Discount: item.Discount || 0,
                                Amount: item.Amount,
                                TaxAmount: item.TaxAmount || 0,
                                HSNCODE: item.HSNCODE
                            }));
                            this.Final_Amounts();
                            this.issLoading = false;
                        }, _err => { this.issLoading = false; });
                    }
                }, _err => { this.issLoading = false; });
                
                localStorage.removeItem('Requirement_For_PriceRequest');
                return;
            }
        } catch(e) { 
            console.error('Error parsing Requirement_For_PriceRequest', e);
            this.RequirementMaster_Id = 0; 
            this.issLoading = false;
        }
        localStorage.removeItem('Requirement_For_PriceRequest');
    }

    if(this.Price_Response_Master_Id >0)
    {
        this.Entry_View=true;
        this.Edit_Sales=1;
        this.Sales_Print = false;
        debugger;
        this.Load_Price_Response_Master();
    }
    else {
        this.Search_Price_Response();
    }
    //this.myDate=new Date();
}

Load_Next_Price_Request_No() {
    // Only for new document; do not override while editing an existing Price Request
    if (this.Price_Response_Master_ && Number(this.Price_Response_Master_.Price_Response_Master_Id || 0) > 0) return;

    const dateParam = this.Price_Response_Master_ && this.Price_Response_Master_.EntryDate
        ? moment(this.Price_Response_Master_.EntryDate).format('YYYY-MM-DD')
        : moment(new Date()).format('YYYY-MM-DD');

    this.Price_Response_Service_.Get_Next_Price_Response_No(dateParam).subscribe({
        next: (response: any) => {
            let nextNo = 0;
            if (response) {
                if (response.success && response.data) {
                    const rows = response.data;
                    nextNo = rows && rows[0] ? Number(rows[0].NextNo || 0) : 0;
                } else if (Array.isArray(response)) {
                    const firstEl = response[0];
                    if (Array.isArray(firstEl) && firstEl[0]) {
                        nextNo = Number(firstEl[0].NextNo || 0);
                    } else if (firstEl) {
                        nextNo = Number(firstEl.NextNo || 0);
                    }
                }
            }
            if (nextNo > 0) {
                this.Price_Response_Master_.Price_RequestNo = String(nextNo);
            }
        },
        error: () => { }
    });
}
Load_Company() 
    {   
    this.Sales_Master_Service_.Load_Company().subscribe(Rows => {    
    if (Rows != null) {
    const companyRows = Array.isArray(Rows) && Array.isArray(Rows[0]) ? Rows[0] : [];
    const bankRows = Array.isArray(Rows) && Array.isArray(Rows[1]) ? Rows[1] : [];
    this.Print_Company_ = companyRows.length > 0 ? companyRows[0] : new Company();
    this.Company_ = companyRows.length > 0 ? companyRows[0] : new Company();
    this.Bank_ = bankRows;
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
            if (Rows != null) {
                const rawData = (Rows && (Rows as any).data) ? (Rows as any).data : Rows;
                this.currencyData = Array.isArray(rawData) && Array.isArray(rawData[0]) ? rawData[0] : (Array.isArray(rawData) ? rawData : []);
                this.Currency_Temp.CurrencyDetails_Id = 0;
                this.Currency_Temp.CurrecnyName = "Select";
                this.currencyData.unshift(this.Currency_Temp);
                this.currency = this.currencyData[0];
                this.Currency_Search = this.currencyData[0];
            }
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
                const rawData = (Rows && (Rows as any).data) ? (Rows as any).data : Rows;
                this.itemGroupData = Array.isArray(rawData) && Array.isArray(rawData[0]) ? rawData[0] : (Array.isArray(rawData) ? rawData : []);
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
    // Load_Employees() {
    //         this.User_Details_Service_.Search_User_Details('',this.User_Type,this.Login_User_Id).subscribe(Rows => {
    //             if (Rows != null) {
    //                 this.EmployeeData = Rows[0];
    //                 this.Employee_Temp.User_Details_Id = 0;
    //                 this.Employee_Temp.User_Details_Name = "Select";
    //                 this.EmployeeData.unshift(this.Employee_Temp);
    //                 this.Employee_Search = this.EmployeeData[0];
    
    //             }
    //             this.issLoading = false;
    //         },
    //             Rows => {
    //                 this.issLoading = false;
    //                 const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
    //             });
    // }
    Load_Payment_Term() {
        this.payment_term_Service_.Load_Payment_Term().subscribe(Rows => {
            if (Rows != null) {
                const rawData = (Rows && (Rows as any).data) ? (Rows as any).data : Rows;
                this.PaymentTermData = Array.isArray(rawData) && Array.isArray(rawData[0]) ? rawData[0] : (Array.isArray(rawData) ? rawData : []);
                this.Payment_Term_Temp.payment_Term_ID = 0;
                this.Payment_Term_Temp.Payment_Term_Description = "Select";
                this.PaymentTermData.unshift(this.Payment_Term_Temp);
                this.Payment_Term = this.PaymentTermData[0];
            }
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
    this.Price_Response_Details_Data=[];
    this.CGST_SUM=0;
    this.SGST_SUM=0;
    this.GST_Sum=0;
    this.Tot_discount=0;
    this.Tot_Cess=0;
    this.Tot_Amount=0;
    this.Tot_Net=0;
    this.Tot_Gross=0;
    this.proformaListView = false;
    this.doListView = false;
    this.poListView = false;
    this.invoiceListView = false;
    this.packingListView = false;
    this.performaPendingView = false;
    this.invoicePendingView = false;
    this.deliveryPendingView = false;
    this.purchasePendingView = false;
    this.packingListPendingView = false;
    this.Load_Next_Price_Request_No();
}

Close_Click()
{
    if (this.cameFromRequirement) {
        this.cameFromRequirement = false;
        this.router.navigateByUrl('/Requirement');
        return;
    }
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
    this.Price_Response_Details_Data=[];
    this.proformaListView = false;
    this.doListView = false;
    this.poListView = false;
    this.invoiceListView = false;
    this.packingListView = false;
    this.performaPendingView = false;
    this.invoicePendingView = false;
    this.deliveryPendingView = false;
    this.purchasePendingView = false;
    this.packingListPendingView = false;
    this.Search_Price_Response();
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
    this.printAcknowledgeCharge1per = false;
    this.printAcknowledgeChargeAmount1 = false;
    this.printAcknowledgeChargeAmount2 = false;
    this.printAcknowledgeVAT_Amount = false;
    this.printAcknowledgeDiscount_Description = false;
    this.printAcknowledgeAdditional_Discount = false;
    this.printAcknowledgeRoundoff_Amt = false;
    this.printAcknowledgeTotalDiscount=false;
    debugger;
    if(this.Price_Response_Master_.Charge1per != '')
        if(this.Price_Response_Master_.Charge1per != null )
           if(this.Price_Response_Master_.Charge1per != undefined )
           if(this.Price_Response_Master_.Charge1per.toString() != '0')
            if(this.Price_Response_Master_.Charge1per.toString() != 'null')
                    if(this.Price_Response_Master_.Charge1per.toString() != 'undefined')
                        if(this.Price_Response_Master_.Charge1per.toString() != '0.00')
                        {
                            this.printAcknowledgeCharge1per = true;
                        }
                        debugger;
   if(this.Price_Response_Master_.charge1_Amount != 0)
       if(this.Price_Response_Master_.charge1_Amount != null)
           if(this.Price_Response_Master_.charge1_Amount != undefined )
      if( this.Price_Response_Master_.charge1_Amount.toString() != '0')
   if( this.Price_Response_Master_.charge1_Amount.toString() != 'null')
       if( this.Price_Response_Master_.charge1_Amount.toString() != 'undefined' )
       if( this.Price_Response_Master_.charge1_Amount.toString() != '0.000')
    {
        this.printAcknowledgeChargeAmount1 = true;
    }
debugger;
   if(this.Price_Response_Master_.charge2_Amount != 0)
       if(this.Price_Response_Master_.charge2_Amount != null)
           if(this.Price_Response_Master_.charge2_Amount != undefined )
      if( this.Price_Response_Master_.charge2_Amount.toString() != '0')
   if( this.Price_Response_Master_.charge2_Amount.toString() != 'null')
       if( this.Price_Response_Master_.charge2_Amount.toString() != 'undefined' )
       if( this.Price_Response_Master_.charge2_Amount.toString() != '0.000')
    {
        this.printAcknowledgeChargeAmount2 = true;
    }
    debugger;
    if(this.Price_Response_Master_.TotalDiscount != 0)
        if(this.Price_Response_Master_.TotalDiscount != null )
           if(this.Price_Response_Master_.TotalDiscount != undefined )
           if(this.Price_Response_Master_.TotalDiscount.toString() != '0')
            if(this.Price_Response_Master_.TotalDiscount.toString() != 'null')
                    if(this.Price_Response_Master_.TotalDiscount.toString() != 'undefined')
                        if(this.Price_Response_Master_.TotalDiscount.toString() != '0.000')
                        {
                            this.printAcknowledgeTotalDiscount = true;
                        }
                        debugger;
    if(this.Price_Response_Master_.VAT_Amount != 0)
        if(this.Price_Response_Master_.VAT_Amount != null )
           if(this.Price_Response_Master_.VAT_Amount != undefined )
           if(this.Price_Response_Master_.VAT_Amount.toString() != '0')
            if(this.Price_Response_Master_.VAT_Amount.toString() != 'null')
                    if(this.Price_Response_Master_.VAT_Amount.toString() != 'undefined')
                        {
                            this.printAcknowledgeVAT_Amount = true;
                        }
                        if(this.Price_Response_Master_.Discount_Description != '')
                            if(this.Price_Response_Master_.Discount_Description != null )
                               if(this.Price_Response_Master_.Discount_Description != undefined )
                               if(this.Price_Response_Master_.Discount_Description.toString() != '0')
                                if(this.Price_Response_Master_.Discount_Description.toString() != 'null')
                                        if(this.Price_Response_Master_.Discount_Description.toString() != 'undefined')
                                            {
                                                this.printAcknowledgeDiscount_Description = true;
                                            }
                                            if(this.Price_Response_Master_.Additional_Discount != 0)
                                                if(this.Price_Response_Master_.Additional_Discount != null )
                                                   if(this.Price_Response_Master_.Additional_Discount != undefined )
                                                   if(this.Price_Response_Master_.Additional_Discount.toString() != '0')
                                                    if(this.Price_Response_Master_.Additional_Discount.toString() != 'null')
                                                            if(this.Price_Response_Master_.Additional_Discount.toString() != 'undefined')
                                                                if(this.Price_Response_Master_.Additional_Discount.toString() != '0.00')
                                                                {
                                                                    this.printAcknowledgeAdditional_Discount = true;
                                                                }
                                                                if(this.Price_Response_Master_.Roundoff_Amt != 0)
                                                                    if(this.Price_Response_Master_.Roundoff_Amt != null )
                                                                       if(this.Price_Response_Master_.Roundoff_Amt != undefined )
                                                                       if(this.Price_Response_Master_.Roundoff_Amt.toString() != '0')
                                                                        if(this.Price_Response_Master_.Roundoff_Amt.toString() != 'null')
                                                                                if(this.Price_Response_Master_.Roundoff_Amt.toString() != 'undefined')
                                                                                    if(this.Price_Response_Master_.Roundoff_Amt.toString() != '0.000')
                                                                                    {
                                                                                        this.printAcknowledgeRoundoff_Amt = true;
                                                                                    }
  if(this.currency.CurrencyDetails_Id == 0)
    {
        this.CurrecnyName = '';
    }
    else
    {
        this.CurrecnyName = this.currency.CurrecnyName;
    }
    if(this.Payment_Term.payment_Term_ID == 0)
        {
            this.Payment_Term_Description = '';
        }
        else
        {
            this.Payment_Term_Description = this.Payment_Term.Payment_Term_Description;
        }
        this.Price_Response_Master_.EntryDate = this.formatDate(this.Price_Response_Master_.EntryDate)
    this.Price_Response_Master_.PrintDate = this.formatPrintDate(this.Price_Response_Master_.EntryDate);    
    //this.Customer_Name=this.Customer_.Client_Accounts_Name;
 
//     console.log("Price_Response_Master_.charge1_Amount",this.Price_Response_Master_.charge1_Amount)
//     console.log("Price_Response_Master_.charge2_Amount",this.Price_Response_Master_.charge2_Amount)
//     if(this.Price_Response_Master_.charge1_Amount != 0 &&
//        this.Price_Response_Master_.charge1_Amount != null &&
//        this.Price_Response_Master_.charge1_Amount.toString() != 'null'&&
//        this.Price_Response_Master_.charge1_Amount != undefined &&
//        this.Price_Response_Master_.charge1_Amount.toString() != 'undefined'
//     )
//     {
//         this.printChargeAmount1 = true;
//     }

// debugger;
//     if(this.Price_Response_Master_.charge2_Amount != 0 &&
//         this.Price_Response_Master_.charge2_Amount != null &&
//         this.Price_Response_Master_.charge2_Amount.toString() != 'null'&&
//         this.Price_Response_Master_.charge2_Amount != undefined &&
//         this.Price_Response_Master_.charge2_Amount.toString() != 'undefined' &&
//         this.Price_Response_Master_.charge2_Amount.toString() != '0.000'
//      )
//      {
//          this.printChargeAmount2 = true;
//      }
//     console.log('this.printChargeAmount1: ', this.printChargeAmount1);
//     console.log('this.printChargeAmount2: ', this.printChargeAmount2);


    this.Price_Response_Master_.EntryDate = this.formatDate(this.Price_Response_Master_.EntryDate)
    this.Price_Response_Master_.PrintDate = this.formatPrintDate(this.Price_Response_Master_.EntryDate);
    // for (let i = 0; i < this.currencyData.length; i++) {
    //     if(this.Price_Response_Master_.CurrencyId = this.currencyData[i].CurrencyDetails_Id){
    //     }        
    //    }
   //this.Load_Company() ;   
    // this.Image_Url='/assets/img/'+this.Print_Company_.Company_Id+'.jpg';
    // this.Company_Sign='/assets/img/Sign_'+this.Print_Company_.Company_Id+'.jpg';
    // this.Company_Seal='/assets/img/Seal_'+this.Print_Company_.Company_Id+'.jpg';  
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
    // this.Image_Url='/assets/img/'+this.Print_Company_.Company_Id+'.jpg';
    // this.Company_Sign='/assets/img/Sign_'+this.Print_Company_.Company_Id+'.jpg';
    // this.Company_Seal='/assets/img/Seal_'+this.Print_Company_.Company_Id+'.jpg';  
    let popupWinindow
    let innerContents = document.getElementById("Print_Search_Div").innerHTML;
    popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
    popupWinindow.document.close();      
}
Clr_Sales_Master()
{
    this.Price_Response_Master_.Price_Response_Master_Id=0;
    this.Price_Response_Master_.Account_Party_Id=0;
    //this.Price_Response_Master_.Employee_Id=0;
    //this.Price_Response_Master_.Employee_Name=this.Employee_Name;
    this.Price_Response_Master_.User_Id=0;
    this.Price_Response_Master_.Supplier_Ref_No="";
    this.Price_Response_Master_.EntryDate=new Date().toString();
    this.Price_Response_Master_.EntryDate=this.formatDate(this.Price_Response_Master_.EntryDate);
    this.Price_Response_Master_.Price_RequestNo="";
    this.Price_Response_Master_.CurrencyId=0;
    this.Price_Response_Master_.Brand="";
    this.Price_Response_Master_.PriceBasis="";
    this.Price_Response_Master_.PaymentTerms = null;
    this.Price_Response_Master_.Payment_Term_Description = null;
    this.Price_Response_Master_.Delivery = "";
    this.Price_Response_Master_.Validity = "";
    this.Price_Response_Master_.Description1 = "";
    this.Price_Response_Master_.Discount_Description = null;
    this.Price_Response_Master_.Charge1 = "";
    this.Price_Response_Master_.Charge1per = null;
    this.Price_Response_Master_.Charge2 = "";
    this.Price_Response_Master_.PreparedBy = "";
    this.Price_Response_Master_.VAT_Percentage = this.Default_Vat_Percentage;
    this.Price_Response_Master_.Additional_Discount = null;
    this.Price_Response_Master_.charge1_Amount = null;
    this.Price_Response_Master_.charge2_Amount = null;
    this.Price_Response_Master_.TotalDiscount = null
    this.Price_Response_Master_.VAT_Amount = null;
    this.Price_Response_Master_.Total_Amount = null;
    this.Price_Response_Master_.Roundoff_Amt = null;
    this.Price_Response_Master_.Amount_In_Words = "";
    this.Price_Response_Master_.NetTotal=null;
    this.Price_Response_Master_.Cess=0;
    this.Price_Response_Master_.RoundOff=0;
    this.Price_Response_Master_.TotalAmount=0;
    this.Price_Response_Master_.Description2="";
    this.Price_Response_Master_.Address1="";
    this.Price_Response_Master_.Address2="";
    this.Price_Response_Master_.Address3="";
    this.Price_Response_Master_.Address4="";
    this.Price_Response_Master_.Mobile="";
    this.Price_Response_Master_.Customer_Name="";
    this.Price_Response_Master_.Email="";
    this.Price_Response_Master_.PinCode="";
    this.Price_Response_Master_.GSTNo="";    
    this.Price_Response_Master_.GrandTotal=0;
    this.Price_Response_Master_.Transportation_Gst=null;
    this.Price_Response_Master_.Handling_Gst=0;
    this.Price_Response_Master_.Transportation_Total=null;
    this.Price_Response_Master_.Handling_Total=null;
    this.Price_Response_Master_.Vehicle_No="";
    this.Price_Response_Master_.Driver_Name="";
    this.Price_Response_Master_.PaymentTermValue = null;
    this.Price_Response_Master_.Mobile_No = "";
    this.Price_Response_Master_.Delivery_Address1 = "";
    this.Price_Response_Master_.Delivery_Address2 = "";
    this.Price_Response_Master_.Delivery_Address3 = "";
    this.Price_Response_Master_.Delivery_Address4 = "";
    if(this.Bill_Type_Data!=undefined && this.Bill_Type_Data!=null)
    this.Bill_Type_=this.Bill_Type_Data[1];
    if(this.Bill_Mode_Data!=undefined && this.Bill_Mode_Data!=null)
    this.Bill_Mode_=this.Bill_Mode_Data[0];
    this.Customer_=null;
    this.Price_Response_Details_Data=[];
    this.Address1 = null;
    this.Address2 = null;
    this.Address3 = null;
    this.Address4 = null;
    this.Vatin = null;
    this.Price_Response_Master_.POnumber = null;
    this.Attention = null;
    this.Employee = null;
    this.Price_Response_Master_.TotalAmount = 0;
    this.Total = 0;
    if(this.currencyData != undefined && this.currencyData!= null)
    {
        this.currency = this.currencyData[0];
    }
    this.Price_Response_Master_.KindAttend = '';
    this.Price_Response_Master_.AttendEmployee = '';
    if(this.PaymentTermData != undefined && this.PaymentTermData != null)
    {
        this.Payment_Term = this.PaymentTermData[0];
    }
}
Clr_Sales_Details()
{
    debugger
    this.Price_Response_Details_Index=-1;
    this.Price_Response_Details_.Price_Response_Details_Id=0;
    this.Price_Response_Details_.Price_Response_Master_Id=0;
    this.Price_Response_Details_.StockId=0;
    //this.Price_Response_Details_.Stock_Details_Id=0;
    this.Price_Response_Details_.ItemId=0;
    this.Price_Response_Details_.ItemName="";
    this.Price_Response_Details_.Item_Code="";
    this.Price_Response_Details_.GroupId=0;
    this.Price_Response_Details_.GroupName="";
    this.Price_Response_Details_.UnitId=0;
    this.Price_Response_Details_.UnitName="";
    this.Price_Response_Details_.PurchaseRate=0;
    this.Price_Response_Details_.UnitPrice=0;
    this.Price_Response_Details_.MRP=0;
    this.Price_Response_Details_.TaxAmount=0;
    this.Price_Response_Details_.Stock=0;
    this.Price_Response_Details_.HSNCODE="";
    this.Price_Response_Details_.SaleTax=0;
    this.Price_Response_Details_.Quantity=0;
    this.Price_Response_Details_.Discount=0;
    this.Price_Response_Details_.NetValue=0;
    this.Price_Response_Details_.Description="";    
    this.UnitName = "";
    this.Quantity = 0;
    this.SaleRate = 0;
    this.discount = 0;
    this.Price_Response_Details_.Unit_Discount = 0;
    this.TotalAmount = 0;
    this.Price_Response_Details_.Availability = '';
    this.Barcode_=null;
    this.ItemCodeData=null;
    this.Item_ =null;
    this.Barcode_ =null;
    // this.Item_.ItemName="";
    // this.Barcode_.Item_Code=""; 
    debugger;
        // if (this.ItemCodeData != null && this.ItemCodeData != undefined)    
        //     this.Item_ = new [];

        // if (this.ItemCodeData != null && this.ItemCodeData != undefined)    
        //   this.Barcode_ = []  
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
    this.Price_Response_Details_Description="";
}
Delete_Sales_Details(Price_Response_Details_e:Price_Response_Details,index)
{
    /*this.Edit_CGST=Price_Response_Details_e.CGSTAMT
    this.Edit_SGST=Price_Response_Details_e.SGSTAMT;
    this.Edit_GST=Price_Response_Details_e.TaxAmount;
    this.Edit_Discount=Number(Price_Response_Details_e.Discount);
    this.Edit_Cess=Price_Response_Details_e.CessAMT;
    this.Edit_Net=Price_Response_Details_e.NetValue;
    this.Edit_Gross=Price_Response_Details_e.GrossValue;
    this.Edit_Totamt=Price_Response_Details_e.TotalAmount;
    this.CGST_SUM= this.CGST_SUM-this.Edit_CGST;
    this.SGST_SUM= this.SGST_SUM-this.Edit_SGST;
    this.GST_Sum= this.GST_Sum-this.Edit_GST;
    this.Tot_discount=this.Tot_discount-this.Edit_Discount;
    this.Tot_Cess=this.Tot_Cess- this.Edit_Cess;
    this.Tot_Amount=this.Tot_Amount- this.Edit_Totamt;
    this.Tot_Net=this.Tot_Net- this.Edit_Net;
    this.Tot_Gross=this.Tot_Gross-this.Edit_Gross;
    this.Price_Response_Master_.GrossTotal=this.Price_Response_Master_.GrossTotal-this.Edit_Gross;
    this.Price_Response_Master_.TotalDiscount=this.Price_Response_Master_.TotalDiscount-this.Edit_Discount;
    this.Price_Response_Master_.NetTotal= this.Price_Response_Master_.NetTotal-this.Edit_Net;
    this.Price_Response_Master_.TotalCGST= this.Price_Response_Master_.TotalCGST-this.Edit_CGST;
    this.Price_Response_Master_.ToalSGST=   this.Price_Response_Master_.ToalSGST-this.Edit_SGST;
    this.Price_Response_Master_.Cess=  this.Price_Response_Master_.Cess-this.Edit_Cess;
    this.Price_Response_Master_.TotalAmount= this.Price_Response_Master_.TotalAmount- this.Edit_Totamt;
    this.Price_Response_Master_.TotalGST=   this.Price_Response_Master_.TotalGST-this.Edit_GST;
    //this.Price_Response_Master_.GrandTotal= this.Price_Response_Master_.GrandTotal-this.Edit_Totamt;
    this.Price_Response_Master_.GrossTotal=Number(this.Price_Response_Master_.GrossTotal.toFixed(2));
    this.Price_Response_Master_.TotalDiscount=Number(this.Price_Response_Master_.TotalDiscount.toFixed(2));
    this.Price_Response_Master_.NetTotal=Number(this.Price_Response_Master_.NetTotal.toFixed(2));
    this.Price_Response_Master_.TotalCGST=Number(this.Price_Response_Master_.TotalCGST.toFixed(2));
    this.Price_Response_Master_.ToalSGST=Number(this.Price_Response_Master_.ToalSGST.toFixed(2));
    this.Price_Response_Master_.Cess=Number(this.Price_Response_Master_.Cess.toFixed(2));
    this.Price_Response_Master_.TotalAmount=Number(this.Price_Response_Master_.TotalAmount.toFixed(2));
    this.Price_Response_Master_.TotalGST=Number(this.Price_Response_Master_.TotalGST.toFixed(2));   
    this.Price_Response_Master_.GrandTotal=Number(this.Price_Response_Master_.GrandTotal.toFixed(2));*/   
    this.Price_Response_Details_Data.splice(index, 1);   
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
   this.Search_Price_Response();
   this.issLoading=false;
   },
   Rows => {
       this.issLoading=false;
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error',Type:"2"}});
   });
   }
   });
}
Delete_Price_Response_Master(Price_Response_Master_Id,index)
 {
    const dialogRef = this.dialogBox.open
    ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>        
    {    
    if(result=='Yes')
    {
    this.issLoading=true;
    debugger
    this.Price_Response_Service_.Delete_Price_Response(Price_Response_Master_Id).subscribe((response: any) => {    
        debugger   
        const Delete_status = response.success ? response.data : null;
        if(!Delete_status || !Delete_status[0] || Delete_status[0][0].Price_Response_Master_Id_==-1){
            const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Cannot Delete',Type:"3"}});
            this.issLoading=false;           
            return;
          }
  else if(Delete_status[0][0].Price_Response_Master_Id_>0){
    this.Price_Response_Master_Data.splice(index, 1);
      const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Deleted',Type:"false"}});      
      this.Search_Price_Response();
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
        this.Sales_Master_Service_.Load_Bill_Type(value).subscribe((response: any) => {    
        if (response != null) {
            const Rows = response.success ? response.data : response;
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
        this.Sales_Master_Service_.Load_Bill_Mode().subscribe((response: any) => {    
        if (response != null) {
            const Rows = response.success ? response.data : response;
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
    this.Sales_Master_Service_.Load_Company_Bank().subscribe((response: any) => {   
      if (response != null) {
            const Rows = response.success ? response.data : response;
            const bankRows = Array.isArray(Rows) && Array.isArray(Rows[0]) ? Rows[0] : [];
            const companyRows = Array.isArray(Rows) && Array.isArray(Rows[1]) ? Rows[1] : [];
            this.Bank_Data = bankRows;
            this.Bank_ = bankRows.length > 0 ? bankRows[0] : null;
            this.Company_ = companyRows.length > 0 ? companyRows[0] : new Company();
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
     debugger
    this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39',Value).subscribe(Rows => {   
        debugger;  
    if (Rows != null) {
        debugger;  
        this.Customer_Data = Rows[0];
    }
    this.issLoading = false;
    },
    Rows => {
     
    this.issLoading = false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    }
    debugger;  
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
Search_Item_Typeahead(event: any) {
    let Value = "";
    if (event && event.target && event.target.value) {
        Value = event.target.value;
    }
    
    this.isLoading = true;
    // Merged search: First search by Item Name
    this.Sales_Master_Service_.Search_Item_Typeahead(Value).subscribe({
        next: (Rows) => {
            let combinedData = [];
            if (Rows != null && Rows[0] != null) {
                Rows[0].forEach(item => {
                    item.ItemId = item.ItemId || item.Item_Id || 0;
                    item.ItemName = item.ItemName || item.Item_Name || '';
                    item.Quantity = item.Quantity || 0;
                    combinedData.push(item);
                });
            }
            
            // Then search by Item Code (Part Number) from Item Master to ensure thorough results
            this.Item_Service_.Search_Item('', 0, Value).subscribe({
                next: (codeRows) => {
                    if (codeRows != null && codeRows[0] != null) {
                        // Merge results, avoiding duplicates by ItemId
                        codeRows[0].forEach(item => {
                            const normalizedItem = {
                                ...item,
                                ItemId: item.ItemId || item.Item_Id || 0,
                                ItemName: item.ItemName || item.Item_Name || '',
                                Quantity: item.Quantity || 0
                            };
                            if (!combinedData.find(d => (d.ItemId === normalizedItem.ItemId && d.ItemId !== 0))) {
                                combinedData.push(normalizedItem);
                            }
                        });
                    }
                    this.Stock_Data = combinedData;
                    this.isLoading = false;
                },
                error: () => {
                    this.Stock_Data = combinedData;
                    this.isLoading = false;
                }
            });
        },
        error: (err) => {
            this.isLoading = false;
            this.Stock_Data = [];
            const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured during item search', Type: "2" } });
        }
    });
}
display_Item(Stock_e: Stock)
{
     if (Stock_e) { return Stock_e.ItemName || (Stock_e as any).Item_Name; }
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
    this.Price_Response_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.Price_Response_Master_.Customer=this.Customer_.Client_Accounts_Name;
    this.Price_Response_Master_.Account_Party_Id=this.Customer_.Client_Accounts_Id;
    this.Price_Response_Master_.Supplier_Id=this.Customer_.Client_Accounts_Id;
    this.Price_Response_Master_.Supplier_Name=this.Customer_.Client_Accounts_Name;

    this.Price_Response_Master_.Address1 = this.Customer_.Address1;
    this.Price_Response_Master_.Address2 = this.Customer_.Address2;
    this.Price_Response_Master_.Address3 = this.Customer_.Address3;
    this.Price_Response_Master_.Address4 = this.Customer_.Address4;
    this.Price_Response_Master_.Mobile = this.Customer_.Mobile;
    this.Price_Response_Master_.Mobile_No = this.Customer_.Mobile;
    this.Price_Response_Master_.Email = this.Customer_.Email;
    this.Price_Response_Master_.PinCode=this.Customer_.PinCode;
    this.Price_Response_Master_.GSTNo=this.Customer_.GSTNo;
    this.Customer_Name = this.Price_Response_Master_.Customer_Name;

    this.Address1 = this.Price_Response_Master_.Address1;
    this.Address2 = this.Price_Response_Master_.Address2;
    this.Address3 = this.Price_Response_Master_.Address3;
    this.Address4 = this.Price_Response_Master_.Address4;
    this.Vatin = this.Price_Response_Master_.GSTNo;
}
selectCustomer(){
    //this.customer_name=this.Customer_.Client_Accounts_Name;
    this.Price_Response_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.Price_Response_Master_.Customer=this.Customer_.Client_Accounts_Name;
    this.Price_Response_Master_.Account_Party_Id=this.Customer_.Client_Accounts_Id;
    this.Price_Response_Master_.Supplier_Id=this.Customer_.Client_Accounts_Id;
    this.Price_Response_Master_.Supplier_Name=this.Customer_.Client_Accounts_Name;

    this.Price_Response_Master_.Address1 = this.Customer_.Address1;
    this.Price_Response_Master_.Address2 = this.Customer_.Address2;
    this.Price_Response_Master_.Address3 = this.Customer_.Address3;
    this.Price_Response_Master_.Address4 = this.Customer_.Address4;
    this.Price_Response_Master_.Mobile = this.Customer_.Mobile;
    this.Price_Response_Master_.Mobile_No = this.Customer_.Mobile;
    this.Price_Response_Master_.Email = this.Customer_.Email;
    this.Price_Response_Master_.PinCode=this.Customer_.PinCode;
    this.Price_Response_Master_.GSTNo=this.Customer_.GSTNo;
    this.Customer_Name = this.Price_Response_Master_.Customer_Name;

    this.Address1 = this.Customer_.Address1;
    this.Address2 = this.Customer_.Address2;
    this.Address3 = this.Customer_.Address3;
    this.Address4 = this.Customer_.Address4;
    this.Vatin = this.Customer_.GSTNo;
}
Item_Name_Change(Item_sl:Price_Response_Details){ 
    debugger
    const item: any = Item_sl as any;
    this.Price_Response_Details_Temp_.ItemId = item.Item_Id || item.ItemId || 0;
    this.Price_Response_Details_Temp_.ItemName = item.Item_Name || item.ItemName || '';
    this.Item_ = Object.assign({}, this.Price_Response_Details_Temp_);

    this.Price_Response_Details_.Item_Code = item.Item_Code || item.ItemCode || '';
    this.Price_Response_Details_.ItemName = item.Item_Name || item.ItemName || '';
    this.Price_Response_Details_.ItemId = item.Item_Id || item.ItemId || 0;
    this.Price_Response_Details_.StockId = item.StockId || 0;
    this.Price_Response_Details_.Description = item.Description || '';
    this.Price_Response_Details_.Model = item.ModelName || item.Model || '';
    this.Price_Response_Details_.Brand = item.BrandName || item.Brand || '';
    this.Price_Response_Details_.UnitName = item.UnitName || '';
    this.Price_Response_Details_.UnitId = item.UnitId || 0;

    this.Item_Temp.Item_Code = this.Price_Response_Details_.Item_Code;
    this.Item_Temp.ItemId = this.Price_Response_Details_.ItemId;
    this.Barcode_ = Object.assign({}, this.Item_Temp);

    this.Price_Response_Details_.Quantity=0;
}
Barcode_Change(Barcode_sl:Price_Response_Details)
{    
      debugger
    this.Price_Response_Details_=Object.assign({},Barcode_sl);
    this.Price_Response_Details_Temp_.ItemId=Barcode_sl.ItemId;
    this.Price_Response_Details_Temp_.ItemName=Barcode_sl.ItemName;
    this.Item_=Object.assign({},this.Price_Response_Details_Temp_);   
        
    this.Price_Response_Details_.ItemId=Barcode_sl.ItemId;
    this.Price_Response_Details_.ItemName=Barcode_sl.ItemName;
    this.Price_Response_Details_.StockId=Barcode_sl.StockId;
    //if(this.Price_Response_Details_.Quantity==null || this.Price_Response_Details_.Quantity==undefined || this.Price_Response_Details_.Quantity==0)
    this.Price_Response_Details_.Quantity=0;
    // if (this.Price_Response_Details_.UnitPrice==null || this.Price_Response_Details_.UnitPrice==undefined || this.Price_Response_Details_.UnitPrice==0)
    //     this.Price_Response_Details_.UnitPrice=0;
}
Calculate_Price_Response_Details_Amount()
{
    if(this.Price_Response_Details_.Quantity == undefined || this.Price_Response_Details_.Quantity == null)
        this.Price_Response_Details_.Quantity = 0;
    if(this.Price_Response_Details_.UnitPrice == undefined || this.Price_Response_Details_.UnitPrice == null)
        this.Price_Response_Details_.UnitPrice = 0;
    if(this.Price_Response_Details_.Profit == undefined || this.Price_Response_Details_.Profit == null)
        this.Price_Response_Details_.Profit = 0;

    // Sales Rate = Price + (Price * Profit / 100)
    this.Price_Response_Details_.SaleRate = Number(this.Price_Response_Details_.UnitPrice) + (Number(this.Price_Response_Details_.UnitPrice) * Number(this.Price_Response_Details_.Profit) / 100);
    this.Price_Response_Details_.SaleRate = Number(this.Price_Response_Details_.SaleRate.toFixed(3));

    // Line Total = Sales Rate * Quantity
    this.Price_Response_Details_.Amount = Number(this.Price_Response_Details_.Quantity) * Number(this.Price_Response_Details_.SaleRate);
    this.Price_Response_Details_.Amount = Number(this.Price_Response_Details_.Amount.toFixed(3));

    this.Calculate_Total_Amount();
}
Calculate_Total_Amount()
{ 
    if(this.Price_Response_Details_.Discount == undefined || this.Price_Response_Details_.Discount == null)
        this.Price_Response_Details_.Discount = 0;
    
    // Standard ERP calculation: Amount is already calculated based on Sales Rate.
    // We just ensure other fields like NetValue are updated if needed.
    this.Price_Response_Details_.TaxAmount = Number(this.Price_Response_Details_.Amount) * Number(this.Price_Response_Details_.SaleTax || 0) / 100;
    this.Price_Response_Details_.NetValue = Number(this.Price_Response_Details_.Amount) + Number(this.Price_Response_Details_.TaxAmount);
    
    this.Price_Response_Details_.Amount = Number(this.Price_Response_Details_.Amount.toFixed(3));
    this.Price_Response_Details_.NetValue = Number(this.Price_Response_Details_.NetValue.toFixed(3));
}
Round_Off_Calculation()
{   
    if(this.Price_Response_Master_.RoundOff == undefined || this.Price_Response_Master_.RoundOff == null)
        {
            this.Price_Response_Master_.RoundOff = 0;
            this.Price_Response_Master_.RoundOff = Number(this.Price_Response_Master_.RoundOff.toFixed(3));
        }  
    this.Price_Response_Master_.GrandTotal = Number(this.Price_Response_Master_.RoundOff) + Number(this.Price_Response_Master_.TotalAmount);    
    this.Price_Response_Master_.GrandTotal = Number(this.Price_Response_Master_.GrandTotal.toFixed(3));
}
checkbox_Click()
{ 
    this.Final_Amounts();
}
OnHeaderProfitChange() {
    if (this.Price_Response_Details_Data) {
        this.Price_Response_Details_Data.forEach(item => {
            item.Profit = this.Profit;
            // Recalculate for each item: Sales Rate = Price + (Price * Profit / 100)
            item.SaleRate = Number(item.UnitPrice) + (Number(item.UnitPrice) * Number(item.Profit) / 100);
            item.SaleRate = Number(item.SaleRate.toFixed(3));
            // Line Total = Sales Rate * Quantity
            item.Amount = Number(item.Quantity) * Number(item.SaleRate);
            item.Amount = Number(item.Amount.toFixed(3));
        });
        this.Final_Amounts();
    }
}
safeNumber(value) {
    return isNaN(value) ? 0 : Number(value);
}
Manual_Roundoff_Calculation()
{
    var Point_=0.50;
    this.roundoff_value=0;
    this.roundoff_value=this.Price_Response_Master_.TotalAmount-(Math.round(this.Price_Response_Master_.TotalAmount));
    if(this.roundoff_value<Number(Point_))
    this.roundoff_value=- this.roundoff_value;
   // this.Price_Response_Master_.TotalAmount=this.Price_Response_Master_.TotalAmount+  this.roundoff_value;
    this.Price_Response_Master_.RoundOff=Number(this.roundoff_value);
    this.Price_Response_Master_.RoundOff=Number(this.Price_Response_Master_.RoundOff.toFixed(3));
    this.Price_Response_Master_.TotalAmount= Number(this.Price_Response_Master_.TotalAmount.toFixed(3));
}
Calculation_GSt()
{
    if(this.Price_Response_Master_.Isgst==true)
    {
        this.Price_Response_Master_.Transportation_Gst = Number(this.Price_Response_Master_.Transportation_Charge) * (18 / 100)
        this.Price_Response_Master_.Transportation_Total = Number(this.Price_Response_Master_.Transportation_Charge) + Number(this.Price_Response_Master_.Transportation_Gst) ;
        this.Price_Response_Master_.Handling_Gst = (this.Price_Response_Master_.Handling_Charge) * (18 / 100)
        this.Price_Response_Master_.Handling_Total = Number(this.Price_Response_Master_.Handling_Charge) + Number(this.Price_Response_Master_.Handling_Gst);
   }
}
Search_Price_Response()
{
    var look_In_Date_Value=0,SupplierId_=0,Item_Group_Id_=0,CurrencyDetails_Id_=0;
    this.Sales_Master_Total_Amount=0;    
    if (this.Date_Check == true )
        look_In_Date_Value = 1;
    if(this.Search_Customer.Client_Accounts_Id==null || this.Search_Customer.Client_Accounts_Id==undefined)
        SupplierId_=0;
    else
        SupplierId_=this.Search_Customer.Client_Accounts_Id;
        
    this.issLoading=true;    
    this.QuotNo = this.QuotNo == "" ? undefined : this.QuotNo;
    
    this.Price_Response_Service_.Search_Price_Response(look_In_Date_Value, moment(this.Search_FromDate).format('YYYY-MM-DD'), 
    moment(this.Search_ToDate).format('YYYY-MM-DD'), SupplierId_, this.QuotNo).subscribe({
        next: (response: any) => {
            const Rows = response.success ? response.data : (Array.isArray(response) ? response : []);
            this.Price_Response_Master_Data = Rows[0];
            if (this.Price_Response_Master_Data && this.Price_Response_Master_Data.length > 0) {
                for (var i = 0; i < this.Price_Response_Master_Data.length; i++) {
                    this.Price_Response_Master_Data[i].Price_RequestNo = this.Price_Response_Master_Data[i].Price_Response_No;
                    this.Price_Response_Master_Data[i].Customer = this.Price_Response_Master_Data[i].Supplier_Name;
                    this.Price_Response_Master_Data[i].FormattedEntryDate = moment(this.Price_Response_Master_Data[i].EntryDate).format('DD/MM/YYYY');
                    this.Price_Response_Master_Data[i].NetTotal = Number(this.Price_Response_Master_Data[i].Net_Amount || this.Price_Response_Master_Data[i].Total_Amount || 0);
                    this.Sales_Master_Total_Amount = Number(this.Sales_Master_Total_Amount) + Number(this.Price_Response_Master_Data[i].NetTotal);
                }
                this.Sales_Master_Total_Amount = Number(this.Sales_Master_Total_Amount.toFixed(3));
            }
            this.Total_Entries = (this.Price_Response_Master_Data || []).length;
            this.issLoading = false;
        },
        error: (err) => {
            this.issLoading = false;
            this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
        }
    });
}
Add_Sales_Details()
{ 
    if (this.Price_Response_Details_Index >= 0) {
        this.Price_Response_Details_Data[this.Price_Response_Details_Index] = Object.assign({}, this.Price_Response_Details_);
        }
    else {
        //this.Price_Response_Details_.Barcode=this.Barcode_.Barcode;
        this.Price_Response_Details_Data.push(Object.assign({}, this.Price_Response_Details_));
}
this.Final_Amounts();
this.Price_Response_Details_Index=-1;
this.Clr_Sales_Details();
 }
Plus_Price_Response_Details()
{
if(this.Price_Response_Details_.StockId>0)
    this.Price_Response_Details_.StockId=this.Price_Response_Details_.StockId;
else
    this.Price_Response_Details_.StockId=0;
    const itemName = typeof this.Item_ === 'string' ? this.Item_ : (this.Item_ ? this.Item_.ItemName : '');
    const itemCode = typeof this.Barcode_ === 'string' ? this.Barcode_ : (this.Barcode_ ? this.Barcode_.Item_Code : '');

    if (!itemName && !itemCode) {
        this.dialogBox.open(DialogBox_Component, { 
            panelClass: 'Dialogbox-Class', 
            data: { Message: 'Enter Item Name or Code', Type: "3" } 
        });
        return;
    }
    if(this.Price_Response_Details_.Quantity==undefined || this.Price_Response_Details_.Quantity==null || this.Price_Response_Details_.Quantity==0)
    {
    const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Quantity',Type: "3" }});
    return
    }
    // Set default unit price to 0 if not provided, since it's hidden.
    if(this.Price_Response_Details_.UnitPrice==undefined || this.Price_Response_Details_.UnitPrice==null)
    {
        this.Price_Response_Details_.UnitPrice = 0;
    }
    else 
    {
if(this.Price_Response_Details_Data==undefined)
this.Price_Response_Details_Data=[];
if( this.Barcode_==null)
{
    this.Price_Response_Details_.Item_Code='';
}
else if(this.Barcode_.Item_Code!=undefined && this.Barcode_.Item_Code!=null)
{
    this.Price_Response_Details_.Item_Code=  this.Barcode_.Item_Code;
}
else if(this.Barcode_!=undefined && this.Barcode_!=null)
{
    const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
    this.Price_Response_Details_.Item_Code=Barcode_string;
}
if( this.Item_==null)
    {
        this.Price_Response_Details_.ItemName='';
    }
    else if(this.Item_.ItemName!=undefined && this.Item_.ItemName!=null)
    {
        this.Price_Response_Details_.ItemName=  this.Item_.ItemName;
    }
    else if(this.Item_!=undefined && this.Item_!=null)
    {
        const Itemnamestoing =JSON.parse(JSON.stringify(this.Item_));
        this.Price_Response_Details_.ItemName=Itemnamestoing;
    }
    this.Price_Response_Details_.Expiry_Date=this.New_Date(new Date(moment(this.Price_Response_Details_.Expiry_Date).format('YYYY-MM-DD')));
    
    // Ensure calculation is correct before adding
    this.Price_Response_Details_.SaleRate = Number(this.Price_Response_Details_.UnitPrice) + (Number(this.Price_Response_Details_.UnitPrice) * Number(this.Price_Response_Details_.Profit || 0) / 100);
    this.Price_Response_Details_.SaleRate = Number(this.Price_Response_Details_.SaleRate.toFixed(3));
    this.Price_Response_Details_.Amount = Number(this.Price_Response_Details_.Quantity) * Number(this.Price_Response_Details_.SaleRate);
    this.Price_Response_Details_.Amount = Number(this.Price_Response_Details_.Amount.toFixed(3));

    if (this.Price_Response_Details_Index >= 0) 
    {
        this.Price_Response_Details_Data[this.Price_Response_Details_Index] = Object.assign({}, this.Price_Response_Details_);
    }
    else
    {
        this.Price_Response_Details_Data.push(Object.assign({}, this.Price_Response_Details_));
    }
    this.Price_Response_Details_Index=-1;
    this.Clr_Sales_Details();  
    this.Final_Amounts();
}
}
Save_Price_Response(Printstatus:number)
{
    debugger;
    if(this.Price_Response_Details_Data == undefined || this.Price_Response_Details_Data == null || this.Price_Response_Details_Data.length == 0 )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Add atleast one Item',Type:"3"}});
        return
    }

    // Supplier validation removed per user request

    if(this.Price_Response_Master_.EntryDate == undefined || this.Price_Response_Master_.EntryDate == null || this.Price_Response_Master_.EntryDate === '')
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Choose Date',Type:"3"}});
        return
    }

    this.Price_Response_Master_.Price_Response_No = this.Price_Response_Master_.Price_RequestNo;
    
    // Map details to match DB expected column names for JSON_TABLE
    const mappedDetails = this.Price_Response_Details_Data.map(item => {
        return {
            ...item,
            Item_Id: item.ItemId || item.Item_Id || 0,
            Item_Name: item.ItemName || item.Item_Name || '',
            Part_No: item.Item_Code || item.Part_No || '',
            Supplier_Price: item.UnitPrice || item.Supplier_Price || 0,
            Profit_Percentage: item.Profit || item.Profit_Percentage || 0,
            Profit_Amount: (Number(item.SaleRate || 0) - Number(item.UnitPrice || 0)) || item.Profit_Amount || 0,
            Sale_Rate: item.SaleRate || item.Sale_Rate || 0,
            Total_Amount: item.Amount || item.Total_Amount || 0,
            Brand_Id: item.Brand_Id || 0,
            Brand_Name: item.Brand || item.Brand_Name || ''
        };
    });
    this.Price_Response_Master_.Price_Response_Details = mappedDetails;
    this.Price_Response_Master_.EntryDate = this.New_Date(new Date(moment(this.Price_Response_Master_.EntryDate).format('YYYY-MM-DD')));
    this.Price_Response_Master_.Currency_Id = this.currency.CurrencyDetails_Id;

    // Header fields
    if (this.Payment_Term && this.Payment_Term.payment_Term_ID && this.Payment_Term.payment_Term_ID > 0) {
        this.Price_Response_Master_.Payment_Term_Description = this.Payment_Term.payment_Term_ID;
        this.Price_Response_Master_.PaymentTerms = this.Payment_Term.Payment_Term_Description || '';
    } else {
        this.Price_Response_Master_.Payment_Term_Description = 0;
        this.Price_Response_Master_.PaymentTerms = '';
    }
    
    // Net total and other amounts
    this.Price_Response_Master_.Total_Amount = this.Price_Response_Master_.TotalAmount || 0;
    this.Price_Response_Master_.Vat_Amount = this.Price_Response_Master_.VAT_Amount || 0;
    this.Price_Response_Master_.Net_Amount = this.Price_Response_Master_.NetTotal || this.Price_Response_Master_.Total_Amount || this.Price_Response_Master_.TotalAmount || 0;

    console.log("Before Price Response API call");
    this.issLoading = true;

    this.Price_Response_Service_.Save_Price_Response(this.Price_Response_Master_)
    .pipe(
        finalize(() => {
            this.issLoading = false;
        })
    )
    .subscribe({
        next: (response: any) => {
            const result = response.success ? response.data : response;
            const res = (result && result[0] && result[0][0]) ? result[0][0] : null;

            if (res && Number(res.Price_Response_Master_Id_) > 0) {
                this.Price_Response_Master_.Price_Response_Master_Id = res.Price_Response_Master_Id_;
                const dialogRef = this.dialogBox.open(DialogBox_Component, {
                    panelClass: 'Dialogbox-Class',
                    data: { Message: 'Saved Successfully', Type: "false" }
                });
                this.Edit_Sales = 1;
                this.Search_Price_Response();
            } else {
                this.dialogBox.open(DialogBox_Component, {
                    panelClass: 'Dialogbox-Class',
                    data: { Message: 'Save failed', Type: "2" }
                });
            }
        },
        error: (error) => {
            this.dialogBox.open(DialogBox_Component, {
                panelClass: 'Dialogbox-Class',
                data: { Message: 'Server Error', Type: "2" }
            });
        }
    });
}
Edit_Button_Click()
{
    if (this.User_Type_Id == 1 || this.Price_Response_Master_Data[this.Sale_EditIndex].User_Id.toString() == this.Login_User_Id)
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
Edit_Price_Response_Master(Sales_Master_e,index)
{ 
    debugger;
    this.Entry_View=true;
    this.Edit_Sales=1;
    this.Sales_Print = false;
    this.issLoading = true;
    this.Price_Response_Master_Index=index;
    this.Price_Response_Master_=Object.assign({},Sales_Master_e); 
    this.Price_Response_Master_.Price_RequestNo = this.Price_Response_Master_.Price_Response_No;
    this.Price_Response_Master_Id_Edit = Sales_Master_e.Price_Response_Master_Id;
    this.Customer_Temp.Client_Accounts_Id=Sales_Master_e.Account_Party_Id;
    this.Customer_Temp.Client_Accounts_Name=Sales_Master_e.Customer;
    this.Customer_=this.Customer_Temp;
    console.log(this.Customer_Data)
debugger;
    this.Customer_Name=Sales_Master_e.Customer;
    this.Price_Response_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.Price_Response_Master_.Customer=this.Price_Response_Master_.Customer_Name; 
    this.Customer_.Client_Accounts_Id=Sales_Master_e.Account_Party_Id;
    this.Customer_Temp.Client_Accounts_Name=Sales_Master_e.Customer;
    debugger;
    // this.Customer_Temp.Client_Accounts_Id=Sales_Master_e.Account_Party_Id;
    // this.Customer_Temp.Client_Accounts_Name=Sales_Master_e.Customer;
    // this.Customer_=this.Customer_Temp;
    debugger
    // this.Client_Accounts_Service_.Get_Client_Accounts(Sales_Master_e.Account_Party_Id).subscribe((result)=>{
    //     if(result!=null)
    //     {
    //         debugger
    //                 this.Customer_Temp.Client_Accounts_Id=result[0][0].Client_Accounts_Id;
    //                 this.Customer_Temp.Client_Accounts_Name=result[0][0].Client_Accounts_Name;
    //                 this.Customer_= this.Customer_Temp;
    //                this.Price_Response_Master_.Customer=result[0][0].Client_Accounts_Name;
    //                this.Price_Response_Master_.Customer_Name=result[0][0].Client_Accounts_Name;
    //                 this.Address1 = result[0][0].Address1;
    //                 this.Address2 = result[0][0].Address2;
    //                 this.Address3 = result[0][0].Address3;
    //                 this.Address4 = result[0][0].Address4;
    //                 this.Vatin = result[0][0].GSTNo;
    //     }
    // })
     debugger
    this.Sales_Master_Service_.Search_Customer_Typeahead('1,2,3,39',"").subscribe(Rows => { 
        debugger    
        if (Rows != null) {
            debugger
            this.Customer_Data = Rows[0];
            for(let i=0;i<Rows[0].length;i++){
                if(Rows[0][i].Client_Accounts_Id == this.Price_Response_Master_.Account_Party_Id){

                    this.Customer_Temp.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                    this.Customer_Temp.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                    this.Customer_= this.Customer_Temp;

                    this.Price_Response_Master_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                    this.Price_Response_Master_.Customer=Rows[0][i].Client_Accounts_Name;
                    this.Price_Response_Master_.Customer_Name=Rows[0][i].Client_Accounts_Name;
                    this.Price_Response_Master_.Address1 = Rows[0][i].Address1;
                    this.Price_Response_Master_.Address2 = Rows[0][i].Address2;
                    this.Price_Response_Master_.Address3 = Rows[0][i].Address3;
                    this.Price_Response_Master_.Address4 = Rows[0][i].Address4;
                    this.Price_Response_Master_.Vatin = Rows[0][i].GSTNo;

                    this.Address1 = Rows[0][i].Address1;
                    this.Address2 = Rows[0][i].Address2;
                    this.Address3 = Rows[0][i].Address3;
                    this.Address4 = Rows[0][i].Address4;
                    this.Vatin = Rows[0][i].GSTNo;
                }
            }
        }},
        );
        debugger
    // this.Customer_Temp.Address1 = Sales_Master_e.Address1;
    // this.Customer_Temp.Address2 = Sales_Master_e.Address2;
    // this.Customer_Temp.Address3 = Sales_Master_e.Address3;
    // this.Customer_Temp.Address4 = Sales_Master_e.Address4;
    // this.Customer_Temp.GSTNo = Sales_Master_e.GSTNo
    //this.Customer_Name = this.Customer_.Client_Accounts_Name;
    // this.Address1 = Sales_Master_e.Address1;
    // this.Address2 = Sales_Master_e.Address2;
    // this.Address3 = Sales_Master_e.Address3;
    // this.Address4 = Sales_Master_e.Address4;
    // this.Address4 = Sales_Master_e.Address4;
    // this.Vatin = Sales_Master_e.GSTNo;    
    if(this.Price_Response_Master_.Additional_Discount) this.addDiscCheck = 1;
    else this.addDiscCheck = 0;
        for(let i=0;i<this.currencyData.length;i++)
        {
        if(this.currencyData[i].CurrencyDetails_Id == this.Price_Response_Master_.CurrencyId){
            this.currency = this.currencyData[i];
            // this.CurrecnyName = this.currencyData[i].CurrecnyName
        }
    }
    for(let i=0;i<this.PaymentTermData.length;i++){
        if(this.PaymentTermData[i].payment_Term_ID == this.Price_Response_Master_.Payment_Term_Description){
            this.Payment_Term = this.PaymentTermData[i];
        }
    }
this.Price_Response_Service_.Get_Price_Response(Sales_Master_e.Price_Response_Master_Id).subscribe((response: any) => {     
    if (response != null) {
        debugger
        this.Price_Response_Details_Data = response.success ? response.data[0] : (response[0] || []);
        //console.log('this.Price_Response_Details_Data: ', this.Price_Response_Details_Data);
        this.addBlankRows();
       // this.Calculate_Price_Response_Details_Amount();
        this.Final_Amounts();
        debugger
        }
           this.issLoading = false;
       },
     Rows => {
            this.issLoading = false;
       const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
    });
    this.issLoading = false;
}
Edit_Sales_Details(Price_Response_Details_e:Price_Response_Details,index)
{   
    this.Price_Response_Details_Index=index;
    this.Price_Response_Details_=Price_Response_Details_e;
    this.Stock_Temp.ItemId=Price_Response_Details_e.ItemId;
    this.Stock_Temp.ItemName=Price_Response_Details_e.ItemName;
    this.Stock_=Object.assign({},this.Stock_Temp);
    this.Barcode_Temp.Stock_Id=Price_Response_Details_e.StockId;
    //this.Barcode_Temp.Barcode=Price_Response_Details_e.Barcode;
    // this.Barcode_=Object.assign({},this.Barcode_Temp);    
    this.Edit_GST=this.Price_Response_Details_.TaxAmount;
    this.Edit_Discount=this.Price_Response_Details_.Discount;
    this.Edit_Net=this.Price_Response_Details_.NetValue;
    this.Price_Response_Details_=Object.assign({},Price_Response_Details_e);
    this.Sale_Detail_Quantity=this.Price_Response_Details_.Quantity;
    this.Edit_Stock_-this.Price_Response_Details_.Stock;
    this.Price_Response_Details_Description=this.Price_Response_Details_.Description;
}

Get_Stock(){
    //this.Barcode_.ItemName=this.Item_.ItemName;
    this.Stock_Temp.ItemId=this.Barcode_.ItemId;
    this.Stock_Temp.ItemName=this.Barcode_.ItemName;
    this.Stock_=Object.assign({},this.Stock_Temp);
    this.Price_Response_Details_.ItemId=this.Barcode_.ItemId;
    this.Price_Response_Details_.ItemName=this.Barcode_.ItemName;
    this.Price_Response_Details_.UnitId=this.Barcode_.UnitId;
    this.Price_Response_Details_.UnitName=this.Barcode_.UnitName;
    this.Price_Response_Details_.MRP=this.Barcode_.MRP;
    this.Price_Response_Details_.PurchaseRate=this.Barcode_.PurchaseRate;
    const barcodeAny: any = this.Barcode_ as any;
    this.Price_Response_Details_.Description=barcodeAny.Description || '';
    this.Price_Response_Details_.Model=barcodeAny.ModelName || barcodeAny.Model || '';
    this.Price_Response_Details_.Brand=barcodeAny.BrandName || barcodeAny.Brand || '';
    this.Price_Response_Details_.Stock=this.Barcode_.Quantity;
    this.Price_Response_Details_.UnitPrice=this.Barcode_.SaleRate;
    this.Price_Response_Details_.ItemName=this.Barcode_.ItemName;
    this.Price_Response_Details_.GroupId=this.Barcode_.GroupId;
    this.Price_Response_Details_.GroupName=this.Barcode_.GroupName;
    this.Price_Response_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
    this.Price_Response_Details_.HSNCODE=this.Barcode_.HSNCODE;
    this.Price_Response_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
    this.Price_Response_Details_.Item_Code=this.Barcode_.Item_Code;  
}
Get_Stock_Item() {
    if (typeof this.Item_ === 'string') {
        this.Price_Response_Details_.ItemName = this.Item_;
        this.Price_Response_Details_.ItemId = 0;
        this.Price_Response_Details_.Item_Code = '';
        return;
    }
    this.Stock_Temp.ItemId = this.Item_ ? this.Item_.ItemId : 0;
    this.Stock_Temp.ItemName = this.Item_ ? this.Item_.ItemName : '';
    this.Stock_ = Object.assign({}, this.Stock_Temp);
    debugger;
    if(this.Item_ != null || this.Item_ != undefined)
    {
        if(this.Item_.ItemId != null || this.Item_.ItemId != undefined)
            {
                this.Item_Temp.Item_Code=this.Item_.Item_Code;
                 this.Item_Temp.ItemId=this.Item_.ItemId;
                 this.Barcode_=Object.assign({},this.Item_Temp);                 
                this.Price_Response_Details_.ItemId=this.Item_.ItemId;
                this.Price_Response_Details_.ItemName=this.Item_.ItemName;
                this.Price_Response_Details_.UnitId=this.Item_.UnitId;
                this.Price_Response_Details_.UnitName=this.Item_.UnitName;
                this.Price_Response_Details_.MRP=this.Item_.MRP;
                this.Price_Response_Details_.PurchaseRate=this.Item_.PurchaseRate;
                const itemAny: any = this.Item_ as any;
                this.Price_Response_Details_.Description=itemAny.Description || '';
                this.Price_Response_Details_.Model=itemAny.ModelName || itemAny.Model || '';
                this.Price_Response_Details_.Brand=itemAny.BrandName || itemAny.Brand || '';
                this.Price_Response_Details_.Stock=this.Item_.Quantity;
                this.Price_Response_Details_.UnitPrice=this.Item_.SaleRate;
                this.Price_Response_Details_.ItemName=this.Item_.ItemName;
                this.Price_Response_Details_.GroupId=this.Item_.GroupId;
                this.Price_Response_Details_.GroupName=this.Item_.GroupName;
                this.Price_Response_Details_.HSNMasterId=this.Item_.HSNMasterId;
                this.Price_Response_Details_.HSNCODE=this.Item_.HSNCODE;
                this.Price_Response_Details_.HSNMasterId=this.Item_.HSNMasterId;
                this.Price_Response_Details_.Item_Code=this.Item_.Item_Code; 
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
    debugger;
    if(this.currency.CurrencyDetails_Id>0){
                MainCurrency = this.currency.CurrecnyName;
                SubCurrency = this.currency.SubCurrecnyName == null ? '' : this.currency.SubCurrecnyName;
    }else{
        MainCurrency = 'OMR';
        SubCurrency = 'BZ';
    }
    // Split amount into rupees and paise
    const parts = amount.toString().split(".");
    const rupeesPart = parseInt(parts[0], 10);
    const paisePart = parts.length > 1 ? parseInt(parts[1].substring(0, 3), 10) : 0; // Only handle three decimal places
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

  Delete_Price_Response_Detail(itemIndex){
    this.Price_Response_Details_Data.splice(itemIndex, 1);
    console.log('Price_Response_Details_Data: ', this.Price_Response_Details_Data);
    this.addBlankRows();
    this.Final_Amounts();
  } 
  
  Edit_Price_Response_Detail(Sales_Details_e:Price_Response_Details, index){
    this.Price_Response_Details_Index=index;
debugger;
    this.Barcode_Temp_.StockId=Sales_Details_e.StockId;
    this.Barcode_Temp_.Item_Code=Sales_Details_e.Item_Code;
    this.Barcode_=Object.assign({},this.Barcode_Temp_);

    this.Item_Temp.ItemId=Sales_Details_e.ItemId;
    this.Item_Temp.ItemName=Sales_Details_e.ItemName;

    this.Item_=Object.assign({},this.Item_Temp);
    this.Price_Response_Details_=Object.assign({},Sales_Details_e);
  }
  duplicate(){
    // this.Customer_ = new Client_Accounts();;
    // this.Address1 = ''
    // this.Address2 = ''
    // this.Address3 = ''
    // this.Address4 = ''
    // this.Vatin = ''
    this.Edit_Sales = 0;
    this.Price_Response_Master_.Price_Response_Master_Id = 0;
    // this.Price_Response_Master_.Delivery_Address1 = '';
    // this.Price_Response_Master_.Delivery_Address2 = '';
    // this.Price_Response_Master_.Delivery_Address3 = '';
    // this.Price_Response_Master_.Delivery_Address4 = '';
    this.Price_Response_Master_.Price_RequestNo = '0'
    this.Sales_Print=true;
    this.purchasePendingView = false;
    this.deliveryPendingView = false;
    this.invoicePendingView = false;
    this.performaPendingView = false;
    this.packingListView = false;
    this.poListView = false;
    this.invoiceListView = false;
    this.proformaListView = false;
    this.doListView = false;
    this.packingListPendingView = false;
    this.Price_Response_Master_.EntryDate=new Date().toString();
    this.Price_Response_Master_.EntryDate=this.formatDate(this.Price_Response_Master_.EntryDate); 
    setTimeout(() => {
        if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
  }
  newPrice_Request(){
    this.Price_Response_Master_= new Price_Response_Master();
    this.Edit_Sales = 0;
    this.Clr_Sales_Master();
    this.Clr_Sales_Details();
    this.Sales_Print=true;
    this.Price_Response_Details_Data=[];
    this.CGST_SUM=0;
    this.SGST_SUM=0;
    this.GST_Sum=0;
    this.Tot_discount=0;
    this.Tot_Cess=0;
    this.Tot_Amount=0;
    this.Tot_Net=0;
    this.Tot_Gross=0;    
    this.proformaListView = false;
    this.doListView = false;
    this.poListView = false;
    this.invoiceListView = false;
    this.packingListView = false;
    this.performaPendingView = false;
    this.invoicePendingView = false;
    this.deliveryPendingView = false;
    this.purchasePendingView = false;
    this.packingListPendingView = false;
    setTimeout(() => {
        if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
  }
  Proforma_Pending_Click(){
    this.performaPendingView = true;
    this.packingListView = false;
    this.poListView = false;
    this.invoiceListView = false;
    this.proformaListView = false;
    this.doListView = false;
    this.invoicePendingView = false;
    this.deliveryPendingView = false;
    this.purchasePendingView = false;
    this.packingListPendingView = false;
    this.Sales_Master_Service_.Load_Profoma_Items_Pending_List_ByQuotation(this.Price_Response_Master_.Price_Response_Master_Id).subscribe(Rows => {
     
    this.performaPendingData=Rows[0];
    })
    setTimeout(() => {
        if (this.bottomDiv5) {
          this.bottomDiv5.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
  }
  Invoice_Pending_Click(){
    this.invoicePendingView = true;
    this.performaPendingView = false;
    this.packingListView = false;
    this.poListView = false;
    this.invoiceListView = false;
    this.proformaListView = false;
    this.doListView = false;
    this.deliveryPendingView = false;
    this.purchasePendingView = false;
    this.packingListPendingView = false;
    this.Sales_Master_Service_.Load_Invoice_Items_Pending_List_ByQuotation(this.Price_Response_Master_.Price_Response_Master_Id).subscribe(Rows => {
       this.invoicePendingData=Rows[0];
        })
    setTimeout(() => {
        if (this.bottomDiv6) {
          this.bottomDiv6.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
  }
  Delivery_Pending_Click(){
    this.deliveryPendingView = true;
    this.invoicePendingView = false;
    this.performaPendingView = false;
    this.packingListView = false;
    this.poListView = false;
    this.invoiceListView = false;
    this.proformaListView = false;
    this.doListView = false;
    this.purchasePendingView = false;
    this.packingListPendingView = false;
    this.Sales_Master_Service_.Load_Delivery_Items_Pending_List_ByQuotation(this.Price_Response_Master_.Price_Response_Master_Id).subscribe(Rows => {
       this.deliveryPendingData=Rows[0];
        })
    setTimeout(() => {
        if (this.bottomDiv7) {
          this.bottomDiv7.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
  }
  Purchase_Pending_Click(){
    this.purchasePendingView = true;
    this.deliveryPendingView = false;
    this.invoicePendingView = false;
    this.performaPendingView = false;
    this.packingListView = false;
    this.poListView = false;
    this.invoiceListView = false;
    this.proformaListView = false;
    this.doListView = false;
    this.packingListPendingView = false;
    this.Sales_Master_Service_.Load_Purchase_Items_Pending_List_ByQuotation(this.Price_Response_Master_.Price_Response_Master_Id).subscribe(Rows => {
       debugger;
        this.purchasePendingData=Rows[0];
        })
    setTimeout(() => {
        if (this.bottomDiv8) {
          this.bottomDiv8.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
  }
  printAcknowledgment(){
    this.printAcknowledgeCharge1per = false;
    this.printAcknowledgeChargeAmount1 = false;
    this.printAcknowledgeChargeAmount2 = false;
    this.printAcknowledgeVAT_Amount = false;
    this.printAcknowledgeDiscount_Description = false;
    this.printAcknowledgeAdditional_Discount = false;
    this.printAcknowledgeRoundoff_Amt = false;
    this.printAcknowledgeTotalDiscount =false;
    if(this.Price_Response_Master_.Charge1per != '')
        if(this.Price_Response_Master_.Charge1per != null )
           if(this.Price_Response_Master_.Charge1per != undefined )
           if(this.Price_Response_Master_.Charge1per.toString() != '0')
            if(this.Price_Response_Master_.Charge1per.toString() != 'null')
                    if(this.Price_Response_Master_.Charge1per.toString() != 'undefined')
                        if(this.Price_Response_Master_.Charge1per.toString() != '0.00')
                        {
                            this.printAcknowledgeCharge1per = true;
                        }                        
   if(this.Price_Response_Master_.charge1_Amount != 0)
       if(this.Price_Response_Master_.charge1_Amount != null)
           if(this.Price_Response_Master_.charge1_Amount != undefined )
      if( this.Price_Response_Master_.charge1_Amount.toString() != '0')
   if( this.Price_Response_Master_.charge1_Amount.toString() != 'null')
       if( this.Price_Response_Master_.charge1_Amount.toString() != 'undefined' )
       if( this.Price_Response_Master_.charge1_Amount.toString() != '0.000')
    {
        this.printAcknowledgeChargeAmount1 = true;
    }
   if(this.Price_Response_Master_.charge2_Amount != 0)
       if(this.Price_Response_Master_.charge2_Amount != null)
           if(this.Price_Response_Master_.charge2_Amount != undefined )
      if( this.Price_Response_Master_.charge2_Amount.toString() != '0')
   if( this.Price_Response_Master_.charge2_Amount.toString() != 'null')
       if( this.Price_Response_Master_.charge2_Amount.toString() != 'undefined' )
       if( this.Price_Response_Master_.charge2_Amount.toString() != '0.000')
    {
        this.printAcknowledgeChargeAmount2 = true;
    }
    if(this.Price_Response_Master_.TotalDiscount != 0)
        if(this.Price_Response_Master_.TotalDiscount != null )
           if(this.Price_Response_Master_.TotalDiscount != undefined )
           if(this.Price_Response_Master_.TotalDiscount.toString() != '0')
            if(this.Price_Response_Master_.TotalDiscount.toString() != 'null')
                    if(this.Price_Response_Master_.TotalDiscount.toString() != 'undefined')
                        if(this.Price_Response_Master_.TotalDiscount.toString() != '0.000')
                        {
                            this.printAcknowledgeTotalDiscount = true;
                        }
    if(this.Price_Response_Master_.VAT_Amount != 0)
        if(this.Price_Response_Master_.VAT_Amount != null )
           if(this.Price_Response_Master_.VAT_Amount != undefined )
           if(this.Price_Response_Master_.VAT_Amount.toString() != '0')
            if(this.Price_Response_Master_.VAT_Amount.toString() != 'null')
                    if(this.Price_Response_Master_.VAT_Amount.toString() != 'undefined')
                        {
                            this.printAcknowledgeVAT_Amount = true;
                        }

                        if(this.Price_Response_Master_.Discount_Description != '')
                            if(this.Price_Response_Master_.Discount_Description != null )
                               if(this.Price_Response_Master_.Discount_Description != undefined )
                               if(this.Price_Response_Master_.Discount_Description.toString() != '0')
                                if(this.Price_Response_Master_.Discount_Description.toString() != 'null')
                                        if(this.Price_Response_Master_.Discount_Description.toString() != 'undefined')
                                            {
                                                this.printAcknowledgeDiscount_Description = true;
                                            }
                                            if(this.Price_Response_Master_.Additional_Discount != 0)
                                                if(this.Price_Response_Master_.Additional_Discount != null )
                                                   if(this.Price_Response_Master_.Additional_Discount != undefined )
                                                   if(this.Price_Response_Master_.Additional_Discount.toString() != '0')
                                                    if(this.Price_Response_Master_.Additional_Discount.toString() != 'null')
                                                            if(this.Price_Response_Master_.Additional_Discount.toString() != 'undefined')
                                                                {
                                                                    this.printAcknowledgeAdditional_Discount = true;
                                                                }
                                                                if(this.Price_Response_Master_.Roundoff_Amt != 0)
                                                                    if(this.Price_Response_Master_.Roundoff_Amt != null )
                                                                       if(this.Price_Response_Master_.Roundoff_Amt != undefined )
                                                                       if(this.Price_Response_Master_.Roundoff_Amt.toString() != '0')
                                                                        if(this.Price_Response_Master_.Roundoff_Amt.toString() != 'null')
                                                                                if(this.Price_Response_Master_.Roundoff_Amt.toString() != 'undefined')
                                                                                    {
                                                                                        this.printAcknowledgeRoundoff_Amt = true;
                                                                                    }
    if(this.currency.CurrencyDetails_Id == 0)
    {
        this.CurrecnyName = '';
    }
    else
    {
        this.CurrecnyName = this.currency.CurrecnyName;
    }
    this.Price_Response_Master_.EntryDate = this.formatDate(this.Price_Response_Master_.EntryDate)
    this.Price_Response_Master_.PrintDate = this.formatPrintDate(this.Price_Response_Master_.EntryDate);    
   // this.Customer_Name=this.Customer_.Client_Accounts_Name;
    debugger
    // for (let i = 0; i < this.currencyData.length; i++) {
    //     if(this.Price_Response_Master_.CurrencyId = this.currencyData[i].CurrencyDetails_Id){
    //         this.currency.CurrecnyName = this.currencyData[i].CurrecnyName
    //     }
        
    //    }
    setTimeout(()=>{
        let popupWinindow
        let innerContents = document.getElementById("Print_Div2").innerHTML;
        popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();   
        // popupWinindow.onafterprint = () => {
        //     popupWindow.close();
        // };
    })
  }
  /**** Added on 14-10-2024 */
//   Load_Delivery_Order_Master(){
//     debugger
//     this.Sales_Master_Service_.Load_Delivery_Order_Master(this.DeliveryOrderMaster_Id).subscribe(result=>{
//         this.Price_Response_Master_=new Price_Response_Master()
//         this.Price_Response_Master_=Object.assign({},result[0][0]); 
//         this.Price_Response_Master_.PaymentTermValue=result[0][0].Payment_Term_Value
//         this.Price_Response_Master_.POnumber = result[0][0].POnumber;
//         this.Entry_View = true;
// debugger
//         this.Sales_Master_Service_.Search_Customer_Typeahead('1,2,3,39,36','').subscribe(Rows => {     
//             if (Rows != null) {
//                 debugger;
//                 this.Customer_Data = Rows[0];
//                 for (var i = 0; i < this.Customer_Data.length; i++) {
//                     if (this.Customer_Data[i].Client_Accounts_Id == result[0][0].Account_Party_Id) {
//                         this.Customer_ = this.Customer_Data[i];
//                         this.Address1 = this.Customer_Data[i].Address1;
//                         this.Address2 = this.Customer_Data[i].Address2;
//                         this.Address3 = this.Customer_Data[i].Address3;
//                         this.Address4 = this.Customer_Data[i].Address4;
//                     }
//                 }
//                 for (var i = 0; i < this.currencyData.length; i++) {
//                     if (this.currencyData[i].CurrencyDetails_Id == result[0][0].CurrencyId) {
//                         this.currency = this.currencyData[i];
//                     }
//                 }               
//                 for(var i = 0; i< this.PaymentTermData.length; i++)
//                     {
//                         if(this.PaymentTermData[i].payment_Term_ID == result[0][0].PaymentTerms)
//                         {
//                             this.Payment_Term = this.PaymentTermData[i];
//                         }
//                     }            
//             }
//             });        
//         this.Sales_Master_Service_.Get_Performa_invoice_Details(result[0][0].PerformaInvoiceMaster_Id).subscribe(Rows => { 
//             if (Rows != null) {
//                 this.Delivery_Order_Details_Data = Rows[0];
//                 this.Final_Amounts();                
//                 }
//                    this.issLoading = false;
//                },
//              Rows => {
//                     this.issLoading = false;
//                const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
//             });
//     })
// }
/**** Added on 15-10-2024 */
    Load_Price_Response_Master()
    {
        this.Entry_View=true;
        this.issLoading = true
        this.Price_Response_Service_.Get_Price_Response(this.Price_Response_Master_Id).subscribe((response: any)=>{
            this.Price_Response_Master_=new Price_Response_Master();
            const Rows = response.success ? response.data : (Array.isArray(response) ? response : []);
            if (!Rows || !Rows[0] || !Rows[0][0]) {
                this.issLoading = false;
                return;
            }
            const masterRow = Rows[0][0];
            this.Price_Response_Master_Data=Rows[0];
            this.Price_Response_Master_=Object.assign({},masterRow); 
            this.Price_Response_Master_.Price_RequestNo = this.Price_Response_Master_.Price_Response_No;
            this.Price_Response_Master_.PaymentTermValue=masterRow.PaymentTermValue
            this.Price_Response_Master_.POnumber = masterRow.POnumber;          
        this.Edit_Sales=1;
        this.Sales_Print = false;    
        this.Customer_Temp.Client_Accounts_Id=masterRow.Account_Party_Id;
        this.Customer_Temp.Client_Accounts_Name=masterRow.Customer;
        this.Customer_=this.Customer_Temp;
        this.Price_Response_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
        this.Price_Response_Master_.Customer=this.Price_Response_Master_.Customer_Name; 
        this.Price_Response_Master_.Supplier_Id=masterRow.Account_Party_Id;
        this.Price_Response_Master_.Supplier_Name=masterRow.Customer;
        
        this.Price_Response_Master_Id_Edit = this.Price_Response_Master_Id;

    this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39',"").subscribe(Rows => {  
        if (Rows != null) {
            this.Customer_Data = Rows[0];
            for(let i=0;i<this.Customer_Data.length;i++){
                if(this.Customer_Data[i].Client_Accounts_Id == this.Price_Response_Master_.Account_Party_Id){
                    this.Customer_Temp.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                    this.Customer_Temp.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                     this.Customer_= this.Customer_Temp;
                  
                    this.Price_Response_Master_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                    this.Price_Response_Master_.Customer=Rows[0][i].Client_Accounts_Name;
                    this.Price_Response_Master_.Customer_Name=Rows[0][i].Client_Accounts_Name;

                    this.Price_Response_Master_.Address1 = Rows[0][i].Address1;
                    this.Price_Response_Master_.Address2 = Rows[0][i].Address2;
                    this.Price_Response_Master_.Address3 = Rows[0][i].Address3;
                    this.Price_Response_Master_.Address4 = Rows[0][i].Address4;
                    this.Price_Response_Master_.Vatin = Rows[0][i].GSTNo;

                    this.Address1 = Rows[0][i].Address1;
                    this.Address2 = Rows[0][i].Address2;
                    this.Address3 = Rows[0][i].Address3;
                    this.Address4 = Rows[0][i].Address4;
                    this.Vatin = Rows[0][i].GSTNo;
                }
            }                    
        }
    },);
    
        for(let i=0;i<this.currencyData.length;i++)
        {
        if(this.currencyData[i].CurrencyDetails_Id == this.Price_Response_Master_.CurrencyId){
        this.currency = this.currencyData[i]
        }
        }
        debugger;
        for(let i=0;i<this.PaymentTermData.length;i++){
        if(this.PaymentTermData[i].payment_Term_ID == this.Price_Response_Master_.Payment_Term_Description){
        this.Payment_Term = this.PaymentTermData[i]
        }
        }
    console.log("QUO - Outside Get_Price_Response_Details ");
    this.Price_Response_Service_.Get_Price_Response(masterRow.Price_Response_Master_Id).subscribe((response: any) => { 
        const Rows_Details = response.success ? response.data[1] : (response[1] || []);        debugger;
        console.log("QUO - Inside Get_Price_Response_Details ");
        console.log('QUO - Rows 1: ', response);
            if (Rows_Details != null) {
            this.Price_Response_Details_Data = Rows_Details;
            console.log('QUO - Price_Response_Details_Data: ', this.Price_Response_Details_Data);
            this.Calculate_Price_Response_Details_Amount();
            this.Final_Amounts();
            this.addBlankRows();        
            }
            this.issLoading = false;
        },
        Rows => {
                this.issLoading = false;
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
        });   
    })
}
      makeInvoice(){
        localStorage.setItem('Price_RequestNo', this.Price_Response_Master_.Price_Response_Master_Id.toString());
        this.router.navigateByUrl(`/Invoice`);
      }
      Edit_Price_Request_SalesMaster(Sales_Master_Id)
      {
        localStorage.setItem('Sales_Master_Id', Sales_Master_Id.toString());
        this.router.navigateByUrl(`/Invoice`); 
      }
      Invoice_Click(){
        this.invoiceListView = true;
        this.proformaListView = false;
        this.doListView = false;
        this.poListView = false;
        this.packingListView = false
        this.performaPendingView=false;
        this.invoicePendingView = false;
        this.deliveryPendingView = false;
        this.purchasePendingView = false;
        this.packingListPendingView = false;    
        this.Sales_Master_Service_.Get_Salesmaster_Quotation_Details(this.Price_Response_Master_Id_Edit).subscribe(Rows => {
            this.Sales_Master_Data=Rows[0];    
            });
        setTimeout(() => {
            if (this.bottomDiv1) {
              this.bottomDiv1.nativeElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
      }
      DO_Click(){
        this.doListView = true;
        this.invoiceListView = false;
        this.proformaListView = false;
        this.poListView = false;
        this.packingListView = false
        this.performaPendingView=false;
        this.invoicePendingView = false;
        this.deliveryPendingView = false;
        this.purchasePendingView = false;
        this.packingListPendingView = false;
        this.Sales_Master_Service_.Get_DeliveryOrder_Quotation_Details(this.Price_Response_Master_Id_Edit).subscribe(Rows => {
            this.DO_Data=Rows[0];    
            });            
        setTimeout(() => {
            if (this.bottomDiv2) {
              this.bottomDiv2.nativeElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
      }    
      makeDO(){
        debugger
        localStorage.setItem('Price_RequestNo', this.Price_Response_Master_.Price_Response_Master_Id.toString());
        debugger
        this.router.navigateByUrl(`/Delivery_Order`);
      }
      Edit_Price_Request_DeliveryOrder(DeliveryOrderMaster_Id)
      {
        localStorage.setItem('DeliveryOrderMaster_Id', DeliveryOrderMaster_Id.toString());
        this.router.navigateByUrl(`/Delivery_Order`); 
      }
      PackingList_Click(){
        this.packingListView = true
        this.poListView = false;
        this.invoiceListView = false;
        this.proformaListView = false;
        this.doListView = false;
        this.performaPendingView=false;
        this.invoicePendingView = false;
        this.deliveryPendingView = false;
        this.purchasePendingView = false;
        this.packingListPendingView = false;
        debugger;
        this.Sales_Master_Service_.Get_PackingList_Quotation_Details(this.Price_Response_Master_Id_Edit).subscribe(Rows => {
            debugger;
        this.packinglist_details_Data=Rows[0];
         })
        setTimeout(() => {
            if (this.bottomDiv4) {
              this.bottomDiv4.nativeElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
      }    
      makePackingList(){
        localStorage.setItem('Price_RequestNo', this.Price_Response_Master_.Price_Response_Master_Id.toString());
        this.router.navigateByUrl(`/Packing_List`);
      }
      Edit_Price_Request_PackingList(PackingList_Master_Id)
      {
        localStorage.setItem('PackingList_Master_Id', PackingList_Master_Id.toString());
        this.router.navigateByUrl(`/Packing_List`); 
      }
      PO_Click(){
        this.poListView = true;
        this.invoiceListView = false;
        this.proformaListView = false;
        this.doListView = false;
        this.packingListView = false
        this.performaPendingView=false;
        this.invoicePendingView = false;
        this.deliveryPendingView = false;
        this.purchasePendingView = false;
        this.packingListPendingView = false;
        this.Sales_Master_Service_.Get_PurchaseOrder_Quotation_Details(this.Price_Response_Master_Id_Edit).subscribe(Rows => {
            debugger
        this.Purchase_Orderdetails_Data=Rows[0];    
        })
        setTimeout(() => {
            if (this.bottomDiv3) {
              this.bottomDiv3.nativeElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
      }    
      makePO(){
        debugger;
        localStorage.setItem('Price_RequestNo', this.Price_Response_Master_.Price_Response_Master_Id.toString());
        this.router.navigateByUrl(`/Purchase_order`);
      }
      Edit_Price_Request_PurchaseOrder(PurchaseOrderMaster_Id)
      {
        localStorage.setItem('PurchaseOrderMaster_Id', PurchaseOrderMaster_Id.toString());
        this.router.navigateByUrl(`/Purchase_order`); 
      }
      /*** Added on 19-10-2024 */
      PackingList_Pending_Click(){
        this.deliveryPendingView = false;
        this.invoicePendingView = false;
        this.performaPendingView = false;
        this.packingListView = false;
        this.poListView = false;
        this.invoiceListView = false;
        this.proformaListView = false;
        this.doListView = false;
        this.purchasePendingView = false;
        this.packingListPendingView = true;    
        this.Sales_Master_Service_.Load_PackingList_Items_Pending_List_ByQuotation(this.Price_Response_Master_.Price_Response_Master_Id).subscribe(Rows => {
            this.packinglistPendingData=Rows[0];
            })
        setTimeout(() => {
            if (this.bottomDiv7) {
              this.bottomDiv7.nativeElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
      }
      /*** Edited on 22-10-2024 */
      Proforma_Click(){
        this.proformaListView = true;
        this.invoiceListView = false;
        this.doListView = false;
        this.poListView = false;
        this.packingListView = false
        this.performaPendingView=false;
        this.invoicePendingView = false;
        this.deliveryPendingView = false;
        this.purchasePendingView = false;
        this.packingListPendingView = false;
        this.Sales_Master_Service_.Get_Proforma_Quotation_Details(this.Price_Response_Master_Id_Edit).subscribe(Rows => {
        this.performainvoice_Data=Rows[0];    
        });
        setTimeout(() => {
            if (this.bottomDiv) {
              this.bottomDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
      }
      closeproformaListView(){
        debugger;
        this.proformaListView = false;
        this.invoiceListView = false;
        this.doListView = false;
        this.poListView = false;
        this.packingListView = false
        this.performaPendingView=false;
        this.invoicePendingView = false;
        this.deliveryPendingView = false;
        this.purchasePendingView = false;
        this.packingListPendingView = false;
        setTimeout(() => {
            if (this.topDiv) {
                this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
      }
      makeProforma(){ 
        debugger;
        localStorage.setItem('Price_RequestNo', this.Price_Response_Master_.Price_Response_Master_Id.toString());
        this.router.navigateByUrl(`/Performa_Invoice`);
      }
      Edit_Price_Request_Proforma(PerformaInvoiceMaster_Id)
      {
        localStorage.setItem('PerformaInvoiceMaster_Id', PerformaInvoiceMaster_Id.toString());
        this.router.navigateByUrl(`/Performa_Invoice`); 
      } 

      Load_Vat_Percentage() 
      {   
      this.Sales_Master_Service_.Load_Vat_Percentage().subscribe(Rows => {    
      if (Rows != null) {
      const vatRows = Array.isArray(Rows) && Array.isArray(Rows[0]) ? Rows[0] : [];
      this.Default_Vat_Percentage = vatRows.length > 0 ? vatRows[0].vat_percentage : 0;
   }
   this.issLoading = false;
   },
   Rows => {
   this.issLoading = false;
   const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
   });
  }
  Price_Response_Master_Desc2_Break()
  {
    debugger;
    let words = this.Price_Response_Master_.Description2.split(' ');
    let result = '';
    for (let i = 0; i < words.length; i++) {
      result += words[i] + ' ';
      if ((i + 1) % 3 === 0) {
        result += '\n'; // Add line break after every 3 words
      }
    }
    return result;
  }
  Calculate_Discount_Percent()
  {
    let addDiscCheck = 1;
    let discountper = '0';
    debugger;
    if(Number(this.Price_Response_Master_.Additional_Discount)>0){
        this.Price_Response_Master_.Discount_Description = (this.Price_Response_Master_.Additional_Discount * 100/this.Price_Response_Master_.TotalAmount).toString()
        discountper = Number(this.Price_Response_Master_.Discount_Description).toFixed(3);
        this.Price_Response_Master_.Discount_Description = discountper;  
    }else{
        this.Price_Response_Master_.Discount_Description = '0.000'
    }
    debugger;
    this.addDiscCheck = addDiscCheck;
    this.Final_Amounts();
}
// Calculate_Discount_Amount()
// {
//   debugger;
//   if(Number(this.Price_Response_Master_.Discount_Description)>0){
//     this.Price_Response_Master_.Additional_Discount = Number(this.Price_Response_Master_.TotalAmount) * (Number(this.Price_Response_Master_.Discount_Description)/ 100);
//     this.Price_Response_Master_.Additional_Discount = Number(this.Price_Response_Master_.Additional_Discount.toFixed(3));   
// }else{
//     this.Price_Response_Master_.Additional_Discount = 0.000
// }
//   this.Final_Amounts();
// }

  Final_Amounts()
  {      
      this.Tot_Gross=0,this.Tot_discount=0,this.Tot_Net=0,this.Price_Response_Master_.TotalAmount=0;this.Price_Response_Master_.Basic_Discount=0
      for(var i = 0; i< this.Price_Response_Details_Data.length ; i++)
      {  
          this.Price_Response_Master_.TotalAmount = Number(this.Price_Response_Master_.TotalAmount) + Number(this.Price_Response_Details_Data[i].Amount);  
          // Number(this.Price_Response_Details_Data[i].UnitPrice) * Number(this.Price_Response_Details_Data[i].Quantity);
          this.Price_Response_Master_.TotalAmount = Number(this.Price_Response_Master_.TotalAmount.toFixed(3));          
          this.Tot_discount = Number(this.Tot_discount)+  Number(this.Price_Response_Details_Data[i].Item_Discount_Amount);
          //(Number(this.Price_Response_Details_Data[i].Unit_Discount) * Number(this.Price_Response_Details_Data[i].Quantity) );
          this.Tot_discount= Number(this.Tot_discount.toFixed(3));  
          this.Price_Response_Master_.Basic_Discount = this.Price_Response_Master_.Basic_Discount + Number(this.Price_Response_Details_Data[i].Item_Discount_Amount);
          this.Price_Response_Master_.Basic_Discount = Number(this.Price_Response_Master_.Basic_Discount.toFixed(3));      
      }  
      this.Price_Response_Master_.TotalAmount = Number(this.Price_Response_Master_.TotalAmount.toFixed(3));
      this.Tot_discount = Number(this.Tot_discount.toFixed(3));
      if(this.addDiscCheck == 0)
      {
        if(Number(this.Price_Response_Master_.Discount_Description)>0){
            this.Price_Response_Master_.Additional_Discount = Number(this.Price_Response_Master_.TotalAmount) * (Number(this.Price_Response_Master_.Discount_Description)/ 100);
            this.Price_Response_Master_.Additional_Discount = Number(this.Price_Response_Master_.Additional_Discount.toFixed(3));    
            this.addDiscCheck = 0;        
        }else{
            this.Price_Response_Master_.Additional_Discount = 0.000
            this.addDiscCheck = 0;
        }
        this.addDiscCheck = 0;
      }
      debugger;
      this.addDiscCheck = 0;
      //this.Price_Response_Master_.Discount_Description = (this.safeNumber(this.Price_Response_Master_.Additional_Discount) * 100)/this.Price_Response_Master_.TotalAmount
      this.Price_Response_Master_.TotalDiscount = Number(this.Tot_discount.toFixed(3))+ Number(this.Price_Response_Master_.Additional_Discount);
      this.Price_Response_Master_.TotalDiscount = Number(this.Price_Response_Master_.TotalDiscount.toFixed(3));     
      if(this.Price_Response_Master_.Charge1per>'0'){
          this.Price_Response_Master_.charge1_Amount = (Number(this.Price_Response_Master_.TotalAmount.toFixed(3)) - Number(this.Price_Response_Master_.Additional_Discount))* (Number(this.Price_Response_Master_.Charge1per)/100)
          this.Price_Response_Master_.charge1_Amount = Number(this.Price_Response_Master_.charge1_Amount.toFixed(3))
      }else{
          this.Price_Response_Master_.charge1_Amount =  0.000;
      }      
      this.Total = Number(this.Price_Response_Master_.TotalAmount.toFixed(3))-Number(this.Price_Response_Master_.TotalDiscount.toFixed(3)) + 
      this.safeNumber(Number(this.Price_Response_Master_.charge2_Amount)) + Number(this.Price_Response_Master_.charge1_Amount.toFixed(3))
      this.Total = Number(this.Total.toFixed(3))
      this.Price_Response_Master_.VAT_Amount = 0.000;
      if(this.Price_Response_Master_.VAT_Percentage>0){
          this.Price_Response_Master_.VAT_Amount = this.Total * (this.Price_Response_Master_.VAT_Percentage/100)
      }
      this.Price_Response_Master_.VAT_Amount = Number(this.Price_Response_Master_.VAT_Amount.toFixed(3))    
      this.Price_Response_Master_.TaxableAmount = Number(this.Total.toFixed(3));
      this.Price_Response_Master_.Total_Amount = this.Total + this.Price_Response_Master_.VAT_Amount
      this.Price_Response_Master_.Total_Amount = Number(this.Price_Response_Master_.Total_Amount.toFixed(3))
      this.Price_Response_Master_.NetTotal = Number((this.Price_Response_Master_.Total_Amount - this.safeNumber(this.Price_Response_Master_.Roundoff_Amt)).toFixed(3))
      this.Price_Response_Master_.NetTotal = Number(this.Price_Response_Master_.NetTotal.toFixed(3))
      this.Price_Response_Master_.TotalAmount = parseFloat(this.Price_Response_Master_.TotalAmount.toFixed(3));
      this.Price_Response_Master_.Total_Quantity = this.Price_Response_Details_Data.reduce((acc, curr) => acc + Number(curr.Quantity || 0), 0);
      this.Price_Response_Master_.Amount_In_Words = this.numberToWordsIndianCurrency(this.Price_Response_Master_.NetTotal)       
     debugger;
  //this.Clr_Sales_Edit_Data();
  }
//   Export() {
//     this.Sales_Master_Service_.exportExcel(this.Price_Response_Master_Data,"Price_Request" );
//   }
  Export() {
    const filteredData = this.Price_Response_Master_Data.map((receipt: any, index: number) => {
        return {
            No: index + 1,                  
            CustomerName: receipt["Customer"],
            Price_RequestNo: receipt["Price_RequestNo"],
            Date: receipt["FormattedEntryDate"],
            Amount: receipt["NetTotal"],
        };
    });
    this.Sales_Master_Service_.exportExcel(filteredData,"Price_Request" );}
    /*** Added on 22-11-2024 */
    closeInvoiceListView(){
        debugger;
        this.proformaListView = false;
        this.invoiceListView = false;
        this.doListView = false;
        this.poListView = false;
        this.packingListView = false
        this.performaPendingView=false;
        this.invoicePendingView = false;
        this.deliveryPendingView = false;
        this.purchasePendingView = false;
        this.packingListPendingView = false;
        setTimeout(() => {
            if (this.topDiv) {
                this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
      }
      closeDoListView(){
        debugger;
        this.proformaListView = false;
        this.invoiceListView = false;
        this.doListView = false;
        this.poListView = false;
        this.packingListView = false
        this.performaPendingView=false;
        this.invoicePendingView = false;
        this.deliveryPendingView = false;
        this.purchasePendingView = false;
        this.packingListPendingView = false;
        setTimeout(() => {
            if (this.topDiv) {
                this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
      }
      closePoListView(){
        debugger;
        this.proformaListView = false;
        this.invoiceListView = false;
        this.doListView = false;
        this.poListView = false;
        this.packingListView = false
        this.performaPendingView=false;
        this.invoicePendingView = false;
        this.deliveryPendingView = false;
        this.purchasePendingView = false;
        this.packingListPendingView = false;
        setTimeout(() => {
            if (this.topDiv) {
                this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
      }
      closePackingListView(){
        debugger;
        this.proformaListView = false;
        this.invoiceListView = false;
        this.doListView = false;
        this.poListView = false;
        this.packingListView = false
        this.performaPendingView=false;
        this.invoicePendingView = false;
        this.deliveryPendingView = false;
        this.purchasePendingView = false;
        this.packingListPendingView = false;
        setTimeout(() => {
            if (this.topDiv) {
                this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
      }
      closeInvoicePendingView(){
        debugger;
        this.proformaListView = false;
        this.invoiceListView = false;
        this.doListView = false;
        this.poListView = false;
        this.packingListView = false
        this.performaPendingView=false;
        this.invoicePendingView = false;
        this.deliveryPendingView = false;
        this.purchasePendingView = false;
        this.packingListPendingView = false;
        setTimeout(() => {
            if (this.topDiv) {
                this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
      }
      closeDeliveryPendingView(){
        debugger;
        this.proformaListView = false;
        this.invoiceListView = false;
        this.doListView = false;
        this.poListView = false;
        this.packingListView = false
        this.performaPendingView=false;
        this.invoicePendingView = false;
        this.deliveryPendingView = false;
        this.purchasePendingView = false;
        this.packingListPendingView = false;
        setTimeout(() => {
            if (this.topDiv) {
                this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
      }
      closePurchasePendingView(){
        debugger;
        this.proformaListView = false;
        this.invoiceListView = false;
        this.doListView = false;
        this.poListView = false;
        this.packingListView = false
        this.performaPendingView=false;
        this.invoicePendingView = false;
        this.deliveryPendingView = false;
        this.purchasePendingView = false;
        this.packingListPendingView = false;
        setTimeout(() => {
            if (this.topDiv) {
                this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
      }
      closePackingListPendingView(){
        debugger;
        this.proformaListView = false;
        this.invoiceListView = false;
        this.doListView = false;
        this.poListView = false;
        this.packingListView = false
        this.performaPendingView=false;
        this.invoicePendingView = false;
        this.deliveryPendingView = false;
        this.purchasePendingView = false;
        this.packingListPendingView = false;
        setTimeout(() => {
            if (this.topDiv) {
                this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
      }
      getWordCount(itemName: string): number {
        if (!itemName) return 0; // Handle null or undefined Item_Name
        return itemName.split(/\s+/).filter(word => word).length;
      }  
      addBlankRows(): void {
        debugger;
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
        // this.Price_Response_Details_Data.forEach((item, index) => {
        //     item.ItemName = `Edited ${item.ItemName}`;
        //   });
        this.cdr.detectChanges();
        this.marginTopItemNameCount = false;
        console.clear();
        // Loop through and apply changes to all cells
        this.Price_Response_Details_Data.forEach((_, index) => {
          const cellId = `cell${index + 1}`;
          const cell = document.getElementById(cellId);    
          if (cell) {
            // Example: Apply a style or perform an action
            debugger
            tempht1 = cell ? cell.offsetHeight : 0 ;
            tempht1 -= 50;
            //  tempht1 -= 0;
            //  console.clear();            
             console.log("***********************************");
            console.log('tempht1 first: ', tempht1);
            if(this.Price_Response_Details_Data[index].ItemName.length > 96)
                {
                    this.marginTopItemNameCount = true;                    
                }
                // if(this.marginTopItemNameCount == true)
                // {
                //     tempht1 -= 30;
                // }
                console.log('tempht1 second: ', tempht1);    
                console.log('this.Price_Response_Details_Data[index].ItemName.length: ', this.Price_Response_Details_Data[index].ItemName.length);
            // if(this.Price_Response_Details_Data[index].Item_Code.length > 13)
            //     {
            //         this.marginTopItemNameCount = true;
            //     }        
            console.log('this.marginTopItemNameCount: ', this.marginTopItemNameCount);
            // if(this. Price_Response_Details_Data[index].ItemName.length )
            // var alenght=  this. Price_Response_Details_Data[index].ItemName.length % (100-this.Price_Response_Details_Data[index].ItemName.length);
            // console.log('this. Price_Response_Details_Data[index].ItemName.length: ', this. Price_Response_Details_Data[index].ItemName.length);
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
debugger;
             if (cellThr1 < 410 && (this.Price_Response_Details_Data.length < 18 && this.marginTopItemNameCount == false) 
                || (this.Price_Response_Details_Data.length < 15 && this.marginTopItemNameCount == true)) {   
                this.breakPage = false;                          //350
                nosOfBlankRows = (415 - cellThr1) / 12;
                if(nosOfBlankRows < 2) nosOfBlankRows +=2;
                // if(nosOfBlankRows > 25) nosOfBlankRows = 24;
            }
            else {
                // blank = blank + 2
                this.breakPage = true;
                if(cellThr1 < 300){cellThr1 = cellThr1 + (315-cellThr1)}
                cellThr1 = cellThr1 - 305;
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
            debugger
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
       // for (let x = 0; x <= this. Price_Response_Details_Data.length -1; x++) {
        //     console.log('document.getElementById(`cell${x+1}`);: ', document.getElementById(`cell${x+1}`));
        //   const cell1 = document.getElementById(`cell${x+1}`);
        // //   const cell2 = document.getElementById(`cellx${x+1}`);
        //   tempht1 = cell1 ? cell1.offsetHeight : 0;
        //   tempht2 = cell2 ? cell2.offsetHeight : 0;    
        //   if (tempht1 > tempht2) tempht2 = tempht1;
        // }
        // let totalCharCount = 0;
        // this.Price_Response_Details_Data.forEach(item => {
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
        // this.Price_Response_Details_Data.forEach(item => {
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
  
  Load_Brand_Dropdown() {
      this.Brand_Service_.Search_Brand('').subscribe(response => {
          const rows = (response && typeof response === 'object' && 'success' in response) ? response.data : response;
          this.BrandData = (Array.isArray(rows) && Array.isArray(rows[0])) ? rows[0] : (Array.isArray(rows) ? rows : []);
      }, err => {
          console.error('Error loading brands:', err);
          this.BrandData = [];
      });
  }

  Load_Model_Dropdown() {
      this.Model_Service_.Search_Model('').subscribe(response => {
          const rows = (response && typeof response === 'object' && 'success' in response) ? response.data : response;
          this.ModelData = (Array.isArray(rows) && Array.isArray(rows[0])) ? rows[0] : (Array.isArray(rows) ? rows : []);
      }, err => {
          console.error('Error loading models:', err);
          this.ModelData = [];
      });
  }
}

