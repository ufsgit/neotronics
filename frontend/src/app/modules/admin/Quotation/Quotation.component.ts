import { ChangeDetectorRef,Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, Renderer2, NgZone, Input, Pipe, PipeTransform, QueryList, ViewChildren  } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
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
import { DialogBox_Component } from '../DialogBox/DialogBox.component';
import { Quotation_Master } from '../../../models/Quotation_Master';
import { Company } from '../../../models/Company';
import { Quotation_Details } from '../../../models/Quotation_Details';
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
import { Sales_Master_Service } from '../../../services/Sales_Master.Service';
import { Requirement_Master_Service } from '../../../services/Requirement_Master.Service';
import { RequirementWorkflowService } from '../../../services/RequirementWorkflow.Service';
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
selector: 'app-Quotation',
templateUrl: './Quotation.component.html',
styleUrls: ['./Quotation.component.css'],
providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},DecimalPipe]
})

export class QuotationComponent implements OnInit, AfterViewInit  {
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
    this.Save_Quotation(1);
  }
  Quotation_Master_Data:Quotation_Master[]
Quotation_Master_:Quotation_Master= new Quotation_Master();
Quotation_Details_Data:Quotation_Details[];
Quotation_Details_Data1:Quotation_Details[];
Quotation_Details_:Quotation_Details= new Quotation_Details();

Quotation_Details_Temp_ : Quotation_Details = new Quotation_Details();
Item_ :Quotation_Details = new Quotation_Details();
Item_Temp:Quotation_Details= new Quotation_Details();
Barcode_:Quotation_Details= new Quotation_Details();

Barcode_Temp_:Quotation_Details= new Quotation_Details();

Bill_Type_Data:Bill_Type[]
Bill_Type_:Bill_Type= new Bill_Type();
Bill_Type_Temp:Bill_Type= new Bill_Type();
Bill_Type_Search:Bill_Type= new Bill_Type();
Item_Group_Search:Item_Group = new Item_Group();
Currency_Search:currencydetails = new currencydetails();

currency: currencydetails = new currencydetails();
currencyData: currencydetails[] = [];
Currency_Temp: currencydetails = new currencydetails();

Employee_Search:User_Details = new User_Details();
Payment_Term:payment_term = new payment_term();
Payment_Term_Data: payment_term[] = [];
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
Quotation_Details_Index:number=-1;
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
User_Type:string;
User_Type_Id:number;
Print_Company_:Company=new Company();
Image_Url:string;
Company_Sign:string;
Company_Seal:string;
Sales_Print:boolean;
Sale_EditIndex:number=-1;
Quotation_Master_Index:number=0;
Sale_Permission_Edit:boolean= false;
Sale_Permission_Edit_Temp:boolean= false;
Company_: Company = new Company();
Company_Temp: Company = new Company();
Company_Data: Company [];
Bank_Data:Client_Accounts[]
Bank_:Client_Accounts= new Client_Accounts();
Customer_Name:string="";
Sales_Master_Data1:[];UnitName="";Quantity=0;SaleRate=0;discount=0;unitDiscount=0;TotalAmount=0;availablity='';Discount_Description=0;subTotal=0;POnumber;QuotNo;partNo;
Sales_Master_1:Quotation_Master= new Quotation_Master();
Address1 ='';Address2 ='';Address3 ='';Address4 ='';Attention;totalAmount=0;Total=0;totalDiscount=0;amount1=0;amount2=0;amount3=0;
proformaListView = false;performainvoice_Data=[];invoiceListView = false;
Sales_Master_Data=[];doListView = false;DO_Data=[];poListView=false;Purchase_Orderdetails_Data=[];
packingListView = false;packinglist_details_Data=[];performaPendingView=false;performaPendingData=[];invoicePendingView = false;invoicePendingData=[];deliveryPendingView = false;
deliveryPendingData=[];purchasePendingView=false;purchasePendingData=[];printLetterhead:boolean = false;
/*** Added on 15-10-2024 */
SalesQuotationMaster_Id: number = 0;
/** Reference flow (RequirementMaster_Id) */
RequirementMaster_Id: number = 0;
/** Sequential flow helpers */
HasPurchaseOrder: boolean = false;
itemGroupData: Item_Group[];
itemGroup: Item_Group = new Item_Group();
itemGroup_Temp: Item_Group = new Item_Group();
EmployeeData: User_Details[];
Employee: User_Details = new User_Details();
Employee_Temp: User_Details = new User_Details();
/** Added on 16-10-2024 */
SalesQuotationMaster_Id_Edit: number;
/*** Added on 17-10-2024 */
packingListPendingView: Boolean;
/*** Added on 18-10-2024 */
PaymentTermData: payment_term[] = [];
/** Added on 19-10-2024 */
packinglistPendingData=[];
/** Added on 24-10-2024 */
Default_Vat_Percentage: number;

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
constructor(public Sales_Master_Service_: Sales_Master_Service, public currencydetails_Service_: currencydetails_Service, public User_Details_Service_: User_Details_Service, private route: ActivatedRoute, private router: Router, public dialogBox: MatDialog
        , private el: ElementRef, private zone: NgZone, private renderer: Renderer2, public purchaseordermaster_Service_: purchaseordermaster_Service, public Employee_Details_Service_: Employee_Details_Service, public Stock_Service_: Stock_Service,
        public Item_Group_Service_: Item_Group_Service, public payment_term_Service_: payment_term_Service, public Client_Accounts_Service_:Client_Accounts_Service,
        public Requirement_Master_Service_: Requirement_Master_Service,
        public RequirementWorkflowService_: RequirementWorkflowService,
        private cdr: ChangeDetectorRef
        // public decimalPipe: DecimalPipe
    ) { 
        this.Load_Bill_Type();       
        this.Load_Currency();
        this.Load_Item_Group();
        this.Load_Payment_Term();
        
        this.Load_Company() ;
        this.Load_Vat_Percentage();        
    }

ngOnInit() 
{
    debugger;
    this.User_Type=(localStorage.getItem('User_Type'));
    this.User_Type_Id=Number(localStorage.getItem('User_Type_Id'));
    this.Login_User_Id=localStorage.getItem('Login_User');
    this.Employee_Name=localStorage.getItem('Employee_Name');
    this.Employee_Id=Number(localStorage.getItem('Employee_Id'));
    this.SalesQuotationMaster_Id = Number(localStorage.getItem('SalesQuotationMaster_Id'));
    localStorage.removeItem('SalesQuotationMaster_Id');
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
    this.Quotation_Master_.EntryDate=new Date("dd-MMM-yyyy").toString();
    this.Search_FromDate=this.formatDate(this.Search_FromDate);
    this.Search_ToDate=this.formatDate(this.Search_ToDate);
    this.Clr_Sales_Master();
    this.Clr_Sales_Details();
    this.Sales_Print=true;
    this.Entry_View=false;

    // Check if navigated from Requirement module
    const reqData = localStorage.getItem('Requirement_For_Quotation');
    if (reqData) {
        try {
            const parsed = JSON.parse(reqData);
            this.RequirementMaster_Id = Number(parsed.RequirementMaster_Id || 0);
            const pendingItem = parsed.PendingItem;

            if (this.RequirementMaster_Id > 0) {
                this.Entry_View = true;
                this.Edit_Sales = 0;
                this.Sales_Print = true;
                
                // Load Requirement Master to autofill Customer, Currency, etc.
                this.Requirement_Master_Service_.Load_RequirementMaster(this.RequirementMaster_Id).subscribe(result => {
                    const master = (result && result[0] && result[0][0]) ? result[0][0] : null;
                    if (master) {
                        this.Customer_ = { 
                            Client_Accounts_Id: master.Account_Party_Id, 
                            Client_Accounts_Name: master.Client_Accounts_Name 
                        } as any;
                        this.currency = { 
                            CurrencyDetails_Id: master.CurrencyDetails_Id, 
                            CurrecnyName: master.CurrecnyName 
                        } as any;
                        // Add other header fields as needed
                    }
                    
                    if (pendingItem) {
                        this.Quotation_Details_Data = [Object.assign({}, pendingItem)];
                        this.Final_Amounts();
                    }
                });
                
                localStorage.removeItem('Requirement_For_Quotation');
                return;
            }
        } catch(e) { 
            console.error('Error parsing Requirement_For_Quotation', e);
            this.RequirementMaster_Id = 0; 
        }
        localStorage.removeItem('Requirement_For_Quotation');
    }

    if(this.SalesQuotationMaster_Id >0)
    {
        this.Entry_View=true;
        this.Edit_Sales=1;
        this.Sales_Print = false;
        debugger;
        this.Load_SalesQuotationMaster();
    }
    //this.myDate=new Date();
}
Load_Company() 
    {   
    this.Sales_Master_Service_.Load_Company().subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;    
    if (Rows != null && Rows[0] != null && Array.isArray(Rows[0]) && Rows[0].length > 0) {
        debugger;
    this.Print_Company_ = Rows[0][0];
    this.Company_ = Rows[0][0];
    this.Bank_ = Rows[1] || [];
 }
 this.issLoading = false;
 },
 Rows => {
 this.issLoading = false;
 const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occured',Type:"2"}});
 });
}
    Load_Currency() {
        this.currencydetails_Service_.Search_currencydetails('').subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
            // API returns { success: true, data: [[...]] } via sendSuccess wrapper
            const rawData = (Rows && (Rows as any).data) ? (Rows as any).data : Rows;
            const list = Array.isArray(rawData) && Array.isArray(rawData[0]) ? rawData[0]
                       : Array.isArray(rawData) ? rawData : [];
            this.currencyData = list;
            if (!this.currencyData) { this.currencyData = []; }
            this.Currency_Temp.CurrencyDetails_Id = 0;
            this.Currency_Temp.CurrecnyName = 'Select';
            this.currencyData.unshift(this.Currency_Temp);
            this.currency = this.currencyData[0];
            this.Currency_Search = this.currencyData[0];
            this.issLoading = false;
        },
            err => {
                this.issLoading = false;
                this.currencyData = this.currencyData || [];
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error loading Currency', Type: "2" } });
            });
    }

    Load_Item_Group() {
        this.Item_Group_Service_.Load_Item_Group().subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
            // API returns { success: true, data: [[...]] } via sendSuccess wrapper
            const rawData = (Rows && (Rows as any).data) ? (Rows as any).data : Rows;
            const list = Array.isArray(rawData) && Array.isArray(rawData[0]) ? rawData[0]
                       : Array.isArray(rawData) ? rawData : [];
            this.itemGroupData = list;
            if (!this.itemGroupData) { this.itemGroupData = []; }
            this.itemGroup_Temp.Item_Group_Id = 0;
            this.itemGroup_Temp.Item_Group_Name = 'Select';
            this.itemGroupData.unshift(this.itemGroup_Temp);
            this.Item_Group_Search = this.itemGroupData[0];
            this.issLoading = false;
        },
            err => {
                this.issLoading = false;
                this.itemGroupData = this.itemGroupData || [];
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error loading Item Group', Type: "2" } });
            });
    }
    // Load_Employees() {
    //         this.User_Details_Service_.Search_User_Details('',this.User_Type,this.Login_User_Id).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
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
        this.payment_term_Service_.Load_Payment_Term().subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
            // API returns { success: true, data: [[...]] } via sendSuccess wrapper
            const rawData = (Rows && (Rows as any).data) ? (Rows as any).data : Rows;
            const list = Array.isArray(rawData) && Array.isArray(rawData[0]) ? rawData[0]
                       : Array.isArray(rawData) ? rawData : [];
            this.PaymentTermData = list;
            if (!this.PaymentTermData) { this.PaymentTermData = []; }
            this.Payment_Term_Temp.payment_Term_ID = 0;
            this.Payment_Term_Temp.Payment_Term_Description = 'Select';
            this.PaymentTermData.unshift(this.Payment_Term_Temp);
            this.Payment_Term = this.PaymentTermData[0];
            this.issLoading = false;
        },
            err => {
                this.issLoading = false;
                this.PaymentTermData = this.PaymentTermData || [];
                const dialogRef = this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error loading Payment Term', Type: "2" } });
            });
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
    this.Quotation_Details_Data=[];
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
    //this.Search_Quotation();
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
        if (Number.parseInt(this.day) < 10) {
            this.day = "0" + this.day;
        }
        this.date = this.day + "-" + this.month + "-" + this.year;
        return this.date;
}

Print_Click() {
    this.Generate_Professional_PDF('print');
}

Preview_PDF() {
    this.Generate_Professional_PDF('preview');
}

Download_PDF() {
    this.Generate_Professional_PDF('download');
}

Generate_Professional_PDF(mode: string) {
    const id = this.Quotation_Master_.SalesQuotationMaster_Id;
    if (!id || id === 0) {
        alert("Please save the quotation before generating PDF.");
        return;
    }

    this.issLoading = true;
    this.Sales_Master_Service_.Print_Quotation(id).subscribe(blob => {
        this.issLoading = false;
        console.log("Received PDF blob size:", blob.size);
        const url = window.URL.createObjectURL(blob);
        
        if (mode === 'download') {
            const a = document.createElement('a');
            a.href = url;
            a.download = `Quotation_${this.Quotation_Master_.QuotationNo || id}.pdf`;
            a.click();
        } else {
            // Open in new tab for print or preview
            window.open(url, '_blank');
        }
        
        setTimeout(() => window.URL.revokeObjectURL(url), 10000);
    }, err => {
        this.issLoading = false;
        console.error('Print error:', err);
        alert("Error generating professional PDF.");
    });
}


_Old_Print_Click()
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
    if(this.Quotation_Master_.Charge1per != '')
        if(this.Quotation_Master_.Charge1per != null )
           if(this.Quotation_Master_.Charge1per != undefined )
           if(this.Quotation_Master_.Charge1per.toString() != '0')
            if(this.Quotation_Master_.Charge1per.toString() != 'null')
                    if(this.Quotation_Master_.Charge1per.toString() != 'undefined')
                        if(this.Quotation_Master_.Charge1per.toString() != '0.00')
                        {
                            this.printAcknowledgeCharge1per = true;
                        }
                        debugger;
   if(this.Quotation_Master_.charge1_Amount != 0)
       if(this.Quotation_Master_.charge1_Amount != null)
           if(this.Quotation_Master_.charge1_Amount != undefined )
      if( this.Quotation_Master_.charge1_Amount.toString() != '0')
   if( this.Quotation_Master_.charge1_Amount.toString() != 'null')
       if( this.Quotation_Master_.charge1_Amount.toString() != 'undefined' )
       if( this.Quotation_Master_.charge1_Amount.toString() != '0.000')
    {
        this.printAcknowledgeChargeAmount1 = true;
    }
debugger;
   if(this.Quotation_Master_.charge2_Amount != 0)
       if(this.Quotation_Master_.charge2_Amount != null)
           if(this.Quotation_Master_.charge2_Amount != undefined )
      if( this.Quotation_Master_.charge2_Amount.toString() != '0')
   if( this.Quotation_Master_.charge2_Amount.toString() != 'null')
       if( this.Quotation_Master_.charge2_Amount.toString() != 'undefined' )
       if( this.Quotation_Master_.charge2_Amount.toString() != '0.000')
    {
        this.printAcknowledgeChargeAmount2 = true;
    }
    debugger;
    if(this.Quotation_Master_.TotalDiscount != 0)
        if(this.Quotation_Master_.TotalDiscount != null )
           if(this.Quotation_Master_.TotalDiscount != undefined )
           if(this.Quotation_Master_.TotalDiscount.toString() != '0')
            if(this.Quotation_Master_.TotalDiscount.toString() != 'null')
                    if(this.Quotation_Master_.TotalDiscount.toString() != 'undefined')
                        if(this.Quotation_Master_.TotalDiscount.toString() != '0.000')
                        {
                            this.printAcknowledgeTotalDiscount = true;
                        }
                        debugger;
    if(this.Quotation_Master_.VAT_Amount != 0)
        if(this.Quotation_Master_.VAT_Amount != null )
           if(this.Quotation_Master_.VAT_Amount != undefined )
           if(this.Quotation_Master_.VAT_Amount.toString() != '0')
            if(this.Quotation_Master_.VAT_Amount.toString() != 'null')
                    if(this.Quotation_Master_.VAT_Amount.toString() != 'undefined')
                        {
                            this.printAcknowledgeVAT_Amount = true;
                        }
                        if(this.Quotation_Master_.Discount_Description != '')
                            if(this.Quotation_Master_.Discount_Description != null )
                               if(this.Quotation_Master_.Discount_Description != undefined )
                               if(this.Quotation_Master_.Discount_Description.toString() != '0')
                                if(this.Quotation_Master_.Discount_Description.toString() != 'null')
                                        if(this.Quotation_Master_.Discount_Description.toString() != 'undefined')
                                            {
                                                this.printAcknowledgeDiscount_Description = true;
                                            }
                                            if(this.Quotation_Master_.Additional_Discount != 0)
                                                if(this.Quotation_Master_.Additional_Discount != null )
                                                   if(this.Quotation_Master_.Additional_Discount != undefined )
                                                   if(this.Quotation_Master_.Additional_Discount.toString() != '0')
                                                    if(this.Quotation_Master_.Additional_Discount.toString() != 'null')
                                                            if(this.Quotation_Master_.Additional_Discount.toString() != 'undefined')
                                                                if(this.Quotation_Master_.Additional_Discount.toString() != '0.00')
                                                                {
                                                                    this.printAcknowledgeAdditional_Discount = true;
                                                                }
                                                                if(this.Quotation_Master_.Roundoff_Amt != 0)
                                                                    if(this.Quotation_Master_.Roundoff_Amt != null )
                                                                       if(this.Quotation_Master_.Roundoff_Amt != undefined )
                                                                       if(this.Quotation_Master_.Roundoff_Amt.toString() != '0')
                                                                        if(this.Quotation_Master_.Roundoff_Amt.toString() != 'null')
                                                                                if(this.Quotation_Master_.Roundoff_Amt.toString() != 'undefined')
                                                                                    if(this.Quotation_Master_.Roundoff_Amt.toString() != '0.000')
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
        this.Quotation_Master_.EntryDate = this.formatDate(this.Quotation_Master_.EntryDate)
    this.Quotation_Master_.PrintDate = this.formatPrintDate(this.Quotation_Master_.EntryDate);    
    //this.Customer_Name=this.Customer_.Client_Accounts_Name;
 
//     console.log("Quotation_Master_.charge1_Amount",this.Quotation_Master_.charge1_Amount)
//     console.log("Quotation_Master_.charge2_Amount",this.Quotation_Master_.charge2_Amount)
//     if(this.Quotation_Master_.charge1_Amount != 0 &&
//        this.Quotation_Master_.charge1_Amount != null &&
//        this.Quotation_Master_.charge1_Amount.toString() != 'null'&&
//        this.Quotation_Master_.charge1_Amount != undefined &&
//        this.Quotation_Master_.charge1_Amount.toString() != 'undefined'
//     )
//     {
//         this.printChargeAmount1 = true;
//     }

// debugger;
//     if(this.Quotation_Master_.charge2_Amount != 0 &&
//         this.Quotation_Master_.charge2_Amount != null &&
//         this.Quotation_Master_.charge2_Amount.toString() != 'null'&&
//         this.Quotation_Master_.charge2_Amount != undefined &&
//         this.Quotation_Master_.charge2_Amount.toString() != 'undefined' &&
//         this.Quotation_Master_.charge2_Amount.toString() != '0.000'
//      )
//      {
//          this.printChargeAmount2 = true;
//      }
//     console.log('this.printChargeAmount1: ', this.printChargeAmount1);
//     console.log('this.printChargeAmount2: ', this.printChargeAmount2);


    this.Quotation_Master_.EntryDate = this.formatDate(this.Quotation_Master_.EntryDate)
    this.Quotation_Master_.PrintDate = this.formatPrintDate(this.Quotation_Master_.EntryDate);
    // for (let i = 0; i < this.currencyData.length; i++) {
    //     if(this.Quotation_Master_.CurrencyId = this.currencyData[i].CurrencyDetails_Id){
    //     }        
    //    }
   //this.Load_Company() ;   
    // this.Image_Url='/assets/img/'+this.Print_Company_.Company_Id+'.jpg';
    // this.Company_Sign='/assets/img/Sign_'+this.Print_Company_.Company_Id+'.jpg';
    // this.Company_Seal='/assets/img/Seal_'+this.Print_Company_.Company_Id+'.jpg';  
    // for (let i = 0; i < this.currencyData.length; i++) {
    //     if(this.Quotation_Master_.CurrencyId = this.currencyData[i].CurrencyDetails_Id){
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
        const printStyles = this.Get_Quotation_Print_Css();
        popupWinindow.document.write(
            '<html><head><title>Quotation</title><style>' +
            printStyles +
            '</style></head><body onload="window.print()">' +
            innerContents +
            '</body></html>'
        );
        popupWinindow.document.close();   
    })       
}

Get_Quotation_Print_Css() {
    return `
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background: #fff;
            color: #333;
        }
        .print-container {
            width: 210mm;
            margin: auto;
            padding: 20px;
            box-sizing: border-box;
        }
        /* HEADER */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
        }
        .logo {
            font-size: 36px;
            font-weight: 800;
            letter-spacing: 1px;
            color: #1a1a1a;
            display: flex;
            align-items: center;
            font-family: 'Arial Black', Gadget, sans-serif;
        }
        .logo span {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #e63946;
            color: #fff;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            margin: 0 2px;
            font-size: 20px;
        }
        .company-details {
            text-align: right;
            font-size: 11px;
            line-height: 1.6;
        }
        .company-details b {
            font-size: 14px;
            color: #000;
        }
        /* TITLE */
        h2.print-title {
            text-align: center;
            margin: 10px 0 30px 0;
            font-size: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 700;
        }
        /* SECTION */
        .section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            font-size: 12px;
            line-height: 1.5;
        }
        .section div {
            width: 48%;
        }
        .section b {
            font-size: 13px;
            display: block;
            margin-bottom: 4px;
            color: #000;
        }
        /* TABLE */
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 12px;
        }
        .items-table th, .items-table td {
            border: 1px solid #ccc;
            padding: 10px 8px;
            vertical-align: top;
        }
        .items-table th {
            background: #f8f9fa;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 11px;
            color: #444;
        }
        .items-table .right {
            text-align: right;
        }
        .items-table .center {
            text-align: center;
        }
        .items-table .bold {
            font-weight: 700;
            color: #000;
        }
        .item-description {
            font-size: 10px;
            color: #666;
            margin-top: 5px;
            line-height: 1.4;
            display: block;
        }
        /* SUMMARY & FOOTER */
        .footer-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-top: 20px;
            font-size: 12px;
        }
        .summary-box {
            background: #fdfdfd;
        }
        .summary-line {
            display: flex;
            justify-content: space-between;
            padding: 6px 0;
            border-bottom: 1px solid #eee;
        }
        .summary-line.total {
            border-bottom: 2px solid #333;
            font-weight: 800;
            font-size: 14px;
            color: #000;
            padding-top: 10px;
        }
        .terms-section b, .bank-section b {
            font-size: 13px;
            display: block;
            margin-bottom: 8px;
            color: #000;
            border-bottom: 1px solid #eee;
            padding-bottom: 4px;
        }
        .terms-list {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        .terms-list li {
            margin-bottom: 5px;
            padding-left: 15px;
            position: relative;
        }
        .terms-list li::before {
            content: "•";
            position: absolute;
            left: 0;
            color: #e63946;
        }
        .bank-details p {
            margin: 4px 0;
        }
        /* SIGNATURE */
        .signature-area {
            margin-top: 50px;
            text-align: right;
            font-size: 12px;
        }
        .signature-box {
            margin: 15px 0;
            height: 60px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
        .signature-box img {
            max-height: 60px;
        }
        @media print {
            @page {
                size: A4;
                margin: 15mm;
            }
            body {
                background: none;
            }
            .print-container {
                width: 100%;
                padding: 0;
            }
            .no-print {
                display: none !important;
            }
        }
    `;
}

_Old_Get_Quotation_Print_Css() {
    return `
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        .print-container {
            width: 210mm;
            margin: auto;
        }
        /* HEADER */
        .header {
            display: flex;
            justify-content: space-between;
        }
        .header .logo {
            font-size: 32px;
            letter-spacing: 2px;
            margin: 0;
        }
        .header .right {
            text-align: right;
        }
        .header .right p {
            margin: 2px 0;
            font-size: 13px;
        }
        /* TITLE */
        .title {
            text-align: center;
            margin: 20px 0;
            text-transform: uppercase;
            border-bottom: 2px solid #000;
            padding-bottom: 5px;
        }
        /* DETAILS */
        .details {
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
        }
        .details .left, .details .right {
            width: 48%;
        }
        .details p {
            margin: 2px 0;
            font-size: 13px;
        }
        /* TABLE */
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        .items-table th,
        .items-table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
            font-size: 13px;
        }
        .items-table th {
            background: #f2f2f2;
            text-transform: uppercase;
        }
        .total-row td {
            font-weight: bold;
        }
        /* SUMMARY */
        .summary {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }
        .summary .left {
            width: 60%;
        }
        .summary .right {
            width: 35%;
            text-align: right;
        }
        .summary p {
            margin: 4px 0;
            font-size: 13px;
        }
        .summary ul {
            margin: 5px 0;
            padding-left: 20px;
            font-size: 12px;
        }
        .summary li {
            margin-bottom: 2px;
        }
        /* SIGNATURE */
        .signature {
            margin-top: 40px;
            text-align: right;
        }
        .sign-box {
            height: 60px;
        }
        /* PRINT RULES */
        @media print {
            body {
                margin: 0;
                padding: 10mm;
            }
            .acknowledgement {
                display: none !important;
            }
            button,
            .no-print {
                display: none !important;
            }
            .print-container {
                width: 100%;
            }
            table {
                page-break-inside: auto;
            }
            tr {
                page-break-inside: avoid;
                page-break-after: auto;
            }
        }
    `;
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
    const printStyles = this.Get_Quotation_Print_Css();
    popupWinindow.document.write(
        '<html><head><title>Quotation</title><style>' +
        printStyles +
        '</style></head><body onload="window.print()">' +
        innerContents +
        '</body></html>'
    );
    popupWinindow.document.close();      
}
Clr_Sales_Master()
{
    this.Quotation_Master_.SalesQuotationMaster_Id=0;
    this.Quotation_Master_.Account_Party_Id=0;
    //this.Quotation_Master_.Employee_Id=0;
    //this.Quotation_Master_.Employee_Name=this.Employee_Name;
    this.Quotation_Master_.User_Id=0;
    this.Quotation_Master_.Supplier_Ref_No="";
    this.Quotation_Master_.EntryDate=new Date().toString();
    this.Quotation_Master_.EntryDate=this.formatDate(this.Quotation_Master_.EntryDate);
    this.Quotation_Master_.QuotationNo="";
    this.Quotation_Master_.CurrencyId=0;
    this.Quotation_Master_.Brand="";
    this.Quotation_Master_.PriceBasis="";
    this.Quotation_Master_.PaymentTerms = null;
    this.Quotation_Master_.Payment_Term_Description = null;
    this.Quotation_Master_.Delivery = "";
    this.Quotation_Master_.Validity = "";
    this.Quotation_Master_.Description1 = "";
    this.Quotation_Master_.Discount_Description = null;
    this.Quotation_Master_.Charge1 = "";
    this.Quotation_Master_.Charge1per = null;
    this.Quotation_Master_.Charge2 = "";
    this.Quotation_Master_.PreparedBy = "";
    this.Quotation_Master_.VAT_Percentage = this.Default_Vat_Percentage;
    this.Quotation_Master_.Additional_Discount = null;
    this.Quotation_Master_.charge1_Amount = null;
    this.Quotation_Master_.charge2_Amount = null;
    this.Quotation_Master_.TotalDiscount = null
    this.Quotation_Master_.VAT_Amount = null;
    this.Quotation_Master_.Total_Amount = null;
    this.Quotation_Master_.Roundoff_Amt = null;
    this.Quotation_Master_.Amount_In_Words = "";
    this.Quotation_Master_.NetTotal=null;
    this.Quotation_Master_.Cess=0;
    this.Quotation_Master_.RoundOff=0;
    this.Quotation_Master_.TotalAmount=0;
    this.Quotation_Master_.Description2="";
    this.Quotation_Master_.Address1="";
    this.Quotation_Master_.Address2="";
    this.Quotation_Master_.Address3="";
    this.Quotation_Master_.Address4="";
    this.Quotation_Master_.Mobile="";
    this.Quotation_Master_.Customer_Name="";
    this.Quotation_Master_.PinCode="";
    this.Quotation_Master_.GSTNo="";    
    this.Quotation_Master_.GrandTotal=0;
    this.Quotation_Master_.Transportation_Gst=null;
    this.Quotation_Master_.Handling_Gst=0;
    this.Quotation_Master_.Transportation_Total=null;
    this.Quotation_Master_.Handling_Total=null;
    this.Quotation_Master_.Vehicle_No="";
    this.Quotation_Master_.Driver_Name="";
    this.Quotation_Master_.PaymentTermValue = null;
    this.Quotation_Master_.Mobile_No = "";
    this.Quotation_Master_.Delivery_Address1 = "";
    this.Quotation_Master_.Delivery_Address2 = "";
    this.Quotation_Master_.Delivery_Address3 = "";
    this.Quotation_Master_.Delivery_Address4 = "";
    if(this.Bill_Type_Data!=undefined && this.Bill_Type_Data!=null)
    this.Bill_Type_=this.Bill_Type_Data[1];
    if(this.Bill_Mode_Data!=undefined && this.Bill_Mode_Data!=null)
    this.Bill_Mode_=this.Bill_Mode_Data[0];
    this.Customer_=null;
    this.Quotation_Details_Data=[];
    this.Address1 = null;
    this.Address2 = null;
    this.Address3 = null;
    this.Address4 = null;
    this.Vatin = null;
    this.Quotation_Master_.POnumber = null;
    this.Attention = null;
    this.Employee = null;
    this.Quotation_Master_.TotalAmount = 0;
    this.Total = 0;
    if(this.currencyData != undefined && this.currencyData!= null)
    {
        this.currency = this.currencyData[0];
    }
    this.Quotation_Master_.KindAttend = '';
    this.Quotation_Master_.AttendEmployee = '';
    if(this.PaymentTermData != undefined && this.PaymentTermData != null)
    {
        this.Payment_Term = this.PaymentTermData[0];
    }
}
Clr_Sales_Details()
{
    debugger
    this.Quotation_Details_Index=-1;
    this.Quotation_Details_.Quotation_Details_Id=0;
    this.Quotation_Details_.Quotation_Master_Id=0;
    this.Quotation_Details_.StockId=0;
    //this.Quotation_Details_.Stock_Details_Id=0;
    this.Quotation_Details_.ItemId=0;
    this.Quotation_Details_.ItemName="";
    this.Quotation_Details_.Item_Code="";
    this.Quotation_Details_.GroupId=0;
    this.Quotation_Details_.GroupName="";
    this.Quotation_Details_.UnitId=0;
    this.Quotation_Details_.UnitName="";
    this.Quotation_Details_.PurchaseRate=0;
    this.Quotation_Details_.UnitPrice=0;
    this.Quotation_Details_.MRP=0;
    this.Quotation_Details_.TaxAmount=0;
    this.Quotation_Details_.Stock=0;
    this.Quotation_Details_.HSNCODE="";
    this.Quotation_Details_.SaleTax=0;
    this.Quotation_Details_.Quantity=0;
    this.Quotation_Details_.Discount=0;
    this.Quotation_Details_.NetValue=0;
    this.Quotation_Details_.Description="";    
    this.UnitName = "";
    this.Quantity = 0;
    this.SaleRate = 0;
    this.discount = 0;
    this.Quotation_Details_.Unit_Discount = 0;
    this.TotalAmount = 0;
    this.Quotation_Details_.Availability = '';
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
Delete_Quotation_Master(SalesQuotationMaster_Id,index)
 {
    const dialogRef = this.dialogBox.open
    ( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Do you want to delete ?',Type:"true",Heading:'Confirm'}});
    dialogRef.afterClosed().subscribe(result =>        
    {    
    if (result == 'Yes') {
        this.issLoading = true;
        this.Sales_Master_Service_.Delete_Quotation_Master(SalesQuotationMaster_Id)
        .pipe(finalize(() => this.issLoading = false))
        .subscribe({
            next: (response: any) => {
                if (response.success && response.data){
                    const deleteStatus = response.data;
                    if (deleteStatus.SalesQuotationMaster_Id_ == -1) {
                        this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Cannot Delete: Referenced in other documents', Type: "3" } });
                    } else if (deleteStatus.SalesQuotationMaster_Id_ > 0) {
                        this.Quotation_Master_Data.splice(index, 1);
                        this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Deleted Successfully', Type: "false" } });
                        this.Search_Quotation();
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

Load_Bill_Type()
{
    debugger;
    var value=1;
        this.Sales_Master_Service_.Load_Bill_Type(value).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;    
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
        this.Sales_Master_Service_.Load_Bill_Mode().subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;    
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
    this.Sales_Master_Service_.Load_Cess().subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;        
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
    this.Sales_Master_Service_.Load_Company_Bank().subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;   
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
     debugger
    this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39',Value).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;   
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
    this.purchaseordermaster_Service_.Search_PurchaseOrderNumber_Typeahead(Value).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;     
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
     this.User_Details_Service_.Search_User_Details(Value,this.User_Type,this.Login_User_Id).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;     
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
     this.Sales_Master_Service_.Get_Purchase_Item_Code_Typeahead(Value).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;     
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
Search_Item_Typeahead(event: any)
{
    var Value = "";
    if(this.Barcode_ == null || this.Barcode_ == undefined)
         this.Barcode_ = new Quotation_Details();     
     Value = event.target.value;
     if(Value == null || Value == undefined || Value == "undefined" || Value == "null")
         Value = "";
if(this.Barcode_.Item_Code)
{
    this.Barcode_.ItemName=Value
}   
     this.Quotation_Details_.ItemName=Value;
      this.issLoading = true;
     this.Sales_Master_Service_.Search_Item_Typeahead(Value).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;    
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
        this.Sales_Master_Service_.Search_Barcode_Typeahead(Value).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
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
    this.Sales_Master_Service_.Search_Customer_Typeahead('1,3',Value).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;   
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
     this.User_Details_Service_.Employee_Typeahead(2,Value).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;   
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
    this.Quotation_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.Quotation_Master_.Customer=this.Customer_.Client_Accounts_Name;
    this.Quotation_Master_.Account_Party_Id=this.Customer_.Client_Accounts_Id;

    this.Quotation_Master_.Address1 = this.Customer_.Address1;
    this.Quotation_Master_.Address2 = this.Customer_.Address2;
    this.Quotation_Master_.Address3 = this.Customer_.Address3;
    this.Quotation_Master_.Address4 = this.Customer_.Address4;
    this.Quotation_Master_.Mobile = this.Customer_.Mobile;
    this.Quotation_Master_.PinCode=this.Customer_.PinCode;
    this.Quotation_Master_.GSTNo=this.Customer_.GSTNo;
    this.Customer_Name = this.Quotation_Master_.Customer_Name;

    this.Address1 = this.Quotation_Master_.Address1;
    this.Address2 = this.Quotation_Master_.Address2;
    this.Address3 = this.Quotation_Master_.Address3;
    this.Address4 = this.Quotation_Master_.Address4;
    this.Vatin = this.Quotation_Master_.GSTNo;
}
selectCustomer(){
    //this.customer_name=this.Customer_.Client_Accounts_Name;
    this.Quotation_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.Quotation_Master_.Customer=this.Customer_.Client_Accounts_Name;
    this.Quotation_Master_.Account_Party_Id=this.Customer_.Client_Accounts_Id;

    this.Quotation_Master_.Address1 = this.Customer_.Address1;
    this.Quotation_Master_.Address2 = this.Customer_.Address2;
    this.Quotation_Master_.Address3 = this.Customer_.Address3;
    this.Quotation_Master_.Address4 = this.Customer_.Address4;
    this.Quotation_Master_.Mobile = this.Customer_.Mobile;
    this.Quotation_Master_.PinCode=this.Customer_.PinCode;
    this.Quotation_Master_.GSTNo=this.Customer_.GSTNo;
    this.Customer_Name = this.Quotation_Master_.Customer_Name;

    this.Address1 = this.Customer_.Address1;
    this.Address2 = this.Customer_.Address2;
    this.Address3 = this.Customer_.Address3;
    this.Address4 = this.Customer_.Address4;
    this.Vatin = this.Customer_.GSTNo;
}
Item_Name_Change(Item_sl:Quotation_Details){ 
    debugger
this.Quotation_Details_=Object.assign({},Item_sl);
//  this.Item_Temp.StockId=Item_sl.StockId;
 this.Item_Temp.Item_Code=Item_sl.Item_Code;
//  this.Item_Temp.ItemName =Item_sl.ItemName;
 this.Item_Temp.ItemId=Item_sl.ItemId;
 this.Barcode_=Object.assign({},this.Item_Temp);
 this.Quotation_Details_.StockId=Item_sl.StockId; 
 this.Quotation_Details_.Item_Code=Item_sl.Item_Code;
 this.Quotation_Details_.Item_Code=Item_sl.Item_Code;
 this.Quotation_Details_.ItemId=Item_sl.ItemId;
 this.Quotation_Details_.Quantity=0;
//  this.Quotation_Details_.ItemName=Item_sl.ItemName;
 debugger;
}
Barcode_Change(Barcode_sl:Quotation_Details)
{    
      debugger
    this.Quotation_Details_=Object.assign({},Barcode_sl);
    this.Quotation_Details_Temp_.ItemId=Barcode_sl.ItemId;
    this.Quotation_Details_Temp_.ItemName=Barcode_sl.ItemName;
    this.Item_=Object.assign({},this.Quotation_Details_Temp_);   
        
    this.Quotation_Details_.ItemId=Barcode_sl.ItemId;
    this.Quotation_Details_.ItemName=Barcode_sl.ItemName;
    this.Quotation_Details_.StockId=Barcode_sl.StockId;
    //if(this.Quotation_Details_.Quantity==null || this.Quotation_Details_.Quantity==undefined || this.Quotation_Details_.Quantity==0)
    this.Quotation_Details_.Quantity=0;
    // if (this.Quotation_Details_.UnitPrice==null || this.Quotation_Details_.UnitPrice==undefined || this.Quotation_Details_.UnitPrice==0)
    //     this.Quotation_Details_.UnitPrice=0;
}
Calculate_Quotation_Details_Amount()
{
    debugger
    if(this.Quotation_Details_.Quantity == undefined || this.Quotation_Details_.Quantity == null)
    this.Quotation_Details_.Quantity = 0;
    if(this.Quotation_Details_.UnitPrice == undefined || this.Quotation_Details_.UnitPrice == null)
    this.Quotation_Details_.UnitPrice = 0;
 this.Calculate_Total_Amount();
}
Calculate_Total_Amount()
{ 
    debugger;
    if(this.Quotation_Details_.Discount == undefined || this.Quotation_Details_.Discount == null)
        this.Quotation_Details_.Discount = 0;
    if(this.Quotation_Details_.Item_Discount_Amount == undefined || this.Quotation_Details_.Item_Discount_Amount == null)
        this.Quotation_Details_.Item_Discount_Amount =0;
    this.Quotation_Details_.Unit_Discount = (Number(this.Quotation_Details_.UnitPrice) * Number(this.Quotation_Details_.Discount))/ 100;
    this.Quotation_Details_.Unit_Discount = Number(this.Quotation_Details_.Unit_Discount.toFixed(3));
    this.Quotation_Details_.Item_Discount_Amount =Number(this.Quotation_Details_.Unit_Discount) * Number(this.Quotation_Details_.Quantity);
    this.Quotation_Details_.Item_Discount_Amount =Number(this.Quotation_Details_.Item_Discount_Amount.toFixed(3));
    this.Quotation_Details_.Amount = Number(this.Quotation_Details_.Quantity) * Number(this.Quotation_Details_.UnitPrice);
    this.Quotation_Details_.Amount =Number(this.Quotation_Details_.Amount.toFixed(3));
     this.Quotation_Details_.TaxableAmount = Number(this.Quotation_Details_.Amount) - Number(this.Quotation_Details_.Item_Discount_Amount);
     this.Quotation_Details_.TaxableAmount = Number(this.Quotation_Details_.TaxableAmount.toFixed(3));
    this.Quotation_Details_.TaxAmount = Number(this.Quotation_Details_.TaxableAmount) * Number(this.Quotation_Details_.SaleTax) /100;
    this.Quotation_Details_.NetValue= Number(this.Quotation_Details_.TaxableAmount) + Number(this.Quotation_Details_.TaxAmount);
    this.Quotation_Details_.Item_Discount_Amount=Number(this.Quotation_Details_.Item_Discount_Amount.toFixed(3));    
    this.Quotation_Details_.Amount=Number(this.Quotation_Details_.Amount.toFixed(3));    
    this.Quotation_Details_.TaxableAmount=Number(this.Quotation_Details_.TaxableAmount.toFixed(3));
    this.Quotation_Details_.TaxAmount=Number(this.Quotation_Details_.TaxAmount.toFixed(3));  
    this.Quotation_Details_.NetValue= Number(this.Quotation_Details_.NetValue.toFixed(3));    
}
Round_Off_Calculation()
{   
    if(this.Quotation_Master_.RoundOff == undefined || this.Quotation_Master_.RoundOff == null)
        {
            this.Quotation_Master_.RoundOff = 0;
            this.Quotation_Master_.RoundOff = Number(this.Quotation_Master_.RoundOff.toFixed(3));
        }  
    this.Quotation_Master_.GrandTotal = Number(this.Quotation_Master_.RoundOff) + Number(this.Quotation_Master_.TotalAmount);    
    this.Quotation_Master_.GrandTotal = Number(this.Quotation_Master_.GrandTotal.toFixed(3));
}
checkbox_Click()
{ 
    this.Final_Amounts();
}
safeNumber(value) {
    return isNaN(value) ? 0 : Number(value);
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
    this.issLoading = true;
    this.QuotNo = this.QuotNo == "" ? undefined : this.QuotNo;
    this.partNo = this.partNo == "" ? undefined : this.partNo;

    this.Sales_Master_Service_.Search_Quotation(look_In_Date_Value, moment(this.Search_FromDate).format('YYYY-MM-DD'),
        moment(this.Search_ToDate).format('YYYY-MM-DD'), CustomerId_, this.QuotNo, this.partNo, Item_Group_Id_,
        CurrencyDetails_Id_, User_Details_Id_,
        this.User_Type_Id,
        this.Login_User_Id)
    .pipe(finalize(() => this.issLoading = false))
    .subscribe({
        next: (response) => {
            if (response.success) {
                this.Quotation_Master_Data = response.data[0];
                if (this.Quotation_Master_Data && this.Quotation_Master_Data.length > 0) {
                    for (var i = 0; i < this.Quotation_Master_Data.length; i++) {
                        this.Sales_Master_Total_Amount = Number(this.Sales_Master_Total_Amount) + Number(this.Quotation_Master_Data[i].NetTotal);
                        this.Sales_Master_Total_Amount = Number(this.Sales_Master_Total_Amount.toFixed(3));
                    }
                }
                this.Total_Entries = (this.Quotation_Master_Data || []).length;
            } else {
                this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: response.message || 'No Details Found', Type: "3" } });
            }
        },
        error: (err) => {
            this.dialogBox.open(DialogBox_Component, { panelClass: 'Dialogbox-Class', data: { Message: 'Error Occured', Type: "2" } });
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
Plus_Quotation_Details()
{
if(this.Quotation_Details_.StockId>0)
    this.Quotation_Details_.StockId=this.Quotation_Details_.StockId;
else
    this.Quotation_Details_.StockId=0;
// if(this.Item_==undefined || this.Item_==null ||this.Item_.ItemId==0 || this.Item_.ItemId==undefined)
// {
// const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Select Item Name',Type: "3" }});
// return
// } 
// else
    // Allow manual entry: either Item_Code or ItemName must be present
    const itemName = typeof this.Item_ === 'string' ? this.Item_ : (this.Item_ ? this.Item_.ItemName : '');
    const itemCode = typeof this.Barcode_ === 'string' ? this.Barcode_ : (this.Barcode_ ? this.Barcode_.Item_Code : '');

    if (!itemName && !itemCode) {
        this.dialogBox.open(DialogBox_Component, { 
            panelClass: 'Dialogbox-Class', 
            data: { Message: 'Enter Item Name or Code', Type: "3" } 
        });
        return;
    }
if(this.Quotation_Details_.Quantity==undefined || this.Quotation_Details_.Quantity==null || this.Quotation_Details_.Quantity==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Quantity',Type: "3" }});
return
}
else if(this.Quotation_Details_.UnitPrice==undefined || this.Quotation_Details_.UnitPrice==null || this.Quotation_Details_.UnitPrice==0)
{
const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Enter Unit Price',Type: "3" }});
return
}
else 
{
if(this.Quotation_Details_Data==undefined)
this.Quotation_Details_Data=[];
if( this.Barcode_==null)
{
    this.Quotation_Details_.Item_Code='';
}
else if(this.Barcode_.Item_Code!=undefined && this.Barcode_.Item_Code!=null)
{
    this.Quotation_Details_.Item_Code=  this.Barcode_.Item_Code;
}
else if(this.Barcode_!=undefined && this.Barcode_!=null)
{
    const Barcode_string =JSON.parse(JSON.stringify(this.Barcode_));
    this.Quotation_Details_.Item_Code=Barcode_string;
}
if( this.Item_==null)
    {
        this.Quotation_Details_.ItemName='';
    }
    else if(this.Item_.ItemName!=undefined && this.Item_.ItemName!=null)
    {
        this.Quotation_Details_.ItemName=  this.Item_.ItemName;
    }
    else if(this.Item_!=undefined && this.Item_!=null)
    {
        const Itemnamestoing =JSON.parse(JSON.stringify(this.Item_));
        this.Quotation_Details_.ItemName=Itemnamestoing;
    }
    this.Quotation_Details_.Expiry_Date=this.New_Date(new Date(moment(this.Quotation_Details_.Expiry_Date).format('YYYY-MM-DD')));
    this.Quotation_Details_.UnitPrice = parseFloat(Number(this.Quotation_Details_.UnitPrice).toFixed(3));
    this.Quotation_Details_.Quantity = parseFloat(Number(this.Quotation_Details_.Quantity).toFixed(3));         
    if (this.Quotation_Details_Index >= 0) 
    {
        this.Quotation_Details_Data[this.Quotation_Details_Index] = Object.assign({}, this.Quotation_Details_);
    }
    else
    {
        this.Quotation_Details_Data.push(Object.assign({}, this.Quotation_Details_));
    }
    debugger
   // console.log('this.Quotation_Details_Data: ', this.Quotation_Details_Data);
    this.addBlankRows();
    this.Quotation_Details_Index=-1;
    this.Clr_Sales_Details();  
    this.Final_Amounts();
}
}
Save_Quotation(Printstatus:number)
{
    debugger;
    if(this.Quotation_Details_Data == undefined || this.Quotation_Details_Data == null || this.Quotation_Details_Data.length == 0 || this.Quotation_Details_Data.length == undefined )
    {
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Add atleast one Item',Type:"3"}});
        return
    }


    // if(this.Customer_ == undefined || this.Customer_ == null)
    // { }
        if(this.Customer_.Client_Accounts_Id==0 || this.Customer_.Client_Accounts_Id==null || this.Customer_.Client_Accounts_Id==undefined){
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Choose Customer',Type:"3"}});
        return
        }  
    
    debugger; 
    if(this.currency.CurrencyDetails_Id == undefined || this.currency.CurrencyDetails_Id == 0 ){
        const dialogRef = this.dialogBox.open( DialogBox_Component, {panelClass:'Dialogbox-Class'  ,data:{Message:'Choose currency',Type:"3"}});
        return
    }    
    this.Quotation_Master_.Account_Party_Id=this.Customer_.Client_Accounts_Id;
    this.Quotation_Master_.User_Id=Number(this.Login_User_Id);
    this.Quotation_Master_.Quotation_Details=this.Quotation_Details_Data;
    debugger
    if(this.Quotation_Master_.QuotationNo == '' || this.Quotation_Master_.QuotationNo == null || this.Quotation_Master_.QuotationNo == undefined)
    {
        this.Quotation_Master_.QuotationNo = "0";
    }
    debugger;
    this.Quotation_Master_.EntryDate = this.New_Date(new Date(moment(this.Quotation_Master_.EntryDate).format('YYYY-MM-DD')));
    this.Quotation_Master_.Payment_Term_Description = this.Payment_Term.payment_Term_ID;
    this.Quotation_Master_.PaymentTerms = this.Payment_Term.Payment_Term_Description;
    //this.Quotation_Master_.EntryDate = this.formatDate(this.Quotation_Master_.EntryDate);
    this.Quotation_Master_.CurrencyId = this.currency.CurrencyDetails_Id;
    console.log("Before API call");
    this.issLoading = true;

    this.Sales_Master_Service_.Save_Quotation(this.Quotation_Master_)
    .pipe(
        finalize(() => {
            this.issLoading = false;
            const saveButton = document.getElementById("Save_Button");
            if (saveButton) saveButton.hidden = false;
        })
    )
    .subscribe({
        next: (res: any) => {
            console.log("Quotation API Response:", res);
            
            if (res && res.success) {
                const data = res.data;
                const rows = Array.isArray(data) ? data : (data && data.rows ? data.rows : []);
                const result = rows && rows[0] ? rows[0] : (Array.isArray(data) ? data[0] : null);

                if (result && Number(result.SalesQuotationMaster_Id_) > 0) {
                    this.Quotation_Master_.SalesQuotationMaster_Id = result.SalesQuotationMaster_Id_;
                    this.Quotation_Master_.QuotationNo = result.QuotationNo_;

                    if (this.RequirementMaster_Id > 0) {
                        this.RequirementWorkflowService_.LinkQuotation(
                            this.RequirementMaster_Id,
                            this.Quotation_Master_.SalesQuotationMaster_Id
                        ).subscribe({
                            next: (_: any) => { this.RequirementMaster_Id = 0; },
                            error: (_err: any) => {}
                        });
                    }

                    if (Printstatus == 1) {
                        this.Print_Click();
                    } else {
                        this.dialogBox.open(DialogBox_Component, {
                            panelClass: 'Dialogbox-Class',
                            data: { Message: 'Saved Successfully', Type: "false" }
                        });
                        this.Edit_Sales = 1;
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
            console.error("Quotation API ERROR:", error);
            this.dialogBox.open(DialogBox_Component, {
                panelClass: 'Dialogbox-Class',
                data: { Message: 'Server Error: ' + (error.message || 'Connection failed'), Type: "2" }
            });
        }
    });
}

private Update_Workflow_Status(statusCode: string) {
    const masterId = (this.Quotation_Master_ && (this.Quotation_Master_ as any).SalesQuotationMaster_Id) ? (this.Quotation_Master_ as any).SalesQuotationMaster_Id : 0;
    const qid = Number(masterId || this.SalesQuotationMaster_Id_Edit || this.SalesQuotationMaster_Id || 0);
    if (!qid || !statusCode) return;
    this.Sales_Master_Service_.Update_Quotation_Workflow_Status(qid, statusCode).subscribe(_ => {}, _err => {});
}

private Refresh_Sequential_Flags() {
    this.HasPurchaseOrder = false;
    const qid = Number(this.SalesQuotationMaster_Id_Edit || this.SalesQuotationMaster_Id || 0);
    if (!qid) return;
    this.Sales_Master_Service_.Get_PurchaseOrder_Quotation_Details(qid).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
        const list = (Rows && Rows[0]) ? Rows[0] : [];
        this.HasPurchaseOrder = Array.isArray(list) && list.length > 0;
    }, _err => {
        this.HasPurchaseOrder = false;
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
Edit_Quotation_Master(Sales_Master_e,index)
{ 
    debugger;
    this.Entry_View=true;
    this.Edit_Sales=1;
    this.Sales_Print = false;
    this.issLoading = true;
    this.Quotation_Master_Index=index;
    this.Quotation_Master_=Object.assign({},Sales_Master_e); 
    this.SalesQuotationMaster_Id_Edit = Sales_Master_e.SalesQuotationMaster_Id;
    this.Customer_Temp.Client_Accounts_Id=Sales_Master_e.Account_Party_Id;
    this.Customer_Temp.Client_Accounts_Name=Sales_Master_e.Customer;
    this.Customer_=this.Customer_Temp;
    console.log(this.Customer_Data)
debugger;
    this.Customer_Name=Sales_Master_e.Customer;
    this.Quotation_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
    this.Quotation_Master_.Customer=this.Quotation_Master_.Customer_Name; 
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
    //                this.Quotation_Master_.Customer=result[0][0].Client_Accounts_Name;
    //                this.Quotation_Master_.Customer_Name=result[0][0].Client_Accounts_Name;
    //                 this.Address1 = result[0][0].Address1;
    //                 this.Address2 = result[0][0].Address2;
    //                 this.Address3 = result[0][0].Address3;
    //                 this.Address4 = result[0][0].Address4;
    //                 this.Vatin = result[0][0].GSTNo;
    //     }
    // })
     debugger
    this.Sales_Master_Service_.Search_Customer_Typeahead('1,2,3,39',"").subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response; 
        debugger    
        if (Rows != null) {
            debugger
            this.Customer_Data = Rows[0];
            for(let i=0;i<Rows[0].length;i++){
                if(Rows[0][i].Client_Accounts_Id == this.Quotation_Master_.Account_Party_Id){

                    this.Customer_Temp.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                    this.Customer_Temp.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                    this.Customer_= this.Customer_Temp;

                    this.Quotation_Master_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                    this.Quotation_Master_.Customer=Rows[0][i].Client_Accounts_Name;
                    this.Quotation_Master_.Customer_Name=Rows[0][i].Client_Accounts_Name;
                    this.Quotation_Master_.Address1 = Rows[0][i].Address1;
                    this.Quotation_Master_.Address2 = Rows[0][i].Address2;
                    this.Quotation_Master_.Address3 = Rows[0][i].Address3;
                    this.Quotation_Master_.Address4 = Rows[0][i].Address4;
                    this.Quotation_Master_.Vatin = Rows[0][i].GSTNo;

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
    if(this.Quotation_Master_.Additional_Discount) this.addDiscCheck = 1;
    else this.addDiscCheck = 0;
        for(let i=0;i<this.currencyData.length;i++)
        {
        if(this.currencyData[i].CurrencyDetails_Id == this.Quotation_Master_.CurrencyId){
            this.currency = this.currencyData[i];
            // this.CurrecnyName = this.currencyData[i].CurrecnyName
        }
    }
    for(let i=0;i<this.PaymentTermData.length;i++){
        if(this.PaymentTermData[i].payment_Term_ID == this.Quotation_Master_.Payment_Term_Description){
            this.Payment_Term = this.PaymentTermData[i];
        }
    }
this.Sales_Master_Service_.Get_Quotation_Details(Sales_Master_e.SalesQuotationMaster_Id).subscribe({
    next: (res: any) => {     
        if (res != null) {
            const data = (res && res.success !== undefined) ? res.data : res;
            const rows = Array.isArray(data) ? data : (data && data.rows ? data.rows : []);
            this.Quotation_Details_Data = Array.isArray(rows[0]) ? rows[0] : rows;
            this.addBlankRows();
            this.Final_Amounts();
        }
        this.issLoading = false;
    },
    error: (err: any) => {
        this.issLoading = false;
        console.error("Error loading quotation details:", err);
        this.dialogBox.open(DialogBox_Component, {panelClass:'Dialogbox-Class',data:{Message:'Error Occurred',Type:"2"}});
    }
});
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

Get_Stock(){
    //this.Barcode_.ItemName=this.Item_.ItemName;
    this.Stock_Temp.ItemId=this.Barcode_.ItemId;
    this.Stock_Temp.ItemName=this.Barcode_.ItemName;
    this.Stock_=Object.assign({},this.Stock_Temp);
    this.Quotation_Details_.ItemId=this.Barcode_.ItemId;
    this.Quotation_Details_.ItemName=this.Barcode_.ItemName;
    this.Quotation_Details_.UnitId=this.Barcode_.UnitId;
    this.Quotation_Details_.UnitName=this.Barcode_.UnitName;
    this.Quotation_Details_.MRP=this.Barcode_.MRP;
    this.Quotation_Details_.PurchaseRate=this.Barcode_.PurchaseRate;
    this.Quotation_Details_.Stock=this.Barcode_.Quantity;
    this.Quotation_Details_.UnitPrice=this.Barcode_.SaleRate;
    this.Quotation_Details_.ItemName=this.Barcode_.ItemName;
    this.Quotation_Details_.GroupId=this.Barcode_.GroupId;
    this.Quotation_Details_.GroupName=this.Barcode_.GroupName;
    this.Quotation_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
    this.Quotation_Details_.HSNCODE=this.Barcode_.HSNCODE;
    this.Quotation_Details_.HSNMasterId=this.Barcode_.HSNMasterId;
    this.Quotation_Details_.Item_Code=this.Barcode_.Item_Code;  
}
Get_Stock_Item() {
    if (typeof this.Item_ === 'string') {
        this.Quotation_Details_.ItemName = this.Item_;
        this.Quotation_Details_.ItemId = 0;
        this.Quotation_Details_.Item_Code = '';
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
                this.Quotation_Details_.ItemId=this.Item_.ItemId;
                this.Quotation_Details_.ItemName=this.Item_.ItemName;
                this.Quotation_Details_.UnitId=this.Item_.UnitId;
                this.Quotation_Details_.UnitName=this.Item_.UnitName;
                this.Quotation_Details_.MRP=this.Item_.MRP;
                this.Quotation_Details_.PurchaseRate=this.Item_.PurchaseRate;
                this.Quotation_Details_.Stock=this.Item_.Quantity;
                this.Quotation_Details_.UnitPrice=this.Item_.SaleRate;
                this.Quotation_Details_.ItemName=this.Item_.ItemName;
                this.Quotation_Details_.GroupId=this.Item_.GroupId;
                this.Quotation_Details_.GroupName=this.Item_.GroupName;
                this.Quotation_Details_.HSNMasterId=this.Item_.HSNMasterId;
                this.Quotation_Details_.HSNCODE=this.Item_.HSNCODE;
                this.Quotation_Details_.HSNMasterId=this.Item_.HSNMasterId;
                this.Quotation_Details_.Item_Code=this.Item_.Item_Code; 
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

  Delete_Quotation_Detail(itemIndex){
    this.Quotation_Details_Data.splice(itemIndex, 1);
    console.log('Quotation_Details_Data: ', this.Quotation_Details_Data);
    this.addBlankRows();
    this.Final_Amounts();
  } 
  
  Edit_Quotation_Detail(Sales_Details_e:Quotation_Details, index){
    this.Quotation_Details_Index=index;
debugger;
    this.Barcode_Temp_.StockId=Sales_Details_e.StockId;
    this.Barcode_Temp_.Item_Code=Sales_Details_e.Item_Code;
    this.Barcode_=Object.assign({},this.Barcode_Temp_);

    this.Item_Temp.ItemId=Sales_Details_e.ItemId;
    this.Item_Temp.ItemName=Sales_Details_e.ItemName;

    this.Item_=Object.assign({},this.Item_Temp);
    this.Quotation_Details_=Object.assign({},Sales_Details_e);
  }
  duplicate(){
    // this.Customer_ = new Client_Accounts();;
    // this.Address1 = ''
    // this.Address2 = ''
    // this.Address3 = ''
    // this.Address4 = ''
    // this.Vatin = ''
    this.Edit_Sales = 0;
    this.Quotation_Master_.SalesQuotationMaster_Id = 0;
    // this.Quotation_Master_.Delivery_Address1 = '';
    // this.Quotation_Master_.Delivery_Address2 = '';
    // this.Quotation_Master_.Delivery_Address3 = '';
    // this.Quotation_Master_.Delivery_Address4 = '';
    this.Quotation_Master_.QuotationNo = '0'
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
    this.Quotation_Master_.EntryDate=new Date().toString();
    this.Quotation_Master_.EntryDate=this.formatDate(this.Quotation_Master_.EntryDate); 
    setTimeout(() => {
        if (this.topDiv) {
            this.topDiv.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
  }
  newQuotation(){
    this.Quotation_Master_= new Quotation_Master();
    this.Edit_Sales = 0;
    this.Clr_Sales_Master();
    this.Clr_Sales_Details();
    this.Sales_Print=true;
    this.Quotation_Details_Data=[];
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
    this.Update_Workflow_Status('PROFORMA_PENDING');
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
    this.Sales_Master_Service_.Load_Profoma_Items_Pending_List_ByQuotation(this.Quotation_Master_.SalesQuotationMaster_Id).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
     
    this.performaPendingData=Rows[0];
    })
    setTimeout(() => {
        if (this.bottomDiv5) {
          this.bottomDiv5.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
  }
  Invoice_Pending_Click(){
    this.Update_Workflow_Status('INVOICE_PENDING');
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
    this.Sales_Master_Service_.Load_Invoice_Items_Pending_List_ByQuotation(this.Quotation_Master_.SalesQuotationMaster_Id).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
       this.invoicePendingData=Rows[0];
        })
    setTimeout(() => {
        if (this.bottomDiv6) {
          this.bottomDiv6.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
  }
  Delivery_Pending_Click(){
    this.Update_Workflow_Status('DELIVERY_PENDING');
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
    this.Sales_Master_Service_.Load_Delivery_Items_Pending_List_ByQuotation(this.Quotation_Master_.SalesQuotationMaster_Id).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
       this.deliveryPendingData=Rows[0];
        })
    setTimeout(() => {
        if (this.bottomDiv7) {
          this.bottomDiv7.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
  }
  Purchase_Pending_Click(){
    this.Update_Workflow_Status('PO_PENDING');
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
    this.Sales_Master_Service_.Load_Purchase_Items_Pending_List_ByQuotation(this.Quotation_Master_.SalesQuotationMaster_Id).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
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
    if(this.Quotation_Master_.Charge1per != '')
        if(this.Quotation_Master_.Charge1per != null )
           if(this.Quotation_Master_.Charge1per != undefined )
           if(this.Quotation_Master_.Charge1per.toString() != '0')
            if(this.Quotation_Master_.Charge1per.toString() != 'null')
                    if(this.Quotation_Master_.Charge1per.toString() != 'undefined')
                        if(this.Quotation_Master_.Charge1per.toString() != '0.00')
                        {
                            this.printAcknowledgeCharge1per = true;
                        }                        
   if(this.Quotation_Master_.charge1_Amount != 0)
       if(this.Quotation_Master_.charge1_Amount != null)
           if(this.Quotation_Master_.charge1_Amount != undefined )
      if( this.Quotation_Master_.charge1_Amount.toString() != '0')
   if( this.Quotation_Master_.charge1_Amount.toString() != 'null')
       if( this.Quotation_Master_.charge1_Amount.toString() != 'undefined' )
       if( this.Quotation_Master_.charge1_Amount.toString() != '0.000')
    {
        this.printAcknowledgeChargeAmount1 = true;
    }
   if(this.Quotation_Master_.charge2_Amount != 0)
       if(this.Quotation_Master_.charge2_Amount != null)
           if(this.Quotation_Master_.charge2_Amount != undefined )
      if( this.Quotation_Master_.charge2_Amount.toString() != '0')
   if( this.Quotation_Master_.charge2_Amount.toString() != 'null')
       if( this.Quotation_Master_.charge2_Amount.toString() != 'undefined' )
       if( this.Quotation_Master_.charge2_Amount.toString() != '0.000')
    {
        this.printAcknowledgeChargeAmount2 = true;
    }
    if(this.Quotation_Master_.TotalDiscount != 0)
        if(this.Quotation_Master_.TotalDiscount != null )
           if(this.Quotation_Master_.TotalDiscount != undefined )
           if(this.Quotation_Master_.TotalDiscount.toString() != '0')
            if(this.Quotation_Master_.TotalDiscount.toString() != 'null')
                    if(this.Quotation_Master_.TotalDiscount.toString() != 'undefined')
                        if(this.Quotation_Master_.TotalDiscount.toString() != '0.000')
                        {
                            this.printAcknowledgeTotalDiscount = true;
                        }
    if(this.Quotation_Master_.VAT_Amount != 0)
        if(this.Quotation_Master_.VAT_Amount != null )
           if(this.Quotation_Master_.VAT_Amount != undefined )
           if(this.Quotation_Master_.VAT_Amount.toString() != '0')
            if(this.Quotation_Master_.VAT_Amount.toString() != 'null')
                    if(this.Quotation_Master_.VAT_Amount.toString() != 'undefined')
                        {
                            this.printAcknowledgeVAT_Amount = true;
                        }

                        if(this.Quotation_Master_.Discount_Description != '')
                            if(this.Quotation_Master_.Discount_Description != null )
                               if(this.Quotation_Master_.Discount_Description != undefined )
                               if(this.Quotation_Master_.Discount_Description.toString() != '0')
                                if(this.Quotation_Master_.Discount_Description.toString() != 'null')
                                        if(this.Quotation_Master_.Discount_Description.toString() != 'undefined')
                                            {
                                                this.printAcknowledgeDiscount_Description = true;
                                            }
                                            if(this.Quotation_Master_.Additional_Discount != 0)
                                                if(this.Quotation_Master_.Additional_Discount != null )
                                                   if(this.Quotation_Master_.Additional_Discount != undefined )
                                                   if(this.Quotation_Master_.Additional_Discount.toString() != '0')
                                                    if(this.Quotation_Master_.Additional_Discount.toString() != 'null')
                                                            if(this.Quotation_Master_.Additional_Discount.toString() != 'undefined')
                                                                {
                                                                    this.printAcknowledgeAdditional_Discount = true;
                                                                }
                                                                if(this.Quotation_Master_.Roundoff_Amt != 0)
                                                                    if(this.Quotation_Master_.Roundoff_Amt != null )
                                                                       if(this.Quotation_Master_.Roundoff_Amt != undefined )
                                                                       if(this.Quotation_Master_.Roundoff_Amt.toString() != '0')
                                                                        if(this.Quotation_Master_.Roundoff_Amt.toString() != 'null')
                                                                                if(this.Quotation_Master_.Roundoff_Amt.toString() != 'undefined')
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
    this.Quotation_Master_.EntryDate = this.formatDate(this.Quotation_Master_.EntryDate)
    this.Quotation_Master_.PrintDate = this.formatPrintDate(this.Quotation_Master_.EntryDate);    
   // this.Customer_Name=this.Customer_.Client_Accounts_Name;
    debugger
    // for (let i = 0; i < this.currencyData.length; i++) {
    //     if(this.Quotation_Master_.CurrencyId = this.currencyData[i].CurrencyDetails_Id){
    //         this.currency.CurrecnyName = this.currencyData[i].CurrecnyName
    //     }
        
    //    }
    setTimeout(()=>{
        let popupWinindow
        let innerContents = document.getElementById("Print_Div2").innerHTML;
        popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        const printStyles = this.Get_Quotation_Print_Css();
        popupWinindow.document.write(
            '<html><head><title>Acknowledgement</title><style>' +
            printStyles +
            '.no-print { display: none !important; }</style></head><body onload="window.print()">' +
            innerContents +
            '</body></html>'
        );
        popupWinindow.document.close();   
        // popupWinindow.onafterprint = () => {
        //     popupWindow.close();
        // };
    })
  }
//   Load_Delivery_Order_Master(){
//     debugger
//     this.Sales_Master_Service_.Load_Delivery_Order_Master(this.DeliveryOrderMaster_Id).subscribe(result=>{
//         this.Quotation_Master_=new Quotation_Master()
//         this.Quotation_Master_=Object.assign({},result[0][0]); 
//         this.Quotation_Master_.PaymentTermValue=result[0][0].Payment_Term_Value
//         this.Quotation_Master_.POnumber = result[0][0].POnumber;
//         this.Entry_View = true;
// debugger
//         this.Sales_Master_Service_.Search_Customer_Typeahead('1,2,3,39,36','').subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;     
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
//         this.Sales_Master_Service_.Get_Performa_invoice_Details(result[0][0].PerformaInvoiceMaster_Id).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response; 
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
    Load_SalesQuotationMaster()
    {
        debugger;
        this.Entry_View=true;
        this.issLoading = true
debugger;
        this.Sales_Master_Service_.Load_SalesQuotationMaster(this.SalesQuotationMaster_Id).subscribe((result: any)=>{
            this.Quotation_Master_=new Quotation_Master();
            this.Quotation_Master_Data=result[0];
            this.Quotation_Master_=Object.assign({},result[0][0]); 
            this.Quotation_Master_.PaymentTermValue=result[0][0].PaymentTermValue
            this.Quotation_Master_.POnumber = result[0][0].POnumber;          
        this.Edit_Sales=1;
        this.Sales_Print = false;    
        this.Customer_Temp.Client_Accounts_Id=result[0][0].Account_Party_Id;
        this.Customer_Temp.Client_Accounts_Name=result[0][0].Customer;
        this.Customer_=this.Customer_Temp;
        this.Quotation_Master_.Customer_Name=this.Customer_.Client_Accounts_Name;
        this.Quotation_Master_.Customer=this.Quotation_Master_.Customer_Name; 
        
        this.SalesQuotationMaster_Id_Edit = this.SalesQuotationMaster_Id;
        this.Refresh_Sequential_Flags();

        // this.Client_Accounts_Service_.Get_Client_Accounts(this.Quotation_Master_.Account_Party_Id).subscribe((result)=>{
        //     if(result!=null)
        //     {
        //         debugger
        //                 this.Customer_Temp.Client_Accounts_Id=result[0][0].Client_Accounts_Id;
        //                 this.Customer_Temp.Client_Accounts_Name=result[0][0].Client_Accounts_Name;
        //                 this.Customer_= this.Customer_Temp;

        //                 this.Quotation_Master_.Address1 = result[0][0].Address1;
        //                 this.Quotation_Master_.Address2 = result[0][0].Address2;
        //                 this.Quotation_Master_.Address3 = result[0][0].Address3;
        //                 this.Quotation_Master_.Address4 = result[0][0].Address4;
        //                 this.Quotation_Master_.Vatin = result[0][0].GSTNo;
                       
        //                 this.Address1 = result[0][0].Address1;
        //                 this.Address2 = result[0][0].Address2;
        //                 this.Address3 = result[0][0].Address3;
        //                 this.Address4 = result[0][0].Address4;
        //                 this.Vatin = result[0][0].GSTNo;
        //     }
        // });
    this.Sales_Master_Service_.Search_Customer_Typeahead_1('1,2,3,36,37,38,39',"").subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;  
        if (Rows != null) {
            this.Customer_Data = Rows[0];
            for(let i=0;i<this.Customer_Data.length;i++){
                if(this.Customer_Data[i].Client_Accounts_Id == this.Quotation_Master_.Account_Party_Id){
                    this.Customer_Temp.Client_Accounts_Id=Rows[0][i].Client_Accounts_Id;
                    this.Customer_Temp.Client_Accounts_Name=Rows[0][i].Client_Accounts_Name;
                     this.Customer_= this.Customer_Temp;
                  
                    this.Quotation_Master_.Account_Party_Id=Rows[0][i].Client_Accounts_Id;
                    this.Quotation_Master_.Customer=Rows[0][i].Client_Accounts_Name;
                    this.Quotation_Master_.Customer_Name=Rows[0][i].Client_Accounts_Name;

                    this.Quotation_Master_.Address1 = Rows[0][i].Address1;
                    this.Quotation_Master_.Address2 = Rows[0][i].Address2;
                    this.Quotation_Master_.Address3 = Rows[0][i].Address3;
                    this.Quotation_Master_.Address4 = Rows[0][i].Address4;
                    this.Quotation_Master_.Vatin = Rows[0][i].GSTNo;

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
        if(this.currencyData[i].CurrencyDetails_Id == this.Quotation_Master_.CurrencyId){
        this.currency = this.currencyData[i]
        }
        }
        debugger;
        for(let i=0;i<this.PaymentTermData.length;i++){
        if(this.PaymentTermData[i].payment_Term_ID == this.Quotation_Master_.Payment_Term_Description){
        this.Payment_Term = this.PaymentTermData[i]
        }
        }
    console.log("QUO - Outside Get_Quotation_Details ");
    this.Sales_Master_Service_.Get_Quotation_Details(result[0][0].SalesQuotationMaster_Id).subscribe((Rows: any) => { 
        debugger;
        console.log("QUO - Inside Get_Quotation_Details ");
        console.log('QUO - Rows 1: ', Rows);
            if (Rows != null) {
            this.Quotation_Details_Data = Rows[0];
            console.log('QUO - Quotation_Details_Data: ', this.Quotation_Details_Data);
            this.Calculate_Quotation_Details_Amount();
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
        localStorage.setItem('QuotationNo', this.Quotation_Master_.SalesQuotationMaster_Id.toString());
        this.router.navigateByUrl(`/Invoice`);
      }
      Edit_Quotation_SalesMaster(Sales_Master_Id)
      {
        localStorage.setItem('Sales_Master_Id', Sales_Master_Id.toString());
        this.router.navigateByUrl(`/Invoice`); 
      }
      Invoice_Click(){
        this.Update_Workflow_Status('INVOICE_CREATED');
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
        this.Sales_Master_Service_.Get_Salesmaster_Quotation_Details(this.SalesQuotationMaster_Id_Edit).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
            this.Sales_Master_Data=Rows[0];    
            });
        setTimeout(() => {
            if (this.bottomDiv1) {
              this.bottomDiv1.nativeElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
      }
      DO_Click(){
        this.Update_Workflow_Status('DELIVERY_ORDER_CREATED');
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
        this.Sales_Master_Service_.Get_DeliveryOrder_Quotation_Details(this.SalesQuotationMaster_Id_Edit).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
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
        localStorage.setItem('QuotationNo', this.Quotation_Master_.SalesQuotationMaster_Id.toString());
        debugger
        this.router.navigateByUrl(`/Delivery_Order`);
      }
      Edit_Quotation_DeliveryOrder(DeliveryOrderMaster_Id)
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
        this.Sales_Master_Service_.Get_PackingList_Quotation_Details(this.SalesQuotationMaster_Id_Edit).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
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
        localStorage.setItem('QuotationNo', this.Quotation_Master_.SalesQuotationMaster_Id.toString());
        this.router.navigateByUrl(`/Packing_List`);
      }
      Edit_Quotation_PackingList(PackingList_Master_Id)
      {
        localStorage.setItem('PackingList_Master_Id', PackingList_Master_Id.toString());
        this.router.navigateByUrl(`/Packing_List`); 
      }
      PO_Click(){
        this.Update_Workflow_Status('PO_CREATED');
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
        this.Sales_Master_Service_.Get_PurchaseOrder_Quotation_Details(this.SalesQuotationMaster_Id_Edit).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
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
        localStorage.setItem('QuotationNo', this.Quotation_Master_.SalesQuotationMaster_Id.toString());
        this.router.navigateByUrl(`/Purchase_order`);
      }
      Edit_Quotation_PurchaseOrder(PurchaseOrderMaster_Id)
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
        this.Sales_Master_Service_.Load_PackingList_Items_Pending_List_ByQuotation(this.Quotation_Master_.SalesQuotationMaster_Id).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
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
        this.Update_Workflow_Status('PROFORMA_CREATED');
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
        // Prefer Reference-ID based lookup (RequirementMaster_Id) when mapping exists, fallback to quotation-id lookup
        const quotationId = Number(this.SalesQuotationMaster_Id_Edit || 0);
        if (quotationId > 0) {
            this.Sales_Master_Service_.Get_ReferenceId_ByQuotation(quotationId).subscribe(refRows => {
                const refId = refRows && refRows[0] && refRows[0][0] ? Number(refRows[0][0].ReferenceID || 0) : 0;
                if (refId > 0) {
                    this.Sales_Master_Service_.Get_Proforma_History_ByReference(refId).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
                        this.performainvoice_Data = Rows && Rows[0] ? Rows[0] : [];
                    }, _ => { this.performainvoice_Data = []; });
                } else {
                    this.Sales_Master_Service_.Get_Proforma_Quotation_Details(this.SalesQuotationMaster_Id_Edit).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
                        this.performainvoice_Data = Rows && Rows[0] ? Rows[0] : [];
                    }, _ => { this.performainvoice_Data = []; });
                }
            }, _ => {
                this.Sales_Master_Service_.Get_Proforma_Quotation_Details(this.SalesQuotationMaster_Id_Edit).subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;
                    this.performainvoice_Data = Rows && Rows[0] ? Rows[0] : [];
                }, _ => { this.performainvoice_Data = []; });
            });
        } else {
            this.performainvoice_Data = [];
        }
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
        localStorage.setItem('QuotationNo', this.Quotation_Master_.SalesQuotationMaster_Id.toString());
        this.router.navigateByUrl(`/Performa_Invoice`);
      }
      Edit_Quotation_Proforma(PerformaInvoiceMaster_Id)
      {
        localStorage.setItem('PerformaInvoiceMaster_Id', PerformaInvoiceMaster_Id.toString());
        this.router.navigateByUrl(`/Performa_Invoice`); 
      } 

      Load_Vat_Percentage() 
      {   
      this.Sales_Master_Service_.Load_Vat_Percentage().subscribe((response: any) => { const Rows = (response && typeof response === "object" && "success" in response) ? response.data : response;    
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
  Quotation_Master_Desc2_Break()
  {
    debugger;
    let words = this.Quotation_Master_.Description2.split(' ');
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
    if(Number(this.Quotation_Master_.Additional_Discount)>0){
        this.Quotation_Master_.Discount_Description = (this.Quotation_Master_.Additional_Discount * 100/this.Quotation_Master_.TotalAmount).toString()
        discountper = Number(this.Quotation_Master_.Discount_Description).toFixed(3);
        this.Quotation_Master_.Discount_Description = discountper;  
    }else{
        this.Quotation_Master_.Discount_Description = '0.000'
    }
    debugger;
    this.addDiscCheck = addDiscCheck;
    this.Final_Amounts();
}
// Calculate_Discount_Amount()
// {
//   debugger;
//   if(Number(this.Quotation_Master_.Discount_Description)>0){
//     this.Quotation_Master_.Additional_Discount = Number(this.Quotation_Master_.TotalAmount) * (Number(this.Quotation_Master_.Discount_Description)/ 100);
//     this.Quotation_Master_.Additional_Discount = Number(this.Quotation_Master_.Additional_Discount.toFixed(3));   
// }else{
//     this.Quotation_Master_.Additional_Discount = 0.000
// }
//   this.Final_Amounts();
// }

  Final_Amounts()
  {      
      this.Tot_Gross=0,this.Tot_discount=0,this.Tot_Net=0,this.Quotation_Master_.TotalAmount=0;this.Quotation_Master_.Basic_Discount=0
      for(var i = 0; i< this.Quotation_Details_Data.length ; i++)
      {  
          this.Quotation_Master_.TotalAmount = Number(this.Quotation_Master_.TotalAmount) + Number(this.Quotation_Details_Data[i].Amount);  
          // Number(this.Quotation_Details_Data[i].UnitPrice) * Number(this.Quotation_Details_Data[i].Quantity);
          this.Quotation_Master_.TotalAmount = Number(this.Quotation_Master_.TotalAmount.toFixed(3));          
          this.Tot_discount = Number(this.Tot_discount)+  Number(this.Quotation_Details_Data[i].Item_Discount_Amount);
          //(Number(this.Quotation_Details_Data[i].Unit_Discount) * Number(this.Quotation_Details_Data[i].Quantity) );
          this.Tot_discount= Number(this.Tot_discount.toFixed(3));  
          this.Quotation_Master_.Basic_Discount = this.Quotation_Master_.Basic_Discount + Number(this.Quotation_Details_Data[i].Item_Discount_Amount);
          this.Quotation_Master_.Basic_Discount = Number(this.Quotation_Master_.Basic_Discount.toFixed(3));      
      }  
      this.Quotation_Master_.TotalAmount = Number(this.Quotation_Master_.TotalAmount.toFixed(3));
      this.Tot_discount = Number(this.Tot_discount.toFixed(3));
      if(this.addDiscCheck == 0)
      {
        if(Number(this.Quotation_Master_.Discount_Description)>0){
            this.Quotation_Master_.Additional_Discount = Number(this.Quotation_Master_.TotalAmount) * (Number(this.Quotation_Master_.Discount_Description)/ 100);
            this.Quotation_Master_.Additional_Discount = Number(this.Quotation_Master_.Additional_Discount.toFixed(3));    
            this.addDiscCheck = 0;        
        }else{
            this.Quotation_Master_.Additional_Discount = 0.000
            this.addDiscCheck = 0;
        }
        this.addDiscCheck = 0;
      }
      debugger;
      this.addDiscCheck = 0;
      //this.Quotation_Master_.Discount_Description = (this.safeNumber(this.Quotation_Master_.Additional_Discount) * 100)/this.Quotation_Master_.TotalAmount
      this.Quotation_Master_.TotalDiscount = Number(this.Tot_discount.toFixed(3))+ Number(this.Quotation_Master_.Additional_Discount);
      this.Quotation_Master_.TotalDiscount = Number(this.Quotation_Master_.TotalDiscount.toFixed(3));     
      if(this.Quotation_Master_.Charge1per>'0'){
          this.Quotation_Master_.charge1_Amount = (Number(this.Quotation_Master_.TotalAmount.toFixed(3)) - Number(this.Quotation_Master_.Additional_Discount))* (Number(this.Quotation_Master_.Charge1per)/100)
          this.Quotation_Master_.charge1_Amount = Number(this.Quotation_Master_.charge1_Amount.toFixed(3))
      }else{
          this.Quotation_Master_.charge1_Amount =  0.000;
      }      
      this.Total = Number(this.Quotation_Master_.TotalAmount.toFixed(3))-Number(this.Quotation_Master_.TotalDiscount.toFixed(3)) + 
      this.safeNumber(Number(this.Quotation_Master_.charge2_Amount)) + Number(this.Quotation_Master_.charge1_Amount.toFixed(3))
      this.Total = Number(this.Total.toFixed(3))
      this.Quotation_Master_.VAT_Amount = 0.000;
      if(this.Quotation_Master_.VAT_Percentage>0){
          this.Quotation_Master_.VAT_Amount = this.Total * (this.Quotation_Master_.VAT_Percentage/100)
      }
      this.Quotation_Master_.VAT_Amount = Number(this.Quotation_Master_.VAT_Amount.toFixed(3))    
      this.Quotation_Master_.TaxableAmount = this.Total;
      this.Quotation_Master_.Total_Amount = this.Total + this.Quotation_Master_.VAT_Amount
      this.Quotation_Master_.Total_Amount = Number(this.Quotation_Master_.Total_Amount.toFixed(3))
      this.Quotation_Master_.NetTotal = Number((this.Quotation_Master_.Total_Amount - this.safeNumber(this.Quotation_Master_.Roundoff_Amt)).toFixed(3))
      this.Quotation_Master_.NetTotal = Number(this.Quotation_Master_.NetTotal.toFixed(3))
      this.Quotation_Master_.TotalAmount = parseFloat(this.Quotation_Master_.TotalAmount.toFixed(3));
      this.Quotation_Master_.Amount_In_Words = this.numberToWordsIndianCurrency(this.Quotation_Master_.NetTotal)       
     debugger;
  //this.Clr_Sales_Edit_Data();
  }
//   Export() {
//     this.Sales_Master_Service_.exportExcel(this.Quotation_Master_Data,"Quotation" );
//   }
  Export() {
    const filteredData = this.Quotation_Master_Data.map((receipt: any, index: number) => {
        return {
            No: index + 1,                  
            CustomerName: receipt["Customer"],
            QuotationNo: receipt["QuotationNo"],
            Date: receipt["FormattedEntryDate"],
            Amount: receipt["NetTotal"],
        };
    });
    this.Sales_Master_Service_.exportExcel(filteredData,"Quotation" );}
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
        // this.Quotation_Details_Data.forEach((item, index) => {
        //     item.ItemName = `Edited ${item.ItemName}`;
        //   });
        this.cdr.detectChanges();
        this.marginTopItemNameCount = false;
        console.clear();
        // Loop through and apply changes to all cells
        this.Quotation_Details_Data.forEach((_, index) => {
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
            if(this.Quotation_Details_Data[index].ItemName.length > 96)
                {
                    this.marginTopItemNameCount = true;                    
                }
                // if(this.marginTopItemNameCount == true)
                // {
                //     tempht1 -= 30;
                // }
                console.log('tempht1 second: ', tempht1);    
                console.log('this.Quotation_Details_Data[index].ItemName.length: ', this.Quotation_Details_Data[index].ItemName.length);
            // if(this.Quotation_Details_Data[index].Item_Code.length > 13)
            //     {
            //         this.marginTopItemNameCount = true;
            //     }        
            console.log('this.marginTopItemNameCount: ', this.marginTopItemNameCount);
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
debugger;
             if (cellThr1 < 410 && (this.Quotation_Details_Data.length < 18 && this.marginTopItemNameCount == false) 
                || (this.Quotation_Details_Data.length < 15 && this.marginTopItemNameCount == true)) {   
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
